# Multi-user + TOTP 2FA for phrasal — DRAFT (awaiting user clarification)

## Context
The user wants several people to be able to use phrasal: sign-up, login, and optional or mandatory TOTP 2FA (Google Authenticator and similar apps). They also want to decide where user data lives: Postgres on the Hetzner VPS, or a managed cloud DB, with the top 3 options compared.

## Findings (exploration, 2026-10-26)
**Backend**
- Spring Boot 4.1.2, Java 25.
- No Spring Security and no users table. The API is fully public, including POST, PUT and DELETE on `/api/v1/phrasal-verbs`, `/grammar-entries` and `/verb-details`.
- Entities are `PhrasalVerb`, `GrammarEntry` and `VerbDetail`, all shared reference content seeded by Flyway V4, V5 and V8. The next migration is `V9`.
- The only per-user state in the DB is `phrasal_verbs.is_learned`, and it is currently global. Quiz progress lives in browser localStorage (`frontend/src/hooks/useQuiz.ts`).
- Package layout: `domain/`, `application/`, `presentation/`, `infrastructure/`, `config/`.
- Coding rules: Lombok, MapStruct, records for DTOs, ProblemDetail errors, and Testcontainers for tests.
- JaCoCo requires 85% line coverage per package.
- CORS is set in `backend/src/main/java/net/phrasal/config/WebMvcConfig.java` and has no `allowCredentials`.
- `GlobalExceptionHandler` has a catch-all that would turn security exceptions into 500s.

**Infrastructure**
- Prod Postgres is a single StatefulSet pod, `postgres:16-alpine`, on a 1Gi `local-path` volume. It has no backups and no replication.
- Prod DB credentials are probably still `postgres/postgres`.
- Port 6443 is open to the internet.
- The site is public at `https://phrasal.ddns.net` via Traefik and cert-manager.
- Secrets are plain k8s Secrets. CI generates the prod patch from GitHub Secrets.
- VPS specs: 4 CPU / 8 GB according to `aux/docs/k3sconf.md`. Backlog task-93 says 1 CPU / 1 GB, so the two sources conflict.

**Frontend**
- React 19, react-router 7.
- The fetch client (`src/api/client.ts`) is GET-only, with no credentials and no 401 handling.
- There is no auth UI and no global store.

**Prior ideas**
- `backlog/drafts/todo.md` mentions Cognito and Keycloak.
- `aux/docs/decomposition_plan.md` has an AWS/Cognito/RDS plan and a server-side quiz-state design.

## Open questions (to resolve with user)
- Audience and scale, budget, login methods, and whether to build auth or use an IdP.

## Recommended approach
_TBD after clarification._

## Verification
_TBD._