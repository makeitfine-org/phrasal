---
id: TASK-93
title: 'Technical improvements: elasticsearch, mongo, caching'
status: Skip
assignee: []
created_date: '2026-07-16 19:33'
updated_date: '2026-07-18 18:19'
labels:
  - backend
  - infrastructure
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/14'
priority: low
type: spike
ordinal: 24000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Investigate technical improvements:
- Elasticsearch for phrasal verbs search
- MongoDB for saving data
- Caching layer

GitHub issue: #14
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Elasticsearch feasibility assessed against VPS constraints (1 CPU, 1 GB RAM) — recommendation with rationale (Fuse.js client-side search already exists as alternative)
- [ ] #2 MongoDB vs PostgreSQL comparison for current data model — pros/cons documented with recommendation to stay or migrate
- [ ] #3 Caching opportunities identified: Spring Cache annotations on read-heavy endpoints (`GET /api/v1/phrasal-verbs`, `GET /api/v1/verb-details`), Redis vs Caffeine trade-offs
- [ ] #4 Each technology assessed on: memory footprint, operational complexity, performance gain, and migration effort
- [ ] #5 Findings documented in spike summary with clear go/no-go recommendation per technology
- [ ] #6 Follow-up backlog tasks created for any approved improvements
<!-- AC:END -->
