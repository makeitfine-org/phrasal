---
id: TASK-26
title: Add "Figure" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09 15:34'
updated_date: '2026-06-09 17:08'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 14000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Figure" phrasal verb entry following the same pattern as existing verb pages.

## Particles (6 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| out | figureOut | 3 |
| on | figureOn | 2 |
| in | figureIn | 1 |
| into | figureInto | 1 |
| up | figureUp | 1 |
| for | figureFor | 1 |

## Content

**out**
1. To understand a problem and find a solution. / "It took the team three hours to figure out why the Java application was crashing."
2. To calculate an amount or cost. / "We need to figure out exactly how much the new software licenses will cost."
3. To understand someone's character, behavior, or motives. / "I cannot figure our new manager out; she is very quiet and hard to read."

**on**
1. To plan on something happening or expect something to be true. / "We figure on launching the new product by the end of the second quarter."
2. To rely on or trust someone/something. / "You can always figure on John to deliver his code on time."

**in**
1. To include a specific detail or amount when making a calculation or plan. / "When estimating the project timeline, you must figure in the time needed for testing and fixing bugs."

**into**
1. To be a relevant factor or play a part in a situation, decision, or plan. / "The cost of hiring new developers did not figure into the original budget."

**up**
1. To add numbers together to calculate a total amount. / "Let me figure up the total hours we spent on the server migration last month."

**for**
1. To expect someone to be a certain type of person, or to make an assumption about their character. / "I figured him for a strict leader, but he is actually very relaxed."

## Files to create / modify

- `src/pages/figure/FigureVerbPage.tsx` — new page (6 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `FIGURE_PARTICLES` constant + VERBS entry (alphabetical)
- `src/main.tsx` — import + register route `/phrasal-verbs/list/figure`
- `src/data/listVerbIndex.ts` — import figureSections + add `buildEntries` call
- `src/__tests__/figure_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/figure_verb_page/*.test.tsx` — 6 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Figure card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as existing verb pages (e.g. `src/pages/do/DoVerbPage.tsx`)
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `figureOut_section_expanded`)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 #1 `src/pages/figure/FigureVerbPage.tsx` created with 6 sections, all meanings, all using default.png
- [x] #2 #2 FIGURE_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 6 particles
- [x] #3 #3 VERBS entry added for Figure in alphabetical position in PhrasalVerbsListPage.tsx
- [x] #4 #4 Route `/phrasal-verbs/list/figure` registered in src/main.tsx
- [x] #5 #5 figureSections added to listVerbIndex.ts search index
- [x] #6 #6 6 test files created under src/__tests__/figure_verb_page/ (one per particle)
- [x] #7 #7 PhrasalVerbsListPage.test.tsx extended with Figure card, subtitle, and copy-button describe blocks
- [x] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
