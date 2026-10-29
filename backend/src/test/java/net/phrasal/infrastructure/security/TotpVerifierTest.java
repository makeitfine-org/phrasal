package net.phrasal.infrastructure.security;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;

import java.nio.charset.StandardCharsets;
import java.time.Instant;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("TotpVerifier")
class TotpVerifierTest {

    private static final byte[] RFC_SECRET = "12345678901234567890".getBytes(StandardCharsets.US_ASCII);
    private static final long NOW_SECONDS = 1_700_000_000L;
    private static final int STEP_SECONDS = 30;

    private final TotpVerifier verifier = new TotpVerifier();

    @ParameterizedTest(name = "T={0} -> {1}")
    @CsvSource({
            "59,287082",
            "1111111109,081804",
            "1111111111,050471",
            "1234567890,005924",
            "2000000000,279037",
            "20000000000,353130"
    })
    @DisplayName("matches the RFC 6238 SHA-1 vectors, including leading zeros")
    void rfcVectors(long epochSeconds, String expected) {
        assertThat(verifier.codeAt(RFC_SECRET, verifier.stepAt(Instant.ofEpochSecond(epochSeconds))))
                .isEqualTo(expected);
    }

    @Test
    @DisplayName("stepAt divides epoch seconds by 30")
    void stepAt() {
        assertThat(verifier.stepAt(Instant.ofEpochSecond(STEP_SECONDS - 1))).isZero();
        assertThat(verifier.stepAt(Instant.ofEpochSecond(STEP_SECONDS))).isEqualTo(1);
    }

    @Test
    @DisplayName("the code of the current step is accepted and its step returned")
    void currentStep() {
        Instant now = Instant.ofEpochSecond(NOW_SECONDS);
        long step = verifier.stepAt(now);

        assertThat(verifier.matchingStep(RFC_SECRET, verifier.codeAt(RFC_SECRET, step), now))
                .hasValue(step);
    }

    @Test
    @DisplayName("steps s-1 and s+1 are accepted and reported as such")
    void driftAccepted() {
        Instant now = Instant.ofEpochSecond(NOW_SECONDS);
        long step = verifier.stepAt(now);

        assertThat(verifier.matchingStep(RFC_SECRET, verifier.codeAt(RFC_SECRET, step - 1), now))
                .hasValue(step - 1);
        assertThat(verifier.matchingStep(RFC_SECRET, verifier.codeAt(RFC_SECRET, step + 1), now))
                .hasValue(step + 1);
    }

    @Test
    @DisplayName("steps s-2 and s+2 are rejected")
    void driftRejected() {
        Instant now = Instant.ofEpochSecond(NOW_SECONDS);
        long step = verifier.stepAt(now);

        assertThat(verifier.matchingStep(RFC_SECRET, verifier.codeAt(RFC_SECRET, step - 2), now)).isEmpty();
        assertThat(verifier.matchingStep(RFC_SECRET, verifier.codeAt(RFC_SECRET, step + 2), now)).isEmpty();
    }

    @ParameterizedTest
    @ValueSource(strings = {"12345", "1234567", "12a456", " 123456", "123456 ", "", "١٢٣٤٥٦"})
    @NullSource
    @DisplayName("malformed codes never match")
    void malformedCodes(String code) {
        assertThat(verifier.matchingStep(RFC_SECRET, code, Instant.ofEpochSecond(NOW_SECONDS))).isEmpty();
    }

    @Test
    @DisplayName("a code from another secret does not match")
    void otherSecret() {
        Instant now = Instant.ofEpochSecond(NOW_SECONDS);
        byte[] other = "abcdefghijklmnopqrst".getBytes(StandardCharsets.US_ASCII);
        String foreign = verifier.codeAt(other, verifier.stepAt(now));

        assertThat(verifier.matchingStep(RFC_SECRET, foreign, now)).isEmpty();
    }
}
