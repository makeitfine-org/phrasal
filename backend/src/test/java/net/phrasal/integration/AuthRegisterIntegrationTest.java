package net.phrasal.integration;

import net.phrasal.application.dto.AcceptedResponse;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.domain.repository.UserTokenRepository;
import net.phrasal.infrastructure.mail.EmailMessage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("POST /api/v1/auth/register integration")
class AuthRegisterIntegrationTest extends AbstractIntegrationTest {

    private static final String URL = "/api/v1/auth/register";
    private static final String PASSWORD = "correct horse battery";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserTokenRepository userTokenRepository;

    private static String uniqueEmail() {
        return "Reg-" + UUID.randomUUID() + "@Example.com";
    }

    private static MockHttpServletRequestBuilder register(String email, String password) {
        return post(URL).contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}");
    }

    @Test
    @DisplayName("valid request returns 202 with the check-inbox body and stores an unverified bcrypt user")
    void registerSuccess() throws Exception {
        String email = uniqueEmail();

        mockMvc.perform(register(email, PASSWORD).with(csrf()))
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$.message").value(AcceptedResponse.CHECK_INBOX.message()))
                .andExpect(jsonPath("$.id").doesNotExist());

        User user = userRepository.findByEmail(email.toLowerCase()).orElseThrow();
        assertThat(user.getPasswordHash()).startsWith("{bcrypt}").doesNotContain(PASSWORD);
        assertThat(user.getRole()).isEqualTo(Role.USER);
        assertThat(user.isEmailVerified()).isFalse();
    }

    @Test
    @DisplayName("new, unverified and verified addresses get identical responses")
    void noEnumeration() throws Exception {
        String email = uniqueEmail();

        MvcResult fresh = mockMvc.perform(register(email, PASSWORD).with(csrf())).andReturn();
        MvcResult pending = mockMvc.perform(register(email, PASSWORD).with(csrf())).andReturn();
        verifyEmail(email.toLowerCase());
        MvcResult existing = mockMvc.perform(register(email.toUpperCase(), PASSWORD).with(csrf())).andReturn();

        for (MvcResult other : List.of(pending, existing)) {
            assertThat(other.getResponse().getStatus()).isEqualTo(fresh.getResponse().getStatus());
            assertThat(other.getResponse().getContentAsString()).isEqualTo(fresh.getResponse().getContentAsString());
            assertThat(other.getResponse().getContentType()).isEqualTo(fresh.getResponse().getContentType());
        }
    }

    @Test
    @DisplayName("registering an unverified address again replaces the password")
    void unverifiedPasswordReplaced() throws Exception {
        String email = uniqueEmail();
        String lower = email.toLowerCase();
        mockMvc.perform(register(email, PASSWORD).with(csrf())).andExpect(status().isAccepted());
        mockMvc.perform(register(email, "another horse battery").with(csrf())).andExpect(status().isAccepted());
        verifyEmail(lower);

        mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON).with(csrf())
                        .content("{\"email\":\"" + lower + "\",\"password\":\"" + PASSWORD + "\"}"))
                .andExpect(status().isUnauthorized());
        login("{\"email\":\"" + lower + "\",\"password\":\"another horse battery\"}", null);
    }

    @Test
    @DisplayName("registering a verified address sends a notice, keeps the password and creates no token")
    void verifiedGetsNotice() throws Exception {
        String email = uniqueEmail();
        String lower = email.toLowerCase();
        registerAndLogin(lower, PASSWORD);
        String hashBefore = userRepository.findByEmail(lower).orElseThrow().getPasswordHash();
        Long userId = userRepository.findByEmail(lower).orElseThrow().getId();

        mockMvc.perform(register(email, "another horse battery").with(csrf())).andExpect(status().isAccepted());

        List<EmailMessage> messages = mailbox.awaitCount(lower, 2);
        assertThat(messages.get(1).subject()).isEqualTo("You already have a Phrasal account");
        assertThat(userRepository.findByEmail(lower).orElseThrow().getPasswordHash()).isEqualTo(hashBefore);
        assertThat(userTokenRepository.findAll()).filteredOn(token -> token.getUserId().equals(userId))
                .hasSize(1);
    }

    @Test
    @DisplayName("9-character password returns 400 naming the length rule")
    void passwordTooShort() throws Exception {
        mockMvc.perform(register(uniqueEmail(), "a".repeat(9)).with(csrf()))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.password").value(containsString("at least 10")));
    }

    @Test
    @DisplayName("password over 72 bytes returns 400 naming the bytes rule")
    void passwordTooLong() throws Exception {
        mockMvc.perform(register(uniqueEmail(), "a".repeat(73)).with(csrf()))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.password").value(containsString("72 bytes")));
    }

    @Test
    @DisplayName("common password returns 400 naming the blocklist rule")
    void passwordTooCommon() throws Exception {
        mockMvc.perform(register(uniqueEmail(), "Password123").with(csrf()))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.password").value(containsString("too common")));
    }

    @Test
    @DisplayName("single repeated character returns 400")
    void passwordRepeated() throws Exception {
        mockMvc.perform(register(uniqueEmail(), "z".repeat(12)).with(csrf()))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.password").value(containsString("repeated")));
    }

    @Test
    @DisplayName("password containing the email local part returns 400 on the password field")
    void passwordContainsEmail() throws Exception {
        mockMvc.perform(register("janedoe@example.com", "my-JaneDoe-pass").with(csrf()))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.password").value(containsString("email")));
        assertThat(userRepository.findByEmail("janedoe@example.com")).isEmpty();
    }

    @Test
    @DisplayName("invalid email returns 400 Validation Error")
    void invalidEmail() throws Exception {
        mockMvc.perform(register("not-an-email", PASSWORD).with(csrf()))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Error"))
                .andExpect(jsonPath("$.errors.email").exists());
    }

    @Test
    @DisplayName("blank fields return 400 Validation Error")
    void blankFields() throws Exception {
        mockMvc.perform(register("", "").with(csrf()))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Error"))
                .andExpect(jsonPath("$.errors.email").exists())
                .andExpect(jsonPath("$.errors.password").exists());
    }

    @Test
    @DisplayName("request without CSRF token returns 403")
    void missingCsrf() throws Exception {
        mockMvc.perform(register(uniqueEmail(), PASSWORD))
                .andExpect(status().isForbidden());
    }

    private static MockHttpServletRequestBuilder registerWithWebsite(String email, String website) {
        return post(URL).contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"" + email + "\",\"password\":\"" + PASSWORD + "\",\"website\":\""
                        + website + "\"}");
    }

    @Test
    @DisplayName("filled honeypot returns the normal 202 body and stores nothing")
    void honeypotFilled() throws Exception {
        String email = uniqueEmail();
        MvcResult normal = mockMvc.perform(register(uniqueEmail(), PASSWORD).with(csrf())).andReturn();

        MvcResult trapped = mockMvc.perform(registerWithWebsite(email, "http://spam").with(csrf()))
                .andExpect(status().isAccepted())
                .andReturn();

        assertThat(trapped.getResponse().getContentAsString()).isEqualTo(normal.getResponse().getContentAsString());
        assertThat(userRepository.findByEmail(email.toLowerCase())).isEmpty();
    }

    @Test
    @DisplayName("empty website field registers normally")
    void honeypotEmpty() throws Exception {
        String email = uniqueEmail();

        mockMvc.perform(registerWithWebsite(email, "").with(csrf()))
                .andExpect(status().isAccepted());

        assertThat(userRepository.findByEmail(email.toLowerCase())).isPresent();
    }

    @Test
    @DisplayName("website longer than 200 characters returns 400")
    void honeypotTooLong() throws Exception {
        mockMvc.perform(registerWithWebsite(uniqueEmail(), "x".repeat(201)).with(csrf()))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.website").exists());
    }
}
