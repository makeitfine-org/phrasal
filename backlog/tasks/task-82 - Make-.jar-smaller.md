---
id: TASK-82
title: Make *.jar smaller
status: Skip
assignee: []
created_date: '2026-07-16 19:33'
updated_date: '2026-07-18 18:19'
labels:
  - backend
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/33'
priority: low
type: enhancement
ordinal: 13000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Reduce the size of the built JAR artifact.

GitHub issue: #33
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Current JAR size measured and documented as baseline
- [ ] #2 Spring Boot layers configuration enabled in `spring-boot-maven-plugin` for efficient Docker layer caching
- [ ] #3 Unused transitive dependencies identified and excluded where safe
- [ ] #4 Final JAR size reduced by at least 10% compared to baseline
- [ ] #5 Backend Dockerfile updated to leverage layered JAR extraction if applicable
- [ ] #6 All existing tests pass — no functionality regression
- [ ] #7 `make clean build` passes
<!-- AC:END -->
