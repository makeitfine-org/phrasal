package net.phrasal.application.service;

import net.phrasal.application.event.VerificationEmailRequested;
import net.phrasal.config.EmailVerificationProperties;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.TokenType;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.entity.UserToken;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.domain.repository.UserTokenRepository;
import net.phrasal.infrastructure.exception.VerificationLinkExpiredException;
import net.phrasal.infrastructure.exception.VerificationLinkInvalidException;
import net.phrasal.infrastructure.security.SecureTokenGenerator;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InOrder;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("EmailVerificationService")
class EmailVerificationServiceTest {

    private static final Instant INSTANT = Instant.parse("2026-01-10T12:00:00Z");
    private static final LocalDateTime NOW = LocalDateTime.ofInstant(INSTANT, ZoneOffset.UTC);
    private static final Duration TTL = Duration.ofHours(24);
    private static final String RAW = "raw-token";
    private static final String HASH = SecureTokenGenerator.hash(RAW);

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserTokenRepository userTokenRepository;

    @Mock
    private SecureTokenGenerator tokenGenerator;

    @Mock
    private ApplicationEventPublisher publisher;

    private EmailVerificationService service() {
        return new EmailVerificationService(userRepository, userTokenRepository, tokenGenerator,
                new EmailVerificationProperties(TTL, Duration.ofDays(7)), Clock.fixed(INSTANT, ZoneOffset.UTC),
                publisher);
    }

    private static User user() {
        User user = new User("a@b.com", "{bcrypt}x", Role.USER);
        user.setId(5L);
        return user;
    }

    private static UserToken token(LocalDateTime expiresAt) {
        return new UserToken(5L, TokenType.EMAIL_VERIFICATION, HASH, expiresAt);
    }

    @Test
    @DisplayName("issueFor invalidates older tokens before saving, stores the hash and publishes the raw token")
    void issueFor() {
        when(tokenGenerator.generate()).thenReturn(new SecureTokenGenerator.IssuedToken(RAW, HASH));

        service().issueFor(user());

        InOrder order = inOrder(userTokenRepository, publisher);
        order.verify(userTokenRepository).invalidateActive(5L, TokenType.EMAIL_VERIFICATION, NOW);
        ArgumentCaptor<UserToken> saved = ArgumentCaptor.forClass(UserToken.class);
        order.verify(userTokenRepository).save(saved.capture());
        assertThat(saved.getValue().getTokenHash()).isEqualTo(HASH);
        assertThat(saved.getValue().getExpiresAt()).isEqualTo(NOW.plus(TTL));
        assertThat(saved.getValue().getUserId()).isEqualTo(5L);
        ArgumentCaptor<VerificationEmailRequested> event = ArgumentCaptor.forClass(VerificationEmailRequested.class);
        order.verify(publisher).publishEvent(event.capture());
        assertThat(event.getValue().rawToken()).isEqualTo(RAW);
        assertThat(event.getValue().email()).isEqualTo("a@b.com");
    }

    @Test
    @DisplayName("verify marks the token used and the user verified")
    void verifyHappyPath() {
        User user = user();
        UserToken token = token(NOW.plusHours(1));
        when(userTokenRepository.findByTokenHashAndType(HASH, TokenType.EMAIL_VERIFICATION))
                .thenReturn(Optional.of(token));
        when(userRepository.findById(5L)).thenReturn(Optional.of(user));

        service().verify(RAW);

        assertThat(token.getUsedAt()).isEqualTo(NOW);
        assertThat(user.getEmailVerifiedAt()).isEqualTo(NOW);
        verify(userTokenRepository).invalidateActive(5L, TokenType.EMAIL_VERIFICATION, NOW);
    }

    @Test
    @DisplayName("verify rejects an unknown token")
    void verifyUnknown() {
        when(userTokenRepository.findByTokenHashAndType(HASH, TokenType.EMAIL_VERIFICATION))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> service().verify(RAW)).isInstanceOf(VerificationLinkInvalidException.class);
    }

    @Test
    @DisplayName("verify rejects a token whose user no longer exists")
    void verifyMissingUser() {
        when(userTokenRepository.findByTokenHashAndType(HASH, TokenType.EMAIL_VERIFICATION))
                .thenReturn(Optional.of(token(NOW.plusHours(1))));
        when(userRepository.findById(5L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service().verify(RAW)).isInstanceOf(VerificationLinkInvalidException.class);
    }

    @Test
    @DisplayName("verify rejects an expired token and changes nothing")
    void verifyExpired() {
        User user = user();
        UserToken token = token(NOW);
        when(userTokenRepository.findByTokenHashAndType(HASH, TokenType.EMAIL_VERIFICATION))
                .thenReturn(Optional.of(token));
        when(userRepository.findById(5L)).thenReturn(Optional.of(user));

        assertThatThrownBy(() -> service().verify(RAW)).isInstanceOf(VerificationLinkExpiredException.class);

        assertThat(user.isEmailVerified()).isFalse();
        assertThat(token.isUsed()).isFalse();
    }

    @Test
    @DisplayName("verify is idempotent for a used token of a verified user")
    void verifyIdempotent() {
        User user = user();
        user.markEmailVerified(NOW.minusMinutes(5));
        UserToken token = token(NOW.plusHours(1));
        token.markUsed(NOW.minusMinutes(5));
        when(userTokenRepository.findByTokenHashAndType(HASH, TokenType.EMAIL_VERIFICATION))
                .thenReturn(Optional.of(token));
        when(userRepository.findById(5L)).thenReturn(Optional.of(user));

        assertThatCode(() -> service().verify(RAW)).doesNotThrowAnyException();

        assertThat(user.getEmailVerifiedAt()).isEqualTo(NOW.minusMinutes(5));
        verify(userTokenRepository, never()).invalidateActive(any(), any(), any());
    }

    @Test
    @DisplayName("verify rejects a used token (replaced link) of an unverified user")
    void verifyReplacedLink() {
        UserToken token = token(NOW.plusHours(1));
        token.markUsed(NOW.minusMinutes(5));
        when(userTokenRepository.findByTokenHashAndType(HASH, TokenType.EMAIL_VERIFICATION))
                .thenReturn(Optional.of(token));
        when(userRepository.findById(5L)).thenReturn(Optional.of(user()));

        assertThatThrownBy(() -> service().verify(RAW)).isInstanceOf(VerificationLinkInvalidException.class);
    }

    @Test
    @DisplayName("resend issues a new token for an unverified account, after normalizing the email")
    void resendUnverified() {
        when(userRepository.findByEmail("a@b.com")).thenReturn(Optional.of(user()));
        when(tokenGenerator.generate()).thenReturn(new SecureTokenGenerator.IssuedToken(RAW, HASH));

        service().resend("  A@B.com ");

        verify(userTokenRepository).save(any(UserToken.class));
        verify(publisher).publishEvent(any(VerificationEmailRequested.class));
    }

    @Test
    @DisplayName("resend does nothing for a verified account")
    void resendVerified() {
        User user = user();
        user.markEmailVerified(NOW);
        when(userRepository.findByEmail("a@b.com")).thenReturn(Optional.of(user));

        service().resend("a@b.com");

        verify(userTokenRepository, never()).save(any());
        verify(publisher, never()).publishEvent(any(Object.class));
    }

    @Test
    @DisplayName("resend does nothing for an unknown address")
    void resendUnknown() {
        when(userRepository.findByEmail("a@b.com")).thenReturn(Optional.empty());

        service().resend("a@b.com");

        verify(userTokenRepository, never()).save(any());
        verify(publisher, never()).publishEvent(any(Object.class));
    }
}
