package net.phrasal.infrastructure.security;

import net.phrasal.domain.entity.User;
import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

/**
 * {@link UserDetails} for password login. Holds the session principal plus the password hash.
 */
public class AppUserDetails implements UserDetails, CredentialsContainer {

    private final AuthenticatedUser principal;
    private String passwordHash;

    public AppUserDetails(User user) {
        this.principal = new AuthenticatedUser(user.getId(), user.getEmail(), user.getRole());
        this.passwordHash = user.getPasswordHash();
    }

    public AuthenticatedUser toAuthenticatedUser() {
        return principal;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return principal.authorities();
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return principal.email();
    }

    @Override
    public boolean isEnabled() {
        // Email confirmation is deferred, so every stored account is enabled.
        return true;
    }

    @Override
    public void eraseCredentials() {
        this.passwordHash = null;
    }
}
