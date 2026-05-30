---
id: TASK-9
title: Grammar landing page and routing
status: To Do
assignee: []
created_date: '2026-05-30 17:31'
labels:
  - grammar
  - routing
  - frontend
dependencies: []
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
- [ ] #1 Navigating to /grammar renders GrammarPage with a visible link to /grammar/i-wish-if-only
- [ ] #2 HomePage shows a Grammar navigation entry that links to /grammar
- [ ] #3 GrammarPage and HomePage tests pass
- [ ] #4 `npm run test:run` passes with no regressions
<!-- AC:END -->
