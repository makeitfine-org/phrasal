package net.phrasal.integration.support;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.RSASSASigner;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.gen.RSAKeyGenerator;
import com.nimbusds.jose.util.JSONObjectUtils;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UncheckedIOException;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * A stand-in for Google's token and key endpoints, so integration tests can run the whole OIDC sign-in: the
 * authorization redirect, the callback, the token request and the ID token check. Google's sign-in page is skipped:
 * a test reads {@code state} and {@code nonce} from the redirect and calls the callback itself.
 *
 * <p>One server per JVM on a random port, started on first use (like the Postgres container). The claims of the next
 * ID token are set per test; {@link #reset()} clears them.
 */
public final class FakeGoogle {

    /** Client id the test profile registers; the default audience of the ID token. */
    public static final String CLIENT_ID = "test-client";
    /** Key id in the JWT header and the key set. */
    public static final String KEY_ID = "fake-google-key";

    private static final String CLIENT_SECRET = "test-secret";
    private static final String EXPECTED_AUTHORIZATION = "Basic " + Base64.getEncoder()
            .encodeToString((CLIENT_ID + ":" + CLIENT_SECRET).getBytes(StandardCharsets.UTF_8));
    private static final int RSA_KEY_SIZE = 2048;
    private static final Duration TOKEN_LIFETIME = Duration.ofMinutes(5);
    private static final int OK = 200;
    private static final int BAD_REQUEST = 400;
    private static final int UNAUTHORIZED = 401;
    private static final int METHOD_NOT_ALLOWED = 405;

    private static final FakeGoogle INSTANCE = new FakeGoogle();

    private final RSAKey key = generateKey();
    private final HttpServer server;
    private final String issuer;

    private Identity nextIdentity;
    private String nextNonce;
    private String nextAudience;
    private RSAKey nextSigningKey;
    private boolean failNextTokenRequest;

    /** The claims of a Google account that the next ID token describes. */
    private record Identity(String subject, String email, boolean emailVerified) {

    }

    private FakeGoogle() {
        try {
            server = HttpServer.create(new InetSocketAddress(InetAddress.getLoopbackAddress(), 0), 0);
        } catch (IOException e) {
            throw new UncheckedIOException("Fake Google could not start", e);
        }
        server.createContext("/token", this::token);
        server.createContext("/jwks", this::jwks);
        server.start();
        issuer = "http://localhost:" + server.getAddress().getPort();
        Runtime.getRuntime().addShutdownHook(new Thread(() -> server.stop(0)));
        reset();
    }

    /**
     * Returns the server, starting it on first use.
     *
     * @return the one instance of this JVM
     */
    public static FakeGoogle instance() {
        return INSTANCE;
    }

    /**
     * Makes a fresh RSA signing key with the same key id as the published one, so only the signature check can tell
     * them apart.
     *
     * @return a key that is not in the key set
     */
    public static RSAKey generateKey() {
        try {
            return new RSAKeyGenerator(RSA_KEY_SIZE).keyID(KEY_ID).generate();
        } catch (JOSEException e) {
            throw new IllegalStateException("Cannot generate an RSA key", e);
        }
    }

    /**
     * The expected {@code iss} claim.
     *
     * @return {@code http://localhost:<port>}
     */
    public String issuer() {
        return issuer;
    }

    /**
     * Where the browser would be sent. Nothing listens there: tests stop at the redirect.
     *
     * @return the authorization endpoint
     */
    public String authorizationUri() {
        return issuer + "/authorize";
    }

    /**
     * The token endpoint.
     *
     * @return the token endpoint
     */
    public String tokenUri() {
        return issuer + "/token";
    }

    /**
     * The public key set that verifies the ID token.
     *
     * @return the key set endpoint
     */
    public String jwkSetUri() {
        return issuer + "/jwks";
    }

    /**
     * Sets the account of the next ID token. Without it the token endpoint answers {@code invalid_grant}.
     *
     * @param subject       the {@code sub} claim
     * @param email         the {@code email} claim
     * @param emailVerified the {@code email_verified} claim
     */
    public synchronized void nextIdentity(String subject, String email, boolean emailVerified) {
        nextIdentity = new Identity(subject, email, emailVerified);
    }

    /**
     * Sets the {@code nonce} claim of the next ID token. It must be the value of the {@code nonce} parameter in the
     * authorization redirect, unchanged (that value is already the hash the client compares).
     *
     * @param nonce the claim value
     */
    public synchronized void nextNonce(String nonce) {
        nextNonce = nonce;
    }

    /**
     * Replaces the audience of the next ID tokens, for the negative tests.
     *
     * @param audience the {@code aud} claim
     */
    public synchronized void nextAudience(String audience) {
        nextAudience = audience;
    }

    /**
     * Signs the next ID tokens with another key, for the negative tests.
     *
     * @param signingKey a private key that is not in the key set
     */
    public synchronized void nextSigningKey(RSAKey signingKey) {
        nextSigningKey = signingKey;
    }

    /** Makes the next token request fail with {@code 401 invalid_client}, as if the client secret were wrong. */
    public synchronized void failNextTokenRequest() {
        failNextTokenRequest = true;
    }

    /** Forgets every setting above. */
    public synchronized void reset() {
        nextIdentity = null;
        nextNonce = null;
        nextAudience = CLIENT_ID;
        nextSigningKey = key;
        failNextTokenRequest = false;
    }

    private void jwks(HttpExchange exchange) throws IOException {
        // JWKSet#toString publishes the public parts only.
        respond(exchange, OK, new JWKSet(key).toString());
    }

    private synchronized void token(HttpExchange exchange) throws IOException {
        if (!"POST".equals(exchange.getRequestMethod())) {
            respond(exchange, METHOD_NOT_ALLOWED, error("invalid_request"));
            return;
        }
        if (failNextTokenRequest
                || !EXPECTED_AUTHORIZATION.equals(exchange.getRequestHeaders().getFirst("Authorization"))) {
            failNextTokenRequest = false;
            respond(exchange, UNAUTHORIZED, error("invalid_client"));
            return;
        }
        Map<String, String> form = form(new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8));
        if (!"authorization_code".equals(form.get("grant_type")) || form.get("code") == null
                || nextIdentity == null) {
            respond(exchange, BAD_REQUEST, error("invalid_grant"));
            return;
        }
        Map<String, Object> body = new HashMap<>();
        body.put("access_token", "fake-access-token");
        body.put("token_type", "Bearer");
        body.put("expires_in", TOKEN_LIFETIME.toSeconds());
        body.put("scope", "openid email profile");
        body.put("id_token", idToken());
        respond(exchange, OK, JSONObjectUtils.toJSONString(body));
    }

    private String idToken() {
        Instant now = Instant.now();
        JWTClaimsSet.Builder claims = new JWTClaimsSet.Builder()
                .issuer(issuer)
                .audience(nextAudience)
                .subject(nextIdentity.subject())
                .claim("email", nextIdentity.email())
                .claim("email_verified", nextIdentity.emailVerified())
                .issueTime(Date.from(now))
                .expirationTime(Date.from(now.plus(TOKEN_LIFETIME)));
        if (nextNonce != null) {
            claims.claim("nonce", nextNonce);
        }
        SignedJWT jwt = new SignedJWT(new JWSHeader.Builder(JWSAlgorithm.RS256).keyID(KEY_ID).build(), claims.build());
        try {
            jwt.sign(new RSASSASigner(nextSigningKey));
        } catch (JOSEException e) {
            throw new IllegalStateException("Cannot sign the ID token", e);
        }
        return jwt.serialize();
    }

    private static String error(String code) {
        return JSONObjectUtils.toJSONString(Map.of("error", code));
    }

    private static Map<String, String> form(String body) {
        Map<String, String> values = new HashMap<>();
        for (String pair : body.split("&")) {
            int equals = pair.indexOf('=');
            if (equals > 0) {
                values.put(URLDecoder.decode(pair.substring(0, equals), StandardCharsets.UTF_8),
                        URLDecoder.decode(pair.substring(equals + 1), StandardCharsets.UTF_8));
            }
        }
        return values;
    }

    private static void respond(HttpExchange exchange, int status, String json) throws IOException {
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(status, bytes.length);
        try (OutputStream body = exchange.getResponseBody()) {
            body.write(bytes);
        }
    }
}
