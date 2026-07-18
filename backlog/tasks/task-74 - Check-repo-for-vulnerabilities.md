---
id: TASK-74
title: Check repo for vulnerabilities
status: To Do
assignee: []
created_date: '2026-07-16 19:32'
updated_date: '2026-07-18 18:18'
labels:
  - security
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/43'
priority: medium
type: task
ordinal: 5000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Audit all potential security issues in Docker images (they are open but used for production). Connect vulnerability check tools.

GitHub issue: #43
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Run `npm audit` on frontend and e2e projects — all critical/high vulnerabilities resolved
- [ ] #2 Run OWASP Dependency-Check (or `mvn dependency-check:check`) on backend — no critical CVEs
- [ ] #3 Scan Docker images (`eclipse-temurin:25-jre-alpine`, `nginx:1.27-alpine`, `node:26.3.1-alpine`) with Trivy — no critical/high findings
- [ ] #4 Hardcoded dev credentials in `k8s/base/backend-secret.yaml` documented as dev-only or replaced with a TODO-tracked approach
- [ ] #5 Add automated vulnerability scanning step to CI/CD pipeline (`.github/workflows/ci_cd.yml`)
- [ ] #6 `make clean build` passes
<!-- AC:END -->
