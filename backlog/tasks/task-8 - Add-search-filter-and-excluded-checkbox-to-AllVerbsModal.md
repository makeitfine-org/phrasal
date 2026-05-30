---
id: TASK-8
title: Add search filter and excluded checkbox to AllVerbsModal
status: To Do
assignee: []
created_date: '2026-05-30 15:21'
labels:
  - enhancement
  - modal
  - ux
dependencies: []
references:
  - src/components/SearchModal.tsx
  - src/components/AllVerbsModal.tsx
  - src/App.tsx
priority: medium
ordinal: 2100
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The "Browse all verbs" modal (`AllVerbsModal`) currently renders all entries as a static list. Add the same interactive filtering controls that `SearchModal` has:

1. **Search input** — filters the list in real time by verb name or definition (case-insensitive substring match). Auto-focused on open.
2. **"Show excluded" checkbox** — when unchecked (default) hides verbs that are in the `excluded` set; when checked shows them with an orange "excluded" badge, same badge style as `SearchModal`.

### Design notes
- `AllVerbsModal` covers all `rawData` entries (including `isLearned: true`). Only entries whose index exists in `allVerbs` can be excluded; `isLearned: true` entries have no quiz index, so they never show the excluded badge and are never hidden by the checkbox.
- Pass `excluded: Set<number>` and `allVerbsWithLearned` verb-to-quiz-index map as new props, OR compute a `quizIndex` per entry at the call site in `App.tsx` and pass enriched data. Prefer the latter to keep the component self-contained.
- No keyboard arrow navigation or `onSelect` needed — this is a browse-only modal.
- Sort the list alphabetically by verb name (same as `SearchModal`).
- "No matches found" empty state when the filtered list is empty.

### Files expected to change
- `src/components/AllVerbsModal.tsx` — add query state, showExcluded state, filter/sort logic, search input + checkbox UI
- `src/App.tsx` — pass `excluded` (and quiz-index map if needed) to `AllVerbsModal`
- `src/__tests__/AllVerbsModal.test.tsx` — add tests for search filtering, excluded toggle, badge rendering, empty state
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Search input is auto-focused when the modal opens
- [ ] #2 Typing in the search input filters the list by verb name or definition (case-insensitive substring)
- [ ] #3 List is sorted alphabetically by verb name
- [ ] #4 An 'Excluded' checkbox is rendered below the search input, unchecked by default
- [ ] #5 When unchecked, verbs in the excluded set are hidden from the list
- [ ] #6 When checked, verbs in the excluded set are shown with an orange 'excluded' badge matching SearchModal style
- [ ] #7 isLearned entries (not in allVerbs quiz pool) are never hidden by the checkbox and never show the excluded badge
- [ ] #8 When no verbs match the search query, a 'No matches found' empty state is shown
- [ ] #9 Escape key still closes the modal
- [ ] #10 Backdrop click and X button still close the modal
- [ ] #11 npm run test:run passes
<!-- AC:END -->
