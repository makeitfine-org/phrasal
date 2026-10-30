package net.phrasal.application.service;

import net.phrasal.application.event.AccountExistsNoticeRequested;
import net.phrasal.application.event.EmailChangeConfirmationRequested;
import net.phrasal.application.event.EmailChangedNoticeRequested;
import net.phrasal.config.EmailChangeProperties;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.TokenType;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.entity.UserToken;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.domain.repository.UserTokenRepository;
import net.phrasal.infrastructure.exception.AdminAccountManagedException;
import net.phrasal.infrastructure.exception.EmailChangeConflictException;
import net.phrasal.infrastructure.exception.EmailChangeLinkExpiredException;
import net.phrasal.infrastructure.exception.EmailChangeLinkInvalidException;
import net.phrasal.infrastructure.exception.FieldValidationException;
import net.phrasal.infrastructure.exception.WrongPasswordException;
import net.phrasal.infrastructure.security.SecureTokenGenerator;
import net.phrasal.infrastructure.security.SessionRevoker;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("EmailChangeService")
class EmailChangeServiceTest {

    private static final Instant INSTANT = Instant.parse("2026-01-10T12:00:00Z");
    private static final LocalDateTime NOW = LocalDateTime.ofInstant(INSTANT, ZoneOffset.UTC);
    private static final Duration TTL = Duration.ofHours(1);
    private static final long USER_ID = 7L;
    private static final String OLD_EMAIL = "old@example.com";
    private static final String NEW_EMAIL = "new@example.com";
    private static final String PASSWORD = "current-password-1";
    private static final String HASH = "{bcrypt}hash";
    private static final String RAW = "raw-token";

    @Mock
    private UserRepository userRepository;
    @Mock
    private UserTokenRepository userTokenRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private SessionRevoker sessionRevoker;
    @Mock
    private ApplicationEventPublisher eventPublisher;

    private EmailChangeService service;

    @BeforeEach
    void setUp() {
        service = new EmailChangeService(userRepository, userTokenRepository,
                new AccountChecks(userRepository, passwordEncoder), new SecureTokenGenerator(),
                new EmailChangeProperties(TTL), sessionRevoker, Clock.fixed(INSTANT, ZoneOffset.UTC),
                eventPublisher);
    }

