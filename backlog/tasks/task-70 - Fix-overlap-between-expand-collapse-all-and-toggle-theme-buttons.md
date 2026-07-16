---
id: TASK-70
title: Fix overlap between expand/collapse all and toggle theme buttons
status: Done
assignee: []
created_date: '2026-07-16 11:40'
updated_date: '2026-07-16 13:54'
labels:
  - frontend
  - ui
dependencies: []
modified_files:
  - frontend/src/components/NavigationMenu.tsx
  - frontend/src/components/PageShell.tsx
  - frontend/src/__tests__/NavigationMenu.test.tsx
  - e2e/features/frontend/navigation-menu.feature
  - e2e/src/steps/navigation-menu.steps.ts
priority: medium
type: bug
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The "expand/collapse all" and "toggle theme" buttons overlap each other in the UI. They need proper spacing or layout adjustment so they don't visually collide.
This buttons shouldn't be stuck but has small gap.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Buttons do not overlap at any viewport width
- [x] #2 Layout remains consistent across light and dark themes
- [x] #3 Unit/integration tests updated or added to cover the layout fix
- [x] #4 E2e test verifies buttons do not overlap
- [x] #5 `make clean build` passes
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Fix: Move theme toggle into NavigationMenu on non-home pages\n\n**Root cause**: The theme toggle button was positioned `fixed top-3 right-3 z-50` (PageShell) while the expand/collapse button portaled into `#verb-page-actions` inside the `sticky top-0 z-40` NavigationMenu — both occupied the top-right corner on non-home pages, causing overlap.\n\n**Solution**: On non-home pages, the theme toggle now renders inside NavigationMenu's nav bar in a `flex items-center gap-2` container alongside the `#verb-page-actions` portal target, providing 8px spacing. On the home page, the fixed positioning is preserved (NavigationMenu returns null on home).\n\n**Changes**:\n- `NavigationMenu.tsx`: Added `darkMode`/`onToggleDarkMode` props, renders theme toggle in flex container with `gap-2` next to portal target\n- `PageShell.tsx`: Passes dark mode props to NavigationMenu, only renders fixed toggle on home page\n- `NavigationMenu.test.tsx`: 6 new tests for theme toggle rendering, aria-labels, click handler, and flex container layout\n- `navigation-menu.feature`: New e2e scenario verifying no overlap on verb list page\n- `navigation-menu.steps.ts`: Bounding-box overlap detection step definition\n\n**Results**: 1283 unit tests pass, 31 e2e scenarios (212 steps) pass, `make clean build` passes.
<!-- SECTION:FINAL_SUMMARY:END -->
