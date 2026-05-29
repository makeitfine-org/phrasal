---
id: TASK-1
title: Extend phrasalVerbs.js with new entries and meanings from provided data
status: Done
assignee: []
created_date: '2026-05-29 10:10'
updated_date: '2026-05-29 10:14'
labels: []
dependencies: []
modified_files:
  - src/data/phrasalVerbs.js
  - src/__tests__/phrasalVerbs.test.js
  - src/__tests__/__fixtures__/phrasalVerbs.json
priority: medium
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add 24 new entries to src/data/phrasalVerbs.js based on user-provided phrasal verb data. New verbs and meanings include: Bring Out, Keep On, Keep Up, Drop By, Catch Up (4 meanings), Come Away, Pay Out, Take Away (2), Break Down (3), plus additional meanings for Catch On, Bring In, Come Out, Come Off, Break Out, Break Off, Get On With. Update test count and regenerate fixture.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 All provided phrasal verb data is represented in rawData with no information reduced
- [x] #2 New entries have accurate definitions, example sentences, and wordsToHide arrays
- [x] #3 Test count updated to match new rawData.length
- [x] #4 Fixture regenerated and all 3 tests pass
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added 23 new entries (rawData 230 → 253). New verbs: Bring Out (2), Catch Up (4), Catch On popular, Come Away, Drop By, Keep Up, Pay Out, Take Away (2). New meanings for: Break Down (3), Break Off detach, Break Out skin, Bring In physical, Come Off vibe, Come Out (emerge + released), Get On With task. Test count updated to 253, fixture regenerated, all 156 tests pass.
<!-- SECTION:FINAL_SUMMARY:END -->
