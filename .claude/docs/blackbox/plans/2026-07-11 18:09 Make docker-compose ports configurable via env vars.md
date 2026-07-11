# Make docker-compose ports configurable via env vars

## Context
If host port 3000 (or 5432, 8080) is already in use by another application, `docker compose up` fails with "port already allocated." Making ports configurable via environment variables lets the user override without editing `docker-compose.yml`.

## Changes

### 1. `docker-compose.yml` — replace hardcoded host ports with env vars

| Service | Current | New |
|---|---|---|
| postgres | `5432:5432` | `${POSTGRES_PORT:-5432}:5432` |
| app (backend) | `8080:8080` | `${BACKEND_PORT:-8080}:8080` |
| frontend | `3000:80` | `${FRONTEND_PORT:-3000}:80` |

Defaults stay the same — no change for users who don't set the vars.

### 2. `README.md` — document the override

Add a note to the Quick Start or Services table showing how to override, e.g.:

```bash
FRONTEND_PORT=3001 docker compose up
```

## Verification

```bash
# Default ports still work
docker compose up -d --wait
curl http://localhost:8080/actuator/health
curl http://localhost:3000

# Custom port works
docker compose down
FRONTEND_PORT=3001 docker compose up -d --wait
curl http://localhost:3001
```