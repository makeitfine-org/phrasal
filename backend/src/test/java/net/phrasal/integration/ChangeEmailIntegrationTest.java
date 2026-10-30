package net.phrasal.integration;

import jakarta.servlet.http.Cookie;
import net.phrasal.integration.support.TotpTestCodes;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.Duration;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Change email integration")
class ChangeEmailIntegrationTest extends AbstractIntegrationTest {

    private static final String PASSWORD = "correct horse battery";
    private static final String CONFIRM_SUBJECT = "Confirm your new Phrasal email address";
    private static final String CHANGED_SUBJECT = "Your Phrasal email address was changed";
    private static final String EXISTS_SUBJECT = "You already have a Phrasal account";
    private static final String ME = "/api/v1/auth/me";

    @Autowired
    private JdbcTemplate jdbc;

    private static String uniqueEmail() {
        return "change-em-" + UUID.randomUUID() + "@example.com";
    }

    private static String credentials(String email) {
        return "{\"email\":\"" + email + "\",\"password\":\"" + PASSWORD + "\"}";
    }

    private void loginExpecting(String email, int expectedStatus) throws Exception {
        mockMvc.perform(post("/api/v1/auth/login").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .content(credentials(email))).andExpect(status().is(expectedStatus));
    }

    /** Requests the change and returns the raw token that arrived at the new address. */
    private String requestAndReadToken(Cookie session, String newEmail) throws Exception {
        int before = mailbox.countWithSubject(newEmail, CONFIRM_SUBJECT);
        requestEmailChange(session, newEmail, PASSWORD).andExpect(status().isAccepted());
        mailbox.awaitSubjectCount(newEmail, CONFIRM_SUBJECT, before + 1);
        return mailbox.awaitEmailChangeToken(newEmail);
    }

