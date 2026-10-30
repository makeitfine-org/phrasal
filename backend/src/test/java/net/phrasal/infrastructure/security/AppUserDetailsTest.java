package net.phrasal.infrastructure.security;

import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

class AppUserDetailsTest {

    private static final String HASH = "{bcrypt}hash";

    @Test
    void accessors_exposeEmailHashAuthoritiesAndEnabled() {
        AppUserDetails details = new AppUserDetails(user(Role.ADMIN, true));

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
        AuthenticatedUser principal = new AppUserDetails(user(Role.USER, true)).toAuthenticatedUser();

        assertThat(principal).isEqualTo(new AuthenticatedUser(7L, "a@b.com", Role.USER, false));
    }

    @Test
    void toAuthenticatedUser_copiesTwoFactorFlag() {
        User user = user(Role.USER, true);
        user.startTwoFactorSetup("v1:secret");
        user.enableTwoFactor(LocalDateTime.of(2026, 2, 1, 0, 0), 5L);

        assertThat(new AppUserDetails(user).toAuthenticatedUser().twoFactorEnabled()).isTrue();
    }

    @Test
    void eraseCredentials_nullsPassword_keepsPrincipal() {
        AppUserDetails details = new AppUserDetails(user(Role.USER, true));

        details.eraseCredentials();

        assertThat(details.getPassword()).isNull();
        assertThat(details.getUsername()).isEqualTo("a@b.com");
    }

    @Test
    void isEnabled_followsEmailVerification() {
        assertThat(new AppUserDetails(user(Role.USER, true)).isEnabled()).isTrue();
        assertThat(new AppUserDetails(user(Role.USER, false)).isEnabled()).isFalse();
    }

    private static User user(Role role, boolean verified) {
        User user = new User("a@b.com", HASH, role);
        user.setId(7L);
        if (verified) {
            user.markEmailVerified(LocalDateTime.of(2026, 1, 1, 0, 0));
        }
        return user;
    }
}
