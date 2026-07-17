# K3s Cluster Configuration — phrasal.ddns.net

Hetzner VPS (4 CPU / 8 GB RAM) running K3s with Traefik ingress and Let's Encrypt TLS.
This document covers everything done on the VPS from initial K3s setup through CI/CD deployment.

## Step 1 — Container Registry

Docker Hub is used as the container registry. Two repositories hold the application images:

- `stingion/phrasal-backend`
- `stingion/phrasal-frontend`

Images are tagged with both the Git SHA (`:<sha>`) and `:latest` on every push to `main`.

## Step 2 — Kustomize Base and Overlays

All Kubernetes manifests were centralized under `k8s/` with a Kustomize structure:

```
k8s/
├── base/                        # Shared manifests
│   ├── kustomization.yaml
│   ├── backend-configmap.yaml   # DATABASE_URL, SPRING_PROFILES_ACTIVE, SERVER_PORT
│   ├── backend-secret.yaml      # DB credentials (base template)
│   ├── backend-deployment.yaml  # Spring Boot app, env from configmap + secret
│   ├── backend-service.yaml     # NodePort (base default)
│   ├── postgres-statefulset.yaml
│   ├── postgres-service.yaml
│   ├── frontend-configmap.yaml
│   ├── frontend-deployment.yaml
│   └── frontend-service.yaml    # NodePort (base default)
├── overlays/
│   ├── dev/
│   │   └── kustomization.yaml   # Just references base, no overrides
│   └── prod/
│       ├── kustomization.yaml   # Image refs, replica counts, patches
│       ├── ingress.yaml         # Traefik ingress with TLS
│       └── patches/
│           ├── backend-service.yaml    # Override to ClusterIP
│           ├── frontend-service.yaml   # Override to ClusterIP
│           ├── backend-configmap.yaml  # spring.profiles.active: prod
│           └── secret.yaml.example     # Template for real DB credentials
```

The prod overlay switches both services from NodePort to ClusterIP (traffic goes through Traefik ingress), pins Docker Hub images (`stingion/phrasal-backend`, `stingion/phrasal-frontend`), and patches the configmap to activate the `prod` Spring profile.

The actual `secret.yaml` is gitignored — it's generated at deploy time from GitHub Secrets.

Skaffold configs (`backend/skaffold.yaml`, `frontend/skaffold.yaml`) were updated to reference `../k8s/base/*.yaml` so local dev (`skaffold dev`) still works with the centralized manifests. The root `skaffold.yaml` composes both modules via `requires:`.

## Step 3 — Ingress + TLS (Traefik + cert-manager)

### Traefik

K3s ships with Traefik as its built-in ingress controller. It was previously disabled in the K3s config — the `disable: traefik` line was removed from `ansible/roles/k3s/templates/config.yaml.j2` and K3s was restarted to bring Traefik back.

The K3s config now only sets:
```yaml
write-kubeconfig-mode: "0644"
tls-san:
  - <vps-ip>
```

### cert-manager

Installed via Ansible role `ansible/roles/ingress-tls/`:

1. Waits for the Traefik deployment to exist (12 retries, 10s delay — K3s deploys Traefik via its HelmChart controller, which takes a moment after restart)
2. Waits for Traefik to be fully Available
3. Installs cert-manager v1.17.2 from the official manifest URL
4. Waits for the cert-manager webhook to be ready
5. Applies a `ClusterIssuer` named `letsencrypt-prod` using HTTP-01 challenge solver via Traefik

The ClusterIssuer config:
```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: x7warrior@gmail.com
    privateKeySecretRef:
      name: letsencrypt-prod-key
    solvers:
      - http01:
          ingress:
            ingressClassName: traefik
```

### Ingress resource

`k8s/overlays/prod/ingress.yaml` defines the routing:

- Host: `phrasal.ddns.net`
- TLS: cert-manager auto-issues a Let's Encrypt cert (stored in secret `phrasal-tls`)
- `/api` -> backend service on port 8080
- `/` -> frontend service on port 3000

### Ansible playbook

`ansible/playbooks/ingress-tls.yml` runs two plays in sequence:
1. The `k3s` role (re-enables Traefik via config, restarts K3s)
2. The `ingress-tls` role (installs cert-manager, applies ClusterIssuer)

