# Plan: Create Full-Stack Decomposition Plan Document

## Context

The user wants to decompose their current static React SPA (phrasal verbs quiz app deployed on GitHub Pages) into a proper full-stack application with a Java backend. This is a real production app — not just a portfolio piece — intended for actual users.

Through an interactive interview, we agreed on all technology choices. The deliverable is a comprehensive document at `.docs/decomposition_plan.md` capturing the architecture, technology decisions with rationale, comparisons, and implementation phases.

An earlier `migrate.md` exists at the repo root with a different tech stack (MongoDB + Elasticsearch + K8s). The new document supersedes it with the agreed-upon stack.

## Agreed Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Backend | Java 21 + Maven + Spring Boot | LTS, battle-tested, full library compatibility |
| Database | PostgreSQL (JSONB for content, relational for users) | One DB for everything, RDS free tier, full-text search built in |
| Auth | AWS Cognito | 50K MAU always free, managed auth, social login support |
| Admin | Content management CRUD | Add/edit/delete verbs and grammar entries via web UI |
| Local dev | Docker Compose (primary) + Minikube K8s (optional) | Both available, Docker Compose is the default |
| Deployment | AWS Free Tier (S3+CloudFront + EC2 + RDS) | $0/month for 12 months, clear post-free-tier migration path |
| CI/CD | GitHub Actions only | Already in use, simple tag-based deploy |
| Project structure | Monorepo (frontend/ + backend/) | Solo developer, one git clone, one CI pipeline |
| Verb pages | Consolidate 71 pages → 1 dynamic route | Content in DB, managed via admin panel |

## What to Create

Write `.docs/decomposition_plan.md` with these sections:

### Document Structure

1. **Executive Summary** — What we're building and why
2. **Current Architecture** — Diagram and description of the static SPA
3. **Target Architecture** — Diagram of the full-stack system (local + AWS)
4. **Technology Choices** — Each technology with:
   - What we chose
   - What we considered (alternatives)
   - Why we chose it (with comparison table)
5. **Monorepo Structure** — Directory tree of the new project layout
6. **Backend Design**
   - Spring Boot project structure
   - PostgreSQL schema (tables + JSONB)
   - REST API endpoints
   - AWS Cognito integration
   - Data seeder (migrate hardcoded TS → PostgreSQL)
7. **Frontend Adaptation**
   - API client layer
   - Replace hardcoded data imports with API calls
   - Replace localStorage with API-backed state
   - Consolidate 71 verb pages → 1 dynamic route
   - Cognito auth integration (login/signup UI)
   - Admin panel pages
8. **Local Development Setup**
   - Docker Compose configuration
   - Minikube K8s manifests + Skaffold
   - Development workflow
9. **AWS Deployment**
   - Architecture diagram (S3 + CloudFront + EC2 + RDS)
   - Free tier resource usage
   - Post-free-tier migration options
   - CI/CD pipeline (GitHub Actions)
10. **Cost Analysis** — Free tier vs post-free-tier options
11. **Migration Phases** — Ordered implementation plan with checklists
12. **Verification** — How to test each phase end-to-end

### Key Files to Reference

- `src/data/phrasalVerbs.ts` — Current data format (~270 entries)
- `src/data/wishData.ts` — Grammar data (3 entries)
- `src/pages/*/` — 71 verb page files to consolidate
- `src/components/VerbPage.tsx` — VerbPageLayout component (stays)
- `src/main.tsx` — Current routing
- `.docs/Deploy.md` — Current GitHub Pages deployment
- `migrate.md` — Previous migration plan (to be superseded)

### Technology Comparisons to Include

1. **PostgreSQL vs MongoDB** — detailed table with JSONB examples
2. **Spring Security + DB vs AWS Cognito vs Google OAuth** — auth comparison
3. **Docker Compose vs K8s** — local dev tradeoffs
4. **EC2+S3 vs EKS vs Lambda** — deployment options
5. **Monorepo vs multi-repo** — project structure
6. **Dynamic verb pages vs individual pages** — consolidation rationale

## Verification

- Document is comprehensive and self-contained
- All technology comparisons include concrete examples
- Architecture diagrams use ASCII art
- PostgreSQL schema includes actual SQL
- API endpoints are fully specified
- Docker Compose and K8s manifests are included
- AWS deployment steps are actionable
- Cost analysis covers free tier AND post-free-tier
- Migration phases are ordered with clear dependencies