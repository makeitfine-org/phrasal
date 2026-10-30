package net.phrasal.infrastructure.security;

import net.phrasal.domain.entity.Role;
import org.springframework.security.core.AuthenticatedPrincipal;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * Session principal: the only user data stored in the HTTP session. Never the JPA entity.
 *
 * @param id               database id of the user
 * @param email            normalized email, used as the username
 * @param role             granted role
 * @param twoFactorEnabled whether the account has 2FA on. A session holding this principal has passed every factor
 *                         the account requires: the second factor was checked at login, or 2FA was enabled from this
 *                         very session. Sessions serialized before this component existed read it as false.
 * @param passwordless     whether the account has no password and signs in only with Google. Sessions serialized
 *                         before this component existed read it as false, which is right for them: every older
 *                         account has a password.
 */
public record AuthenticatedUser(Long id, String email, Role role, boolean twoFactorEnabled, boolean passwordless)
        implements AuthenticatedPrincipal, Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private static final String ROLE_PREFIX = "ROLE_";

    /** Principal name used by Spring Session to index sessions per user. */
    @Override
    public String getName() {
        return email;
    }

    /**
     * Tells whether this account must enroll in 2FA before it may do admin work.
     *
     * @return true for an admin without 2FA
     */
    public boolean twoFactorEnrollmentRequired() {
        return role == Role.ADMIN && !twoFactorEnabled;
    }

    /**
     * Copies the principal with another 2FA state.
     *
     * @param enabled the new state
     * @return the updated principal
     */
    public AuthenticatedUser withTwoFactor(boolean enabled) {
        return new AuthenticatedUser(id, email, role, enabled, passwordless);
    }

    /**
     * Authorities of the session. An admin without a completed second factor only gets {@code ROLE_USER}, so
     * admin-only endpoints answer 403 until the account has 2FA on.
     *
     * @return the granted authorities
     */
    public List<GrantedAuthority> authorities() {
        Role effective = twoFactorEnrollmentRequired() ? Role.USER : role;
        return List.of(new SimpleGrantedAuthority(ROLE_PREFIX + effective.name()));
    }
}
