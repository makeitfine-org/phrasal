package net.phrasal.integration;

import jakarta.servlet.http.Cookie;
import net.phrasal.infrastructure.security.BreachedPasswordChecker;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.password.CompromisedPasswordChecker;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.ResultActions;

import java.time.Duration;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/** Every breach scenario lives here, because the mocked checker makes this a separate Spring context. */
@DisplayName("Breached password integration")
class BreachedPasswordIntegrationTest extends AbstractIntegrationTest {

    private static final String PASSWORD = "correct horse battery";
    private static final String BREACHED = "password-seen-in-breach";
    private static final String CLEAN = "clean passphrase nobody uses";

    @MockitoBean
    private BreachedPasswordChecker checker;

    @Autowired
    private ApplicationContext context;

    private static String uniqueEmail() {
        return "breach-" + UUID.randomUUID() + "@example.com";
    }

    private ResultActions register(String email, String password) throws Exception {
        return mockMvc.perform(post("/api/v1/auth/register").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}"));
    }

    private ResultActions changePassword(Cookie session, String current, String next) throws Exception {
        return mockMvc.perform(post("/api/v1/me/password").cookie(session).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"currentPassword\":\"" + current + "\",\"newPassword\":\"" + next + "\"}"));
    }

    @Test
    @DisplayName("register with a breached password returns 400 on the password field and sends no mail")
    void registerBreached() throws Exception {
        when(checker.isBreached(BREACHED)).thenReturn(true);
        String email = uniqueEmail();

        register(email, BREACHED).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.password").value(containsString("data breach")));

        mailbox.assertNothingSentTo(email, Duration.ofMillis(100));
    }

    @Test
    @DisplayName("register with a password the checker does not know is accepted")
    void registerClean() throws Exception {
        String email = uniqueEmail();

        register(email, CLEAN).andExpect(status().isAccepted());

        mailbox.awaitSubjectCount(email, "Confirm your Phrasal account", 1);
    }

    @Test
    @DisplayName("an already verified address gets the same 400, not an account-exists notice")
    void registerBreachedForVerifiedAddress() throws Exception {
        String email = uniqueEmail();
        registerAndLogin(email, PASSWORD);
        when(checker.isBreached(BREACHED)).thenReturn(true);

        register(email, BREACHED).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.password").value(containsString("data breach")));

        assertThat(mailbox.countWithSubject(email, "You already have a Phrasal account")).isZero();
    }

    @Test
    @DisplayName("reset with a breached password returns 400; the same link then works with a clean one")
    void resetBreached() throws Exception {
        String email = uniqueEmail();
        registerAndLogin(email, PASSWORD);
        String token = requestPasswordReset(email);
        when(checker.isBreached(BREACHED)).thenReturn(true);

        resetPassword(token, BREACHED).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.password").value(containsString("data breach")));

        resetPassword(token, CLEAN).andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("change password with a breached new password returns 400 on newPassword")
    void changeBreached() throws Exception {
        Cookie session = registerAndLogin(uniqueEmail(), PASSWORD);
        when(checker.isBreached(BREACHED)).thenReturn(true);

        changePassword(session, PASSWORD, BREACHED).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.newPassword").value(containsString("data breach")));

        changePassword(session, PASSWORD, CLEAN).andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("login is never checked against breaches, so no CompromisedPasswordChecker bean exists")
    void noCompromisedPasswordCheckerBean() {
        assertThat(context.getBeansOfType(CompromisedPasswordChecker.class)).isEmpty();
    }
}
