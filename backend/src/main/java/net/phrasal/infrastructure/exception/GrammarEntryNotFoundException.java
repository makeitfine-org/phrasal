package net.phrasal.infrastructure.exception;

public class GrammarEntryNotFoundException extends ResourceNotFoundException {

    public GrammarEntryNotFoundException(Long id) {
        super("Grammar Entry", "grammar-entry-not-found", "Grammar entry not found with id: " + id);
    }
}
