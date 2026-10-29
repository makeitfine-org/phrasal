package net.phrasal.infrastructure.security;

import net.phrasal.config.TwoFactorProperties;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Arrays;
import java.util.Base64;
import java.util.HexFormat;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayName("AesGcmEncryptor")
class AesGcmEncryptorTest {

    private static final int KEY_BYTES = 32;
    private static final int SHORT_KEY_BYTES = 16;
    private static final String PREFIX = "v1:";
    private static final String AAD = "user:7";
    private static final byte[] SECRET = "12345678901234567890".getBytes(StandardCharsets.US_ASCII);

    private final AesGcmEncryptor encryptor = new AesGcmEncryptor(propertiesWith(keyOf((byte) 1, KEY_BYTES)));

    @Test
    @DisplayName("round trip returns the same bytes")
    void roundTrip() {
        assertThat(encryptor.decrypt(encryptor.encrypt(SECRET, AAD), AAD)).isEqualTo(SECRET);
    }

    @Test
    @DisplayName("two encryptions of the same plaintext differ and both decrypt")
    void freshIvEveryTime() {
        String first = encryptor.encrypt(SECRET, AAD);
        String second = encryptor.encrypt(SECRET, AAD);

        assertThat(first).isNotEqualTo(second);
        assertThat(encryptor.decrypt(first, AAD)).isEqualTo(SECRET);
        assertThat(encryptor.decrypt(second, AAD)).isEqualTo(SECRET);
    }

    @Test
    @DisplayName("output starts with v1: and does not expose the plaintext")
    void outputHidesPlaintext() {
        String stored = encryptor.encrypt(SECRET, AAD);

        assertThat(stored).startsWith(PREFIX)
                .doesNotContain(TwoFactorSecrets.toBase32(SECRET))
                .doesNotContain(HexFormat.of().formatHex(SECRET));
    }

    @Test
    @DisplayName("decrypting with another context (user id) fails")
    void wrongAadFails() {
        String stored = encryptor.encrypt(SECRET, AAD);

        assertThatThrownBy(() -> encryptor.decrypt(stored, "user:8")).isInstanceOf(SecretDecryptionException.class);
    }

    @Test
    @DisplayName("a flipped ciphertext byte fails")
    void tamperedCiphertextFails() {
        byte[] combined = Base64.getDecoder().decode(encryptor.encrypt(SECRET, AAD).substring(PREFIX.length()));
        combined[combined.length / 2] ^= 1;
        String tampered = PREFIX + Base64.getEncoder().encodeToString(combined);

        assertThatThrownBy(() -> encryptor.decrypt(tampered, AAD)).isInstanceOf(SecretDecryptionException.class);
    }

    @Test
    @DisplayName("decrypting with another key fails")
    void otherKeyFails() {
        String stored = encryptor.encrypt(SECRET, AAD);
        AesGcmEncryptor other = new AesGcmEncryptor(propertiesWith(keyOf((byte) 2, KEY_BYTES)));

        assertThatThrownBy(() -> other.decrypt(stored, AAD)).isInstanceOf(SecretDecryptionException.class);
    }

    @Test
    @DisplayName("unknown prefix, null, truncated and non-base64 values fail")
    void malformedValuesFail() {
        String stored = encryptor.encrypt(SECRET, AAD);

        assertThatThrownBy(() -> encryptor.decrypt("v2:" + stored.substring(PREFIX.length()), AAD))
                .isInstanceOf(SecretDecryptionException.class);
        assertThatThrownBy(() -> encryptor.decrypt(null, AAD)).isInstanceOf(SecretDecryptionException.class);
        assertThatThrownBy(() -> encryptor.decrypt(PREFIX + "AAAA", AAD))
                .isInstanceOf(SecretDecryptionException.class);
        assertThatThrownBy(() -> encryptor.decrypt(PREFIX + "***", AAD))
                .isInstanceOf(SecretDecryptionException.class);
    }

    @Test
    @DisplayName("a blank key stops startup")
    void blankKeyFails() {
        assertThatThrownBy(() -> new AesGcmEncryptor(propertiesWith("  ")))
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("TOTP_ENCRYPTION_KEY is not set");
        assertThatThrownBy(() -> new AesGcmEncryptor(propertiesWith(null)))
                .isInstanceOf(IllegalStateException.class);
    }

    @Test
    @DisplayName("a 16-byte or non-base64 key stops startup and the message omits the key")
    void invalidKeyFails() {
        String shortKey = keyOf((byte) 3, SHORT_KEY_BYTES);
        String notBase64 = "not*base64*key";

        assertThatThrownBy(() -> new AesGcmEncryptor(propertiesWith(shortKey)))
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("TOTP_ENCRYPTION_KEY must be 32 bytes, base64")
                .hasMessageNotContaining(shortKey);
        assertThatThrownBy(() -> new AesGcmEncryptor(propertiesWith(notBase64)))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageNotContaining(notBase64);
    }

    private static String keyOf(byte fill, int length) {
        byte[] key = new byte[length];
        Arrays.fill(key, fill);
        return Base64.getEncoder().encodeToString(key);
    }

    private static TwoFactorProperties propertiesWith(String key) {
        return new TwoFactorProperties(key, "Phrasal", Duration.ofMinutes(5));
    }
}
