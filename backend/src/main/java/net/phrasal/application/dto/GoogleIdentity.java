package net.phrasal.application.dto;

/**
 * Who Google says signed in, taken from the verified ID token.
 *
 * @param subject       Google's stable account id (the {@code sub} claim), never logged
 * @param email         address from the {@code email} claim, as Google sent it, never logged
 * @param emailVerified true only when Google sent {@code email_verified=true}
 */
public record GoogleIdentity(String subject, String email, boolean emailVerified) {

    @Override
    public String toString() {
        return "GoogleIdentity[subject=*****, email=*****, emailVerified=" + emailVerified + "]";
    }
}
