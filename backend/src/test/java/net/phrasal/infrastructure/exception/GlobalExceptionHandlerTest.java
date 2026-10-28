package net.phrasal.infrastructure.exception;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;

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
    @DisplayName("returns 409 for an already registered email")
    void handleEmailAlreadyRegistered() {
        ProblemDetail detail = handler.handleEmailAlreadyRegistered(new EmailAlreadyRegisteredException());

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.CONFLICT.value());
        assertThat(detail.getTitle()).isEqualTo("Email Already Registered");
        assertThat(detail.getType().toString()).endsWith("/errors/email-already-registered");
        assertThat(detail.getDetail()).isEqualTo("An account with this email already exists");
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
}
