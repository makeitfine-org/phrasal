package net.phrasal.infrastructure.exception;

public class EmailChangeConflictException extends RuntimeException {

    public EmailChangeConflictException() {
        super("This address is already used by another account");
    }
}
