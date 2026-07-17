---
id: TASK-94
title: Fix phrasal verb card spacing on click
status: Done
assignee: []
created_date: '2026-07-16 19:33'
updated_date: '2026-07-17 16:11'
labels:
  - frontend
  - ui
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/11'
priority: low
type: bug
ordinal: 25000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
When clicking on a phrasal verb, fix the distance between the definition and the example. For items without a picture (or where the line is enough to show all), don't add unnecessary spacing between the definition and the example.

GitHub issue: #11
<!-- SECTION:DESCRIPTION:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Already implemented. VerbPage.tsx unified collapsed/expanded layouts into a single DOM structure with consistent `mt-0.5` spacing. Items without pictures skip the image div entirely (isDefault check). Tests in VerbPageLayout.test.tsx verify expand/collapse behavior.
<!-- SECTION:FINAL_SUMMARY:END -->
