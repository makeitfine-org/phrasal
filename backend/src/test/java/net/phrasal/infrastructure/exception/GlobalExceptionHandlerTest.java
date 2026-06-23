package net.phrasal.infrastructure.exception;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

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
}
