# Multi-user accounts, TOTP 2FA and reliable storage for phrasal

## Context
Today phrasal is a single-user public site. It has no Spring Security and no users table. Anyone can POST, PUT or DELETE content at `https://phrasal.ddns.net/api/v1/...`. Quiz progress lives only in browser localStorage, and the one per-user field, `phrasal_verbs.is_learned`, is global. Prod Postgres is a single K3s pod on a 1 Gi `local-path` volume with **no backups**, and its credentials are probably still `postgres/postgres`.

The goal is public sign-up for a few hundred users, with:
- login by email + password or "Sign in with Google"
- optional TOTP 2FA (Google Authenticator, Aegis and similar), mandatory for admins
- learning progress saved per user
- user data stored reliably

### User decisions (2026-10-26)
- Audience: public, small scale.
- Sign-in: email + password, plus Google.
- 2FA: optional for users, required for ADMIN, with recovery codes.
- Engine: inside Spring Boot with Spring Security 7. No Keycloak and no hosted IdP.
- Database: **Postgres stays on the VPS, with off-site backups.** The two rejected options were Neon (serverless, free tier, cold starts) and DigitalOcean Managed PG (about $15/month). The data is a few MB, the in-cluster DB adds no latency, and a backup to a different provider covers the "VPS dies" case.
- Anonymous visitors keep using content and quizzes with localStorage. Logged-in users get server-side progress. Content writes are ADMIN-only.
- The user will buy a real domain, which is needed for SPF/DKIM email and a clean Google consent screen.

## Key design choices (verified against Spring Boot 4.1.2 / Security 7.1 via BOM + Context7)
1. **Session cookie, not JWT.**
   - The SPA and API share one origin behind Traefik.
   - The session cookie is HttpOnly, Secure (prod) and SameSite=Lax.
   - Sessions are stored in Postgres via `spring-boot-starter-session-jdbc`, so they survive redeploys.
   - CSRF uses `http.csrf(c -> c.spa())` (since Security 7.0): an `XSRF-TOKEN` cookie plus the `X-XSRF-TOKEN` header.
2. **JSON auth endpoints under `/api/v1/auth/*`** instead of form-login redirects.
   - Login runs `DaoAuthenticationProvider`, then `changeSessionId()`, then `HttpSessionSecurityContextRepository`.
   - Register, resend and forgot always return 202, so the API never reveals whether an email exists.
3. **TOTP is a pending-session state, not the Security 7 MFA API.** Security 7 MFA has no TOTP factor and assumes redirects.
   - A password or Google login on a TOTP-enabled account stores `PENDING_TOTP_USER_ID` and a timestamp, valid for 5 minutes.
   - `ROLE_ADMIN` is granted only after TOTP succeeds in that session.
   - An admin who hasn't enrolled gets `ROLE_USER` plus `mfaEnrollmentRequired: true`.
   - The write rule therefore stays a plain URL rule: `hasRole("ADMIN")`.
4. **TOTP implementation.**
   - Library: `com.eatthepath:java-otp:1.0.0`, which is maintained. `dev.samstevens.totp` was last released in 2020.
   - Base32 encoding comes from `commons-codec` (BOM-managed), and the otpauth URI is built by hand.
   - The secret is stored AES-GCM encrypted with key `TOTP_ENCRYPTION_KEY`, using a `v1:` prefix to allow key rotation.
   - Codes are accepted within ±1 time step, and any step ≤ `totp_last_step` is rejected to block replays.
   - 10 recovery codes, SHA-256 hashed, each usable once.
   - The QR code is rendered on the frontend with the `qrcode` npm package.
5. **Passwords.**
   - Hashing: `PasswordEncoderFactories.createDelegatingPasswordEncoder()` (bcrypt).
   - Length: at least 10 characters and at most 72 UTF-8 bytes, because of bcrypt's limit.
   - `HaveIBeenPwnedRestApiPasswordChecker` is called **only** on register and reset. It is not a bean, because as a bean it would run on every login. If HIBP is unreachable, the request proceeds.
6. **Google login** via `spring-boot-starter-security-oauth2-client`.
   - Endpoints are remapped to `/api/v1/auth/oauth2/authorization/*` and `/api/v1/auth/oauth2/code/*`, so ingress, nginx and the Vite proxy stay unchanged.
   - Accounts are linked by `users.google_subject`, falling back to email only if Google reports `email_verified`.
   - If the matched local account is unverified, its password is nulled. This blocks pre-registration hijacking.
