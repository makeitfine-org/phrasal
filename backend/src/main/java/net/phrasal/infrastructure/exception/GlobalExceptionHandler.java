package net.phrasal.infrastructure.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    private ProblemDetail buildProblem(HttpStatus status, String title, String errorType, String detail) {
        return ProblemDetailFactory.build(status, title, errorType, detail);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleResourceNotFound(ResourceNotFoundException ex) {
        log.warn("{} not found: {}", ex.getResourceName(), ex.getMessage());
        return buildProblem(HttpStatus.NOT_FOUND, ex.getResourceName() + " Not Found",
                ex.getErrorType(), ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return buildValidationProblem(errors);
    }

    @ExceptionHandler(PasswordPolicyViolationException.class)
    public ProblemDetail handlePasswordPolicyViolation(PasswordPolicyViolationException ex) {
        log.warn("Password rejected: policy violation");
        return buildValidationProblem(Map.of("password", ex.getMessage()));
    }

    private ProblemDetail buildValidationProblem(Map<String, String> errors) {
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

    @ExceptionHandler(DisabledException.class)
    public ProblemDetail handleEmailNotVerified(DisabledException ex) {
        log.warn("Login rejected: email not verified");
        return buildProblem(HttpStatus.FORBIDDEN, "Email Not Verified", "email-not-verified",
                "Please confirm your email address before logging in");
    }

    @ExceptionHandler(AuthenticationException.class)
    public ProblemDetail handleAuthentication(AuthenticationException ex) {
        log.warn("Authentication failed: {}", ex.getClass().getSimpleName());
        String detail = ex instanceof BadCredentialsException
                ? "Invalid email or password" : "Authentication is required";
        return buildProblem(HttpStatus.UNAUTHORIZED, "Unauthorized", "unauthorized", detail);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ProblemDetail handleAccessDenied(AccessDeniedException ex) {
        log.warn("Access denied: {}", ex.getClass().getSimpleName());
        return buildProblem(HttpStatus.FORBIDDEN, "Forbidden", "forbidden",
                "You do not have permission to perform this action");
    }

    @ExceptionHandler(VerificationLinkInvalidException.class)
    public ProblemDetail handleVerificationLinkInvalid(VerificationLinkInvalidException ex) {
        log.warn("Verification rejected: link invalid");
        return buildProblem(HttpStatus.BAD_REQUEST, "Verification Link Invalid",
                "verification-link-invalid", ex.getMessage());
    }

    @ExceptionHandler(VerificationLinkExpiredException.class)
    public ProblemDetail handleVerificationLinkExpired(VerificationLinkExpiredException ex) {
        log.warn("Verification rejected: link expired");
        return buildProblem(HttpStatus.BAD_REQUEST, "Verification Link Expired",
                "verification-link-expired", ex.getMessage());
    }

    @ExceptionHandler(ResetLinkInvalidException.class)
    public ProblemDetail handleResetLinkInvalid(ResetLinkInvalidException ex) {
        log.warn("Password reset rejected: link invalid");
        return buildProblem(HttpStatus.BAD_REQUEST, "Reset Link Invalid",
                "reset-link-invalid", ex.getMessage());
    }

    @ExceptionHandler(ResetLinkExpiredException.class)
    public ProblemDetail handleResetLinkExpired(ResetLinkExpiredException ex) {
        log.warn("Password reset rejected: link expired");
        return buildProblem(HttpStatus.BAD_REQUEST, "Reset Link Expired",
                "reset-link-expired", ex.getMessage());
    }

    @ExceptionHandler(InvalidTwoFactorCodeException.class)
    public ProblemDetail handleInvalidTwoFactorCode(InvalidTwoFactorCodeException ex) {
        log.warn("Two-factor code rejected");
        ProblemDetail problem = buildProblem(HttpStatus.BAD_REQUEST, "Invalid Code",
                "invalid-two-factor-code", ex.getMessage());
        problem.setProperty("errors", Map.of("code", ex.getMessage()));
        return problem;
    }

    @ExceptionHandler(WrongPasswordException.class)
    public ProblemDetail handleWrongPassword(WrongPasswordException ex) {
        log.warn("Password confirmation rejected");
        ProblemDetail problem = buildProblem(HttpStatus.BAD_REQUEST, "Wrong Password",
                "wrong-password", ex.getMessage());
        problem.setProperty("errors", Map.of("password", ex.getMessage()));
        return problem;
    }

    @ExceptionHandler(TwoFactorStateException.class)
    public ProblemDetail handleTwoFactorState(TwoFactorStateException ex) {
        log.warn("Two-factor request rejected: {}", ex.getReason());
        return buildProblem(HttpStatus.CONFLICT, "Conflict", ex.getReason().getErrorType(), ex.getMessage());
    }

    @ExceptionHandler(TwoFactorLoginExpiredException.class)
    public ProblemDetail handleTwoFactorLoginExpired(TwoFactorLoginExpiredException ex) {
        log.warn("Two-factor login rejected: no pending login");
        return buildProblem(HttpStatus.UNAUTHORIZED, "Unauthorized", "two-factor-login-expired", ex.getMessage());
    }

    @ExceptionHandler(RateLimitExceededException.class)
    public ResponseEntity<ProblemDetail> handleRateLimited(RateLimitExceededException ex) {
        log.warn("Rate limit exceeded: rule={}", ex.getRuleName());
        ProblemDetail problem = buildProblem(HttpStatus.TOO_MANY_REQUESTS, "Too Many Requests",
                "rate-limited", ex.getMessage());
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                .header(HttpHeaders.RETRY_AFTER, String.valueOf(ex.getRetryAfterSeconds()))
                .body(problem);
    }

    @ExceptionHandler(UnknownQuizKeyException.class)
    public ProblemDetail handleUnknownQuizKey(UnknownQuizKeyException ex) {
        log.warn("Quiz progress rejected: unknown quiz key");
        return buildProblem(HttpStatus.BAD_REQUEST, "Unknown Quiz Key",
                "unknown-quiz-key", ex.getMessage());
    }

    @ExceptionHandler(QuizProgressTooLargeException.class)
    public ProblemDetail handleQuizProgressTooLarge(QuizProgressTooLargeException ex) {
        log.warn("Quiz progress rejected: state too large");
        return buildProblem(HttpStatus.BAD_REQUEST, "Quiz Progress Too Large",
                "quiz-progress-too-large", ex.getMessage());
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ProblemDetail handleMessageNotReadable(HttpMessageNotReadableException ex) {
        log.warn("Request body rejected: {}", ex.getClass().getSimpleName());
        return buildProblem(HttpStatus.BAD_REQUEST, "Malformed Request",
                "malformed-request", "Request body is missing or is not valid JSON");
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGlobal(Exception ex) {
        log.error("Unexpected error", ex);
        return buildProblem(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error",
                "internal-error", "An unexpected error occurred");
    }
}
