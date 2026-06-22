# Plan: Migrate Phrasal SPA to Full-Stack Monorepo

## Context

The phrasal verbs quiz app is currently a single React SPA at the repo root. The user wants to restructure it into a full-stack monorepo with `backend/`, `frontend/`, and `e2e/` modules — following the exact patterns from the reference project at `~/dev/mine/claude-ai-spring-boot`.

**Scope**: Infrastructure only. Create the monorepo structure, backend skeleton with DB + REST API + seed data, Dockerfiles, docker-compose, Makefile, e2e skeleton, and CI pipeline. The frontend keeps its hardcoded data — API integration is a separate future task.

**User decisions**:
- Java package: `net.phrasal`
- Auth: None for now (no security)
- Database: PostgreSQL, name `phrasaldb`
- Frontend data stays hardcoded

## Reference Project Patterns (claude-ai-spring-boot)

| Aspect | Pattern |
|--------|---------|
| Architecture | Clean: domain/application/infrastructure/presentation layers |
| Entities | JPA classes with manual getters/setters (no Lombok) |
| DTOs | Plain classes with validation annotations |
| Mappers | MapStruct interfaces (`@Mapper(componentModel = "spring")`) |
| Repositories | Spring Data JPA with `@Query` for search |
| Services | `@Service @Transactional`, constructor injection |
| Controllers | `@RestController`, returns `ResponseEntity<>` |
| Exceptions | `@RestControllerAdvice` with RFC 7807 `ProblemDetail` |
| Migrations | Flyway SQL files (`V1__`, `V2__`, etc.) |
| Testing | JUnit 5 + Testcontainers + JaCoCo (85% coverage) |
| Docker | Multi-stage: maven build → JRE alpine; node build → nginx alpine |
| Makefile | `execute_commands` macro with success/failure messages |
| CI/CD | GitHub Actions: build-and-test → e2e → docker-build |

## Steps

### Step 1: Move React app → `frontend/`

Move these files/dirs into `frontend/`:
- `src/`, `public/`, `index.html`
- `package.json`, `package-lock.json`
- `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`
- `postcss.config.js`, `tailwind.config.js`

Create new files in `frontend/`:
- `Dockerfile` — multi-stage: `node:22-alpine` build → `nginx:1.27-alpine`
- `.dockerignore` — exclude node_modules, dist, .git
- `nginx.conf` — serve SPA + proxy `/api/` to backend

Update `frontend/vite.config.ts`:
- Remove `base: '/phrasal/'` (no longer GitHub Pages)
- Add `server.proxy` for `/api` → `http://localhost:8080`

All existing tests must still pass after the move (`cd frontend && npm test`).

### Step 2: Create `backend/` module

**`backend/pom.xml`**: Spring Boot 3.4.1, Java 21, Maven. Dependencies:
- spring-boot-starter-web, data-jpa, validation, actuator
- postgresql (runtime), flyway-core, flyway-database-postgresql
- mapstruct + mapstruct-processor
- spring-boot-starter-test, testcontainers (test)
- **No security dependencies**

**`backend/Dockerfile`**: Multi-stage (copy from reference pattern)

**Package structure** under `src/main/java/net/phrasal/`:

```
PhrasalApplication.java
config/
  JpaAuditingConfig.java
  WebMvcConfig.java          (CORS config for dev)
domain/
  entity/PhrasalVerb.java    (JPA entity, JSONB for sentences & wordsToHide)
  entity/GrammarEntry.java   (JPA entity, JSONB for correctAnswers)
  repository/PhrasalVerbRepository.java
  repository/GrammarEntryRepository.java
application/
  dto/PhrasalVerbResponse.java
  dto/PhrasalVerbRequest.java
  dto/GrammarEntryResponse.java
  dto/GrammarEntryRequest.java
  mapper/PhrasalVerbMapper.java
  mapper/GrammarEntryMapper.java
  service/PhrasalVerbService.java
  service/GrammarEntryService.java
infrastructure/
  exception/GlobalExceptionHandler.java
  exception/PhrasalVerbNotFoundException.java
  exception/GrammarEntryNotFoundException.java
presentation/
  rest/PhrasalVerbController.java   (GET all, GET by id, POST, PUT, DELETE)
  rest/GrammarEntryController.java  (GET all by category, GET by id, POST, PUT, DELETE)
```

**Database schema** (Flyway migrations):

