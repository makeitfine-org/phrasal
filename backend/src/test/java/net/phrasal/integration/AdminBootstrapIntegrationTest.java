package net.phrasal.integration;

import jakarta.servlet.http.Cookie;
import net.phrasal.integration.support.TotpTestCodes;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import net.phrasal.application.service.AdminAccountInitializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.ResultActions;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.endsWith;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@TestPropertySource(properties = {
        "phrasal.security.admin.email=admin@it.test",
        "phrasal.security.admin.password=bootstrap-admin-pass"
})
@DisplayName("Admin bootstrap integration")
class AdminBootstrapIntegrationTest extends AbstractIntegrationTest {

    @Autowired
    private AdminAccountInitializer initializer;

    @Autowired
    private JdbcTemplate jdbc;

    private static final String PASSWORD = "bootstrap-admin-pass";
    private static final String CREATE_VERB = "{\"verb\":\"Boot up\",\"definition\":\"To start a computer\","
            + "\"sentences\":[\"Boot up the laptop.\"],\"wordsToHide\":[\"boot up\"]}";
    private static final String BODY = "{\"email\":\"admin@it.test\",\"password\":\"bootstrap-admin-pass\"}";

    /** The admin outlives every test, so its 2FA state must not leak into the next one. */
    @AfterEach
    void resetAdminTwoFactor() {
        jdbc.update("DELETE FROM user_recovery_codes WHERE user_id = (SELECT id FROM users WHERE email = ?)",
                "admin@it.test");
        jdbc.update("UPDATE users SET totp_secret_enc = NULL, totp_enabled_at = NULL, totp_last_step = NULL "
                + "WHERE email = ?", "admin@it.test");
    }

    private ResultActions createVerb(Cookie session) throws Exception {
        return mockMvc.perform(post("/api/v1/phrasal-verbs").cookie(session).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(CREATE_VERB));
    }

    @Test
    @DisplayName("bootstrapped admin can log in and /me reports ADMIN")
    void adminLogin() throws Exception {
        Cookie session = login(BODY, null);

        mockMvc.perform(get("/api/v1/auth/me").cookie(session))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.role").value("ADMIN"))
                .andExpect(jsonPath("$.twoFactorEnabled").value(false))
                .andExpect(jsonPath("$.twoFactorEnrollmentRequired").value(true));
    }

    @Test
    @DisplayName("admin needs two-factor to write: 403 first, 201 after enrolling and after a 2FA login")
    void adminNeedsTwoFactorToWrite() throws Exception {
        Cookie session = login(BODY, null);
        createVerb(session).andExpect(status().isForbidden());

        TwoFactorTestAccount account = enableTwoFactor(session, PASSWORD);
        createVerb(account.session()).andExpect(status().isCreated());

        mockMvc.perform(post("/api/v1/auth/logout").cookie(account.session()).with(csrf()));
        Cookie pending = loginExpectingTwoFactor(BODY);
        String code = TotpTestCodes.nextCode(account.secret(), TotpTestCodes.currentStep());
        Cookie elevated = submitTwoFactorCode(pending, code).andExpect(status().isOk())
                .andReturn().getResponse().getCookie("SESSION");
        createVerb(elevated).andExpect(status().isCreated());
    }

    @Test
    @DisplayName("actuator metrics: 403 for the unenrolled admin, 200 after enrollment")
    void metricsNeedTwoFactor() throws Exception {
        Cookie session = login(BODY, null);
        mockMvc.perform(get("/actuator/metrics").cookie(session)).andExpect(status().isForbidden());

        TwoFactorTestAccount account = enableTwoFactor(session, PASSWORD);
        mockMvc.perform(get("/actuator/metrics").cookie(account.session())).andExpect(status().isOk());
    }

