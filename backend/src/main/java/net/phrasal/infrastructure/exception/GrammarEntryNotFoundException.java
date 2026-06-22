package net.phrasal.infrastructure.exception;

public class GrammarEntryNotFoundException extends RuntimeException {

    public GrammarEntryNotFoundException(Long id) {
        super("Grammar entry not found with id: " + id);
    }
}
