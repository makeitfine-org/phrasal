package net.phrasal.application.event;

/**
 * Published when a signed-in user asks to move the account to a new address. Handled after the transaction commits.
 *
 * @param userId   account that asked for the change
 * @param newEmail recipient address of the confirmation link
 * @param rawToken secret token; never logged
 */
public record EmailChangeConfirmationRequested(Long userId, String newEmail, String rawToken) {

    @Override
    public String toString() {
        return "EmailChangeConfirmationRequested[userId=" + userId + "]";
    }
}
