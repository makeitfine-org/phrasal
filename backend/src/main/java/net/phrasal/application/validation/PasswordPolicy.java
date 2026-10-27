package net.phrasal.application.validation;

import java.nio.charset.StandardCharsets;
import java.util.Optional;

/**
 * The password rules in one place, shared by request validation and the admin bootstrap.
 */
public final class PasswordPolicy {

    static final int MIN_LENGTH = 10;
    static final int MAX_UTF8_BYTES = 72;

    private PasswordPolicy() {
    }

    /**
     * Finds the first broken rule.
     *
     * @param password raw password
     * @return the rule message, or empty when the password is acceptable
     */
    public static Optional<String> violation(String password) {
        if (password.length() < MIN_LENGTH) {
            return Optional.of("Password must be at least " + MIN_LENGTH + " characters");
        }
        if (password.getBytes(StandardCharsets.UTF_8).length > MAX_UTF8_BYTES) {
            return Optional.of("Password must not exceed " + MAX_UTF8_BYTES + " bytes (UTF-8)");
        }
        return Optional.empty();
    }
}