    @Test
    @DisplayName("disabling 2FA drops the same session back to USER rights")
    void disableRemovesAdminRights() throws Exception {
        TwoFactorTestAccount account = enableTwoFactor(login(BODY, null), PASSWORD);
        String code = TotpTestCodes.nextCode(account.secret(), TotpTestCodes.currentStep());

        Cookie refreshed = mockMvc.perform(post("/api/v1/me/2fa/disable").cookie(account.session()).with(csrf())
                        .contentType(MediaType.APPLICATION_JSON).content("{\"code\":\"" + code + "\"}"))
                .andExpect(status().isNoContent()).andReturn().getResponse().getCookie("SESSION");

        createVerb(refreshed).andExpect(status().isForbidden());
        mockMvc.perform(get("/api/v1/auth/me").cookie(refreshed))
                .andExpect(jsonPath("$.twoFactorEnrollmentRequired").value(true));
    }

    @Test
    @DisplayName("the admin cannot change the password through the account endpoint: 403 admin-account-managed")
    void adminCannotChangePassword() throws Exception {
        Cookie session = login(BODY, null);

        mockMvc.perform(post("/api/v1/me/password").cookie(session).with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"currentPassword\":\"" + PASSWORD + "\",\"newPassword\":\"another-admin-pass\"}"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.type").value(endsWith("/admin-account-managed")));
        login(BODY, null);
    }

    @Test
    @DisplayName("the admin cannot change the email through the account endpoint: 403 admin-account-managed")
    void adminCannotChangeEmail() throws Exception {
        Cookie session = login(BODY, null);

        mockMvc.perform(post("/api/v1/me/email").cookie(session).with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"newEmail\":\"admin2@it.test\",\"currentPassword\":\"" + PASSWORD + "\"}"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.type").value(endsWith("/admin-account-managed")));
    }

    @Test
    @DisplayName("the admin cannot delete the account: 403 admin-account-managed, and can still log in")
    void adminCannotDeleteAccount() throws Exception {
        Cookie session = login(BODY, null);

        mockMvc.perform(post("/api/v1/me/delete").cookie(session).with(csrf())
                        .contentType(MediaType.APPLICATION_JSON).content("{\"password\":\"" + PASSWORD + "\"}"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.type").value(endsWith("/admin-account-managed")));

        login(BODY, null);
    }

    @Test
    @DisplayName("the bootstrap re-run keeps the admin's 2FA enrollment")
    void bootstrapKeepsTwoFactor() throws Exception {
        enableTwoFactor(login(BODY, null), PASSWORD);
        String before = jdbc.queryForObject(
                "SELECT totp_secret_enc || totp_enabled_at FROM users WHERE email = 'admin@it.test'", String.class);

        initializer.run(null);

        String after = jdbc.queryForObject(
                "SELECT totp_secret_enc || totp_enabled_at FROM users WHERE email = 'admin@it.test'", String.class);
        assertThat(after).isEqualTo(before);
    }

    @Test
    @DisplayName("admin session can save and read its own quiz progress")
    void adminOwnProgress() throws Exception {
        Cookie session = login(BODY, null);
        String url = "/api/v1/me/quiz-progress/phrasal-verbs";

        mockMvc.perform(put(url).cookie(session).with(csrf()).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"state\":{\"excluded\":[1]}}"))
                .andExpect(status().isOk());

        mockMvc.perform(get(url).cookie(session))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.state.excluded[0]").value(1));
    }

    @Test
    @DisplayName("registering the admin email returns 202, keeps the admin password and sends a notice")
    void adminEmailTaken() throws Exception {
        mockMvc.perform(post("/api/v1/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"Admin@It.Test\",\"password\":\"another-long-password\"}")
                        .with(csrf()))
                .andExpect(status().isAccepted());

        assertThat(mailbox.awaitLatest("admin@it.test").subject()).isEqualTo("You already have a Phrasal account");
        login(BODY, null);
    }

    @Test
    @DisplayName("an admin can reset the password by email, and the next start restores the configured one")
    void adminResetThenRestart() throws Exception {
        String token = requestPasswordReset("admin@it.test");
        resetPassword(token, "an entirely different passphrase").andExpect(status().isNoContent());
        mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON).with(csrf())
                .content(BODY)).andExpect(status().isUnauthorized());

        initializer.run(null);

        login(BODY, null);
    }
}
