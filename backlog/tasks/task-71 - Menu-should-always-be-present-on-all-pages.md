---
id: TASK-71
title: Menu should always be present on all pages
status: In Progress
assignee: []
created_date: '2026-07-16 17:54'
updated_date: '2026-07-16 17:55'
labels:
  - frontend
  - ui
  - navigation
dependencies: []
priority: medium
type: bug
ordinal: 2000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The navigation menu is not consistently visible across all pages. It should always be rendered regardless of which route the user is on, ensuring consistent navigation throughout the application.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Menu is visible and functional on every page/route
- [ ] #2 Navigation works correctly from any page
- [ ] #3 Layout remains consistent across light and dark themes
- [ ] #4 `make clean build` passes
- [ ] #5 Unit/integration tests updated or added to cover the menu presence
- [ ] #6 E2e test verifies menu is present on all pages
<!-- AC:END -->
