package net.phrasal.integration;

import net.phrasal.domain.entity.RecoveryCode;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.RecoveryCodeRepository;
import net.phrasal.domain.repository.UserRepository;
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

@DisplayName("Recovery code repository and schema")
class RecoveryCodeRepositoryIntegrationTest extends AbstractIntegrationTest {

    private static final String PASSWORD_HASH = "{bcrypt}$2a$10$integrationtesthash";
    private static final LocalDateTime NOW = LocalDateTime.of(2026, 10, 30, 12, 0);
    private static final int CODES_PER_USER = 3;

    @Autowired
    private RecoveryCodeRepository repository;

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

    private String saveCodes(Long userId, int count) {
        String first = null;
        for (int i = 0; i < count; i++) {
            String hash = uniqueHash();
            repository.saveAndFlush(new RecoveryCode(userId, hash));
            first = first == null ? hash : first;
        }
        return first;
    }

    @Test
    @DisplayName("saved codes are counted as unused")
    void countUnused() {
        User user = newUser();

        saveCodes(user.getId(), CODES_PER_USER);

        assertThat(repository.countByUserIdAndUsedAtIsNull(user.getId())).isEqualTo(CODES_PER_USER);
    }

    @Test
    @DisplayName("markUsed works once per code and lowers the unused count")
    void markUsedSingleUse() {
        User user = newUser();
        String hash = saveCodes(user.getId(), CODES_PER_USER);

        int first = transactionTemplate.execute(status -> repository.markUsed(user.getId(), hash, NOW));
        int second = transactionTemplate.execute(status -> repository.markUsed(user.getId(), hash, NOW));

        assertThat(first).isEqualTo(1);
        assertThat(second).isZero();
        assertThat(repository.countByUserIdAndUsedAtIsNull(user.getId())).isEqualTo(CODES_PER_USER - 1);
    }

    @Test
    @DisplayName("markUsed with another user's id changes nothing")
    void markUsedIsPerUser() {
        User owner = newUser();
        User other = newUser();
        String hash = saveCodes(owner.getId(), 1);

        int changed = transactionTemplate.execute(status -> repository.markUsed(other.getId(), hash, NOW));

        assertThat(changed).isZero();
        assertThat(repository.countByUserIdAndUsedAtIsNull(owner.getId())).isEqualTo(1);
    }

    @Test
    @DisplayName("deleteAllByUserId removes only that user's codes")
    void deleteAllByUserId() {
        User user = newUser();
        User other = newUser();
        saveCodes(user.getId(), CODES_PER_USER);
        saveCodes(other.getId(), CODES_PER_USER);

        int deleted = transactionTemplate.execute(status -> repository.deleteAllByUserId(user.getId()));

        assertThat(deleted).isEqualTo(CODES_PER_USER);
        assertThat(repository.countByUserIdAndUsedAtIsNull(user.getId())).isZero();
        assertThat(repository.countByUserIdAndUsedAtIsNull(other.getId())).isEqualTo(CODES_PER_USER);
    }

    @Test
    @DisplayName("the same (user, hash) twice violates the unique index")
    void duplicateRejected() {
        User user = newUser();
        String hash = saveCodes(user.getId(), 1);

        assertThatThrownBy(() -> repository.saveAndFlush(new RecoveryCode(user.getId(), hash)))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    @DisplayName("the same hash for two different users is allowed")
    void sameHashForDifferentUsers() {
        User user = newUser();
        User other = newUser();
        String hash = saveCodes(user.getId(), 1);

        repository.saveAndFlush(new RecoveryCode(other.getId(), hash));

        assertThat(repository.countByUserIdAndUsedAtIsNull(other.getId())).isEqualTo(1);
    }

    @Test
    @DisplayName("deleting the user cascades to its recovery codes")
    void cascadeOnUserDelete() {
        User user = newUser();
        saveCodes(user.getId(), CODES_PER_USER);

        userRepository.deleteById(user.getId());
        userRepository.flush();

        Integer count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM user_recovery_codes WHERE user_id = ?", Integer.class, user.getId());
        assertThat(count).isZero();
    }
}