7. **Abuse protection.**
   - Fixed-window limits per IP and per email, kept in an in-memory Caffeine cache (there is a single replica). Exceeding a limit returns 429 ProblemDetail.
   - A honeypot field on register, plus email verification.
   - No per-account lockout, because anyone could use it to lock out a victim.
   - No CAPTCHA for now.
   - Per-IP limits need the real client IP, so Traefik's ServiceLB is set to `externalTrafficPolicy: Local` via a K3s HelmChartConfig.
8. **Progress.**
   - The per-user "learned" state is the same concept as the quiz's `excluded` set. Drop `phrasal_verbs.is_learned` (it is false on every row) along with its index and the `?learned=` filter.
   - One table, `user_quiz_progress(user_id, quiz_key, state jsonb)`.
   - The client converts array **indices to stable verb/entry ids** before saving, so admin edits can't corrupt progress.
   - First-login import: GET returns 404, so the client PUTs its local state.
9. **Backups: a nightly `pg_dump` CronJob uploading to Backblaze B2, plus a dump just before every deploy.** CloudNativePG was rejected: it needs two extra operators and cert-manager in minikube, and restores are harder. That is too much for a few-MB database on a node that may be small.
10. **Principal and errors.**
    - The session principal is a small `Serializable` `AuthenticatedUser` record with a fixed `serialVersionUID`, never a JPA entity.
    - 401 and 403 are returned as ProblemDetail through an entry point and an AccessDeniedHandler. `GlobalExceptionHandler` gets security handlers ahead of its catch-all.

## Phases (each becomes one backlog task; every task's AC includes `make clean build` passes)

### P0: Prerequisites (user actions, no code)
- **Check the VPS:** `nproc; free -h; kubectl top node`. If it is 1 CPU / 1 GB, upgrade before P2.
- **Domain:** buy it and point an A record at the VPS.
- **Email:** create a Brevo account (free) and add the SPF, DKIM and DMARC records.
- **Google Cloud:** create an OAuth client. Redirect URIs are `https://<domain>/api/v1/auth/oauth2/code/google` and the localhost:3000 and :5173 equivalents.
- **Backups:** create a B2 bucket with a 30-day lifecycle rule and a bucket-scoped key.
- **Secrets:** add the new GitHub Secrets (listed per phase).

### P1: DB reliability (before any user data exists)
- **CronJob:** `k8s/overlays/prod/backup-cronjob.yaml`, running daily at 03:00.
  - An initContainer (`postgres:16-alpine`) runs `pg_dump -Fc`.
  - A container (`rclone/rclone`) copies the dump to `b2:<bucket>/phrasal/<ts>.dump`.
  - Credentials live in Secret `backup-secrets`. Register it in `k8s/overlays/prod/kustomization.yaml`.
- **Pre-deploy dump:** in `.github/workflows/ci_cd.yml`, the deploy job runs `kubectl create job --from=cronjob/pg-backup pre-deploy-<tag>` and waits for it before `apply`.
- **Keep the volume:** set the PV reclaim policy to `Retain`.
- **Rotate the DB password:** run `ALTER ROLE` via `kubectl exec`, then update `DB_PASSWORD` in GitHub Secrets. `POSTGRES_PASSWORD` only applies on an empty PGDATA, so changing the secret alone does nothing.
- **Runbook:** `aux/docs/runbooks/db-restore.md` (scale backend to 0, fetch the dump, `pg_restore --clean --if-exists`, scale back up), plus a quarterly restore drill.
- **Optional:** a free healthchecks.io ping, to get alerted when a dump fails.
- **Secrets:** `B2_KEY_ID`, `B2_APP_KEY`, `BACKUP_BUCKET`.

### P2: Security baseline and accounts
**Dependencies**
- `spring-boot-starter-security`
- `spring-boot-starter-session-jdbc`
- `spring-boot-starter-mail`
- `spring-boot-starter-security-test` (test scope)

**Migrations**
- `V9__create_users.sql`: email lowercased + unique index, nullable `password_hash`, `email_verified_at`, `role`, audit/version columns.
- `V10__create_spring_session_tables.sql`: copied from the spring-session-jdbc jar's PostgreSQL schema. Set `spring.session.jdbc.initialize-schema: never`.
- `V11__create_user_tokens.sql`: `type`, SHA-256 `token_hash`, `expires_at`, `used_at`.

