package net.phrasal.config;

import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import net.phrasal.infrastructure.security.AppUserDetails;
import net.phrasal.infrastructure.security.JpaUserDetailsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@DisplayName("SecurityConfig authentication manager")
class SecurityConfigAuthenticationTest {

    private static final String EMAIL = "a@b.com";
    private static final String PASSWORD = "correct horse battery";

    private final JpaUserDetailsService userDetailsService = mock(JpaUserDetailsService.class);
    private final PasswordEncoder passwordEncoder = new SecurityConfig(null, null).passwordEncoder();
    private AuthenticationManager manager;

    @BeforeEach
    void setUp() {
        manager = new SecurityConfig(null, null).authenticationManager(userDetailsService, passwordEncoder);
    }

    private void stubUser(boolean verified) {
        User user = new User(EMAIL, passwordEncoder.encode(PASSWORD), Role.USER);
        user.setId(1L);
        if (verified) {
            user.markEmailVerified(LocalDateTime.of(2026, 1, 1, 0, 0));
        }
        when(userDetailsService.loadUserByUsername(EMAIL)).thenReturn(new AppUserDetails(user));
    }

    private Authentication token(String password) {
        return UsernamePasswordAuthenticationToken.unauthenticated(EMAIL, password);
    }

    @Test
    @DisplayName("unverified account with a wrong password gets BadCredentials, not Disabled")
    void unverifiedWrongPassword() {
        stubUser(false);

        assertThatThrownBy(() -> manager.authenticate(token("wrong password!")))
                .isInstanceOf(BadCredentialsException.class);
    }

    @Test
    @DisplayName("unverified account with the correct password gets Disabled")
    void unverifiedCorrectPassword() {
        stubUser(false);

        assertThatThrownBy(() -> manager.authenticate(token(PASSWORD))).isInstanceOf(DisabledException.class);
    }

    @Test
    @DisplayName("verified account with the correct password is authenticated")
    void verifiedCorrectPassword() {
        stubUser(true);

        assertThat(manager.authenticate(token(PASSWORD)).isAuthenticated()).isTrue();
    }
}
