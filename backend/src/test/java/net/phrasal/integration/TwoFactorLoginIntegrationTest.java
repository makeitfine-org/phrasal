package net.phrasal.integration;

import jakarta.servlet.http.Cookie;
import net.phrasal.integration.support.TotpTestCodes;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Two-factor login integration")
class TwoFactorLoginIntegrationTest extends AbstractIntegrationTest {

    private static final String ME = "/api/v1/auth/me";
    private static final String PASSWORD = "correct horse battery";

    @Autowired
    private JdbcTemplate jdbc;

    private static String uniqueEmail() {
        return "tfa-login-" + UUID.randomUUID() + "@example.com";
    }

    private static String credentials(String email) {
        return "{\"email\":\"" + email + "\",\"password\":\"" + PASSWORD + "\"}";
    }

    /** A code the server accepts and has not seen: the step after the last accepted one. */
    private String freshCode(TwoFactorTestAccount account, String email) {
        Long lastStep = jdbc.queryForObject("SELECT totp_last_step FROM users WHERE email = ?", Long.class, email);
        return TotpTestCodes.nextCode(account.secret(), lastStep);
    }

    private TwoFactorTestAccount accountWithTwoFactor(String email) throws Exception {
        return enableTwoFactor(registerAndLogin(email, PASSWORD), PASSWORD);
    }

