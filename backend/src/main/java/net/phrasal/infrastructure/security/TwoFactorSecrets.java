package net.phrasal.infrastructure.security;

import org.apache.commons.codec.binary.Base32;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;

/** Creates TOTP secrets and the otpauth URI that authenticator apps import. */
@Component
public class TwoFactorSecrets {

    private static final int SECRET_BYTES = 20;

    private final SecureRandom secureRandom = new SecureRandom();

    /**
     * Generates a fresh shared secret.
     *
     * @return 20 random bytes
     */
    public byte[] newSecret() {
        byte[] secret = new byte[SECRET_BYTES];
        secureRandom.nextBytes(secret);
        return secret;
    }

    /**
     * Encodes a secret the way authenticator apps expect.
     *
     * @param secret the raw secret
     * @return upper-case Base32 without padding
     */
    public static String toBase32(byte[] secret) {
        return new Base32().encodeToString(secret).replace("=", "");
    }

    /**
     * Builds the otpauth URI shown as a QR code.
     *
     * @param issuer       the service name
     * @param email        the account label
     * @param base32Secret the secret from {@link #toBase32}
     * @return the URI, with issuer and email percent-encoded
     */
    public String otpauthUri(String issuer, String email, String base32Secret) {
        String encodedIssuer = UriUtils.encode(issuer, StandardCharsets.UTF_8);
        String encodedEmail = UriUtils.encode(email, StandardCharsets.UTF_8);
        return "otpauth://totp/" + encodedIssuer + ":" + encodedEmail
                + "?secret=" + base32Secret
                + "&issuer=" + encodedIssuer
                + "&algorithm=SHA1&digits=" + TotpVerifier.CODE_DIGITS
                + "&period=" + TotpVerifier.TIME_STEP.toSeconds();
    }
}
