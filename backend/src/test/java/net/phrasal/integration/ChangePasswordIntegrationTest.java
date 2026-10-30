package net.phrasal.integration;

import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Change password integration")
class ChangePasswordIntegrationTest extends AbstractIntegrationTest {

    private static final String URL = "/api/v1/me/password";
    private static final String PASSWORD = "correct horse battery";
    private static final String NEW_PASSWORD = "another horse stapler";
    private static final String SUBJECT = "Your Phrasal password was changed";

    private static String uniqueEmail() {
        return "change-pw-" + UUID.randomUUID() + "@example.com";
    }

    private static String credentials(String email, String password) {
        return "{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}";
    }

    private static String body(String current, String next) {
        return "{\"currentPassword\":\"" + current + "\",\"newPassword\":\"" + next + "\"}";
    }

    private ResultActions change(Cookie session, String json) throws Exception {
        return mockMvc.perform(post(URL).cookie(session).with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .content(json));
    }

    private void loginExpecting(String email, String password, int expectedStatus) throws Exception {
        mockMvc.perform(post("/api/v1/auth/login").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .content(credentials(email, password))).andExpect(status().is(expectedStatus));
    }

    @Test
    @DisplayName("success returns 204 with a new session cookie; the old password stops working, the new one works")
    void success() throws Exception {
        String email = uniqueEmail();
        Cookie session = registerAndLogin(email, PASSWORD);

        Cookie fresh = change(session, body(PASSWORD, NEW_PASSWORD)).andExpect(status().isNoContent())
                .andReturn().getResponse().getCookie("SESSION");

        assertThat(fresh).isNotNull();
        assertThat(fresh.getValue()).isNotEqualTo(session.getValue());
        mockMvc.perform(get("/api/v1/auth/me").cookie(fresh)).andExpect(status().isOk());
        loginExpecting(email, PASSWORD, 401);
        loginExpecting(email, NEW_PASSWORD, 200);
    }

    @Test
    @DisplayName("another open session is closed, this one stays signed in, and the notice mail arrives")
    void otherSessionsClosed() throws Exception {
        String email = uniqueEmail();
        Cookie session = registerAndLogin(email, PASSWORD);
        Cookie otherDevice = login(credentials(email, PASSWORD), null);
        int before = mailbox.countWithSubject(email, SUBJECT);

        Cookie fresh = change(session, body(PASSWORD, NEW_PASSWORD)).andExpect(status().isNoContent())
                .andReturn().getResponse().getCookie("SESSION");

        mockMvc.perform(get("/api/v1/auth/me").cookie(otherDevice)).andExpect(status().isUnauthorized());
        mockMvc.perform(get("/api/v1/auth/me").cookie(fresh)).andExpect(status().isOk());
        mailbox.awaitSubjectCount(email, SUBJECT, before + 1);
    }

    @Test
    @DisplayName("a 2FA account keeps twoFactorEnabled after the change")
    void keepsTwoFactor() throws Exception {
        String email = uniqueEmail();
        TwoFactorTestAccount account = enableTwoFactor(registerAndLogin(email, PASSWORD), PASSWORD);

        Cookie fresh = change(account.session(), body(PASSWORD, NEW_PASSWORD)).andExpect(status().isNoContent())
                .andReturn().getResponse().getCookie("SESSION");

        mockMvc.perform(get("/api/v1/auth/me").cookie(fresh)).andExpect(status().isOk())
                .andExpect(jsonPath("$.twoFactorEnabled").value(true));
    }

    @Test
    @DisplayName("a wrong current password returns 400 wrong-password and the old password still works")
    void wrongCurrent() throws Exception {
        String email = uniqueEmail();
        Cookie session = registerAndLogin(email, PASSWORD);

        change(session, body("not the password", NEW_PASSWORD)).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.type").value(containsString("/errors/wrong-password")));

        loginExpecting(email, PASSWORD, 200);
    }

    @Test
    @DisplayName("a 9-character new password returns 400 on errors.newPassword")
    void tooShort() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);

        change(session, body(PASSWORD, "abcdefg-9")).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.newPassword").value(containsString("at least 10")));
    }

    @Test
    @DisplayName("a new password containing the email returns 400 on errors.newPassword")
    void containsEmail() throws Exception {
        String email = uniqueEmail();
        Cookie session = registerAndLogin(email, PASSWORD);

        change(session, body(PASSWORD, "x" + email + "x")).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.newPassword").exists());
    }

    @Test
    @DisplayName("a new password equal to the current one returns 400 on errors.newPassword")
    void sameAsCurrent() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);

        change(session, body(PASSWORD, PASSWORD)).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.newPassword").value(containsString("different")));
    }

    @Test
    @DisplayName("blank fields return a 400 validation error")
    void blankFields() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);

        change(session, body("", "")).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.currentPassword").exists())
                .andExpect(jsonPath("$.errors.newPassword").exists());
    }

    @Test
    @DisplayName("anonymous gets 401, and a request without CSRF gets 403")
    void anonymousAndCsrf() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);

        mockMvc.perform(post(URL).with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .content(body(PASSWORD, NEW_PASSWORD))).andExpect(status().isUnauthorized());
        mockMvc.perform(post(URL).cookie(session).contentType(MediaType.APPLICATION_JSON)
                .content(body(PASSWORD, NEW_PASSWORD))).andExpect(status().isForbidden());
    }
}