**Backend files** (all under `net.phrasal`)
- `config/SecurityConfig`:
  - `GET /api/**` is public, `/api/v1/auth/**` is public, `/actuator/health/**` is public.
  - Content POST, PUT and DELETE require `hasRole("ADMIN")`.
  - Turns on `csrf.spa()` and sets the session cookie flags.
- `config/SecurityProperties`: `phrasal.security.admin-emails`.
- Remove the CORS mapping from `config/WebMvcConfig`, since everything is same-origin.
- `domain/entity/User`, `UserToken` and their repositories.
- `application/service/AuthService`.
- DTO records: `RegisterRequest`, `LoginRequest`, `LoginResponse`, `MeResponse`.
- `infrastructure/mail/EmailSender`, with an SMTP implementation and a logging implementation used when `phrasal.mail.enabled=false`.
- `infrastructure/security/JpaUserDetailsService` (`enabled` = email verified) and `AuthenticatedUser`.
- `presentation/rest/AuthController`: register, verify-email, resend, login, logout, `me`.
- `presentation/security/ProblemDetailAuthenticationEntryPoint` and `ProblemDetailAccessDeniedHandler`.
- `infrastructure/exception/GlobalExceptionHandler`: add security handlers ahead of the catch-all.

**Compose and frontend**
- `docker-compose.yml`: add `axllent/mailpit` on ports 1025/8025.
- `frontend/src/api/client.ts`:
  - add `post`, `put` and `del`
  - send `credentials: 'same-origin'` and the CSRF header read from the cookie
  - `ApiError` carries the ProblemDetail

**Env**
`MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_FROM`, `PHRASAL_MAIL_ENABLED`, `APP_BASE_URL`, `PHRASAL_ADMIN_EMAILS`. Each goes into compose, `k8s/base/backend-configmap.yaml`/`backend-secret.yaml`, the prod patch and CI.

**Tests**
- Unit: `AuthService`, token hashing.
- Integration:
  - register → verify → login → me → logout
  - 401/403 ProblemDetails
  - CSRF rejection
  - anonymous GET works
  - Existing CRUD integration tests switch to `with(user().roles("ADMIN")).with(csrf())`.
  - Consider adding a shared singleton-Testcontainer base class.
- e2e:
  - `e2e/src/support/mailpit-client.ts` and `src/steps/auth-api.steps.ts`
  - `crud.feature` runs with an admin session
  - new scenario: "anonymous POST → 401"

### P3: Password reset and abuse protection
- **Password reset:** `application/service/PasswordResetService`, with forgot and reset endpoints. A reset invalidates every session for that user through `FindByIndexNameSessionRepository`.
- **Rate limiting:** `infrastructure/security/RateLimiter`, a Caffeine fixed window per IP and per email. Covers register, login, forgot and totp. Returns 429 ProblemDetail.
- **Password checks:** `PasswordPolicy` (length + HIBP), plus a honeypot field on `RegisterRequest`.
- **Account deletion:** `DELETE /api/v1/account` (requires the password). This covers the GDPR basics.
- **Ansible:** the k3s role gets a Traefik `HelmChartConfig` with `externalTrafficPolicy: Local`.
- **Tests:**
  - tokens are single-use and expire
  - a reset kills other sessions
  - the 6th attempt returns 429
  - pwned passwords are rejected (with a mocked checker)
  - e2e: the forgot-password email arrives in Mailpit and the reset works

### P4: TOTP 2FA and recovery codes
- **Dependencies:**
  - `com.eatthepath:java-otp:1.0.0`
  - `commons-codec`
  - frontend: `qrcode` + `@types/qrcode`
  - e2e: `otpauth`
- **Migration:** `V12__add_user_totp.sql` adds `totp_secret_enc`, `totp_enabled_at` and `totp_last_step` to `users`, and creates table `user_recovery_codes`.
- **Backend files:**
  - `infrastructure/security/AesGcmEncryptor` and `TotpVerifier`
  - `application/service/TotpService`
  - `presentation/rest/AccountController`: `POST /account/2fa/setup`, `/confirm`, `DELETE /account/2fa` (requires a code), and recovery-code regeneration
  - `POST /auth/login/totp`, which accepts a code or a recovery code
