package net.phrasal.application.service;

import net.phrasal.application.event.PasswordResetEmailRequested;
import net.phrasal.config.PasswordResetProperties;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.TokenType;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.entity.UserToken;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.domain.repository.UserTokenRepository;
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

    private PasswordResetService service() {
        return new PasswordResetService(userRepository, userTokenRepository, tokenGenerator,
                new PasswordResetProperties(TTL), Clock.fixed(INSTANT, ZoneOffset.UTC), publisher);
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
}
