package net.phrasal.presentation.security;

import net.phrasal.application.dto.UserResponse;

/** Result of a password login: signed in, or waiting for the second factor. */
public sealed interface LoginOutcome {

    /**
     * The session is established.
     *
     * @param user the signed-in account
     */
    record Authenticated(UserResponse user) implements LoginOutcome {

    }

    /** The password was right, but the account has 2FA; no session is established yet. */
    record TwoFactorRequired() implements LoginOutcome {

    }
}
