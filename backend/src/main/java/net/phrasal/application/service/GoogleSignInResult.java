package net.phrasal.application.service;

import net.phrasal.infrastructure.security.AuthenticatedUser;

import java.io.Serial;
import java.io.Serializable;

/**
 * The account a Google sign-in reached, and how.
 *
 * @param principal the account as the session will hold it
 * @param outcome   whether the account was found, linked or created
 */
public record GoogleSignInResult(AuthenticatedUser principal, Outcome outcome) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /** How the Google account reached the phrasal account. */
    public enum Outcome {

        /** Found by the Google subject. */
        SIGNED_IN,
        /** An existing account with the same verified email, now linked. */
        LINKED,
        /** A new account, created for this Google account. */
        CREATED
    }
}
