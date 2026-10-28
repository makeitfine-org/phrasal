package net.phrasal.infrastructure.exception;

public class QuizProgressNotFoundException extends ResourceNotFoundException {

    public QuizProgressNotFoundException() {
        super("Quiz Progress", "quiz-progress-not-found", "No saved progress for this quiz");
    }
}
