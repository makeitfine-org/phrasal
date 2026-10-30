package net.phrasal.integration;

import jakarta.servlet.http.Cookie;
import net.phrasal.integration.support.TotpTestCodes;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.ResultActions;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.endsWith;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Delete account integration")
class DeleteAccountIntegrationTest extends AbstractIntegrationTest {

    private static final String PASSWORD = "correct horse battery";
    private static final String DELETE = "/api/v1/me/delete";
    private static final String ME = "/api/v1/auth/me";
    private static final String DELETED_SUBJECT = "Your Phrasal account was deleted";
    private static final String VERIFICATION_SUBJECT = "Confirm your Phrasal account";

    @Autowired
    private JdbcTemplate jdbc;

    private static String uniqueEmail() {
        return "delete-acct-" + UUID.randomUUID() + "@example.com";
    }

    private static String credentials(String email) {
        return "{\"email\":\"" + email + "\",\"password\":\"" + PASSWORD + "\"}";
    }

    private ResultActions deleteAccount(Cookie session, String body) throws Exception {
        return mockMvc.perform(post(DELETE).cookie(session).with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .content(body));
    }

    private ResultActions deleteWithPassword(Cookie session, String password) throws Exception {
        return deleteAccount(session, "{\"password\":\"" + password + "\"}");
    }

    private ResultActions deleteWithCode(Cookie session, String code) throws Exception {
        return deleteAccount(session, "{\"password\":\"" + PASSWORD + "\",\"code\":\"" + code + "\"}");
    }

    private int countFor(String table, String email) {
        return jdbc.queryForObject("SELECT count(*) FROM " + table + " t JOIN users u ON u.id = t.user_id "
                + "WHERE u.email = ?", Integer.class, email);
    }

