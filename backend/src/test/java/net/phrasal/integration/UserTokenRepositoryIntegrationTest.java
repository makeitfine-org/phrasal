package net.phrasal.integration;

import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.TokenType;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.entity.UserToken;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.domain.repository.UserTokenRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.support.TransactionTemplate;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayName("User token repository and schema")
class UserTokenRepositoryIntegrationTest extends AbstractIntegrationTest {

    private static final String PASSWORD_HASH = "{bcrypt}$2a$10$integrationtesthash";
    private static final long MISSING_USER_ID = Long.MAX_VALUE;
    private static final LocalDateTime NOW = LocalDateTime.of(2026, 10, 28, 12, 0);

    @Autowired
    private UserTokenRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private TransactionTemplate transactionTemplate;

    private User newUser() {
        return userRepository.saveAndFlush(
                new User("user-" + UUID.randomUUID() + "@example.com", PASSWORD_HASH, Role.USER));
    }

    private static String uniqueHash() {
        return (UUID.randomUUID().toString() + UUID.randomUUID()).replace("-", "").substring(0, 64);
    }

    private UserToken save(Long userId, LocalDateTime expiresAt) {
        return repository.saveAndFlush(new UserToken(userId, TokenType.EMAIL_VERIFICATION, uniqueHash(), expiresAt));
    }

    @Test
    @DisplayName("save then findByTokenHashAndType round-trips; the wrong type finds nothing")
    void roundTrip() {
        User user = newUser();
        UserToken saved = save(user.getId(), NOW.plusDays(1));

        UserToken found = repository.findByTokenHashAndType(saved.getTokenHash(), TokenType.EMAIL_VERIFICATION)
                .orElseThrow();

        assertThat(found.getId()).isEqualTo(saved.getId());
        assertThat(found.getUserId()).isEqualTo(user.getId());
        assertThat(found.getCreatedAt()).isNotNull();
        assertThat(found.isUsed()).isFalse();
    }

    @Test
    @DisplayName("an unknown hash finds nothing")
    void unknownHash() {
        assertThat(repository.findByTokenHashAndType(uniqueHash(), TokenType.EMAIL_VERIFICATION)).isEmpty();
    }

    @Test
    @DisplayName("invalidateActive marks only unused tokens of that user, others stay untouched")
    void invalidateActive() {
        User user = newUser();
        User other = newUser();
        UserToken alreadyUsed = save(user.getId(), NOW.plusDays(1));
        alreadyUsed.markUsed(NOW.minusHours(1));
        repository.saveAndFlush(alreadyUsed);
        UserToken active = save(user.getId(), NOW.plusDays(1));
        UserToken otherUsers = save(other.getId(), NOW.plusDays(1));

        int count = transactionTemplate.execute(status ->
                repository.invalidateActive(user.getId(), TokenType.EMAIL_VERIFICATION, NOW));

        assertThat(count).isEqualTo(1);
        assertThat(repository.findById(active.getId()).orElseThrow().getUsedAt()).isEqualTo(NOW);
        assertThat(repository.findById(alreadyUsed.getId()).orElseThrow().getUsedAt()).isEqualTo(NOW.minusHours(1));
        assertThat(repository.findById(otherUsers.getId()).orElseThrow().isUsed()).isFalse();
    }

    @Test
    @DisplayName("deleteExpiredBefore removes only tokens that expired before the cutoff")
    void deleteExpiredBefore() {
        User user = newUser();
        UserToken old = save(user.getId(), NOW.minusDays(10));
        UserToken fresh = save(user.getId(), NOW.plusDays(1));

        int deleted = transactionTemplate.execute(status -> repository.deleteExpiredBefore(NOW.minusDays(1)));

        assertThat(deleted).isGreaterThanOrEqualTo(1);
        assertThat(repository.findById(old.getId())).isEmpty();
        assertThat(repository.findById(fresh.getId())).isPresent();
    }

    @Test
    @DisplayName("deleting the user cascades to its tokens")
    void cascadeOnUserDelete() {
        User user = newUser();
        save(user.getId(), NOW.plusDays(1));

        userRepository.deleteById(user.getId());
        userRepository.flush();

        Integer count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM user_tokens WHERE user_id = ?", Integer.class, user.getId());
        assertThat(count).isZero();
    }

    @Test
    @DisplayName("a duplicate token hash violates the unique index")
    void duplicateHashRejected() {
        User user = newUser();
        UserToken first = save(user.getId(), NOW.plusDays(1));

        assertThatThrownBy(() -> repository.saveAndFlush(
                new UserToken(user.getId(), TokenType.EMAIL_VERIFICATION, first.getTokenHash(), NOW.plusDays(1))))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    @DisplayName("a token for a non-existent user violates the foreign key")
    void missingUserRejected() {
        assertThatThrownBy(() -> save(MISSING_USER_ID, NOW.plusDays(1)))
                .isInstanceOf(DataIntegrityViolationException.class);
    }
}
