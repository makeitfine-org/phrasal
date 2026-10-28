package net.phrasal.infrastructure.exception;

public class UnknownQuizKeyException extends RuntimeException {

    public UnknownQuizKeyException() {
        super("Unknown quiz key");
    }
}
