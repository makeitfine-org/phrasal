package net.phrasal.application.service;

import net.phrasal.application.event.AccountDeletedNoticeRequested;
import net.phrasal.application.event.PasswordChangedNoticeRequested;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.infrastructure.exception.AdminAccountManagedException;
import net.phrasal.infrastructure.exception.InvalidTwoFactorCodeException;
import net.phrasal.infrastructure.exception.PasswordPolicyViolationException;
import net.phrasal.infrastructure.exception.WrongPasswordException;
import net.phrasal.infrastructure.security.BreachedPasswordChecker;
import net.phrasal.infrastructure.security.SessionRevoker;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InOrder;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.inOrder;
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
    @Mock
    private TwoFactorService twoFactorService;
    @Mock
    private SessionRevoker sessionRevoker;
    @Mock
    private BreachedPasswordChecker breachedPasswordChecker;

    private AccountService accountService;

    @BeforeEach
    void setUp() {
        accountService = new AccountService(new AccountChecks(userRepository, passwordEncoder), userRepository,
                twoFactorService, sessionRevoker, passwordEncoder, new PasswordBreachGuard(breachedPasswordChecker), eventPublisher);
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
    @DisplayName("changePassword rejects a breached new password on the newPassword field")
    void changePasswordBreached() {
        User user = givenUser(Role.USER);
        when(passwordEncoder.matches(CURRENT, OLD_HASH)).thenReturn(true);
        when(passwordEncoder.matches(NEW, OLD_HASH)).thenReturn(false);
        when(breachedPasswordChecker.isBreached(NEW)).thenReturn(true);

        assertThatThrownBy(() -> accountService.changePassword(USER_ID, CURRENT, NEW))
                .isInstanceOfSatisfying(PasswordPolicyViolationException.class, ex -> {
                    assertThat(ex.field()).isEqualTo("newPassword");
                    assertThat(ex.getMessage()).contains("data breach");
                });

        assertThat(user.getPasswordHash()).isEqualTo(OLD_HASH);
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

    private User givenTwoFactorUser() {
        User user = givenUser(Role.USER);
        user.startTwoFactorSetup("enc");
        user.enableTwoFactor(LocalDateTime.now(), 1L);
        return user;
    }

    @Test
    @DisplayName("deleteAccount without 2FA notifies, deletes and closes every session, in that order")
    void deleteAccountSuccess() {
        givenUser(Role.USER);
        when(passwordEncoder.matches(CURRENT, OLD_HASH)).thenReturn(true);
        when(sessionRevoker.revokeAll(EMAIL)).thenReturn(2);

        accountService.deleteAccount(USER_ID, CURRENT, null);

        InOrder order = inOrder(eventPublisher, userRepository, sessionRevoker);
        order.verify(eventPublisher).publishEvent(new AccountDeletedNoticeRequested(USER_ID, EMAIL));
        order.verify(userRepository).deleteById(USER_ID);
        order.verify(userRepository).flush();
        order.verify(sessionRevoker).revokeAll(EMAIL);
        verify(twoFactorService, never()).verifyCode(any(), any());
    }

    @Test
    @DisplayName("deleteAccount with 2FA checks the code")
    void deleteAccountWithTwoFactor() {
        givenTwoFactorUser();
        when(passwordEncoder.matches(CURRENT, OLD_HASH)).thenReturn(true);

        accountService.deleteAccount(USER_ID, CURRENT, "123456");

        verify(twoFactorService).verifyCode(USER_ID, "123456");
        verify(userRepository).deleteById(USER_ID);
        verify(sessionRevoker).revokeAll(EMAIL);
    }

    @Test
    @DisplayName("deleteAccount with 2FA on and no code deletes nothing")
    void deleteAccountMissingCode() {
        givenTwoFactorUser();
        when(passwordEncoder.matches(CURRENT, OLD_HASH)).thenReturn(true);

        assertThatThrownBy(() -> accountService.deleteAccount(USER_ID, CURRENT, " "))
                .isInstanceOf(InvalidTwoFactorCodeException.class);
        assertThatThrownBy(() -> accountService.deleteAccount(USER_ID, CURRENT, null))
                .isInstanceOf(InvalidTwoFactorCodeException.class);

        verify(userRepository, never()).deleteById(any());
        verify(sessionRevoker, never()).revokeAll(anyString());
        verify(eventPublisher, never()).publishEvent(any(Object.class));
    }

    @Test
    @DisplayName("deleteAccount with a wrong code lets the exception through and deletes nothing")
    void deleteAccountWrongCode() {
        givenTwoFactorUser();
        when(passwordEncoder.matches(CURRENT, OLD_HASH)).thenReturn(true);
        when(twoFactorService.verifyCode(USER_ID, "000000")).thenThrow(new InvalidTwoFactorCodeException());

        assertThatThrownBy(() -> accountService.deleteAccount(USER_ID, CURRENT, "000000"))
                .isInstanceOf(InvalidTwoFactorCodeException.class);

        verify(userRepository, never()).deleteById(any());
        verify(sessionRevoker, never()).revokeAll(anyString());
        verify(eventPublisher, never()).publishEvent(any(Object.class));
    }

    @Test
    @DisplayName("deleteAccount with a wrong password never reaches the code check")
    void deleteAccountWrongPassword() {
        givenTwoFactorUser();
        when(passwordEncoder.matches(CURRENT, OLD_HASH)).thenReturn(false);

        assertThatThrownBy(() -> accountService.deleteAccount(USER_ID, CURRENT, "123456"))
                .isInstanceOf(WrongPasswordException.class);

        verify(twoFactorService, never()).verifyCode(any(), any());
        verify(userRepository, never()).deleteById(any());
    }

    @Test
    @DisplayName("deleteAccount refuses an admin")
    void deleteAccountAdmin() {
        givenUser(Role.ADMIN);

        assertThatThrownBy(() -> accountService.deleteAccount(USER_ID, CURRENT, null))
                .isInstanceOf(AdminAccountManagedException.class);

        verify(userRepository, never()).deleteById(any());
        verify(sessionRevoker, never()).revokeAll(anyString());
    }

    @Test
    @DisplayName("deleteAccount of an already deleted account means the session has no credentials")
    void deleteAccountMissingUser() {
        when(userRepository.findById(USER_ID)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> accountService.deleteAccount(USER_ID, CURRENT, null))
                .isInstanceOf(AuthenticationCredentialsNotFoundException.class);

        verify(userRepository, never()).deleteById(any());
    }
}
