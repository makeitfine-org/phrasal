---
id: TASK-96
title: Improve "I wish / If only" page
status: To Do
assignee: []
created_date: '2026-07-16 19:34'
updated_date: '2026-07-18 18:20'
labels:
  - frontend
  - ui
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/5'
priority: medium
type: enhancement
ordinal: 27000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Several improvements for the "I wish / If only" grammar quiz page:
- Remove "Sentence:" label (useless)
- Move buttons "IDK" and "Check" down, put in front of "Reset" (for all)
- Change "Type phrasal verb" placeholder to "Type sentence"
- Make input multi-line (extend if sentence words have no space)
- Change "explanation:" label to "sentence"

GitHub issue: #5
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 "Sentence:" label/section removed from the grammar quiz card (QuizCard.tsx lines 80-96 — hidden when `sentences` array is empty, but label should not render at all for grammar quiz)
- [ ] #2 "IDK" and "Check" buttons moved below the input field, positioned before the "Reset" button in NavigationControls
- [ ] #3 Input placeholder changed from "Type phrasal verb" to "Type sentence" for the grammar quiz (GrammarQuiz passes a custom placeholder to QuizCard)
- [ ] #4 Input field changed to multi-line `<textarea>` that auto-expands when text wraps (replaces single-line `<input type="text">`)
- [ ] #5 "Explanation:" label changed to "Sentence:" for the grammar quiz (GrammarQuiz passes a custom label to QuizCard)
- [ ] #6 Phrasal verb quiz (App.tsx) retains original labels, placeholder, and button layout — changes scoped to grammar quiz only
- [ ] #7 Unit tests updated to reflect new labels, placeholder, and button positions
- [ ] #8 `make clean build` passes
<!-- AC:END -->
