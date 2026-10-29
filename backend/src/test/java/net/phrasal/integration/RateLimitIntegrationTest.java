package net.phrasal.integration;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import java.util.UUID;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@TestPropertySource(properties = {
        "phrasal.rate-limit.register-per-ip.limit=2",
        "phrasal.rate-limit.register-per-email.limit=2",
        "phrasal.rate-limit.login-per-email.limit=3",
        "phrasal.rate-limit.login-per-ip.limit=1000",
        "phrasal.rate-limit.resend-per-email.limit=2",
        "phrasal.rate-limit.forgot-per-email.limit=2",
        "phrasal.rate-limit.reset-per-ip.limit=2"
})
@DisplayName("Rate limit integration")
class RateLimitIntegrationTest extends AbstractIntegrationTest {

    private static final String PASSWORD = "correct horse battery";

    private static MockHttpServletRequestBuilder authPost(String url, String email, String ip) {
        return post(url).contentType(MediaType.APPLICATION_JSON).with(csrf())
                .with(request -> {
                    request.setRemoteAddr(ip);
                    return request;
                })
                .content("{\"email\":\"" + email + "\",\"password\":\"" + PASSWORD + "\"}");
    }

    private static String uniqueEmail() {
        return "rate-" + UUID.randomUUID() + "@example.com";
    }

    @Test
    @DisplayName("third registration from one IP returns 429 with Retry-After")
    void registerPerIp() throws Exception {
        String ip = "10.1.0.1";
        mockMvc.perform(authPost("/api/v1/auth/register", uniqueEmail(), ip)).andExpect(status().isAccepted());
        mockMvc.perform(authPost("/api/v1/auth/register", uniqueEmail(), ip)).andExpect(status().isAccepted());

        mockMvc.perform(authPost("/api/v1/auth/register", uniqueEmail(), ip))
                .andExpect(status().isTooManyRequests())
                .andExpect(header().exists("Retry-After"))
                .andExpect(jsonPath("$.title").value("Too Many Requests"));
    }

    @Test
    @DisplayName("third registration of one email returns 429 even from different IPs")
    void registerPerEmail() throws Exception {
        String email = uniqueEmail();
        mockMvc.perform(authPost("/api/v1/auth/register", email, "10.3.0.1")).andExpect(status().isAccepted());
        mockMvc.perform(authPost("/api/v1/auth/register", email, "10.3.0.2")).andExpect(status().isAccepted());

        mockMvc.perform(authPost("/api/v1/auth/register", email, "10.3.0.3"))
                .andExpect(status().isTooManyRequests())
                .andExpect(header().exists("Retry-After"));
    }

    @Test
    @DisplayName("fourth login for one email returns 429, another email still works")
    void loginPerEmail() throws Exception {
        String email = uniqueEmail();
        String other = uniqueEmail();
        // registerAndLogin spends the first of the three allowed logins for each address
        registerAndLogin(email, PASSWORD);
        registerAndLogin(other, PASSWORD);

        for (int i = 0; i < 2; i++) {
            mockMvc.perform(authPost("/api/v1/auth/login", email, "10.2.0.3")).andExpect(status().isOk());
        }
        mockMvc.perform(authPost("/api/v1/auth/login", email, "10.2.0.3"))
                .andExpect(status().isTooManyRequests());

        mockMvc.perform(authPost("/api/v1/auth/login", other, "10.2.0.3")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("third resend for one email returns 429, also for an unknown address")
    void resendPerEmail() throws Exception {
        String unknown = uniqueEmail();
        for (int i = 0; i < 2; i++) {
            mockMvc.perform(authPost("/api/v1/auth/resend-verification", unknown, "10.3.0." + i))
                    .andExpect(status().isAccepted());
        }

        mockMvc.perform(authPost("/api/v1/auth/resend-verification", unknown, "10.3.0.9"))
                .andExpect(status().isTooManyRequests())
                .andExpect(header().exists("Retry-After"));
        mockMvc.perform(authPost("/api/v1/auth/resend-verification", uniqueEmail(), "10.3.0.9"))
                .andExpect(status().isAccepted());
    }

    @Test
    @DisplayName("third forgot-password for one email returns 429, also for an unknown address")
    void forgotPerEmail() throws Exception {
        String unknown = uniqueEmail();
        for (int i = 0; i < 2; i++) {
            mockMvc.perform(authPost("/api/v1/auth/forgot-password", unknown, "10.4.0." + i))
                    .andExpect(status().isAccepted());
        }

        mockMvc.perform(authPost("/api/v1/auth/forgot-password", unknown, "10.4.0.9"))
                .andExpect(status().isTooManyRequests())
                .andExpect(header().exists("Retry-After"));
        mockMvc.perform(authPost("/api/v1/auth/forgot-password", uniqueEmail(), "10.4.0.9"))
                .andExpect(status().isAccepted());
    }

    @Test
    @DisplayName("third reset-password from one IP returns 429, even with invented tokens")
    void resetPerIp() throws Exception {
        for (int i = 0; i < 2; i++) {
            mockMvc.perform(resetFrom("10.5.0.1", "A".repeat(43))).andExpect(status().isBadRequest());
        }

        mockMvc.perform(resetFrom("10.5.0.1", "B".repeat(43)))
                .andExpect(status().isTooManyRequests())
                .andExpect(header().exists("Retry-After"));
        mockMvc.perform(resetFrom("10.5.0.2", "B".repeat(43))).andExpect(status().isBadRequest());
    }

    private static MockHttpServletRequestBuilder resetFrom(String ip, String token) {
        return post("/api/v1/auth/reset-password").contentType(MediaType.APPLICATION_JSON).with(csrf())
                .with(request -> {
                    request.setRemoteAddr(ip);
                    return request;
                })
                .content("{\"token\":\"" + token + "\",\"password\":\"" + PASSWORD + "\"}");
    }
}
