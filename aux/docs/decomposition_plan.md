# Full-Stack Decomposition Plan

## 1. Executive Summary

Decompose the Phrasal Verbs quiz app from a static React SPA (GitHub Pages) into a full-stack application with a Java backend, PostgreSQL database, and AWS deployment. The app will support user accounts, persistent quiz progress, content management via admin panel, and serve real users in production.

**Key decisions:**

| Area | Choice |
|------|--------|
| Backend | Java 21 + Maven + Spring Boot 3.x |
| Database | PostgreSQL (JSONB for content, relational for users/state) |
| Auth | AWS Cognito (50K MAU always free) |
| Admin | Content management CRUD (verbs, grammar entries) |
| Local dev | Docker Compose (primary) + Minikube K8s (optional) |
| Deployment | AWS Free Tier: S3 + CloudFront + EC2 t2.micro + RDS PostgreSQL |
| CI/CD | GitHub Actions |
| Repo structure | Monorepo (frontend/ + backend/) |
| Verb pages | Consolidate 71 hardcoded pages → 1 dynamic route |

---

## 2. Current Architecture

```
┌─────────────────────────────────────────────────┐
│           GitHub Pages (static hosting)          │
│                                                  │
│  React 18 + TypeScript + Vite + Tailwind         │
│  ┌──────────────┐  ┌─────────────────────────┐   │
│  │ Quiz Pages   │  │ Verb Detail Pages (71)   │   │
│  │ App.tsx      │  │ src/pages/{verb}/         │   │
│  │ IWishPage    │  │ VerbPageLayout            │   │
│  └──────────────┘  └─────────────────────────┘   │
│  ┌──────────────────────────────────────────┐    │
│  │ Hardcoded data (src/data/)               │    │
│  │  phrasalVerbs.ts  ~270 RawVerbEntry[]    │    │
│  │  wishData.ts      3 GrammarEntry[]       │    │
│  │  listVerbIndex.ts (derived search index) │    │
│  └──────────────────────────────────────────┘    │
│  State: localStorage only, no auth               │
└─────────────────────────────────────────────────┘
```

- All data baked into JS bundle (~60KB)
- State in `localStorage`: `phrasalQuizState`, `grammarIWishState`, `verbListExpanded`
- No authentication, no user accounts, no API calls
- 71 individual verb page components with hardcoded content
- Deployed via GitHub Actions → GitHub Pages at `/phrasal/`

---

## 3. Target Architecture

### 3.1 Local Development (Docker Compose)

```
┌──────────────────────────────────────────────────┐
│              Docker Compose (local)               │
│                                                   │
│  ┌──────────────┐    ┌────────────────────────┐   │
│  │  frontend    │    │    backend              │   │
│  │  Vite dev    │───▶│    Spring Boot          │   │
│  │  :5173       │    │    :8080                │   │
│  │              │    │    ┌──────────────────┐ │   │
│  │  (proxy /api │    │    │ REST API         │ │   │
│  │   → :8080)   │    │    │ Cognito verify   │ │   │
│  └──────────────┘    │    │ Admin endpoints  │ │   │
│                      │    └──────────────────┘ │   │
│                      └──────────┬──────────────┘   │
│                                 │                   │
│                      ┌──────────▼──────────────┐   │
│                      │    PostgreSQL 16         │   │
│                      │    :5432                 │   │
│                      │    phrasal_db            │   │
│                      └─────────────────────────┘   │
└──────────────────────────────────────────────────┘
```

### 3.2 AWS Production

```
┌──────────────────────────────────────────────────────────┐
│                    AWS Free Tier                          │
│                                                          │
│  ┌─────────────┐     ┌──────────────────────────┐        │
│  │ CloudFront  │────▶│ S3 Bucket                │        │
│  │ CDN         │     │ React build (static)     │        │
│  │ HTTPS       │     │ $0.02/mo                 │        │
│  └──────┬──────┘     └──────────────────────────┘        │
│         │ /api/*                                         │
│         ▼                                                │
│  ┌──────────────────────────────────────────────┐        │
│  │  EC2 t2.micro (1 vCPU, 1GB RAM)             │        │
│  │  Spring Boot app (Docker)                    │        │
│  │  750 hrs/mo free (12 months)                 │        │
│  └──────────────────┬───────────────────────────┘        │
│                     │                                    │
│  ┌──────────────────▼───────────────────────────┐        │
│  │  RDS PostgreSQL db.t3.micro (20GB)           │        │
│  │  750 hrs/mo free (12 months)                 │        │
│  └──────────────────────────────────────────────┘        │
│                                                          │
│  ┌──────────────────────────────────────────────┐        │
│  │  AWS Cognito User Pool                       │        │
│  │  50K MAU always free                         │        │
│  └──────────────────────────────────────────────┘        │
└──────────────────────────────────────────────────────────┘
```

---

## 4. Technology Choices

### 4.1 Database: PostgreSQL

**What we chose:** PostgreSQL 16 with JSONB columns for verb content, relational tables for users and quiz state.

**Alternatives considered:**

