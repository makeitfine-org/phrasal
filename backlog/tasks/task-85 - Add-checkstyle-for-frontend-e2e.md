---
id: TASK-85
title: Add checkstyle for frontend/e2e
status: To Do
assignee: []
created_date: '2026-07-16 19:33'
updated_date: '2026-07-18 18:19'
labels:
  - tooling
  - frontend
  - e2e
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/23'
priority: medium
type: task
ordinal: 16000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add linting/checkstyle configuration for frontend and e2e projects.

GitHub issue: #23
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 ESLint configured for `frontend/` with TypeScript + React rules (`eslint.config.ts` or equivalent)
- [ ] #2 ESLint configured for `e2e/` with TypeScript + Cucumber/Playwright rules
- [ ] #3 Prettier configured for both `frontend/` and `e2e/` with consistent formatting rules
- [ ] #4 `lint` and `format` npm scripts added to both `frontend/package.json` and `e2e/package.json`
- [ ] #5 All existing frontend and e2e source files pass `npm run lint` without errors
- [ ] #6 CI/CD pipeline runs lint checks for frontend and e2e (fail the build on lint errors)
- [ ] #7 `make clean build` passes
<!-- AC:END -->