    @Test
    @DisplayName("login of a 2FA account answers 202 with a pending cookie and no user data")
    void loginAnswersChallenge() throws Exception {
        String email = uniqueEmail();
        accountWithTwoFactor(email);

        mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content(credentials(email)).with(csrf()))
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$.twoFactorRequired").value(true))
                .andExpect(jsonPath("$.email").doesNotExist())
                .andExpect(jsonPath("$.id").doesNotExist())
                .andExpect(result -> assertThat(result.getResponse().getCookie("SESSION")).isNotNull());
    }

    @Test
    @DisplayName("the pending session is not authenticated")
    void pendingSessionIsNotAuthenticated() throws Exception {
        String email = uniqueEmail();
        accountWithTwoFactor(email);
        Cookie pending = loginExpectingTwoFactor(credentials(email));

        mockMvc.perform(get(ME).cookie(pending)).andExpect(status().isUnauthorized());
        mockMvc.perform(get("/api/v1/me/quiz-progress/phrasal-verbs").cookie(pending))
                .andExpect(status().isUnauthorized());
        mockMvc.perform(get("/api/v1/me/2fa").cookie(pending)).andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("a valid TOTP completes the login with a new session")
    void totpCompletesLogin() throws Exception {
        String email = uniqueEmail();
        TwoFactorTestAccount account = accountWithTwoFactor(email);
        Cookie pending = loginExpectingTwoFactor(credentials(email));

        Cookie session = submitTwoFactorCode(pending, freshCode(account, email))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(email))
                .andExpect(jsonPath("$.role").value("USER"))
                .andExpect(jsonPath("$.twoFactorEnabled").value(true))
                .andReturn().getResponse().getCookie("SESSION");

        assertThat(session).isNotNull();
        assertThat(session.getValue()).isNotEqualTo(pending.getValue());
        mockMvc.perform(get(ME).cookie(session)).andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(email));
        mockMvc.perform(get(ME).cookie(pending)).andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("the same TOTP in a second login is rejected as a replay")
    void totpReplayRejected() throws Exception {
        String email = uniqueEmail();
        TwoFactorTestAccount account = accountWithTwoFactor(email);
        String code = freshCode(account, email);
        submitTwoFactorCode(loginExpectingTwoFactor(credentials(email)), code).andExpect(status().isOk());

        submitTwoFactorCode(loginExpectingTwoFactor(credentials(email)), code)
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.type").value(containsString("/errors/invalid-two-factor-code")));
    }

    @Test
    @DisplayName("a recovery code logs in once, and the count of remaining codes drops")
    void recoveryCodeWorksOnce() throws Exception {
        String email = uniqueEmail();
        TwoFactorTestAccount account = accountWithTwoFactor(email);
        String recovery = account.recoveryCodes().get(0);

        Cookie session = submitTwoFactorCode(loginExpectingTwoFactor(credentials(email)), recovery)
                .andExpect(status().isOk()).andReturn().getResponse().getCookie("SESSION");

        mockMvc.perform(get("/api/v1/me/2fa").cookie(session)).andExpect(jsonPath("$.recoveryCodesRemaining").value(9));
        submitTwoFactorCode(loginExpectingTwoFactor(credentials(email)), recovery)
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.type").value(containsString("/errors/invalid-two-factor-code")));
    }

    @Test
    @DisplayName("a recovery code typed in lower case without dashes is accepted")
    void recoveryCodeLenientSpelling() throws Exception {
        String email = uniqueEmail();
        TwoFactorTestAccount account = accountWithTwoFactor(email);
        String typed = account.recoveryCodes().get(1).replace("-", "").toLowerCase();

        submitTwoFactorCode(loginExpectingTwoFactor(credentials(email)), typed).andExpect(status().isOk());
    }

    @Test
    @DisplayName("a wrong code is rejected and the same pending login still accepts the right one")
    void wrongCodeKeepsPendingLogin() throws Exception {
        String email = uniqueEmail();
        TwoFactorTestAccount account = accountWithTwoFactor(email);
        Cookie pending = loginExpectingTwoFactor(credentials(email));
        String code = freshCode(account, email);
        String wrong = code.equals("000000") ? "000001" : "000000";

        submitTwoFactorCode(pending, wrong).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.code").isNotEmpty());

        submitTwoFactorCode(pending, code).andExpect(status().isOk());
    }

    @Test
    @DisplayName("the second step without a first step answers 401 two-factor-login-expired")
    void secondStepWithoutFirst() throws Exception {
        mockMvc.perform(post("/api/v1/auth/login/2fa").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"code\":\"123456\"}"))
                .andExpect(status().isUnauthorized())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON))
                .andExpect(jsonPath("$.type").value(containsString("/errors/two-factor-login-expired")));
    }

    @Test
    @DisplayName("the second step without CSRF returns 403")
    void secondStepWithoutCsrf() throws Exception {
        String email = uniqueEmail();
        accountWithTwoFactor(email);
        Cookie pending = loginExpectingTwoFactor(credentials(email));

        mockMvc.perform(post("/api/v1/auth/login/2fa").cookie(pending).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"code\":\"123456\"}"))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("an account without 2FA still logs in with 200")
    void loginWithoutTwoFactorUnchanged() throws Exception {
        String email = uniqueEmail();
        registerAndLogin(email, PASSWORD);

        mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content(credentials(email)).with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(email))
                .andExpect(jsonPath("$.twoFactorEnabled").value(false));
    }

    @Test
    @DisplayName("starting a 2FA login on another user's cookie ends that user's session")
    void pendingLoginEndsPreviousSession() throws Exception {
        String twoFactorEmail = uniqueEmail();
        accountWithTwoFactor(twoFactorEmail);
        Cookie otherUser = registerAndLogin(uniqueEmail(), PASSWORD);
        mockMvc.perform(get(ME).cookie(otherUser)).andExpect(status().isOk());

        loginExpectingTwoFactor(credentials(twoFactorEmail), otherUser);

        mockMvc.perform(get(ME).cookie(otherUser)).andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("after a password reset the account still demands the second factor")
    void passwordResetKeepsTwoFactor() throws Exception {
        String email = uniqueEmail();
        accountWithTwoFactor(email);
        String newPassword = "another long passphrase 42";

        resetPassword(requestPasswordReset(email), newPassword).andExpect(status().isNoContent());

        loginExpectingTwoFactor("{\"email\":\"" + email + "\",\"password\":\"" + newPassword + "\"}");
    }
}
