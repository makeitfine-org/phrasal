---
id: TASK-31
title: Add "Hang" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09 15:58'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 19000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Hang" phrasal verb entry following the same pattern as Call/Carry pages.

## Particles (12 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| about / around / round | hangAbout | 3 |
| back | hangBack | 1 |
| behind | hangBehind | 1 |
| down | hangDown | 1 |
| in | hangIn | 1 |
| off | hangOff | 2 |
| on | hangOn | 4 |
| out | hangOut | 3 |
| over | hangOver | 1 |
| together | hangTogether | 2 |
| up | hangUp | 3 |
| with | hangWith | 1 |

## Content

**about / around / round**
1. To spend time somewhere doing nothing in particular, just waiting or relaxing. / "Teenagers often hang around the shopping mall on weekends."
2. To wait or stay in a place for a specific reason. / "I'll hang around until the management meeting is over."
3. To spend time with a specific group of people. / "He started to hang around with the software development team."

**back**
1. To hesitate or stay behind the rest of a group because of fear, shyness, or uncertainty. / "She hung back while the other candidates rushed to introduce themselves to the CEO."

**behind**
1. To stay in a place after other people have already left. / "The lead developer hung behind after the meeting to ask a few more questions."

**down**
1. To drop or fall loosely downwards (usually describing hair, clothing, or branches). / "Her long coat hung down to her ankles."

**in**
1. To remain positive and not give up during a difficult situation. (Almost always used in the phrase "hang in there".) / "The Java migration project is really tough right now, but hang in there — it will get easier soon."

**off**
1. To hold onto the side of something to prevent yourself from falling. / "The rescue worker was hanging off the side of the helicopter."
2. To hesitate or wait before taking an action (less common). / "The board hung off making a final decision until they saw the financial report."

**on**
1. To wait for a short time. / "Hang on a minute, I need to find my laptop charger."
2. To hold something very securely. / "Hang on to the railing so you don't slip on the ice."
3. To keep something instead of throwing it away or giving it away (usually "hang on to"). / "You should hang on to those old code backups, just in case."
4. To rely or depend completely on something. / "The company's future hangs on the success of this new application."

**out**
1. To spend free time relaxing or socializing with friends. / "We usually hang out at the local coffee shop after work."
2. To put wet clothes outside on a line to dry. / "I need to hang the washing out before it rains."
3. To lean your body out of a window or opening. / "Do not hang out of the train window while it is moving."

**over**
1. To make someone worry about a future problem, or to loom like a threat. / "The threat of budget cuts was hanging over the entire IT department."

**together**
1. To support each other and stay united as a group, especially in difficult times. / "If the startup wants to survive this crisis, the leadership team must hang together."
2. To be logical, consistent, or believable (usually describing a story, theory, or argument). / "The system architect's explanation for the server crash simply doesn't hang together."

**up**
1. To end a telephone conversation by breaking the connection. / "Please don't hang up on me, I haven't finished explaining the problem!"
2. To place a piece of clothing on a hook or a hanger. / "When you enter the office, please hang up your coat in the closet."
3. To cause a delay or problem (often used in the passive voice). / "The software release got hung up by a series of unexpected bugs."

**with**
1. An informal version of "hang out with"; to spend time with people. / "I prefer to hang with people who share my interest in business management."

## Files to create / modify

- `src/pages/hang/HangVerbPage.tsx` — new page (12 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `HANG_PARTICLES` constant + VERBS entry (alphabetical)
- `src/main.tsx` — import + register route `/phrasal-verbs/list/hang`
- `src/data/listVerbIndex.ts` — import hangSections + add `buildEntries` call
- `src/__tests__/hang_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/hang_verb_page/*.test.tsx` — 12 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Hang card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/carry/CarryVerbPage.tsx` (TASK-14)
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `hangUp_section_expanded`)
- Compound particle `about / around / round` → storageKeyPrefix `hangAbout`
- VERBS entry for Hang goes after Hand (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 #1 `src/pages/hang/HangVerbPage.tsx` created with 12 sections, all meanings, all using default.png
- [ ] #2 #2 HANG_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 12 particles
- [ ] #3 #3 VERBS entry added for Hang in alphabetical position in PhrasalVerbsListPage.tsx
- [ ] #4 #4 Route `/phrasal-verbs/list/hang` registered in src/main.tsx
- [ ] #5 #5 hangSections added to listVerbIndex.ts search index
- [ ] #6 #6 12 test files created under src/__tests__/hang_verb_page/ (one per particle)
- [ ] #7 #7 PhrasalVerbsListPage.test.tsx extended with Hang card, subtitle, and copy-button describe blocks
- [ ] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
