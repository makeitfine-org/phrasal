package net.phrasal.infrastructure.exception;

public class VerificationLinkInvalidException extends RuntimeException {

    public VerificationLinkInvalidException() {
        super("This verification link is invalid or has already been used");
    }
}
