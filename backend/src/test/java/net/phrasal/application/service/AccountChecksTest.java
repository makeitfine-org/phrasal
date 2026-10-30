package net.phrasal.application.service;

import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.infrastructure.exception.AdminAccountManagedException;
import net.phrasal.infrastructure.exception.WrongPasswordException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("AccountChecks")
class AccountChecksTest {

    private static final long USER_ID = 7L;
    private static final String PASSWORD = "correct-horse-battery";
    private static final String HASH = "{bcrypt}hash";

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AccountChecks accountChecks;

    private static User user(Role role) {
        return new User("user@example.com", HASH, role);
    }

    @Test
    @DisplayName("load returns the account")
    void loadFound() {
        User user = user(Role.USER);
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(user));

        assertThat(accountChecks.load(USER_ID)).isSameAs(user);
    }

    @Test
    @DisplayName("load of a deleted account means the session no longer has credentials")
    void loadMissing() {
        when(userRepository.findById(USER_ID)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> accountChecks.load(USER_ID))
                .isInstanceOf(AuthenticationCredentialsNotFoundException.class)
                .hasMessage("Account no longer exists");
    }

    @Test
    @DisplayName("a USER account manages itself")
    void selfManagedUser() {
        assertThatCode(() -> accountChecks.requireSelfManaged(user(Role.USER))).doesNotThrowAnyException();
    }

    @Test
    @DisplayName("the ADMIN account is managed by configuration")
    void selfManagedAdmin() {
        assertThatThrownBy(() -> accountChecks.requireSelfManaged(user(Role.ADMIN)))
                .isInstanceOf(AdminAccountManagedException.class)
                .hasMessage("The admin account is managed through server configuration");
    }

    @Test
    @DisplayName("the right password passes")
    void rightPassword() {
        when(passwordEncoder.matches(PASSWORD, HASH)).thenReturn(true);

        assertThatCode(() -> accountChecks.requirePassword(user(Role.USER), PASSWORD)).doesNotThrowAnyException();
    }

    @Test
    @DisplayName("a wrong password is rejected")
    void wrongPassword() {
        when(passwordEncoder.matches("nope", HASH)).thenReturn(false);

        assertThatThrownBy(() -> accountChecks.requirePassword(user(Role.USER), "nope"))
                .isInstanceOf(WrongPasswordException.class);
    }

    @Test
    @DisplayName("an account without a password hash never matches, and the encoder is not asked")
    void nullHash() {
        User user = user(Role.USER);
        user.setPasswordHash(null);

        assertThatThrownBy(() -> accountChecks.requirePassword(user, PASSWORD))
                .isInstanceOf(WrongPasswordException.class);
        verify(passwordEncoder, never()).matches(anyString(), anyString());
    }
}
