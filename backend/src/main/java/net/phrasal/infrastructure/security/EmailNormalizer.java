package net.phrasal.infrastructure.security;

import java.util.Locale;

/**
 * Single email normalization rule shared by register, login and the admin initializer.
 */
public final class EmailNormalizer {

    private EmailNormalizer() {
    }

    public static String normalize(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }
}
