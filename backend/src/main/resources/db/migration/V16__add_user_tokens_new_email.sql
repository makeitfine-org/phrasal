-- Email change: the pending new address travels with its one-time token.
ALTER TABLE user_tokens
    ADD COLUMN new_email VARCHAR(254),
    ADD CONSTRAINT chk_user_tokens_new_email
        CHECK ((type = 'EMAIL_CHANGE') = (new_email IS NOT NULL)),
    ADD CONSTRAINT chk_user_tokens_new_email_lower
        CHECK (new_email = LOWER(new_email));
