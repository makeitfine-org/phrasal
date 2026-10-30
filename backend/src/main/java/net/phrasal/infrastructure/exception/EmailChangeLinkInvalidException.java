package net.phrasal.infrastructure.exception;

public class EmailChangeLinkInvalidException extends RuntimeException {

    public EmailChangeLinkInvalidException() {
        super("This email change link is invalid or was already used");
    }
}
