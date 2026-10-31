---
id: TASK-101
title: Add authenticator-app 2FA (TOTP) with recovery codes, mandatory for admins
status: Done
assignee: []
created_date: '2026-10-26T17:37:00Z'
updated_date: '2026-10-31T15:05:00Z'
labels:
  - multi-user
  - security
  - backend
  - e2e
milestone: m-0
dependencies:
  - TASK-100
references:
  - https://www.rfc-editor.org/rfc/rfc6238
  - https://github.com/jchambers/java-otp
documentation:
  - >-
    .claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA
    and reliable storage for phrasal.md
priority: medium
type: feature
ordinal: 32000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Why**

Users asked for two-factor authentication with Google Authenticator, Aegis or a similar app.

Admin accounts can change content that every visitor sees. A stolen admin password alone must not be enough to make those changes.

**Confirmed decisions (approved plan, 2026-10-26)**

- **Policy**
  - TOTP is optional for regular users.
  - TOTP is mandatory for ADMIN.
- **Admin rights**
  - An admin gets ADMIN rights only in a session where the TOTP step has been completed.
  - An admin who hasn't enrolled is treated as a USER. `/me` tells the client that enrollment is required.
- **Login flow**
  - The login is two steps. A correct password on a TOTP-enabled account creates a short-lived pending state of about 5 minutes. No authenticated session exists until a valid TOTP code or recovery code is submitted.
  - Spring Security 7's built-in MFA support is **not** used. It has no TOTP factor and it assumes redirect-based flows.
- **Code checking**
  - Codes follow RFC 6238 (30 s, 6 digits).
  - One time-step of clock drift is allowed either way.
  - A code that has already been used is rejected (replay protection).
- **Secret storage**
  - TOTP secrets are stored encrypted (AES-GCM). The key comes from a new secret env var.
  - The key must be kept in a password manager. Without it, restored backups can't verify TOTP, though recovery codes still work.
- **Recovery codes**
  - 10 single-use codes, stored hashed.
  - They are shown once at enrollment and can be regenerated.
- **Disabling TOTP** requires a valid current code.
- **Library:** use a maintained RFC 6238 library such as `com.eatthepath:java-otp`. `dev.samstevens.totp` is unmaintained, last released in 2020.
- **QR code:** the frontend renders it from the otpauth URI. The UI itself is task-103.

**Depends on**

- task-100: the 2FA step must be rate-limited, and that limiter comes from task-100.
- task-99: login and sessions.

**Approved plan:** `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA and reliable storage for phrasal.md`, section P4.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 A logged-in user can start 2FA setup. They receive an otpauth URI and secret, and 2FA becomes active only after they confirm a valid code.
- [x] #2 On confirmation the user receives 10 recovery codes, shown once. Only their hashes are stored.
- [x] #3 Logging in to a 2FA-enabled account with a correct password does not create an authenticated session until a valid TOTP code or unused recovery code is submitted. The pending state expires after about 5 minutes.
- [x] #4 A TOTP code that was already used is rejected. Codes within plus or minus one time step are accepted.
- [x] #5 Each recovery code works exactly once. A user can regenerate recovery codes, which invalidates the old ones.
- [x] #6 Disabling 2FA requires a valid current code.
- [x] #7 An ADMIN account without 2FA, or one that has not completed the TOTP step in the current session, gets 403 on content writes. After the TOTP step, writes succeed.
- [x] #8 TOTP secrets are encrypted at rest, and the database never holds a plaintext secret. The encryption key is a new secret env var wired into docker-compose, k8s base/prod and CI.
- [x] #9 A new Flyway migration adds the 2FA columns and the recovery code table. Existing migrations are not edited.
- [x] #10 Unit tests verify against RFC 6238 test vectors, plus replay, drift, encryption round-trip and recovery-code single use. Integration tests cover the full two-step login and admin enforcement.
- [x] #11 E2E: an admin enrolls in 2FA (codes generated in the test from the setup secret), logs in with a code, then performs CRUD successfully.
- [x] #12 README.md documents 2FA usage and the key backup requirement. backend/CLAUDE.md documents the 2FA design.
- [x] #13 `make clean build` passes
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-10-29: implementation plan: `.claude/docs/blackbox/todos/2FA-todos.md` (branch `two-factor`). Deviations from the plan, subject to confirmation in Phase 0.4: java-otp 0.4.0 (1.0.0 does not exist); endpoints under /api/v1/me/2fa/* with POST .../disable; setup asks for the current password; on/off notice emails.

2026-10-30: Phases 0-12 of `.claude/docs/blackbox/todos/2FA-todos.md` done on branch `two-factor`. Phase 0 decisions: java-otp 1.0.0 (supersedes the 0.4.0 note above) plus commons-codec; endpoints `/api/v1/me/2fa/*` with `POST .../disable`; setup needs the current password; notice mails on enable/disable. Migration V15 (also deletes admin sessions once). Seam for task-104: `SessionAuthenticator#startTwoFactorChallenge`. Open: GitHub Secret `TOTP_ENCRYPTION_KEY` must exist before the next tagged deploy (Phase 14); Phase 13 final verification. Do not tag a release from this branch before Phase 14: admin write clients now need 2FA (breaking).

Docs: README section 'Two-factor authentication (2FA)', backend/frontend/e2e CLAUDE.md, docs/diagrams/two-factor-flow.md, auth-flow.md.
<!-- SECTION:NOTES:END -->
