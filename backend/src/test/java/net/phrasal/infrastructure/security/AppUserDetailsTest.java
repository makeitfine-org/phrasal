package net.phrasal.infrastructure.security;

import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class AppUserDetailsTest {

    private static final String HASH = "{bcrypt}hash";

    @Test
    void accessors_exposeEmailHashAuthoritiesAndEnabled() {
        AppUserDetails details = new AppUserDetails(user(Role.ADMIN));

        assertThat(details.getUsername()).isEqualTo("a@b.com");
        assertThat(details.getPassword()).isEqualTo(HASH);
        assertThat(details.getAuthorities()).extracting("authority").containsExactly("ROLE_ADMIN");
        assertThat(details.isEnabled()).isTrue();
        assertThat(details.isAccountNonExpired()).isTrue();
        assertThat(details.isAccountNonLocked()).isTrue();
        assertThat(details.isCredentialsNonExpired()).isTrue();
    }

    @Test
    void toAuthenticatedUser_returnsRecordWithoutHash() {
        AuthenticatedUser principal = new AppUserDetails(user(Role.USER)).toAuthenticatedUser();

        assertThat(principal).isEqualTo(new AuthenticatedUser(7L, "a@b.com", Role.USER));
    }

    @Test
    void eraseCredentials_nullsPassword_keepsPrincipal() {
        AppUserDetails details = new AppUserDetails(user(Role.USER));

        details.eraseCredentials();

        assertThat(details.getPassword()).isNull();
        assertThat(details.getUsername()).isEqualTo("a@b.com");
    }

    private static User user(Role role) {
        User user = new User("a@b.com", HASH, role);
        user.setId(7L);
        return user;
    }
}
