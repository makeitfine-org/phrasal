package net.phrasal.application.service;

import net.phrasal.application.event.PasswordChangedNoticeRequested;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.infrastructure.exception.AdminAccountManagedException;
import net.phrasal.infrastructure.exception.PasswordPolicyViolationException;
import net.phrasal.infrastructure.exception.WrongPasswordException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("AccountService")
class AccountServiceTest {

    private static final long USER_ID = 7L;
    private static final String EMAIL = "user@example.com";
    private static final String CURRENT = "current-password-1";
    private static final String NEW = "brand-new-password-2";
    private static final String OLD_HASH = "{bcrypt}old";
    private static final String NEW_HASH = "{bcrypt}new";

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private ApplicationEventPublisher eventPublisher;

    private AccountService accountService;

    @BeforeEach
    void setUp() {
        accountService = new AccountService(new AccountChecks(userRepository, passwordEncoder), passwordEncoder,
                eventPublisher);
    }

    private User givenUser(Role role) {
        User user = new User(EMAIL, OLD_HASH, role);
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(user));
        return user;
    }

    @Test
    @DisplayName("changePassword stores the new hash and publishes the notice")
    void changePasswordSuccess() {
        User user = givenUser(Role.USER);
        when(passwordEncoder.matches(CURRENT, OLD_HASH)).thenReturn(true);
        when(passwordEncoder.matches(NEW, OLD_HASH)).thenReturn(false);
        when(passwordEncoder.encode(NEW)).thenReturn(NEW_HASH);

        accountService.changePassword(USER_ID, CURRENT, NEW);

        assertThat(user.getPasswordHash()).isEqualTo(NEW_HASH);
        verify(eventPublisher).publishEvent(new PasswordChangedNoticeRequested(user.getId(), EMAIL));
    }

    @Test
    @DisplayName("changePassword with a wrong current password changes nothing")
    void changePasswordWrongCurrent() {
        User user = givenUser(Role.USER);
        when(passwordEncoder.matches(CURRENT, OLD_HASH)).thenReturn(false);

        assertThatThrownBy(() -> accountService.changePassword(USER_ID, CURRENT, NEW))
                .isInstanceOf(WrongPasswordException.class);

        assertThat(user.getPasswordHash()).isEqualTo(OLD_HASH);
        verify(passwordEncoder, never()).encode(anyString());
        verify(eventPublisher, never()).publishEvent(any(Object.class));
    }

    @Test
    @DisplayName("changePassword refuses an admin before touching the encoder")
    void changePasswordAdmin() {
        givenUser(Role.ADMIN);

        assertThatThrownBy(() -> accountService.changePassword(USER_ID, CURRENT, NEW))
                .isInstanceOf(AdminAccountManagedException.class);

        verify(passwordEncoder, never()).matches(anyString(), anyString());
        verify(passwordEncoder, never()).encode(anyString());
        verify(eventPublisher, never()).publishEvent(any(Object.class));
    }

    @Test
    @DisplayName("changePassword rejects a new password that contains the email, on the newPassword field")
    void changePasswordContainsEmail() {
        givenUser(Role.USER);
        when(passwordEncoder.matches(CURRENT, OLD_HASH)).thenReturn(true);

        assertThatThrownBy(() -> accountService.changePassword(USER_ID, CURRENT, "xx" + EMAIL + "xx"))
                .isInstanceOfSatisfying(PasswordPolicyViolationException.class,
                        ex -> assertThat(ex.field()).isEqualTo("newPassword"));

        verify(passwordEncoder, never()).encode(anyString());
        verify(eventPublisher, never()).publishEvent(any(Object.class));
    }

    @Test
    @DisplayName("changePassword rejects a new password equal to the current one")
    void changePasswordSameAsCurrent() {
        givenUser(Role.USER);
        when(passwordEncoder.matches(CURRENT, OLD_HASH)).thenReturn(true);

        assertThatThrownBy(() -> accountService.changePassword(USER_ID, CURRENT, CURRENT))
                .isInstanceOfSatisfying(PasswordPolicyViolationException.class, ex -> {
                    assertThat(ex.field()).isEqualTo("newPassword");
                    assertThat(ex.getMessage()).contains("different");
                });

        verify(passwordEncoder, never()).encode(anyString());
        verify(eventPublisher, never()).publishEvent(any(Object.class));
    }

    @Test
    @DisplayName("changePassword of a deleted account means the session has no credentials")
    void changePasswordMissingUser() {
        when(userRepository.findById(USER_ID)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> accountService.changePassword(USER_ID, CURRENT, NEW))
                .isInstanceOf(AuthenticationCredentialsNotFoundException.class);

        verify(eventPublisher, never()).publishEvent(any(Object.class));
    }
}
