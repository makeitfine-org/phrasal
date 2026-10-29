---
id: TASK-108
title: Let users reset a forgotten password
status: In Progress
assignee: []
created_date: '2026-10-29T17:16:00Z'
updated_date: '2026-10-29T17:17:00Z'
labels:
  - multi-user
  - security
  - backend
  - frontend
  - e2e
milestone: m-0
dependencies:
  - TASK-107
documentation:
  - .claude/docs/blackbox/todos/reset-password-todos.md
priority: medium
type: feature
ordinal: 38000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Why**

Users who forget their password need a way back in. Split from task-100 so that password reset ships on its own.

**Decisions**
- Single-use, expiring emailed link; the token is stored hashed (reuses the user_tokens table with a new PASSWORD_RESET type).
- Forgot-password always returns the same 202 response, whether or not the email exists.
- A successful reset revokes all of the user's sessions and sends a "password changed" notice.
- Rate limits per IP and per email on forgot-password and per IP on reset.

**Depends on:** task-107 (email verification infrastructure).

**Plan:** `.claude/docs/blackbox/todos/reset-password-todos.md` (branch `password-reset`).
task-100 keeps HIBP, honeypot, account deletion, the 2FA step limit and the Traefik client-IP item.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 A user can request a password-reset email and set a new password via the link. The link works once only and expires.
- [ ] #2 Forgot-password returns identical responses for existing and non-existing emails.
- [ ] #3 After a successful password reset, all of the user's sessions are invalidated and a 'password changed' notice is emailed.
- [ ] #4 Forgot and reset requests beyond the configured limits return 429 ProblemDetail, per client IP and per email (forgot only).
- [ ] #5 Unit and integration tests cover token single-use and expiry, session invalidation, weak-password rejection that keeps the token, and the 429 limits.
- [ ] #6 E2E: a forgot-password scenario receives the email via Mailpit, resets the password and logs in with the new one (API and browser).
- [ ] #7 Frontend has Forgot password and Reset password pages and a login-page link, with Vitest tests.
- [ ] #8 README.md, backend/CLAUDE.md, frontend/CLAUDE.md and e2e/CLAUDE.md document the flow and rate limits.
- [ ] #9 `make clean build` passes
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implementation plan: `reset-password-todos.md` (branch `password-reset`).
<!-- SECTION:NOTES:END -->
