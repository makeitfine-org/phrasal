# Plan: Migrate Project from Java 21 to Java 25

## Context

The project currently targets Java 21 across build config, Docker images, CI/CD, and documentation. The user wants to migrate everything to Java 25. This touches build tooling (pom.xml, Dockerfile), CI workflows, and all docs/CLAUDE.md files that reference Java 21. No source code changes are needed — Java 25 is backwards-compatible with 21.

## Changes

### 1. Build config — `backend/pom.xml`

Three version references to update:

- Line 21: `<java.version>21</java.version>` → `25`
- Line 118: `<source>21</source>` → `25`
- Line 119: `<target>21</target>` → `25`

### 2. Docker images — `backend/Dockerfile`

- Line 2: `maven:3.9-eclipse-temurin-21` → `maven:3.9-eclipse-temurin-25`
- Line 9: `eclipse-temurin:21-jre-alpine` → `eclipse-temurin:25-jre-alpine`

**Note:** Verify these images exist on Docker Hub. If `25-jre-alpine` doesn't exist yet, fall back to `25-jre` (non-alpine).

### 3. CI/CD — `.github/workflows/ci.yml`

- Line 15: `Set up Java 21` → `Set up Java 25`
- Line 18: `java-version: '21'` → `java-version: '25'`

### 4. Documentation — `backend/CLAUDE.md`

- Line 5: `Java 21, Spring Boot 3.4.1` → `Java 25, Spring Boot 3.4.1`
- Line 22: `Java 21 records` → `Java 25 records`

### 5. Documentation — `README.md` (root)

- Line 58: `Java 21 (`JAVA_HOME=...java-21-openjdk-amd64`)` → `Java 25 (`JAVA_HOME=...java-25-openjdk-amd64`)`
- Line 70: `Backend (requires Java 21)` → `Backend (requires Java 25)`
- Line 71: `JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64` → `java-25-openjdk-amd64`
- Line 194: `Java 21, Maven` → `Java 25, Maven`

### 6. Documentation — `backend/README.md`

- Line 9: `Java 21` → `Java 25`
- Line 26: `Java 21+` → `Java 25+`
- Line 118: `java-21-openjdk-amd64` → `java-25-openjdk-amd64`
- Line 125: `java-21-openjdk-amd64` → `java-25-openjdk-amd64`
- Line 205: `java-21-openjdk-amd64` → `java-25-openjdk-amd64`
- Line 223: `Java 21 records` → `Java 25 records`
- Line 243: `Java 21` → `Java 25`

### 7. Files NOT changed (historical/archival — read-only per project rules)

- `blackbox/session-log.md` — historical log entries, append-only
- `aux/docs/decomposition_plan.md` — archival design doc
- `aux/docs/migrate.md` — archival migration doc
- `backlog/drafts/done.md`, `backlog/drafts/hard.md` — completed/archived backlog items
- `backlog/completed/task-53...md` — completed task with example sentence mentioning Java 21
- `.claude/docs/blackbox/audit.md` — audit log, never edited
- `.claude/docs/blackbox/plans/*.md` — frozen plan files, never deleted/edited per policy
- `.claude/skills/` — already updated to Java 25 in prior session

## Files Modified Summary

| File | Change |
|---|---|
| `backend/pom.xml` | `java.version`, `source`, `target` → 25 |
| `backend/Dockerfile` | Both base images → temurin-25 |
| `.github/workflows/ci.yml` | `java-version` → 25 |
| `backend/CLAUDE.md` | Java version references → 25 |
| `README.md` | Java version + JAVA_HOME path → 25 |
| `backend/README.md` | Java version + JAVA_HOME paths → 25 |

## Verification

```bash
make clean build
```

This rebuilds Docker images (testing the new temurin-25 base images), runs `mvn clean verify` (testing Java 25 compilation), and runs all e2e tests. If Docker images don't exist yet for temurin-25, we'll need to adjust the image tags.