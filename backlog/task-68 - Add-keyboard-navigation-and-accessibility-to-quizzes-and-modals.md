---
id: TASK-68
title: Add keyboard navigation and accessibility to quizzes and modals
status: To Do
assignee: []
created_date: '2026-06-17'
updated_date: '2026-06-17'
labels:
  - feature
  - accessibility
dependencies: []
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
- [ ] #1 Left/Right arrow keys navigate quiz cards in both `App` and `IWishPage` (only when input is not focused)
- [ ] #2 Escape key closes any open modal across all pages
- [ ] #3 All 5 modals have `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`
- [ ] #4 All 5 modals trap focus (Tab/Shift+Tab cycle within modal)
- [ ] #5 All 5 modals restore focus to the trigger button on close
- [ ] #6 `VerbPageLayout` section headers have `aria-expanded` reflecting expand/collapse state
- [ ] #7 Quiz input has `aria-label`, navigation buttons have descriptive `aria-label`s
- [ ] #8 `PageShell` includes a skip-to-content link
- [ ] #9 Tests added/updated for keyboard navigation and aria attributes
- [ ] #10 `npm run test:run` passes
<!-- AC:END -->
