---
id: TASK-27
title: Add "Fill" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09 15:34'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 15000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Fill" phrasal verb entry following the same pattern as existing verb pages.

## Particles (5 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| in | fillIn | 4 |
| out | fillOut | 2 |
| up | fillUp | 2 |
| down | fillDown | 1 |
| with | fillWith | 2 |

## Content

**in**
1. To complete a form or document by writing required information. / "Please fill in this application form and return it to the HR department."
2. To provide someone with missing information (fill someone in). / "I missed the morning meeting. Can you fill me in on what the team discussed?"
3. To temporarily do someone else's job because they are absent (fill in for). / "The lead developer is sick today, so I will fill in for him."
4. To close a hole or empty space by putting a substance into it. / "The city workers finally filled in the hole in the street."

**out**
1. To complete a form or document (US English equivalent of "fill in"). / "It took me an hour to fill out the tax documents."
2. To become larger, heavier, or rounder (usually referring to a person gaining weight or muscle). / "He used to be very thin, but he has filled out since he started going to the gym."

**up**
1. To make something completely full, or to become completely full. / "We need to fill up the car with petrol before we start driving."
2. To eat enough food so that you are no longer hungry. / "Don't fill up on bread before the main course arrives!"

**down**
1. To copy data or formulas to the cells below (specific to software/business context like Excel). / "Select the top cell and fill down the formula to the bottom of the column."

**with**
1. To put a substance or object into a container until there is no more space. / "She filled the cup with coffee."
2. To cause someone to feel a strong emotion. / "The successful software launch filled the team with pride."

## Files to create / modify

- `src/pages/fill/FillVerbPage.tsx` — new page (5 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `FILL_PARTICLES` constant + VERBS entry (alphabetical)
- `src/main.tsx` — import + register route `/phrasal-verbs/list/fill`
- `src/data/listVerbIndex.ts` — import fillSections + add `buildEntries` call
- `src/__tests__/fill_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/fill_verb_page/*.test.tsx` — 5 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Fill card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as existing verb pages (e.g. `src/pages/do/DoVerbPage.tsx`)
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `fillIn_section_expanded`)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 #1 `src/pages/fill/FillVerbPage.tsx` created with 5 sections, all meanings, all using default.png
- [ ] #2 #2 FILL_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 5 particles
- [ ] #3 #3 VERBS entry added for Fill in alphabetical position in PhrasalVerbsListPage.tsx
- [ ] #4 #4 Route `/phrasal-verbs/list/fill` registered in src/main.tsx
- [ ] #5 #5 fillSections added to listVerbIndex.ts search index
- [ ] #6 #6 5 test files created under src/__tests__/fill_verb_page/ (one per particle)
- [ ] #7 #7 PhrasalVerbsListPage.test.tsx extended with Fill card, subtitle, and copy-button describe blocks
- [ ] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
