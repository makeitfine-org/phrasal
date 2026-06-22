package net.phrasal.infrastructure.exception;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

import static org.assertj.core.api.Assertions.assertThat;

class GlobalExceptionHandlerTest {

    private final GlobalExceptionHandler handler = new GlobalExceptionHandler();

    @Test
    void handlePhrasalVerbNotFoundException() {
        ProblemDetail detail = handler.handlePhrasalVerbNotFoundException(
                new PhrasalVerbNotFoundException(42L));

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
        assertThat(detail.getTitle()).isEqualTo("Phrasal Verb Not Found");
        assertThat(detail.getDetail()).contains("42");
    }

    @Test
    void handleGrammarEntryNotFoundException() {
        ProblemDetail detail = handler.handleGrammarEntryNotFoundException(
                new GrammarEntryNotFoundException(99L));

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
        assertThat(detail.getTitle()).isEqualTo("Grammar Entry Not Found");
        assertThat(detail.getDetail()).contains("99");
    }

    @Test
    void handleIllegalArgumentException() {
        ProblemDetail detail = handler.handleIllegalArgumentException(
                new IllegalArgumentException("bad input"));

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(detail.getTitle()).isEqualTo("Invalid Request");
    }

    @Test
    void handleGlobalException() {
        ProblemDetail detail = handler.handleGlobalException(
                new RuntimeException("unexpected"));

        assertThat(detail.getStatus()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR.value());
        assertThat(detail.getTitle()).isEqualTo("Internal Server Error");
    }
}
