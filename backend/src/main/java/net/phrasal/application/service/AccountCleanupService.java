package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.config.EmailVerificationProperties;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.domain.repository.UserTokenRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.Duration;
import java.time.LocalDateTime;

/**
 * Nightly housekeeping: removes long-expired tokens and accounts that never verified their address, so a squatted
 * email becomes free again. Both deletes are idempotent, so replicas running it at once do no harm.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AccountCleanupService {

    /** Expired tokens stay this long, so "expired" and "invalid" links remain distinguishable for a week. */
    static final Duration TOKEN_RETENTION = Duration.ofDays(7);

    private final UserRepository userRepository;
    private final UserTokenRepository userTokenRepository;
    private final EmailVerificationProperties properties;
    private final Clock clock;

    /**
     * Deletes tokens that expired more than {@link #TOKEN_RETENTION} ago.
     *
     * @return number of deleted tokens
     */
    @Transactional
    public int purgeExpiredTokens() {
        return userTokenRepository.deleteExpiredBefore(LocalDateTime.now(clock).minus(TOKEN_RETENTION));
    }

    /**
     * Deletes accounts left unverified for longer than the configured retention.
     *
     * @return number of deleted accounts
     */
    @Transactional
    public int purgeUnverifiedAccounts() {
        return userRepository.deleteUnverifiedCreatedBefore(
                LocalDateTime.now(clock).minus(properties.unverifiedAccountRetention()));
    }

    /** Runs both purges; the cron defaults to 03:30, after the 03:00 backup. */
    @Scheduled(cron = "${phrasal.cleanup.cron:0 30 3 * * *}")
    public void runNightly() {
        int accounts = purgeUnverifiedAccounts();
        int tokens = purgeExpiredTokens();
        log.info("Clean-up removed tokens={} unverifiedAccounts={}", tokens, accounts);
    }
}
