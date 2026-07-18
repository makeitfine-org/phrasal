---
id: TASK-86
title: Show error if loading exceeds 3-5 seconds
status: To Do
assignee: []
created_date: '2026-07-16 19:33'
updated_date: '2026-07-18 18:19'
labels:
  - frontend
  - ux
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/22'
priority: medium
type: enhancement
ordinal: 17000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
If page loading takes more than 3-5 seconds, show an error message: "Might be technical issues" and send a notification to Telegram/email.

GitHub issue: #22
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 If any data-fetching hook (`usePhrasalVerbs`, `useVerbList`, `useVerbDetail`, `useGrammarEntries`) takes longer than 5 seconds, a user-friendly error message is shown: "Might be technical issues"
- [ ] #2 Error state includes a "Retry" button that re-triggers the data fetch
- [ ] #3 A notification is sent to Telegram when a loading timeout occurs (using existing Makefile notification pattern or a lightweight webhook)
- [ ] #4 Timeout threshold is configurable (default 5 seconds)
- [ ] #5 Skeleton continues to show during the timeout window — error replaces skeleton only after threshold
- [ ] #6 Unit tests verify timeout triggers error state and retry resets loading
- [ ] #7 `make clean build` passes
<!-- AC:END -->
