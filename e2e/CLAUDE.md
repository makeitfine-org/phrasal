# CLAUDE.md — e2e

Cucumber (BDD) + Playwright + TypeScript black-box acceptance tests.

## Running

Quickest path from the repo root (stack must already be running):

```bash
make acceptanceTest
```

Or step by step:

1. Ensure the full stack is running: `docker compose up -d --wait` (from repo root)
2. Install: `npm install`
3. Run all: `npm test` (`pretest` installs the Chromium build matching the Playwright version)
4. Run by tag: `npm run test:api`

## Conventions

- Steps are in `src/steps/`, support utilities in `src/support/`
- Reports land in `reports/` (gitignored)
- `ApiClient` keeps a cookie jar (session + `XSRF-TOKEN`) and sends `X-XSRF-TOKEN` on POST/PUT/DELETE (`{ csrf: false }` omits it); admin writes need `ADMIN_EMAIL`/`ADMIN_PASSWORD`; test users `e2e-*@phrasal.test` are deleted in `AfterAll`
- Env vars `ADMIN_EMAIL` / `ADMIN_PASSWORD` must match the stack's `PHRASAL_ADMIN_*` (compose dev defaults are in `.env.example`; CI sets them in `ci_cd.yml`)
- `MAILPIT_URL` (default `http://localhost:8025`, in `.env.example`) points at Mailpit; sign-ups are confirmed through it, so the stack must run with `MAIL_ENABLED=true` (docker-compose does). `AfterAll` also deletes Mailpit messages to `e2e-*@phrasal.test`
- Never put real credentials in code; use `.env` (copy `.env.example`)

## Structure

```
features/
  phrasal-verbs-api/    → REST contract scenarios (@api)
  auth-api/             → register/login/logout/rate-limit contract + email-verification.feature + password-reset.feature + two-factor.feature (@api)
  progress-api/         → per-user quiz progress contract (@api, quiz-progress.feature)
  frontend/             → browser-driven SPA scenarios (incl. auth.feature, email-verification.feature, password-reset.feature, progress-sync.feature)
src/
  world.ts              → CustomWorld — shared state per scenario
  hooks.ts              → Before/After lifecycle
  steps/                → Step definitions (auth-api.steps.ts: register/login/logout/rate limit; auth-ui.steps.ts: forms + user menu; quiz-progress-api.steps.ts: progress API; email-verification-api.steps.ts: verification mail/link/resend API; password-reset-api.steps.ts: forgot/reset API, reset mail and notice, rate limit; password-reset-ui.steps.ts: forgot and reset pages, opens the reset link from Mailpit; two-factor-api.steps.ts: 2FA setup/confirm, two-step login, recovery codes, disable; two-factor-ui.steps.ts: account security page, code page, recovery code login, enrollment banner; progress-sync.steps.ts: browser sync, uses the test ids `excluded-count` and `exclude-toggle`)
  support/              → api-client.ts (cookie jar), db-client.ts, test-users.ts, totp.ts (otpauth: `nextAcceptedCode` picks a code the server has not seen), mailpit-client.ts (latestMessageTo, verificationLink/Token, passwordResetLink/Token, countMessagesTo, deleteMessagesTo; `latestMessageTo` and `countMessagesTo` take an optional `subject` to tell the reset mail from the notice)
```

"Sign up through the form" steps now open the emailed link from Mailpit to verify before logging in.

The world keeps `resetTokens` (every reset token requested in the scenario, newest last) so a scenario can replay an old link. `docker-compose.yml` leaves `RATE_LIMIT_FORGOT_PER_EMAIL` at its default so the `429` scenario works; use a fresh email per scenario.

The world keeps `twoFactorSecret`, `recoveryCodes`, `previousRecoveryCodes` and `lastTotpStep` (a used step is rejected, so each code uses a newer one; the steps allow 65 s to wait for the clock). `docker-compose.yml` leaves `RATE_LIMIT_TWO_FACTOR_PER_USER` at its default (5 / 15 min) so the `429` scenario works; every scenario makes a fresh user.

`docker-compose.yml` sets `RATE_LIMIT_LOGIN_PER_EMAIL` to 10 (2FA setup shares that budget and the shared admin logs in several times per run), so the login `429` scenario fails 11 times. `Given I am logged in as the admin` enrolls the dev admin in 2FA on first use and answers the code step later (`support/admin-two-factor.ts` keeps the secret; `BeforeAll`/`AfterAll` reset the admin's 2FA in SQL); `...without two-factor` resets it first.

The browser feature `features/frontend/two-factor.feature` reads the key from `two-factor-secret` (`normalizeSecret`) and the codes from `recovery-code`. Each user scenario makes a fresh user; the admin scenario is tagged `@admin-two-factor`, so an `After` hook resets the admin's 2FA in SQL (the API steps keep the admin secret in memory and would otherwise fail on an already enrolled admin). The admin shares the `login-per-email` budget (10 / 5 min in compose): two full runs within five minutes can hit `429`; restart the backend between them.

**TOTP helpers.** `support/totp.ts` uses the `otpauth` package (devDependency). The server rejects a code whose 30 s step it has already seen, so `nextAcceptedCode(secret, lastUsedStep)` waits (up to about 30 s) for a step newer than the last one used and returns `{code, step}`; every step that calls it needs a timeout above 30 s (65 s here). `support/admin-two-factor.ts` holds `adminState` and `resetAdminTwoFactor()` (SQL reset); `hooks.ts` calls it in `BeforeAll` and `AfterAll`. Features: `auth-api/two-factor.feature` (steps in `two-factor-api.steps.ts`) and `frontend/two-factor.feature` (`two-factor-ui.steps.ts`).
