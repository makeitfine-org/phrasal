package net.phrasal.infrastructure.exception;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InsufficientAuthenticationException;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("GlobalExceptionHandler")
class GlobalExceptionHandlerTest {

    private final GlobalExceptionHandler handler = new GlobalExceptionHandler();

    @Test
    @DisplayName("returns 404 for phrasal verb not found")
    void handlePhrasalVerbNotFound() {
        ProblemDetail detail = handler.handleResourceNotFound(
                new PhrasalVerbNotFoundException(42L));

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
        assertThat(detail.getTitle()).isEqualTo("Phrasal Verb Not Found");
        assertThat(detail.getDetail()).contains("42");
    }

    @Test
    @DisplayName("returns 404 for grammar entry not found")
    void handleGrammarEntryNotFound() {
        ProblemDetail detail = handler.handleResourceNotFound(
                new GrammarEntryNotFoundException(99L));

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
        assertThat(detail.getTitle()).isEqualTo("Grammar Entry Not Found");
        assertThat(detail.getDetail()).contains("99");
    }

    @Test
    @DisplayName("returns 404 for verb detail not found")
    void handleVerbDetailNotFound() {
        ProblemDetail detail = handler.handleResourceNotFound(
                new VerbDetailNotFoundException(7L));

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
        assertThat(detail.getTitle()).isEqualTo("Verb Detail Not Found");
        assertThat(detail.getDetail()).contains("7");
    }

    @Test
    @DisplayName("returns 400 for illegal argument")
    void handleIllegalArgument() {
        ProblemDetail detail = handler.handleIllegalArgument(
                new IllegalArgumentException("bad input"));

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(detail.getTitle()).isEqualTo("Invalid Request");
    }

