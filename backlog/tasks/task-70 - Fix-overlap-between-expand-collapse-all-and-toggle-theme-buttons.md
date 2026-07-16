---
id: TASK-70
title: Fix overlap between expand/collapse all and toggle theme buttons
status: To Do
assignee: []
created_date: '2026-07-16 11:40'
updated_date: '2026-07-16 11:44'
labels:
  - frontend
  - ui
dependencies: []
priority: medium
type: bug
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The "expand/collapse all" and "toggle theme" buttons overlap each other in the UI. They need proper spacing or layout adjustment so they don't visually collide.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Buttons do not overlap at any viewport width
- [ ] #2 Layout remains consistent across light and dark themes
- [ ] #3 Unit/integration tests updated or added to cover the layout fix
- [ ] #4 E2e test verifies buttons do not overlap
- [ ] #5 `make clean build` passes
<!-- AC:END -->
