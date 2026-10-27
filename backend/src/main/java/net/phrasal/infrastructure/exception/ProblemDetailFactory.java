package net.phrasal.infrastructure.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

import java.net.URI;
import java.time.Instant;

/**
 * Single place that builds RFC 7807 {@link ProblemDetail} bodies, shared by the exception advice
 * and the Spring Security entry point / access denied handler.
 */
public final class ProblemDetailFactory {

    public static final String ERROR_BASE_URI = "https://api.phrasal.net/errors/";

    private ProblemDetailFactory() {

    }

    public static ProblemDetail build(HttpStatus status, String title, String errorType, String detail) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(status, detail);
        problem.setTitle(title);
        problem.setType(URI.create(ERROR_BASE_URI + errorType));
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }
}
