package net.phrasal.infrastructure.exception;

import lombok.Getter;

@Getter
public class RateLimitExceededException extends RuntimeException {

    private final String ruleName;
    private final long retryAfterSeconds;

    public RateLimitExceededException(String ruleName, long retryAfterSeconds) {
        super("Too many requests. Try again in " + retryAfterSeconds + " seconds");
        this.ruleName = ruleName;
        this.retryAfterSeconds = retryAfterSeconds;
    }
}
