# Phrasal

Full-stack English language learning app featuring phrasal verb quizzes, grammar exercises, and a browsable verb reference library.

## Tech Stack

| Module | Stack |
|---|---|
| **frontend/** | React 18, TypeScript, Vite, Tailwind CSS, react-router-dom v7 |
| **backend/** | Java 21, Spring Boot 3.4, PostgreSQL, Flyway, MapStruct, Maven |
| **e2e/** | Cucumber.js, Playwright, Axios |

## Features

- 270 phrasal verbs with definitions, example sentences, and masked hints
- 71 individual verb detail pages with collapsible particle sections and meaning cards
- Fill-in-the-blank quiz with answer checking and mastered-verb tracking
- Grammar exercises (I wish / If only translation quiz)
- Particle reference page (27 core particle meanings)
- Search and jump to any verb by name or definition
- Exclude/re-include verbs from the quiz pool
- Dark/light mode toggle
- Session history with back/forward navigation
- Keyboard shortcuts and touch swipe support
- All user progress persisted in localStorage

---

## Quick Start

### Prerequisites

- Node.js 22+
- Java 21 (`JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64`)
- Docker & Docker Compose
- PostgreSQL 16 (provided via Docker)

### Development (frontend only)

```bash
cd frontend && npm install && npm run dev
# http://localhost:5173
```

### Full Stack (Docker Compose)

```bash
make dockerAll
# Frontend: http://localhost:3000
# Backend:  http://localhost:8080
# Postgres: localhost:5432 (phrasaldb)
```

```bash
make dockerDown   # stop all containers
```

### Build & Test

```bash
# Frontend
cd frontend && npm run test:run

# Backend (requires Java 21)
cd backend && JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 mvn clean verify

# Full pipeline: build + docker + e2e
make build

# See all targets
make help
```

---

## Project Structure

```
phrasal/
├── frontend/                   # React SPA
│   ├── src/
│   │   ├── main.tsx            # Router setup (ErrorBoundary > BrowserRouter > PageShell)
│   │   ├── App.tsx             # Phrasal verb quiz
│   │   ├── components/         # Shared UI (QuizCard, Header, Feedback, modals, etc.)
│   │   ├── pages/              # Route pages + 71 verb detail pages
│   │   ├── data/               # Phrasal verb data, grammar data, search index
│   │   ├── hooks/              # useQuiz, useFocusTrap
│   │   ├── utils/              # renderSentence, normalizeAnswer
│   │   └── __tests__/          # Vitest + Testing Library (4700+ tests)
│   ├── Dockerfile              # Multi-stage: node:22 build → nginx:1.27
│   ├── nginx.conf              # SPA fallback + /api/ reverse proxy
│   └── vite.config.ts          # Dev proxy: /api → localhost:8080
│
├── backend/                    # Spring Boot REST API
│   ├── src/main/java/net/phrasal/
│   │   ├── domain/             # JPA entities (JSONB columns) + repositories
│   │   ├── application/        # DTOs, MapStruct mappers, services
│   │   ├── presentation/       # REST controllers (/api/phrasal-verbs, /api/grammar-entries)
│   │   ├── infrastructure/     # @RestControllerAdvice, RFC 7807 errors
│   │   └── config/             # JPA auditing, CORS
│   ├── src/main/resources/
│   │   ├── db/migration/       # Flyway: schema + seed data (270 verbs, 3 grammar entries)
│   │   └── application.yml
│   ├── src/test/               # JUnit 5 + Testcontainers (53 tests, 85% JaCoCo coverage)
│   ├── Dockerfile              # Multi-stage: maven:3.9 build → temurin:21-jre
│   └── pom.xml
│
├── e2e/                        # Acceptance tests
│   ├── features/               # Gherkin scenarios
│   └── src/                    # Step definitions, API/DB clients
│
├── docker-compose.yml          # postgres + backend + frontend
├── Makefile                    # Build, test, and Docker targets
├── .github/workflows/ci.yml   # CI: backend → frontend → e2e → docker
└── CLAUDE.md                   # AI assistant project context
```

## REST API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/phrasal-verbs?page=0&size=20&sort=verb&q=break&learned=false` | Paginated, filterable list |
| GET | `/api/phrasal-verbs/{id}` | Single verb |
| POST | `/api/phrasal-verbs` | Create verb |
| PUT | `/api/phrasal-verbs/{id}` | Update verb |
| DELETE | `/api/phrasal-verbs/{id}` | Delete verb |
| GET | `/api/grammar-entries?category=i-wish-if-only` | List by category |
| GET | `/api/grammar-entries/{id}` | Single entry |
| POST | `/api/grammar-entries` | Create entry |
| PUT | `/api/grammar-entries/{id}` | Update entry |
| DELETE | `/api/grammar-entries/{id}` | Delete entry |

## Routes

| Path | Page |
|---|---|
| `/` | Home (choose exercise type) |
| `/phrasal-verbs` | Phrasal verbs hub |
| `/phrasal-verbs/test-most-popular` | Fill-in-the-blank quiz |
| `/phrasal-verbs/particles` | 27 particle core meanings |
| `/phrasal-verbs/list` | Browse all verbs as cards |
| `/phrasal-verbs/list/:verb` | Individual verb detail (71 verbs) |
| `/grammar` | Grammar exercises hub |
| `/grammar/i-wish-if-only` | Translation quiz (Russian to English) |

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `←` / `→` | Navigate back / forward through history |
| `Enter` (after answering) | Go to next card |
| `Escape` | Reveal the answer (IDK) |
| `` ` `` or `Ctrl+R` | Reset current card |

Touch: swipe left/right for next/previous card.

## Adding a New Verb

Append to `frontend/src/data/phrasalVerbs.ts`:

```ts
["Verb phrase", "Definition", "Example sentence.", ["verb", "phrase"], false],
//                                                                      ^ false = active in quiz
```

Set the 5th field to `true` to mark as learned (excluded from quiz pool).
