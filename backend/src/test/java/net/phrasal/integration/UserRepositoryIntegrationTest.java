package net.phrasal.integration;

import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayName("User repository and session schema")
class UserRepositoryIntegrationTest extends AbstractIntegrationTest {

    private static final String HASH = "{bcrypt}$2a$10$integrationtesthash";

    @Autowired
    private UserRepository repository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static String uniqueEmail() {
        return "user-" + UUID.randomUUID() + "@example.com";
    }

    @Test
    @DisplayName("save then findByEmail returns the user with audit fields and default version")
    void saveAndFindByEmail() {
        String email = uniqueEmail();

        User saved = repository.saveAndFlush(new User(email, HASH, Role.USER));

        User found = repository.findByEmail(email).orElseThrow();
        assertThat(found.getId()).isEqualTo(saved.getId());
        assertThat(found.getPasswordHash()).isEqualTo(HASH);
        assertThat(found.getRole()).isEqualTo(Role.USER);
        assertThat(found.getCreatedAt()).isNotNull();
        assertThat(found.getUpdatedAt()).isNotNull();
        assertThat(found.getVersion()).isNotNull();
    }

    @Test
    @DisplayName("findByEmail returns empty for an unknown email")
    void findByEmailUnknown() {
        assertThat(repository.findByEmail(uniqueEmail())).isEmpty();
    }

    @Test
    @DisplayName("existsByEmail is true for a saved user and false otherwise")
    void existsByEmail() {
        String email = uniqueEmail();
        repository.saveAndFlush(new User(email, HASH, Role.USER));

        assertThat(repository.existsByEmail(email)).isTrue();
        assertThat(repository.existsByEmail(uniqueEmail())).isFalse();
    }

    @Test
    @DisplayName("a second user with the same email violates the unique index")
    void duplicateEmailRejected() {
        String email = uniqueEmail();
        repository.saveAndFlush(new User(email, HASH, Role.USER));

        assertThatThrownBy(() -> repository.saveAndFlush(new User(email, HASH, Role.USER)))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    @DisplayName("an email with upper-case letters violates chk_users_email_lower")
    void upperCaseEmailRejected() {
        String email = "Mixed-" + UUID.randomUUID() + "@Example.com";

        assertThatThrownBy(() -> repository.saveAndFlush(new User(email, HASH, Role.USER)))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    @DisplayName("a user without a password hash is allowed (future social accounts)")
    void nullPasswordHashAllowed() {
        String email = uniqueEmail();

        repository.saveAndFlush(new User(email, null, Role.USER));

        assertThat(repository.findByEmail(email).orElseThrow().getPasswordHash()).isNull();
    }

    @Test
    @DisplayName("Spring Session tables exist after Flyway migrations")
    void sessionTablesExist() {
        Integer count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM information_schema.tables "
                        + "WHERE table_name IN ('spring_session', 'spring_session_attributes')",
                Integer.class);

        assertThat(count).isEqualTo(2);
    }
}
