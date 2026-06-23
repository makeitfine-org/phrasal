CREATE TABLE phrasal_verbs
(
    id            BIGSERIAL PRIMARY KEY,
    verb          VARCHAR(100) NOT NULL,
    definition    TEXT         NOT NULL,
    sentences     JSONB        NOT NULL DEFAULT '[]',
    words_to_hide JSONB        NOT NULL DEFAULT '[]',
    is_learned    BOOLEAN      NOT NULL DEFAULT false,
    created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version       BIGINT       NOT NULL DEFAULT 0
);
