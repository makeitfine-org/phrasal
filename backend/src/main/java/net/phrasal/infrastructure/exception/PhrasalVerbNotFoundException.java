package net.phrasal.infrastructure.exception;

public class PhrasalVerbNotFoundException extends ResourceNotFoundException {

    public PhrasalVerbNotFoundException(Long id) {
        super("Phrasal Verb", "phrasal-verb-not-found", "Phrasal verb not found with id: " + id);
    }
}