- **Env:** `TOTP_ENCRYPTION_KEY` (32 bytes, base64). **Keep a copy in your password manager.** A restored DB is useless for TOTP without it.
- **Tests:**
  - RFC 6238 vectors
  - replays are rejected
  - a recovery code works once
  - an admin without 2FA gets 403 on writes
  - e2e: an admin enrolls, then does CRUD using generated codes

### P5: Google login (needs the domain from P0)
- **Dependency:** `spring-boot-starter-security-oauth2-client`.
- **Migration:** `V13__add_user_google_subject.sql`.
- **Success handler:** `presentation/security/OAuth2LoginSuccessHandler`.
  - Finds the user by subject, then by verified email, otherwise creates a new user.
  - If the matched account is unverified, its password is nulled.
  - If TOTP is on, it sets the pending state and redirects to `/login/2fa`; otherwise it redirects to `/`.
- **Failure handler:** redirects to `/login?error=google`.
- **Config:** `spring.security.oauth2.client.registration.google.*`, with `redirect-uri: {baseUrl}/api/v1/auth/oauth2/code/{registrationId}`.
- **Env:** `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
- **Tests:** integration tests use `oidcLogin()` for the new, link, unverified and TOTP-pending branches.
- **Risk:** check that the prod redirect URI comes out as `https`. It depends on `forward-headers-strategy: native`.

### P6: Server-side progress (backend)
- **Migrations:**
  - `V14__create_user_quiz_progress.sql`: PK `(user_id, quiz_key)`, `state jsonb`, `version`, `updated_at`, FK `ON DELETE CASCADE`.
  - `V15__drop_phrasal_verbs_is_learned.sql`
- **Backend files:** the `UserQuizProgress` entity and repository, `QuizProgressService`, and `presentation/rest/QuizProgressController` with `GET/PUT /api/v1/me/quiz-progress/{quizKey}`.
  - Quiz keys are whitelisted.
  - The body must be a JSON object of at most 64 KB.
  - The last write wins.
- **Remove `isLearned`** from `PhrasalVerb`, the DTOs, the mapper, the `learned` param and the tests.
- **Tests:** anonymous → 401, no access to another user's progress, the size limit, and 404 before the first save.

### P7: Frontend auth UI and progress sync
- **Auth state:** `src/auth/AuthContext.tsx` + `useAuth.ts`. It calls `/me` on boot and again after login and logout, which refreshes the CSRF token.
- **Pages:** `LoginPage`, `LoginTotpPage`, `RegisterPage`, `VerifyEmailPage`, `ForgotPasswordPage`, `ResetPasswordPage`, `AccountSecurityPage` (QR code, recovery-codes download).
- **Header:** a user menu and the Google button (`href="/api/v1/auth/oauth2/authorization/google"`).
- **Routes:** added in `src/main.tsx`.
- **Progress sync:**
  - New `src/api/quizProgressApi.ts`.
  - `src/hooks/useQuiz.ts` gets an optional sync adapter: load on login, a debounced (2 s) PUT, index↔id mapping, and the first-login import.
  - `src/api/phrasalVerbsApi.ts` drops the `isLearned` split.
- **Docs:** update `frontend/CLAUDE.md` (allow AuthContext, React 19).
- **Tests:**
  - Vitest: one test file per new page and hook; the client's CSRF and 401 handling; debounce and import.
  - e2e: `features/frontend/auth.feature`, and `progress-sync.feature` (progress survives clearing localStorage).

### P8: Prod cutover and hardening
- **Ingress:** switch the host to the new domain. Keep `phrasal.ddns.net` as a 301 redirect, or drop it.
- **Prod config:** `server.error.include-message: never`.
- **CI deploy:** deploy over Tailscale or SSH, then firewall port 6443.
- **Docs:**
  - Update `README.md`, `backend/CLAUDE.md` (security section) and `aux/docs/k3sconf.md`.
  - Create `docs/diagrams/auth-flow.md` (Mermaid), as the blackbox policy requires.
- **Smoke checks:** mail-tester.com shows SPF/DKIM pass, the Google consent screen is published, and the backup job has run.

## Execution workflow after approval
1. Write the P1–P8 backlog tasks.
   - The backlog.md MCP server is currently disconnected (`backlog` is not in PATH). Fix that first, or I'll write the task files following the existing `backlog/tasks/task-NN - Title.md` format.
   - P0 becomes a checklist in P1's task.
2. Implement one phase at a time, in order: P1, then P2, P3, P4, P6, P7, P5, P8. Google login (P5) waits for the domain.
   - Use the `security-engineer` and `spring-boot-engineer` agents for backend work and `test-automator` for e2e.
   - Look up docs with Context7 before writing any library API code.
3. After each phase, stop for your review and commit approval: `type(scope): description`, at most 80 characters, no Co-Authored-By trailer.
4. Append a blackbox `session-log.md` entry at the end of the session.

## Verification
- **Every phase:** `make clean build`. This runs backend `mvn verify` with JaCoCo 85% per package and Checkstyle, the frontend build and tests, docker rebuild, and the e2e tests.
- **P1:** trigger the job manually (`kubectl create job --from=cronjob/pg-backup test-1`) and confirm the dump lands in B2. Then restore it into a throwaway `postgres:16-alpine` container and compare row counts.
- **P2–P4 (local):**
  1. Run `make dockerAll`.
  2. Register at http://localhost:3000.
  3. Open the email in Mailpit (http://localhost:8025) and verify.
  4. Log in and enable 2FA by scanning the QR code with Google Authenticator.
  5. Log out, then log back in with a TOTP code. Repeat once with a recovery code.
  6. As an admin without 2FA, a content POST returns 403. With 2FA it succeeds.
- **P5:** sign in with Google on localhost and on prod, link an existing verified account, and confirm that a 2FA-enabled user is asked for the code.
- **P6/P7:** while logged in, answer quiz items, clear localStorage, reload, and confirm the progress is restored. As an anonymous visitor, confirm the quiz still works.
- **Prod:** `curl -X POST https://<domain>/api/v1/phrasal-verbs` returns 401. Check that the session cookie has the `Secure; HttpOnly; SameSite=Lax` flags.

