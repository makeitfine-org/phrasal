package net.phrasal.application.event;

/**
 * Published when a verification link has to be emailed. Handled after the transaction commits.
 *
 * @param userId   account that must verify its address
 * @param email    recipient address
 * @param rawToken secret part of the link; never logged
 */
public record VerificationEmailRequested(Long userId, String email, String rawToken) {

    @Override
    public String toString() {
        return "VerificationEmailRequested[userId=" + userId + "]";
    }
}
