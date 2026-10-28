-- Email verification (task-107). Accounts created before this migration are treated as verified.
ALTER TABLE users ADD COLUMN email_verified_at TIMESTAMP;
UPDATE users SET email_verified_at = created_at WHERE email_verified_at IS NULL;
