---
id: TASK-81
title: Write load tests
status: Skip
assignee: []
created_date: '2026-07-16 19:33'
updated_date: '2026-07-18 18:18'
labels:
  - testing
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/34'
priority: medium
type: task
ordinal: 12000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Write concurrent load tests for simultaneous users: 20, 30, and 100 users.

GitHub issue: #34
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Load test scripts created using k6 (or Gatling/JMeter) covering: `GET /api/v1/phrasal-verbs`, `GET /api/v1/grammar-entries`, `GET /api/v1/verb-details`
- [ ] #2 Test scenarios for 20, 30, and 100 concurrent users with configurable duration
- [ ] #3 Response time thresholds defined: p95 < 500ms for read endpoints under 30 users
- [ ] #4 Test results report generated with metrics: throughput, latency percentiles, error rate
- [ ] #5 Performance baseline documented for the current VPS (1 CPU, 1 GB RAM)
- [ ] #6 Load test scripts runnable via a Makefile target or documented command
<!-- AC:END -->
