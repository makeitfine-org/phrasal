package net.phrasal.infrastructure.security;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.regex.Pattern;

/** Generates single-use recovery codes and normalizes and hashes submitted ones. */
@Component
public class RecoveryCodes {

    /** Number of codes issued at once. */
    public static final int CODE_COUNT = 10;

    private static final int CODE_BYTES = 10;
    private static final int GROUP_LENGTH = 4;
    private static final Pattern TOTP_FORMAT = Pattern.compile("\\d{6}");
    private static final Pattern NOT_BASE32 = Pattern.compile("[^A-Z2-7]");

    private final SecureRandom secureRandom = new SecureRandom();

    /**
     * Generates a full set of codes.
     *
     * @return distinct codes of 80 random bits each, formatted {@code XXXX-XXXX-XXXX-XXXX}
     */
    public List<String> generate() {
        Set<String> codes = new LinkedHashSet<>();
        while (codes.size() < CODE_COUNT) {
            byte[] bytes = new byte[CODE_BYTES];
            secureRandom.nextBytes(bytes);
            codes.add(format(TwoFactorSecrets.toBase32(bytes)));
        }
        return List.copyOf(codes);
    }

    /**
     * Reduces user input to the canonical code characters.
     *
     * @param input what the user typed, possibly with dashes, spaces or lower case
     * @return the upper-case Base32 characters only; empty for {@code null}
     */
    public static String normalize(String input) {
        if (input == null) {
            return "";
        }
        return NOT_BASE32.matcher(input.toUpperCase(Locale.ROOT)).replaceAll("");
    }

    /**
     * Hashes a code the way it is stored.
     *
     * @param code a recovery code in any accepted spelling
     * @return the SHA-256 hex of the normalized code
     */
    public static String hash(String code) {
        return SecureTokenGenerator.hash(normalize(code));
    }

    /**
     * Tells a TOTP code from a recovery code.
     *
     * @param code the submitted value
     * @return true when it is exactly six digits
     */
    public static boolean looksLikeTotp(String code) {
        return code != null && TOTP_FORMAT.matcher(code).matches();
    }

    private static String format(String base32) {
        StringBuilder formatted = new StringBuilder();
        for (int i = 0; i < base32.length(); i += GROUP_LENGTH) {
            if (i > 0) {
                formatted.append('-');
            }
            formatted.append(base32, i, Math.min(i + GROUP_LENGTH, base32.length()));
        }
        return formatted.toString();
    }
}
