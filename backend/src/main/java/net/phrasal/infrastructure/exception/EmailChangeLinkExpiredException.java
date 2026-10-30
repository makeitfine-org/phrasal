package net.phrasal.infrastructure.exception;

public class EmailChangeLinkExpiredException extends RuntimeException {

    public EmailChangeLinkExpiredException() {
        super("This email change link has expired");
    }
}
