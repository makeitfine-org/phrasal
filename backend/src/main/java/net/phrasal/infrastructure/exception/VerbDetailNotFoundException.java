package net.phrasal.infrastructure.exception;

public class VerbDetailNotFoundException extends ResourceNotFoundException {

    public VerbDetailNotFoundException(Long id) {
        super("Verb Detail", "verb-detail-not-found", "Verb detail not found with id: " + id);
    }

    public VerbDetailNotFoundException(String verb) {
        super("Verb Detail", "verb-detail-not-found", "Verb detail not found: " + verb);
    }
}