| Factor | PostgreSQL | MongoDB | MongoDB + Elasticsearch |
|--------|-----------|---------|------------------------|
| **Verb data storage** | JSONB column — same nested document flexibility | Native document model | Native + full-text search |
| **User accounts & auth** | Relational FK, constraints, CASCADE — natural fit | No referential integrity, manual consistency | Same |
| **Analytics queries** | SQL GROUP BY, window functions, CTEs | Aggregation pipeline — more verbose | Same |
| **Full-text search** | `pg_trgm` / `tsvector` — trivial for 270 records | MongoDB text index | Elasticsearch — overkill |
| **AWS Free Tier** | RDS db.t3.micro (20GB, 12 months free) | No free MongoDB on AWS | ES needs 512MB+ RAM, ~$25/mo |
| **Post-free-tier cost** | ~$15/mo RDS, or free via Supabase/Neon | Atlas M0 free forever (512MB cap) | +$25/mo for ES |
| **Spring ecosystem** | Spring Data JPA — most mature, best docs | Spring Data MongoDB — good | Adds Spring Data Elasticsearch |
| **Schema evolution** | Migrations (Flyway) + JSONB flexibility | Schema-less — slightly easier | Same |
| **Admin panel queries** | SQL — straightforward CRUD | Similar | Similar |
| **Operational complexity** | 1 database to manage | 1 database | 2 databases + sync logic |

