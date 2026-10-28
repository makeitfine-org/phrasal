package net.phrasal.integration;

import jakarta.servlet.http.Cookie;
import net.phrasal.integration.support.RecordingEmailSender;
import net.phrasal.integration.support.RecordingEmailSenderConfig;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.TestSecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import org.testcontainers.postgresql.PostgreSQLContainer;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Base for integration tests: one Postgres container per JVM and one cached Spring context.
 * The container is started in a static block (singleton pattern) and stopped by Ryuk on JVM exit.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Import(RecordingEmailSenderConfig.class)
abstract class AbstractIntegrationTest {

    static final PostgreSQLContainer POSTGRES = new PostgreSQLContainer("postgres:16-alpine")
            .withDatabaseName("phrasaldb_test")
            .withUsername("test")
            .withPassword("test");

    static {
        POSTGRES.start();
    }

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected RecordingEmailSender mailbox;

    /** Drops any authentication left on the thread by a previous login so tests stay order-independent. */
    @BeforeEach
    @AfterEach
    void clearSecurityContext() {
        SecurityContextHolder.clearContext();
        TestSecurityContextHolder.clearContext();
    }

    /** Authenticates the request as an ADMIN and attaches a valid CSRF token. */
    protected static RequestPostProcessor adminWithCsrf() {
        return request -> csrf().postProcessRequest(user("admin@test").roles("ADMIN").postProcessRequest(request));
    }

    /** Registers a new USER, logs in over HTTP and returns the {@code SESSION} cookie. */
    protected Cookie registerAndLogin(String email, String password) throws Exception {
        String body = "{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}";
        mockMvc.perform(post("/api/v1/auth/register").contentType(MediaType.APPLICATION_JSON).content(body)
                .with(csrf())).andExpect(status().isAccepted());
        verifyEmail(email);
        return login(body, null);
    }

    /** Logs in with a raw JSON body, optionally sending an existing cookie, and returns the new cookie. */
    protected Cookie login(String body, Cookie existing) throws Exception {
        var request = post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON).content(body)
                .with(csrf());
        if (existing != null) {
            request.cookie(existing);
        }
        return mockMvc.perform(request).andExpect(status().isOk()).andReturn().getResponse().getCookie("SESSION");
    }

    /** Reads the newest verification link sent to the address and redeems it. */
    protected void verifyEmail(String email) throws Exception {
        String token = mailbox.awaitVerificationToken(email);
        mockMvc.perform(post("/api/v1/auth/verify-email").contentType(MediaType.APPLICATION_JSON)
                .content("{\"token\":\"" + token + "\"}").with(csrf())).andExpect(status().isNoContent());
    }

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", POSTGRES::getJdbcUrl);
        registry.add("spring.datasource.username", POSTGRES::getUsername);
        registry.add("spring.datasource.password", POSTGRES::getPassword);
    }
}
