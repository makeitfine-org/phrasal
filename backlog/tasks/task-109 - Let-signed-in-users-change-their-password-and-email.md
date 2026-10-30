---
id: TASK-109
title: Let signed-in users change their password and email
status: In Progress
assignee: []
created_date: '2026-10-30T11:34:00Z'
updated_date: '2026-10-30T13:56:00Z'
labels:
  - multi-user
  - security
  - backend
  - frontend
  - e2e
milestone: m-0
dependencies:
  - TASK-99
  - TASK-107
documentation:
  - .claude/docs/blackbox/todos/account-funcs-todos.md
  - >-
    .claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA
    and reliable storage for phrasal.md
priority: medium
type: feature
ordinal: 31500
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Why**

Signed-in users can reset a forgotten password (task-108), but they can't change a password they know or move the account to another email address. Both are basic account settings. A password change also has to close the user's other sessions, in case one of them was stolen.

**Confirmed decisions (Phase 0 of account-funcs-todos.md, 2026-10-30)**

1. Endpoints. All use POST and need CSRF:
   - `POST /api/v1/me/password` `{currentPassword, newPassword}` → `204` with a new `SESSION` cookie
   - `POST /api/v1/me/email` `{newEmail, currentPassword}` → `202` with the same text as register
   - `POST /api/v1/auth/confirm-email-change` `{token}`, public → `204`
   - Errors: `400` validation (`errors.newPassword` / `errors.newEmail`), `400 wrong-password`, `403 admin-account-managed`, `400 email-change-link-invalid` / `-expired`, `409 email-change-conflict`, `429`
2. Proving ownership:
   - both changes need the current password
   - no 2FA code is asked, because the session already passed 2FA at login
3. Rate limits:
   - `reauth-per-user` (5 / 15 min, keyed by user id) is shared by `/me/password`, `/me/email` and `/me/delete`; it is checked before the password
   - `email-change-per-email` (3 / 1 h, keyed by the new address) stops inbox flooding
   - confirm reuses `verify-per-ip`
4. Change password:
   - the new password must pass the password policy, must not contain the email, must differ from the current one, and must pass the breach check (task-100)
   - on success the session id rotates, every other session is closed and a "password changed" notice is sent
5. Change email, confirmed by a link sent to the NEW address:
   - storage: `TokenType.EMAIL_CHANGE`, Flyway V16 adds `user_tokens.new_email`, TTL 1 h
   - if the address is taken, the "account exists" notice goes there instead and no token is made, so nobody can find out which addresses have accounts
   - confirming sets the new email, which stays verified, then invalidates the old address's tokens, closes every session and sends a notice to the OLD address
   - 2FA keeps working, because its encryption is tied to the user id, not the email
6. Admin accounts (plan decision 7) get `403 admin-account-managed`, because `AdminAccountInitializer` would undo the change at the next start. The UI hides the sections for admins.

Plan decision 6 (account deletion) and the abuse protection are tracked in task-100.

**Plan:** `.claude/docs/blackbox/todos/account-funcs-todos.md` (Phases 1-3, branch `account-settings`)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 A signed-in user can change their password by confirming the current one. Their other sessions are closed and a notice mail is sent.
- [x] #2 A signed-in user can change their email through a link sent to the new address. Nobody can find out which addresses have accounts. On confirmation every session is closed and the old address gets a notice.
- [x] #3 The three account endpoints (/me/password, /me/email, /me/delete) share a per-user rate limit that returns 429 ProblemDetail.
- [x] #4 Admin accounts are refused with 403 admin-account-managed.
- [x] #5 Unit, integration, Vitest and e2e tests cover the new endpoints and screens.
- [x] #6 README.md and the CLAUDE.md files are updated.
- [x] #7 `make clean build` passes
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-10-30: implemented on branch `account-settings` (commits f9957e2, 594a57c, 96903e9). AccountController (/me/password|email|delete), AccountService, EmailChangeService, AccountChecks, V16 user_tokens.new_email, ChangePasswordForm/ChangeEmailForm/ConfirmEmailChangePage, e2e features account-api/* and frontend/account-settings.feature. Docs in README 'Account settings' and docs/diagrams/account-management-flow.md. AC #7 is checked after the Phase 10 build.
<!-- SECTION:NOTES:END -->
