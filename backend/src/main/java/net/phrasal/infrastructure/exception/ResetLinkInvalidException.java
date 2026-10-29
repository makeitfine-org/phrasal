package net.phrasal.infrastructure.exception;

public class ResetLinkInvalidException extends RuntimeException {

    public ResetLinkInvalidException() {
        super("This password reset link is invalid or has already been used");
    }
}
