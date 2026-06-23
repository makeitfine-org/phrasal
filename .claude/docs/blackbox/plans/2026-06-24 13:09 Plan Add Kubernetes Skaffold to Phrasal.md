# Plan: Add Kubernetes & Skaffold to Phrasal

## Context

The phrasal project currently deploys via docker-compose only. This plan adds Kubernetes manifests and Skaffold configuration for local minikube deployment, following the exact pattern from the reference project `/home/ubuntuu/dev/mine/claude-ai-spring-boot`. Phrasal has no IAM/Keycloak, so the setup is simplified (equivalent to the reference's `no-iam` profile).

## New Files (11)

### Backend K8s manifests (`backend/k8s/`)

| File | Content |
|---|---|
| `configmap.yaml` | ConfigMap `app-config`: `database.url=jdbc:postgresql://postgres-service:5432/phrasaldb`, `spring.profiles.active=prod` |
| `secret.yaml` | Secret `app-secrets`: `database.username=postgres`, `database.password=postgres` |
| `postgres-deployment.yaml` | StatefulSet `postgres`: postgres:16-alpine, PVC 1Gi, probes via `pg_isready`, resources 256Mi-512Mi |
| `postgres-service.yaml` | ClusterIP `postgres-service` on port 5432 |
| `deployment.yaml` | Deployment `backend`: 2 replicas, init container `wait-for-postgres`, env from configmap+secret (4 vars only — no IAM), actuator liveness/readiness probes, resources 512Mi-1Gi |
| `service.yaml` | LoadBalancer `backend` on port 8080 |

### Backend Skaffold (`backend/skaffold.yaml`)

- apiVersion `skaffold/v4beta11`, image `backend`, local push:false, rawYaml from all 6 k8s files, portForward 8080. No profiles (no IAM toggle).

### Frontend K8s manifests (`frontend/k8s/`)

| File | Content |
|---|---|
| `configmap.yaml` | ConfigMap `frontend-nginx-config`: nginx conf proxying `/api/` to `http://backend:8080` (K8s service name, not docker-compose `app`) |
| `deployment.yaml` | Deployment `phrasal-frontend`: 2 replicas, nginx config from configmap volume, HTTP probes, resources 64Mi-128Mi |
| `service.yaml` | LoadBalancer `phrasal-frontend` port 3000→80 |

### Frontend Skaffold (`frontend/skaffold.yaml`)

- apiVersion `skaffold/v4beta11`, image `phrasal-frontend`, rawYaml from 3 k8s files, portForward 3000.

## Modified Files (2)

### `CLAUDE.md`
- Add K8s commands subsection (eval minikube docker-env, skaffold dev, minikube tunnel, skaffold delete)
- Add `k8s/` and `skaffold.yaml` to Project Structure for both backend and frontend

### `README.md`
- Add `k8s/` and `skaffold.yaml` to Project Structure tree
- Add "Kubernetes Deployment (Minikube)" section: prerequisites, minikube start, docker-env, deploy backend, deploy frontend, access services, teardown, troubleshooting table

## Not Modified
- `docker-compose.yml`, `Makefile`, Dockerfiles, `frontend/nginx.conf` — all untouched

## Key Design Decisions
1. **No IAM profile** — single default config (equivalent to reference's `no-iam`)
2. **Backend service name `backend`** — frontend K8s nginx proxies to `http://backend:8080` (not docker-compose's `app`)
3. **Preserve phrasal's nginx pattern** — both `location = /api` and `location /api/` blocks, plus timeout settings
4. **DB password `postgres`** — matches phrasal's docker-compose (not reference's `postgres123`)
5. **`spring.profiles.active: prod`** — follows reference convention for K8s; app.yml env var placeholders work regardless

## Verification
1. `cd backend && skaffold dev` — postgres + backend pods start, `kubectl get pods` shows Running
2. `cd frontend && skaffold dev` — frontend pods start
3. `minikube tunnel` then `curl http://localhost:8080/actuator/health` returns `{"status":"UP"}`
4. `http://localhost:3000` loads the React SPA and API calls work