```sql
-- V1__create_phrasal_verbs_table.sql
CREATE TABLE phrasal_verbs (
    id BIGSERIAL PRIMARY KEY,
    verb VARCHAR(100) NOT NULL,
    definition TEXT NOT NULL,
    sentences JSONB NOT NULL DEFAULT '[]',
    words_to_hide JSONB NOT NULL DEFAULT '[]',
    is_learned BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version BIGINT NOT NULL DEFAULT 0
);

-- V2__create_grammar_entries_table.sql
CREATE TABLE grammar_entries (
    id BIGSERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    sentence TEXT NOT NULL,
    correct_answers JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version BIGINT NOT NULL DEFAULT 0
);

-- V3__create_indexes.sql
CREATE INDEX idx_phrasal_verbs_verb ON phrasal_verbs (verb);
CREATE INDEX idx_phrasal_verbs_is_learned ON phrasal_verbs (is_learned);
CREATE INDEX idx_grammar_entries_category ON grammar_entries (category);

-- V4__seed_phrasal_verbs.sql
-- Migrate all ~270 entries from src/data/phrasalVerbs.ts

-- V5__seed_grammar_entries.sql
-- Migrate 3 entries from src/data/wishData.ts
```

**REST API endpoints**:
- `GET /api/phrasal-verbs` — paginated, filterable by `?learned=false&q=break`
- `GET /api/phrasal-verbs/{id}`
- `POST /api/phrasal-verbs`
- `PUT /api/phrasal-verbs/{id}`
- `DELETE /api/phrasal-verbs/{id}`
- `GET /api/grammar-entries?category=i-wish-if-only`
- `GET /api/grammar-entries/{id}`
- `POST /api/grammar-entries`
- `PUT /api/grammar-entries/{id}`
- `DELETE /api/grammar-entries/{id}`

**`application.yml`**: PostgreSQL datasource, Flyway, JPA (ddl-auto: validate), actuator health endpoint.

### Step 3: Create `e2e/` module

Skeleton following reference pattern:
- `e2e/package.json` — @cucumber/cucumber, playwright, axios, pg, ts-node
- `e2e/cucumber.js` — config with feature paths and reporters
- `e2e/tsconfig.json`
- `e2e/.gitignore`
- `e2e/features/phrasal-verbs-api/crud.feature` — skeleton Gherkin for CRUD
- `e2e/src/hooks.ts`
- `e2e/src/support/api-client.ts`
- `e2e/src/support/db-client.ts`
- `e2e/src/steps/phrasal-verbs-api.steps.ts` — basic step implementations

### Step 4: Root infrastructure files

**`docker-compose.yml`**:
```yaml
services:
  postgres     # postgres:16-alpine, phrasaldb, healthcheck
  app          # backend Dockerfile, depends_on postgres, port 8080
  frontend     # frontend Dockerfile, depends_on app, port 3000
```
No Keycloak, no mailhog (no auth).

**`Makefile`**: Copy structure from reference with phrasal-specific names:
- `clean`, `buildBackend`, `buildFrontend`, `build` (full), `acceptanceTest`
- `dockerAll`, `dockerDown`, `ciCheck`
- `help`
- Telegram `message` target (same pattern)

**`.env`**: Minimal (no IAM/Keycloak vars)

**`.gitignore`**: Merge current gitignore with reference patterns, add `e2e/` exclusions, `target/`, backend build artifacts.

### Step 5: CI/CD pipeline

**`.github/workflows/ci.yml`**: Following reference structure:
1. `build-and-test` job: Java 21, `mvn -f backend/pom.xml clean verify`, upload JaCoCo + test results + JAR
2. `e2e` job: Node 22, docker compose up, run Cucumber tests
3. `docker-build` job: (disabled for now, `if: false`)

### Step 6: Update CLAUDE.md

Update commands section to reflect monorepo:
```bash
# Frontend
cd frontend && npm run dev    # dev server at localhost:5173
cd frontend && npm test       # Vitest watch mode
cd frontend && npm run test:run

# Backend
cd backend && mvn clean verify  # build + test

# Full stack
make build        # build all + docker + e2e
make dockerAll    # build + docker compose up
make dockerDown   # stop containers
make help         # show all targets
```

## Verification

1. `cd frontend && npm run test:run` — all existing tests pass
2. `cd backend && mvn clean verify` — backend builds, tests pass, JaCoCo OK
3. `docker compose up -d --wait` — all 3 services healthy
4. `curl http://localhost:8080/api/phrasal-verbs` — returns seeded verbs
5. `curl http://localhost:8080/actuator/health` — returns UP
6. `http://localhost:3000` — frontend loads and works
7. `cd e2e && npm test` — skeleton tests pass against running stack