package net.phrasal.application.event;

/**
 * Published when 2FA was turned on or off. Handled after the transaction commits.
 *
 * @param userId  account whose 2FA changed
 * @param email   recipient address
 * @param enabled true when 2FA was turned on, false when it was turned off
 */
public record TwoFactorChangedNoticeRequested(Long userId, String email, boolean enabled) {

    @Override
    public String toString() {
        return "TwoFactorChangedNoticeRequested[userId=" + userId + ", enabled=" + enabled + "]";
    }
}
