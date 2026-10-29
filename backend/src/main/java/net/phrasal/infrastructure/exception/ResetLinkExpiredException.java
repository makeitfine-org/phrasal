package net.phrasal.infrastructure.exception;

public class ResetLinkExpiredException extends RuntimeException {

    public ResetLinkExpiredException() {
        super("This password reset link has expired");
    }
}
