---
id: TASK-12
title: Tutorial modal for I wish/if only
status: To Do
assignee: []
created_date: '2026-05-30 17:32'
labels:
  - grammar
  - modal
  - frontend
dependencies:
  - TASK-11
priority: medium
ordinal: 5100
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create a `TutorialModal` component that displays the full "I wish / if only" grammar reference, opened by the "Tutorial" button in `IWishPage`.

## Tutorial content sections
1. **I wish I did** — wish + subject + past simple for present/future wishes
2. **I wish I had done** — wish + subject + past perfect for past regrets
3. **I wish you would do** — wish + person/thing + would + infinitive for annoyances; note that `I wish I would…` is NOT valid
4. **If only** — same as I wish but more emphatic; note `were` is acceptable instead of `was` with I/he/she

Each section: heading, rule explanation, 2–3 example sentences, any notes (including the 🔍 note about were/was).

## Behaviour
- Opened by "Tutorial" button in `IWishPage` (replaces "All Verbs" in the phrasal verbs page)
- Closes on Escape key or click-outside (same pattern as `AllVerbsModal`)
- Scrollable content area for small viewports

## Files to create/modify
- `src/components/TutorialModal.tsx` — new file
- `src/__tests__/TutorialModal.test.tsx` — new tests
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 TutorialModal renders all 4 section headings
- [ ] #2 Each section shows its rule text and example sentences
- [ ] #3 The 'were/was' note is visible
- [ ] #4 Modal closes on Escape keypress
- [ ] #5 Modal closes when clicking outside the content box
- [ ] #6 `npm run test:run` passes
<!-- AC:END -->
