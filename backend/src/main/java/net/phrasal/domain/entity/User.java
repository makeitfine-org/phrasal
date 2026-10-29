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
import jakarta.persistence.Version;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@ToString(of = {"id", "email", "role"})
@EqualsAndHashCode(of = {"id", "email"})
public class User {

    private static final int EMAIL_MAX_LENGTH = 254;
    private static final int PASSWORD_HASH_MAX_LENGTH = 100;
    private static final int ROLE_MAX_LENGTH = 20;
    private static final int TOTP_SECRET_MAX_LENGTH = 255;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(
            name = "user_seq",
            sequenceName = "users_id_seq",
            allocationSize = 1
    )
    private Long id;

    @Column(nullable = false, length = EMAIL_MAX_LENGTH)
    private String email;

    @Column(name = "password_hash", length = PASSWORD_HASH_MAX_LENGTH)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = ROLE_MAX_LENGTH)
    private Role role = Role.USER;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "email_verified_at")
    private LocalDateTime emailVerifiedAt;

    @Setter(AccessLevel.NONE)
    @Column(name = "totp_secret_enc", length = TOTP_SECRET_MAX_LENGTH)
    private String totpSecretEnc;

    @Setter(AccessLevel.NONE)
    @Column(name = "totp_enabled_at")
    private LocalDateTime totpEnabledAt;

    @Setter(AccessLevel.NONE)
    @Column(name = "totp_last_step")
    private Long totpLastStep;

    @Version
    private Long version;

    public User(String email, String passwordHash, Role role) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
    }

    public boolean isEmailVerified() {
        return emailVerifiedAt != null;
    }

    /**
     * Records the verification time once; later calls keep the first time.
     *
     * @param at moment the email was verified
     */
    public void markEmailVerified(LocalDateTime at) {
        if (emailVerifiedAt == null) {
            emailVerifiedAt = at;
        }
    }

    public boolean isTwoFactorEnabled() {
        return totpEnabledAt != null;
    }

    /**
     * Stores a new encrypted secret for enrollment. 2FA stays off until {@link #enableTwoFactor}.
     *
     * @param encryptedSecret the encrypted TOTP secret
     * @throws IllegalStateException if 2FA is already enabled
     */
    public void startTwoFactorSetup(String encryptedSecret) {
        if (isTwoFactorEnabled()) {
            throw new IllegalStateException("Two-factor authentication is already enabled");
        }
        this.totpSecretEnc = encryptedSecret;
        this.totpLastStep = null;
    }

    /**
     * Turns 2FA on for the pending secret.
     *
     * @param at   moment 2FA was enabled
     * @param step TOTP time step of the confirming code
     * @throws IllegalStateException if no setup is pending or 2FA is already enabled
     */
    public void enableTwoFactor(LocalDateTime at, long step) {
        if (totpSecretEnc == null) {
            throw new IllegalStateException("Two-factor setup has not been started");
        }
        if (isTwoFactorEnabled()) {
            throw new IllegalStateException("Two-factor authentication is already enabled");
        }
        this.totpEnabledAt = at;
        this.totpLastStep = step;
    }

    /** Turns 2FA off and forgets the secret; safe to call when 2FA is already off. */
    public void disableTwoFactor() {
        this.totpSecretEnc = null;
        this.totpEnabledAt = null;
        this.totpLastStep = null;
    }
}
