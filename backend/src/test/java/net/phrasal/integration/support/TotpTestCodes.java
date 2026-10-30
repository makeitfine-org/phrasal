package net.phrasal.integration.support;

import net.phrasal.infrastructure.security.TotpVerifier;
import org.apache.commons.codec.binary.Base32;

import java.time.Instant;

/** Computes authenticator-app codes for integration tests from the Base32 secret returned by setup. */
public final class TotpTestCodes {

    private static final TotpVerifier VERIFIER = new TotpVerifier();

    private TotpTestCodes() {

    }

    /**
     * The code an app shows right now.
     *
     * @param base32Secret the secret from the setup response
     * @return the current six-digit code
     */
    public static String codeNow(String base32Secret) {
        return codeAt(base32Secret, stepOf(Instant.now()));
    }

    /**
     * A code for the step after the given one, so it passes replay protection. The server accepts one step ahead, so
     * this works while the step is at most one ahead of the clock.
     *
     * @param base32Secret the secret from the setup response
     * @param lastStep     the last step the server accepted
     * @return the code of {@code lastStep + 1}
     */
    public static String nextCode(String base32Secret, long lastStep) {
        return codeAt(base32Secret, lastStep + 1);
    }

    /**
     * Converts a moment to its TOTP step.
     *
     * @param instant the moment
     * @return the step counter
     */
    public static long stepOf(Instant instant) {
        return VERIFIER.stepAt(instant);
    }

    /**
     * The step the server would see right now.
     *
     * @return the current step counter
     */
    public static long currentStep() {
        return stepOf(Instant.now());
    }

    private static String codeAt(String base32Secret, long step) {
        return VERIFIER.codeAt(new Base32().decode(base32Secret), step);
    }
}
