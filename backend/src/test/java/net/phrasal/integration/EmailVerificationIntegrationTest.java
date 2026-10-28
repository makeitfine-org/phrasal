package net.phrasal.integration;

import net.phrasal.infrastructure.mail.EmailMessage;
import net.phrasal.infrastructure.security.SecureTokenGenerator;
import net.phrasal.integration.support.RecordingEmailSender;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import java.time.Duration;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Email verification integration")
class EmailVerificationIntegrationTest extends AbstractIntegrationTest {

    private static final String PASSWORD = "correct horse battery";
    private static final String CHECK_INBOX =
            "{\"message\":\"If this address can be used, we have sent a link to it. Check your inbox.\"}";

    @Autowired
    private JdbcTemplate jdbc;

    @Value("${phrasal.app.base-url}")
    private String baseUrl;

    private static String uniqueEmail() {
        return "verify-" + UUID.randomUUID() + "@example.com";
    }

    private void register(String email) throws Exception {
        mockMvc.perform(post("/api/v1/auth/register").contentType(MediaType.APPLICATION_JSON).with(csrf())
                .content("{\"email\":\"" + email + "\",\"password\":\"" + PASSWORD + "\"}"))
                .andExpect(status().isCreated());
    }

    private MockHttpServletRequestBuilder verifyRequest(String token) {
        return post("/api/v1/auth/verify-email").contentType(MediaType.APPLICATION_JSON)
                .content("{\"token\":\"" + token + "\"}");
    }

    private MockHttpServletRequestBuilder resendRequest(String email) {
        return post("/api/v1/auth/resend-verification").contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"" + email + "\"}");
    }

    private boolean isVerified(String email) {
        return jdbc.queryForObject("SELECT email_verified_at IS NOT NULL FROM users WHERE email = ?",
                Boolean.class, email);
    }

    @Test
    @DisplayName("register sends exactly one verification email with a link to the configured base URL")
    void registerSendsEmail() throws Exception {
        String email = uniqueEmail();
        register(email);

        List<EmailMessage> messages = mailbox.awaitCount(email, 1);

        assertThat(messages).hasSize(1);
        assertThat(messages.get(0).subject()).isEqualTo("Confirm your Phrasal account");
        assertThat(messages.get(0).text()).contains(baseUrl + "/verify-email?token=");
        mailbox.assertNothingSentTo("nobody-" + email, Duration.ofMillis(50));
    }

    @Test
    @DisplayName("verify-email marks the user verified and the token used, and a repeat is still 204")
    void verifyAndRepeat() throws Exception {
        String email = uniqueEmail();
        register(email);
        String token = mailbox.awaitVerificationToken(email);
        assertThat(isVerified(email)).isFalse();

        mockMvc.perform(verifyRequest(token).with(csrf())).andExpect(status().isNoContent());

        assertThat(isVerified(email)).isTrue();
        assertThat(jdbc.queryForObject("SELECT used_at IS NOT NULL FROM user_tokens WHERE token_hash = ?",
                Boolean.class, SecureTokenGenerator.hash(token))).isTrue();
        mockMvc.perform(verifyRequest(token).with(csrf())).andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("an unknown, blank or oversized token is rejected with 400")
    void invalidTokens() throws Exception {
        mockMvc.perform(verifyRequest("A".repeat(43)).with(csrf()))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Verification Link Invalid"));
        mockMvc.perform(verifyRequest("").with(csrf()))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Error"));
        mockMvc.perform(post("/api/v1/auth/verify-email").contentType(MediaType.APPLICATION_JSON).content("{}")
                .with(csrf()))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Error"));
        mockMvc.perform(verifyRequest("A".repeat(101)).with(csrf())).andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("an expired token is rejected with 400 and the user stays unverified")
    void expiredToken() throws Exception {
        String email = uniqueEmail();
        register(email);
        String token = mailbox.awaitVerificationToken(email);
        jdbc.update("UPDATE user_tokens SET expires_at = localtimestamp - interval '1 minute' WHERE token_hash = ?",
                SecureTokenGenerator.hash(token));

        mockMvc.perform(verifyRequest(token).with(csrf()))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Verification Link Expired"));

        assertThat(isVerified(email)).isFalse();
    }

    @Test
    @DisplayName("resend for an unverified user sends a new link and kills the first one")
    void resendReplacesOldLink() throws Exception {
        String email = uniqueEmail();
        register(email);
        String first = mailbox.awaitVerificationToken(email);

        mockMvc.perform(resendRequest(email).with(csrf()))
                .andExpect(status().isAccepted())
                .andExpect(content().json(CHECK_INBOX, true));
        List<EmailMessage> messages = mailbox.awaitCount(email, 2);
        String second = RecordingEmailSender.extractToken(messages.get(1));

        assertThat(second).isNotEqualTo(first);
        mockMvc.perform(verifyRequest(first).with(csrf()))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Verification Link Invalid"));
        mockMvc.perform(verifyRequest(second).with(csrf())).andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("resend for an unknown address answers identically and sends nothing")
    void resendUnknown() throws Exception {
        String email = uniqueEmail();

        String body = mockMvc.perform(resendRequest(email).with(csrf()))
                .andExpect(status().isAccepted())
                .andReturn().getResponse().getContentAsString();

        assertThat(body).isEqualTo(CHECK_INBOX);
        mailbox.assertNothingSentTo(email, Duration.ofSeconds(1));
    }

    @Test
    @DisplayName("resend for a verified user answers identically and sends nothing more")
    void resendVerified() throws Exception {
        String email = uniqueEmail();
        register(email);
        verifyEmail(email);

        String body = mockMvc.perform(resendRequest(email).with(csrf()))
                .andExpect(status().isAccepted())
                .andReturn().getResponse().getContentAsString();

        assertThat(body).isEqualTo(CHECK_INBOX);
        Thread.sleep(500);
        assertThat(mailbox.awaitCount(email, 1)).hasSize(1);
    }

    @Test
    @DisplayName("resend-verification rejects a blank or oversized email with 400")
    void resendValidation() throws Exception {
        mockMvc.perform(resendRequest("").with(csrf())).andExpect(status().isBadRequest());
        mockMvc.perform(resendRequest("a".repeat(250) + "@b.com").with(csrf())).andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("verify-email and resend-verification require a CSRF token")
    void csrfRequired() throws Exception {
        mockMvc.perform(verifyRequest("A".repeat(43))).andExpect(status().isForbidden());
        mockMvc.perform(resendRequest(uniqueEmail())).andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("the database holds only the hash of the token")
    void rawTokenNeverStored() throws Exception {
        String email = uniqueEmail();
        register(email);
        String token = mailbox.awaitVerificationToken(email);

        Integer raw = jdbc.queryForObject("SELECT count(*) FROM user_tokens WHERE token_hash = ?",
                Integer.class, token);
        Integer hashed = jdbc.queryForObject("SELECT count(*) FROM user_tokens WHERE token_hash = ?",
                Integer.class, SecureTokenGenerator.hash(token));

        assertThat(raw).isZero();
        assertThat(hashed).isEqualTo(1);
    }
}
