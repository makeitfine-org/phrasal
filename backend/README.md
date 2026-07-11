# Phrasal — Backend

Spring Boot 3.5.9 REST API for the Phrasal language learning app. Provides CRUD endpoints for phrasal verbs, grammar entries, and verb details, backed by PostgreSQL with Flyway migrations.

Part of the full-stack **Phrasal** project. Running `docker compose up` from the repository root also starts the React frontend on **port 3000**. See [`../frontend/README.md`](../frontend/README.md) for frontend documentation.

## Features

- **Spring Boot 3.5.9** with Java 25
- **PostgreSQL 16** with Flyway migrations
- **RESTful API** with full CRUD for phrasal verbs, grammar entries, and verb details
- **Pagination and sorting** on list endpoints with sort-field whitelisting
- **MapStruct 1.6.3** for DTO mapping (with Lombok)
- **JSONB columns** for flexible verb detail storage (particles, sections)
- **Comprehensive testing** — JUnit 5, Mockito, Testcontainers
- **85%+ line coverage** enforced by JaCoCo
- **Docker / Docker Compose** support
- **Kubernetes** deployment with Skaffold
- **GitHub Actions** CI/CD pipeline
- **Spring Actuator** health and liveness probes

---

## Prerequisites

- Java 25+
- Maven 3.8+
- Docker and Docker Compose
- PostgreSQL 16 (optional — only for local dev without Docker)
- Kubernetes cluster + Skaffold (only for k8s deployment)

---

## Quick Start

### 1. Run with Docker Compose

```bash
docker compose up
```

Starts:
- PostgreSQL on port **5432**
- Spring Boot app on port **8080**

### 2. Verify

```bash
curl http://localhost:8080/actuator/health
# {"status":"UP"}
```

---

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | PostgreSQL JDBC URL | `jdbc:postgresql://localhost:5432/phrasaldb` |
| `DATABASE_USER` | Database username | `postgres` |
| `DATABASE_PASSWORD` | Database password | `postgres` |
| `SPRING_PROFILES_ACTIVE` | Active Spring profile (`dev` / `prod`) | `dev` |

---

## API Reference

### Phrasal Verbs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/phrasal-verbs?page=0&size=20&sort=verb&q=break&learned=false` | Paginated, filterable list |
| GET | `/api/v1/phrasal-verbs/{id}` | Single verb |
| POST | `/api/v1/phrasal-verbs` | Create verb |
| PUT | `/api/v1/phrasal-verbs/{id}` | Update verb |
| DELETE | `/api/v1/phrasal-verbs/{id}` | Delete verb |

### Grammar Entries

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/grammar-entries?category=i-wish-if-only` | List by category |
| GET | `/api/v1/grammar-entries/{id}` | Single entry |
| POST | `/api/v1/grammar-entries` | Create entry |
| PUT | `/api/v1/grammar-entries/{id}` | Update entry |
| DELETE | `/api/v1/grammar-entries/{id}` | Delete entry |

### Verb Details

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/verb-details?page=0&size=20&sort=verb` | Paginated summary list |
| GET | `/api/v1/verb-details/all` | All verb details (full) |
| GET | `/api/v1/verb-details/{id}` | Single verb detail by ID |
| GET | `/api/v1/verb-details/by-verb/{verb}` | Single verb detail by slug |
| POST | `/api/v1/verb-details` | Create verb detail |
| PUT | `/api/v1/verb-details/{id}` | Update verb detail |
| DELETE | `/api/v1/verb-details/{id}` | Delete verb detail |

### Health / Actuator

No authentication required.

```bash
curl http://localhost:8080/actuator/health
curl http://localhost:8080/actuator/health/liveness
curl http://localhost:8080/actuator/health/readiness
```

---

## Local Development

### Start only the database

```bash
docker compose up postgres -d
cd backend && JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 mvn spring-boot:run
```

### Build and test

```bash
# Full test suite including Testcontainers integration tests + JaCoCo
JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 mvn clean verify

# Coverage report (opens at target/site/jacoco/index.html)
mvn jacoco:report
```

JaCoCo enforces **85% line coverage per package**. `mvn verify` fails if the gate is missed.

---

## Docker Deployment

```bash
# Build image
docker build -t phrasal-backend .

# Start all services (from repo root)
docker compose up -d

# Tail app logs
docker compose logs -f app

# Stop all services
docker compose down
```

---

## Kubernetes Deployment

`skaffold dev` watches `src/` and `pom.xml` for changes and triggers a full image
rebuild automatically (no manual `mvn` step required).

### Prerequisites

```bash
eval $(minikube docker-env)
minikube tunnel    # in a separate terminal
```

### Deploy

```bash
cd backend
skaffold dev    # live rebuild on file changes
# or:
skaffold run    # one-shot deploy
```

```bash
kubectl get pods
kubectl logs -f deployment/backend
```

---

## Database Schema

Flyway runs migrations automatically on startup. Migration files: `src/main/resources/db/migration/V{n}__{description}.sql`.

### Key tables

| Table | Description |
|---|---|
| `phrasal_verbs` | 270 phrasal verbs with definitions, sentences, and learned status |
| `grammar_entries` | Grammar exercises by category (e.g. i-wish-if-only) |
| `verb_details` | 71 verb detail pages with JSONB particles and sections |

---

## Testing

| Test type | Tool |
|---|---|
| Unit | JUnit 5 + Mockito |
| Repository | `@DataJpaTest` + Testcontainers |
| Integration | `@SpringBootTest` + Testcontainers |

```bash
# Full suite (integration + coverage gate)
JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 mvn verify
```

Docker must be running for Testcontainers (PostgreSQL `postgres:16-alpine`).

---

## Project Structure

```
src/
├── main/
│   ├── java/net/phrasal/
│   │   ├── config/           # JpaAuditingConfig, WebMvcConfig (CORS)
│   │   ├── domain/
│   │   │   ├── entity/       # PhrasalVerb, GrammarEntry, VerbDetail
│   │   │   └── repository/   # Spring Data JPA repos with @Query
│   │   ├── application/
│   │   │   ├── dto/          # Java 25 records (request + response)
│   │   │   ├── mapper/       # MapStruct interfaces
│   │   │   └── service/      # Business logic (@Transactional)
│   │   ├── infrastructure/
│   │   │   └── exception/    # @RestControllerAdvice, RFC 7807
│   │   └── presentation/
│   │       └── rest/         # REST controllers (/api/v1/*)
│   └── resources/
│       ├── application.yml
│       └── db/migration/     # Flyway SQL migrations
└── test/
    └── java/net/phrasal/     # JUnit 5 + Testcontainers
```

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Spring Boot 3.5.9, Java 25 |
| Database | PostgreSQL 16, Spring Data JPA, Flyway |
| Mapping | MapStruct 1.6.3 + Lombok |
| Testing | JUnit 5, Mockito, Testcontainers |
| Coverage | JaCoCo 0.8.15 |
| Build | Maven |
| Containers | Docker, Docker Compose |
| Orchestration | Kubernetes, Skaffold |
| CI/CD | GitHub Actions |
| Monitoring | Spring Actuator |

---

## Troubleshooting

**App won't start**
```bash
docker compose ps          # is postgres running?
docker compose logs app    # check startup errors
```

**Database connection error** — verify `DATABASE_URL`, `DATABASE_USER`, `DATABASE_PASSWORD` match your running PostgreSQL instance.

**Tests fail** — Docker must be running (Testcontainers spins up a real PostgreSQL). Run with `-X` for verbose output: `mvn test -X`.

---

## Version

Current version: **0.1.0**
