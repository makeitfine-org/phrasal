---
id: TASK-22
title: Add "Dress" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09 14:34'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 10000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Dress" phrasal verb entry following the same pattern as Call/Carry pages.

## Particles (7 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| back | dressBack | 1 |
| by | dressBy | 1 |
| down | dressDown | 2 |
| off | dressOff | 1 |
| on | dressOn | 1 |
| out | dressOut | 2 |
| up | dressUp | 3 |

## Content

**back**
1. To step backward in order to form a straight line (military / marching context). / "The front row had to dress back to give the others more space."

**by**
1. To use a specific person or point on one side as a guide to form a straight line (military / marching context). / "The marching band had to dress by the right."

**down**
1. To wear clothes that are more informal or casual than what you usually wear. / "My company allows us to dress down on Fridays and wear jeans."
2. To strongly criticize or scold someone because they did something wrong. / "The manager dressed down the team for missing the important deadline."

**off**
1. To use a specific reference point to form a straight line in a formation (military / marching context). / "The soldiers were ordered to dress off the right flank."

**on**
1. To use a specific person or point directly as a guide to align a formation (military / marching context). / "The captain ordered the soldiers to dress on the center guide."

**out**
1. To put on a sports uniform or equipment to get ready to play in a game. / "Only twenty players will dress out for the football game this weekend."
2. To clean and prepare an animal's body so the meat can be eaten or sold. / "It took the hunters a few hours to dress out the deer they caught."

**up**
1. To wear formal, elegant, or special clothes, usually for an event. / "We are going to a fancy restaurant tonight, so we need to dress up."
2. To put on a costume to look like someone or something else. / "The children decided to dress up as pirates and princesses."
3. To make something look more attractive, interesting, or better than it really is. / "You can dress up a plain soup by adding some fresh herbs and cream."

## Files to create / modify

- `src/pages/dress/DressVerbPage.tsx` — new page (7 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `DRESS_PARTICLES` constant + VERBS entry after 'do'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/dress`
- `src/data/listVerbIndex.ts` — import dressSections + add `buildEntries` call
- `src/__tests__/dress_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/dress_verb_page/*.test.tsx` — 7 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Dress card, subtitle, and copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/carry/CarryVerbPage.tsx` (TASK-14)
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `dressUp_section_expanded`)
- VERBS entry for Dress goes after Do (alphabetical order)
- The back/by/off/on particles are specialized military/marching terms; treat each as its own section
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 #1 `src/pages/dress/DressVerbPage.tsx` created with 7 sections, all meanings, all using default.png
- [ ] #2 #2 DRESS_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 7 particles
- [ ] #3 #3 VERBS entry added for Dress after Do in PhrasalVerbsListPage.tsx
- [ ] #4 #4 Route `/phrasal-verbs/list/dress` registered in src/main.tsx
- [ ] #5 #5 dressSections added to listVerbIndex.ts search index
- [ ] #6 #6 7 test files created under src/__tests__/dress_verb_page/ (one per particle)
- [ ] #7 #7 PhrasalVerbsListPage.test.tsx extended with Dress card, subtitle, and copy-button describe blocks
- [ ] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