**Why PostgreSQL wins for this project:**
1. The app is user-centric (accounts, progress, analytics) — fundamentally relational
2. JSONB gives MongoDB-style flexibility for verb content without a second database
3. Full-text search for 270 records needs zero additional infrastructure
4. One database = one connection pool, one backup strategy, one migration tool
5. RDS free tier stays within AWS (the user's preferred cloud)
6. After free tier: clear migration to Supabase/Neon (free PostgreSQL forever)

**JSONB example — storing verb content:**

```sql
CREATE TABLE verbs (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(100) NOT NULL,
    sections JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- The JSONB column stores the same nested structure as a MongoDB document:
-- [
--   {
--     "particle": "away",
--     "title": "Break away",
--     "meanings": [
--       {
--         "definition": "To flee or escape from someone",
--         "example": "The puppy broke away into the woods.",
--         "imageSrc": "/images/break_away_1.png",
--         "imageAlt": "A puppy escaping"
--       }
--     ]
--   }
-- ]

-- Querying across all meanings (replaces ListSearchModal's in-memory search):
SELECT slug, meaning->>'definition' AS definition
FROM verbs,
     jsonb_array_elements(sections) AS section,
     jsonb_array_elements(section->'meanings') AS meaning
WHERE meaning->>'definition' ILIKE '%escape%';
```

### 4.2 Authentication: AWS Cognito

**What we chose:** AWS Cognito User Pools for managed authentication.

**Alternatives considered:**

| Factor | AWS Cognito | Spring Security + DB | Google OAuth only |
|--------|------------|---------------------|-------------------|
| **Cost** | 50K MAU always free | Free (self-hosted) | Free |
| **Signup/login** | Built-in hosted UI or custom | Custom — must build forms + endpoints | Google consent screen |
| **Password reset** | Built-in email flow | Must implement + email service (SES) | N/A |
| **Social login** | Google, Facebook, Apple built in | Must add Spring OAuth2 Client | Google only |
| **MFA** | Built-in TOTP/SMS | Must implement | Depends on Google account |
| **Email verification** | Built-in | Must implement + email service | Automatic |
| **Local dev testing** | Harder — needs real Cognito pool or LocalStack | Easy — just runs locally | Needs Google OAuth credentials |
| **Vendor lock-in** | AWS-specific | None | Google-specific |
| **Implementation effort** | ~1 day (SDK integration) | ~2-3 days (full auth flows) | ~0.5 days |
| **User audience fit** | Any user | Any user | Only Google account holders |

**Why AWS Cognito:**
1. Eliminates the need to implement password hashing, email verification, password reset
2. 50K MAU is always free — survives beyond the 12-month EC2/RDS free tier
3. Built-in social login (Google) can be added later with zero code changes
4. Integrates natively with other AWS services
5. For a language-learning app serving general users, managed auth reduces security risk

**Integration pattern:**

```
Frontend (React)                    Backend (Spring Boot)
┌─────────────────┐                ┌──────────────────────┐
│ Cognito SDK      │               │ Spring Security       │
│ (aws-amplify)    │               │ + JWT filter          │
│                  │               │                       │
│ 1. User signs up │               │ 4. Validate JWT       │
│ 2. Cognito returns│──JWT token──▶│ 5. Extract user ID    │
│    JWT token      │              │ 6. Authorize request  │
│ 3. Store in       │              │                       │
│    httpOnly cookie│              │                       │
└─────────────────┘                └──────────────────────┘
```

### 4.3 Local Development: Docker Compose + Minikube K8s

**What we chose:** Docker Compose as the primary local development tool, with Minikube K8s manifests available as an alternative.

| Factor | Docker Compose | Kubernetes (Minikube) |
|--------|---------------|----------------------|
| **Startup time** | ~10 seconds | ~60 seconds (cluster boot) |
| **Resource usage** | ~500MB RAM | ~2-4GB RAM (Minikube VM) |
| **Complexity** | 1 YAML file | Multiple manifests + Skaffold |
| **Hot reload** | Vite HMR + Spring DevTools via volume mounts | Skaffold dev rebuilds containers |
| **Matches production** | Close — same containers | Closer — same orchestration model |
| **Learning value** | Docker basics | K8s concepts (pods, services, deployments) |

**Decision:** Docker Compose is the day-to-day default. K8s manifests exist for anyone who wants to practice K8s locally or test K8s-specific behavior.

### 4.4 Deployment: AWS Free Tier (S3 + CloudFront + EC2 + RDS)

**Alternatives considered:**

| Factor | EC2 + S3 (chosen) | EKS | Lambda + API Gateway |
|--------|-------------------|-----|---------------------|
| **Monthly cost** | $0 (free tier) | ~$87/mo (control plane alone is $73) | $0 (free tier) |
| **Complexity** | Low — Docker on EC2 | High — K8s ops | Medium — cold starts, packaging |
| **Java cold start** | N/A — always running | N/A | 3-10s (even with SnapStart) |
| **Memory for Spring Boot** | 1GB (tight but works with tuning) | Configurable | 512MB-3GB per invocation |
| **Scaling** | Manual (single instance) | Auto (HPA) | Automatic |
| **Suits this app** | Yes — low traffic, single user initially | Overkill | Possible but cold starts hurt UX |

**Why EC2 + S3:**
- $0/month during free tier period
- Simple deployment: `docker pull` + `docker-compose up`
- 1GB RAM is sufficient for Spring Boot with JVM tuning (`-Xms256m -Xmx512m`)
- RDS handles PostgreSQL — no need to run DB on the same instance
- CloudFront provides HTTPS + CDN for the React frontend for free

### 4.5 Project Structure: Monorepo

| Factor | Monorepo (chosen) | Separate repos |
|--------|-------------------|----------------|
| **Full-stack changes** | One PR | Two PRs, coordinate merging |
| **Docker Compose** | Root references `./frontend` and `./backend` | Must clone both repos or use submodules |
| **CI/CD** | One workflow builds+tests+deploys everything | Separate pipelines, harder to coordinate |
| **Solo developer** | One `git clone`, one workspace | Unnecessary overhead |
| **Team scaling** | Gets unwieldy at ~10+ developers | Better isolation for larger teams |

### 4.6 Verb Pages: Consolidation (71 → 1 dynamic route)

| Factor | Consolidated (chosen) | Keep individual pages |
|--------|----------------------|----------------------|
| **Adding a new verb** | Admin panel click (no code change) | New TSX file + route + tests = PR |
| **Code to maintain** | 1 `VerbDetailPage.tsx` | 71 `*VerbPage.tsx` files |
| **Tests** | 1 component test + API integration tests | 71 test helper files + per-particle tests |
| **Content editing** | Admin panel edits DB record | Edit hardcoded TSX, deploy |
| **Data ownership** | Database (source of truth) | Source code (scattered across 71 files) |
| **Migration effort** | Must export all verb page data to DB | No migration needed initially |

---

## 5. Monorepo Structure

```
phrasal/
├── frontend/                          # React app (moved from root)
│   ├── src/
│   │   ├── api/                       # NEW — API client layer
│   │   │   ├── client.ts              # fetch wrapper, base URL config
│   │   │   ├── verbs.ts              # getVerbs(), getVerbPage(), searchVerbs()
│   │   │   ├── grammar.ts            # getWishData()
│   │   │   └── quizState.ts          # getState(), saveState()
│   │   ├── auth/                      # NEW — Cognito integration
│   │   │   ├── AuthProvider.tsx        # React context for auth state
│   │   │   ├── LoginPage.tsx          # Login/signup form
│   │   │   └── cognitoConfig.ts       # Cognito pool IDs, region
│   │   ├── admin/                     # NEW — Admin panel pages
│   │   │   ├── AdminLayout.tsx        # Admin shell (sidebar + content)
│   │   │   ├── VerbListAdmin.tsx      # List/edit/delete verbs
│   │   │   ├── VerbFormAdmin.tsx      # Add/edit verb form
│   │   │   └── GrammarAdmin.tsx       # Manage grammar entries
│   │   ├── hooks/
│   │   │   ├── useApi.ts             # NEW — generic fetch hook
│   │   │   └── useQuizState.ts       # NEW — replaces localStorage
│   │   ├── components/                # Existing (mostly unchanged)
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── PhrasalVerbsPage.tsx
│   │   │   ├── PhrasalVerbsListPage.tsx
│   │   │   ├── VerbDetailPage.tsx     # NEW — replaces 71 individual pages
│   │   │   ├── IWishPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   ├── types.ts                   # Existing + extended
│   │   └── main.tsx                   # Simplified routing
│   ├── nginx.conf                     # NEW — production serving
│   ├── Dockerfile                     # NEW
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                           # NEW — Java Spring Boot
│   ├── src/main/java/com/phrasal/
│   │   ├── PhrasalApplication.java
│   │   ├── config/
│   │   │   ├── SecurityConfig.java    # Cognito JWT validation
│   │   │   └── CorsConfig.java
│   │   ├── controller/
│   │   │   ├── VerbController.java
│   │   │   ├── GrammarController.java
│   │   │   ├── QuizStateController.java
│   │   │   └── AdminController.java
│   │   ├── service/
│   │   │   ├── VerbService.java
│   │   │   ├── GrammarService.java
│   │   │   └── QuizStateService.java
│   │   ├── repository/
│   │   │   ├── VerbRepository.java
│   │   │   ├── GrammarRepository.java
│   │   │   └── QuizStateRepository.java
│   │   ├── entity/
│   │   │   ├── Verb.java
│   │   │   ├── GrammarEntry.java
│   │   │   ├── QuizState.java
│   │   │   └── AppUser.java
│   │   ├── dto/
│   │   │   ├── VerbResponse.java
│   │   │   ├── VerbPageResponse.java
│   │   │   ├── GrammarResponse.java
│   │   │   └── QuizStateRequest.java
│   │   └── seed/
│   │       └── DataSeeder.java
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   ├── application-local.yml
│   │   ├── db/migration/              # Flyway migrations
│   │   │   ├── V1__create_schema.sql
│   │   │   └── V2__seed_data.sql
│   │   └── seed-data/
│   │       ├── phrasal-verbs.json
│   │       └── wish-data.json
│   ├── src/test/java/com/phrasal/
│   │   └── ...                        # Integration tests (Testcontainers)
│   ├── Dockerfile
│   └── pom.xml
│
├── k8s/                               # Kubernetes manifests (optional)
│   ├── base/
│   │   ├── namespace.yaml
│   │   ├── frontend-deployment.yaml
│   │   ├── backend-deployment.yaml
│   │   ├── postgres-statefulset.yaml
│   │   └── kustomization.yaml
│   └── overlays/
│       └── local/
│           └── kustomization.yaml
│
├── docker-compose.yml                 # Primary local dev
├── docker-compose.prod.yml            # Production (backend + postgres only)
├── skaffold.yaml                      # K8s dev workflow
├── .github/workflows/
│   ├── ci.yml                         # Test on PR
│   └── deploy-aws.yml                 # Deploy on tag
└── aux/docs/
    └── decomposition_plan.md          # This document
```

---

## 6. Backend Design

### 6.1 Spring Boot Project

**Dependencies (pom.xml):**

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.3.0</version>
</parent>

<properties>
    <java.version>21</java.version>
</properties>

<dependencies>
    <!-- Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- Database -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>org.flywaydb</groupId>
        <artifactId>flyway-core</artifactId>
    </dependency>

    <!-- Security (Cognito JWT) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
    </dependency>

    <!-- Ops -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>

    <!-- Dev -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
    </dependency>

    <!-- Test -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.testcontainers</groupId>
        <artifactId>postgresql</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

### 6.2 PostgreSQL Schema

```sql
-- V1__create_schema.sql (Flyway migration)

-- Verbs: content stored as JSONB for document-style flexibility
CREATE TABLE verbs (
    id          SERIAL PRIMARY KEY,
    slug        VARCHAR(50) UNIQUE NOT NULL,   -- URL-friendly: "break", "take"
    title       VARCHAR(100) NOT NULL,          -- Display: "Break", "Take"
    sections    JSONB NOT NULL,                 -- Particle sections with meanings
    quiz_entries JSONB NOT NULL DEFAULT '[]',   -- Quiz entries for this verb
    is_active   BOOLEAN NOT NULL DEFAULT true,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- GIN index for fast JSONB queries
CREATE INDEX idx_verbs_sections_gin ON verbs USING GIN (sections);

-- Full-text search index
CREATE INDEX idx_verbs_search ON verbs USING GIN (
    to_tsvector('english', title || ' ' || sections::text)
);

-- Grammar entries
CREATE TABLE grammar_entries (
    id              SERIAL PRIMARY KEY,
    category        VARCHAR(50) NOT NULL,        -- "i-wish-if-only"
    sentence        TEXT NOT NULL,                -- Russian sentence
    correct_answers TEXT[] NOT NULL,              -- Array of valid English answers
    is_active       BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Users (synced from Cognito)
CREATE TABLE app_users (
    id              SERIAL PRIMARY KEY,
    cognito_sub     VARCHAR(255) UNIQUE NOT NULL, -- Cognito user ID
    email           VARCHAR(255) UNIQUE NOT NULL,
    display_name    VARCHAR(100),
    role            VARCHAR(20) NOT NULL DEFAULT 'user', -- 'user' | 'admin'
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login_at   TIMESTAMPTZ
);

-- Quiz state (replaces localStorage)
CREATE TABLE quiz_states (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
    quiz_type       VARCHAR(50) NOT NULL,        -- "phrasal" | "grammar-wish"
    mastered        INTEGER[] NOT NULL DEFAULT '{}',
    excluded        INTEGER[] NOT NULL DEFAULT '{}',
    history         JSONB NOT NULL DEFAULT '[]',
    current_index   INTEGER NOT NULL DEFAULT 0,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, quiz_type)
);

-- User preferences (dark mode, etc.)
CREATE TABLE user_preferences (
    user_id         INTEGER PRIMARY KEY REFERENCES app_users(id) ON DELETE CASCADE,
    dark_mode       BOOLEAN NOT NULL DEFAULT false,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**JSONB structure for `verbs.sections`:**

```json
[
  {
    "particle": "away",
    "title": "Break away",
    "meanings": [
      {
        "definition": "To flee or escape from someone or something physically",
        "example": "The puppy slipped its leash and tried to break away into the woods.",
        "imageSrc": "/images/phrasal_verbs/list/default.png",
        "imageAlt": "A puppy escaping into the woods"
      }
    ]
  },
  {
    "particle": "down",
    "title": "Break down",
    "meanings": [...]
  }
]
```

**JSONB structure for `verbs.quiz_entries`:**

```json
[
  {
    "verb": "Break away",
    "definition": "To flee or escape from someone or something physically",
    "sentences": ["The puppy slipped its leash and tried to break away into the woods."],
    "wordsToHide": ["break away"],
    "isLearned": false
  }
]
```

### 6.3 REST API Endpoints

```
Public endpoints (no auth required):
  GET    /api/v1/health                          → health check

Authenticated endpoints (Cognito JWT required):
  GET    /api/v1/verbs                            → all quiz entries
  GET    /api/v1/verbs?learned=false               → active quiz pool
  GET    /api/v1/verbs/browse                      → browse entries with quizIndex
  GET    /api/v1/verbs/pages                       → list of verb page slugs
  GET    /api/v1/verbs/pages/{slug}                → single verb page (sections JSONB)
  GET    /api/v1/verbs/search?q={query}            → full-text search across meanings
  GET    /api/v1/grammar/{category}                → grammar entries by category
  GET    /api/v1/quiz/state/{quizType}             → get user's quiz state
  PUT    /api/v1/quiz/state/{quizType}             → save user's quiz state
  GET    /api/v1/user/preferences                  → get user preferences
  PUT    /api/v1/user/preferences                  → save user preferences

Admin endpoints (admin role required):
  GET    /api/v1/admin/verbs                       → list all verbs (paginated)
  POST   /api/v1/admin/verbs                       → create verb
  PUT    /api/v1/admin/verbs/{id}                  → update verb
  DELETE /api/v1/admin/verbs/{id}                  → delete verb
  GET    /api/v1/admin/grammar                     → list grammar entries
  POST   /api/v1/admin/grammar                     → create grammar entry
  PUT    /api/v1/admin/grammar/{id}                → update grammar entry
  DELETE /api/v1/admin/grammar/{id}                → delete grammar entry
```

### 6.4 Cognito Integration (Backend)

```yaml
# application.yml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://cognito-idp.{region}.amazonaws.com/{userPoolId}
          jwk-set-uri: https://cognito-idp.{region}.amazonaws.com/{userPoolId}/.well-known/jwks.json
```

```java
// config/SecurityConfig.java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/health").permitAll()
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/v1/**").authenticated()
                .anyRequest().permitAll()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtAuthenticationConverter(cognitoJwtConverter()))
            );
        return http.build();
    }

    private JwtAuthenticationConverter cognitoJwtConverter() {
        JwtGrantedAuthoritiesConverter converter = new JwtGrantedAuthoritiesConverter();
        converter.setAuthoritiesClaimName("cognito:groups");
        converter.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
        jwtConverter.setJwtGrantedAuthoritiesConverter(converter);
        return jwtConverter;
    }
}
```

### 6.5 Data Seeder

Export current TypeScript data to JSON, then seed PostgreSQL on first startup:

**Step 1: Export script (one-time)**

```javascript
// scripts/export-data.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'fs';

// Read verb page files to extract sections data
// Read phrasalVerbs.ts to extract quiz entries
// Group by base verb, output to backend/src/main/resources/seed-data/

// Output: phrasal-verbs.json — array of verb objects with sections + quizEntries
// Output: wish-data.json — array of grammar entry objects
```

**Step 2: Spring Boot seeder**

```java
@Component
@Profile("seed")
public class DataSeeder implements CommandLineRunner {

    @Autowired private VerbRepository verbRepository;
    @Autowired private GrammarRepository grammarRepository;
    @Autowired private ObjectMapper objectMapper;

    @Override
    public void run(String... args) throws Exception {
        if (verbRepository.count() > 0) return;

        var verbsJson = new ClassPathResource("seed-data/phrasal-verbs.json");
        List<Verb> verbs = objectMapper.readValue(
            verbsJson.getInputStream(), new TypeReference<>() {}
        );
        verbRepository.saveAll(verbs);

        var grammarJson = new ClassPathResource("seed-data/wish-data.json");
        List<GrammarEntry> entries = objectMapper.readValue(
            grammarJson.getInputStream(), new TypeReference<>() {}
        );
        grammarRepository.saveAll(entries);
    }
}
```

### 6.6 Backend Dockerfile

```dockerfile
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B
COPY src src
RUN ./mvnw package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENV JAVA_OPTS="-Xms256m -Xmx512m"
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
```

---

## 7. Frontend Adaptation

### 7.1 API Client Layer

```typescript
// frontend/src/api/client.ts
const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = await getAuthToken(); // from Cognito
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  del: (path: string) => request(path, { method: 'DELETE' }),
};
```

### 7.2 Replace Hardcoded Data

**Before:**
```typescript
import { allVerbs } from './data/phrasalVerbs';
// allVerbs is immediately available, no loading state
```

**After:**
```typescript
import { verbsApi } from './api/verbs';

const [verbs, setVerbs] = useState<VerbEntry[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  verbsApi.getAll(false).then(setVerbs).finally(() => setLoading(false));
}, []);
```

Files to update:
- `App.tsx` — replace `allVerbs`, `verbsForBrowse` imports
- `IWishPage.tsx` — replace `wishData` import
- `PhrasalVerbsListPage.tsx` — fetch verb list from API
- `ListSearchModal` — call search API instead of `listVerbIndex`
- `AllVerbsModal` — use `verbsApi.browse()`

### 7.3 Replace localStorage with API-backed State

```typescript
// frontend/src/hooks/useQuizState.ts
export function useQuizState<T>(quizType: string, defaultState: T) {
  const [state, setState] = useState<T>(defaultState);
  const [loaded, setLoaded] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    quizStateApi.get(quizType)
      .then((s) => { if (s) setState(s as T); })
      .finally(() => setLoaded(true));
  }, [quizType]);

  const update = (next: T) => {
    setState(next);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      quizStateApi.save(quizType, next);
    }, 500); // debounce saves to reduce API calls
  };

  return { state, update, loaded };
}
```

### 7.4 Consolidate Verb Pages (71 → 1)

**Before (main.tsx):** 71 imports + 71 routes

**After (main.tsx):**
```tsx
<Route path="/phrasal-verbs/list/:verb" element={<VerbDetailPage />} />
```

**VerbDetailPage.tsx:**
```tsx
function VerbDetailPage() {
  const { verb } = useParams<{ verb: string }>();
  const [data, setData] = useState<VerbPageData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!verb) return;
    verbsApi.getPage(verb)
      .then(setData)
      .catch(() => setError(true));
  }, [verb]);

  if (error) return <NotFoundPage />;
  if (!data) return <LoadingSpinner />;

  return <VerbPageLayout title={data.title} sections={data.sections} />;
}
```

The existing `VerbPageLayout` component (`src/components/VerbPage.tsx`) already accepts `title` and `sections` as props — no changes needed to this component.

### 7.5 Cognito Auth Integration (Frontend)

```typescript
// frontend/src/auth/cognitoConfig.ts
export const cognitoConfig = {
  region: import.meta.env.VITE_COGNITO_REGION,
  userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  userPoolWebClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
};
```

Use `@aws-amplify/auth` (lightweight, Cognito-only) or `amazon-cognito-identity-js` for signup/login flows. The auth context provides the JWT token to the API client.

### 7.6 Admin Panel

Simple CRUD pages behind an admin route guard:

```tsx
// In main.tsx routing
<Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
  <Route index element={<AdminDashboard />} />
  <Route path="verbs" element={<VerbListAdmin />} />
  <Route path="verbs/new" element={<VerbFormAdmin />} />
  <Route path="verbs/:id/edit" element={<VerbFormAdmin />} />
  <Route path="grammar" element={<GrammarAdmin />} />
</Route>
```

`AdminGuard` checks the Cognito JWT for the `admin` group claim.

---

## 8. Local Development Setup

### 8.1 Docker Compose (Primary)

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:16-alpine
    ports: ["5432:5432"]
    environment:
      POSTGRES_DB: phrasal_db
      POSTGRES_USER: phrasal
      POSTGRES_PASSWORD: phrasal_local
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U phrasal"]
      interval: 5s
      timeout: 3s
      retries: 5

  backend:
    build: ./backend
    ports: ["8080:8080"]
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/phrasal_db
      SPRING_DATASOURCE_USERNAME: phrasal
      SPRING_DATASOURCE_PASSWORD: phrasal_local
      SPRING_PROFILES_ACTIVE: local,seed
    depends_on:
      postgres:
        condition: service_healthy

  frontend:
    build: ./frontend
    ports: ["80:80"]
    depends_on: [backend]

volumes:
  pgdata:
```

**Dev mode alternative** (hot reload without rebuilding containers):

```yaml
# docker-compose.dev.yml — run only postgres
services:
  postgres:
    image: postgres:16-alpine
    ports: ["5432:5432"]
    environment:
      POSTGRES_DB: phrasal_db
      POSTGRES_USER: phrasal
      POSTGRES_PASSWORD: phrasal_local
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

Then run backend and frontend natively:
```bash
# Terminal 1: Database
docker compose -f docker-compose.dev.yml up

# Terminal 2: Backend (with hot reload via Spring DevTools)
cd backend && ./mvnw spring-boot:run -Dspring-boot.run.profiles=local,seed

# Terminal 3: Frontend (Vite HMR)
cd frontend && npm run dev
```

Vite dev proxy forwards `/api` → backend:

```typescript
// frontend/vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  // ...
});
```

### 8.2 Minikube Kubernetes (Optional)

**Prerequisites:**
```bash
# Install tools
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
sudo snap install kubectl --classic
curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64
sudo install skaffold /usr/local/bin/skaffold

# Start cluster
minikube start --cpus=4 --memory=4g --driver=docker
```

**K8s manifests:** See `k8s/base/` in the monorepo structure above. Key resources:
- PostgreSQL StatefulSet with PVC (1Gi)
- Backend Deployment (Spring Boot)
- Frontend Deployment (nginx)
- Services for each
- Kustomize overlays for local config

**Skaffold configuration:**
```yaml
# skaffold.yaml
apiVersion: skaffold/v4beta11
kind: Config
metadata:
  name: phrasal

build:
  artifacts:
    - image: phrasal-backend
      context: backend
    - image: phrasal-frontend
      context: frontend
  local:
    push: false

manifests:
  kustomize:
    paths: [k8s/base]

deploy:
  kubectl: {}

portForward:
  - resourceType: service
    resourceName: frontend
    namespace: phrasal
    port: 80
    localPort: 8080
  - resourceType: service
    resourceName: backend
    namespace: phrasal
    port: 8080
    localPort: 8081
```

**Usage:**
```bash
eval $(minikube docker-env)
skaffold dev --port-forward
# Frontend: http://localhost:8080
# Backend:  http://localhost:8081/api/v1/health
```

---

## 9. AWS Deployment

### 9.1 Free Tier Resources Used

| Service | Free Tier Allowance | What we use | Duration |
|---------|--------------------| ------------|----------|
| EC2 t2.micro | 750 hrs/mo | Spring Boot app | 12 months |
| RDS db.t3.micro | 750 hrs/mo, 20GB | PostgreSQL | 12 months |
| S3 | 5GB storage | React build (~5MB) | 12 months |
| CloudFront | 1TB transfer/mo | CDN + HTTPS | Always free |
| Cognito | 50K MAU | Auth | Always free |
| ECR | 500MB | Docker images | 12 months |

**Total cost: $0/month** (within free tier limits)

### 9.2 Setup Steps

**1. Create Cognito User Pool:**
```bash
aws cognito-idp create-user-pool \
  --pool-name phrasal-users \
  --auto-verified-attributes email \
  --username-attributes email \
  --policies "PasswordPolicy={MinimumLength=8,RequireNumbers=true}"

aws cognito-idp create-user-pool-client \
  --user-pool-id {pool-id} \
  --client-name phrasal-web \
  --no-generate-secret \
  --explicit-auth-flows ALLOW_USER_SRP_AUTH ALLOW_REFRESH_TOKEN_AUTH

# Create admin group
aws cognito-idp create-group \
  --user-pool-id {pool-id} \
  --group-name admin
```

**2. Create RDS PostgreSQL:**
```bash
aws rds create-db-instance \
  --db-instance-identifier phrasal-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version 16 \
  --master-username phrasal_admin \
  --master-user-password {secure-password} \
  --allocated-storage 20 \
  --storage-type gp3 \
  --no-multi-az \
  --vpc-security-group-ids {sg-id}
```

**3. Create S3 + CloudFront for frontend:**
```bash
aws s3 mb s3://phrasal-frontend-prod

aws cloudfront create-distribution \
  --distribution-config '{
    "Origins": [
      {"Id":"s3","DomainName":"phrasal-frontend-prod.s3.amazonaws.com", ...},
      {"Id":"api","DomainName":"{ec2-public-ip}", "CustomOriginConfig":{"HTTPPort":8080, ...}}
    ],
    "CacheBehaviors": [
      {"PathPattern":"/api/*", "TargetOriginId":"api", ...}
    ],
    "DefaultCacheBehavior": {"TargetOriginId":"s3", ...}
  }'
```

**4. Launch EC2 and deploy backend:**
```bash
aws ec2 run-instances \
  --image-id ami-0c7217cdde317cfec \
  --instance-type t2.micro \
  --key-name {your-key} \
  --security-groups phrasal-backend \
  --block-device-mappings '[{"DeviceName":"/dev/xvda","Ebs":{"VolumeSize":20,"VolumeType":"gp3"}}]'
```

EC2 setup script:
```bash
sudo yum update -y && sudo yum install -y docker
sudo systemctl start docker && sudo systemctl enable docker
sudo usermod -aG docker ec2-user

# Pull and run backend
docker run -d --restart always \
  -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://{rds-endpoint}:5432/phrasal_db \
  -e SPRING_DATASOURCE_USERNAME=phrasal_admin \
  -e SPRING_DATASOURCE_PASSWORD={password} \
  -e SPRING_PROFILES_ACTIVE=prod,seed \
  phrasal-backend:latest
```

### 9.3 Post-Free-Tier Options (Month 13+)

| Path | Monthly cost | Effort |
|------|-------------|--------|
| **Keep AWS** (EC2 + RDS on-demand) | ~$30/mo | None |
| **EC2 reserved** (1yr t4g.nano) + **Supabase free** PostgreSQL | ~$4/mo | Migrate DB (pg_dump/restore) |
| **Railway/Render free** + **Neon free** PostgreSQL | $0/mo | Repackage deploy, may have cold starts |
| **DigitalOcean** ($6 droplet) + **Supabase free** | ~$6/mo | Similar to EC2, simpler UI |

**Recommended post-free-tier path:** Supabase/Neon free PostgreSQL + cheapest VM available. Cognito remains free forever (50K MAU).

### 9.4 CI/CD Pipeline

```yaml
# .github/workflows/deploy-aws.yml
name: Deploy to AWS

on:
  push:
    tags: ['v*']
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Test frontend
        working-directory: frontend
        run: npm ci && npm run test:run

      - name: Test backend
        working-directory: backend
        run: ./mvnw test

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }

      - name: Build frontend
        working-directory: frontend
        run: npm ci && npm run build

      - name: Sync to S3
        run: aws s3 sync frontend/dist/ s3://phrasal-frontend-prod/ --delete
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_DEFAULT_REGION: us-east-1

      - name: Invalidate CloudFront
        run: aws cloudfront create-invalidation --distribution-id ${{ secrets.CF_DIST_ID }} --paths "/*"
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build Docker image
        working-directory: backend
        run: docker build -t phrasal-backend .

      - name: Push to ECR
        run: |
          aws ecr get-login-password | docker login --username AWS --password-stdin ${{ secrets.ECR_REGISTRY }}
          docker tag phrasal-backend ${{ secrets.ECR_REGISTRY }}/phrasal-backend:${{ github.ref_name }}
          docker push ${{ secrets.ECR_REGISTRY }}/phrasal-backend:${{ github.ref_name }}
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_DEFAULT_REGION: us-east-1

      - name: Deploy to EC2
        run: |
          ssh -o StrictHostKeyChecking=no -i <(echo "${{ secrets.EC2_SSH_KEY }}") \
            ec2-user@${{ secrets.EC2_HOST }} \
            "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${{ secrets.ECR_REGISTRY }} && \
             docker pull ${{ secrets.ECR_REGISTRY }}/phrasal-backend:${{ github.ref_name }} && \
             docker stop phrasal-backend || true && \
             docker rm phrasal-backend || true && \
             docker run -d --name phrasal-backend --restart always \
               -p 8080:8080 \
               -e SPRING_DATASOURCE_URL=jdbc:postgresql://${{ secrets.RDS_ENDPOINT }}:5432/phrasal_db \
               -e SPRING_DATASOURCE_USERNAME=${{ secrets.RDS_USER }} \
               -e SPRING_DATASOURCE_PASSWORD=${{ secrets.RDS_PASSWORD }} \
               -e SPRING_PROFILES_ACTIVE=prod \
               ${{ secrets.ECR_REGISTRY }}/phrasal-backend:${{ github.ref_name }}"
```

**Release workflow:**
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
# GitHub Actions: test → deploy frontend to S3 → deploy backend to EC2
```

---

## 10. Cost Analysis

### During AWS Free Tier (Months 1-12)

| Resource | Cost |
|----------|------|
| EC2 t2.micro (750 hrs/mo) | $0 |
| RDS db.t3.micro (750 hrs/mo, 20GB) | $0 |
| S3 (<5GB) | $0 |
| CloudFront (<1TB) | $0 |
| Cognito (<50K MAU) | $0 |
| ECR (<500MB) | $0 |
| Route 53 (optional domain) | $0.50/mo |
| **Total** | **$0 - $0.50/mo** |

### After Free Tier (Month 13+)

| Scenario | EC2 | Database | CDN/Storage | Auth | Total |
|----------|-----|----------|-------------|------|-------|
| **Stay on AWS (on-demand)** | t2.micro $8.50 | RDS db.t3.micro $15 | S3+CF ~$1 | Cognito $0 | ~$25/mo |
| **AWS reserved + Supabase** | t4g.nano $3.80 (1yr) | Supabase free | S3+CF ~$1 | Cognito $0 | ~$5/mo |
| **DigitalOcean + Neon** | $6 droplet | Neon free | DO Spaces ~$0 | Cognito $0 | ~$6/mo |
| **Fully free** | Railway free | Neon free | Cloudflare Pages $0 | Cognito $0 | $0/mo |

---

## 11. Migration Phases

### Phase 1: Backend Foundation (estimated: 1-2 weeks)

- [ ] Initialize Spring Boot project (Java 21, Maven)
- [ ] Set up PostgreSQL schema (Flyway migrations)
- [ ] Create entity classes: `Verb`, `GrammarEntry`, `AppUser`, `QuizState`
- [ ] Create repositories with Spring Data JPA
- [ ] Export current TypeScript data to JSON seed files
- [ ] Write DataSeeder (populates DB on first run)
- [ ] Implement REST controllers: VerbController, GrammarController
- [ ] Implement QuizStateController (replaces localStorage)
- [ ] Set up Cognito JWT validation (SecurityConfig)
- [ ] Implement admin endpoints (CRUD for verbs/grammar)
- [ ] Write integration tests (Testcontainers for PostgreSQL)
- [ ] Create backend Dockerfile
- [ ] **Verify:** `docker build` succeeds, seed data loads, all endpoints return correct data

### Phase 2: Frontend Adaptation (estimated: 1-2 weeks)

- [ ] Move frontend files to `frontend/` directory
- [ ] Create API client layer (`src/api/`)
- [ ] Add Cognito auth integration (AuthProvider, LoginPage)
- [ ] Replace `phrasalVerbs.ts` import in App.tsx with API calls
- [ ] Replace `wishData.ts` import in IWishPage.tsx with API calls
- [ ] Replace `listVerbIndex.ts` in ListSearchModal with search API
- [ ] Replace localStorage with `useQuizState` hook
- [ ] Create `VerbDetailPage.tsx` (dynamic route replaces 71 pages)
- [ ] Delete 71 individual verb page files and their tests
- [ ] Update `main.tsx` routing (add auth routes, admin routes, dynamic verb route)
- [ ] Create admin panel pages (VerbListAdmin, VerbFormAdmin, GrammarAdmin)
- [ ] Add Vite dev proxy for `/api` → `localhost:8080`
- [ ] Create frontend Dockerfile + nginx.conf
- [ ] Update/write frontend tests
- [ ] **Verify:** `npm run build` succeeds, all pages load, quiz state persists via API

### Phase 3: Local Docker & K8s (estimated: 3-5 days)

- [ ] Write `docker-compose.yml` (frontend + backend + postgres)
- [ ] Write `docker-compose.dev.yml` (postgres only, for native dev)
- [ ] Test full stack via `docker compose up`
- [ ] Write K8s manifests (namespace, deployments, services, StatefulSet)
- [ ] Write `skaffold.yaml`
- [ ] Test with Minikube: `skaffold dev --port-forward`
- [ ] **Verify:** both Docker Compose and Minikube paths work end-to-end

### Phase 4: AWS Deployment (estimated: 3-5 days)

- [ ] Create AWS Cognito User Pool + app client
- [ ] Create RDS PostgreSQL instance
- [ ] Create S3 bucket + CloudFront distribution
- [ ] Launch EC2 t2.micro, install Docker
- [ ] Deploy backend to EC2
- [ ] Deploy frontend build to S3
- [ ] Configure CloudFront origins (S3 for `/`, EC2 for `/api/*`)
- [ ] Set up GitHub Actions deploy workflow
- [ ] **Verify:** CloudFront URL → SPA loads → login works → API calls reach EC2 → quiz state persists

### Phase 5: Polish (estimated: 2-3 days)

- [ ] Add CloudWatch basic monitoring (free tier)
- [ ] Set up Route 53 custom domain + ACM certificate (optional)
- [ ] Clean up old GitHub Pages deployment workflow
- [ ] Update README with new architecture and setup instructions
- [ ] Performance test: verify Spring Boot runs within 1GB RAM limit
- [ ] Security review: CORS, CSRF, JWT validation, admin access control

---

## 12. Verification Checklist

### Per-Phase Testing

| Phase | How to verify |
|-------|---------------|
| Phase 1 | `./mvnw test` passes; `curl localhost:8080/api/v1/health` returns OK; seed data visible in DB |
| Phase 2 | `npm run test:run` passes; `npm run build` succeeds; all pages render with API data |
| Phase 3 | `docker compose up` starts all services; app accessible at localhost; Minikube path works |
| Phase 4 | CloudFront URL loads SPA; login/signup works; quiz progress persists across sessions |

### End-to-End Smoke Test

1. Open CloudFront URL → home page renders
2. Sign up with email → Cognito sends verification email
3. Verify email → log in
4. Navigate to phrasal verbs quiz → verbs load from API
5. Answer questions → progress saves
6. Refresh browser → progress restored from API (not localStorage)
7. Navigate to verb list → `/phrasal-verbs/list/break` loads dynamically
8. Search across verbs → results from PostgreSQL full-text search
9. Log in as admin → admin panel accessible
10. Add a new verb via admin → appears in quiz and list immediately
