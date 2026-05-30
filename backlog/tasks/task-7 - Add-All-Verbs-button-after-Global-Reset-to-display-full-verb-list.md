---
id: TASK-7
title: Add "All Verbs" button after Global Reset to display full verb list
status: To Do
assignee: []
created_date: '2026-05-30 14:17'
labels:
  - feature
  - ui
dependencies: []
references:
  - src/data/phrasalVerbs.ts
  - src/components/
  - src/App.tsx
priority: medium
ordinal: 2100
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add a new button placed immediately after the "Global Reset" button. Clicking it opens a view (modal or inline panel) that lists every entry from `rawData` in `src/data/phrasalVerbs.ts` — including verbs that are currently marked `isLearned: true` and excluded ones — showing each verb's name, definition, and all example sentences.

### Behaviour
- Button label: e.g. "All Verbs" (or similar)
- Renders all entries from `rawData` (not the filtered `allVerbs` list)
- Each row shows: **verb**, definition, and every sentence in the `sentences` array
- Dismissible (close button / clicking outside / Escape key)
- Read-only — no interaction beyond browsing and closing

### Implementation hints
- Data source: `rawData` from `src/data/phrasalVerbs.ts`, normalised the same way `allVerbs` is (sentences always `string[]`)
- New component: `src/components/AllVerbsModal.tsx`
- Button sits in the area where Global Reset lives (`App.tsx` or `NavigationControls`)

### Tests
- Unit-test the modal component renders all verbs from `rawData`
- Verify definition and sentences appear for each entry
- Verify the modal can be opened and closed
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 "All Verbs" button is visible next to / after the Global Reset button
- [ ] #2 Clicking the button opens a modal/panel listing ALL rawData entries (including isLearned=true)
- [ ] #3 Each entry displays: verb, definition, and all example sentences
- [ ] #4 Modal is dismissible via a close button and the Escape key
- [ ] #5 Existing quiz flow and Global Reset functionality are unaffected
- [ ] #6 New component AllVerbsModal (or equivalent) added under src/components/
- [ ] #7 Tests cover: modal renders all verbs, shows correct verb/definition/sentences, opens and closes correctly
- [ ] #8 npm run test:run passes
<!-- AC:END -->
