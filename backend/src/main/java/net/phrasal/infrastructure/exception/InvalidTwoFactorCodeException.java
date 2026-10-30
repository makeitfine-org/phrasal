package net.phrasal.infrastructure.exception;

public class InvalidTwoFactorCodeException extends RuntimeException {

    public InvalidTwoFactorCodeException() {
        super("Invalid or already used code");
    }
}
