-- The global "learned" flag is replaced by per-user quiz progress (user_quiz_progress, V12).
DROP INDEX IF EXISTS idx_phrasal_verbs_is_learned;
ALTER TABLE phrasal_verbs DROP COLUMN is_learned;
