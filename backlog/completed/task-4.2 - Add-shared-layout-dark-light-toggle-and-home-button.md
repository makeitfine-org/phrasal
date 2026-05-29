---
id: TASK-4.2
title: 'Add shared layout: dark/light toggle and home button'
status: Done
assignee: []
created_date: '2026-05-29 15:14'
updated_date: '2026-05-29 15:39'
labels:
  - ux
  - routing
dependencies: []
parent_task_id: TASK-4
priority: medium
ordinal: 5000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Every page should have a consistent chrome: a dark/light mode toggle and a back-to-home button. Extract these into a shared layout component so both `HomePage` and the `App` (Phrasal Verbs) page use it without duplication.

Context:
- `src/pages/HomePage.tsx` — landing page; currently handles dark mode itself in a `useEffect`
- `src/App.tsx` — quiz page; manages `darkMode` state internally and persists it to `localStorage` under key `phrasalQuizState` (`{ ..., darkMode: boolean }`)
- Both pages need the toggle and the home button
- The home button on the home page itself should be hidden (or disabled)
- Dark mode is applied by toggling the `dark` class on `document.documentElement`
- Tailwind dark-mode variant (`dark:`) is already configured and used throughout
- Keep `src/App.tsx` changes minimal — preference is to add the shared UI around it rather than refactoring its internals
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 A shared layout component (e.g. src/components/Layout.tsx or src/components/PageShell.tsx) wraps both pages
- [x] #2 Dark/light toggle button is visible on every page and switches the theme immediately
- [x] #3 Theme preference persists across page navigation (stored in localStorage phrasalQuizState.darkMode)
- [x] #4 A 'Home' button/link is visible on /phrasal-verbs and navigates back to /
- [x] #5 The 'Home' button is hidden (or not rendered) on the / route
- [x] #6 Toggling dark mode on /phrasal-verbs and then navigating to / preserves the selected theme
<!-- AC:END -->
