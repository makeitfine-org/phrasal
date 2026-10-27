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
        "phrasal.rate-limit.login-per-email.limit=3",
        "phrasal.rate-limit.login-per-ip.limit=1000"
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
        mockMvc.perform(authPost("/api/v1/auth/register", uniqueEmail(), ip)).andExpect(status().isCreated());
        mockMvc.perform(authPost("/api/v1/auth/register", uniqueEmail(), ip)).andExpect(status().isCreated());

        mockMvc.perform(authPost("/api/v1/auth/register", uniqueEmail(), ip))
                .andExpect(status().isTooManyRequests())
                .andExpect(header().exists("Retry-After"))
                .andExpect(jsonPath("$.title").value("Too Many Requests"));
    }

    @Test
    @DisplayName("fourth login for one email returns 429, another email still works")
    void loginPerEmail() throws Exception {
        String email = uniqueEmail();
        String other = uniqueEmail();
        mockMvc.perform(authPost("/api/v1/auth/register", email, "10.2.0.1")).andExpect(status().isCreated());
        mockMvc.perform(authPost("/api/v1/auth/register", other, "10.2.0.2")).andExpect(status().isCreated());

        for (int i = 0; i < 3; i++) {
            mockMvc.perform(authPost("/api/v1/auth/login", email, "10.2.0.3")).andExpect(status().isOk());
        }
        mockMvc.perform(authPost("/api/v1/auth/login", email, "10.2.0.3"))
                .andExpect(status().isTooManyRequests());

        mockMvc.perform(authPost("/api/v1/auth/login", other, "10.2.0.3")).andExpect(status().isOk());
    }
}
