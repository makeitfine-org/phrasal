package net.phrasal.infrastructure.exception;

public class VerificationLinkExpiredException extends RuntimeException {

    public VerificationLinkExpiredException() {
        super("This verification link has expired");
    }
}
