package net.phrasal.infrastructure.exception;

public class QuizProgressTooLargeException extends RuntimeException {

    public QuizProgressTooLargeException(int maxBytes) {
        super("Quiz progress must not exceed " + maxBytes + " bytes");
    }
}
