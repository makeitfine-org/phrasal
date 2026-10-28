package net.phrasal.integration;

import net.phrasal.domain.entity.QuizKey;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.entity.UserQuizProgress;
import net.phrasal.domain.repository.UserQuizProgressRepository;
import net.phrasal.domain.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayName("User quiz progress repository and schema")
class UserQuizProgressRepositoryIntegrationTest extends AbstractIntegrationTest {

    private static final String HASH = "{bcrypt}$2a$10$integrationtesthash";
    private static final String KEY = QuizKey.PHRASAL_VERBS.pathValue();
    private static final long MISSING_USER_ID = Long.MAX_VALUE;

    @Autowired
    private UserQuizProgressRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private TransactionTemplate transactionTemplate;

    private static String uniqueEmail() {
        return "user-" + UUID.randomUUID() + "@example.com";
    }

    private User newUser() {
        return userRepository.saveAndFlush(new User(uniqueEmail(), HASH, Role.USER));
    }

    private int upsert(Long userId, String json) {
        Integer rows = transactionTemplate.execute(status -> repository.upsert(userId, KEY, json));
        return rows == null ? 0 : rows;
    }

    private int rowCount(Long userId) {
        Integer count = jdbcTemplate.queryForObject(
                "SELECT count(*) FROM user_quiz_progress WHERE user_id = ?", Integer.class, userId);
        return count == null ? 0 : count;
    }

    @Test
    @DisplayName("first upsert inserts one row with version 0 and a round-tripping state")
    void firstUpsertInserts() {
        User user = newUser();

        assertThat(upsert(user.getId(), "{\"a\":{\"b\":[1,2,\"x\"]},\"flag\":true}")).isEqualTo(1);

        UserQuizProgress found = repository.findByUserIdAndQuizKey(user.getId(), QuizKey.PHRASAL_VERBS)
                .orElseThrow();
        assertThat(rowCount(user.getId())).isEqualTo(1);
        assertThat(found.getVersion()).isZero();
        assertThat(found.getCreatedAt()).isNotNull();
        assertThat(found.getUpdatedAt()).isNotNull();
        assertThat(found.getState()).containsEntry("flag", true);
        assertThat(found.getState().get("a")).isEqualTo(Map.of("b", List.of(1, 2, "x")));
    }

    @Test
    @DisplayName("second upsert replaces the state, bumps the version and keeps one row")
    void secondUpsertUpdates() {
        User user = newUser();
        upsert(user.getId(), "{\"n\":1}");
        UserQuizProgress first = repository.findByUserIdAndQuizKey(user.getId(), QuizKey.PHRASAL_VERBS)
                .orElseThrow();

        upsert(user.getId(), "{\"n\":2}");

        UserQuizProgress second = repository.findByUserIdAndQuizKey(user.getId(), QuizKey.PHRASAL_VERBS)
                .orElseThrow();
        assertThat(rowCount(user.getId())).isEqualTo(1);
        assertThat(second.getId()).isEqualTo(first.getId());
        assertThat(second.getVersion()).isEqualTo(1L);
        assertThat(second.getState()).isEqualTo(Map.of("n", 2));
        assertThat(second.getUpdatedAt()).isAfterOrEqualTo(first.getUpdatedAt());
    }

    @Test
    @DisplayName("two users can store the same quiz key independently")
    void sameKeyTwoUsers() {
        User first = newUser();
        User second = newUser();

        upsert(first.getId(), "{\"u\":1}");
        upsert(second.getId(), "{\"u\":2}");

        assertThat(repository.findByUserIdAndQuizKey(first.getId(), QuizKey.PHRASAL_VERBS).orElseThrow()
                .getState()).isEqualTo(Map.of("u", 1));
        assertThat(repository.findByUserIdAndQuizKey(second.getId(), QuizKey.PHRASAL_VERBS).orElseThrow()
                .getState()).isEqualTo(Map.of("u", 2));
    }

    @Test
    @DisplayName("findByUserIdAndQuizKey is empty for another user or another quiz")
    void findIsScoped() {
        User owner = newUser();
        User other = newUser();
        upsert(owner.getId(), "{}");

        assertThat(repository.findByUserIdAndQuizKey(other.getId(), QuizKey.PHRASAL_VERBS)).isEmpty();
        assertThat(repository.findByUserIdAndQuizKey(owner.getId(), QuizKey.GRAMMAR_I_WISH_IF_ONLY)).isEmpty();
    }

    @Test
    @DisplayName("deleting the user cascades to their progress rows")
    void cascadeOnUserDelete() {
        User user = newUser();
        upsert(user.getId(), "{\"a\":1}");
        assertThat(rowCount(user.getId())).isEqualTo(1);

        userRepository.delete(user);
        userRepository.flush();

        assertThat(rowCount(user.getId())).isZero();
    }

    @Test
    @DisplayName("the database rejects a state that is not a JSON object")
    void rejectsNonObjectState() {
        User user = newUser();

        assertThatThrownBy(() -> jdbcTemplate.update(
                "INSERT INTO user_quiz_progress (user_id, quiz_key, state) VALUES (?, ?, CAST(? AS jsonb))",
                user.getId(), KEY, "[1,2]"))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    @DisplayName("the database rejects progress for a non-existent user")
    void rejectsUnknownUser() {
        assertThatThrownBy(() -> upsert(MISSING_USER_ID, "{}"))
                .isInstanceOf(DataIntegrityViolationException.class);
    }
}
