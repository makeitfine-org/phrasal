---
id: TASK-43
title: Add "Pick" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09 17:22'
updated_date: '2026-06-10 17:56'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 31000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Pick" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (8 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| apart | pickApart | 2 |
| away | pickAway | 2 |
| off | pickOff | 3 |
| on | pickOn | 2 |
| out | pickOut | 3 |
| over | pickOver | 1 |
| through | pickThrough | 1 |
| up | pickUp | 8 |

## Content

**apart**
1. To pull something into separate physical pieces. / "The birds picked the piece of bread apart."
2. To find all the mistakes or flaws in an idea or argument. / "The senior developers picked my code architecture apart during the review."

**away**
1. To remove small pieces of something slowly. / "He picked away the old paint from the wall."
2. To slowly reduce or destroy something (usually "pick away at"). / "The new competitor slowly picked away at our market share."

**off**
1. To target or shoot one by one. / "The sniper picked off the enemy guards from a distance."
2. To remove something by pulling it. / "She picked off the dry leaves from the houseplant."
3. To intercept (often in sports). / "The defender picked off the pass perfectly."

**on**
1. To bully or treat someone unfairly. / "The older children always picked on him at school."
2. To choose someone to do a task or answer a question. / "The manager picked on me to lead the presentation."

**out**
1. To choose or select carefully. / "We need to pick out a good candidate for the management role."
2. To recognize someone or something in a group. / "I could easily pick her out in the crowded room."
3. To play a tune on an instrument slowly or with difficulty. / "He picked out a simple melody on the piano."

**over**
1. To carefully examine a group of things to select the best ones. / "By the time I arrived at the market, the best fruit had already been picked over."

**through**
1. To search carefully among a pile or collection of items. / "The team picked through the raw data looking for helpful trends."

**up**
1. To lift something from a surface. / "Please pick up your clothes from the floor."
2. To collect someone in a vehicle. / "I will pick you up at the airport at six."
3. To learn a skill casually, without formal training. / "I picked up some new programming skills while working on that project."
4. To improve or increase. / "Sales usually pick up in the fourth quarter."
5. To catch an illness. / "I picked up a bad cold at the conference."
6. To resume an activity (often "pick back up"). / "We are out of time, so let's pick this discussion back up tomorrow."
7. To pay a bill. / "The company will pick up the tab for the team dinner."
8. To notice or detect something (usually "pick up on"). / "The software easily picks up on errors in the code."

## Files to create / modify

- `src/pages/pick/PickVerbPage.tsx` — new page (8 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `PICK_PARTICLES` constant + VERBS entry after 'pay'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/pick`
- `src/data/listVerbIndex.ts` — import pickSections + add `buildEntries` call
- `src/__tests__/pick_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/pick_verb_page/*.test.tsx` — 8 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Pick card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `pickUp_section_expanded`)
- VERBS entry for Pick goes after Pay (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 #1 `src/pages/pick/PickVerbPage.tsx` created with 8 sections, all meanings, all using default.png
- [x] #2 #2 PICK_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 8 particles
- [x] #3 #3 VERBS entry added for Pick after Pay in PhrasalVerbsListPage.tsx
- [x] #4 #4 Route `/phrasal-verbs/list/pick` registered in src/main.tsx
- [x] #5 #5 pickSections added to listVerbIndex.ts search index
- [x] #6 #6 8 test files created under src/__tests__/pick_verb_page/ (one per particle)
- [x] #7 #7 PhrasalVerbsListPage.test.tsx extended with Pick card, subtitle, and copy-button describe blocks
- [x] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
