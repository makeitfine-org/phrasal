package net.phrasal.integration;

import jakarta.servlet.http.Cookie;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.integration.support.FakeGoogle;
import net.phrasal.integration.support.TotpTestCodes;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/** The whole Google sign-in over HTTP: start, callback, token request, ID token check, session. */
@DisplayName("Google sign-in integration")
class GoogleLoginIntegrationTest extends AbstractIntegrationTest {

    private static final String ME = "/api/v1/auth/me";
    private static final String PASSWORD = "correct horse battery";
    private static final String GENERIC_ERROR = "google";

    @Autowired
    private JdbcTemplate jdbc;

    @Autowired
    private UserRepository userRepository;

    private static String uniqueEmail() {
        return "google-login-" + UUID.randomUUID() + "@example.com";
    }

    private static String uniqueSubject() {
        return "sub-" + UUID.randomUUID();
    }

    private static String credentials(String email) {
        return "{\"email\":\"" + email + "\",\"password\":\"" + PASSWORD + "\"}";
    }

    private Map<String, Object> row(String email) {
        return jdbc.queryForMap(
                "SELECT id, google_subject, password_hash, email_verified_at FROM users WHERE email = ?", email);
    }

    private int rows(String email) {
        return jdbc.queryForObject("SELECT COUNT(*) FROM users WHERE email = ?", Integer.class, email);
    }

    private int sessionRows(String email) {
        return jdbc.queryForObject("SELECT COUNT(*) FROM spring_session WHERE principal_name = ?", Integer.class,
                email);
    }

    private Long userId(String email) {
        return jdbc.queryForObject("SELECT id FROM users WHERE email = ?", Long.class, email);
    }

    private void register(String email) throws Exception {
        mockMvc.perform(post("/api/v1/auth/register").contentType(MediaType.APPLICATION_JSON).with(csrf())
                .content(credentials(email))).andExpect(status().isAccepted());
    }

