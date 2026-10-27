package net.phrasal.integration;

import net.phrasal.domain.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

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

    private static String uniqueEmail() {
        return "Reg-" + UUID.randomUUID() + "@Example.com";
    }

    private static MockHttpServletRequestBuilder register(String email, String password) {
        return post(URL).contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}");
    }

    @Test
    @DisplayName("valid request creates a USER, lower-cases the email and hides the hash")
    void registerSuccess() throws Exception {
        String email = uniqueEmail();

        mockMvc.perform(register(email, PASSWORD).with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.email").value(email.toLowerCase()))
                .andExpect(jsonPath("$.role").value("USER"))
                .andExpect(jsonPath("$.password").doesNotExist())
                .andExpect(jsonPath("$.passwordHash").doesNotExist());

        String hash = userRepository.findByEmail(email.toLowerCase()).orElseThrow().getPasswordHash();
        assertThat(hash).startsWith("{bcrypt}").doesNotContain(PASSWORD);
    }

    @Test
    @DisplayName("same email in different letter case returns 409")
    void duplicateEmail() throws Exception {
        String email = uniqueEmail();
        mockMvc.perform(register(email, PASSWORD).with(csrf())).andExpect(status().isCreated());

        mockMvc.perform(register(email.toUpperCase(), PASSWORD).with(csrf()))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.title").value("Email Already Registered"));
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
}
