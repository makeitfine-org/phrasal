---
id: TASK-84
title: Limit search results amount
status: To Do
assignee: []
created_date: '2026-07-16 19:33'
updated_date: '2026-07-18 18:19'
labels:
  - frontend
  - ui
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/30'
priority: medium
type: enhancement
ordinal: 15000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Limit the number of search results displayed:
- Cap at 10 results
- Show the latest 5-7 last entered
- Add a "load more" button at the end to fetch additional results

GitHub issue: #30
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 SearchModal and ListSearchModal initially display at most 10 results
- [ ] #2 When search input is empty, show the latest 5-7 recently searched verbs (persisted in localStorage)
- [ ] #3 "Load more" button appears at the bottom of results when more than 10 matches exist
- [ ] #4 Each "Load more" click appends the next batch of 10 results
- [ ] #5 Keyboard navigation (ArrowDown/ArrowUp/Enter) works across all loaded results including after "Load more"
- [ ] #6 Unit tests for result limiting, recent searches, and load-more behavior
- [ ] #7 `make clean build` passes
<!-- AC:END -->
