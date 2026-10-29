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
import org.springframework.test.web.servlet.ResultActions;
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

    static final String PASSWORD_RESET_SUBJECT = "Reset your Phrasal password";

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

    /**
     * Asks for a password reset over HTTP, waits for the new mail and returns the raw token from its link.
     * Safe to call repeatedly for one address: it waits for a mail beyond those already received.
     */
    protected String requestPasswordReset(String email) throws Exception {
        int before = mailbox.countWithSubject(email, PASSWORD_RESET_SUBJECT);
        mockMvc.perform(post("/api/v1/auth/forgot-password").contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"" + email + "\"}").with(csrf())).andExpect(status().isAccepted());
        mailbox.awaitSubjectCount(email, PASSWORD_RESET_SUBJECT, before + 1);
        return mailbox.awaitPasswordResetToken(email);
    }

    /** Submits a new password with a reset token and CSRF; the caller asserts the status. */
    protected ResultActions resetPassword(String token, String password) throws Exception {
        return mockMvc.perform(post("/api/v1/auth/reset-password").contentType(MediaType.APPLICATION_JSON)
                .content("{\"token\":\"" + token + "\",\"password\":\"" + password + "\"}").with(csrf()));
    }

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", POSTGRES::getJdbcUrl);
        registry.add("spring.datasource.username", POSTGRES::getUsername);
        registry.add("spring.datasource.password", POSTGRES::getPassword);
    }
}
