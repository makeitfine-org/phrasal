# e2e — Acceptance Test Suite

Black-box end-to-end acceptance tests for the full Phrasal stack (backend + frontend + database).
Built with **Cucumber-JS** (BDD / Gherkin) + **Playwright** (browser automation) + **TypeScript**.

---

## Prerequisites

| Tool | Minimum version | Notes |
|---|---|---|
| Node.js | 26 | |
| npm | 10 | bundled with Node 26+ |
| Docker + Compose | v2 | required to start the full stack |

---

## Setup

```bash
# From the repo root — start the full stack
docker compose up -d --wait

# From the e2e/ directory:
cp .env.example .env          # defaults work for docker-compose
npm install
```

> `.env` is gitignored. Never commit it — it may contain real credentials in shared environments.

---

## Running the tests

The full stack must be running before you execute the suite. Start it from the repo root:

```bash
docker compose up -d --wait
```

Then run the tests:

```bash
# All scenarios
npm test

# By scope tag
npm run test:api    # @api — REST contract scenarios
```

After a run, open the HTML report:

```bash
# Linux
xdg-open reports/cucumber.html
```

---

## Test Structure

```
e2e/
├── cucumber.js               # Cucumber runner config (paths, formatters, ts-node)
├── tsconfig.json
├── .env.example              # all config vars
├── features/                 # Gherkin feature files — one folder per scope
│   ├── phrasal-verbs-api/
│   │   └── crud.feature            @api
│   └── frontend/
│       ├── quiz.feature
│       └── verb-list.feature
└── src/
    ├── world.ts              # CustomWorld — shared state per scenario
    ├── hooks.ts              # Before/After lifecycle
    ├── steps/                # Step definitions (one file per feature scope)
    │   ├── phrasal-verbs-api.steps.ts
    │   └── frontend.steps.ts
    └── support/              # Utilities (not step definitions)
        ├── api-client.ts     # Axios wrapper
        └── db-client.ts      # pg client — query / cleanup helpers
```

---

## Writing New Tests

### 1. Add a feature file

Create a `.feature` file in the appropriate `features/` subfolder.

```gherkin
@api
Feature: Grammar entries API
  Scenario: List grammar entries by category
    Given I have a valid API client
    When I request grammar entries for category "i-wish-if-only"
    Then the response contains at least 1 entry
```

### 2. Add step definitions (if needed)

Add steps to the relevant file in `src/steps/`.

### 3. Isolate test data

For scenarios that need specific pre-existing data, create it in a `Before` step and clean it up in `After`.

---

## Configuration

All values are read from environment variables (loaded via `dotenv` from `.env`).

| Variable | Default | Description |
|---|---|---|
| `FRONTEND_PORT` | `3000` | Frontend port (Playwright navigates to `http://localhost:<port>`) |
| `BACKEND_PORT` | `8080` | Backend port (API client uses `http://localhost:<port>`) |
| `POSTGRES_PORT` | `5432` | Postgres port |
| `DB_HOST` | `localhost` | Postgres host |
| `DB_NAME` | `phrasaldb` | Database name |
| `DB_USER` | `postgres` | Database user |
| `DB_PASSWORD` | `postgres` | Database password |

---

## CI Integration

The suite runs as part of `make build` after the Docker stack comes up.

The CI pipeline (`.github/workflows/ci_cd.yml`) executes:
1. Build backend + frontend
2. Docker compose up
3. Run `npm test` (all scenarios)
4. Docker compose down

---

## Debugging Failures

### HTML report

```bash
xdg-open reports/cucumber.html
```

### Run one feature file

```bash
npx cucumber-js features/phrasal-verbs-api/crud.feature
```

### Run one scenario by name

```bash
npx cucumber-js --name "Create a phrasal verb"
```

### DB state inspection

```bash
psql -h localhost -U postgres -d phrasaldb -c "SELECT id, verb FROM phrasal_verbs ORDER BY id DESC LIMIT 10;"
```

### Common issues

| Symptom | Likely cause | Fix |
|---|---|---|
| `ECONNREFUSED localhost:8080` | Backend not running | `docker compose up -d --wait` from repo root |
| `net::ERR_CONNECTION_REFUSED` in browser | Frontend not running | Same as above |
| Scenario fails with `TimeoutError` | Slow startup | Wait for health checks to pass |
| `undefined` step | New Gherkin phrase has no matching step | Add the step to `src/steps/` and re-run |
