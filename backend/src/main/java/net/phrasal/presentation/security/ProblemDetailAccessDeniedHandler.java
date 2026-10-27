package net.phrasal.presentation.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import net.phrasal.infrastructure.exception.ProblemDetailFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.csrf.CsrfException;
import org.springframework.stereotype.Component;

import java.io.IOException;

/** Answers authenticated-but-forbidden and bad-CSRF requests with a 403 problem+json body. */
@Component
@RequiredArgsConstructor
public class ProblemDetailAccessDeniedHandler implements AccessDeniedHandler {

    private final ProblemDetailWriter writer;

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException {
        ProblemDetail problem = accessDeniedException instanceof CsrfException
                ? ProblemDetailFactory.build(HttpStatus.FORBIDDEN, "Forbidden", "csrf",
                        "Invalid or missing CSRF token")
                : ProblemDetailFactory.build(HttpStatus.FORBIDDEN, "Forbidden", "forbidden",
                        "You do not have permission to perform this action");
        writer.write(response, problem);
    }
}
