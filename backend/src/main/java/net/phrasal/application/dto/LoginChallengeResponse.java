package net.phrasal.application.dto;

/**
 * Answer to a password login that still needs the second factor.
 *
 * @param twoFactorRequired always true
 */
public record LoginChallengeResponse(boolean twoFactorRequired) {

    /** The only value the API sends. */
    public static final LoginChallengeResponse REQUIRED = new LoginChallengeResponse(true);
}
