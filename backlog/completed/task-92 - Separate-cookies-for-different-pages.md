---
id: TASK-92
title: Separate cookies for different pages
status: Done
assignee: []
created_date: '2026-07-16 19:33'
updated_date: '2026-07-17 16:10'
labels:
  - frontend
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/15'
priority: medium
type: enhancement
ordinal: 23000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Use separate cookies for different pages so that page-specific state doesn't leak between routes.

GitHub issue: #15
<!-- SECTION:DESCRIPTION:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Already implemented via localStorage (not cookies). Separate keys per page: `phrasalQuizState` for phrasal verb quiz, `grammarIWishState` for grammar quiz, `verbListExpanded` for verb list, and dynamic per-verb keys for detail pages. Test in IWishPage.test.tsx explicitly verifies cross-page isolation.
<!-- SECTION:FINAL_SUMMARY:END -->
