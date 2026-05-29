---
id: TASK-2
title: Align all phrasalVerbs.js entries with canonical reference data sentences
status: Done
assignee: []
created_date: '2026-05-29 10:29'
updated_date: '2026-05-29 10:34'
labels: []
dependencies: []
modified_files:
  - src/data/phrasalVerbs.js
  - src/__tests__/phrasalVerbs.test.js
  - src/__tests__/__fixtures__/phrasalVerbs.json
priority: medium
ordinal: 2000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Two problems remain after TASK-1:

**A) Wrong sentences** — ~33 existing entries use invented examples that don't match the user's reference data. Each must be replaced with the exact sentence from the reference.

**B) Missing meanings** — 14 sub-usages from the reference data are not yet represented (e.g. Break Off "stop talking", Pick Up "give a ride", Take Off "career success", Come Out "stain removal", Get Along "coping", etc.).

Also one bug: a "Come up" entry is mislabeled and uses "came up with" throughout — it should be removed (Come Up With already has a correct entry).

Constraint: only use sentences from the provided reference data, no invented alternatives.

Net result: 253 → 268 entries.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Every entry for the ~33 verbs in the reference data uses the exact example sentence from that data
- [x] #2 14 new entries added for missing meanings (Break Off stop-talking, Pick Up lift, Pick Up ride, Pick Out identify, Break Away leave-group, Take Off leave-quickly, Take Off career-success, Bring Out publish, Keep Up maintain, Come Up rising, Come Out stain-fabric, Come Off stain-hard, Come Away detach, Get Along coping)
- [x] #3 Mislabeled Come Up / came-up-with entry removed
- [x] #4 Test count updated to 268, fixture regenerated, all tests pass
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Updated 33 existing entries to use the exact sentences from the reference data. Added 16 new entries for missing meanings. Removed the mislabeled Come Up/came-up-with entry. Final count: 253 → 268. All 156 tests pass.
<!-- SECTION:FINAL_SUMMARY:END -->
