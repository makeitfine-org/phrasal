---
id: TASK-9
title: Grammar landing page and routing
status: Done
assignee: []
created_date: '2026-05-30 17:31'
updated_date: '2026-05-30 17:37'
labels:
  - grammar
  - routing
  - frontend
dependencies: []
modified_files:
  - src/main.tsx
  - src/pages/GrammarPage.tsx
  - src/pages/HomePage.tsx
  - src/__tests__/GrammarPage.test.tsx
  - src/__tests__/HomePage.test.tsx
priority: medium
ordinal: 2100
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add a `/grammar` route and a `GrammarPage.tsx` landing page as the entry point for the new Grammar section. Update `HomePage.tsx` to include a navigation card to Grammar alongside Phrasal Verbs.

## Scope
- Add `/grammar` route in `src/main.tsx`
- Create `src/pages/GrammarPage.tsx` with a navigation card/link to "I wish / if only" (`/grammar/i-wish-if-only`)
- Update `src/pages/HomePage.tsx` to include a "Grammar" navigation entry
- All routes stay wrapped in the existing `PageShell`

## Files to create/modify
- `src/main.tsx` — new route
- `src/pages/GrammarPage.tsx` — new file
- `src/pages/HomePage.tsx` — add Grammar link
- `src/__tests__/GrammarPage.test.tsx` — new tests
- `src/__tests__/HomePage.test.tsx` — extend with Grammar link assertion
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Navigating to /grammar renders GrammarPage with a visible link to /grammar/i-wish-if-only
- [x] #2 HomePage shows a Grammar navigation entry that links to /grammar
- [x] #3 GrammarPage and HomePage tests pass
- [x] #4 `npm run test:run` passes with no regressions
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added /grammar route and GrammarPage with I wish/If only navigation card. Updated HomePage to include Grammar card. Added GrammarPage tests and extended HomePage tests. All 248 tests pass.
<!-- SECTION:FINAL_SUMMARY:END -->
