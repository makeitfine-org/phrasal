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
- Never put real credentials in code; use `.env` (copy `.env.example`)

## Structure

```
features/
  phrasal-verbs-api/    → REST contract scenarios (@api)
  auth-api/             → register/login/logout/rate-limit contract (@api)
  frontend/             → browser-driven SPA scenarios (incl. auth.feature)
src/
  world.ts              → CustomWorld — shared state per scenario
  hooks.ts              → Before/After lifecycle
  steps/                → Step definitions (auth-api.steps.ts: register/login/logout/rate limit; auth-ui.steps.ts: forms + user menu)
  support/              → api-client.ts (cookie jar), db-client.ts, test-users.ts
```
