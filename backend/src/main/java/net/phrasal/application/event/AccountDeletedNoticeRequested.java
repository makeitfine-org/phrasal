package net.phrasal.application.event;

/**
 * Published when an account was deleted. Handled after the transaction commits; the notice goes to the address the
 * account had.
 *
 * @param userId deleted account
 * @param email  recipient address
 */
public record AccountDeletedNoticeRequested(Long userId, String email) {

    @Override
    public String toString() {
        return "AccountDeletedNoticeRequested[userId=" + userId + "]";
    }
}
