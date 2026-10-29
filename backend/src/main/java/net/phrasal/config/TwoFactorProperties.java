package net.phrasal.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

/**
 * Settings of the TOTP second factor.
 *
 * @param encryptionKey base64 of the 32-byte AES key that protects the stored TOTP secrets
 * @param issuer        name shown in the authenticator app
 * @param loginTimeout  how long a password-verified login may wait for its second factor
 */
@ConfigurationProperties("phrasal.two-factor")
public record TwoFactorProperties(String encryptionKey, String issuer, Duration loginTimeout) {

    @Override
    public String toString() {
        return "TwoFactorProperties[encryptionKey=*****, issuer=" + issuer + ", loginTimeout=" + loginTimeout + "]";
    }
}
