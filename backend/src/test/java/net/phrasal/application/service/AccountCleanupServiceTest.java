package net.phrasal.application.service;

import net.phrasal.config.EmailVerificationProperties;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.domain.repository.UserTokenRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("AccountCleanupService")
class AccountCleanupServiceTest {

    private static final Instant INSTANT = Instant.parse("2026-01-10T12:00:00Z");
    private static final LocalDateTime NOW = LocalDateTime.ofInstant(INSTANT, ZoneOffset.UTC);
    private static final Duration RETENTION = Duration.ofDays(3);

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserTokenRepository userTokenRepository;

    private AccountCleanupService service;

    @BeforeEach
    void setUp() {
        service = new AccountCleanupService(userRepository, userTokenRepository,
                new EmailVerificationProperties(Duration.ofHours(24), RETENTION),
                Clock.fixed(INSTANT, ZoneOffset.UTC));
    }

    @Test
    @DisplayName("purgeExpiredTokens keeps tokens expired less than a week ago")
    void purgeExpiredTokens() {
        when(userTokenRepository.deleteExpiredBefore(NOW.minusDays(7))).thenReturn(4);

        assertThat(service.purgeExpiredTokens()).isEqualTo(4);
    }

    @Test
    @DisplayName("purgeUnverifiedAccounts uses the configured retention")
    void purgeUnverifiedAccounts() {
        when(userRepository.deleteUnverifiedCreatedBefore(NOW.minus(RETENTION))).thenReturn(2);

        assertThat(service.purgeUnverifiedAccounts()).isEqualTo(2);
    }

    @Test
    @DisplayName("runNightly runs both purges")
    void runNightly() {
        service.runNightly();

        verify(userRepository).deleteUnverifiedCreatedBefore(NOW.minus(RETENTION));
        verify(userTokenRepository).deleteExpiredBefore(NOW.minusDays(7));
    }
}
