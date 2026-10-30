---
id: TASK-100
title: >-
  Let users reset forgotten passwords, delete their account, and protect auth
  endpoints from abuse
status: In Progress
assignee: []
created_date: '2026-10-26T17:37:00Z'
updated_date: '2026-10-30T13:56:00Z'
labels:
  - multi-user
  - security
  - backend
  - infra
  - e2e
milestone: m-0
dependencies:
  - TASK-99
documentation:
  - >-
    .claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA
    and reliable storage for phrasal.md
  - ansible/roles/k3s/tasks/main.yml
priority: medium
type: feature
ordinal: 31000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Why**

Sign-up is public on the internet, so the auth endpoints will attract:
- credential stuffing
- password-reset spam
- bot registrations

Users also need a way back in when they forget a password. They need a way to delete their account too, which is basic GDPR.

**Confirmed decisions (approved plan, 2026-10-26)**

Password reset:
- Uses a single-use, expiring emailed link, with the token stored hashed.
- A successful reset logs the user out of all sessions.
- "Forgot password" returns the same response whether or not the email exists.

Password policy:
- Passwords are checked against known-breached passwords (Have I Been Pwned) **only** on register and reset, never on every login.
- If HIBP is unreachable, registration still proceeds.

Rate limiting:
- Limits apply per client IP and per email on register, login, forgot-password and the 2FA step.
- The counters are in-memory, which is fine because there is a single backend replica.
- Over-limit requests get 429 ProblemDetail.
- There is **no** per-account lockout, because an attacker could use it to lock out victims.

Bot protection:
- A honeypot field on registration, plus email verification.
- No CAPTCHA for now.

Client IP:
- Per-IP limits need the real client IP.
- With K3s ServiceLB, Traefik currently sees a pod IP for every visitor. The Traefik service must preserve the source IP (externalTrafficPolicy Local), managed in the Ansible k3s role.

Account deletion requires re-entering the password and removes all of the user's data.

**Depends on:** task-99 (users, sessions, email sending).

**Approved plan:** `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA and reliable storage for phrasal.md` (section P3)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 A user can request a password-reset email and set a new password via the link. The link works once only and expires.
- [ ] #2 Forgot-password returns identical responses for existing and non-existing emails.
- [ ] #3 After a successful password reset, all of the user's other sessions are invalidated.
- [x] #4 Register and reset reject passwords found in the breached-password check. If the check service is unreachable, the request is allowed.
- [x] #5 Repeated attempts on register, login, forgot-password and the 2FA step beyond the configured limits return 429 ProblemDetail, per client IP and per email.
- [x] #6 A registration that fills the honeypot field is silently ignored and does not create an account.
- [x] #7 A logged-in user can delete their account after confirming their password. Their user row and all dependent data are removed.
- [x] #8 Behind Traefik in K3s, the backend sees the real client IP, verified in backend logs. The change is codified in the Ansible k3s role.
- [x] #9 Unit and integration tests cover: token single-use and expiry, session invalidation on reset, the 429 limits, the breached-password rejection (checker mocked) and account deletion.
- [ ] #10 E2E: a forgot-password scenario receives the email via Mailpit, resets the password and logs in with the new one.
- [x] #11 README.md and backend/CLAUDE.md document the rate limits and password policy. ansible/README.md documents the Traefik change.
- [x] #12 `make clean build` passes
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Ready from task-107 for password reset: user_tokens table + TokenType (add PASSWORD_RESET), SecureTokenGenerator, EmailSender port with SMTP/logging adapters, VerificationEmailComposer pattern, after-commit async mail events, and the resend/verify rate-limit setup.

2026-10-29: password reset split out to TASK-108 (AC #1, #2, #3, #10 and the forgot/reset parts of #5, #9, #11 move there). This task keeps HIBP, honeypot, account deletion, the 2FA step limit, the Traefik client-IP item and the remaining rate-limit/docs parts.

2026-10-29: password reset is implemented in TASK-108 (branch `password-reset`; docs in README 'Password reset' and docs/diagrams/password-reset-flow.md). The AC above that cover reset (#1, #2, #3, #10 and the forgot/reset parts of #5, #9, #11) stay unchecked here and are tracked in TASK-108; the other AC are still open.

2026-10-29: the 2FA-step part of AC #5 (rate limits two-factor-per-ip / two-factor-per-user) is planned in TASK-101's `.claude/docs/blackbox/todos/2FA-todos.md` (branch `two-factor`).

2026-10-30: the 2FA-step rate limit (part of AC #5) is done in task-101: `two-factor-per-user` (5 / 15 min, shared by confirm, login/2fa, disable, recovery-codes) and `two-factor-per-ip` (20 / 5 min).

2026-10-30: the remaining AC (#4 HIBP, rest of #5, #6 honeypot, #7 deletion, #8 client-IP proof, #9, #11, #12) are planned in `.claude/docs/blackbox/todos/account-funcs-todos.md` (branch `account-settings`). Phase 0 decisions: all accepted as planned (POST endpoints, delete needs password + 2FA code when on, admins get 403, HIBP fails open and is on by default but off in test/compose, silent honeypot).

2026-10-30: change password and change email are a separate task, TASK-109; it shares the `reauth-per-user` limit with account deletion.

2026-10-30: implemented on branch `account-settings` (commits 96903e9, 98b9568 plus the docs commit): HIBP `BreachedPasswordChecker` + `PasswordBreachGuard` (fails open, 2s timeout, off in test/compose); honeypot `RegisterRequest.website`; `POST /api/v1/me/delete` (password + 2FA code when on; ADMIN gets 403); `RateLimiter` logs every 429 (rule name, client IP only for *-per-ip rules); limits reviewed, no gaps; `reauth-per-user` and `email-change-per-email` added. AC #8: code and ansible/README proof instructions done; the real prod proof is Phase 11 of account-funcs-todos.md. Docs: README 'Account settings', backend/frontend/e2e CLAUDE.md, docs/diagrams/account-management-flow.md. AC #12 is checked after the Phase 10 build.
<!-- SECTION:NOTES:END -->
