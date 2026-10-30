-- Google sign-in (task-104): Google's stable account id ("sub" claim). NULL = never signed in with Google.
ALTER TABLE users
    ADD COLUMN google_subject VARCHAR(255);

-- Postgres allows many NULLs in a unique index, so no partial index is needed.
CREATE UNIQUE INDEX ux_users_google_subject ON users (google_subject);