## Mutations Log

| Date | Type | Change | Reason |
|---|---|---|---|
| 2026-10-27 | split | P2 split: email verification + Mailpit deferred; admin bootstrap via config instead of admin-email list | Smaller first release; no email provider yet (task-106) |
| 2026-10-28 | split | P6/P7 split: progress sync implemented alone. Surrogate id + upsert instead of a composite PK. Migrations V11/V12 instead of V14/V15. Logout clears the local copy. | Smaller release; simpler last-write-wins model |
| 2026-10-28 | split | P2 remainder done as task-107: verify link points to the SPA; register 202 with existing-account notice; tokens in generic user_tokens; migrations V13/V14 instead of V9/V11 parts. | Avoids account enumeration; reusable token table for password reset (task-100) |
| 2026-10-29 | split | P3 split: password reset done alone as task-108 (reuses user_tokens, no migration; reset verifies unverified accounts; 1 h TTL); HIBP, honeypot, deletion stay in task-100 | Smaller release; token table already exists from task-107 |
| 2026-10-30 | split | P4 done as task-101 + 2FA screens of task-103: java-otp 1.0.0; endpoints under /api/v1/me/2fa + POST disable; setup needs the password; confirm elevates the session; V15 instead of V12 (also deletes admin sessions) | Reuse the /me/** rule; prevent lockout via a stolen session |
| 2026-10-30 | split | P3 rest + account screens of P7 done as task-100 + new task: change password/email added (not in the plan); POST /me/delete instead of DELETE /account; email change via link to the new address (V16 user_tokens.new_email); admin accounts excluded; HIBP fails open, off in compose | Complete account self-service before public launch |
| 2026-10-30 | split | P5 done as task-104: own ClientRegistrationRepository behind GOOGLE_LOGIN_ENABLED + GET /auth/providers; redirect URI from APP_BASE_URL; ADMIN accounts refused; Google-only accounts set a password via reset link; mock-oauth2-server in compose; V17 instead of V13. Todo-level: test-profile yml moved from 6.1.2 to 5.4.2; inserted fix 6.2.7 (`PendingTwoFactorLogin.start` empties and re-keys the session instead of invalidate + new session); inserted fix 8.2.1a (`server.tomcat.use-relative-redirects: true`, so the Google redirects back into the SPA ignore nginx's forwarded port and scheme); 8.1.2 changed (compose derives `APP_BASE_URL` from `FRONTEND_PORT`); 11.3 moved forward into Phase 9 | Works without Google creds locally/CI; no forwarded-header dependency |
