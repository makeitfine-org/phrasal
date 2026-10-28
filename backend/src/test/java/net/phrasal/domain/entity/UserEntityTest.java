package net.phrasal.domain.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("User Entity")
class UserEntityTest {

    private static final String EMAIL = "reader@example.com";
    private static final String HASH = "{bcrypt}$2a$10$secrethashvalue";

    @Test
    @DisplayName("constructor sets email, hash and role")
    void constructorAndGetters() {
        User user = new User(EMAIL, HASH, Role.ADMIN);

        assertThat(user.getEmail()).isEqualTo(EMAIL);
        assertThat(user.getPasswordHash()).isEqualTo(HASH);
        assertThat(user.getRole()).isEqualTo(Role.ADMIN);
    }

    @Test
    @DisplayName("no-args constructor defaults the role to USER")
    void defaultRole() {
        assertThat(new User().getRole()).isEqualTo(Role.USER);
    }

    @Test
    @DisplayName("setters update all fields")
    void setters() {
        User user = new User();
        user.setId(7L);
        user.setEmail(EMAIL);
        user.setPasswordHash(HASH);
        user.setRole(Role.ADMIN);
        user.setVersion(2L);

        assertThat(user.getId()).isEqualTo(7L);
        assertThat(user.getEmail()).isEqualTo(EMAIL);
        assertThat(user.getPasswordHash()).isEqualTo(HASH);
        assertThat(user.getRole()).isEqualTo(Role.ADMIN);
        assertThat(user.getVersion()).isEqualTo(2L);
    }

    @Test
    @DisplayName("toString never contains the password hash")
    void toStringOmitsHash() {
        User user = new User(EMAIL, HASH, Role.USER);

        assertThat(user.toString()).contains(EMAIL).doesNotContain(HASH).doesNotContain("passwordHash");
    }

    @Test
    @DisplayName("equals and hashCode use id and email only")
    void equalsAndHashCode() {
        User first = new User(EMAIL, HASH, Role.USER);
        first.setId(1L);
        User sameKey = new User(EMAIL, "other-hash", Role.ADMIN);
        sameKey.setId(1L);
        User otherId = new User(EMAIL, HASH, Role.USER);
        otherId.setId(2L);
        User otherEmail = new User("other@example.com", HASH, Role.USER);
        otherEmail.setId(1L);

        assertThat(first).isEqualTo(sameKey).hasSameHashCodeAs(sameKey);
        assertThat(first).isNotEqualTo(otherId).isNotEqualTo(otherEmail);
    }

    @Test
    @DisplayName("a new user is unverified")
    void newUserUnverified() {
        User user = new User(EMAIL, HASH, Role.USER);

        assertThat(user.isEmailVerified()).isFalse();
        assertThat(user.getEmailVerifiedAt()).isNull();
    }

    @Test
    @DisplayName("markEmailVerified sets the time once and keeps the first time on a second call")
    void markEmailVerifiedIsIdempotent() {
        User user = new User(EMAIL, HASH, Role.USER);
        LocalDateTime first = LocalDateTime.of(2026, 10, 28, 12, 0);

        user.markEmailVerified(first);
        user.markEmailVerified(first.plusHours(1));

        assertThat(user.isEmailVerified()).isTrue();
        assertThat(user.getEmailVerifiedAt()).isEqualTo(first);
    }
}
