---
id: TASK-4.1
title: Add tests for routing and HomePage
status: Done
assignee: []
created_date: '2026-05-29 15:13'
updated_date: '2026-05-29 15:39'
labels:
  - testing
  - routing
dependencies: []
parent_task_id: TASK-4
priority: medium
ordinal: 4000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The routing feature (added in commit eae1000) introduced `src/main.tsx` routes and `src/pages/HomePage.tsx` but has no test coverage. Add tests to verify both.

Context:
- `src/main.tsx` uses `BrowserRouter` with `basename={import.meta.env.BASE_URL}` and defines two routes: `/` → `<HomePage>`, `/phrasal-verbs` → `<App>`
- `src/pages/HomePage.tsx` renders "English Tutorial" heading, a subtitle, and a `<Link to="/phrasal-verbs">` card
- Dark mode is applied on mount by reading `localStorage.getItem('phrasalQuizState')` and toggling the `dark` class on `<html>`
- Test stack: Vitest + @testing-library/react; test files live in `src/__tests__/`; setup file is `src/__tests__/setup.ts` (jest-dom, scrollIntoView stub, localStorage mock)
- Wrap components under test in `MemoryRouter` from `react-router-dom` (not `BrowserRouter`) so tests don't depend on `import.meta.env`
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Test file src/__tests__/HomePage.test.tsx exists
- [x] #2 Test: HomePage renders 'English Tutorial' heading
- [x] #3 Test: HomePage renders the 'Phrasal Verbs' link card with correct href (/phrasal-verbs)
- [x] #4 Test: HomePage reads darkMode from localStorage and applies 'dark' class to <html> when true
- [x] #5 Test: HomePage does not apply 'dark' class when localStorage darkMode is false or absent
- [x] #6 Test: navigating to /phrasal-verbs renders the App component (route smoke test)
- [x] #7 All existing 157 tests continue to pass
<!-- AC:END -->
