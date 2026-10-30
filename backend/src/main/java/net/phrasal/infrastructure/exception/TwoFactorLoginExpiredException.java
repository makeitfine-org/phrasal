package net.phrasal.infrastructure.exception;

public class TwoFactorLoginExpiredException extends RuntimeException {

    public TwoFactorLoginExpiredException() {
        super("Your sign-in timed out. Log in again.");
    }
}
