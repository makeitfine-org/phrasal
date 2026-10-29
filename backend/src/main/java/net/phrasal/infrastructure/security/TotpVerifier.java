package net.phrasal.infrastructure.security;

import com.eatthepath.otp.TimeBasedOneTimePasswordGenerator;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.time.Instant;
import java.util.OptionalLong;
import javax.crypto.spec.SecretKeySpec;

/** Computes and checks RFC 6238 codes: HMAC-SHA1, 30-second steps, 6 digits. */
@Component
public class TotpVerifier {

    /** Length of one time step. */
    public static final Duration TIME_STEP = Duration.ofSeconds(30);
    /** Number of digits in a code. */
    public static final int CODE_DIGITS = 6;
    /** Steps accepted before and after the current one, to tolerate clock drift. */
    public static final int ALLOWED_DRIFT_STEPS = 1;

    private static final String HMAC_ALGORITHM = "HmacSHA1";

    private final TimeBasedOneTimePasswordGenerator generator;

    /** Creates the verifier. */
    public TotpVerifier() {
        try {
            this.generator = new TimeBasedOneTimePasswordGenerator(TIME_STEP, CODE_DIGITS, HMAC_ALGORITHM);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException(HMAC_ALGORITHM + " is not available", e);
        }
    }

    /**
     * Converts a moment to its time-step counter.
     *
     * @param now the moment
     * @return seconds since the epoch divided by the step length
     */
    public long stepAt(Instant now) {
        return now.getEpochSecond() / TIME_STEP.toSeconds();
    }

    /**
     * Computes the code of one step.
     *
     * @param secret the raw shared secret
     * @param step   the time-step counter
     * @return the code, zero-padded to six digits
     */
    public String codeAt(byte[] secret, long step) {
        try {
            return generator.generateOneTimePasswordString(
                    new SecretKeySpec(secret, HMAC_ALGORITHM), Instant.ofEpochSecond(step * TIME_STEP.toSeconds()));
        } catch (InvalidKeyException e) {
            throw new IllegalArgumentException("Invalid TOTP secret", e);
        }
    }

    /**
     * Finds the step whose code equals the submitted one, within the allowed drift. Replay is not
     * handled here.
     *
     * @param secret the raw shared secret
     * @param code   the submitted code
     * @param now    the moment of the submission
     * @return the matching step, or empty when the code is malformed or does not match
     */
    public OptionalLong matchingStep(byte[] secret, String code, Instant now) {
        if (!isSixAsciiDigits(code)) {
            return OptionalLong.empty();
        }
        byte[] submitted = code.getBytes(StandardCharsets.US_ASCII);
        long current = stepAt(now);
        for (long step = current - ALLOWED_DRIFT_STEPS; step <= current + ALLOWED_DRIFT_STEPS; step++) {
            byte[] expected = codeAt(secret, step).getBytes(StandardCharsets.US_ASCII);
            if (MessageDigest.isEqual(expected, submitted)) {
                return OptionalLong.of(step);
            }
        }
        return OptionalLong.empty();
    }

    private static boolean isSixAsciiDigits(String code) {
        if (code == null || code.length() != CODE_DIGITS) {
            return false;
        }
        return code.chars().allMatch(c -> c >= '0' && c <= '9');
    }
}
