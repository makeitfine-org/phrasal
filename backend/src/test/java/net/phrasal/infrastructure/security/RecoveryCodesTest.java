package net.phrasal.infrastructure.security;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("RecoveryCodes")
class RecoveryCodesTest {

    private static final String FORMAT = "[A-Z2-7]{4}(-[A-Z2-7]{4}){3}";

    private final RecoveryCodes recoveryCodes = new RecoveryCodes();

    @Test
    @DisplayName("generates 10 distinct codes in XXXX-XXXX-XXXX-XXXX form")
    void generate() {
        List<String> codes = recoveryCodes.generate();

        assertThat(codes).hasSize(RecoveryCodes.CODE_COUNT).allMatch(code -> code.matches(FORMAT));
        assertThat(new HashSet<>(codes)).hasSameSizeAs(codes);
    }

    @Test
    @DisplayName("two generations produce different codes")
    void generationsDiffer() {
        assertThat(recoveryCodes.generate()).isNotEqualTo(recoveryCodes.generate());
    }

    @Test
    @DisplayName("normalize drops dashes and spaces and upper-cases")
    void normalize() {
        assertThat(RecoveryCodes.normalize(" abcd-efgh ijkl mnop ")).isEqualTo("ABCDEFGHIJKLMNOP");
    }

    @Test
    @DisplayName("normalize of null is empty")
    void normalizeNull() {
        assertThat(RecoveryCodes.normalize(null)).isEmpty();
    }

    @Test
    @DisplayName("hash ignores case and dashes, and differs between codes")
    void hash() {
        assertThat(RecoveryCodes.hash("ABCD-EFGH-IJKL-MNOP")).isEqualTo(RecoveryCodes.hash("abcdefghijklmnop"))
                .isNotEqualTo(RecoveryCodes.hash("ABCD-EFGH-IJKL-MNOQ"))
                .matches("[0-9a-f]{64}");
    }

    @Test
    @DisplayName("looksLikeTotp accepts exactly six digits")
    void looksLikeTotp() {
        assertThat(RecoveryCodes.looksLikeTotp("123456")).isTrue();
        assertThat(RecoveryCodes.looksLikeTotp("12345")).isFalse();
        assertThat(RecoveryCodes.looksLikeTotp("1234567")).isFalse();
        assertThat(RecoveryCodes.looksLikeTotp("ABCD-EFGH-IJKL-MNOP")).isFalse();
        assertThat(RecoveryCodes.looksLikeTotp(null)).isFalse();
    }
}
