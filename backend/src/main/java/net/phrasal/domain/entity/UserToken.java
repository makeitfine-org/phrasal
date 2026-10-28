package net.phrasal.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/** A single-use token sent to a user by email. Only the SHA-256 hash of the token is stored. */
@Entity
@Table(name = "user_tokens")
@EntityListeners(AuditingEntityListener.class)
@Getter
@NoArgsConstructor
@ToString(of = {"id", "userId", "type", "expiresAt", "usedAt"})
@EqualsAndHashCode(of = {"id"})
public class UserToken {

    private static final int TYPE_MAX_LENGTH = 30;
    private static final int TOKEN_HASH_LENGTH = 64;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_tokens_seq")
    @SequenceGenerator(
            name = "user_tokens_seq",
            sequenceName = "user_tokens_id_seq",
            allocationSize = 1
    )
    private Long id;

    @Column(name = "user_id", nullable = false, updatable = false)
    private Long userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, updatable = false, length = TYPE_MAX_LENGTH)
    private TokenType type;

    @JdbcTypeCode(SqlTypes.CHAR)
    @Column(name = "token_hash", nullable = false, updatable = false, length = TOKEN_HASH_LENGTH)
    private String tokenHash;

    @Column(name = "expires_at", nullable = false, updatable = false)
    private LocalDateTime expiresAt;

    @Column(name = "used_at")
    private LocalDateTime usedAt;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public UserToken(Long userId, TokenType type, String tokenHash, LocalDateTime expiresAt) {
        this.userId = userId;
        this.type = type;
        this.tokenHash = tokenHash;
        this.expiresAt = expiresAt;
    }

    public boolean isExpired(LocalDateTime now) {
        return !now.isBefore(expiresAt);
    }

    public boolean isUsed() {
        return usedAt != null;
    }

    public void markUsed(LocalDateTime now) {
        this.usedAt = now;
    }
}
