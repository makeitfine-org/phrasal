package net.phrasal.integration;

import jakarta.servlet.http.Cookie;
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
import static org.hamcrest.Matchers.matchesPattern;
import static org.hamcrest.Matchers.startsWith;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Two-factor enrollment integration")
class TwoFactorEnrollmentIntegrationTest extends AbstractIntegrationTest {

    private static final String STATUS = "/api/v1/me/2fa";
    private static final String SETUP = "/api/v1/me/2fa/setup";
    private static final String CONFIRM = "/api/v1/me/2fa/confirm";
    private static final String ME = "/api/v1/auth/me";
    private static final String PASSWORD = "correct horse battery";
    private static final String RECOVERY_CODE_PATTERN = "[A-Z2-7]{4}(-[A-Z2-7]{4}){3}";

    @Autowired
    private JdbcTemplate jdbc;

    private static String uniqueEmail() {
        return "tfa-" + UUID.randomUUID() + "@example.com";
    }

    private ResultActions setup(Cookie session, String password) throws Exception {
        return mockMvc.perform(post(SETUP).cookie(session).with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .content("{\"password\":\"" + password + "\"}"));
    }

    private ResultActions confirm(Cookie session, String code) throws Exception {
        return mockMvc.perform(post(CONFIRM).cookie(session).with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .content("{\"code\":\"" + code + "\"}"));
    }

    private String setupSecret(Cookie session) throws Exception {
        String body = setup(session, PASSWORD).andExpect(status().isOk()).andReturn().getResponse()
                .getContentAsString();
        return com.jayway.jsonpath.JsonPath.read(body, "$.secret");
    }