    @Test
    @DisplayName("returns 204 and expires the SESSION cookie")
    void success() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);

        deleteWithPassword(session, PASSWORD).andExpect(status().isNoContent())
                .andExpect(header().string("Set-Cookie", containsString("SESSION=")))
                .andExpect(header().string("Set-Cookie", containsString("Max-Age=0")));
    }

    @Test
    @DisplayName("afterwards every session of the account is closed and logging in fails")
    void sessionsGone() throws Exception {
        String email = uniqueEmail();
        Cookie first = registerAndLogin(email, PASSWORD);
        Cookie second = login(credentials(email), null);

        deleteWithPassword(first, PASSWORD).andExpect(status().isNoContent());

        mockMvc.perform(get(ME).cookie(first)).andExpect(status().isUnauthorized());
        mockMvc.perform(get(ME).cookie(second)).andExpect(status().isUnauthorized());
        mockMvc.perform(post("/api/v1/auth/login").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .content(credentials(email))).andExpect(status().isUnauthorized());
        assertThat(jdbc.queryForObject("SELECT count(*) FROM spring_session WHERE principal_name = ?",
                Integer.class, email)).isZero();
    }

    @Test
    @DisplayName("progress, tokens and recovery codes are deleted with the account")
    void dataGone() throws Exception {
        String email = uniqueEmail();
        Cookie session = registerAndLogin(email, PASSWORD);
        mockMvc.perform(put("/api/v1/me/quiz-progress/phrasal-verbs").cookie(session).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"state\":{\"schemaVersion\":1,\"mastered\":[3]}}")).andExpect(status().isOk());
        TwoFactorTestAccount account = enableTwoFactor(session, PASSWORD);
        requestPasswordReset(email);
        assertThat(countFor("user_quiz_progress", email)).isPositive();
        assertThat(countFor("user_recovery_codes", email)).isPositive();
        assertThat(countFor("user_tokens", email)).isPositive();
        Long lastStep = jdbc.queryForObject("SELECT totp_last_step FROM users WHERE email = ?", Long.class, email);

        deleteWithCode(account.session(), TotpTestCodes.nextCode(account.secret(), lastStep))
                .andExpect(status().isNoContent());

        assertThat(jdbc.queryForObject("SELECT count(*) FROM users WHERE email = ?", Integer.class, email)).isZero();
        assertThat(jdbc.queryForObject("SELECT count(*) FROM user_quiz_progress p WHERE NOT EXISTS "
                + "(SELECT 1 FROM users u WHERE u.id = p.user_id)", Integer.class)).isZero();
        assertThat(jdbc.queryForObject("SELECT count(*) FROM user_tokens t WHERE NOT EXISTS "
                + "(SELECT 1 FROM users u WHERE u.id = t.user_id)", Integer.class)).isZero();
        assertThat(jdbc.queryForObject("SELECT count(*) FROM user_recovery_codes rc WHERE NOT EXISTS "
                + "(SELECT 1 FROM users u WHERE u.id = rc.user_id)", Integer.class)).isZero();
        assertThat(jdbc.queryForObject("SELECT count(*) FROM spring_session WHERE principal_name = ?",
                Integer.class, email)).isZero();
    }

    @Test
    @DisplayName("the goodbye mail arrives, and the address can register again with a verification mail")
    void mailAndReRegistration() throws Exception {
        String email = uniqueEmail();
        Cookie session = registerAndLogin(email, PASSWORD);
        int verificationsBefore = mailbox.countWithSubject(email, VERIFICATION_SUBJECT);

        deleteWithPassword(session, PASSWORD).andExpect(status().isNoContent());

        mailbox.awaitSubjectCount(email, DELETED_SUBJECT, 1);
        mockMvc.perform(post("/api/v1/auth/register").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .content(credentials(email))).andExpect(status().isAccepted());
        mailbox.awaitSubjectCount(email, VERIFICATION_SUBJECT, verificationsBefore + 1);
        assertThat(mailbox.countWithSubject(email, "You already have a Phrasal account")).isZero();
    }

    @Test
    @DisplayName("a wrong password returns 400 wrong-password and the account keeps working")
    void wrongPassword() throws Exception {
        String email = uniqueEmail();
        Cookie session = registerAndLogin(email, PASSWORD);

        deleteWithPassword(session, "not the password").andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.type").value(endsWith("/wrong-password")));

        mockMvc.perform(get(ME).cookie(session)).andExpect(status().isOk());
        assertThat(mailbox.countWithSubject(email, DELETED_SUBJECT)).isZero();
    }

    @Test
    @DisplayName("a 2FA account needs a valid code: none or a wrong one return 400, a valid TOTP returns 204")
    void twoFactorTotp() throws Exception {
        String email = uniqueEmail();
        TwoFactorTestAccount account = enableTwoFactor(registerAndLogin(email, PASSWORD), PASSWORD);

        deleteWithPassword(account.session(), PASSWORD).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.type").value(endsWith("/invalid-two-factor-code")));
        deleteWithCode(account.session(), "000000").andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.type").value(endsWith("/invalid-two-factor-code")));
        mockMvc.perform(get(ME).cookie(account.session())).andExpect(status().isOk());

        Long lastStep = jdbc.queryForObject("SELECT totp_last_step FROM users WHERE email = ?", Long.class, email);
        deleteWithCode(account.session(), TotpTestCodes.nextCode(account.secret(), lastStep))
                .andExpect(status().isNoContent());
        mockMvc.perform(get(ME).cookie(account.session())).andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("a recovery code is accepted as the second factor")
    void twoFactorRecoveryCode() throws Exception {
        TwoFactorTestAccount account = enableTwoFactor(registerAndLogin(uniqueEmail(), PASSWORD), PASSWORD);

        deleteWithCode(account.session(), account.recoveryCodes().get(0)).andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("a wrong password on a 2FA account is reported before the code is looked at")
    void passwordBeforeCode() throws Exception {
        TwoFactorTestAccount account = enableTwoFactor(registerAndLogin(uniqueEmail(), PASSWORD), PASSWORD);

        deleteAccount(account.session(), "{\"password\":\"not the password\",\"code\":\"000000\"}")
                .andExpect(status().isBadRequest()).andExpect(jsonPath("$.type").value(endsWith("/wrong-password")));
    }

    @Test
    @DisplayName("anonymous requests return 401, and a request without a CSRF token returns 403")
    void authAndCsrf() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);

        mockMvc.perform(post(DELETE).with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .content("{\"password\":\"" + PASSWORD + "\"}")).andExpect(status().isUnauthorized());
        mockMvc.perform(post(DELETE).cookie(session).contentType(MediaType.APPLICATION_JSON)
                .content("{\"password\":\"" + PASSWORD + "\"}")).andExpect(status().isForbidden());
        mockMvc.perform(get(ME).cookie(session)).andExpect(status().isOk());
    }

    @Test
    @DisplayName("a missing password is a validation error")
    void blankPassword() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);

        deleteAccount(session, "{\"password\":\"\"}").andExpect(status().isBadRequest());
    }
}
