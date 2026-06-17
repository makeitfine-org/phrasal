---
id: TASK-67
title: Extract shared quiz hook from App and IWishPage
status: To Do
assignee: []
created_date: '2026-06-17'
updated_date: '2026-06-17'
labels:
  - refactor
  - tech-debt
dependencies: []
priority: medium
ordinal: 67000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
`App.tsx` (357 lines) and `IWishPage.tsx` (367 lines) duplicate ~80% of their quiz logic: identical state declarations (`mastered`, `excluded`, `history`, `currentIndex`, `revealSentence`, touch swipe state), identical `PersistedState` interface, identical localStorage persistence effect, identical bootstrap/pick-next-card logic, identical navigation callbacks (`goBack`, `goForward`), identical swipe handlers, and identical excluded/search modal wiring.

Extract a `useQuiz(config)` custom hook into `src/hooks/useQuiz.ts` that encapsulates:
- `PersistedState` interface and localStorage read/write (parameterized by storage key)
- `mastered`, `excluded`, `history`, `currentIndex` state + persistence effect
- `revealSentence` state + reset-on-card-change effect
- Bootstrap first card + pick-next-card logic (parameterized by pool size)
- `goBack` / `goForward` navigation callbacks
- Touch swipe state + handlers
- Modal open/close state for `ExcludedModal` and `SearchModal`

Each quiz page then becomes a thin wrapper: configure the hook, render its unique UI, and delegate to the shared quiz components.

### Answer checking stays page-specific
- `App.tsx` uses inline case-insensitive + parentheses-stripped comparison
- `IWishPage.tsx` uses `isAnswerCorrect()` from `normalizeAnswer.ts`

Pass an `checkAnswer: (input: string, correctAnswer: string) => boolean` callback into the hook config.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 New file `src/hooks/useQuiz.ts` exports a `useQuiz(config)` hook
- [ ] #2 `App.tsx` uses `useQuiz` — state declarations and effects removed, only rendering + answer-checking logic remains
- [ ] #3 `IWishPage.tsx` uses `useQuiz` — same reduction as App
- [ ] #4 Both pages behave identically to current behavior (localStorage keys, navigation, modals, swipe)
- [ ] #5 `PersistedState` interface defined once in the hook, not duplicated
- [ ] #6 Existing tests for `App.tsx` and `IWishPage.tsx` pass without modification (behavior unchanged)
- [ ] #7 New unit tests for `useQuiz` hook covering: state init from localStorage, persistence on state change, pick-next-card skipping mastered/excluded, navigation bounds
- [ ] #8 `npm run test:run` passes
<!-- AC:END -->
