package net.phrasal.integration;

import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.support.TransactionTemplate;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
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

    @Autowired
    private TransactionTemplate transactionTemplate;

    private static String uniqueEmail() {
        return "user-" + UUID.randomUUID() + "@example.com";
    }

    private static String uniqueSubject() {
        return "google-" + UUID.randomUUID();
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

    @Test
    @DisplayName("a user saved after the migration is unverified; the V13 backfill ran once at migration time")
    void newUserIsUnverified() {
        String email = uniqueEmail();

        repository.saveAndFlush(new User(email, HASH, Role.USER));

        assertThat(repository.findByEmail(email).orElseThrow().isEmailVerified()).isFalse();
    }

    @Test
    @DisplayName("deleteUnverifiedCreatedBefore deletes only old unverified users")
    void deleteUnverifiedCreatedBefore() {
        User oldUnverified = repository.saveAndFlush(new User(uniqueEmail(), HASH, Role.USER));
        User oldVerified = new User(uniqueEmail(), HASH, Role.USER);
        oldVerified.markEmailVerified(LocalDateTime.now());
        oldVerified = repository.saveAndFlush(oldVerified);
        User recentUnverified = repository.saveAndFlush(new User(uniqueEmail(), HASH, Role.USER));
        LocalDateTime past = LocalDateTime.now().minusDays(30);
        jdbcTemplate.update("UPDATE users SET created_at = ? WHERE id IN (?, ?)",
                past, oldUnverified.getId(), oldVerified.getId());

        int deleted = transactionTemplate.execute(
                status -> repository.deleteUnverifiedCreatedBefore(LocalDateTime.now().minusDays(7)));

        assertThat(deleted).isGreaterThanOrEqualTo(1);
        assertThat(repository.findById(oldUnverified.getId())).isEmpty();
        assertThat(repository.findById(oldVerified.getId())).isPresent();
        assertThat(repository.findById(recentUnverified.getId())).isPresent();
    }

    @Test
    @DisplayName("advanceTotpStep accepts only a step newer than the stored one")
    void advanceTotpStep() {
        User user = repository.saveAndFlush(new User(uniqueEmail(), HASH, Role.USER));
        Long id = user.getId();

        int fromNull = transactionTemplate.execute(status -> repository.advanceTotpStep(id, 100));
        int same = transactionTemplate.execute(status -> repository.advanceTotpStep(id, 100));
        int older = transactionTemplate.execute(status -> repository.advanceTotpStep(id, 99));
        int newer = transactionTemplate.execute(status -> repository.advanceTotpStep(id, 101));

        assertThat(fromNull).isEqualTo(1);
        assertThat(same).isZero();
        assertThat(older).isZero();
        assertThat(newer).isEqualTo(1);
        assertThat(repository.findById(id).orElseThrow().getTotpLastStep()).isEqualTo(101L);
    }

    @Test
    @DisplayName("two-factor enabled without a secret violates the check constraint")
    void enabledWithoutSecretRejected() {
        User user = repository.saveAndFlush(new User(uniqueEmail(), HASH, Role.USER));

        assertThatThrownBy(() -> jdbcTemplate.update(
                "UPDATE users SET totp_enabled_at = ? WHERE id = ?", LocalDateTime.now(), user.getId()))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    @DisplayName("two-factor fields round-trip through the entity")
    void twoFactorRoundTrip() {
        User user = new User(uniqueEmail(), HASH, Role.USER);
        user.startTwoFactorSetup("v1:secret");
        user.enableTwoFactor(LocalDateTime.now(), 42L);

        User found = repository.findById(repository.saveAndFlush(user).getId()).orElseThrow();

        assertThat(found.isTwoFactorEnabled()).isTrue();
        assertThat(found.getTotpSecretEnc()).isEqualTo("v1:secret");
        assertThat(found.getTotpLastStep()).isEqualTo(42L);
    }

    @Test
    @DisplayName("a Google account round-trips and findByGoogleSubject finds it")
    void findByGoogleSubject() {
        String email = uniqueEmail();
        String subject = uniqueSubject();

        User saved = repository.saveAndFlush(User.fromGoogle(email, subject, LocalDateTime.now()));

        User found = repository.findByGoogleSubject(subject).orElseThrow();
        assertThat(found.getId()).isEqualTo(saved.getId());
        assertThat(found.getEmail()).isEqualTo(email);
        assertThat(found.getGoogleSubject()).isEqualTo(subject);
        assertThat(found.hasPassword()).isFalse();
        assertThat(found.isEmailVerified()).isTrue();
    }

    @Test
    @DisplayName("findByGoogleSubject returns empty for an unknown subject")
    void findByGoogleSubjectUnknown() {
        repository.saveAndFlush(User.fromGoogle(uniqueEmail(), uniqueSubject(), LocalDateTime.now()));

        assertThat(repository.findByGoogleSubject(uniqueSubject())).isEmpty();
    }

    @Test
    @DisplayName("linking an existing account stores the subject")
    void linkGooglePersists() {
        User user = repository.saveAndFlush(new User(uniqueEmail(), HASH, Role.USER));
        String subject = uniqueSubject();

        user.linkGoogle(subject);
        repository.saveAndFlush(user);

        assertThat(repository.findByGoogleSubject(subject).orElseThrow().getId()).isEqualTo(user.getId());
    }

    @Test
    @DisplayName("a second user with the same Google subject violates the unique index")
    void duplicateGoogleSubjectRejected() {
        String subject = uniqueSubject();
        repository.saveAndFlush(User.fromGoogle(uniqueEmail(), subject, LocalDateTime.now()));

        assertThatThrownBy(() -> repository.saveAndFlush(User.fromGoogle(uniqueEmail(), subject, LocalDateTime.now())))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    @DisplayName("several users without a Google subject can coexist")
    void usersWithoutSubjectCoexist() {
        User first = repository.saveAndFlush(new User(uniqueEmail(), HASH, Role.USER));
        User second = repository.saveAndFlush(new User(uniqueEmail(), HASH, Role.USER));

        assertThat(repository.findById(first.getId()).orElseThrow().getGoogleSubject()).isNull();
        assertThat(repository.findById(second.getId()).orElseThrow().getGoogleSubject()).isNull();
    }

    @Test
    @DisplayName("the V15 session cleanup deletes admin sessions and keeps other users' sessions")
    void v15DeletesOnlyAdminSessions() throws IOException {
        User admin = repository.saveAndFlush(new User(uniqueEmail(), HASH, Role.ADMIN));
        User reader = repository.saveAndFlush(new User(uniqueEmail(), HASH, Role.USER));
        String adminSession = insertSession(admin.getEmail());
        String readerSession = insertSession(reader.getEmail());
        String migration = new ClassPathResource("db/migration/V15__add_user_two_factor.sql")
                .getContentAsString(StandardCharsets.UTF_8);
        String cleanup = migration.lines().filter(line -> line.startsWith("DELETE FROM spring_session"))
                .findFirst().orElseThrow();

        jdbcTemplate.update(cleanup);

        assertThat(sessionExists(adminSession)).isFalse();
        assertThat(sessionExists(readerSession)).isTrue();
    }

    private String insertSession(String principalName) {
        String id = UUID.randomUUID().toString();
        jdbcTemplate.update("INSERT INTO spring_session (primary_id, session_id, creation_time, last_access_time, "
                        + "max_inactive_interval, expiry_time, principal_name) VALUES (?, ?, 0, 0, 1800, ?, ?)",
                id, UUID.randomUUID().toString(), Long.MAX_VALUE, principalName);
        return id;
    }

    private boolean sessionExists(String primaryId) {
        Integer count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM spring_session WHERE primary_id = ?", Integer.class, primaryId);
        return count != null && count > 0;
    }
}