Split into two plays so that handlers flush between them — the K3s restart must complete before cert-manager tries to find Traefik.

### Firewall

Ports 80 and 443 were already opened by a separate Ansible playbook. Port 6443 is opened by the K3s role for external kubectl access.

## Step 4 — GitHub Actions CI/CD Pipeline

The pipeline (`.github/workflows/ci_cd.yml`) runs on every push to any branch. The deploy stages only trigger on pushes to `main`:

```
build-and-test ──┐
                  ├─→ e2e ──→ docker-push ──→ deploy
frontend-test ───┘
```

### Jobs

**build-and-test** — Maven build + verify (Java 25), uploads JAR artifact and JaCoCo report.

**frontend-test** — npm ci + build + test (Node 26).

**e2e** — Needs both above. Starts the full stack via `docker compose up -d --wait`, runs Cucumber + Playwright tests against it.

**docker-push** — Only on main. Logs into Docker Hub using `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets. Builds and pushes both images with `:<sha>` and `:latest` tags.

**deploy** — Only on main, after docker-push. Uses `environment: production`.
1. Sets up kubectl and writes kubeconfig from `KUBE_CONFIG` secret (base64-encoded)
2. Generates `secret.yaml` patch from `DB_USERNAME` / `DB_PASSWORD` secrets
3. Runs `kustomize edit set image` to pin images to the current SHA
4. Applies the prod overlay: `kubectl apply -k k8s/overlays/prod`
5. Waits for both deployments to roll out
6. Prints pod status for verification

### GitHub Secrets required

| Secret | Purpose                                                                                          |
|---|--------------------------------------------------------------------------------------------------|
| `DOCKER_USERNAME` | Docker Hub username (`stingion`)                                                                 |
| `DOCKER_PASSWORD` | Docker Hub access token                                                                          |
| `KUBE_CONFIG` | Base64-encoded kubeconfig for the K3s cluster with changed 127.0.0.1:6443 to <vpsip>:6443 inside |
| `DB_USERNAME` | PostgreSQL username for prod                                                                     |
| `DB_PASSWORD` | PostgreSQL password for prod                                                                     |

## Step 5 — Spring Boot Prod Profile Fix

`backend/src/main/resources/application-prod.yml` was updated to use environment variable placeholders instead of hardcoded values:

```yaml
spring:
  datasource:
    url: ${DATABASE_URL:jdbc:postgresql://localhost:25432/phrasaldb}
    username: ${DATABASE_USER:phrasaluser}
    password: ${DATABASE_PASSWORD:phrasalpass}
server:
  port: ${SERVER_PORT:28080}
```

This makes the prod profile compatible with both K8s (where env vars are injected from configmaps and secrets) and bare-metal deployment (where the defaults apply).

The backend deployment manifest (`k8s/base/backend-deployment.yaml`) injects `SERVER_PORT` from the configmap alongside the existing `DATABASE_URL`, `DATABASE_USER`, and `DATABASE_PASSWORD` env vars. The base configmap sets `server.port: "8080"` so the app listens on 8080 inside the cluster regardless of the prod profile default of 28080.

## Deployment Verification

The app is live and verified:

- **Frontend**: https://phrasal.ddns.net/ — serves the React SPA
- **Backend API**: https://phrasal.ddns.net/api/v1/phrasal-verbs — returns JSON
- **TLS**: Valid Let's Encrypt certificate for `phrasal.ddns.net`, HTTP/2

## Known Issues / TODO

- Database credentials are currently `postgres/postgres` — real prod credentials should be configured and the `DB_USERNAME` / `DB_PASSWORD` GitHub Secrets updated accordingly
- Docker Hub PAT should be rotated periodically; ensure `DOCKER_PASSWORD` secret stays current

#todo (do it in future soon):
Regenerate kube_config sertificates:
You should:
1. Rotate the K3s credentials on your VPS — the simplest way is to delete the old certs and restart K3s:
   sudo systemctl stop k3s
   sudo rm /var/lib/rancher/k3s/server/tls/client-admin.*
   sudo systemctl start k3s
# K3s regenerates the certs and updates k3s.yaml
2. Then re-export and re-encode the new kubeconfig for the GitHub secret.
