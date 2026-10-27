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
 * @param id    database id of the user
 * @param email normalized email, used as the username
 * @param role  granted role
 */
public record AuthenticatedUser(Long id, String email, Role role) implements AuthenticatedPrincipal, Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private static final String ROLE_PREFIX = "ROLE_";

    /** Principal name used by Spring Session to index sessions per user. */
    @Override
    public String getName() {
        return email;
    }

    public List<GrantedAuthority> authorities() {
        return List.of(new SimpleGrantedAuthority(ROLE_PREFIX + role.name()));
    }
}
