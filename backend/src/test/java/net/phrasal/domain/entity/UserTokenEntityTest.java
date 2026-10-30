package net.phrasal.domain.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("UserToken Entity")
class UserTokenEntityTest {

    private static final String HASH = "a".repeat(64);
    private static final LocalDateTime EXPIRES = LocalDateTime.of(2026, 10, 29, 12, 0);

    private static UserToken token() {
        return new UserToken(5L, TokenType.EMAIL_VERIFICATION, HASH, EXPIRES);
    }

    @Test
    @DisplayName("constructor sets the fields and the token starts unused")
    void constructor() {
        UserToken token = token();

        assertThat(token.getUserId()).isEqualTo(5L);
        assertThat(token.getType()).isEqualTo(TokenType.EMAIL_VERIFICATION);
        assertThat(token.getTokenHash()).isEqualTo(HASH);
        assertThat(token.getExpiresAt()).isEqualTo(EXPIRES);
        assertThat(token.isUsed()).isFalse();
    }

    @Test
    @DisplayName("toString never contains the token hash")
    void toStringHidesHash() {
        assertThat(token().toString()).doesNotContain(HASH).contains("userId=5");
    }

    @Test
    @DisplayName("a password reset token shows its type and still hides the hash")
    void passwordResetToStringHidesHash() {
        UserToken reset = new UserToken(5L, TokenType.PASSWORD_RESET, HASH, EXPIRES);

        assertThat(reset.getType()).isEqualTo(TokenType.PASSWORD_RESET);
        assertThat(reset.toString()).contains("PASSWORD_RESET").doesNotContain(HASH);
    }

    @Test
    @DisplayName("isExpired is false before expiry and true at and after expiry")
    void isExpired() {
        UserToken token = token();

        assertThat(token.isExpired(EXPIRES.minusSeconds(1))).isFalse();
        assertThat(token.isExpired(EXPIRES)).isTrue();
        assertThat(token.isExpired(EXPIRES.plusSeconds(1))).isTrue();
    }

    @Test
    @DisplayName("markUsed records the time and isUsed becomes true")
    void markUsed() {
        UserToken token = token();
        LocalDateTime now = EXPIRES.minusHours(1);

        token.markUsed(now);

        assertThat(token.isUsed()).isTrue();
        assertThat(token.getUsedAt()).isEqualTo(now);
    }

    @Test
    @DisplayName("tokens without an id are not equal to each other by content")
    void equalsUsesId() {
        UserToken first = token();
        UserToken second = token();

        assertThat(first).isEqualTo(first).isNotEqualTo("other");
        assertThat(first.hashCode()).isEqualTo(second.hashCode());
    }

    @Test
    @DisplayName("emailChange sets every field, including the pending address")
    void emailChangeFactory() {
        UserToken token = UserToken.emailChange(7L, "h".repeat(64), EXPIRES, "new@example.com");

        assertThat(token.getUserId()).isEqualTo(7L);
        assertThat(token.getType()).isEqualTo(TokenType.EMAIL_CHANGE);
        assertThat(token.getTokenHash()).isEqualTo("h".repeat(64));
        assertThat(token.getExpiresAt()).isEqualTo(EXPIRES);
        assertThat(token.getNewEmail()).isEqualTo("new@example.com");
    }

    @Test
    @DisplayName("other token types carry no pending address")
    void otherTypesHaveNoNewEmail() {
        assertThat(token().getNewEmail()).isNull();
    }
}
