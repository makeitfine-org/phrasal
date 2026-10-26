---
id: TASK-101
title: Add authenticator-app 2FA (TOTP) with recovery codes, mandatory for admins
status: To Do
assignee: []
created_date: '2026-10-26T17:37:00Z'
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
- [ ] #1 A logged-in user can start 2FA setup. They receive an otpauth URI and secret, and 2FA becomes active only after they confirm a valid code.
- [ ] #2 On confirmation the user receives 10 recovery codes, shown once. Only their hashes are stored.
- [ ] #3 Logging in to a 2FA-enabled account with a correct password does not create an authenticated session until a valid TOTP code or unused recovery code is submitted. The pending state expires after about 5 minutes.
- [ ] #4 A TOTP code that was already used is rejected. Codes within plus or minus one time step are accepted.
- [ ] #5 Each recovery code works exactly once. A user can regenerate recovery codes, which invalidates the old ones.
- [ ] #6 Disabling 2FA requires a valid current code.
- [ ] #7 An ADMIN account without 2FA, or one that has not completed the TOTP step in the current session, gets 403 on content writes. After the TOTP step, writes succeed.
- [ ] #8 TOTP secrets are encrypted at rest, and the database never holds a plaintext secret. The encryption key is a new secret env var wired into docker-compose, k8s base/prod and CI.
- [ ] #9 A new Flyway migration adds the 2FA columns and the recovery code table. Existing migrations are not edited.
- [ ] #10 Unit tests verify against RFC 6238 test vectors, plus replay, drift, encryption round-trip and recovery-code single use. Integration tests cover the full two-step login and admin enforcement.
- [ ] #11 E2E: an admin enrolls in 2FA (codes generated in the test from the setup secret), logs in with a code, then performs CRUD successfully.
- [ ] #12 README.md documents 2FA usage and the key backup requirement. backend/CLAUDE.md documents the 2FA design.
- [ ] #13 `make clean build` passes
<!-- AC:END -->
