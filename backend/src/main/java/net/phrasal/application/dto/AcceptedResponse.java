package net.phrasal.application.dto;

/**
 * Body of a {@code 202} that must not reveal whether an address has an account.
 *
 * @param message text shown to the user
 */
public record AcceptedResponse(String message) {

    public static final AcceptedResponse CHECK_INBOX =
            new AcceptedResponse("If this address can be used, we have sent a link to it. Check your inbox.");
}
