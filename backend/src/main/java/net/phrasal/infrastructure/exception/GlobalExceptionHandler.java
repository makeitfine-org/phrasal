package net.phrasal.infrastructure.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.net.URI;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    private static final String ERROR_BASE_URI = "https://api.phrasal.net/errors/";

    private ProblemDetail buildProblem(HttpStatus status, String title, String errorType, String detail) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(status, detail);
        problem.setTitle(title);
        problem.setType(URI.create(ERROR_BASE_URI + errorType));
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }

    @ExceptionHandler(PhrasalVerbNotFoundException.class)
    public ProblemDetail handlePhrasalVerbNotFound(PhrasalVerbNotFoundException ex) {
        log.warn("Phrasal verb not found: {}", ex.getMessage());
        return buildProblem(HttpStatus.NOT_FOUND, "Phrasal Verb Not Found",
                "phrasal-verb-not-found", ex.getMessage());
    }

    @ExceptionHandler(VerbDetailNotFoundException.class)
    public ProblemDetail handleVerbDetailNotFound(VerbDetailNotFoundException ex) {
        log.warn("Verb detail not found: {}", ex.getMessage());
        return buildProblem(HttpStatus.NOT_FOUND, "Verb Detail Not Found",
                "verb-detail-not-found", ex.getMessage());
    }

    @ExceptionHandler(GrammarEntryNotFoundException.class)
    public ProblemDetail handleGrammarEntryNotFound(GrammarEntryNotFoundException ex) {
        log.warn("Grammar entry not found: {}", ex.getMessage());
        return buildProblem(HttpStatus.NOT_FOUND, "Grammar Entry Not Found",
                "grammar-entry-not-found", ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ProblemDetail problem = buildProblem(HttpStatus.BAD_REQUEST, "Validation Error",
                "validation-error", "Validation failed for one or more fields");
        problem.setProperty("errors", errors);
        return problem;
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ProblemDetail handleIllegalArgument(IllegalArgumentException ex) {
        log.warn("Invalid request: {}", ex.getMessage());
        return buildProblem(HttpStatus.BAD_REQUEST, "Invalid Request",
                "invalid-request", ex.getMessage());
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ProblemDetail handleNoResourceFound(NoResourceFoundException ex) {
        return buildProblem(HttpStatus.NOT_FOUND, "Resource Not Found",
                "not-found", ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGlobal(Exception ex) {
        log.error("Unexpected error", ex);
        return buildProblem(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error",
                "internal-error", "An unexpected error occurred");
    }
}
