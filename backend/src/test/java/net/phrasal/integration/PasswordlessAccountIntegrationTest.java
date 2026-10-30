package net.phrasal.integration;

import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.Duration;
import java.util.Map;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.endsWith;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/** An account made by Google sign-in has no password until it sets one through the reset-by-email flow. */
@DisplayName("Accounts without a password integration")
class PasswordlessAccountIntegrationTest extends AbstractIntegrationTest {

    private static final String ME = "/api/v1/auth/me";
    private static final String NEW_PASSWORD = "a brand new passphrase";
    private static final String GUESS = "any password at all";
    /** Request bodies with placeholders: 1 = the guessed current password, 2 = a new password, 3 = a new email. */
    private static final Map<String, String> PASSWORD_ACTION_BODIES = Map.of(
            "/api/v1/me/password", "{\"currentPassword\":\"%1$s\",\"newPassword\":\"%2$s\"}",
            "/api/v1/me/email", "{\"newEmail\":\"%3$s\",\"currentPassword\":\"%1$s\"}",
            "/api/v1/me/delete", "{\"password\":\"%1$s\"}",
            "/api/v1/me/2fa/setup", "{\"password\":\"%1$s\"}");

    @Autowired
    private JdbcTemplate jdbc;

    private static String uniqueEmail() {
        return "passwordless-" + UUID.randomUUID() + "@example.com";
    }

    private static String uniqueSubject() {
        return "sub-" + UUID.randomUUID();
    }

    private static String credentials(String email, String password) {
        return "{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}";
    }

    private static String withoutTimestamp(String json) {
        return json.replaceAll("\"timestamp\":\"[^\"]*\"", "");
    }

    private Map<String, Object> row(String email) {
        return jdbc.queryForMap("SELECT id, password_hash, totp_secret_enc FROM users WHERE email = ?", email);
    }

    private String loginBody(String email, String password) throws Exception {
        return mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON).with(csrf())
                        .content(credentials(email, password)))
                .andExpect(status().isUnauthorized()).andReturn().getResponse().getContentAsString();
    }

    private Cookie setPasswordByEmail(String email) throws Exception {
        resetPassword(requestPasswordReset(email), NEW_PASSWORD).andExpect(status().isNoContent());
        return login(credentials(email, NEW_PASSWORD), null);
    }

    @Test
    @DisplayName("password login answers the same 401 as for an unknown address")
    void passwordLoginLooksLikeUnknownAddress() throws Exception {
        String email = uniqueEmail();
        googleSignIn(uniqueSubject(), email);

        String passwordless = loginBody(email, GUESS);
        String unknown = loginBody(uniqueEmail(), GUESS);

        assertThat(withoutTimestamp(passwordless)).isEqualTo(withoutTimestamp(unknown))
                .contains("Invalid email or password");
    }

    @ParameterizedTest(name = "{0}")
    @ValueSource(strings = {"/api/v1/me/password", "/api/v1/me/email", "/api/v1/me/delete", "/api/v1/me/2fa/setup"})
    @DisplayName("actions that need the current password answer 400 wrong-password and change nothing")
    void passwordActionsRefused(String path) throws Exception {
        String email = uniqueEmail();
        String newEmail = uniqueEmail();
        Cookie session = googleSignIn(uniqueSubject(), email);
        String body = PASSWORD_ACTION_BODIES.get(path).formatted(GUESS, NEW_PASSWORD, newEmail);

        mockMvc.perform(post(path).cookie(session).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.type", endsWith("/wrong-password")));

        Map<String, Object> row = row(email);
        assertThat(row.get("password_hash")).isNull();
        assertThat(row.get("totp_secret_enc")).isNull();
        mockMvc.perform(get(ME).cookie(session)).andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(email))
                .andExpect(jsonPath("$.hasPassword").value(false));
        mailbox.assertNothingSentTo(newEmail, Duration.ofMillis(200));
    }

    @Test
    @DisplayName("a password set by email works for login, keeps the Google link and closes the Google session")
    void setPasswordByEmail() throws Exception {
        String email = uniqueEmail();
        String subject = uniqueSubject();
        Cookie googleSession = googleSignIn(subject, email);
        Long id = (Long) row(email).get("id");

        Cookie passwordSession = setPasswordByEmail(email);

        mockMvc.perform(get(ME).cookie(googleSession)).andExpect(status().isUnauthorized());
        mockMvc.perform(get(ME).cookie(passwordSession)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.hasPassword").value(true));
        mockMvc.perform(get(ME).cookie(googleSignIn(subject, email))).andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.hasPassword").value(true));
    }

    @Test
    @DisplayName("with the new password, deleting the account works")
    void deleteAfterSettingPassword() throws Exception {
        String email = uniqueEmail();
        googleSignIn(uniqueSubject(), email);
        Cookie session = setPasswordByEmail(email);

        mockMvc.perform(post("/api/v1/me/delete").cookie(session).with(csrf()).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"password\":\"" + NEW_PASSWORD + "\"}"))
                .andExpect(status().isNoContent());

        assertThat(jdbc.queryForObject("SELECT COUNT(*) FROM users WHERE email = ?", Integer.class, email)).isZero();
    }
}
