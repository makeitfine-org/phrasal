package net.phrasal.integration;

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
}
