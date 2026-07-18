---
id: TASK-77
title: Introduce English contests between users
status: Skip
assignee: []
created_date: '2026-07-16 19:33'
updated_date: '2026-07-18 18:18'
labels:
  - frontend
  - backend
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/39'
priority: low
type: feature
ordinal: 8000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add competitive English contests/challenges between users.

GitHub issue: #39
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Design document covers: user identification, contest model, scoring rules, and real-time vs async mode
- [ ] #2 Backend: new entity/table for contests with JPA repository, service, and REST controller under `/api/v1/contests`
- [ ] #3 Backend: contest lifecycle endpoints — create, join, submit answer, get results/leaderboard
- [ ] #4 Frontend: contest lobby page where users can create or join a contest
- [ ] #5 Frontend: real-time contest view showing question, timer, and opponent progress
- [ ] #6 Frontend: leaderboard/results page after contest ends
- [ ] #7 Database migration (Flyway) for contest-related tables
- [ ] #8 Unit and integration tests for contest service and controller
- [ ] #9 E2e test covering the contest happy path (create → join → play → results)
- [ ] #10 `make clean build` passes
<!-- AC:END -->