    private User givenUser(Role role) {
        User user = new User(OLD_EMAIL, HASH, role);
        user.setId(USER_ID);
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(user));
        return user;
    }

    private void givenPasswordMatches() {
        when(passwordEncoder.matches(PASSWORD, HASH)).thenReturn(true);
    }

    private UserToken givenToken(LocalDateTime expiresAt) {
        UserToken token = UserToken.emailChange(USER_ID, SecureTokenGenerator.hash(RAW), expiresAt, NEW_EMAIL);
        when(userTokenRepository.findByTokenHashAndType(SecureTokenGenerator.hash(RAW), TokenType.EMAIL_CHANGE))
                .thenReturn(Optional.of(token));
        return token;
    }

    @Test
    @DisplayName("request: replaces older tokens, stores the lower-cased address and publishes the raw token")
    void requestSuccess() {
        givenUser(Role.USER);
        givenPasswordMatches();

        service.requestChange(USER_ID, "  New@Example.COM ", PASSWORD);

        verify(userTokenRepository).invalidateActive(USER_ID, TokenType.EMAIL_CHANGE, NOW);
        ArgumentCaptor<UserToken> saved = ArgumentCaptor.forClass(UserToken.class);
        verify(userTokenRepository).save(saved.capture());
        assertThat(saved.getValue().getNewEmail()).isEqualTo(NEW_EMAIL);
        assertThat(saved.getValue().getType()).isEqualTo(TokenType.EMAIL_CHANGE);
        assertThat(saved.getValue().getExpiresAt()).isEqualTo(NOW.plus(TTL));
        ArgumentCaptor<EmailChangeConfirmationRequested> event =
                ArgumentCaptor.forClass(EmailChangeConfirmationRequested.class);
        verify(eventPublisher).publishEvent(event.capture());
        assertThat(event.getValue().newEmail()).isEqualTo(NEW_EMAIL);
        assertThat(saved.getValue().getTokenHash()).isNotEqualTo(event.getValue().rawToken())
                .isEqualTo(SecureTokenGenerator.hash(event.getValue().rawToken()));
    }

    @Test
    @DisplayName("request: the current address in other letter case is a field error")
    void requestSameAddress() {
        givenUser(Role.USER);

        assertThatThrownBy(() -> service.requestChange(USER_ID, "OLD@example.com", PASSWORD))
                .isInstanceOfSatisfying(FieldValidationException.class,
                        ex -> assertThat(ex.field()).isEqualTo("newEmail"));
        verify(userTokenRepository, never()).save(any());
    }

    @Test
    @DisplayName("request: a wrong password saves nothing")
    void requestWrongPassword() {
        givenUser(Role.USER);
        when(passwordEncoder.matches(anyString(), eq(HASH))).thenReturn(false);

        assertThatThrownBy(() -> service.requestChange(USER_ID, NEW_EMAIL, "nope"))
                .isInstanceOf(WrongPasswordException.class);
        verify(userTokenRepository, never()).save(any());
        verify(eventPublisher, never()).publishEvent(any());
    }

    @Test
    @DisplayName("request: an admin account is refused")
    void requestAdmin() {
        givenUser(Role.ADMIN);

        assertThatThrownBy(() -> service.requestChange(USER_ID, NEW_EMAIL, PASSWORD))
                .isInstanceOf(AdminAccountManagedException.class);
        verify(userTokenRepository, never()).save(any());
    }

    @Test
    @DisplayName("request: a taken address gets the account-exists notice and no token is made")
    void requestTakenAddress() {
        givenUser(Role.USER);
        givenPasswordMatches();
        when(userRepository.existsByEmail(NEW_EMAIL)).thenReturn(true);

        service.requestChange(USER_ID, NEW_EMAIL, PASSWORD);

        verify(eventPublisher).publishEvent(new AccountExistsNoticeRequested(USER_ID, NEW_EMAIL));
        verify(userTokenRepository, never()).save(any());
        verify(eventPublisher, never()).publishEvent(any(EmailChangeConfirmationRequested.class));
    }

    @Test
    @DisplayName("confirm: moves the account, uses the token, closes the old address's sessions and sends the notice")
    void confirmSuccess() {
        User user = givenUser(Role.USER);
        UserToken token = givenToken(NOW.plusMinutes(5));
        when(sessionRevoker.revokeAll(OLD_EMAIL)).thenReturn(2);

        service.confirmChange(RAW);

        assertThat(user.getEmail()).isEqualTo(NEW_EMAIL);
        assertThat(user.isEmailVerified()).isTrue();
        assertThat(token.isUsed()).isTrue();
        verify(userTokenRepository).invalidateActive(USER_ID, TokenType.EMAIL_CHANGE, NOW);
        verify(userTokenRepository).invalidateActive(USER_ID, TokenType.PASSWORD_RESET, NOW);
        verify(userTokenRepository).invalidateActive(USER_ID, TokenType.EMAIL_VERIFICATION, NOW);
        verify(userRepository).saveAndFlush(user);
        verify(sessionRevoker).revokeAll(OLD_EMAIL);
        verify(eventPublisher).publishEvent(new EmailChangedNoticeRequested(USER_ID, OLD_EMAIL, NEW_EMAIL));
    }

    @Test
    @DisplayName("confirm: an unknown token is invalid")
    void confirmUnknown() {
        when(userTokenRepository.findByTokenHashAndType(anyString(), eq(TokenType.EMAIL_CHANGE)))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.confirmChange(RAW)).isInstanceOf(EmailChangeLinkInvalidException.class);
    }

    @Test
    @DisplayName("confirm: a token whose user is gone is invalid")
    void confirmUserGone() {
        givenToken(NOW.plusMinutes(5));
        when(userRepository.findById(USER_ID)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.confirmChange(RAW)).isInstanceOf(EmailChangeLinkInvalidException.class);
    }

    @Test
    @DisplayName("confirm: a used token is invalid")
    void confirmUsed() {
        givenUser(Role.USER);
        givenToken(NOW.plusMinutes(5)).markUsed(NOW.minusMinutes(1));

        assertThatThrownBy(() -> service.confirmChange(RAW)).isInstanceOf(EmailChangeLinkInvalidException.class);
        verify(sessionRevoker, never()).revokeAll(anyString());
    }

    @Test
    @DisplayName("confirm: an expired token is expired")
    void confirmExpired() {
        givenUser(Role.USER);
        givenToken(NOW.minusSeconds(1));

        assertThatThrownBy(() -> service.confirmChange(RAW)).isInstanceOf(EmailChangeLinkExpiredException.class);
    }

    @Test
    @DisplayName("confirm: an address taken in the meantime is a conflict and nothing changes")
    void confirmTaken() {
        User user = givenUser(Role.USER);
        givenToken(NOW.plusMinutes(5));
        when(userRepository.existsByEmail(NEW_EMAIL)).thenReturn(true);

        assertThatThrownBy(() -> service.confirmChange(RAW)).isInstanceOf(EmailChangeConflictException.class);
        assertThat(user.getEmail()).isEqualTo(OLD_EMAIL);
        verify(sessionRevoker, never()).revokeAll(anyString());
    }

    @Test
    @DisplayName("confirm: a unique-index race on flush is a conflict")
    void confirmRace() {
        User user = givenUser(Role.USER);
        givenToken(NOW.plusMinutes(5));
        when(userRepository.saveAndFlush(user)).thenThrow(new DataIntegrityViolationException("ux_users_email"));

        assertThatThrownBy(() -> service.confirmChange(RAW)).isInstanceOf(EmailChangeConflictException.class);
        verify(sessionRevoker, never()).revokeAll(anyString());
        verify(eventPublisher, never()).publishEvent(any());
    }
}
