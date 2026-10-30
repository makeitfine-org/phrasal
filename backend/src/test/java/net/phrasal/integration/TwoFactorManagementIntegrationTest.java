package net.phrasal.integration;

import com.jayway.jsonpath.JsonPath;
import jakarta.servlet.http.Cookie;
import net.phrasal.infrastructure.mail.EmailMessage;
import net.phrasal.integration.support.TotpTestCodes;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Two-factor management integration")
class TwoFactorManagementIntegrationTest extends AbstractIntegrationTest {

    private static final String STATUS = "/api/v1/me/2fa";
    private static final String DISABLE = "/api/v1/me/2fa/disable";
    private static final String REGENERATE = "/api/v1/me/2fa/recovery-codes";
    private static final String PASSWORD = "correct horse battery";
    private static final String ON_SUBJECT = "Two-factor authentication is on for your Phrasal account";
    private static final String OFF_SUBJECT = "Two-factor authentication is off for your Phrasal account";

    @Autowired
    private JdbcTemplate jdbc;

    private static String uniqueEmail() {
        return "tfa-manage-" + UUID.randomUUID() + "@example.com";
    }

    private static String credentials(String email) {
        return "{\"email\":\"" + email + "\",\"password\":\"" + PASSWORD + "\"}";
    }

    private ResultActions postCode(String url, Cookie session, String code) throws Exception {
        return mockMvc.perform(post(url).cookie(session).with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .content("{\"code\":\"" + code + "\"}"));
    }

    private String freshCode(TwoFactorTestAccount account, String email) {
        Long lastStep = jdbc.queryForObject("SELECT totp_last_step FROM users WHERE email = ?", Long.class, email);
        return TotpTestCodes.nextCode(account.secret(), lastStep);
    }

    private TwoFactorTestAccount accountWithTwoFactor(String email) throws Exception {
        return enableTwoFactor(registerAndLogin(email, PASSWORD), PASSWORD);
    }

    @Test
    @DisplayName("regenerating with a TOTP replaces the codes: old ones fail at login, new ones work")
    void regenerateReplacesCodes() throws Exception {
        String email = uniqueEmail();
        TwoFactorTestAccount account = accountWithTwoFactor(email);

        String body = postCode(REGENERATE, account.session(), freshCode(account, email))
                .andExpect(status().isOk()).andExpect(jsonPath("$.recoveryCodes", hasSize(10)))
                .andReturn().getResponse().getContentAsString();

        List<String> fresh = JsonPath.read(body, "$.recoveryCodes");
        assertThat(fresh).doesNotContainAnyElementsOf(account.recoveryCodes());
        submitTwoFactorCode(loginExpectingTwoFactor(credentials(email)), account.recoveryCodes().get(0))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.type").value(containsString("/errors/invalid-two-factor-code")));
        submitTwoFactorCode(loginExpectingTwoFactor(credentials(email)), fresh.get(0)).andExpect(status().isOk());
    }

