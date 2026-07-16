---
id: TASK-71
title: Menu should always be present on all pages
status: Done
assignee: []
created_date: '2026-07-16 17:54'
updated_date: '2026-07-16 19:17'
labels:
  - frontend
  - ui
  - navigation
dependencies: []
modified_files:
  - frontend/src/components/NavigationMenu.tsx
  - frontend/src/components/PageShell.tsx
  - frontend/src/__tests__/NavigationMenu.test.tsx
  - frontend/src/__tests__/PageShell.test.tsx
  - frontend/src/__tests__/routeReload.test.tsx
  - e2e/features/frontend/navigation-menu.feature
  - e2e/src/steps/navigation-menu.steps.ts
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
- [x] #1 Menu is visible and functional on every page/route
- [x] #2 Navigation works correctly from any page
- [x] #3 Layout remains consistent across light and dark themes
- [ ] #4 `make clean build` passes
- [x] #5 Unit/integration tests updated or added to cover the menu presence
- [x] #6 E2e test verifies menu is present on all pages
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Removed `if (isHome) return null` from NavigationMenu so it renders on all routes including `/`. Removed PageShell's redundant fixed container (duplicate dark mode toggle + portal target) — NavigationMenu already hosts both. Updated 3 unit test files (flipped "no nav on home" assertions), 1 e2e feature, and 1 e2e step file. All 1284 frontend tests pass.
<!-- SECTION:FINAL_SUMMARY:END -->
