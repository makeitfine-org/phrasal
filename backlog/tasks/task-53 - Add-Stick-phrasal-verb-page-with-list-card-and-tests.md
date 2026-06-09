---
id: TASK-53
title: Add "Stick" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 41000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Stick" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (11 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| about / around | stickAbout | 1 |
| away | stickAway | 1 |
| by | stickBy | 2 |
| down | stickDown | 2 |
| for | stickFor | 1 |
| in | stickIn | 1 |
| out | stickOut | 2 |
| to | stickTo | 2 |
| together | stickTogether | 1 |
| up | stickUp | 2 |
| with | stickWith | 2 |

## Content

**about / around**
1. To stay in a place for a little while, often waiting for something to happen. / "Stick around after the sprint review; we need to discuss the Java 21 migration."

**away**
1. To store or put something in a safe or hidden place. / "I stuck the old project contracts away in the archive cabinet."

**by**
1. To remain loyal to someone during difficult times. / "The founders stuck by each other when the company almost went bankrupt."
2. To keep a promise or remain committed to a decision. / "Management decided to stick by their decision to invest heavily in cloud infrastructure."

**down**
1. To attach something to a surface using glue or tape. / "Stick down the network cables so nobody trips in the server room."
2. To write something quickly (informal). / "Let me stick down these API endpoints before I forget them."

**for**
1. To lack something necessary (used in the passive form "be stuck for"). / "We are stuck for ideas on how to improve the application's performance."

**in**
1. To remain strongly in someone's memory (often used as "stick in your mind"). / "The CEO's speech on agile leadership really stuck in my mind."

**out**
1. To be very easy to see or notice because of being different. / "The memory leak in the backend logic really sticks out when you look at the server logs."
2. To continue to the end of a difficult situation (used as "stick it out"). / "The first year of running a business is hard, but you have to stick it out."

**to**
1. To continue doing or following a specific plan, rule, or subject without changing. / "Let's stick to the meeting agenda so we finish on time."
2. To keep a promise or agreement. / "The vendor stuck to the original budget despite the extra development work."

**together**
1. To support each other as a group, especially in hard times. / "A successful development team sticks together during a stressful product release."

**up**
1. To point upwards or stand above a surface. / "The cooling fan on the new server model sticks up higher than the old one."
2. To defend or support someone or an idea (used as "stick up for"). / "A good manager will always stick up for their team when other departments criticize them."

**with**
1. To continue using or doing something, rather than changing it. / "We decided to stick with the Spring Boot framework instead of learning a new ecosystem."
2. To stay close to someone for guidance or safety. / "Stick with the senior architect today, and she will show you how the deployment pipeline works."

## Files to create / modify

- `src/pages/stick/StickVerbPage.tsx` — new page (11 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `STICK_PARTICLES` constant + VERBS entry after 'stand'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/stick`
- `src/data/listVerbIndex.ts` — import stickSections + add `buildEntries` call
- `src/__tests__/stick_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/stick_verb_page/*.test.tsx` — 11 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Stick card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `stickTo_section_expanded`)
- Compound particle `about / around` → storageKeyPrefix `stickAbout`
- VERBS entry for Stick goes after Stand (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `src/pages/stick/StickVerbPage.tsx` created with 11 sections, all meanings, all using default.png
- [ ] #2 STICK_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 11 particles
- [ ] #3 VERBS entry added for Stick after Stand in PhrasalVerbsListPage.tsx
- [ ] #4 Route `/phrasal-verbs/list/stick` registered in src/main.tsx
- [ ] #5 stickSections added to listVerbIndex.ts search index
- [ ] #6 11 test files created under src/__tests__/stick_verb_page/ (one per particle)
- [ ] #7 PhrasalVerbsListPage.test.tsx extended with Stick card, subtitle, and copy-button describe blocks
- [ ] #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
