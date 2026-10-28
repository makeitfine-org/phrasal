CREATE TABLE user_quiz_progress
(
    id         BIGSERIAL PRIMARY KEY,
    user_id    BIGINT      NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    quiz_key   VARCHAR(50) NOT NULL,
    state      JSONB       NOT NULL,
    created_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version    BIGINT      NOT NULL DEFAULT 0,
    CONSTRAINT chk_user_quiz_progress_state_object CHECK (jsonb_typeof(state) = 'object')
);

CREATE UNIQUE INDEX ux_user_quiz_progress_user_quiz ON user_quiz_progress (user_id, quiz_key);
