---
id: TASK-4.3
title: Add tests for shared layout (theme toggle and home button)
status: Done
assignee: []
created_date: '2026-05-29 15:14'
updated_date: '2026-05-29 15:39'
labels:
  - testing
  - ux
dependencies:
  - TASK-4.2
parent_task_id: TASK-4
priority: medium
ordinal: 6000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Cover the shared layout component added in TASK-4.2 with tests for the dark/light toggle and the home button visibility/navigation behaviour.

Context:
- The shared layout component will live in `src/components/Layout.tsx` (or `PageShell.tsx`) — confirm exact path before writing tests
- Test stack: Vitest + @testing-library/react; files in `src/__tests__/`; setup at `src/__tests__/setup.ts`
- localStorage is mocked in the setup file; use `MemoryRouter` from `react-router-dom` for routing in tests
- This task depends on TASK-4.2 (the layout component must exist first)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Test file src/__tests__/Layout.test.tsx (or matching component name) exists
- [x] #2 Test: theme toggle button renders on every page
- [x] #3 Test: clicking toggle adds/removes 'dark' class on document.documentElement
- [x] #4 Test: theme preference is written to localStorage phrasalQuizState.darkMode after toggle
- [x] #5 Test: 'Home' button is rendered when current route is not /
- [x] #6 Test: 'Home' button is not rendered on the / route
- [x] #7 Test: clicking 'Home' button navigates to /
- [x] #8 All existing tests continue to pass
<!-- AC:END -->
