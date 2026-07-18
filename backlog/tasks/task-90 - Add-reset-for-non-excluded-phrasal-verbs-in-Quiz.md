---
id: TASK-90
title: Add reset for non-excluded phrasal verbs in Quiz
status: To Do
assignee: []
created_date: '2026-07-16 19:33'
updated_date: '2026-07-18 18:19'
labels:
  - frontend
  - ui
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/17'
priority: medium
type: enhancement
ordinal: 21000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add a reset button/action for phrasal verbs that have not been excluded in the Quiz.

GitHub issue: #17
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 New "Reset progress" button/action in the Header (distinct from the existing global Reset/Trash2 icon)
- [ ] #2 Resets `mastered` set and `history` for non-excluded verbs only — excluded verbs remain in `excluded` set
- [ ] #3 Confirmation dialog shown before reset: "Reset progress for X non-excluded verbs? Excluded verbs will not be affected."
- [ ] #4 After reset, quiz starts from a new random non-excluded verb
- [ ] #5 localStorage (`phrasalQuizState`) updated correctly — excluded indices preserved, mastered/history cleared for non-excluded only
- [ ] #6 Unit tests in useQuiz.test.ts verify: excluded verbs unchanged, mastered cleared, history reset, new verb selected
- [ ] #7 `make clean build` passes
<!-- AC:END -->
