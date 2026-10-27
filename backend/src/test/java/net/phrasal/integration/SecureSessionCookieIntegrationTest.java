package net.phrasal.integration;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@TestPropertySource(properties = "server.servlet.session.cookie.secure=true")
@DisplayName("Secure session cookie (prod setting)")
class SecureSessionCookieIntegrationTest extends AbstractIntegrationTest {

    @Test
    @DisplayName("login cookie carries the Secure flag when cookie.secure=true")
    void secureFlag() throws Exception {
        String email = "secure-" + UUID.randomUUID() + "@example.com";
        String body = "{\"email\":\"" + email + "\",\"password\":\"correct horse battery\"}";
        registerAndLogin(email, "correct horse battery");

        String header = mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content(body).with(csrf()))
                .andReturn().getResponse().getHeaders("Set-Cookie").stream()
                .filter(value -> value.startsWith("SESSION=")).findFirst().orElseThrow();

        assertThat(header).contains("Secure").contains("HttpOnly");
    }
}