    @Test
    @DisplayName("returns 500 for unexpected errors without leaking details")
    void handleGlobal() {
        ProblemDetail detail = handler.handleGlobal(
                new RuntimeException("unexpected"));

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR.value());
        assertThat(detail.getTitle()).isEqualTo("Internal Server Error");
        assertThat(detail.getDetail()).isEqualTo("An unexpected error occurred");
    }

    @Test
    @DisplayName("returns 401 'Invalid email or password' for bad credentials")
    void handleBadCredentials() {
        ProblemDetail detail = handler.handleAuthentication(new BadCredentialsException("internal"));

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
        assertThat(detail.getTitle()).isEqualTo("Unauthorized");
        assertThat(detail.getDetail()).isEqualTo("Invalid email or password");
    }

    @Test
    @DisplayName("returns 401 with generic detail for other authentication errors")
    void handleOtherAuthenticationError() {
        ProblemDetail detail = handler.handleAuthentication(new InsufficientAuthenticationException("internal"));

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
        assertThat(detail.getDetail()).isEqualTo("Authentication is required");
    }

    @Test
    @DisplayName("returns 403 without leaking the denial reason")
    void handleAccessDenied() {
        ProblemDetail detail = handler.handleAccessDenied(new AccessDeniedException("internal rule"));

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.FORBIDDEN.value());
        assertThat(detail.getTitle()).isEqualTo("Forbidden");
        assertThat(detail.getDetail()).doesNotContain("internal");
    }

    @Test
    @DisplayName("returns 403 email-not-verified for a disabled account")
    void handleEmailNotVerified() {
        ProblemDetail detail = handler.handleEmailNotVerified(new DisabledException("User is disabled"));

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.FORBIDDEN.value());
        assertThat(detail.getTitle()).isEqualTo("Email Not Verified");
        assertThat(detail.getType().toString()).endsWith("/errors/email-not-verified");
        assertThat(detail.getDetail()).isEqualTo("Please confirm your email address before logging in");
    }

    @Test
    @DisplayName("returns 400 verification-link-invalid without internal detail")
    void handleVerificationLinkInvalid() {
        ProblemDetail detail = handler.handleVerificationLinkInvalid(new VerificationLinkInvalidException());

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(detail.getTitle()).isEqualTo("Verification Link Invalid");
        assertThat(detail.getType().toString()).endsWith("/errors/verification-link-invalid");
        assertThat(detail.getDetail()).isEqualTo("This verification link is invalid or has already been used");
    }

    @Test
    @DisplayName("returns 400 verification-link-expired without internal detail")
    void handleVerificationLinkExpired() {
        ProblemDetail detail = handler.handleVerificationLinkExpired(new VerificationLinkExpiredException());

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(detail.getTitle()).isEqualTo("Verification Link Expired");
        assertThat(detail.getType().toString()).endsWith("/errors/verification-link-expired");
        assertThat(detail.getDetail()).isEqualTo("This verification link has expired");
    }

    @Test
    @DisplayName("returns 400 reset-link-invalid without internal detail")
    void handleResetLinkInvalid() {
        ProblemDetail detail = handler.handleResetLinkInvalid(new ResetLinkInvalidException());

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(detail.getTitle()).isEqualTo("Reset Link Invalid");
        assertThat(detail.getType().toString()).endsWith("/errors/reset-link-invalid");
        assertThat(detail.getDetail()).isEqualTo("This password reset link is invalid or has already been used");
    }

    @Test
    @DisplayName("returns 400 reset-link-expired without internal detail")
    void handleResetLinkExpired() {
        ProblemDetail detail = handler.handleResetLinkExpired(new ResetLinkExpiredException());

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(detail.getTitle()).isEqualTo("Reset Link Expired");
        assertThat(detail.getType().toString()).endsWith("/errors/reset-link-expired");
        assertThat(detail.getDetail()).isEqualTo("This password reset link has expired");
    }

    @Test
    @DisplayName("returns 400 email-change-link-invalid")
    void handleEmailChangeLinkInvalid() {
        ProblemDetail detail = handler.handleEmailChangeLinkInvalid(new EmailChangeLinkInvalidException());

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(detail.getType().toString()).endsWith("/errors/email-change-link-invalid");
        assertThat(detail.getDetail()).isEqualTo("This email change link is invalid or was already used");
    }

    @Test
    @DisplayName("returns 400 email-change-link-expired")
    void handleEmailChangeLinkExpired() {
        ProblemDetail detail = handler.handleEmailChangeLinkExpired(new EmailChangeLinkExpiredException());

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(detail.getType().toString()).endsWith("/errors/email-change-link-expired");
        assertThat(detail.getDetail()).isEqualTo("This email change link has expired");
    }

    @Test
    @DisplayName("returns 409 email-change-conflict")
    void handleEmailChangeConflict() {
        ProblemDetail detail = handler.handleEmailChangeConflict(new EmailChangeConflictException());

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.CONFLICT.value());
        assertThat(detail.getType().toString()).endsWith("/errors/email-change-conflict");
        assertThat(detail.getDetail()).isEqualTo("This address is already used by another account");
    }

    @Test
    @DisplayName("returns 400 validation-error with errors.password for a policy violation")
    void handlePasswordPolicyViolation() {
        ProblemDetail detail = handler.handleFieldValidation(
                new PasswordPolicyViolationException("Password must not contain your email address"));

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(detail.getTitle()).isEqualTo("Validation Error");
        assertThat(detail.getType().toString()).endsWith("/errors/validation-error");
        assertThat(detail.getDetail()).isEqualTo("Validation failed for one or more fields");
        assertThat(detail.getProperties()).containsEntry("errors",
                Map.of("password", "Password must not contain your email address"));
    }

    @Test
    @DisplayName("returns errors.newPassword for a policy violation on another field")
    void handlePasswordPolicyViolationOnOtherField() {
        ProblemDetail detail = handler.handleFieldValidation(
                new PasswordPolicyViolationException("newPassword", "Choose a different password"));

        assertThat(detail.getProperties()).containsEntry("errors",
                Map.of("newPassword", "Choose a different password"));
    }

    @Test
    @DisplayName("returns 400 validation-error under the field a service names")
    void handleFieldValidation() {
        ProblemDetail detail = handler.handleFieldValidation(
                new FieldValidationException("newEmail", "This is already your email address"));

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(detail.getType().toString()).endsWith("/errors/validation-error");
        assertThat(detail.getProperties()).containsEntry("errors",
                Map.of("newEmail", "This is already your email address"));
    }

    @Test
    @DisplayName("returns 403 admin-account-managed, not the generic forbidden problem")
    void handleAdminAccountManaged() {
        ProblemDetail detail = handler.handleAdminAccountManaged(new AdminAccountManagedException());

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.FORBIDDEN.value());
        assertThat(detail.getTitle()).isEqualTo("Admin Account Managed");
        assertThat(detail.getType().toString()).endsWith("/errors/admin-account-managed")
                .doesNotEndWith("/errors/forbidden");
        assertThat(detail.getDetail()).isEqualTo("The admin account is managed through server configuration");
    }

    @Test
    @DisplayName("returns 429 with a Retry-After header")
    void handleRateLimited() {
        var response = handler.handleRateLimited(new RateLimitExceededException("login-per-ip", 42));

        assertThat(response.getStatusCode().value()).isEqualTo(HttpStatus.TOO_MANY_REQUESTS.value());
        assertThat(response.getHeaders().getFirst("Retry-After")).isEqualTo("42");
        assertThat(response.getBody().getTitle()).isEqualTo("Too Many Requests");
        assertThat(response.getBody().getType().toString()).endsWith("/errors/rate-limited");
    }

    @Test
    @DisplayName("returns 400 for an unknown quiz key without echoing it")
    void handleUnknownQuizKey() {
        ProblemDetail detail = handler.handleUnknownQuizKey(new UnknownQuizKeyException());

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(detail.getTitle()).isEqualTo("Unknown Quiz Key");
        assertThat(detail.getType().toString()).endsWith("/errors/unknown-quiz-key");
        assertThat(detail.getDetail()).isEqualTo("Unknown quiz key");
    }

    @Test
    @DisplayName("returns 400 for a quiz state that is too large")
    void handleQuizProgressTooLarge() {
        ProblemDetail detail = handler.handleQuizProgressTooLarge(new QuizProgressTooLargeException(10));

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(detail.getTitle()).isEqualTo("Quiz Progress Too Large");
        assertThat(detail.getType().toString()).endsWith("/errors/quiz-progress-too-large");
        assertThat(detail.getDetail()).isEqualTo("Quiz progress must not exceed 10 bytes");
    }

    @Test
    @DisplayName("returns 404 for missing quiz progress")
    void handleQuizProgressNotFound() {
        ProblemDetail detail = handler.handleResourceNotFound(new QuizProgressNotFoundException());

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
        assertThat(detail.getTitle()).isEqualTo("Quiz Progress Not Found");
        assertThat(detail.getType().toString()).endsWith("/errors/quiz-progress-not-found");
    }

    @Test
    @DisplayName("returns 400 for an unreadable body without leaking the parser message")
    void handleMessageNotReadable() {
        HttpMessageNotReadableException ex = new HttpMessageNotReadableException(
                "Unexpected character at line 1 secret-parser-detail", (HttpInputMessage) null);

        ProblemDetail detail = handler.handleMessageNotReadable(ex);

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(detail.getTitle()).isEqualTo("Malformed Request");
        assertThat(detail.getType().toString()).endsWith("/errors/malformed-request");
        assertThat(detail.getDetail()).isEqualTo("Request body is missing or is not valid JSON")
                .doesNotContain("secret-parser-detail");
    }

    @Test
    @DisplayName("returns 400 invalid-two-factor-code with the code error")
    void handleInvalidTwoFactorCode() {
        ProblemDetail detail = handler.handleInvalidTwoFactorCode(new InvalidTwoFactorCodeException());

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(detail.getTitle()).isEqualTo("Invalid Code");
        assertThat(detail.getType().toString()).endsWith("/errors/invalid-two-factor-code");
        assertThat(detail.getProperties()).containsEntry("errors", Map.of("code", "Invalid or already used code"));
    }

    @Test
    @DisplayName("returns 400 wrong-password with the password error")
    void handleWrongPassword() {
        ProblemDetail detail = handler.handleWrongPassword(new WrongPasswordException());

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(detail.getTitle()).isEqualTo("Wrong Password");
        assertThat(detail.getType().toString()).endsWith("/errors/wrong-password");
        assertThat(detail.getProperties()).containsEntry("errors",
                Map.of("password", "Current password is incorrect"));
    }

    @ParameterizedTest
    @EnumSource(TwoFactorStateException.Reason.class)
    @DisplayName("returns 409 with the type of each two-factor state conflict")
    void handleTwoFactorState(TwoFactorStateException.Reason reason) {
        ProblemDetail detail = handler.handleTwoFactorState(new TwoFactorStateException(reason));

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.CONFLICT.value());
        assertThat(detail.getTitle()).isEqualTo("Conflict");
        assertThat(detail.getType().toString()).endsWith("/errors/" + reason.getErrorType());
        assertThat(detail.getDetail()).isNotBlank();
    }

    @Test
    @DisplayName("returns 401 two-factor-login-expired")
    void handleTwoFactorLoginExpired() {
        ProblemDetail detail = handler.handleTwoFactorLoginExpired(new TwoFactorLoginExpiredException());

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
        assertThat(detail.getTitle()).isEqualTo("Unauthorized");
        assertThat(detail.getType().toString()).endsWith("/errors/two-factor-login-expired");
        assertThat(detail.getDetail()).isEqualTo("Your sign-in timed out. Log in again.");
    }
}
