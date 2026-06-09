---
id: TASK-19
title: Add "Count" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09 11:24'
updated_date: '2026-06-09 15:06'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 7000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Count" phrasal verb entry following the same pattern as Blow/Brush/Build pages.

## Particles (9 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| against | countAgainst | 1 |
| back | countBack | 1 |
| down | countDown | 2 |
| for | countFor | 2 |
| in | countIn | 1 |
| off | countOff | 1 |
| on | countOn | 2 |
| out | countOut | 3 |
| up | countUp | 1 |

## Content

**against**
1. To be considered a disadvantage or a negative point for someone. / "His lack of management experience might count against him in the job interview."

**back**
1. To count backwards from a specific number or date to calculate something. / "To figure out when the project started, we need to count back six weeks from today."

**down**
1. To say numbers backwards to zero, usually before a big event. / "The crowd started to count down from ten before the rocket launch."
2. To wait eagerly for an event to happen. / "We are counting down the days until our summer holiday."

**for**
1. To have a specific level of importance or value. / "Good communication skills count for a lot in a software development team."
2. To be worth something (often used with "nothing" or "something"). / "Does all my hard work count for nothing?"

**in**
1. To include someone in an activity, group, or plan. / "If you are ordering pizza for lunch, please count me in!"

**off**
1. To say numbers aloud in order, usually to divide a group of people into smaller teams. / "The coach asked the players to count off by threes."

**on**
1. To depend or rely on someone to do something. / "You can always count on Sarah to help you finish the report on time."
2. To expect something to happen and base your plans on it. / "We didn't count on it raining so heavily during our outdoor meeting."

**out**
1. To not include someone in an activity or plan. / "I feel too sick to go to the dinner party, so count me out."
2. To count things one by one, often when distributing them (like money). / "The cashier slowly counted out the coins and gave me my change."
3. (In boxing) To declare a fighter defeated because they cannot stand up before the referee counts to ten. / "The champion hit him hard, and the referee counted him out."

**up**
1. To add things together to find the total amount. / "Please count up all the expenses from the business trip."

## Files to create / modify

- `src/pages/count/CountVerbPage.tsx` — new page (9 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `COUNT_PARTICLES` constant + VERBS entry after 'clean'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/count`
- `src/data/listVerbIndex.ts` — import countSections + add `buildEntries` call
- `src/__tests__/count_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/count_verb_page/*.test.tsx` — 9 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Count card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/blow/BlowVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `countOn_section_expanded`)
- VERBS entry goes after 'clean' (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 #1 `src/pages/count/CountVerbPage.tsx` created with 9 sections, all meanings, all using default.png
- [x] #2 #2 COUNT_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 9 particles
- [x] #3 #3 VERBS entry added for Count after Clean in PhrasalVerbsListPage.tsx
- [x] #4 #4 Route `/phrasal-verbs/list/count` registered in src/main.tsx
- [x] #5 #5 countSections added to listVerbIndex.ts search index
- [x] #6 #6 9 test files created under src/__tests__/count_verb_page/ (one per particle)
- [x] #7 #7 PhrasalVerbsListPage.test.tsx extended with Count card, subtitle, and copy-button describe blocks
- [x] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Created CountVerbPage.tsx with 9 sections (against, back, down, for, in, off, on, out, up). Added COUNT_PARTICLES and VERBS entry to PhrasalVerbsListPage.tsx, registered route in main.tsx, added countSections to listVerbIndex.ts, created helpers.tsx + 9 particle test files, extended PhrasalVerbsListPage.test.tsx. All 8787 tests green. Committed as 016a019.
<!-- SECTION:FINAL_SUMMARY:END -->
