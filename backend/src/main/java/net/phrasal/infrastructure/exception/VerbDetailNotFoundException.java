package net.phrasal.infrastructure.exception;

public class VerbDetailNotFoundException extends RuntimeException {

    public VerbDetailNotFoundException(Long id) {
        super("Verb detail not found with id: " + id);
    }

    public VerbDetailNotFoundException(String verb) {
        super("Verb detail not found: " + verb);
    }
}
