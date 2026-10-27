package net.phrasal.integration;

import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@DisplayName("Session cookie flags and persistence")
class SessionPersistenceIntegrationTest extends AbstractIntegrationTest {

    private static final String PASSWORD = "correct horse battery";
    private static final String COUNT_SQL = "SELECT count(*) FROM spring_session WHERE principal_name = ?";

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static String uniqueEmail() {
        return "persist-" + UUID.randomUUID() + "@example.com";
    }

    private int sessionRows(String email) {
        return jdbcTemplate.queryForObject(COUNT_SQL, Integer.class, email);
    }

    @Test
    @DisplayName("login sets an HttpOnly, SameSite=Lax cookie without Secure in the test profile")
    void cookieFlags() throws Exception {
        String email = uniqueEmail();
        String body = "{\"email\":\"" + email + "\",\"password\":\"" + PASSWORD + "\"}";
        registerAndLogin(email, PASSWORD);

        String header = mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content(body).with(csrf()))
                .andReturn().getResponse().getHeaders("Set-Cookie").stream()
                .filter(value -> value.startsWith("SESSION=")).findFirst().orElseThrow();

        assertThat(header).contains("HttpOnly").contains("SameSite=Lax").doesNotContain("Secure");
    }

    @Test
    @DisplayName("session is stored in Postgres on login and removed on logout")
    void sessionRowLifecycle() throws Exception {
        String email = uniqueEmail();
        Cookie session = registerAndLogin(email, PASSWORD);
        assertThat(sessionRows(email)).isEqualTo(1);

        mockMvc.perform(post("/api/v1/auth/logout").cookie(session).with(csrf()));

        assertThat(sessionRows(email)).isZero();
    }
}
