---
id: TASK-18
title: Add "Clean" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09 11:24'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 6000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Clean" phrasal verb entry following the same pattern as Blow/Brush/Build pages.

## Particles (7 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| away | cleanAway | 1 |
| around | cleanAround | 1 |
| down | cleanDown | 1 |
| off | cleanOff | 1 |
| out | cleanOut | 3 |
| up | cleanUp | 3 |
| up after | cleanUpAfter | 1 |

## Content

**away**
1. To remove dirt, rubbish, or objects to leave a space tidy. / "Please clean away the empty plates from the dining table."

**around**
1. To wash or tidy the space near an object without moving the object itself. / "Don't worry about moving the heavy cabinet; just clean around it."

**down**
1. To wash an entire surface, usually from top to bottom. / "We need to clean down the walls before we start painting."

**off**
1. To remove dirt, marks, or a substance from a surface. / "Make sure to clean the mud off your boots before coming inside."

**out**
1. To empty and clean the inside of a space (like a room, cupboard, or box), usually by throwing away unwanted items. / "I spent my Saturday cleaning out the garage."
2. To use or take all of someone's money. / "Paying for those car repairs completely cleaned me out."
3. To steal everything of value from a place. / "The thieves cleaned out the safe during the night."

**up**
1. To make a place or a person completely clean and tidy. / "We need to clean up the living room before our guests arrive."
2. To make a large profit or a lot of money quickly. / "The retail company cleaned up during the holiday sales."
3. To stop crime, corruption, or bad behavior in a specific organization or area. / "The new mayor promised to clean up the city center."

**up after**
1. To remove the mess or dirt created by someone or something else. / "I am constantly cleaning up after my new puppy."

## Files to create / modify

- `src/pages/clean/CleanVerbPage.tsx` — new page (7 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `CLEAN_PARTICLES` constant + VERBS entry after 'cheer'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/clean`
- `src/data/listVerbIndex.ts` — import cleanSections + add `buildEntries` call
- `src/__tests__/clean_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/clean_verb_page/*.test.tsx` — 7 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Clean card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/blow/BlowVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `cleanOff_section_expanded`)
- Compound particle `up after` → storageKeyPrefix `cleanUpAfter`
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 #1 `src/pages/clean/CleanVerbPage.tsx` created with 7 sections, all meanings, all using default.png
- [ ] #2 #2 CLEAN_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 7 particles
- [ ] #3 #3 VERBS entry added for Clean after Cheer in PhrasalVerbsListPage.tsx
- [ ] #4 #4 Route `/phrasal-verbs/list/clean` registered in src/main.tsx
- [ ] #5 #5 cleanSections added to listVerbIndex.ts search index
- [ ] #6 #6 7 test files created under src/__tests__/clean_verb_page/ (one per particle)
- [ ] #7 #7 PhrasalVerbsListPage.test.tsx extended with Clean card, subtitle, and copy-button describe blocks
- [ ] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
