CREATE TABLE verb_details
(
    id         BIGSERIAL PRIMARY KEY,
    verb       VARCHAR(50) NOT NULL UNIQUE,
    label      VARCHAR(50) NOT NULL,
    particles  JSONB       NOT NULL DEFAULT '[]',
    sections   JSONB       NOT NULL DEFAULT '[]',
    created_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version    BIGINT      NOT NULL DEFAULT 0
);

CREATE INDEX idx_verb_details_verb ON verb_details (verb);
