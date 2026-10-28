package net.phrasal.application.validation;

import jakarta.validation.ConstraintValidatorContext;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Answers;
import org.mockito.Mockito;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@DisplayName("PasswordPolicyValidator")
class PasswordPolicyValidatorTest {

    private static final int EURO_FITS = 24;
    private static final int EURO_TOO_LONG = 25;
    private static final int MAX_ASCII = 72;

    private final PasswordPolicyValidator validator = new PasswordPolicyValidator();
    private final ConstraintValidatorContext context =
            Mockito.mock(ConstraintValidatorContext.class, Answers.RETURNS_DEEP_STUBS);

    @Test
    @DisplayName("null is valid (reported by @NotBlank)")
    void nullIsValid() {
        assertThat(validator.isValid(null, context)).isTrue();
    }

    @Test
    @DisplayName("9 characters is rejected with the length message")
    void tooShort() {
        assertThat(validator.isValid("a".repeat(9), context)).isFalse();

        verify(context).disableDefaultConstraintViolation();
        verify(context).buildConstraintViolationWithTemplate("Password must be at least 10 characters");
    }

    @Test
    @DisplayName("10 characters is accepted")
    void minLength() {
        assertThat(validator.isValid("kx9tq2mzv4", context)).isTrue();
        verify(context, never()).buildConstraintViolationWithTemplate(anyString());
    }

    @Test
    @DisplayName("common password is rejected with the blocklist message")
    void commonPassword() {
        assertThat(validator.isValid("Password123", context)).isFalse();

        verify(context).buildConstraintViolationWithTemplate(PasswordPolicy.TOO_COMMON);
    }

    @Test
    @DisplayName("72 ASCII bytes is accepted")
    void maxAscii() {
        assertThat(validator.isValid("ab".repeat(MAX_ASCII / 2), context)).isTrue();
    }

    @Test
    @DisplayName("73 ASCII bytes is rejected with the bytes message")
    void overMaxAscii() {
        assertThat(validator.isValid("a".repeat(MAX_ASCII + 1), context)).isFalse();

        verify(context).buildConstraintViolationWithTemplate("Password must not exceed 72 bytes (UTF-8)");
    }

    @Test
    @DisplayName("24 x 3-byte characters (72 bytes) is accepted")
    void multiByteFits() {
        assertThat(validator.isValid("€x".repeat(EURO_FITS / 2), context)).isTrue();
    }

    @Test
    @DisplayName("25 x 3-byte characters (75 bytes) is rejected")
    void multiByteTooLong() {
        assertThat(validator.isValid("€".repeat(EURO_TOO_LONG), context)).isFalse();
    }
}
