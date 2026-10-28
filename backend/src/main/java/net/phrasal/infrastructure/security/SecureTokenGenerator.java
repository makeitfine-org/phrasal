package net.phrasal.infrastructure.security;

import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.HexFormat;

/** Creates unguessable one-time tokens; only their SHA-256 hash is persisted. */
@Component
public class SecureTokenGenerator {

    private static final int TOKEN_BYTES = 32;

    private final SecureRandom secureRandom = new SecureRandom();

    /**
     * Generates a fresh token.
     *
     * @return the raw token (for the email link) and its hash (for the database)
     */
    public IssuedToken generate() {
        byte[] bytes = new byte[TOKEN_BYTES];
        secureRandom.nextBytes(bytes);
        String rawToken = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
        return new IssuedToken(rawToken, hash(rawToken));
    }

    /**
     * Hashes a raw token the way it is stored.
     *
     * @param rawToken token received from the client
     * @return lowercase hex SHA-256 of the UTF-8 bytes
     */
    public static String hash(String rawToken) {
        try {
            byte[] digest = MessageDigest.getInstance("SHA-256")
                    .digest(rawToken.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(digest);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 is not available", e);
        }
    }

    /**
     * A generated token.
     *
     * @param rawToken the secret sent to the user; never stored or logged
     * @param hash     SHA-256 hex of {@code rawToken}, stored in {@code user_tokens.token_hash}
     */
    public record IssuedToken(String rawToken, String hash) {

        @Override
        public String toString() {
            return "IssuedToken[rawToken=*****, hash=" + hash + "]";
        }
    }
}
