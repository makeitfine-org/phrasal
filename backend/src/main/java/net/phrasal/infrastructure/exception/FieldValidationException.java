package net.phrasal.infrastructure.exception;

/** A field broke a rule that needs data Bean Validation doesn't have, such as the account email. */
public class FieldValidationException extends RuntimeException {

    private final String field;

    public FieldValidationException(String field, String message) {
        super(message);
        this.field = field;
    }

    /**
     * Names the request field the error belongs to, as the form knows it.
     *
     * @return the request field name, for example {@code newPassword}
     */
    public String field() {
        return field;
    }
}
