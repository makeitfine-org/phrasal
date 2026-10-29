package net.phrasal.application.service;

import net.phrasal.application.event.PasswordChangedNoticeRequested;
import net.phrasal.application.event.PasswordResetEmailRequested;
import net.phrasal.config.PasswordResetProperties;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.TokenType;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.entity.UserToken;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.domain.repository.UserTokenRepository;
import net.phrasal.infrastructure.exception.PasswordPolicyViolationException;
import net.phrasal.infrastructure.exception.ResetLinkExpiredException;
import net.phrasal.infrastructure.exception.ResetLinkInvalidException;
import net.phrasal.infrastructure.security.SecureTokenGenerator;
import net.phrasal.infrastructure.security.SessionRevoker;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InOrder;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;
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
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("PasswordResetService")
class PasswordResetServiceTest {

    private static final Instant INSTANT = Instant.parse("2026-01-10T12:00:00Z");
    private static final LocalDateTime NOW = LocalDateTime.ofInstant(INSTANT, ZoneOffset.UTC);
    private static final Duration TTL = Duration.ofHours(1);
    private static final String RAW = "raw-token";
    private static final String HASH = SecureTokenGenerator.hash(RAW);
    private static final long USER_ID = 5L;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserTokenRepository userTokenRepository;

    @Mock
    private SecureTokenGenerator tokenGenerator;

    @Mock
    private ApplicationEventPublisher publisher;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private SessionRevoker sessionRevoker;

    private PasswordResetService service() {
        return new PasswordResetService(userRepository, userTokenRepository, tokenGenerator,
                new PasswordResetProperties(TTL), Clock.fixed(INSTANT, ZoneOffset.UTC), publisher,
                passwordEncoder, sessionRevoker);
    }

    private static final String NEW_PASSWORD = "a-brand-new-passphrase";
    private static final String OLD_HASH = "{bcrypt}x";

    private static UserToken token(LocalDateTime expiresAt) {
        return new UserToken(USER_ID, TokenType.PASSWORD_RESET, HASH, expiresAt);
    }

