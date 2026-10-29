-- TOTP 2FA (task-101). The secret is AES-GCM encrypted by the backend; the key is not in the database.
ALTER TABLE users
    ADD COLUMN totp_secret_enc VARCHAR(255),
    ADD COLUMN totp_enabled_at TIMESTAMP,
    ADD COLUMN totp_last_step  BIGINT,
    ADD CONSTRAINT chk_users_totp_enabled_has_secret
        CHECK (totp_enabled_at IS NULL OR totp_secret_enc IS NOT NULL);

CREATE TABLE user_recovery_codes
(
    id         BIGSERIAL PRIMARY KEY,
    user_id    BIGINT    NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    code_hash  CHAR(64)  NOT NULL,
    used_at    TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX ux_user_recovery_codes_user_hash ON user_recovery_codes (user_id, code_hash);

-- Admin sessions created before 2FA hold ROLE_ADMIN without a second factor: force a new login.
DELETE FROM spring_session s USING users u WHERE s.principal_name = u.email AND u.role = 'ADMIN';
