package net.phrasal.infrastructure.exception;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
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
}