    private void givenToken(UserToken token, User user) {
        when(userTokenRepository.findByTokenHashAndType(HASH, TokenType.PASSWORD_RESET))
                .thenReturn(Optional.of(token));
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(user));
    }

    private void assertNothingChanged(UserToken token, User user) {
        assertThat(token.isUsed()).isFalse();
        assertThat(user.getPasswordHash()).isEqualTo(OLD_HASH);
        verify(passwordEncoder, never()).encode(any());
        verify(sessionRevoker, never()).revokeAll(any());
        verify(publisher, never()).publishEvent(any(Object.class));
    }

    private static User user(boolean verified) {
        User user = new User("a@b.com", "{bcrypt}x", Role.USER);
        user.setId(USER_ID);
        if (verified) {
            user.markEmailVerified(NOW);
        }
        return user;
    }

    @Test
    @DisplayName("requestReset invalidates older reset tokens before saving, stores the hash, publishes the raw token")
    void requestResetVerifiedUser() {
        when(userRepository.findByEmail("a@b.com")).thenReturn(Optional.of(user(true)));
        when(tokenGenerator.generate()).thenReturn(new SecureTokenGenerator.IssuedToken(RAW, HASH));

        service().requestReset("a@b.com");

        InOrder order = inOrder(userTokenRepository, publisher);
        order.verify(userTokenRepository).invalidateActive(USER_ID, TokenType.PASSWORD_RESET, NOW);
        ArgumentCaptor<UserToken> saved = ArgumentCaptor.forClass(UserToken.class);
        order.verify(userTokenRepository).save(saved.capture());
        assertThat(saved.getValue().getType()).isEqualTo(TokenType.PASSWORD_RESET);
        assertThat(saved.getValue().getTokenHash()).isEqualTo(HASH);
        assertThat(saved.getValue().getExpiresAt()).isEqualTo(NOW.plus(TTL));
        assertThat(saved.getValue().getUserId()).isEqualTo(USER_ID);
        ArgumentCaptor<PasswordResetEmailRequested> event = ArgumentCaptor.forClass(PasswordResetEmailRequested.class);
        order.verify(publisher).publishEvent(event.capture());
        assertThat(event.getValue().rawToken()).isEqualTo(RAW);
        assertThat(event.getValue().email()).isEqualTo("a@b.com");
        assertThat(event.getValue().userId()).isEqualTo(USER_ID);
    }

    @Test
    @DisplayName("requestReset also serves an unverified account")
    void requestResetUnverifiedUser() {
        when(userRepository.findByEmail("a@b.com")).thenReturn(Optional.of(user(false)));
        when(tokenGenerator.generate()).thenReturn(new SecureTokenGenerator.IssuedToken(RAW, HASH));

        service().requestReset("a@b.com");

        verify(userTokenRepository).save(any(UserToken.class));
        verify(publisher).publishEvent(any(PasswordResetEmailRequested.class));
    }

    @Test
    @DisplayName("requestReset ignores an unknown address: no token, no invalidation, no event")
    void requestResetUnknownEmail() {
        when(userRepository.findByEmail("nobody@x.com")).thenReturn(Optional.empty());

        service().requestReset("nobody@x.com");

        verify(userTokenRepository, never()).save(any());
        verify(userTokenRepository, never()).invalidateActive(any(), any(), any());
        verify(publisher, never()).publishEvent(any(Object.class));
    }

    @Test
    @DisplayName("requestReset normalizes the address before the lookup")
    void requestResetNormalizesEmail() {
        when(userRepository.findByEmail("bob@x.com")).thenReturn(Optional.empty());

        service().requestReset("  Bob@X.com ");

        verify(userRepository).findByEmail("bob@x.com");
    }

    @Test
    @DisplayName("requestReset never touches verification tokens")
    void requestResetLeavesVerificationTokens() {
        when(userRepository.findByEmail("a@b.com")).thenReturn(Optional.of(user(false)));
        when(tokenGenerator.generate()).thenReturn(new SecureTokenGenerator.IssuedToken(RAW, HASH));

        service().requestReset("a@b.com");

        verify(userTokenRepository, never()).invalidateActive(any(), eq(TokenType.EMAIL_VERIFICATION), any());
    }

    @Test
    @DisplayName("reset marks the token used, hashes the password, kills other tokens and sessions, sends the notice")
    void resetHappyPath() {
        User user = user(true);
        UserToken token = token(NOW.plusMinutes(10));
        givenToken(token, user);
        when(passwordEncoder.encode(NEW_PASSWORD)).thenReturn("{bcrypt}new");
        when(sessionRevoker.revokeAll("a@b.com")).thenReturn(2);

        service().reset(RAW, NEW_PASSWORD);

        assertThat(token.getUsedAt()).isEqualTo(NOW);
        assertThat(user.getPasswordHash()).isEqualTo("{bcrypt}new");
        verify(userTokenRepository).invalidateActive(USER_ID, TokenType.PASSWORD_RESET, NOW);
        verify(sessionRevoker).revokeAll("a@b.com");
        ArgumentCaptor<PasswordChangedNoticeRequested> event =
                ArgumentCaptor.forClass(PasswordChangedNoticeRequested.class);
        verify(publisher).publishEvent(event.capture());
        assertThat(event.getValue().email()).isEqualTo("a@b.com");
        assertThat(event.getValue().userId()).isEqualTo(USER_ID);
    }

    @Test
    @DisplayName("reset verifies an unverified account and kills its verification links")
    void resetVerifiesUnverifiedUser() {
        User user = user(false);
        givenToken(token(NOW.plusMinutes(10)), user);
        when(passwordEncoder.encode(NEW_PASSWORD)).thenReturn("{bcrypt}new");

        service().reset(RAW, NEW_PASSWORD);

        assertThat(user.isEmailVerified()).isTrue();
        verify(userTokenRepository).invalidateActive(USER_ID, TokenType.EMAIL_VERIFICATION, NOW);
    }

    @Test
    @DisplayName("reset leaves a verified account's verification time and tokens alone")
    void resetKeepsVerification() {
        User user = user(true);
        givenToken(token(NOW.plusMinutes(10)), user);
        when(passwordEncoder.encode(NEW_PASSWORD)).thenReturn("{bcrypt}new");

        service().reset(RAW, NEW_PASSWORD);

        assertThat(user.getEmailVerifiedAt()).isEqualTo(NOW);
        verify(userTokenRepository, never()).invalidateActive(any(), eq(TokenType.EMAIL_VERIFICATION), any());
    }

    @Test
    @DisplayName("reset rejects an unknown token")
    void resetUnknownToken() {
        when(userTokenRepository.findByTokenHashAndType(HASH, TokenType.PASSWORD_RESET))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> service().reset(RAW, NEW_PASSWORD)).isInstanceOf(ResetLinkInvalidException.class);

        verify(passwordEncoder, never()).encode(any());
        verify(sessionRevoker, never()).revokeAll(any());
        verify(publisher, never()).publishEvent(any(Object.class));
    }

    @Test
    @DisplayName("reset rejects a token whose user is gone")
    void resetMissingUser() {
        when(userTokenRepository.findByTokenHashAndType(HASH, TokenType.PASSWORD_RESET))
                .thenReturn(Optional.of(token(NOW.plusMinutes(10))));
        when(userRepository.findById(USER_ID)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service().reset(RAW, NEW_PASSWORD)).isInstanceOf(ResetLinkInvalidException.class);

        verify(sessionRevoker, never()).revokeAll(any());
    }

    @Test
    @DisplayName("reset rejects an already used token, even for a verified user")
    void resetUsedToken() {
        User user = user(true);
        UserToken token = token(NOW.plusMinutes(10));
        token.markUsed(NOW.minusMinutes(1));
        givenToken(token, user);

        assertThatThrownBy(() -> service().reset(RAW, NEW_PASSWORD)).isInstanceOf(ResetLinkInvalidException.class);

        assertThat(user.getPasswordHash()).isEqualTo(OLD_HASH);
        verify(passwordEncoder, never()).encode(any());
        verify(sessionRevoker, never()).revokeAll(any());
        verify(publisher, never()).publishEvent(any(Object.class));
    }

    @Test
    @DisplayName("reset rejects a token at its exact expiry time")
    void resetExpiredToken() {
        User user = user(true);
        UserToken token = token(NOW);
        givenToken(token, user);

        assertThatThrownBy(() -> service().reset(RAW, NEW_PASSWORD)).isInstanceOf(ResetLinkExpiredException.class);

        assertNothingChanged(token, user);
    }

    @Test
    @DisplayName("reset rejects a password containing the account email and keeps the token usable")
    void resetPasswordContainsEmail() {
        User user = user(true);
        UserToken token = token(NOW.plusMinutes(10));
        givenToken(token, user);

        assertThatThrownBy(() -> service().reset(RAW, "my-a@b.com-passphrase"))
                .isInstanceOf(PasswordPolicyViolationException.class)
                .hasMessageContaining("must not contain your email");

        assertNothingChanged(token, user);
        verify(userTokenRepository, never()).invalidateActive(any(), any(), any());
    }
}
