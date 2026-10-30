package net.phrasal.infrastructure.exception;

/** The admin account can't change or delete itself, because its settings come from server configuration. */
public class AdminAccountManagedException extends RuntimeException {

    public AdminAccountManagedException() {
        super("The admin account is managed through server configuration");
    }
}
