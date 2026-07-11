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
| `app` | 8080 | `BACKEND_PORT` | Spring Boot REST API |
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

---

## Prerequisites

- Node.js 26+
- Java 25 (`JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64`)
- Docker & Docker Compose
- PostgreSQL 16 (provided via Docker)
- [Base64 encoder/decoder](https://www.base64decode.org/) — used to base64-encode the K3s kubeconfig for the `KUBE_CONFIG` GitHub Actions secret
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

The app runs on a Hetzner VPS with K3s, Traefik ingress, and Let's Encrypt TLS at **https://phrasal.ddns.net**.

CI/CD pipeline (`.github/workflows/ci.yml`) runs tests on every push. Docker push and deployment only trigger on version tags (see [Releasing](#releasing)).

```
push to any branch → build + test + e2e
push tag v1.2.3 → build + test + e2e → docker push → kubectl apply -k k8s/overlays/prod
```

Infrastructure provisioning is managed by Ansible playbooks in `ansible/`. See [`ansible/README.md`](ansible/README.md) for cluster setup and [`aux/docs/k3sconf.md`](aux/docs/k3sconf.md) for the full K3s configuration reference.

---

## Releasing

Deployment to production only happens when a version tag is pushed. Pushes to `main` (and all other branches) run build + test + e2e but do **not** deploy.

### Create a release

```bash
# 1. Make sure main is up to date
git checkout main
git pull

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

### List existing releases

```bash
git tag --sort=-v:refname
```

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
