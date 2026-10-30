package net.phrasal.integration;

import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.ResultActions;

import java.util.UUID;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/** Kept apart from {@link RateLimitIntegrationTest}, whose tight register limit would block creating the users. */
@TestPropertySource(properties = {"phrasal.rate-limit.reauth-per-user.limit=2",
        "phrasal.rate-limit.email-change-per-email.limit=2"})
@DisplayName("Account change rate limit integration")
class AccountRateLimitIntegrationTest extends AbstractIntegrationTest {

    private static final String PASSWORD = "correct horse battery";

    private Cookie newUser() throws Exception {
        return registerAndLogin("acct-rate-" + UUID.randomUUID() + "@example.com", PASSWORD);
    }

    private ResultActions wrongPassword(Cookie session) throws Exception {
        return mockMvc.perform(post("/api/v1/me/password").cookie(session).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"currentPassword\":\"not the password\",\"newPassword\":\"another horse stapler\"}"));
    }

    @Test
    @DisplayName("attempts beyond the per-user limit return 429 with Retry-After, even for the right password")
    void perUser() throws Exception {
        Cookie session = newUser();

        wrongPassword(session).andExpect(status().isBadRequest());
        wrongPassword(session).andExpect(status().isBadRequest());

        wrongPassword(session).andExpect(status().isTooManyRequests()).andExpect(header().exists("Retry-After"));
    }

    @Test
    @DisplayName("another user is not affected by the first user's attempts")
    void otherUserUnaffected() throws Exception {
        Cookie first = newUser();
        Cookie second = newUser();
        wrongPassword(first).andExpect(status().isBadRequest());
        wrongPassword(first).andExpect(status().isBadRequest());
        wrongPassword(first).andExpect(status().isTooManyRequests());

        wrongPassword(second).andExpect(status().isBadRequest());
    }

    private ResultActions wrongEmailChange(Cookie session, String newEmail) throws Exception {
        return requestEmailChange(session, newEmail, "not the password");
    }

    @Test
    @DisplayName("change password and change email share one per-user bucket")
    void sharedBucket() throws Exception {
        Cookie session = newUser();

        wrongPassword(session).andExpect(status().isBadRequest());
        wrongEmailChange(session, "shared-" + UUID.randomUUID() + "@example.com").andExpect(status().isBadRequest());

        wrongPassword(session).andExpect(status().isTooManyRequests());
        wrongEmailChange(session, "shared-" + UUID.randomUUID() + "@example.com")
                .andExpect(status().isTooManyRequests());
    }

    @Test
    @DisplayName("the per-address limit counts requests from different users for the same new address")
    void perNewAddress() throws Exception {
        String target = "target-" + UUID.randomUUID() + "@example.com";
        Cookie first = newUser();
        Cookie second = newUser();
        Cookie third = newUser();

        wrongEmailChange(first, target).andExpect(status().isBadRequest());
        wrongEmailChange(second, target).andExpect(status().isBadRequest());

        wrongEmailChange(third, target).andExpect(status().isTooManyRequests())
                .andExpect(header().exists("Retry-After"));
    }
}
