# Plan: document fast local dev loop + add devtools

## Context
Running backend+frontend with hot reload without Kubernetes: Postgres in Docker, backend via `mvn spring-boot:run`, frontend via `npm run dev` (Vite already proxies /api and /actuator to :8080; backend defaults to localhost:5432 postgres/postgres). Backend lacks `spring-boot-devtools`, so no auto-restart.

## Changes
1. `backend/pom.xml` — add to `<dependencies>` (after the last dependency, ~line 93-100):
   `org.springframework.boot:spring-boot-devtools`, `<scope>runtime</scope>`, `<optional>true</optional>` (version managed by Boot parent; excluded from the repackaged jar).
2. `README.md` — new section "Local Development (hot reload)" between "Build & Test" (line ~129) and "Kubernetes Deployment" (line ~147):
   - `docker compose up -d postgres`
   - `cd backend && SPRING_PROFILES_ACTIVE=dev mvn spring-boot:run`
   - `cd frontend && npm install && npm run dev` → http://localhost:5173
   - Note: devtools restarts the backend after `mvn compile` / IDE build.
3. `backend/CLAUDE.md` and `frontend/CLAUDE.md` — add a short line about the dev loop / devtools dependency (Delivery Checklist: README and CLAUDE.md must reflect changes).

## Verification
- `cd backend && mvn clean verify` (devtools must not break tests/JaCoCo/packaging).
- Start the dev loop per README, edit a backend class, `mvn compile`, confirm restart in logs; edit a frontend file, confirm HMR.
- Final `make clean build` only with user approval (previously rejected).
- No commit without explicit approval.