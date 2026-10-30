package net.phrasal.infrastructure.exception;

/** A password broke a rule that needs the account to be known, so Bean Validation could not catch it. */
public class PasswordPolicyViolationException extends FieldValidationException {

    private static final String DEFAULT_FIELD = "password";

    public PasswordPolicyViolationException(String message) {
        this(DEFAULT_FIELD, message);
    }

    public PasswordPolicyViolationException(String field, String message) {
        super(field, message);
    }
}
