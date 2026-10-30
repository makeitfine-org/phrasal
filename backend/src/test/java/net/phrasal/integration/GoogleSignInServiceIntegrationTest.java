package net.phrasal.integration;

import net.phrasal.application.dto.GoogleIdentity;
import net.phrasal.application.service.GoogleSignInResult;
import net.phrasal.application.service.GoogleSignInResult.Outcome;
import net.phrasal.application.service.GoogleSignInService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Map;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/** {@link GoogleSignInService} against the real database, without the OAuth2 flow around it. */
@DisplayName("Google sign-in service integration")
class GoogleSignInServiceIntegrationTest extends AbstractIntegrationTest {

    private static final String PASSWORD = "correct horse battery";

    @Autowired
    private GoogleSignInService service;

    @Autowired
    private JdbcTemplate jdbc;

    private static String uniqueEmail() {
        return "google-svc-" + UUID.randomUUID() + "@example.com";
    }

    private static String uniqueSubject() {
        return "sub-" + UUID.randomUUID();
    }

    private static String credentials(String email) {
        return "{\"email\":\"" + email + "\",\"password\":\"" + PASSWORD + "\"}";
    }

    private void register(String email) throws Exception {
        mockMvc.perform(post("/api/v1/auth/register").contentType(MediaType.APPLICATION_JSON).with(csrf())
                .content(credentials(email))).andExpect(status().isAccepted());
    }

    private Map<String, Object> row(String email) {
        return jdbc.queryForMap(
                "SELECT id, google_subject, password_hash, email_verified_at FROM users WHERE email = ?", email);
    }

    @Test
    @DisplayName("a first sign-in creates one row; the same identity again signs in to it")
    void createThenSignIn() {
        String email = uniqueEmail();
        GoogleIdentity identity = new GoogleIdentity(uniqueSubject(), email, true);

        GoogleSignInResult first = service.signIn(identity);
        GoogleSignInResult second = service.signIn(identity);

        assertThat(first.outcome()).isEqualTo(Outcome.CREATED);
        assertThat(second.outcome()).isEqualTo(Outcome.SIGNED_IN);
        assertThat(second.principal()).isEqualTo(first.principal());
        assertThat(jdbc.queryForObject("SELECT COUNT(*) FROM users WHERE email = ?", Integer.class, email))
                .isEqualTo(1);
        Map<String, Object> row = row(email);
        assertThat(row.get("google_subject")).isEqualTo(identity.subject());
        assertThat(row.get("password_hash")).isNull();
        assertThat(row.get("email_verified_at")).isNotNull();
    }

    @Test
    @DisplayName("linking an unverified account drops its password and its emailed reset link")
    void linkUnverifiedAccount() throws Exception {
        String email = uniqueEmail();
        register(email);
        String verificationToken = mailbox.awaitVerificationToken(email);
        String resetToken = requestPasswordReset(email);

        GoogleSignInResult result = service.signIn(new GoogleIdentity(uniqueSubject(), email, true));

        assertThat(result.outcome()).isEqualTo(Outcome.LINKED);
        assertThat(result.principal().passwordless()).isTrue();
        Map<String, Object> row = row(email);
        assertThat(row.get("password_hash")).isNull();
        assertThat(row.get("email_verified_at")).isNotNull();
        resetPassword(resetToken, "a brand new passphrase").andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Reset Link Invalid"));
        // The old verification link is spent; redeeming it is the usual no-op for a verified account.
        mockMvc.perform(post("/api/v1/auth/verify-email").contentType(MediaType.APPLICATION_JSON).with(csrf())
                .content("{\"token\":\"" + verificationToken + "\"}")).andExpect(status().isNoContent());
        mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON).with(csrf())
                .content(credentials(email))).andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("linking a verified account keeps its password login")
    void linkVerifiedAccount() throws Exception {
        String email = uniqueEmail();
        registerAndLogin(email, PASSWORD);
        Long id = jdbc.queryForObject("SELECT id FROM users WHERE email = ?", Long.class, email);

        GoogleSignInResult result = service.signIn(new GoogleIdentity(uniqueSubject(), email.toUpperCase(), true));

        assertThat(result.outcome()).isEqualTo(Outcome.LINKED);
        assertThat(result.principal().id()).isEqualTo(id);
        assertThat(result.principal().passwordless()).isFalse();
        login(credentials(email), null);
    }
}
