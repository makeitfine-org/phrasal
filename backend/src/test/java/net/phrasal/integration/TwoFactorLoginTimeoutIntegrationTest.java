package net.phrasal.integration;

import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.TestPropertySource;

import java.time.Duration;
import java.util.UUID;

import static org.awaitility.Awaitility.await;
import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@TestPropertySource(properties = "phrasal.two-factor.login-timeout=1s")
@DisplayName("Two-factor login timeout integration")
class TwoFactorLoginTimeoutIntegrationTest extends AbstractIntegrationTest {

    private static final String PASSWORD = "correct horse battery";

    @Test
    @DisplayName("a pending login older than the timeout answers 401 two-factor-login-expired")
    void pendingLoginExpires() throws Exception {
        String email = "tfa-timeout-" + UUID.randomUUID() + "@example.com";
        enableTwoFactor(registerAndLogin(email, PASSWORD), PASSWORD);
        Cookie pending = loginExpectingTwoFactor("{\"email\":\"" + email + "\",\"password\":\"" + PASSWORD + "\"}");

        // A wrong code answers 400 while the login is pending and 401 once it has expired.
        await().atMost(Duration.ofSeconds(10)).pollInterval(Duration.ofMillis(250)).untilAsserted(() ->
                submitTwoFactorCode(pending, "000000").andExpect(status().isUnauthorized())
                        .andExpect(jsonPath("$.type").value(containsString("/errors/two-factor-login-expired"))));
    }
}
