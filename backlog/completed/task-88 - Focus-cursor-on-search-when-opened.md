---
id: TASK-88
title: Focus cursor on search when opened
status: Done
assignee: []
created_date: '2026-07-16 19:33'
updated_date: '2026-07-17 16:10'
labels:
  - frontend
  - ui
  - ux
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/20'
priority: low
type: enhancement
ordinal: 19000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
When opening the search, automatically focus the cursor in the search input field.

GitHub issue: #20
<!-- SECTION:DESCRIPTION:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Already implemented. Both SearchModal.tsx and ListSearchModal.tsx use the `autoFocus` prop on the search input. Both modals also use `useFocusTrap` for accessibility.
<!-- SECTION:FINAL_SUMMARY:END -->
