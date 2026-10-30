package net.phrasal.infrastructure.exception;

/** The requested 2FA operation does not fit the account's current 2FA state. */
public class TwoFactorStateException extends RuntimeException {

    private final Reason reason;

    public TwoFactorStateException(Reason reason) {
        super(reason.detail);
        this.reason = reason;
    }

    public Reason getReason() {
        return reason;
    }

    /** The state conflict, with the problem type and message it produces. */
    public enum Reason {

        ALREADY_ENABLED("two-factor-already-enabled", "Two-factor authentication is already enabled"),
        SETUP_NOT_STARTED("two-factor-setup-not-started", "Two-factor setup has not been started"),
        NOT_ENABLED("two-factor-not-enabled", "Two-factor authentication is not enabled");

        private final String errorType;
        private final String detail;

        Reason(String errorType, String detail) {
            this.errorType = errorType;
            this.detail = detail;
        }

        public String getErrorType() {
            return errorType;
        }
    }
}
