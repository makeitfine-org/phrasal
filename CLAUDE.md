# CLAUDE.md — phrasal (root)

## Monorepo Layout

```
backend/    → Spring Boot 3.4.1 REST API (see backend/CLAUDE.md)
frontend/   → React 18 + Vite SPA        (see frontend/CLAUDE.md)
e2e/        → Cucumber + Playwright acceptance tests (see e2e/CLAUDE.md)
k8s/        → Kustomize manifests (base + dev/prod overlays)
ansible/    → Ansible K3s provisioning + ingress-tls (cert-manager)
aux/        → Checkstyle config, project docs, legacy scripts
docker-compose.yml → postgres:5432, backend:8080, frontend:3000
skaffold.yaml → Root Skaffold config (composes backend + frontend)
```

Module-specific coding rules live in each module's own `CLAUDE.md`.

## Custom Skills (`.claude/skills/`)

Use these project skills proactively when the task matches — don't wait to be asked:

| Skill | When to use |
|---|---|
| `api-contract-review` | Reviewing or changing REST endpoints, before releasing API changes |
| `clean-code` | Refactoring, improving readability, reviewing code quality |
| `design-patterns` | Designing extensible components, implementing GoF patterns |
| `java-architect` | Building/configuring Spring Boot, microservices, reactive, OAuth2/JWT |
| `java-code-review` | Reviewing Java code, PR checks, pre-merge reviews |
| `jpa-patterns` | JPA performance issues (N+1, lazy loading), entity relationships |
| `logging-patterns` | Adding/improving logging, debugging app flow, structured logging |
| `spring-boot-engineer` | Creating controllers, security config, Data JPA repos, WebFlux |
| `spring-boot-patterns` | Spring Boot architecture decisions, exception handling, REST patterns |

## Workflow Defaults

- Plan mode for any task with 3+ steps or an architectural decision
- Session logging: see `.claude/rules/blackbox-policy.md`
- Use **Context7 MCP** proactively for library/API docs — don't wait to be asked
- Use **Custom Skills** proactively for backend Java/Spring work — load the matching skill before starting
- CRITICAL: Commits: semantic message ≤ 80 chars; DO NOT add `Co-Authored-By` trailer
- When compacting, always preserve the full list of modified files and any test commands
- Don't change docs/blackbox/archive-*.md files
- Don't delete anything from docs/blackbox/plans folder
- Don't write any sensitive data (secrets, API keys, passwords, etc.) to `audit.md` or `session-log.md`; 
  They must be replaced with ***** instead.

## Agent Selection Guide

| Task | Agent |
|---|---|
| New REST endpoint / JPA entity / Spring service | `spring-boot-engineer` |
| Architectural decision / package restructure | `java-architect` |
| React component / frontend feature | `general-purpose` |
| Backend test gaps / JaCoCo failures | `test-automator` |
| Security config / auth flows | `security-engineer` |
| Dockerfile / docker-compose changes | `docker-expert` |
| k8s manifests / Skaffold | `kubernetes-specialist` |
| GitHub Actions pipeline changes | `devops-engineer` |
| New/fix Cucumber+Playwright e2e scenario | `test-automator` |
| Pre-merge quality gate | `code-reviewer` |
| Backend naming review | `backend-naming-reviewer` |
| Frontend naming review | `frontend-naming-reviewer` |

Delegate to subagents liberally — keep the main context window clean.
Load skills from `.claude/skills/` for targeted in-context capabilities
(e.g. `jpa-patterns` for N+1 issues, `api-contract-review` before releasing endpoints).

## Makefile

A root `Makefile` provides convenience targets for all common developer workflows. Run `make help` to see the full list.

| Target | What it does |
|---|---|
| `make build` | Full build: backend (Maven) + frontend (npm) + docker rebuild + e2e tests |
| `make buildBackend` | `cd backend && mvn clean verify` |
| `make buildFrontend` | `cd frontend && npm install && npm run build` |
| `make acceptanceTest` | `cd e2e && npm ci && npm test` (stack must be running) |
| `make dockerAll` | Full build then `docker compose up` (foreground) |
| `make dockerDown` | `docker compose down` |
| `make clean` | Docker down + remove images + `mvn clean` + remove frontend dist |
| `make ciCheck` | Strict CI simulation: no-cache docker build, npm ci, mvn verify |
| `make securityScan` | npm audit (frontend/e2e) + OSS Index audit (backend) |
| `make updateFrontend` | Upgrade frontend deps with `npm-check-updates -u && npm install` |
| `make updateAcceptance` | Upgrade e2e deps with `npm-check-updates -u && npm install` |

Prefer `make <target>` over raw commands — targets chain steps correctly and emit pass/fail Telegram notifications.

## Delivery Checklist (cross-cutting)

Before marking any task done:
1. `docker-compose.yml`, Skaffold, k8s configs must reflect any new relevant changes
2. `README.md` files, `CLAUDE.md` files must reflect any new relevant changes
3. GitHub Actions `.github/workflows/ci_cd.yml` must reflect any new relevant changes
4. Every backlog task which modify or extend an existing codebase **must** 
   always modify or extend unit, integration, e2e tests related with this task
5. Every backlog task Acceptance Criteria **must** include `- [ ] \`make clean build\` passes`


<!-- BACKLOG.MD MCP GUIDELINES START -->

<CRITICAL_INSTRUCTION>

## BACKLOG WORKFLOW INSTRUCTIONS

This project uses Backlog.md MCP for all task and project management activities.

**CRITICAL GUIDANCE**

- **Task execution**: When asked to work on or complete a backlog task, move it to `in progress` status IMMEDIATELY — before writing any code or taking any implementation steps.

- If your client supports MCP resources, read `backlog://workflow/overview` to understand when and how to use Backlog for this project.
- If your client only supports tools or the above request fails, call `backlog.get_backlog_instructions()` to load the tool-oriented overview. Use the `instruction` selector when you need `task-creation`, `task-execution`, or `task-finalization`.

- **First time working here?** Read the overview resource IMMEDIATELY to learn the workflow
- **Already familiar?** You should have the overview cached ("## Backlog.md Overview (MCP)")
- **When to read it**: BEFORE creating tasks, or when you're unsure whether to track work

These guides cover:
- Decision framework for when to create tasks
- Search-first workflow to avoid duplicates
- Links to detailed guides for task creation, execution, and finalization
- MCP tools reference

You MUST read the overview resource to understand the complete workflow. The information is NOT summarized here.

</CRITICAL_INSTRUCTION>

<!-- BACKLOG.MD MCP GUIDELINES END -->