    @Test
    @DisplayName("disabling with a TOTP answers 204 and the next login needs no second factor")
    void disableWithTotp() throws Exception {
        String email = uniqueEmail();
        TwoFactorTestAccount account = accountWithTwoFactor(email);

        postCode(DISABLE, account.session(), freshCode(account, email)).andExpect(status().isNoContent());

        assertThat(jdbc.queryForObject("SELECT totp_secret_enc FROM users WHERE email = ?", String.class, email))
                .isNull();
        assertThat(jdbc.queryForObject("SELECT count(*) FROM user_recovery_codes rc JOIN users u ON u.id = rc.user_id "
                + "WHERE u.email = ?", Long.class, email)).isZero();
        mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content(credentials(email)).with(csrf()))
                .andExpect(status().isOk()).andExpect(jsonPath("$.twoFactorEnabled").value(false));
    }

    @Test
    @DisplayName("disable keeps the caller signed in, with the principal refreshed to 2FA off")
    void disableRefreshesSession() throws Exception {
        String email = uniqueEmail();
        TwoFactorTestAccount account = accountWithTwoFactor(email);

        Cookie fresh = postCode(DISABLE, account.session(), freshCode(account, email))
                .andExpect(status().isNoContent()).andReturn().getResponse().getCookie("SESSION");

        mockMvc.perform(get(STATUS).cookie(fresh)).andExpect(status().isOk())
                .andExpect(jsonPath("$.enabled").value(false)).andExpect(jsonPath("$.recoveryCodesRemaining").value(0));
        mockMvc.perform(get("/api/v1/auth/me").cookie(fresh)).andExpect(jsonPath("$.twoFactorEnabled").value(false));
    }

    @Test
    @DisplayName("disabling with a recovery code works: the lost-phone path")
    void disableWithRecoveryCode() throws Exception {
        String email = uniqueEmail();
        TwoFactorTestAccount account = accountWithTwoFactor(email);

        postCode(DISABLE, account.session(), account.recoveryCodes().get(2)).andExpect(status().isNoContent());

        mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
                .content(credentials(email)).with(csrf())).andExpect(status().isOk());
    }

    @Test
    @DisplayName("after disabling, enrolling again uses a new secret and the old secret's code fails")
    void reEnrollWithNewSecret() throws Exception {
        String email = uniqueEmail();
        TwoFactorTestAccount first = accountWithTwoFactor(email);
        Cookie afterDisable = postCode(DISABLE, first.session(), freshCode(first, email))
                .andExpect(status().isNoContent()).andReturn().getResponse().getCookie("SESSION");

        TwoFactorTestAccount second = enableTwoFactor(afterDisable, PASSWORD);

        assertThat(second.secret()).isNotEqualTo(first.secret());
        Long lastStep = jdbc.queryForObject("SELECT totp_last_step FROM users WHERE email = ?", Long.class, email);
        String oldSecretCode = TotpTestCodes.nextCode(first.secret(), lastStep);
        String newSecretCode = TotpTestCodes.nextCode(second.secret(), lastStep);
        Cookie pending = loginExpectingTwoFactor(credentials(email));
        if (!oldSecretCode.equals(newSecretCode)) {
            submitTwoFactorCode(pending, oldSecretCode).andExpect(status().isBadRequest());
        }
        submitTwoFactorCode(pending, newSecretCode).andExpect(status().isOk());
    }

    @Test
    @DisplayName("disabling with a wrong code answers 400 and 2FA stays on")
    void disableWrongCode() throws Exception {
        String email = uniqueEmail();
        TwoFactorTestAccount account = accountWithTwoFactor(email);
        String wrong = freshCode(account, email).equals("000000") ? "000001" : "000000";

        postCode(DISABLE, account.session(), wrong).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.type").value(containsString("/errors/invalid-two-factor-code")));

        mockMvc.perform(get(STATUS).cookie(account.session())).andExpect(jsonPath("$.enabled").value(true));
    }

    @Test
    @DisplayName("disable and regenerate while 2FA is off answer 409 two-factor-not-enabled")
    void whileOff() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);

        postCode(DISABLE, session, "123456").andExpect(status().isConflict())
                .andExpect(jsonPath("$.type").value(containsString("/errors/two-factor-not-enabled")));
        postCode(REGENERATE, session, "123456").andExpect(status().isConflict())
                .andExpect(jsonPath("$.type").value(containsString("/errors/two-factor-not-enabled")));
    }

    @Test
    @DisplayName("anonymous requests answer 401 and requests without CSRF answer 403")
    void anonymousAndCsrf() throws Exception {
        for (String url : List.of(DISABLE, REGENERATE)) {
            mockMvc.perform(post(url).with(csrf()).contentType(MediaType.APPLICATION_JSON).content("{\"code\":\"1\"}"))
                    .andExpect(status().isUnauthorized())
                    .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON));
        }
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);
        mockMvc.perform(post(DISABLE).cookie(session).contentType(MediaType.APPLICATION_JSON)
                .content("{\"code\":\"123456\"}")).andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("notice mails go out after enabling and after disabling, without the secret")
    void noticeMails() throws Exception {
        String email = uniqueEmail();
        TwoFactorTestAccount account = accountWithTwoFactor(email);

        EmailMessage on = mailbox.awaitSubject(email, ON_SUBJECT);
        postCode(DISABLE, account.session(), freshCode(account, email)).andExpect(status().isNoContent());
        EmailMessage off = mailbox.awaitSubject(email, OFF_SUBJECT);

        for (EmailMessage message : List.of(on, off)) {
            assertThat(message.text()).doesNotContain(account.secret()).doesNotContain("token=");
            assertThat(message.html()).doesNotContain(account.secret());
        }
    }
}
