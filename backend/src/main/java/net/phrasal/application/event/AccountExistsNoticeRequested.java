package net.phrasal.application.event;

/**
 * Published when someone registers an address that already has a verified account.
 *
 * @param userId owner of the existing account
 * @param email  recipient address
 */
public record AccountExistsNoticeRequested(Long userId, String email) {

    @Override
    public String toString() {
        return "AccountExistsNoticeRequested[userId=" + userId + "]";
    }
}
