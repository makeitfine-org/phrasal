package net.phrasal.domain.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayName("User Entity")
class UserEntityTest {

    private static final String EMAIL = "reader@example.com";
    private static final String HASH = "{bcrypt}$2a$10$secrethashvalue";
    private static final String ENCRYPTED_SECRET = "v1:encryptedsecretvalue";
    private static final long STEP = 56_000_000L;

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

    @Test
    @DisplayName("a new user has two-factor authentication off")
    void newUserHasNoTwoFactor() {
        User user = new User(EMAIL, HASH, Role.USER);

        assertThat(user.isTwoFactorEnabled()).isFalse();
        assertThat(user.getTotpSecretEnc()).isNull();
        assertThat(user.getTotpLastStep()).isNull();
    }

    @Test
    @DisplayName("startTwoFactorSetup stores the secret but keeps two-factor off")
    void startSetupKeepsTwoFactorOff() {
        User user = new User(EMAIL, HASH, Role.USER);

        user.startTwoFactorSetup(ENCRYPTED_SECRET);

        assertThat(user.isTwoFactorEnabled()).isFalse();
        assertThat(user.getTotpSecretEnc()).isEqualTo(ENCRYPTED_SECRET);
    }

    @Test
    @DisplayName("startTwoFactorSetup replaces a pending secret")
    void startSetupReplacesPendingSecret() {
        User user = new User(EMAIL, HASH, Role.USER);
        user.startTwoFactorSetup(ENCRYPTED_SECRET);

        user.startTwoFactorSetup("v1:other");

        assertThat(user.getTotpSecretEnc()).isEqualTo("v1:other");
    }

    @Test
    @DisplayName("enableTwoFactor turns two-factor on and stores the time and step")
    void enableTwoFactor() {
        User user = new User(EMAIL, HASH, Role.USER);
        LocalDateTime at = LocalDateTime.of(2026, 10, 30, 12, 0);
        user.startTwoFactorSetup(ENCRYPTED_SECRET);

        user.enableTwoFactor(at, STEP);

        assertThat(user.isTwoFactorEnabled()).isTrue();
        assertThat(user.getTotpEnabledAt()).isEqualTo(at);
        assertThat(user.getTotpLastStep()).isEqualTo(STEP);
    }

    @Test
    @DisplayName("enableTwoFactor without a started setup throws")
    void enableWithoutSetupThrows() {
        User user = new User(EMAIL, HASH, Role.USER);
        LocalDateTime at = LocalDateTime.now();

        assertThatThrownBy(() -> user.enableTwoFactor(at, STEP)).isInstanceOf(IllegalStateException.class);
        assertThat(user.isTwoFactorEnabled()).isFalse();
    }

    @Test
    @DisplayName("enableTwoFactor twice throws")
    void enableTwiceThrows() {
        User user = new User(EMAIL, HASH, Role.USER);
        LocalDateTime at = LocalDateTime.now();
        user.startTwoFactorSetup(ENCRYPTED_SECRET);
        user.enableTwoFactor(at, STEP);

        assertThatThrownBy(() -> user.enableTwoFactor(at, STEP)).isInstanceOf(IllegalStateException.class);
    }

    @Test
    @DisplayName("startTwoFactorSetup while two-factor is on throws and keeps the secret")
    void startSetupWhileEnabledThrows() {
        User user = new User(EMAIL, HASH, Role.USER);
        user.startTwoFactorSetup(ENCRYPTED_SECRET);
        user.enableTwoFactor(LocalDateTime.now(), STEP);

        assertThatThrownBy(() -> user.startTwoFactorSetup("v1:other")).isInstanceOf(IllegalStateException.class);
        assertThat(user.getTotpSecretEnc()).isEqualTo(ENCRYPTED_SECRET);
    }

    @Test
    @DisplayName("disableTwoFactor clears everything and can be called twice")
    void disableTwoFactor() {
        User user = new User(EMAIL, HASH, Role.USER);
        user.startTwoFactorSetup(ENCRYPTED_SECRET);
        user.enableTwoFactor(LocalDateTime.now(), STEP);

        user.disableTwoFactor();
        user.disableTwoFactor();

        assertThat(user.isTwoFactorEnabled()).isFalse();
        assertThat(user.getTotpSecretEnc()).isNull();
        assertThat(user.getTotpEnabledAt()).isNull();
        assertThat(user.getTotpLastStep()).isNull();
    }

    @Test
    @DisplayName("toString never contains the encrypted secret")
    void toStringHidesSecret() {
        User user = new User(EMAIL, HASH, Role.USER);
        user.startTwoFactorSetup(ENCRYPTED_SECRET);

        assertThat(user.toString()).doesNotContain(ENCRYPTED_SECRET).contains(EMAIL);
    }
}