    private ResultActions passwordLogin(String email) throws Exception {
        return mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON).with(csrf())
                .content(credentials(email)));
    }

    private void logout(Cookie session) throws Exception {
        mockMvc.perform(post("/api/v1/auth/logout").cookie(session).with(csrf())).andExpect(status().isNoContent());
    }

    /** Whether the session behind the cookie is still stored; the cookie holds the id in base64. */
    private boolean sessionStored(Cookie cookie) {
        String id = new String(Base64.getDecoder().decode(cookie.getValue()), StandardCharsets.UTF_8);
        return jdbc.queryForObject("SELECT COUNT(*) FROM spring_session WHERE session_id = ?", Integer.class, id) > 0;
    }

    /** Google sign-in of a 2FA account: expects the second step and a pending session under a new id. */
    private Cookie pendingTwoFactor(String email) throws Exception {
        GoogleRedirect redirect = startGoogleSignIn();
        Cookie pending = finishGoogleSignIn(redirect, uniqueSubject(), email, true)
                .andExpect(status().isFound()).andExpect(redirectedUrl("/login/2fa"))
                .andReturn().getResponse().getCookie("SESSION");
        assertThat(pending).isNotNull();
        assertThat(pending.getValue()).isNotEqualTo(redirect.session().getValue());
        assertThat(sessionStored(redirect.session())).isFalse();
        return pending;
    }

    /** Asserts a refused or failed sign-in: back to the login page with the code, and no signed-in session. */
    private void expectLoginError(ResultActions result, GoogleRedirect redirect, String code) throws Exception {
        MockHttpServletResponse response = result.andExpect(status().isFound())
                .andExpect(redirectedUrl("/login?error=" + code)).andReturn().getResponse();
        for (Cookie cookie : new Cookie[] {response.getCookie("SESSION"), redirect.session()}) {
            if (cookie != null) {
                mockMvc.perform(get(ME).cookie(cookie)).andExpect(status().isUnauthorized());
            }
        }
    }

    // --- the redirect to the provider ---

    @Test
    @DisplayName("the start URL redirects to the provider with the code-flow parameters and our callback")
    void authorizationRedirect() throws Exception {
        MockHttpServletResponse response = mockMvc.perform(get(GOOGLE_START)).andExpect(status().isFound())
                .andReturn().getResponse();

        String location = response.getRedirectedUrl();
        assertThat(location).startsWith(GOOGLE.authorizationUri() + "?");
        var query = UriComponentsBuilder.fromUriString(location).build().getQueryParams();
        assertThat(query.getFirst("response_type")).isEqualTo("code");
        assertThat(query.getFirst("client_id")).isEqualTo(FakeGoogle.CLIENT_ID);
        assertThat(URLDecoder.decode(query.getFirst("scope"), StandardCharsets.UTF_8).split(" "))
                .contains("openid", "email", "profile");
        assertThat(query.getFirst("state")).isNotBlank();
        assertThat(query.getFirst("nonce")).isNotBlank();
        assertThat(URLDecoder.decode(query.getFirst("redirect_uri"), StandardCharsets.UTF_8))
                .isEqualTo("http://localhost:3000/api/v1/auth/oauth2/code/google");
        // The authorization request lives in a session, which signs nobody in.
        Cookie session = response.getCookie("SESSION");
        assertThat(session).isNotNull();
        mockMvc.perform(get(ME).cookie(session)).andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("each start gets its own state and nonce")
    void freshStatePerStart() throws Exception {
        GoogleRedirect first = startGoogleSignIn();
        GoogleRedirect second = startGoogleSignIn();

        assertThat(second.state()).isNotEqualTo(first.state());
        assertThat(second.nonce()).isNotEqualTo(first.nonce());
    }

    // --- signing in ---

    @Test
    @DisplayName("a new Google account gets a verified USER account without a password and a new session")
    void newUser() throws Exception {
        String email = uniqueEmail();
        String subject = uniqueSubject();
        GoogleRedirect redirect = startGoogleSignIn();

        Cookie session = finishGoogleSignIn(redirect, subject, email, true)
                .andExpect(status().isFound()).andExpect(redirectedUrl("/"))
                .andReturn().getResponse().getCookie("SESSION");

        assertThat(session).isNotNull();
        assertThat(session.getValue()).isNotEqualTo(redirect.session().getValue());
        assertThat(sessionStored(redirect.session())).isFalse();
        // The principal is our AuthenticatedUser record; /me would fail on an OidcUser.
        mockMvc.perform(get(ME).cookie(session)).andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(email))
                .andExpect(jsonPath("$.role").value("USER"))
                .andExpect(jsonPath("$.hasPassword").value(false))
                .andExpect(jsonPath("$.twoFactorEnabled").value(false));
        mockMvc.perform(get(ME).cookie(redirect.session())).andExpect(status().isUnauthorized());
        Map<String, Object> row = row(email);
        assertThat(row.get("google_subject")).isEqualTo(subject);
        assertThat(row.get("password_hash")).isNull();
        assertThat(row.get("email_verified_at")).isNotNull();
        assertThat(sessionRows(email)).isEqualTo(1);
    }

    @Test
    @DisplayName("a returning Google account finds its account by subject; a new email claim changes nothing")
    void returningUser() throws Exception {
        String email = uniqueEmail();
        String otherEmail = uniqueEmail();
        String subject = uniqueSubject();
        googleSignIn(subject, email);

        Cookie session = googleSignIn(subject, otherEmail);

        mockMvc.perform(get(ME).cookie(session)).andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(email))
                .andExpect(jsonPath("$.id").value(userId(email)));
        assertThat(rows(otherEmail)).isZero();
    }

    @Test
    @DisplayName("a verified Google email links the existing account, which keeps its password login")
    void linksVerifiedAccount() throws Exception {
        String email = uniqueEmail();
        String subject = uniqueSubject();
        logout(registerAndLogin(email, PASSWORD));
        Long id = userId(email);

        Cookie session = googleSignIn(subject, email);

        mockMvc.perform(get(ME).cookie(session)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.hasPassword").value(true));
        assertThat(row(email).get("google_subject")).isEqualTo(subject);
        passwordLogin(email).andExpect(status().isOk());
    }

    @Test
    @DisplayName("an unverified local account is taken over: verified, linked, and its password no longer works")
    void takesOverUnverifiedAccount() throws Exception {
        String email = uniqueEmail();
        register(email);
        Long id = userId(email);

        Cookie session = googleSignIn(uniqueSubject(), email);

        mockMvc.perform(get(ME).cookie(session)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.hasPassword").value(false));
        assertThat(row(email).get("email_verified_at")).isNotNull();
        passwordLogin(email).andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("an account with 2FA goes to /login/2fa and is signed in only after the code")
    void twoFactorAccount() throws Exception {
        String email = uniqueEmail();
        TwoFactorTestAccount account = enableTwoFactor(registerAndLogin(email, PASSWORD), PASSWORD);
        logout(account.session());

        Cookie pending = pendingTwoFactor(email);

        mockMvc.perform(get(ME).cookie(pending)).andExpect(status().isUnauthorized());
        assertThat(sessionRows(email)).isZero();
        Long lastStep = jdbc.queryForObject("SELECT totp_last_step FROM users WHERE email = ?", Long.class, email);
        Cookie session = submitTwoFactorCode(pending, TotpTestCodes.nextCode(account.secret(), lastStep))
                .andExpect(status().isOk()).andReturn().getResponse().getCookie("SESSION");
        mockMvc.perform(get(ME).cookie(session)).andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(email))
                .andExpect(jsonPath("$.twoFactorEnabled").value(true));
    }

    @Test
    @DisplayName("a wrong 2FA code keeps the Google sign-in pending")
    void twoFactorWrongCode() throws Exception {
        String email = uniqueEmail();
        TwoFactorTestAccount account = enableTwoFactor(registerAndLogin(email, PASSWORD), PASSWORD);
        Cookie pending = pendingTwoFactor(email);
        String wrong = TotpTestCodes.codeNow(account.secret()).equals("000000") ? "000001" : "000000";

        submitTwoFactorCode(pending, wrong).andExpect(status().isBadRequest());

        mockMvc.perform(get(ME).cookie(pending)).andExpect(status().isUnauthorized());
    }

    // --- refusals ---

    @Test
    @DisplayName("an unverified Google email with an unknown address is refused and creates nothing")
    void unverifiedUnknownAddress() throws Exception {
        String email = uniqueEmail();
        GoogleRedirect redirect = startGoogleSignIn();

        expectLoginError(finishGoogleSignIn(redirect, uniqueSubject(), email, false), redirect,
                "google-email-unverified");

        assertThat(rows(email)).isZero();
    }

    @Test
    @DisplayName("an unverified Google email with an existing address is refused and leaves the account untouched")
    void unverifiedExistingAddress() throws Exception {
        String email = uniqueEmail();
        logout(registerAndLogin(email, PASSWORD));
        GoogleRedirect redirect = startGoogleSignIn();

        expectLoginError(finishGoogleSignIn(redirect, uniqueSubject(), email, false), redirect,
                "google-email-unverified");

        assertThat(row(email).get("google_subject")).isNull();
        assertThat(sessionRows(email)).isZero();
        passwordLogin(email).andExpect(status().isOk());
    }

    @Test
    @DisplayName("an account linked to another Google account is refused")
    void accountConflict() throws Exception {
        String email = uniqueEmail();
        String subject = uniqueSubject();
        logout(googleSignIn(subject, email));
        GoogleRedirect redirect = startGoogleSignIn();

        expectLoginError(finishGoogleSignIn(redirect, uniqueSubject(), email, true), redirect,
                "google-account-conflict");

        assertThat(row(email).get("google_subject")).isEqualTo(subject);
    }

    @Test
    @DisplayName("an ADMIN account is refused and stays unlinked")
    void adminAccount() throws Exception {
        String email = uniqueEmail();
        userRepository.saveAndFlush(new User(email, "{noop}unused", Role.ADMIN));
        GoogleRedirect redirect = startGoogleSignIn();

        expectLoginError(finishGoogleSignIn(redirect, uniqueSubject(), email, true), redirect,
                "google-admin-account");

        assertThat(row(email).get("google_subject")).isNull();
        assertThat(sessionRows(email)).isZero();
    }

    // --- failures: all become the generic error and create no account ---

    @Test
    @DisplayName("failure: the visitor pressed Cancel at Google")
    void cancelled() throws Exception {
        String email = uniqueEmail();
        GoogleRedirect redirect = startGoogleSignIn();
        GOOGLE.nextIdentity(uniqueSubject(), email, true);

        expectLoginError(mockMvc.perform(get(GOOGLE_CALLBACK).param("error", "access_denied")
                .param("state", redirect.state()).cookie(redirect.session())), redirect, GENERIC_ERROR);

        assertThat(rows(email)).isZero();
    }

    @Test
    @DisplayName("failure: the state does not match the one in the session")
    void wrongState() throws Exception {
        String email = uniqueEmail();
        GoogleRedirect redirect = startGoogleSignIn();
        GoogleRedirect forged = new GoogleRedirect(redirect.session(), "forged-state", redirect.nonce(),
                redirect.redirectUri());

        expectLoginError(finishGoogleSignIn(forged, uniqueSubject(), email, true), redirect, GENERIC_ERROR);

        assertThat(rows(email)).isZero();
    }

    @Test
    @DisplayName("failure: the callback comes without a started sign-in")
    void noStart() throws Exception {
        String email = uniqueEmail();
        GoogleRedirect redirect = startGoogleSignIn();
        GoogleRedirect withoutSession = new GoogleRedirect(null, redirect.state(), redirect.nonce(),
                redirect.redirectUri());

        expectLoginError(finishGoogleSignIn(withoutSession, uniqueSubject(), email, true), withoutSession,
                GENERIC_ERROR);

        assertThat(rows(email)).isZero();
    }

    @Test
    @DisplayName("failure: the callback is replayed after a successful sign-in")
    void replayedCallback() throws Exception {
        String email = uniqueEmail();
        String replayEmail = uniqueEmail();
        GoogleRedirect redirect = startGoogleSignIn();
        finishGoogleSignIn(redirect, uniqueSubject(), email, true).andExpect(redirectedUrl("/"));

        expectLoginError(finishGoogleSignIn(redirect, uniqueSubject(), replayEmail, true), redirect,
                GENERIC_ERROR);

        assertThat(rows(email)).isEqualTo(1);
        assertThat(rows(replayEmail)).isZero();
    }

    @Test
    @DisplayName("failure: the ID token carries another nonce")
    void wrongNonce() throws Exception {
        String email = uniqueEmail();
        GoogleRedirect redirect = startGoogleSignIn();
        GoogleRedirect otherNonce = new GoogleRedirect(redirect.session(), redirect.state(), "other-nonce",
                redirect.redirectUri());

        expectLoginError(finishGoogleSignIn(otherNonce, uniqueSubject(), email, true), redirect, GENERIC_ERROR);

        assertThat(rows(email)).isZero();
    }

    @Test
    @DisplayName("failure: the ID token was issued to another client")
    void wrongAudience() throws Exception {
        String email = uniqueEmail();
        GoogleRedirect redirect = startGoogleSignIn();
        GOOGLE.nextAudience("another-client");

        expectLoginError(finishGoogleSignIn(redirect, uniqueSubject(), email, true), redirect, GENERIC_ERROR);

        assertThat(rows(email)).isZero();
    }

    @Test
    @DisplayName("failure: the ID token is signed by a key that is not in the key set")
    void foreignSigningKey() throws Exception {
        String email = uniqueEmail();
        GoogleRedirect redirect = startGoogleSignIn();
        GOOGLE.nextSigningKey(FakeGoogle.generateKey());

        expectLoginError(finishGoogleSignIn(redirect, uniqueSubject(), email, true), redirect, GENERIC_ERROR);

        assertThat(rows(email)).isZero();
    }

    @Test
    @DisplayName("failure: the token endpoint refuses the client")
    void tokenEndpointRefuses() throws Exception {
        String email = uniqueEmail();
        GoogleRedirect redirect = startGoogleSignIn();
        GOOGLE.failNextTokenRequest();

        expectLoginError(finishGoogleSignIn(redirect, uniqueSubject(), email, true), redirect, GENERIC_ERROR);

        assertThat(rows(email)).isZero();
    }
}
