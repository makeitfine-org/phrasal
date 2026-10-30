package net.phrasal.application.dto;

import net.phrasal.infrastructure.security.AuthenticatedUser;

/**
 * Public view of an account, returned by register, login and me.
 *
 * @param id                           user id
 * @param email                        normalized email
 * @param role                         role name, e.g. {@code USER} or {@code ADMIN}
 * @param twoFactorEnabled             whether the account has 2FA on
 * @param twoFactorEnrollmentRequired  whether the account must enroll in 2FA before admin work
 * @param hasPassword                  whether the account has a password; false for an account that signs in only
 *                                     with Google until it sets one through the reset-by-email flow
 */
public record UserResponse(Long id, String email, String role, boolean twoFactorEnabled,
                           boolean twoFactorEnrollmentRequired, boolean hasPassword) {

    /**
     * Builds the response for a session principal.
     *
     * @param user the principal
     * @return the public view
     */
    public static UserResponse from(AuthenticatedUser user) {
        return new UserResponse(user.id(), user.email(), user.role().name(), user.twoFactorEnabled(),
                user.twoFactorEnrollmentRequired(), !user.passwordless());
    }
}
