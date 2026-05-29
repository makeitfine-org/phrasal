---
id: TASK-4
title: 'Shared layout, routing tests, and theme toggle'
status: Done
assignee: []
created_date: '2026-05-29 15:13'
updated_date: '2026-05-29 15:49'
labels:
  - testing
  - ux
  - routing
dependencies: []
priority: medium
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Polish the multi-page foundation introduced in the routing PR: add a shared layout with a dark/light theme toggle and a home-page back button visible on every page, cover the new routing and HomePage with tests, and add tests for the shared layout components.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 PageShell shared layout wraps all pages with dark/light toggle and home button
- [x] #2 Routing covers EnglishTutorial and HomePage
- [x] #3 PageShell.test.tsx covers layout, theme toggle, and home button
- [x] #4 HomePage.test.tsx covers the home page
- [x] #5 npm run test:run passes
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Implemented PageShell as a shared layout component wrapping all pages, with a dark/light theme toggle and a home button visible on every route. Added React Router routing with EnglishTutorial and HomePage. Covered both new components with dedicated test files (PageShell.test.tsx, HomePage.test.tsx). All 168 tests pass.
<!-- SECTION:FINAL_SUMMARY:END -->
