package net.phrasal.infrastructure.exception;

public class WrongPasswordException extends RuntimeException {

    public WrongPasswordException() {
        super("Current password is incorrect");
    }
}