    @Test
    @DisplayName("anonymous requests get 401 problem+json")
    void anonymousIsUnauthorized() throws Exception {
        mockMvc.perform(get(STATUS)).andExpect(status().isUnauthorized())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON));
        mockMvc.perform(post(SETUP).with(csrf()).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"password\":\"x\"}"))
                .andExpect(status().isUnauthorized())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON));
    }

    @Test
    @DisplayName("status before setup is disabled with no recovery codes")
    void statusBeforeSetup() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);

        mockMvc.perform(get(STATUS).cookie(session))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.enabled").value(false))
                .andExpect(jsonPath("$.recoveryCodesRemaining").value(0));
    }

    @Test
    @DisplayName("/me reports 2FA off for a user")
    void meReportsTwoFactorOff() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);

        mockMvc.perform(get(ME).cookie(session))
                .andExpect(jsonPath("$.twoFactorEnabled").value(false))
                .andExpect(jsonPath("$.twoFactorEnrollmentRequired").value(false));
    }

    @Test
    @DisplayName("setup with the right password returns a Base32 secret and an otpauth URI")
    void setupReturnsSecretAndUri() throws Exception {
        String email = uniqueEmail();
        Cookie session = registerAndLogin(email, PASSWORD);

        String body = setup(session, PASSWORD).andExpect(status().isOk())
                .andExpect(jsonPath("$.secret", matchesPattern("[A-Z2-7]{32}")))
                .andExpect(jsonPath("$.otpauthUri", startsWith("otpauth://totp/Phrasal:")))
                .andReturn().getResponse().getContentAsString();

        String secret = com.jayway.jsonpath.JsonPath.read(body, "$.secret");
        assertThat((String) com.jayway.jsonpath.JsonPath.read(body, "$.otpauthUri")).contains("secret=" + secret);
        String stored = jdbc.queryForObject("SELECT totp_secret_enc FROM users WHERE email = ?", String.class, email);
        assertThat(stored).startsWith("v1:").doesNotContain(secret);
    }

    @Test
    @DisplayName("setup with a wrong password returns 400 wrong-password")
    void setupWrongPassword() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);

        setup(session, "not the password").andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.type").value(containsString("/errors/wrong-password")))
                .andExpect(jsonPath("$.errors.password").isNotEmpty());
    }

    @Test
    @DisplayName("setup without CSRF returns 403")
    void setupWithoutCsrf() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);

        mockMvc.perform(post(SETUP).cookie(session).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"password\":\"" + PASSWORD + "\"}"))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("confirm with the app's code enables 2FA and stores only hashed recovery codes")
    void confirmEnables() throws Exception {
        String email = uniqueEmail();
        Cookie session = registerAndLogin(email, PASSWORD);
        String secret = setupSecret(session);

        String body = confirm(session, TotpTestCodes.codeNow(secret)).andExpect(status().isOk())
                .andExpect(jsonPath("$.recoveryCodes", hasSize(10)))
                .andExpect(jsonPath("$.recoveryCodes[*]", org.hamcrest.Matchers.everyItem(
                        matchesPattern(RECOVERY_CODE_PATTERN))))
                .andReturn().getResponse().getContentAsString();

        List<String> codes = com.jayway.jsonpath.JsonPath.read(body, "$.recoveryCodes");
        Long userId = jdbc.queryForObject("SELECT id FROM users WHERE email = ?", Long.class, email);
        List<String> hashes = jdbc.queryForList("SELECT code_hash FROM user_recovery_codes WHERE user_id = ?",
                String.class, userId);
        assertThat(hashes).hasSize(10).doesNotContainAnyElementsOf(codes);
    }

    @Test
    @DisplayName("status after confirm is enabled with ten recovery codes")
    void statusAfterConfirm() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);

        TwoFactorTestAccount account = enableTwoFactor(session, PASSWORD);

        mockMvc.perform(get(STATUS).cookie(account.session()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.enabled").value(true))
                .andExpect(jsonPath("$.enabledAt").isNotEmpty())
                .andExpect(jsonPath("$.recoveryCodesRemaining").value(10));
    }

    @Test
    @DisplayName("confirm rotates the session id: the old cookie is dead, the new one reports 2FA on")
    void confirmRotatesSession() throws Exception {
        Cookie old = registerAndLogin(uniqueEmail(), PASSWORD);

        TwoFactorTestAccount account = enableTwoFactor(old, PASSWORD);

        assertThat(account.session().getValue()).isNotEqualTo(old.getValue());
        mockMvc.perform(get(ME).cookie(old)).andExpect(status().isUnauthorized());
        mockMvc.perform(get(ME).cookie(account.session()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.twoFactorEnabled").value(true));
    }

    @Test
    @DisplayName("confirm revokes the other sessions of the account")
    void confirmRevokesOtherSessions() throws Exception {
        String email = uniqueEmail();
        Cookie first = registerAndLogin(email, PASSWORD);
        Cookie second = login("{\"email\":\"" + email + "\",\"password\":\"" + PASSWORD + "\"}", null);
        mockMvc.perform(get(ME).cookie(second)).andExpect(status().isOk());

        TwoFactorTestAccount account = enableTwoFactor(first, PASSWORD);

        mockMvc.perform(get(ME).cookie(second)).andExpect(status().isUnauthorized());
        mockMvc.perform(get(ME).cookie(account.session())).andExpect(status().isOk());
    }

    @Test
    @DisplayName("confirm with a wrong code returns 400 invalid-two-factor-code and 2FA stays off")
    void confirmWrongCode() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);
        String secret = setupSecret(session);
        String wrong = TotpTestCodes.codeNow(secret).equals("000000") ? "000001" : "000000";

        confirm(session, wrong).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.type").value(containsString("/errors/invalid-two-factor-code")))
                .andExpect(jsonPath("$.errors.code").isNotEmpty());

        mockMvc.perform(get(STATUS).cookie(session)).andExpect(jsonPath("$.enabled").value(false));
    }

    @Test
    @DisplayName("confirm before setup returns 409 two-factor-setup-not-started")
    void confirmBeforeSetup() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);

        confirm(session, "123456").andExpect(status().isConflict())
                .andExpect(jsonPath("$.type").value(containsString("/errors/two-factor-setup-not-started")));
    }

    @Test
    @DisplayName("setup after confirm returns 409 two-factor-already-enabled")
    void setupAfterConfirm() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);
        TwoFactorTestAccount account = enableTwoFactor(session, PASSWORD);

        setup(account.session(), PASSWORD).andExpect(status().isConflict())
                .andExpect(jsonPath("$.type").value(containsString("/errors/two-factor-already-enabled")));
    }

    @Test
    @DisplayName("blank code and blank password return 400 Validation Error")
    void blankInputs() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);

        setup(session, "").andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Error"))
                .andExpect(jsonPath("$.errors.password").isNotEmpty());
        confirm(session, "").andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Error"))
                .andExpect(jsonPath("$.errors.code").isNotEmpty());
    }
}
