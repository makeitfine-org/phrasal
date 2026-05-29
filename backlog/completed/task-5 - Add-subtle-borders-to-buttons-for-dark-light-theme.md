---
id: TASK-5
title: Add subtle borders to buttons for dark/light theme
status: Done
assignee: []
created_date: '2026-05-29 16:44'
updated_date: '2026-05-29 16:51'
labels:
  - ui
  - polish
  - theming
dependencies: []
modified_files:
  - src/components/QuizCard.tsx
  - src/components/NavigationControls.tsx
  - src/components/Header.tsx
  - src/components/SearchModal.tsx
  - src/components/ExcludedModal.tsx
  - src/components/PageShell.tsx
  - src/__tests__/QuizCard.test.tsx
  - src/__tests__/NavigationControls.test.tsx
  - src/__tests__/Header.test.tsx
  - src/__tests__/SearchModal.test.tsx
  - src/__tests__/ExcludedModal.test.tsx
  - src/__tests__/PageShell.test.tsx
priority: low
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
All interactive buttons across the app (QuizCard, NavigationControls, Header, SearchModal, ExcludedModal, PageShell) should get a thin, elegant border that complements both the dark and light themes.

## Goal
Improve visual polish by giving buttons a clearly defined but unobtrusive border — consistent in radius, weight, and color treatment. Borders should feel "part of the design", not tacked on.

## Scope
- `QuizCard`: Exclude/Excluded toggle button; IDK and Check submit buttons
- `NavigationControls`: Prev/Next chevron buttons; Reset and Next/Skip buttons
- `Header`: Search, ExcludedModal trigger, and Global Reset icon buttons
- `SearchModal`: Close (X) button; list item hover states (optional border-bottom refinement)
- `ExcludedModal`: Close (X) button; Include pill buttons
- `PageShell`: Home link pill; Dark/Light toggle icon button

## Design Notes
- Border weight: `1px` — no heavier
- Light theme: `border-gray-200` or `border-gray-300` depending on button bg
- Dark theme: `border-gray-700` or `border-gray-600` for contrast
- Colored buttons (blue, red, amber, green, orange): use a `border` one shade darker than bg (e.g. `border-blue-700` on `bg-blue-600`)
- Icon-only round buttons: uniform `border` + `rounded-full` already present; just add the border color
- Do NOT change padding, radius, or font-weight — border only
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 All buttons in QuizCard, NavigationControls, Header, SearchModal, ExcludedModal, and PageShell have a 1px border applied
- [x] #2 Border colors adapt correctly in both light and dark mode (no invisible or clashing borders)
- [x] #3 Colored action buttons (blue/red/amber/green/orange) use a border one shade darker than their background
- [x] #4 Icon-only round buttons (Search, ExcludedModal, Reset, Home, DarkMode toggle) have a visible but subtle border
- [x] #5 No existing padding, radius, font-weight, or layout is changed
- [x] #6 npm run test:run passes with no regressions
- [x] #7 Snapshot or className tests added/updated to assert border classes are present on each button variant
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added 1px borders to all interactive buttons across all 6 components. Colored buttons (IDK amber, Check blue, Next/Skip blue) use a border one shade darker than their bg. Icon-only round buttons (Header search/excluded/reset, SearchModal/ExcludedModal close X, PageShell home/toggle) use border-gray-300 dark:border-gray-700. Chevron nav buttons use border-gray-200 dark:border-gray-700. Exclude/Excluded toggle and Include pills already had borders — unchanged. 19 new border-class assertions added across 6 test files. All 184 tests pass.
<!-- SECTION:FINAL_SUMMARY:END -->
