package net.phrasal.application.validation;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * The password rules in one place, shared by request validation and the admin bootstrap.
 *
 * <p>Length rules come first, then a blocklist of common passwords, a single-repeated-character check and, when the
 * email is known, a check that the password does not contain the email address or its local part. Character
 * composition (symbols, digits, case) is deliberately not required.
 */
public final class PasswordPolicy {

    static final int MIN_LENGTH = 10;
    static final int MAX_UTF8_BYTES = 72;
    /** Shorter local parts ("a", "jo") would reject far too many unrelated passwords. */
    static final int MIN_EMAIL_PART_LENGTH = 4;

    static final String BLOCKLIST_RESOURCE = "/password-blocklist.txt";
    static final String TOO_COMMON = "Password is too common, choose a less predictable one";
    static final String REPEATED = "Password must not be a single repeated character";
    static final String CONTAINS_EMAIL = "Password must not contain your email address";

    private static final Set<String> BLOCKLIST = loadBlocklist();

    private PasswordPolicy() {
    }

    /**
     * Finds the first broken rule that does not depend on the account.
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
        if (password.chars().distinct().count() == 1) {
            return Optional.of(REPEATED);
        }
        if (BLOCKLIST.contains(password.toLowerCase(Locale.ROOT))) {
            return Optional.of(TOO_COMMON);
        }
        return Optional.empty();
    }

    /**
     * Finds the first broken rule, including those that need the account email.
     *
     * @param password raw password
     * @param email    account email as typed; may be null or blank
     * @return the rule message, or empty when the password is acceptable
     */
    public static Optional<String> violation(String password, String email) {
        return violation(password)
                .or(() -> containsEmail(password, email) ? Optional.of(CONTAINS_EMAIL) : Optional.empty());
    }

    private static boolean containsEmail(String password, String email) {
        if (email == null || email.isBlank()) {
            return false;
        }
        String lowerPassword = password.toLowerCase(Locale.ROOT);
        String lowerEmail = email.strip().toLowerCase(Locale.ROOT);
        if (lowerPassword.contains(lowerEmail)) {
            return true;
        }
        String localPart = lowerEmail.substring(0, Math.max(lowerEmail.indexOf('@'), 0));
        return localPart.length() >= MIN_EMAIL_PART_LENGTH && lowerPassword.contains(localPart);
    }

    private static Set<String> loadBlocklist() {
        try (InputStream in = PasswordPolicy.class.getResourceAsStream(BLOCKLIST_RESOURCE)) {
            if (in == null) {
                throw new IllegalStateException("Missing classpath resource " + BLOCKLIST_RESOURCE);
            }
            BufferedReader reader = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8));
            return reader.lines()
                    .map(String::strip)
                    .filter(line -> !line.isEmpty() && !line.startsWith("#"))
                    .map(line -> line.toLowerCase(Locale.ROOT))
                    .collect(Collectors.toUnmodifiableSet());
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}
