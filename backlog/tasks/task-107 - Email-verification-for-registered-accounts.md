---
id: TASK-107
title: Email verification for registered accounts
status: In Progress
assignee: []
created_date: '2026-10-27T20:22:00Z'
updated_date: '2026-10-28T14:32:00Z'
labels:
  - multi-user
  - security
  - backend
  - frontend
  - e2e
milestone: m-0
dependencies:
  - TASK-99
  - TASK-106
documentation:
  - multiuser-todos.md
  - docs/diagrams/auth-flow.md
  - >-
    .claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA
    and reliable storage for phrasal.md
priority: medium
type: feature
ordinal: 37000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Deferred from task-99 (scope reduction 2026-10-27): accounts are usable right after sign-up. Add email verification so users must confirm their address before logging in.

Scope:
- Verification token table (new Flyway migration), verify and resend-verification endpoints, login only after verification.
- Register and resend-verification respond identically whether or not the email exists (no account enumeration). Today register returns 409 on a duplicate email; this task changes that.
- SMTP sending; Mailpit in docker-compose for local dev and e2e; a logging mode that prints the links when mail is disabled (e.g. minikube).
- New env vars (mail settings, app base URL) wired into docker-compose.yml, k8s/base, prod secret generation and .github/workflows/ci_cd.yml.
- Production SMTP credentials come from task-106.
- Frontend: verification result page and a resend action.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 A visitor can register with email + password. They receive a verification email, and they can log in only after verifying.
- [ ] #2 Register and resend-verification return identical responses for existing and non-existing emails (no account enumeration).
- [ ] #3 Mailpit runs in docker-compose, and the e2e suite can read verification emails from it.
- [ ] #4 E2E: an API scenario registers a user, verifies via Mailpit, logs in and runs an authenticated write.
- [ ] #5 Mail settings and the app base URL are wired into docker-compose.yml, k8s/base configmap/secret, the prod secret generation and .github/workflows/ci_cd.yml.
- [ ] #6 Unit and integration tests cover verify, resend and the no-enumeration rule. JaCoCo 85% per package is met.
- [ ] #7 README.md, backend/CLAUDE.md and e2e/CLAUDE.md document the verification flow and local Mailpit usage.
- [ ] #8 `make clean build` passes
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implementation plan: .claude/docs/blackbox/todos/email-verification-on-server-multiuser-todos.md (branch email-verification)
<!-- SECTION:NOTES:END -->
