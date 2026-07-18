---
id: TASK-72
title: Improve showing while loading
status: To Do
assignee: []
created_date: '2026-07-16 19:32'
updated_date: '2026-07-18 18:18'
labels:
  - frontend
  - ui
  - ux
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/45'
priority: medium
type: enhancement
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Improve the loading experience. Options to consider:
- Show loading indicator from top to bottom
- Show just background and then immediately everything
- Other approaches

GitHub issue: #45
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Skeleton-to-content swap uses a fade-in CSS transition (no abrupt DOM swap blink)
- [ ] #2 Existing `.fade-in` animation (index.css) or equivalent applied to all data-fetching pages (App, IWishPage, VerbDetailPage, PhrasalVerbsListPage)
- [ ] #3 Skeleton component dimensions match real content layout to minimize layout shift
- [ ] #4 Loading-state integration tests updated to verify transition behavior
- [ ] #5 `make clean build` passes
<!-- AC:END -->
