package net.phrasal.application.event;

/**
 * Published when a password was changed, through a reset link or the account page. Handled after the transaction
 * commits.
 *
 * @param userId account whose password changed
 * @param email  recipient address
 */
public record PasswordChangedNoticeRequested(Long userId, String email) {

    @Override
    public String toString() {
        return "PasswordChangedNoticeRequested[userId=" + userId + "]";
    }
}
