# CLAUDE.md — backend

## Stack

- Java 25, Spring Boot 3.5.16, PostgreSQL 16
- MapStruct 1.6.3, Lombok (getter/setter/constructor/slf4j)
- Testcontainers, JaCoCo 0.8.15
- Maven, Flyway, Docker, Kubernetes + Skaffold

## Architecture Layers

```
domain/         → entities, repository interfaces only
application/    → services, DTOs, MapStruct mappers
presentation/   → REST controllers (@RestController)
infrastructure/ → exception handlers (@RestControllerAdvice)
config/         → Spring @Configuration classes
```

- Base package: `net.phrasal`
- Never let a lower layer import from a higher layer.
- DTOs live in `application/dto/` — Java 25 records (request with validation, response immutable).
- Mappers in `application/mapper/` — always use MapStruct interfaces (`componentModel = "spring"`), never manual mapping.
- Entities use Lombok `@Getter`/`@Setter`/`@EqualsAndHashCode(of=...)` and JSONB columns.
- Services use `@Slf4j`, `@RequiredArgsConstructor`, `@Service @Transactional`.
- Exception handling via `@RestControllerAdvice` with RFC 7807 ProblemDetail.

## Coding Rules

- Maven `artifactId` = `backend`, version = semantic `MAJOR.MINOR.PATCH` (currently 0.1.0)
- Use **Context7 MCP** before writing any Spring Boot / library API code — training data drifts

## Database Migrations (Flyway)

- File pattern: `src/main/resources/db/migration/V{n}__{description}.sql`
- Never modify an already-applied migration — always add a new one
- Increment `n` sequentially; leave no gaps

## Testing Requirements

- JaCoCo minimum: **85% line coverage per package** (enforced by `mvn verify`)
- Integration tests: Testcontainers (`postgres:16-alpine`) — never H2 for integration
- Both positive and negative cases required for every test class

## Skaffold Dev Builds

The Dockerfile uses BuildKit cache mounts (`--mount=type=cache,target=/root/.m2`) so Maven dependencies are cached across rebuilds without invalidating Docker layer cache. `skaffold dev` incremental rebuilds only re-run the Maven package step, not the dependency download.

`skaffold.yaml` sets `useBuildkit: true` to ensure BuildKit is active.

## Makefile Targets (backend)

Use these from the **repo root** instead of running Maven directly:

| Target | Command |
|---|---|
| `make buildBackend` | `cd backend && mvn clean verify` |
| `make clean` | Docker down + remove images + `mvn clean` + remove frontend dist |

## Version & Delivery Checklist

Before marking any backend task done:
1. `mvn verify` passes (tests + JaCoCo gate)
2. Flyway migration numbered correctly (no gaps, no edits to existing files)
3. `docker-compose.yml` reflects any new env vars or services
4. GitHub Actions `.github/workflows/ci_cd.yml` updated if pipeline steps changed
5. Kubernetes manifests in `k8s/base/` updated for deployment changes
6. Follow `.claude/rules/version-bump-procedure.md` for the full Dockerfile + rebuild sequence
7. For new or updated functionality add or update tests
