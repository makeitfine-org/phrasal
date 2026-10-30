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
  steps/                → Step definitions (auth-api.steps.ts: register/login/logout/rate limit; auth-ui.steps.ts: forms + user menu; quiz-progress-api.steps.ts: progress API; email-verification-api.steps.ts: verification mail/link/resend API; password-reset-api.steps.ts: forgot/reset API, reset mail and notice, rate limit; password-reset-ui.steps.ts: forgot and reset pages, opens the reset link from Mailpit; two-factor-api.steps.ts: 2FA setup/confirm, two-step login, recovery codes, disable; progress-sync.steps.ts: browser sync, uses the test ids `excluded-count` and `exclude-toggle`)
  support/              → api-client.ts (cookie jar), db-client.ts, test-users.ts, totp.ts (otpauth: `nextAcceptedCode` picks a code the server has not seen), mailpit-client.ts (latestMessageTo, verificationLink/Token, passwordResetLink/Token, countMessagesTo, deleteMessagesTo; `latestMessageTo` and `countMessagesTo` take an optional `subject` to tell the reset mail from the notice)
```

"Sign up through the form" steps now open the emailed link from Mailpit to verify before logging in.

The world keeps `resetTokens` (every reset token requested in the scenario, newest last) so a scenario can replay an old link. `docker-compose.yml` leaves `RATE_LIMIT_FORGOT_PER_EMAIL` at its default so the `429` scenario works; use a fresh email per scenario.

The world keeps `twoFactorSecret`, `recoveryCodes`, `previousRecoveryCodes` and `lastTotpStep` (a used step is rejected, so each code uses a newer one; the steps allow 65 s to wait for the clock). `docker-compose.yml` leaves `RATE_LIMIT_TWO_FACTOR_PER_USER` at its default (5 / 15 min) so the `429` scenario works; every scenario makes a fresh user.
