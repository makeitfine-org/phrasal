package net.phrasal.integration;

import net.phrasal.application.service.AccountCleanupService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Account clean-up integration")
class AccountCleanupIntegrationTest extends AbstractIntegrationTest {

    @Autowired
    private AccountCleanupService cleanupService;

    @Autowired
    private JdbcTemplate jdbc;

    @Test
    @DisplayName("deletes old unverified accounts with their tokens, keeps recent and verified ones")
    void purgesUnverifiedAccounts() {
        long old = insertUser(LocalDateTime.now().minusDays(8), false);
        long recent = insertUser(LocalDateTime.now().minusDays(1), false);
        long verified = insertUser(LocalDateTime.now().minusDays(30), true);
        insertToken(old, LocalDateTime.now().plusDays(1));

        int removed = cleanupService.purgeUnverifiedAccounts();

        assertThat(removed).isGreaterThanOrEqualTo(1);
        assertThat(userExists(old)).isFalse();
        assertThat(userExists(recent)).isTrue();
        assertThat(userExists(verified)).isTrue();
        assertThat(tokenCount(old)).isZero();
    }

    @Test
    @DisplayName("deletes tokens expired over a week ago, keeps newer ones")
    void purgesExpiredTokens() {
        long owner = insertUser(LocalDateTime.now().minusHours(1), true);
        String stale = insertToken(owner, LocalDateTime.now().minusDays(8));
        String fresh = insertToken(owner, LocalDateTime.now().minusDays(1));

        cleanupService.purgeExpiredTokens();

        assertThat(tokenExists(stale)).isFalse();
        assertThat(tokenExists(fresh)).isTrue();
    }

    @Test
    @DisplayName("purges expired password reset tokens on the same schedule as verification tokens")
    void purgesExpiredResetTokens() {
        long owner = insertUser(LocalDateTime.now().minusHours(1), true);
        String stale = insertToken(owner, "PASSWORD_RESET", LocalDateTime.now().minusDays(8));
        String fresh = insertToken(owner, "PASSWORD_RESET", LocalDateTime.now().minusDays(1));

        cleanupService.purgeExpiredTokens();

        assertThat(tokenExists(stale)).isFalse();
        assertThat(tokenExists(fresh)).isTrue();
    }

    private long insertUser(LocalDateTime createdAt, boolean verified) {
        String email = "cleanup-" + UUID.randomUUID() + "@it.test";
        return jdbc.queryForObject("INSERT INTO users (email, password_hash, role, created_at, email_verified_at) "
                + "VALUES (?, 'x', 'USER', ?, ?) RETURNING id", Long.class, email, createdAt,
                verified ? createdAt : null);
    }

    private String insertToken(long userId, LocalDateTime expiresAt) {
        return insertToken(userId, "EMAIL_VERIFICATION", expiresAt);
    }

    private String insertToken(long userId, String type, LocalDateTime expiresAt) {
        String hash = UUID.randomUUID().toString().replace("-", "")
                + UUID.randomUUID().toString().replace("-", "");
        jdbc.update("INSERT INTO user_tokens (user_id, type, token_hash, expires_at) "
                + "VALUES (?, ?, ?, ?)", userId, type, hash, expiresAt);
        return hash;
    }

    private boolean userExists(long id) {
        return jdbc.queryForObject("SELECT count(*) FROM users WHERE id = ?", Integer.class, id) > 0;
    }

    private int tokenCount(long userId) {
        return jdbc.queryForObject("SELECT count(*) FROM user_tokens WHERE user_id = ?", Integer.class, userId);
    }

    private boolean tokenExists(String hash) {
        return jdbc.queryForObject("SELECT count(*) FROM user_tokens WHERE token_hash = ?", Integer.class, hash) > 0;
    }
}
