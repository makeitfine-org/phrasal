---
id: TASK-99
title: >-
  Let visitors register and log in with email + password; restrict content edits
  to admins
status: To Do
assignee: []
created_date: '2026-10-26T17:37:00Z'
updated_date: '2026-10-26T17:57:00Z'
labels:
  - multi-user
  - security
  - backend
  - frontend
  - e2e
milestone: m-0
dependencies:
  - TASK-98
documentation:
  - >-
    .claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA
    and reliable storage for phrasal.md
  - backend/CLAUDE.md
  - frontend/CLAUDE.md
  - e2e/CLAUDE.md
priority: high
type: feature
ordinal: 30000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Why**

Phrasal has no authentication. There is no Spring Security, no users table and no sessions. Anyone on the internet can POST, PUT or DELETE phrasal verbs, grammar entries and verb details at `/api/v1/...`.

The product needs public sign-up for up to a few hundred users. This task is the foundation that every later multi-user task builds on: accounts, sessions, roles, email sending, and locking down writes.

**Confirmed decisions (approved plan 2026-10-26)**

- **Auth location:** inside Spring Boot 4.1.2 with Spring Security 7. No Keycloak and no hosted identity provider.
- **Sessions:**
  - Session-based auth, not JWT. The SPA and the API share one origin behind Traefik.
  - The session cookie is HttpOnly, Secure in prod and SameSite=Lax.
  - Sessions are stored in Postgres, so they survive redeploys.
  - CSRF uses the SPA cookie-to-header pattern.
- **Same origin only:** every browser call reaches the API on the same origin, through the Vite proxy in dev, nginx in docker-compose and Traefik in k8s. The existing cross-origin CORS mapping for localhost:5173/3000 is no longer needed and is removed.
- **Auth endpoints:**
  - JSON endpoints under `/api/v1/auth/*`, with no form-login redirects.
  - Register and resend-verification respond identically whether or not the email exists.
- **Roles:**
  - Two roles: USER and ADMIN. Admins are bootstrapped from a configured list of admin emails.
  - Content GET endpoints stay public, so anonymous visitors keep using quizzes with localStorage.
  - Content writes require ADMIN.
- **Session principal:** a small, serializable, stable value object, never a JPA entity. Otherwise stored sessions would break when classes change.
- **Errors:**
  - 401 and 403 are RFC 7807 ProblemDetail responses, consistent with `GlobalExceptionHandler`.
  - The handler's catch-all must not turn security exceptions into 500s.
- **Email:**
  - Sent over SMTP.
  - Production uses the provider credentials from task-106. That isn't needed to build or test this task.
  - Local dev and e2e use Mailpit in docker-compose.
  - A logging mode prints the links when mail is disabled, for example on minikube.
- **Passwords:** hashed with bcrypt. At least 10 characters and at most 72 UTF-8 bytes, the bcrypt input limit.

**Optional suggestion from the plan:** each integration test class currently starts its own Postgres container. Adding auth tests will multiply that, so consider a shared singleton-Testcontainer base class to keep build time down.

**Depends on**
- task-98, so that backups exist before real user data is stored.

**Unblocks**
- task-100, task-101, task-102 and task-103.
- Also task-77 (contests between users), which needs user identities.

**Approved plan:** `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA and reliable storage for phrasal.md` (section P2)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 A visitor can register with email + password. They receive a verification email, and they can log in only after verifying.
- [ ] #2 Passwords shorter than 10 characters or longer than 72 UTF-8 bytes are rejected at registration with a 400 ProblemDetail that names the rule.
- [ ] #3 Register and resend-verification return identical responses for existing and non-existing emails (no account enumeration).
- [ ] #4 Login sets an HttpOnly, SameSite=Lax session cookie, which is also Secure in prod. The session id changes on login (fixation protection). Logout invalidates the session.
- [ ] #5 `GET /api/v1/auth/me` returns the current user (id, email, role) when logged in, and 401 ProblemDetail when anonymous.
- [ ] #6 Sessions persist in Postgres and survive a backend restart.
- [ ] #7 Anonymous GET requests on all existing content endpoints still work unchanged.
- [ ] #8 POST, PUT and DELETE on content endpoints return 401 for anonymous users, 403 for USER, and succeed for ADMIN. All errors are RFC 7807 ProblemDetail.
- [ ] #9 State-changing requests without a valid CSRF token are rejected with 403.
- [ ] #10 The backend no longer allows cross-origin browser requests (the localhost:5173/3000 CORS mapping is removed). The app still works through the Vite dev server, docker-compose and k8s, because all calls are same-origin.
- [ ] #11 Accounts whose email appears in the configured admin list get the ADMIN role.
- [ ] #12 `/actuator/health` stays reachable for k8s probes and Docker healthchecks.
- [ ] #13 Mailpit runs in docker-compose, and the e2e suite can read verification emails from it.
- [ ] #14 New Flyway migrations (V9+) create the users, verification-token and session tables. Existing migrations are not edited.
- [ ] #15 The frontend API client supports POST, PUT and DELETE, sends credentials and the CSRF header, and exposes ProblemDetail errors.
- [ ] #16 New env vars (mail settings, app base URL, admin emails) are wired into docker-compose.yml, k8s/base configmap/secret, the prod secret generation and .github/workflows/ci_cd.yml.
- [ ] #17 Unit and integration tests cover register, verify, login, me and logout; the password length rule; the 401/403/CSRF cases; and anonymous reads. Existing CRUD integration tests are updated to authenticate as ADMIN. JaCoCo 85% per package is met.
- [ ] #18 E2E: an API scenario registers an admin, verifies via Mailpit, logs in and runs the existing CRUD feature. Another scenario asserts that an anonymous POST returns 401.
- [ ] #19 backend/CLAUDE.md, frontend/CLAUDE.md and README.md document the auth model, env vars and local Mailpit usage.
- [ ] #20 `make clean build` passes
<!-- AC:END -->
