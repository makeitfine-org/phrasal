# Phrasal

Full-stack English language learning app featuring phrasal verb quizzes, grammar exercises, and a browsable verb reference library. Spring Boot REST API backed by PostgreSQL, React SPA served by Nginx. All three services run together with a single `docker compose up`.

---

## Architecture

```
Browser
  └─► Nginx  (port 3000)
        ├─► React SPA          (static files)
        └─► /api/*  ──────►  Spring Boot  (port 8080)
                                  └─► PostgreSQL  (port 5432)
```

---

## Quick Start

```bash
make dockerAll
```

Builds backend + frontend, runs acceptance tests, then starts all three services with `docker compose up`.
Run `make help` to see all available targets.

Alternatively, start only the pre-built images (no build step):

```bash
docker compose up
```

Verify the backend is healthy:

```bash
curl http://localhost:8080/actuator/health
# {"status":"UP"}
```

Then open **http://localhost:3000** in your browser.

---

## Services

| Service | Port | Override env var | Description |
|---|---|---|---|
| `postgres` | 5432 | `POSTGRES_PORT` | PostgreSQL 16 database (`phrasaldb`) |
| `backend` | 8080 | `BACKEND_PORT` | Spring Boot REST API |
| `frontend` | 3000 | `FRONTEND_PORT` | React SPA served by Nginx |

Override a port if it's already in use on your machine:

```bash
FRONTEND_PORT=3001 docker compose up
```

Auto-detect busy ports (falls back to a random free port, keeps default if available):

```bash
export POSTGRES_PORT=$(ss -tlnp | grep -q ':5432 ' && echo "0" || echo "5432")
export BACKEND_PORT=$(ss -tlnp | grep -q ':8080 ' && echo "0" || echo "8080")
export FRONTEND_PORT=$(ss -tlnp | grep -q ':3000 ' && echo "0" || echo "3000")
docker compose up
```

Find the assigned port if it was auto-picked:

```bash
docker compose port frontend 80
```

### Parallel Stacks

Run multiple full stacks simultaneously by assigning each a unique `COMPOSE_PROJECT_NAME` and non-overlapping ports. Useful for parallel CI runs or multiple Claude Code worktrees.
It works in `worktrees` (Claude Code parallel tasks)

Terminal 1 (default ports):

```bash
COMPOSE_PROJECT_NAME=phrasal-a POSTGRES_PORT=5432 FRONTEND_PORT=3000 BACKEND_PORT=8080 make clean build
```

Terminal 2 (shifted ports | also using while skaffold running):

```bash
COMPOSE_PROJECT_NAME=phrasal-b POSTGRES_PORT=5532 FRONTEND_PORT=3100 BACKEND_PORT=8180 make clean build
```

Tear down a specific stack by passing the same project name:

```bash
COMPOSE_PROJECT_NAME=phrasal-a docker compose down
COMPOSE_PROJECT_NAME=phrasal-b docker compose down
```

---

## Prerequisites

