package net.phrasal.infrastructure.exception;

/** A password broke a rule that needs the account to be known, so Bean Validation could not catch it. */
public class PasswordPolicyViolationException extends RuntimeException {

    public PasswordPolicyViolationException(String message) {
        super(message);
    }
}
