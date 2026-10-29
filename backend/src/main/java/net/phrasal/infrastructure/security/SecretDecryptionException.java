package net.phrasal.infrastructure.security;

/** A stored secret could not be decrypted: unknown format, wrong key, wrong context or tampered data. */
public class SecretDecryptionException extends RuntimeException {

    /**
     * Creates the exception.
     *
     * @param message what went wrong; never contains secret material
     */
    public SecretDecryptionException(String message) {
        super(message);
    }

    /**
     * Creates the exception.
     *
     * @param message what went wrong; never contains secret material
     * @param cause   the underlying failure
     */
    public SecretDecryptionException(String message, Throwable cause) {
        super(message, cause);
    }
}
