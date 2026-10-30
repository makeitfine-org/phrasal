package net.phrasal.application.event;

/**
 * Published when an account moved to a new address. Handled after the transaction commits; the notice goes to the old
 * address.
 *
 * @param userId   account that changed address
 * @param oldEmail recipient address
 * @param newEmail address the account moved to
 */
public record EmailChangedNoticeRequested(Long userId, String oldEmail, String newEmail) {

    @Override
    public String toString() {
        return "EmailChangedNoticeRequested[userId=" + userId + "]";
    }
}
