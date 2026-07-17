---
id: TASK-95
title: Allow flexible input checking rules in quiz
status: Done
assignee: []
created_date: '2026-07-16 19:33'
updated_date: '2026-07-17 16:10'
labels:
  - frontend
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/7'
priority: medium
type: enhancement
ordinal: 26000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Allow flexible checking rules for quiz answers. For example, for "get by", accept variations like "get bY" (case-insensitive) and "  get    By" (extra whitespace).

GitHub issue: #7
<!-- SECTION:DESCRIPTION:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Already implemented. Grammar quiz uses `normalizeAnswer()` (toLowerCase, trim, strip punctuation, collapse spaces). Phrasal verb quiz uses its own normalization (toLowerCase, trim, strip parentheses). Both tested in normalizeAnswer.test.ts and quiz test suites.
<!-- SECTION:FINAL_SUMMARY:END -->