- Node.js 26+
- Java 25 (`JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64`)
- Docker & Docker Compose
- PostgreSQL 16 (provided via Docker)
- [Base64 encoder/decoder](https://www.base64decode.org/) — used to base64-encode the K3s kubeconfig for the `KUBE_CONFIG` GitHub Actions secret
- [Backlog.md](https://www.npmjs.com/package/backlog.md) — markdown-native task management, used as an MCP server for Claude Code:

```bash
npm i -g backlog.md
```

- [GitHub CLI (`gh`)](https://cli.github.com/) — install on Ubuntu:

```bash
(type -p wget >/dev/null || (sudo apt update && sudo apt install wget -y)) \
&& sudo mkdir -p -m 755 /etc/apt/keyrings \
&& out=$(mktemp) && wget -nv -O$out https://cli.github.com/packages/githubcli-archive-keyring.gpg \
&& cat $out | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
&& sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
&& sudo mkdir -p -m 755 /etc/apt/sources.list.d \
&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
&& sudo apt update \
&& sudo apt install gh -y
```

---

## Build & Test

```bash
# Frontend
cd frontend && npm run test:run

# Backend (requires Java 25)
cd backend && JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 mvn clean verify

# Full pipeline: build + docker + e2e
make build

# See all targets
make help
```

---

## Local Development (hot reload)

Fastest loop, no Kubernetes: Postgres in Docker, backend and frontend run directly.

```bash
# 1. Database (once, leave running)
docker compose up -d postgres

# 2. Backend (terminal 1) — localhost:8080
# Postgres host port is $POSTGRES_PORT (5432 by default; .envrc sets 5532)
cd backend && SPRING_PROFILES_ACTIVE=dev \
  DATABASE_URL=jdbc:postgresql://localhost:${POSTGRES_PORT:-5432}/phrasaldb mvn spring-boot:run -Pdevtools

# 3. Frontend (terminal 2) — http://localhost:5173, proxies /api to :8080
cd frontend && npm install && npm run dev
```

- Frontend edits reload instantly (Vite HMR).
- Backend auto-restart comes from `spring-boot-devtools`, enabled only by the opt-in Maven profile `devtools` (`-Pdevtools`, not active by default): run `mvn compile` (or build in the IDE) after a change and the app restarts. Regular builds and the production jar never include it.

---

## Kubernetes Deployment (Minikube)

Both modules ship with Kubernetes manifests and a `skaffold.yaml`. The steps below
deploy the full stack — backend + frontend — to a local minikube cluster.

### Prerequisites

Install the following tools before starting:

- [Docker](https://docs.docker.com/get-docker/)
- [minikube](https://minikube.sigs.k8s.io/docs/start/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Skaffold](https://skaffold.dev/docs/install/)

### 1. Start a local minikube cluster

```bash
minikube start --cpus=4 --memory=6g --driver=docker
minikube status
```

> 6 GB of memory is recommended: the backend pod requests 1 GiB, and postgres + frontend add overhead.

### 2. Point Docker at minikube's daemon

Skaffold builds images locally with `push: false`. For minikube to see them, your
shell's Docker client must talk to minikube's Docker daemon:

```bash
eval $(minikube docker-env)
```

Run this in every new terminal before building or deploying.

### 3. Deploy the backend

```bash
cd backend
skaffold dev    # live rebuild on file changes
# or:
skaffold run    # one-shot deploy
```

Verify pods are ready:

```bash
kubectl get pods
# NAME                                  READY   STATUS    RESTARTS
# backend-<hash>                        1/1     Running   0
# postgres-0                            1/1     Running   0
```

### 4. Deploy the frontend

Open a new terminal (remember to re-run `eval $(minikube docker-env)`):

```bash
cd frontend
skaffold dev    # live rebuild on file changes
# or:
skaffold run    # one-shot deploy
```

Verify:

```bash
kubectl get pods
# NAME                                  READY   STATUS    RESTARTS
# phrasal-frontend-<hash>               1/1     Running   0  (×2 replicas)
```

### 5. Access the services

Both modules use `type: LoadBalancer`. On minikube, run a tunnel to expose them:

```bash
minikube tunnel    # keep this running in a dedicated terminal
```

Then open:

- **Frontend** → http://localhost:3000
- **Backend health** → http://localhost:8080/actuator/health

> **Without `minikube tunnel`**: Skaffold's `portForward` blocks already forward
> ports 3000 and 8080 to localhost while `skaffold dev` is running.

### 6. Teardown

```bash
# In each module directory:
skaffold delete

# Stop or delete the cluster:
minikube stop     # pause (preserves state)
minikube delete   # full reset
```

### Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `ImagePullBackOff` | minikube can't find the image | Re-run `eval $(minikube docker-env)` then redeploy |
| Pod stuck `Pending` | Insufficient cluster resources | Restart minikube with more `--memory` / `--cpus` |
| Frontend can't reach backend | Backend service missing | Run `kubectl get svc backend` and confirm it exists |
| 502 Bad Gateway on `/api/` | Backend not ready yet | Wait for backend pods to pass readiness probes |

---

## Production Deployment (K3s)

The app runs on a Hetzner VPS with K3s, Traefik ingress, and Let's Encrypt TLS at **https://phrasalbox.com** (also reachable at phrasal.ddns.net during migration).

CI/CD pipeline (`.github/workflows/ci_cd.yml`) runs tests on every push. Docker push and deployment only trigger on version tags (see [Releasing](#releasing)).

```
push to any branch → build + test + e2e
push tag v1.2.3 → build + test + e2e → docker push → kubectl apply -k k8s/overlays/prod
```

**Before the next tagged deploy:** create the GitHub Secrets `PHRASAL_ADMIN_EMAIL` and `PHRASAL_ADMIN_PASSWORD`
(password at least 10 characters), plus `MAIL_USERNAME` (the Brevo SMTP login, under SMTP & API → SMTP) and
`MAIL_PASSWORD` (the Brevo SMTP key) for the verification emails (`smtp-relay.brevo.com:587`). The backend creates or repairs that ADMIN account at every startup, and the
deploy workflow writes both values into the prod `app-secrets`. Keep a copy in your password manager and never
commit them. Register and login are rate-limited per client IP and per email; the per-IP limits need the Traefik
client-IP setting described in [`ansible/README.md`](ansible/README.md#client-ip-behind-traefik).

Infrastructure provisioning is managed by Ansible playbooks in `ansible/`. See [`ansible/README.md`](ansible/README.md) for cluster setup and [`aux/docs/k3sconf.md`](aux/docs/k3sconf.md) for the full K3s configuration reference.

---

## Releasing

Deployment to production only happens when a version tag is pushed. Pushes to `main` (and all other branches) run build + test + e2e but do **not** deploy.

### Create a release

```bash
# 1. Make sure main is up to date
git checkout main
git pull

# 1.1. Check `make clean build securityScan` passes successfully
make clean build securityScan

# 2. Create a GitHub release with a description
gh release create v1.2.3 --title "v1.2.3" --notes "
## What's Changed
- Added new grammar category
- Fixed pagination bug on verb details
"
```

This creates the tag, pushes it, and publishes a GitHub Release with the description in one step.

Alternatively, create the tag manually and add the description on GitHub:

```bash
git tag -a v1.2.3 -m "Short description of the release"
git push origin v1.2.3
```

The CI pipeline will:
1. Run all tests (backend, frontend, e2e)
2. Build and push Docker images tagged `1.2.3` + `latest`
3. Deploy to the K3s cluster via `kubectl apply -k k8s/overlays/prod`

### Versioning

Use [semantic versioning](https://semver.org/): `vMAJOR.MINOR.PATCH`

| Bump | When |
|---|---|
| `PATCH` | Bug fixes, dependency updates |
| `MINOR` | New features, backward-compatible |
| `MAJOR` | Breaking API changes |

### Rollback a release

**Step 1 — Rollback the K3s deployment** (restores previous version on prod immediately):

```bash
kubectl set image deployment/backend \
  app=stingion/phrasal-backend:<previous-version>

kubectl set image deployment/phrasal-frontend \
  frontend=stingion/phrasal-frontend:<previous-version>

kubectl rollout status deployment/backend --timeout=120s
kubectl rollout status deployment/phrasal-frontend --timeout=120s
```

Or use Kubernetes' built-in rollback (reverts to the previous ReplicaSet; the last 5 revisions are kept via `revisionHistoryLimit: 5`):

```bash
kubectl rollout undo deployment/backend
kubectl rollout undo deployment/phrasal-frontend
```

**Step 2 — Delete the GitHub release and tag:**

```bash
gh release delete v1.2.3 --yes
--- or ---
git push --delete origin v1.2.3
git tag -d v1.2.3
```

**Step 3 — (Optional) Restore the `latest` Docker Hub tag.** The bad release overwrote `latest`. To point it back:

```bash
docker pull stingion/phrasal-backend:<previous-version>
docker tag stingion/phrasal-backend:<previous-version> stingion/phrasal-backend:latest
docker push stingion/phrasal-backend:latest

docker pull stingion/phrasal-frontend:<previous-version>
docker tag stingion/phrasal-frontend:<previous-version> stingion/phrasal-frontend:latest
docker push stingion/phrasal-frontend:latest
```

**Step 4 — (Optional) Revert the code** if the release included a bad commit:

```bash
git revert <bad-commit-hash>
git push origin main
```

**Order matters**:  
Step 1 first to restore prod immediately, then clean up GitHub and Docker Hub.   

Step 3 is only needed if something else pulls `:latest`  
— the CI pipeline always sets an explicit version tag during deploy.

Step 4 is only needed if the bad release introduced code changes you want to undo on `main`;  
if the release was just mistagged or misconfigured, deleting the tag (step 2) is enough.

### List existing releases

```bash
git tag --sort=-v:refname
```

---

## Accounts & security

Visitors can sign up with an email and password. Content stays public to read; only admins can change it.

| Endpoint | Success | Errors |
|---|---|---|
| `POST /api/v1/auth/register` `{email, password}` | `201` + `{id, email, role}` | `400` invalid email or password (min 10 chars, max 72 UTF-8 bytes), `409` email already registered, `429` rate limited |
| `POST /api/v1/auth/login` `{email, password}` | `200` + `{id, email, role}`, sets the `SESSION` cookie | `400` invalid body, `401` wrong email or password, `429` rate limited |
| `GET /api/v1/auth/me` | `200` + `{id, email, role}` | `401` anonymous |
| `POST /api/v1/auth/logout` | `204`, session invalidated | - |

Errors are `application/problem+json` (RFC 7807).

**Roles.** `USER` (default for sign-ups) and `ADMIN`. Anyone can `GET /api/**`. `POST`/`PUT`/`DELETE` on phrasal-verbs,
grammar-entries and verb-details need `ADMIN` (anonymous gets `401`, a `USER` gets `403`). `/actuator/health/**` is public,
other actuator endpoints need `ADMIN`.

**Admin bootstrap.** The backend creates or repairs one `ADMIN` account at every start from `PHRASAL_ADMIN_EMAIL` and
`PHRASAL_ADMIN_PASSWORD` (docker-compose dev defaults: `admin@phrasal.test` / see `docker-compose.yml`). The configured
account always gets the configured password and the `ADMIN` role, so a change of the secret takes effect on the next start;
a password shorter than 10 characters fails startup. To promote another user by hand:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'someone@example.com';
```

**Sessions.** Spring Session JDBC stores sessions in Postgres, so they survive backend restarts and redeploys. The
`SESSION` cookie is `HttpOnly; SameSite=Lax`, and `Secure` when `SESSION_COOKIE_SECURE=true` (set in prod). The session
id changes on login. Idle timeout: `SESSION_TIMEOUT` (default `7d`).

**CSRF.** Writes need the cookie-to-header pattern: the backend sets a readable `XSRF-TOKEN` cookie, and the client echoes it
in the `X-XSRF-TOKEN` header. Without a matching header the answer is `403`. From curl:

```bash
curl -s -c jar.txt -o /dev/null http://localhost:8080/api/v1/phrasal-verbs?size=1
TOKEN=$(awk '$6=="XSRF-TOKEN"{print $7}' jar.txt)
curl -s -b jar.txt -c jar.txt -H "X-XSRF-TOKEN: $TOKEN" -H 'Content-Type: application/json' \
  -d '{"email":"me@example.com","password":"a-long-password"}' http://localhost:8080/api/v1/auth/login
```

After login the token may rotate, so read `XSRF-TOKEN` from the jar again before the next write. The SPA does this
automatically (`frontend/src/api/client.ts`).

**Rate limits** (in memory, per backend instance; exceeding them returns `429` with `Retry-After`):

| Rule | Env var | Default |
|---|---|---|
| register per IP | `RATE_LIMIT_REGISTER_PER_IP` (per hour) | 5 |
| login per IP | `RATE_LIMIT_LOGIN_PER_IP` (per 5 min) | 20 |
| login per email | `RATE_LIMIT_LOGIN_PER_EMAIL` (per 5 min) | 5 |
| master switch | `RATE_LIMIT_ENABLED` | `true` |

docker-compose raises the per-IP limits so the e2e suite can register many users.

**GitHub Secrets to create before the next tagged deploy:** `PHRASAL_ADMIN_EMAIL`, `PHRASAL_ADMIN_PASSWORD`,
`MAIL_USERNAME` and `MAIL_PASSWORD` (see [Production Deployment](#production-deployment-k3s)).

**Not yet:** email confirmation, password reset, 2FA and Google sign-in. Accounts are usable right after sign-up.
Flow diagrams: [`docs/diagrams/auth-flow.md`](docs/diagrams/auth-flow.md).

### Learning progress

Quiz progress (mastered, excluded, history, position) is stored per account, so it survives a cleared browser or a new
device. Content is addressed by stable database ids, not list positions.

| Endpoint | Success | Errors |
|---|---|---|
| `GET /api/v1/me/quiz-progress/{quizKey}` | `200` + `{quizKey, state, version, updatedAt}` | `400` unknown quiz key, `401` anonymous, `404` nothing saved yet |
| `PUT /api/v1/me/quiz-progress/{quizKey}` `{state}` | `200` + the same shape; `version` starts at `0` and grows with every save | `400` unknown key, `state` not a JSON object or larger than the limit, `401` anonymous, `403` missing CSRF token |

```json
{ "state": { "schemaVersion": 1, "excluded": [7], "history": [{ "id": 12, "status": "correct" }] } }
```

- **Quiz keys:** `phrasal-verbs` and `grammar-i-wish-if-only`. Any other key is a `400`.
- **Limit:** the `state` JSON may be at most 64 KB (`phrasal.quiz-progress.max-state-bytes`, default `65536`).
- **Sync rules:** an anonymous visitor keeps progress in `localStorage` only and sends no progress requests. After login
  the server copy wins; if the server has nothing yet, the local progress is uploaded once (first-login import). Changes
  are saved after a 2 s debounce, and flushed on tab close and logout. Saves are last-write-wins.
- **Anonymous progress is preserved:** when someone signs in, the visitor's own progress is copied to a separate
  `localStorage` slot (`quizProgressAnonymous`). Logout removes the account's local copy and puts the anonymous progress
  back, so the same browser shows the visitor's own progress again after the account logs in and out.
- **Breaking change:** `isLearned` and the `?learned=` filter were removed from the phrasal-verbs API (migration `V11`);
  learned state is now per user.

Flow diagrams: [`docs/diagrams/quiz-progress-flow.md`](docs/diagrams/quiz-progress-flow.md).

---

## Repository Layout

```
backend/              → Spring Boot application (Java 25, Maven)
  src/                → source code and tests
  Dockerfile
  pom.xml
  skaffold.yaml

frontend/             → React 18 + Vite SPA
  src/                → source code and tests
  Dockerfile
  nginx.conf
  skaffold.yaml

e2e/                  → Cucumber + Playwright acceptance tests
  features/           → Gherkin scenarios (API, frontend)
  src/                → step definitions and support utilities

k8s/                  → Kustomize manifests (base + dev/prod overlays)
  base/               → shared K8s resources (deployments, services, configmaps)
  overlays/dev/       → local dev overlay (references base only)
  overlays/prod/      → production overlay (Traefik ingress, TLS, ClusterIP patches)

ansible/              → Ansible K3s provisioning and ingress-tls setup
  roles/k3s/          → K3s install, kubeconfig, kubectl completion
  roles/ingress-tls/  → cert-manager + Let's Encrypt ClusterIssuer

aux/                  → auxiliary docs, checkstyle config, legacy scripts

docker-compose.yml    → local full-stack orchestration
Makefile              → build, test, and Docker targets
skaffold.yaml         → root Skaffold config (composes backend + frontend)
.github/workflows/    → GitHub Actions CI/CD
.github/dependabot.yml → weekly Docker base-image update PRs
```

---

## Module Documentation

- **Backend** — API reference, environment variables, testing, Kubernetes deployment: [`backend/README.md`](backend/README.md)
- **Frontend** — dev setup, project structure, routing, components, testing: [`frontend/README.md`](frontend/README.md)
- **E2E** — acceptance test setup, running, writing new scenarios, CI integration: [`e2e/README.md`](e2e/README.md)

---

## Running Acceptance Tests (E2E)

```bash
# 1. Start the full stack
docker compose up -d --wait

# 2. Install e2e dependencies (first time only)
cd e2e && cp .env.example .env && npm install

# 3. Run all scenarios
npm test

# Run by scope
npm run test:api    # REST contract scenarios
```

See [`e2e/README.md`](e2e/README.md) for the full guide.

---

## Code Style

IntelliJ IDEA code style settings live in `aux/code/checkstyle/Idea codestyle.xml` (Google Style base, customized for this project).

**Key Java settings:** 4-space indent, 4-space continuation indent, 120-char line length, no star imports (threshold 999), blank line after class header, K&R braces forced on all control statements.

To import in IntelliJ: **Settings → Editor → Code Style → ⚙ → Import Scheme → IntelliJ IDEA code style XML**, then select the file.

Checkstyle rules enforced during `mvn verify` are in `aux/code/checkstyle/checkstyle.xml`.

---

## Commit Messages

Commits follow [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): description`, at most 80 characters.

```
feat(frontend): default theme to system color scheme on first start
chore(e2e): allow esbuild install script via npm allowScripts
fix: correct pagination on verb details
```

### Types

| Type | Use for |
|---|---|
| `feat` | New user-visible feature |
| `fix` | Bug fix |
| `docs` | Documentation only (README, CLAUDE.md, comments) |
| `style` | Formatting/whitespace, no behaviour change |
| `refactor` | Code restructuring without behaviour change or bug fix |
| `perf` | Performance improvement |
| `test` | Adding or fixing tests |
| `build` | Build system or dependencies (Maven, npm, Dockerfile) |
| `ci` | CI pipelines (`.github/workflows/`) |
| `chore` | Maintenance and tooling that fits nothing above |
| `revert` | Reverting an earlier commit |

### Scope

Optional, free-form noun naming the area changed — usually a top-level folder: `backend`, `frontend`, `e2e`, `k8s`, `ansible`, `make`, `claude`, `backlog`, or `infra` for combined k8s/Ansible changes. Omit it when a change spans many areas.

### Breaking changes

Add `!` after the type/scope (`feat(backend)!: remove v1 endpoints`) or a `BREAKING CHANGE:` footer in the message body.
