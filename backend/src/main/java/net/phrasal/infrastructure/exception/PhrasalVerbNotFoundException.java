package net.phrasal.infrastructure.exception;

public class PhrasalVerbNotFoundException extends RuntimeException {

    public PhrasalVerbNotFoundException(Long id) {
        super("Phrasal verb not found with id: " + id);
    }
}
