package net.phrasal.application.dto;

/**
 * Sign-in methods offered besides email and password, so the SPA shows only the buttons that work.
 *
 * @param google whether "Continue with Google" is available
 */
public record AuthProvidersResponse(boolean google) {

}
