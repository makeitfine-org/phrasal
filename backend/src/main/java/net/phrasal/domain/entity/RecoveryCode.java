package net.phrasal.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
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

/** A single-use 2FA recovery code of a user. Only the SHA-256 hash of the code is stored. */
@Entity
@Table(name = "user_recovery_codes")
@EntityListeners(AuditingEntityListener.class)
@Getter
@NoArgsConstructor
@ToString(of = {"id", "userId", "usedAt"})
@EqualsAndHashCode(of = {"id"})
public class RecoveryCode {

    private static final int CODE_HASH_LENGTH = 64;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_recovery_codes_seq")
    @SequenceGenerator(
            name = "user_recovery_codes_seq",
            sequenceName = "user_recovery_codes_id_seq",
            allocationSize = 1
    )
    private Long id;

    @Column(name = "user_id", nullable = false, updatable = false)
    private Long userId;

    @JdbcTypeCode(SqlTypes.CHAR)
    @Column(name = "code_hash", nullable = false, updatable = false, length = CODE_HASH_LENGTH)
    private String codeHash;

    @Column(name = "used_at")
    private LocalDateTime usedAt;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public RecoveryCode(Long userId, String codeHash) {
        this.userId = userId;
        this.codeHash = codeHash;
    }
}
