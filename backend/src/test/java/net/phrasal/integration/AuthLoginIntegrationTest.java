package net.phrasal.integration;

import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("POST /api/v1/auth/login integration")
class AuthLoginIntegrationTest extends AbstractIntegrationTest {

    private static final String URL = "/api/v1/auth/login";
    private static final String PASSWORD = "correct horse battery";
    private static final String INVALID = "Invalid email or password";

    private static String uniqueEmail() {
        return "login-" + UUID.randomUUID() + "@example.com";
    }

    private static String body(String email, String password) {
        return "{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}";
    }

    private static String withoutTimestamp(String json) {
        return json.replaceAll("\"timestamp\":\"[^\"]*\"", "");
    }

    private static MockHttpServletRequestBuilder loginRequest(String email, String password) {
        return post(URL).contentType(MediaType.APPLICATION_JSON).content(body(email, password));
    }

    private static MockHttpServletRequestBuilder register(String email) {
        return post("/api/v1/auth/register").contentType(MediaType.APPLICATION_JSON).content(body(email, PASSWORD))
                .with(csrf());
    }

    @Test
    @DisplayName("valid credentials return 200, the user and a SESSION cookie")
    void loginSuccess() throws Exception {
        String email = uniqueEmail();
        registerAndLogin(email, PASSWORD);

        MvcResult result = mockMvc.perform(loginRequest(email, PASSWORD).with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.email").value(email))
                .andExpect(jsonPath("$.role").value("USER"))
                .andExpect(jsonPath("$.passwordHash").doesNotExist())
                .andReturn();

        assertThat(result.getResponse().getCookie("SESSION")).isNotNull();
    }

    @Test
    @DisplayName("the login email is trimmed and lower-cased")
    void emailNormalized() throws Exception {
        String email = uniqueEmail();
        registerAndLogin(email, PASSWORD);

        mockMvc.perform(loginRequest("  " + email.toUpperCase() + " ", PASSWORD).with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(email));
    }

    @Test
    @DisplayName("wrong password returns 401 with a generic message")
    void wrongPassword() throws Exception {
        String email = uniqueEmail();
        registerAndLogin(email, PASSWORD);

        mockMvc.perform(loginRequest(email, "wrong password!").with(csrf()))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.detail").value(INVALID));
    }

    @Test
    @DisplayName("unknown email returns the same 401 body as a wrong password")
    void unknownEmail() throws Exception {
        String email = uniqueEmail();
        registerAndLogin(email, PASSWORD);

        String wrongPassword = mockMvc.perform(loginRequest(email, "wrong password!").with(csrf()))
                .andReturn().getResponse().getContentAsString();
        MvcResult unknown = mockMvc.perform(loginRequest(uniqueEmail(), PASSWORD).with(csrf()))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.detail").value(INVALID))
                .andReturn();

        assertThat(withoutTimestamp(unknown.getResponse().getContentAsString()))
                .isEqualTo(withoutTimestamp(wrongPassword));
    }

    @Test
    @DisplayName("unverified account with the correct password returns 403 and no session")
    void unverifiedCorrectPassword() throws Exception {
        String email = uniqueEmail();
        mockMvc.perform(register(email)).andExpect(status().isAccepted());

        MvcResult result = mockMvc.perform(loginRequest(email, PASSWORD).with(csrf()))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.title").value("Email Not Verified"))
                .andReturn();

        assertThat(result.getResponse().getCookie("SESSION")).isNull();
    }

    @Test
    @DisplayName("unverified account with a wrong password returns the same 401 as an unknown email")
    void unverifiedWrongPassword() throws Exception {
        String email = uniqueEmail();
        mockMvc.perform(register(email)).andExpect(status().isAccepted());

        String unverified = mockMvc.perform(loginRequest(email, "wrong password!").with(csrf()))
                .andExpect(status().isUnauthorized())
                .andReturn().getResponse().getContentAsString();
        String unknown = mockMvc.perform(loginRequest(uniqueEmail(), "wrong password!").with(csrf()))
                .andReturn().getResponse().getContentAsString();

        assertThat(withoutTimestamp(unverified)).isEqualTo(withoutTimestamp(unknown));
    }

    @Test
    @DisplayName("the same account logs in after verification")
    void loginAfterVerification() throws Exception {
        String email = uniqueEmail();
        mockMvc.perform(register(email)).andExpect(status().isAccepted());
        verifyEmail(email);

        mockMvc.perform(loginRequest(email, PASSWORD).with(csrf())).andExpect(status().isOk());
    }

    @Test
    @DisplayName("logging in with an existing session cookie issues a new session id")
    void sessionFixation() throws Exception {
        String email = uniqueEmail();
        Cookie first = registerAndLogin(email, PASSWORD);

        Cookie second = login(body(email, PASSWORD), first);

        assertThat(second).isNotNull();
        assertThat(second.getValue()).isNotEqualTo(first.getValue());
    }

    @Test
    @DisplayName("request without CSRF token returns 403")
    void missingCsrf() throws Exception {
        mockMvc.perform(loginRequest(uniqueEmail(), PASSWORD))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("blank fields return 400 Validation Error")
    void blankFields() throws Exception {
        mockMvc.perform(loginRequest("", "").with(csrf()))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Error"))
                .andExpect(jsonPath("$.errors.email").exists())
                .andExpect(jsonPath("$.errors.password").exists());
    }
}
