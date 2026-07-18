---
id: TASK-87
title: Clean or migrate cookies after new release
status: Skip
assignee: []
created_date: '2026-07-16 19:33'
updated_date: '2026-07-18 18:19'
labels:
  - frontend
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/21'
priority: medium
type: task
ordinal: 18000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Clean the cookies or migrate them after deploying a new release to avoid stale state.

GitHub issue: #21
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 App version stored alongside localStorage state (e.g., `stateVersion` field in `phrasalQuizState` and `grammarIWishState`)
- [ ] #2 On app load, detect if stored state version differs from current app version
- [ ] #3 Migration logic preserves user progress (`mastered`, `excluded`, `history`) when schema is compatible
- [ ] #4 When schema is incompatible, localStorage is cleared with a one-time toast/notification explaining the reset
- [ ] #5 Versioned expand states (`verbListExpanded`, `*_section_expanded`) cleaned up if their format changes
- [ ] #6 Unit tests for version detection, compatible migration, and incompatible-schema cleanup
- [ ] #7 `make clean build` passes
<!-- AC:END -->