    @Test
    @DisplayName("request returns 202, mails the new address, and the account keeps the old email")
    void request() throws Exception {
        String email = uniqueEmail();
        String newEmail = uniqueEmail();
        Cookie session = registerAndLogin(email, PASSWORD);

        requestEmailChange(session, newEmail, PASSWORD).andExpect(status().isAccepted())
                .andExpect(jsonPath("$.message").value(containsString("Check your inbox")));

        mailbox.awaitSubjectCount(newEmail, CONFIRM_SUBJECT, 1);
        mailbox.assertNothingSentTo("nobody-" + UUID.randomUUID() + "@example.com", Duration.ofMillis(50));
        mockMvc.perform(get(ME).cookie(session)).andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(email));
    }

    @Test
    @DisplayName("confirm returns 204, closes every session, moves the login to the new address and notifies the old")
    void confirm() throws Exception {
        String email = uniqueEmail();
        String newEmail = uniqueEmail();
        Cookie session = registerAndLogin(email, PASSWORD);
        Cookie otherDevice = login(credentials(email), null);
        String token = requestAndReadToken(session, newEmail);

        confirmEmailChange(token).andExpect(status().isNoContent());

        mockMvc.perform(get(ME).cookie(session)).andExpect(status().isUnauthorized());
        mockMvc.perform(get(ME).cookie(otherDevice)).andExpect(status().isUnauthorized());
        loginExpecting(email, 401);
        mockMvc.perform(post("/api/v1/auth/login").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                        .content(credentials(newEmail))).andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(newEmail));
        mailbox.awaitSubjectCount(email, CHANGED_SUBJECT, 1);
    }

    @Test
    @DisplayName("no session row is left for the old or the new address")
    void noSessionsLeft() throws Exception {
        String email = uniqueEmail();
        String newEmail = uniqueEmail();
        Cookie session = registerAndLogin(email, PASSWORD);
        String token = requestAndReadToken(session, newEmail);

        confirmEmailChange(token).andExpect(status().isNoContent());

        for (String principal : new String[] {email, newEmail}) {
            Integer rows = jdbc.queryForObject("SELECT count(*) FROM spring_session WHERE principal_name = ?",
                    Integer.class, principal);
            assertThat(rows).isZero();
        }
    }

    @Test
    @DisplayName("the same link a second time returns 400 email-change-link-invalid")
    void linkWorksOnce() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);
        String token = requestAndReadToken(session, uniqueEmail());
        confirmEmailChange(token).andExpect(status().isNoContent());

        confirmEmailChange(token).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.type").value(containsString("/errors/email-change-link-invalid")));
    }

    @Test
    @DisplayName("a second request replaces the first: the first link is invalid, the second works")
    void secondRequestReplacesFirst() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);
        String firstAddress = uniqueEmail();
        String secondAddress = uniqueEmail();
        String first = requestAndReadToken(session, firstAddress);
        String second = requestAndReadToken(session, secondAddress);

        confirmEmailChange(first).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.type").value(containsString("/errors/email-change-link-invalid")));
        confirmEmailChange(second).andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("an expired link returns 400 email-change-link-expired")
    void expiredLink() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);
        String target = uniqueEmail();
        String token = requestAndReadToken(session, target);
        jdbc.update("UPDATE user_tokens SET expires_at = expires_at - INTERVAL '2 hours' "
                + "WHERE type = 'EMAIL_CHANGE' AND used_at IS NULL AND new_email = ?", target);

        confirmEmailChange(token).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.type").value(containsString("/errors/email-change-link-expired")));
    }

    @Test
    @DisplayName("a taken address returns 202 without a link and the owner gets the account-exists notice")
    void takenAddress() throws Exception {
        String taken = uniqueEmail();
        registerAndLogin(taken, PASSWORD);
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);
        int before = mailbox.countWithSubject(taken, EXISTS_SUBJECT);

        requestEmailChange(session, taken, PASSWORD).andExpect(status().isAccepted());

        mailbox.awaitSubjectCount(taken, EXISTS_SUBJECT, before + 1);
        assertThat(mailbox.countWithSubject(taken, CONFIRM_SUBJECT)).isZero();
    }

    @Test
    @DisplayName("an address taken between request and confirm returns 409 email-change-conflict")
    void takenInBetween() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);
        String target = uniqueEmail();
        String token = requestAndReadToken(session, target);
        registerAndLogin(target, PASSWORD);

        confirmEmailChange(token).andExpect(status().isConflict())
                .andExpect(jsonPath("$.type").value(containsString("/errors/email-change-conflict")));
    }

    @Test
    @DisplayName("the current address in other letter case returns 400 on errors.newEmail")
    void sameAddress() throws Exception {
        String email = uniqueEmail();
        Cookie session = registerAndLogin(email, PASSWORD);

        requestEmailChange(session, email.toUpperCase(), PASSWORD).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.newEmail").value(containsString("different")));
    }

    @Test
    @DisplayName("an invalid address or blank fields return 400")
    void invalidInput() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);

        requestEmailChange(session, "not-an-email", PASSWORD).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.newEmail").exists());
        requestEmailChange(session, "", "").andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.newEmail").exists())
                .andExpect(jsonPath("$.errors.currentPassword").exists());
    }

    @Test
    @DisplayName("a wrong password returns 400 wrong-password and no mail is sent")
    void wrongPassword() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);
        String newEmail = uniqueEmail();

        requestEmailChange(session, newEmail, "not the password").andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.type").value(containsString("/errors/wrong-password")));

        mailbox.assertNothingSentTo(newEmail, Duration.ofMillis(200));
    }

    @Test
    @DisplayName("a 2FA account logs in with the new address, asks for a code, and the same secret still works")
    void twoFactorSurvives() throws Exception {
        String email = uniqueEmail();
        String newEmail = uniqueEmail();
        TwoFactorTestAccount account = enableTwoFactor(registerAndLogin(email, PASSWORD), PASSWORD);
        String token = requestAndReadToken(account.session(), newEmail);
        confirmEmailChange(token).andExpect(status().isNoContent());

        Cookie pending = loginExpectingTwoFactor(credentials(newEmail));
        Long lastStep = jdbc.queryForObject("SELECT totp_last_step FROM users WHERE email = ?", Long.class,
                newEmail);

        submitTwoFactorCode(pending, TotpTestCodes.nextCode(account.secret(), lastStep))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("a password reset link issued before the change stops working")
    void resetLinkInvalidated() throws Exception {
        String email = uniqueEmail();
        Cookie session = registerAndLogin(email, PASSWORD);
        String resetToken = requestPasswordReset(email);
        String token = requestAndReadToken(session, uniqueEmail());
        confirmEmailChange(token).andExpect(status().isNoContent());

        resetPassword(resetToken, "another horse stapler").andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.type").value(containsString("/errors/reset-link-invalid")));
    }

    @Test
    @DisplayName("anonymous request gets 401, no CSRF gets 403, and the anonymous confirm is public")
    void securityRules() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);
        String body = "{\"newEmail\":\"" + uniqueEmail() + "\",\"currentPassword\":\"" + PASSWORD + "\"}";

        mockMvc.perform(post("/api/v1/me/email").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .content(body)).andExpect(status().isUnauthorized());
        mockMvc.perform(post("/api/v1/me/email").cookie(session).contentType(MediaType.APPLICATION_JSON)
                .content(body)).andExpect(status().isForbidden());
        confirmEmailChange("x".repeat(43)).andExpect(status().isBadRequest());
    }
}
