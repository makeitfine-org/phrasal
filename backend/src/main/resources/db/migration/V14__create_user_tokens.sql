CREATE TABLE user_tokens
(
    id         BIGSERIAL PRIMARY KEY,
    user_id    BIGINT      NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    type       VARCHAR(30) NOT NULL,
    token_hash CHAR(64)    NOT NULL,
    expires_at TIMESTAMP   NOT NULL,
    used_at    TIMESTAMP,
    created_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX ux_user_tokens_token_hash ON user_tokens (token_hash);
CREATE INDEX idx_user_tokens_user_type ON user_tokens (user_id, type);
CREATE INDEX idx_user_tokens_expires_at ON user_tokens (expires_at);
