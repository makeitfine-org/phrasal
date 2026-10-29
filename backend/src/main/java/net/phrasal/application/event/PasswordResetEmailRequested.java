package net.phrasal.application.event;

/**
 * Published when a password reset link has to be emailed. Handled after the transaction commits.
 *
 * @param userId   account whose password may be reset
 * @param email    recipient address
 * @param rawToken secret part of the link; never logged
 */
public record PasswordResetEmailRequested(Long userId, String email, String rawToken) {

    @Override
    public String toString() {
        return "PasswordResetEmailRequested[userId=" + userId + "]";
    }
}
