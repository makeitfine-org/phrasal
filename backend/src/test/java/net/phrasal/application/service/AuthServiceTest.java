package net.phrasal.application.service;

import net.phrasal.application.dto.RegisterRequest;
import net.phrasal.application.event.AccountExistsNoticeRequested;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.support.TransactionOperations;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("AuthService")
class AuthServiceTest {

    private static final String PASSWORD = "correct horse battery";
    private static final String HASH = "{bcrypt}encoded";
    private static final String OLD_HASH = "{bcrypt}old";

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private EmailVerificationService emailVerificationService;

    @Mock
    private ApplicationEventPublisher eventPublisher;

    private AuthService service() {
        return new AuthService(userRepository, passwordEncoder, emailVerificationService, eventPublisher,
                TransactionOperations.withoutTransaction());
    }

    private static User existing(boolean verified) {
        User user = new User("a@b.com", OLD_HASH, Role.USER);
        user.setId(5L);
        if (verified) {
            user.markEmailVerified(LocalDateTime.of(2026, 1, 1, 0, 0));
        }
        return user;
    }

    @Test
    @DisplayName("new address is stored unverified as USER and gets a link")
    void registerNew() {
        when(userRepository.findByEmail("a@b.com")).thenReturn(Optional.empty());
        when(passwordEncoder.encode(PASSWORD)).thenReturn(HASH);
        when(userRepository.saveAndFlush(any(User.class))).thenAnswer(inv -> {
            User saved = inv.getArgument(0);
            saved.setId(9L);
            return saved;
        });

        service().register(new RegisterRequest("  A@B.com ", PASSWORD));

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).saveAndFlush(captor.capture());
        User saved = captor.getValue();
        assertThat(saved.getEmail()).isEqualTo("a@b.com");
        assertThat(saved.getRole()).isEqualTo(Role.USER);
        assertThat(saved.getPasswordHash()).isEqualTo(HASH);
        assertThat(saved.isEmailVerified()).isFalse();
        verify(emailVerificationService).issueFor(saved);
        verify(passwordEncoder, times(1)).encode(PASSWORD);
    }

    @Test
    @DisplayName("unverified address gets the new password and a fresh link, no new user")
    void registerPending() {
        User user = existing(false);
        when(userRepository.findByEmail("a@b.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.encode(PASSWORD)).thenReturn(HASH);

        service().register(new RegisterRequest("a@b.com", PASSWORD));

        assertThat(user.getPasswordHash()).isEqualTo(HASH);
        verify(emailVerificationService).issueFor(user);
        verify(userRepository, never()).saveAndFlush(any());
        verify(passwordEncoder, times(1)).encode(PASSWORD);
    }

    @Test
    @DisplayName("verified address keeps its password, gets no token and a notice event")
    void registerExisting() {
        User user = existing(true);
        when(userRepository.findByEmail("a@b.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.encode(PASSWORD)).thenReturn(HASH);

        service().register(new RegisterRequest("a@b.com", PASSWORD));

        assertThat(user.getPasswordHash()).isEqualTo(OLD_HASH);
        verify(emailVerificationService, never()).issueFor(any());
        verify(eventPublisher).publishEvent(new AccountExistsNoticeRequested(5L, "a@b.com"));
        verify(userRepository, never()).saveAndFlush(any());
        verify(passwordEncoder, times(1)).encode(PASSWORD);
    }

    @Test
    @DisplayName("a lost insert race falls back to the existing-account branch without an error")
    void registerRace() {
        User winner = existing(true);
        when(userRepository.findByEmail("a@b.com")).thenReturn(Optional.empty(), Optional.of(winner));
        when(passwordEncoder.encode(PASSWORD)).thenReturn(HASH);
        when(userRepository.saveAndFlush(any(User.class))).thenThrow(new DataIntegrityViolationException("dup"));

        service().register(new RegisterRequest("a@b.com", PASSWORD));

        verify(eventPublisher).publishEvent(new AccountExistsNoticeRequested(5L, "a@b.com"));
        verify(emailVerificationService, never()).issueFor(any());
    }
}
