package net.phrasal.integration;

import jakarta.servlet.http.Cookie;
import net.phrasal.infrastructure.mail.EmailMessage;
import net.phrasal.infrastructure.security.SecureTokenGenerator;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Password reset integration")
class PasswordResetIntegrationTest extends AbstractIntegrationTest {

    private static final String PASSWORD = "correct horse battery";
    private static final String CHECK_INBOX =
            "{\"message\":\"If this address can be used, we have sent a link to it. Check your inbox.\"}";
    private static final String TOKEN_PREFIX = "/reset-password?token=";
    private static final String NEW_PASSWORD = "a completely different one";

    @Autowired
    private JdbcTemplate jdbc;

    @Value("${phrasal.app.base-url}")
    private String baseUrl;

    private static String uniqueEmail() {
        return "reset-" + UUID.randomUUID() + "@example.com";
    }

    private static MockHttpServletRequestBuilder forgotRequest(String email) {
        return post("/api/v1/auth/forgot-password").contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"" + email + "\"}");
    }

    private void register(String email) throws Exception {
        mockMvc.perform(post("/api/v1/auth/register").contentType(MediaType.APPLICATION_JSON).with(csrf())
                .content("{\"email\":\"" + email + "\",\"password\":\"" + PASSWORD + "\"}"))
                .andExpect(status().isAccepted());
    }

    private static String credentials(String email, String password) {
        return "{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}";
    }

    private void expectLogin(String email, String password, int expectedStatus) throws Exception {
        mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON).with(csrf())
                .content(credentials(email, password))).andExpect(status().is(expectedStatus));
    }

    private void expireToken(String rawToken) {
        jdbc.update("UPDATE user_tokens SET expires_at = localtimestamp - interval '1 minute' WHERE token_hash = ?",
                SecureTokenGenerator.hash(rawToken));
    }

    private String passwordHash(String email) {
        return jdbc.queryForObject("SELECT password_hash FROM users WHERE email = ?", String.class, email);
    }

    private boolean tokenUsed(String rawToken) {
        return jdbc.queryForObject("SELECT used_at IS NOT NULL FROM user_tokens WHERE token_hash = ?",
                Boolean.class, SecureTokenGenerator.hash(rawToken));
    }

    private int tokenRows(String hash) {
        return jdbc.queryForObject("SELECT count(*) FROM user_tokens WHERE token_hash = ?", Integer.class, hash);
    }

    @Test
    @DisplayName("forgot-password for a verified user returns the generic body and mails one link to the base URL")
    void verifiedUserGetsLink() throws Exception {
        String email = uniqueEmail();
        registerAndLogin(email, PASSWORD);

        mockMvc.perform(forgotRequest(email).with(csrf()))
                .andExpect(status().isAccepted())
                .andExpect(content().json(CHECK_INBOX, true));

        mailbox.awaitSubjectCount(email, PASSWORD_RESET_SUBJECT, 1);
        EmailMessage message = mailbox.awaitSubject(email, PASSWORD_RESET_SUBJECT);
        assertThat(mailbox.countWithSubject(email, PASSWORD_RESET_SUBJECT)).isEqualTo(1);
        assertThat(message.text()).contains(baseUrl + TOKEN_PREFIX);
    }

    @Test
    @DisplayName("an unknown address gets a byte-identical response and no email")
    void unknownEmailLooksTheSame() throws Exception {
        String known = uniqueEmail();
        registerAndLogin(known, PASSWORD);
        String unknown = uniqueEmail();

        String knownBody = mockMvc.perform(forgotRequest(known).with(csrf())).andExpect(status().isAccepted())
                .andReturn().getResponse().getContentAsString();
        String unknownBody = mockMvc.perform(forgotRequest(unknown).with(csrf())).andExpect(status().isAccepted())
                .andReturn().getResponse().getContentAsString();

        assertThat(unknownBody).isEqualTo(knownBody).isEqualTo(CHECK_INBOX);
        mailbox.assertNothingSentTo(unknown, Duration.ofSeconds(1));
    }

    @Test
    @DisplayName("an unverified account also gets a reset link")
    void unverifiedUserGetsLink() throws Exception {
        String email = uniqueEmail();
        register(email);

        String token = requestPasswordReset(email);

        assertThat(token).hasSize(43);
    }

    @Test
    @DisplayName("padded upper-case input reaches the right account")
    void inputIsNormalized() throws Exception {
        String email = uniqueEmail();
        registerAndLogin(email, PASSWORD);

        mockMvc.perform(forgotRequest("  " + email.toUpperCase() + " ").with(csrf()))
                .andExpect(status().isAccepted());

        mailbox.awaitSubjectCount(email, PASSWORD_RESET_SUBJECT, 1);
    }

    @Test
    @DisplayName("only the hash is stored, with type PASSWORD_RESET and an expiry about one hour away")
    void storesOnlyHash() throws Exception {
        String email = uniqueEmail();
        registerAndLogin(email, PASSWORD);

        String raw = requestPasswordReset(email);

        assertThat(tokenRows(raw)).isZero();
        String hash = SecureTokenGenerator.hash(raw);
        assertThat(tokenRows(hash)).isEqualTo(1);
        assertThat(jdbc.queryForObject("SELECT type FROM user_tokens WHERE token_hash = ?", String.class, hash))
                .isEqualTo("PASSWORD_RESET");
        LocalDateTime expiresAt = jdbc.queryForObject("SELECT expires_at FROM user_tokens WHERE token_hash = ?",
                LocalDateTime.class, hash);
        assertThat(expiresAt).isBetween(LocalDateTime.now().plusMinutes(55), LocalDateTime.now().plusMinutes(65));
    }

    @Test
    @DisplayName("a second request kills the first link and leaves verification tokens alone")
    void secondRequestReplacesFirst() throws Exception {
        String email = uniqueEmail();
        register(email);
        String verification = mailbox.awaitVerificationToken(email);
        String first = requestPasswordReset(email);

        String second = requestPasswordReset(email);

        assertThat(second).isNotEqualTo(first);
        assertThat(jdbc.queryForObject("SELECT used_at IS NOT NULL FROM user_tokens WHERE token_hash = ?",
                Boolean.class, SecureTokenGenerator.hash(first))).isTrue();
        assertThat(jdbc.queryForObject("SELECT used_at IS NULL FROM user_tokens WHERE token_hash = ?",
                Boolean.class, SecureTokenGenerator.hash(second))).isTrue();
        assertThat(jdbc.queryForObject("SELECT used_at IS NULL FROM user_tokens WHERE token_hash = ?",
                Boolean.class, SecureTokenGenerator.hash(verification))).isTrue();
    }

    @Test
    @DisplayName("a request without CSRF is 403, a blank or oversized email is 400")
    void rejectsBadRequests() throws Exception {
        mockMvc.perform(forgotRequest(uniqueEmail())).andExpect(status().isForbidden());
        mockMvc.perform(forgotRequest("   ").with(csrf()))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Error"));
        mockMvc.perform(forgotRequest("a".repeat(255)).with(csrf())).andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("reset changes the password, uses the token and does not log the caller in")
    void resetHappyPath() throws Exception {
        String email = uniqueEmail();
        registerAndLogin(email, PASSWORD);
        String oldHash = passwordHash(email);
        String token = requestPasswordReset(email);

        var result = resetPassword(token, NEW_PASSWORD).andExpect(status().isNoContent()).andReturn();

        assertThat(result.getResponse().getCookie("SESSION")).isNull();
        expectLogin(email, PASSWORD, 401);
        expectLogin(email, NEW_PASSWORD, 200);
        assertThat(passwordHash(email)).isNotEqualTo(oldHash).startsWith("{bcrypt}");
        assertThat(tokenUsed(token)).isTrue();
    }

    @Test
    @DisplayName("a link works only once")
    void tokenIsSingleUse() throws Exception {
        String email = uniqueEmail();
        registerAndLogin(email, PASSWORD);
        String token = requestPasswordReset(email);
        resetPassword(token, NEW_PASSWORD).andExpect(status().isNoContent());

        resetPassword(token, "yet another passphrase").andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Reset Link Invalid"));

        expectLogin(email, NEW_PASSWORD, 200);
    }

    @Test
    @DisplayName("an expired link is 400 Reset Link Expired and the old password still works")
    void expiredToken() throws Exception {
        String email = uniqueEmail();
        registerAndLogin(email, PASSWORD);
        String token = requestPasswordReset(email);
        expireToken(token);

        resetPassword(token, NEW_PASSWORD).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Reset Link Expired"));

        expectLogin(email, PASSWORD, 200);
    }

    @Test
    @DisplayName("unknown, blank, missing and oversized tokens are rejected")
    void badTokens() throws Exception {
        resetPassword("A".repeat(43), NEW_PASSWORD).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Reset Link Invalid"));
        resetPassword("", NEW_PASSWORD).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Error"));
        resetPassword("A".repeat(101), NEW_PASSWORD).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Error"));
        mockMvc.perform(post("/api/v1/auth/reset-password").contentType(MediaType.APPLICATION_JSON).with(csrf())
                .content("{\"password\":\"" + NEW_PASSWORD + "\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Error"));
    }

    @Test
    @DisplayName("verification and reset tokens are not interchangeable")
    void tokenTypesAreSeparate() throws Exception {
        String email = uniqueEmail();
        register(email);
        String verification = mailbox.awaitVerificationToken(email);
        String reset = requestPasswordReset(email);

        resetPassword(verification, NEW_PASSWORD).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Reset Link Invalid"));
        mockMvc.perform(post("/api/v1/auth/verify-email").contentType(MediaType.APPLICATION_JSON).with(csrf())
                .content("{\"token\":\"" + reset + "\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Verification Link Invalid"));
    }

    @Test
    @DisplayName("a weak password is 400 with errors.password and the same link works afterwards")
    void weakPasswordKeepsToken() throws Exception {
        String email = uniqueEmail();
        registerAndLogin(email, PASSWORD);
        String token = requestPasswordReset(email);

        resetPassword(token, "short").andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.password").value(org.hamcrest.Matchers.containsString("at least")));
        resetPassword(token, "password123").andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.password").exists());

        assertThat(tokenUsed(token)).isFalse();
        resetPassword(token, NEW_PASSWORD).andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("a password containing the email is 400 and the same link works afterwards")
    void passwordWithEmailKeepsToken() throws Exception {
        String email = uniqueEmail();
        registerAndLogin(email, PASSWORD);
        String token = requestPasswordReset(email);

        resetPassword(token, "pre-" + email + "-post").andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Error"))
                .andExpect(jsonPath("$.errors.password")
                        .value(org.hamcrest.Matchers.containsString("must not contain your email")));

        assertThat(tokenUsed(token)).isFalse();
        expectLogin(email, PASSWORD, 200);
        resetPassword(token, NEW_PASSWORD).andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("only the newest link works")
    void newestLinkOnly() throws Exception {
        String email = uniqueEmail();
        registerAndLogin(email, PASSWORD);
        String first = requestPasswordReset(email);
        String second = requestPasswordReset(email);

        resetPassword(first, NEW_PASSWORD).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Reset Link Invalid"));
        resetPassword(second, NEW_PASSWORD).andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("reset ends every session of the account, including the caller's, and spares other users")
    void resetRevokesSessions() throws Exception {
        String email = uniqueEmail();
        Cookie first = registerAndLogin(email, PASSWORD);
        Cookie second = login(credentials(email, PASSWORD), null);
        String bystander = uniqueEmail();
        Cookie bystanderSession = registerAndLogin(bystander, PASSWORD);
        String token = requestPasswordReset(email);

        mockMvc.perform(post("/api/v1/auth/reset-password").contentType(MediaType.APPLICATION_JSON).cookie(first)
                .content("{\"token\":\"" + token + "\",\"password\":\"" + NEW_PASSWORD + "\"}").with(csrf()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/v1/auth/me").cookie(first)).andExpect(status().isUnauthorized());
        mockMvc.perform(get("/api/v1/auth/me").cookie(second)).andExpect(status().isUnauthorized());
        assertThat(jdbc.queryForObject("SELECT count(*) FROM spring_session WHERE principal_name = ?",
                Integer.class, email)).isZero();
        mockMvc.perform(get("/api/v1/auth/me").cookie(bystanderSession)).andExpect(status().isOk());
    }

    @Test
    @DisplayName("resetting an unverified account verifies it; its old verification link stays a harmless no-op")
    void resetVerifiesAccount() throws Exception {
        String email = uniqueEmail();
        register(email);
        String verification = mailbox.awaitVerificationToken(email);
        String token = requestPasswordReset(email);

        resetPassword(token, NEW_PASSWORD).andExpect(status().isNoContent());

        expectLogin(email, NEW_PASSWORD, 200);
        assertThat(jdbc.queryForObject("SELECT email_verified_at IS NOT NULL FROM users WHERE email = ?",
                Boolean.class, email)).isTrue();
        assertThat(tokenUsed(verification)).isTrue();
        mockMvc.perform(post("/api/v1/auth/verify-email").contentType(MediaType.APPLICATION_JSON).with(csrf())
                .content("{\"token\":\"" + verification + "\"}"))
                .andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("a password-changed notice with a link to forgot-password and no token is sent")
    void changedNotice() throws Exception {
        String email = uniqueEmail();
        registerAndLogin(email, PASSWORD);
        String token = requestPasswordReset(email);

        resetPassword(token, NEW_PASSWORD).andExpect(status().isNoContent());

        EmailMessage notice = mailbox.awaitSubject(email, "Your Phrasal password was changed");
        assertThat(notice.text()).contains(baseUrl + "/forgot-password").doesNotContain("token=");
    }

    @Test
    @DisplayName("reset without CSRF is 403")
    void resetNeedsCsrf() throws Exception {
        mockMvc.perform(post("/api/v1/auth/reset-password").contentType(MediaType.APPLICATION_JSON)
                .content("{\"token\":\"abc\",\"password\":\"" + NEW_PASSWORD + "\"}"))
                .andExpect(status().isForbidden());
    }
}
