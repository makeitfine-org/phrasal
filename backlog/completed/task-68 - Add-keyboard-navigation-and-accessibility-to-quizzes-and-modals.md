---
id: TASK-68
title: Add keyboard navigation and accessibility to quizzes and modals
status: Done
assignee:
  - claude
created_date: '2026-06-17'
updated_date: '2026-06-17 22:36'
labels:
  - feature
  - accessibility
dependencies: []
modified_files:
  - src/hooks/useFocusTrap.ts
  - src/components/ExcludedModal.tsx
  - src/components/SearchModal.tsx
  - src/components/AllVerbsModal.tsx
  - src/components/ListSearchModal.tsx
  - src/components/TutorialModal.tsx
  - src/components/VerbPage.tsx
  - src/components/QuizCard.tsx
  - src/components/NavigationControls.tsx
  - src/components/PageShell.tsx
  - src/__tests__/useFocusTrap.test.tsx
  - src/__tests__/VerbPageLayout.test.tsx
  - src/__tests__/ExcludedModal.test.tsx
  - src/__tests__/SearchModal.test.tsx
  - src/__tests__/AllVerbsModal.test.tsx
  - src/__tests__/ListSearchModal.test.tsx
  - src/__tests__/TutorialModal.test.tsx
  - src/__tests__/QuizCard.test.tsx
  - src/__tests__/NavigationControls.test.tsx
  - src/__tests__/PageShell.test.tsx
priority: medium
ordinal: 68000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The app lacks keyboard navigation and core accessibility attributes. Improving these will benefit power users and screen reader users.

### Keyboard navigation for quizzes
- **Arrow keys**: Left/Right arrow keys to navigate between quiz cards (same as swipe and back/forward buttons)
- **Escape**: Close any open modal
- **Enter**: Already submits the answer input — verify it works consistently

### Modal accessibility
All 5 modals (`ExcludedModal`, `SearchModal`, `AllVerbsModal`, `ListSearchModal`, `TutorialModal`) need:
- `role="dialog"` and `aria-modal="true"`
- `aria-labelledby` pointing to the modal title
- Focus trap: tab cycling stays within the modal while open
- Focus restore: return focus to the trigger element on close
- Escape key closes the modal

### ARIA labels
- Quiz card answer input: `aria-label="Your answer"`
- Navigation buttons (back/forward): `aria-label="Previous card"` / `aria-label="Next card"`
- Section expand/collapse headers in `VerbPageLayout`: `aria-expanded` attribute reflecting state
- Meaning cards in `VerbPageLayout`: `aria-expanded` attribute on expandable cards
- Dark mode toggle in `PageShell`: `aria-label` indicating current state

### Skip link
Add a skip-to-content link in `PageShell` for keyboard users to bypass the navigation bar.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Left/Right arrow keys navigate quiz cards in both `App` and `IWishPage` (only when input is not focused)
- [x] #2 Escape key closes any open modal across all pages
- [x] #3 All 5 modals have `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`
- [x] #4 All 5 modals trap focus (Tab/Shift+Tab cycle within modal)
- [x] #5 All 5 modals restore focus to the trigger button on close
- [x] #6 `VerbPageLayout` section headers have `aria-expanded` reflecting expand/collapse state
- [x] #7 Quiz input has `aria-label`, navigation buttons have descriptive `aria-label`s
- [x] #8 `PageShell` includes a skip-to-content link
- [x] #9 Tests added/updated for keyboard navigation and aria attributes
- [x] #10 `npm run test:run` passes
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Phase 1: Create `src/hooks/useFocusTrap.ts`
Shared hook for all 5 modals: focus trap (Tab wrapping) + focus restore on unmount.

### Phase 2: Update 5 modals (AC #3, #4, #5)
Add `role="dialog"`, `aria-modal`, `aria-labelledby`/`aria-label`, call `useFocusTrap`, add `aria-label="Close"` to close buttons.

### Phase 3: VerbPageLayout (AC #6)
Section headers + meaning cards: `role="button"`, `tabIndex={0}`, `aria-expanded`, keyboard handlers.

### Phase 4: Quiz input + nav buttons (AC #7)
`aria-label="Your answer"` on input, `aria-label="Previous card"`/`"Next card"` on nav buttons.

### Phase 5: PageShell skip link + aria-label (AC #8)
Skip-to-content link, `<main id="main-content">`, dark mode toggle aria-label.

### Phase 6: Tests (AC #9)
New + updated test files for all changes.

### Phase 7: Verify `npm run test:run` (AC #10)
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Summary\n\nAdded keyboard navigation and accessibility to quizzes, modals, verb pages, and the page shell.\n\n### New files\n- `src/hooks/useFocusTrap.ts` — shared hook for focus trapping (Tab/Shift+Tab wrapping) and focus restore on unmount\n- `src/__tests__/useFocusTrap.test.tsx` — tests for the hook\n- `src/__tests__/VerbPageLayout.test.tsx` — tests for section/meaning card accessibility\n\n### Modal accessibility (5 modals)\nAll modals (`ExcludedModal`, `SearchModal`, `AllVerbsModal`, `ListSearchModal`, `TutorialModal`) now have:\n- `role=\"dialog\"`, `aria-modal=\"true\"`, `aria-labelledby`/`aria-label`\n- Focus trap via `useFocusTrap` hook\n- Focus restore to trigger element on close\n- `aria-label=\"Close\"` on close buttons\n\n### VerbPageLayout\n- Section headers: `role=\"button\"`, `tabIndex={0}`, `aria-expanded`, Enter/Space keyboard handlers\n- Meaning cards: same treatment\n\n### Quiz components\n- `QuizCard`: `aria-label=\"Your answer\"` on input\n- `NavigationControls`: `aria-label=\"Previous card\"`/`\"Next card\"` on nav buttons\n\n### PageShell\n- Skip-to-content link (`sr-only`, visible on focus)\n- `<main id=\"main-content\">` wrapping children\n- Dark mode toggle: `aria-label` reflecting current state\n\n### Tests\n41 new tests across 10 test files. All 4734 tests pass.
<!-- SECTION:FINAL_SUMMARY:END -->
