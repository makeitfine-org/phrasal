package net.phrasal.infrastructure.exception;

/**
 * A Google sign-in that proved who the user is, but may not reach an account. It never becomes a problem+json body:
 * the sign-in ends in a redirect to the login page with {@link Reason#code()} as the error.
 */
public class GoogleSignInRefusedException extends RuntimeException {

    private final Reason reason;

    public GoogleSignInRefusedException(Reason reason) {
        super(reason.detail);
        this.reason = reason;
    }

    public Reason getReason() {
        return reason;
    }

    /** Why the sign-in was refused, with the error code the login page understands. */
    public enum Reason {

        EMAIL_UNVERIFIED("google-email-unverified", "Google has not verified this email address"),
        ACCOUNT_CONFLICT("google-account-conflict", "The account is linked to another Google account"),
        ADMIN_ACCOUNT("google-admin-account", "The admin account can't sign in with Google");

        private final String code;
        private final String detail;

        Reason(String code, String detail) {
            this.code = code;
            this.detail = detail;
        }

        public String code() {
            return code;
        }
    }
}
