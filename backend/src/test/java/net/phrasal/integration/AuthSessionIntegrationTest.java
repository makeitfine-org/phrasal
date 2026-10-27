package net.phrasal.integration;

import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import java.util.UUID;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Full session flow over real cookies, so the principal goes through Spring Session (JDBC).
 */
@DisplayName("Auth session integration")
class AuthSessionIntegrationTest extends AbstractIntegrationTest {

    private static final String ME = "/api/v1/auth/me";
    private static final String LOGOUT = "/api/v1/auth/logout";
    private static final String PASSWORD = "correct horse battery";

    private static String uniqueEmail() {
        return "session-" + UUID.randomUUID() + "@example.com";
    }

    @Test
    @DisplayName("register, login, then /me with the cookie returns the same user")
    void meAfterLogin() throws Exception {
        String email = uniqueEmail();
        Cookie session = registerAndLogin(email, PASSWORD);

        mockMvc.perform(get(ME).cookie(session))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(email))
                .andExpect(jsonPath("$.role").value("USER"));
    }

    @Test
    @DisplayName("/me without a session returns 401 problem+json")
    void meAnonymous() throws Exception {
        mockMvc.perform(get(ME))
                .andExpect(status().isUnauthorized())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON));
    }

    @Test
    @DisplayName("logout returns 204 and invalidates the session")
    void logoutInvalidatesSession() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);

        mockMvc.perform(post(LOGOUT).cookie(session).with(csrf()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get(ME).cookie(session))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("logout without CSRF token returns 403")
    void logoutWithoutCsrf() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);

        mockMvc.perform(post(LOGOUT).cookie(session))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("a real USER session cannot write content")
    void userSessionCannotWrite() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);

        mockMvc.perform(post("/api/v1/phrasal-verbs").cookie(session).with(csrf())
                        .contentType(MediaType.APPLICATION_JSON).content("{}"))
                .andExpect(status().isForbidden());
    }
}
