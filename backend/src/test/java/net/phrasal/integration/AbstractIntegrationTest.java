package net.phrasal.integration;

import com.jayway.jsonpath.JsonPath;
import jakarta.servlet.http.Cookie;
import net.phrasal.integration.support.FakeGoogle;
import net.phrasal.integration.support.TotpTestCodes;
import net.phrasal.integration.support.RecordingEmailSender;
import net.phrasal.integration.support.RecordingEmailSenderConfig;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.TestSecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import org.springframework.web.util.UriComponentsBuilder;
import org.testcontainers.postgresql.PostgreSQLContainer;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Base for integration tests: one Postgres container per JVM and one cached Spring context.
 * The container is started in a static block (singleton pattern) and stopped by Ryuk on JVM exit.
 * Google sign-in talks to {@link FakeGoogle}, also one per JVM.
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

    static final FakeGoogle GOOGLE = FakeGoogle.instance();
    static final String GOOGLE_START = "/api/v1/auth/oauth2/authorization/google";
    static final String GOOGLE_CALLBACK = "/api/v1/auth/oauth2/code/google";

    static {
        POSTGRES.start();
    }

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected RecordingEmailSender mailbox;

    /**
     * A 2FA-enabled account as the tests see it.
     *
     * @param secret        Base32 shared secret
     * @param recoveryCodes the ten raw recovery codes
     * @param session       the session cookie that is valid after enabling
     */
    protected record TwoFactorTestAccount(String secret, List<String> recoveryCodes, Cookie session) {

    }

    /**
     * A started Google sign-in, as the browser holds it while the visitor is at Google.
     *
     * @param session     the session cookie that holds the authorization request
     * @param state       the {@code state} parameter of the redirect
     * @param nonce       the {@code nonce} parameter of the redirect (already hashed)
     * @param redirectUri the {@code redirect_uri} parameter of the redirect
     */
    protected record GoogleRedirect(Cookie session, String state, String nonce, String redirectUri) {

    }

    /** Drops any authentication left on the thread by a previous login so tests stay order-independent. */
    @BeforeEach
    @AfterEach
    void clearSecurityContext() {
        SecurityContextHolder.clearContext();
        TestSecurityContextHolder.clearContext();
    }

    /** Forgets the claims and failures a previous test set on the fake provider. */
    @BeforeEach
    void resetFakeGoogle() {
        GOOGLE.reset();
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

    /** Runs 2FA setup and confirm for the signed-in account and returns the secret, codes and the new cookie. */
    protected TwoFactorTestAccount enableTwoFactor(Cookie session, String password) throws Exception {
        String setupBody = mockMvc.perform(post("/api/v1/me/2fa/setup").cookie(session).with(csrf())
                        .contentType(MediaType.APPLICATION_JSON).content("{\"password\":\"" + password + "\"}"))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
        String secret = JsonPath.read(setupBody, "$.secret");
        var confirm = mockMvc.perform(post("/api/v1/me/2fa/confirm").cookie(session).with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"code\":\"" + TotpTestCodes.codeNow(secret) + "\"}"))
                .andExpect(status().isOk()).andReturn().getResponse();
        List<String> codes = JsonPath.read(confirm.getContentAsString(), "$.recoveryCodes");
        return new TwoFactorTestAccount(secret, codes, confirm.getCookie("SESSION"));
    }

    /**
     * Logs in a 2FA account with its password, asserts the second factor is demanded and returns the pending cookie.
     * An existing cookie is sent along, like a browser that still holds an older session.
     */
    protected Cookie loginExpectingTwoFactor(String body, Cookie existing) throws Exception {
        var request = post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON).content(body).with(csrf());
        if (existing != null) {
            request.cookie(existing);
        }
        return mockMvc.perform(request).andExpect(status().isAccepted())
                .andExpect(jsonPath("$.twoFactorRequired").value(true))
                .andReturn().getResponse().getCookie("SESSION");
    }

    /** Same as {@link #loginExpectingTwoFactor(String, Cookie)} with no earlier session. */
    protected Cookie loginExpectingTwoFactor(String body) throws Exception {
        return loginExpectingTwoFactor(body, null);
    }

    /** Submits the second-step code with CSRF on the pending session; the caller asserts the status. */
    protected ResultActions submitTwoFactorCode(Cookie pending, String code) throws Exception {
        return mockMvc.perform(post("/api/v1/auth/login/2fa").cookie(pending).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content("{\"code\":\"" + code + "\"}"));
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

    /** Asks, as the signed-in user, to move the account to a new address; the caller asserts the status. */
    protected ResultActions requestEmailChange(Cookie session, String newEmail, String password) throws Exception {
        return mockMvc.perform(post("/api/v1/me/email").cookie(session).with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"newEmail\":\"" + newEmail + "\",\"currentPassword\":\"" + password + "\"}"));
    }

    /** Redeems an email change link; the caller asserts the status. */
    protected ResultActions confirmEmailChange(String token) throws Exception {
        return mockMvc.perform(post("/api/v1/auth/confirm-email-change").contentType(MediaType.APPLICATION_JSON)
                .content("{\"token\":\"" + token + "\"}").with(csrf()));
    }

    /** Opens the Google start URL, expects the redirect to the provider and returns what the browser would keep. */
    protected GoogleRedirect startGoogleSignIn() throws Exception {
        MockHttpServletResponse response = mockMvc.perform(get(GOOGLE_START)).andExpect(status().isFound())
                .andReturn().getResponse();
        var query = UriComponentsBuilder.fromUriString(response.getRedirectedUrl()).build().getQueryParams();
        return new GoogleRedirect(response.getCookie("SESSION"), decode(query.getFirst("state")),
                decode(query.getFirst("nonce")), decode(query.getFirst("redirect_uri")));
    }

    /**
     * Lets the fake provider issue an ID token for the account, then calls the callback the way Google's redirect
     * would; the caller asserts the redirect.
     */
    protected ResultActions finishGoogleSignIn(GoogleRedirect redirect, String subject, String email,
                                               boolean emailVerified) throws Exception {
        GOOGLE.nextIdentity(subject, email, emailVerified);
        GOOGLE.nextNonce(redirect.nonce());
        var callback = get(GOOGLE_CALLBACK).param("code", "test-code").param("state", redirect.state());
        if (redirect.session() != null) {
            callback.cookie(redirect.session());
        }
        return mockMvc.perform(callback);
    }

    /** Signs in with a verified Google account, expects the redirect home and returns the new session cookie. */
    protected Cookie googleSignIn(String subject, String email) throws Exception {
        return finishGoogleSignIn(startGoogleSignIn(), subject, email, true)
                .andExpect(status().isFound()).andExpect(redirectedUrl("/"))
                .andReturn().getResponse().getCookie("SESSION");
    }

    private static String decode(String value) {
        return value == null ? null : URLDecoder.decode(value, StandardCharsets.UTF_8);
    }

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", POSTGRES::getJdbcUrl);
        registry.add("spring.datasource.username", POSTGRES::getUsername);
        registry.add("spring.datasource.password", POSTGRES::getPassword);
        registry.add("phrasal.google.authorization-uri", GOOGLE::authorizationUri);
        registry.add("phrasal.google.token-uri", GOOGLE::tokenUri);
        registry.add("phrasal.google.jwk-set-uri", GOOGLE::jwkSetUri);
        registry.add("phrasal.google.issuer-uri", GOOGLE::issuer);
    }
}
