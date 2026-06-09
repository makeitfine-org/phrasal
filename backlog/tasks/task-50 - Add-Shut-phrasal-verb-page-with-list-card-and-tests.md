---
id: TASK-50
title: Add "Shut" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 38000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Shut" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (6 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| away | shutAway | 1 |
| down | shutDown | 3 |
| in | shutIn | 2 |
| off | shutOff | 3 |
| out | shutOut | 3 |
| up | shutUp | 3 |

## Content

**away**
1. To isolate someone or something in a place where they cannot be seen or disturbed. / "Before the exams, she shut herself away in the library for a week."

**down**
1. To turn off a computer, machine, or system completely. / "Always remember to shut down your laptop before putting it in your bag."
2. To close a business or factory permanently or for a long time. / "During the economic crisis, many local shops had to shut down."
3. To stop an opponent from playing well or succeeding (often used in sports or business). / "Our defense managed to shut down their best player."

**in**
1. To prevent someone or an animal from leaving a room or building by closing the door. / "It's raining heavily, so the cat has been shut in all day."
2. To accidentally catch a body part or clothing in a closing door. / "I accidentally shut my coat in the car door."

**off**
1. To stop the supply of something (like water, gas, or electricity). / "The plumber had to shut off the water before fixing the pipe."
2. To turn off a machine or engine. / "Please shut off the engine when you park the car."
3. To isolate or separate a place from other areas. / "The new wall shuts off the garden from the busy street."

**out**
1. To prevent something from entering a place (like light or noise). / "We use heavy curtains to shut out the street lights at night."
2. To exclude someone from an activity, or from your thoughts and feelings. / "When he gets stressed, he stops talking and shuts everyone out."
3. To prevent an opposing team from scoring any points in a game (mainly used in sports). / "The goalkeeper played perfectly and shut out the other team."

**up**
1. To stop talking or making a noise (informal, considered rude). / "I wish the dog next door would shut up; I'm trying to sleep."
2. To close and lock a building completely (often for the night or for a long time). / "The manager shuts up the shop at 8:00 PM every evening."
3. To keep someone or an animal securely in a room or place. / "I was shut up in the meeting room for three hours today."

## Files to create / modify

- `src/pages/shut/ShutVerbPage.tsx` — new page (6 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `SHUT_PARTICLES` constant + VERBS entry after 'show'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/shut`
- `src/data/listVerbIndex.ts` — import shutSections + add `buildEntries` call
- `src/__tests__/shut_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/shut_verb_page/*.test.tsx` — 6 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Shut card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `shutOff_section_expanded`)
- VERBS entry for Shut goes after Show (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `src/pages/shut/ShutVerbPage.tsx` created with 6 sections, all meanings, all using default.png
- [ ] #2 SHUT_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 6 particles
- [ ] #3 VERBS entry added for Shut after Show in PhrasalVerbsListPage.tsx
- [ ] #4 Route `/phrasal-verbs/list/shut` registered in src/main.tsx
- [ ] #5 shutSections added to listVerbIndex.ts search index
- [ ] #6 6 test files created under src/__tests__/shut_verb_page/ (one per particle)
- [ ] #7 PhrasalVerbsListPage.test.tsx extended with Shut card, subtitle, and copy-button describe blocks
- [ ] #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
