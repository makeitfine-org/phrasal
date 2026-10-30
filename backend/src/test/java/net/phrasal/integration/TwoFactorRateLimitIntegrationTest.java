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

/** Kept apart from {@link RateLimitIntegrationTest}, whose tight register limit would block creating 2FA users. */
@TestPropertySource(properties = {
        "phrasal.rate-limit.two-factor-per-user.limit=3",
        "phrasal.rate-limit.two-factor-per-ip.limit=5"
})
@DisplayName("Two-factor rate limit integration")
class TwoFactorRateLimitIntegrationTest extends AbstractIntegrationTest {

    private static final String PASSWORD = "correct horse battery";

    private Cookie pendingLoginOfNewTwoFactorUser() throws Exception {
        String email = "tfa-rate-" + UUID.randomUUID() + "@example.com";
        enableTwoFactor(registerAndLogin(email, PASSWORD), PASSWORD);
        return loginExpectingTwoFactor("{\"email\":\"" + email + "\",\"password\":\"" + PASSWORD + "\"}");
    }

    private ResultActions wrongCodeFrom(Cookie pending, String ip) throws Exception {
        return mockMvc.perform(post("/api/v1/auth/login/2fa").cookie(pending).contentType(MediaType.APPLICATION_JSON)
                .with(csrf()).with(request -> {
                    request.setRemoteAddr(ip);
                    return request;
                }).content("{\"code\":\"000000\"}"));
    }

    @Test
    @DisplayName("code attempts beyond the per-user limit return 429; confirming already spent one")
    void perUser() throws Exception {
        String ip = "10.4.0.1";
        Cookie pending = pendingLoginOfNewTwoFactorUser();

        wrongCodeFrom(pending, ip).andExpect(status().isBadRequest());
        wrongCodeFrom(pending, ip).andExpect(status().isBadRequest());

        wrongCodeFrom(pending, ip).andExpect(status().isTooManyRequests()).andExpect(header().exists("Retry-After"));
    }

    @Test
    @DisplayName("code attempts beyond the per-IP limit return 429 for another user too")
    void perIp() throws Exception {
        String ip = "10.4.0.2";
        Cookie first = pendingLoginOfNewTwoFactorUser();
        Cookie second = pendingLoginOfNewTwoFactorUser();
        Cookie third = pendingLoginOfNewTwoFactorUser();

        wrongCodeFrom(first, ip).andExpect(status().isBadRequest());
        wrongCodeFrom(first, ip).andExpect(status().isBadRequest());
        wrongCodeFrom(second, ip).andExpect(status().isBadRequest());
        wrongCodeFrom(second, ip).andExpect(status().isBadRequest());
        wrongCodeFrom(third, ip).andExpect(status().isBadRequest());

        wrongCodeFrom(third, ip).andExpect(status().isTooManyRequests()).andExpect(header().exists("Retry-After"));
    }
}
