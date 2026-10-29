package net.phrasal.infrastructure.security;

import net.phrasal.config.TwoFactorProperties;
import org.springframework.stereotype.Component;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.SecureRandom;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;

/**
 * Encrypts small secrets with AES-256-GCM. The stored form is {@code v1:} followed by base64 of
 * IV, ciphertext and tag; the additional authenticated data binds a value to its owner.
 */
@Component
public class AesGcmEncryptor {

    private static final String PREFIX = "v1:";
    private static final String TRANSFORMATION = "AES/GCM/NoPadding";
    private static final int KEY_BYTES = 32;
    private static final int IV_BYTES = 12;
    private static final int TAG_BITS = 128;

    private final SecretKey key;
    private final SecureRandom secureRandom = new SecureRandom();

    /**
     * Reads and validates the key.
     *
     * @param properties holds the base64 key; startup fails when it is missing or malformed
     */
    public AesGcmEncryptor(TwoFactorProperties properties) {
        this.key = new SecretKeySpec(decodeKey(properties.encryptionKey()), "AES");
    }

    /**
     * Encrypts a value.
     *
     * @param plaintext the bytes to protect
     * @param aad       context bound to the ciphertext, for example the owning user
     * @return the value to store
     */
    public String encrypt(byte[] plaintext, String aad) {
        byte[] iv = new byte[IV_BYTES];
        secureRandom.nextBytes(iv);
        try {
            Cipher cipher = Cipher.getInstance(TRANSFORMATION);
            cipher.init(Cipher.ENCRYPT_MODE, key, new GCMParameterSpec(TAG_BITS, iv));
            cipher.updateAAD(aad.getBytes(StandardCharsets.UTF_8));
            byte[] encrypted = cipher.doFinal(plaintext);
            byte[] combined = ByteBuffer.allocate(iv.length + encrypted.length).put(iv).put(encrypted).array();
            return PREFIX + Base64.getEncoder().encodeToString(combined);
        } catch (GeneralSecurityException e) {
            throw new IllegalStateException("Encryption failed", e);
        }
    }

    /**
     * Decrypts a stored value.
     *
     * @param stored the value produced by {@link #encrypt}
     * @param aad    the context used when encrypting
     * @return the original bytes
     * @throws SecretDecryptionException when the format, key, context or data do not match
     */
    public byte[] decrypt(String stored, String aad) {
        if (stored == null || !stored.startsWith(PREFIX)) {
            throw new SecretDecryptionException("Unsupported secret format");
        }
        try {
            byte[] combined = Base64.getDecoder().decode(stored.substring(PREFIX.length()));
            if (combined.length <= IV_BYTES) {
                throw new SecretDecryptionException("Secret is too short");
            }
            Cipher cipher = Cipher.getInstance(TRANSFORMATION);
            cipher.init(Cipher.DECRYPT_MODE, key, new GCMParameterSpec(TAG_BITS, combined, 0, IV_BYTES));
            cipher.updateAAD(aad.getBytes(StandardCharsets.UTF_8));
            return cipher.doFinal(combined, IV_BYTES, combined.length - IV_BYTES);
        } catch (GeneralSecurityException | IllegalArgumentException e) {
            throw new SecretDecryptionException("Secret could not be decrypted", e);
        }
    }

    private static byte[] decodeKey(String base64Key) {
        if (base64Key == null || base64Key.isBlank()) {
            throw new IllegalStateException("TOTP_ENCRYPTION_KEY is not set");
        }
        byte[] bytes;
        try {
            bytes = Base64.getDecoder().decode(base64Key.trim());
        } catch (IllegalArgumentException e) {
            throw new IllegalStateException("TOTP_ENCRYPTION_KEY must be 32 bytes, base64");
        }
        if (bytes.length != KEY_BYTES) {
            throw new IllegalStateException("TOTP_ENCRYPTION_KEY must be 32 bytes, base64");
        }
        return bytes;
    }
}
