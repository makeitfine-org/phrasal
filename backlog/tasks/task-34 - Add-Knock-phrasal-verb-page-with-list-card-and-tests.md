---
id: TASK-34
title: Add "Knock" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09 16:00'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 22000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Knock" phrasal verb entry following the same pattern as Call/Carry pages.

## Particles (14 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| about / around / round | knockAbout | 4 |
| against | knockAgainst | 1 |
| apart | knockApart | 1 |
| back | knockBack | 4 |
| down | knockDown | 4 |
| in | knockIn | 1 |
| into | knockInto | 2 |
| off | knockOff | 6 |
| on | knockOn | 2 |
| out | knockOut | 5 |
| over | knockOver | 2 |
| through | knockThrough | 1 |
| together | knockTogether | 1 |
| up | knockUp | 4 |

## Content

**about / around / round**
1. To discuss casually: To talk about ideas in an informal way. / "We knocked a few new software features around during the meeting."
2. To spend time without a plan: To relax or travel without a strict schedule. / "After selling his startup, he knocked about Europe for a year."
3. To exist somewhere: When an object is somewhere in a room but not organized. / "I have an old Java textbook knocking around my office."
4. To treat violently: To hit someone repeatedly. / "The robbers knocked the guard about."

**against**
1. To accidentally hit something while moving. / "I knocked against the server rack and unplugged a cable."

**apart**
1. To hit something so hard it breaks into pieces. / "The storm knocked the old warehouse apart."

**back**
1. To reject an offer or application. / "The investors knocked back our business proposal."
2. To cost money; to be expensive for someone. / "That new server knocked the company back $5,000."
3. To consume an alcoholic drink fast. / "He knocked back a coffee before the presentation."
4. To surprise or shock someone; to leave someone amazed or stunned. / "The sudden drop in sales really knocked me back."

**down**
1. To destroy a building completely. / "They knocked down the old office to build a new one."
2. To reduce the cost of an item. / "The vendor knocked down the price of the software license."
3. To successfully negotiate a discount. / "I knocked the supplier down by 15%."
4. To strike someone with a car so they fall. / "A delivery bike almost knocked him down."

**in**
1. To hit a nail or object so it goes into a surface. / "He knocked the nail in with a hammer."

**into**
1. To unexpectedly see someone you know. / "I knocked into my old project manager at the tech conference."
2. To walk into something by accident. / "She was looking at her phone and knocked into the desk."

**off**
1. To finish your workday. / "Let's knock off early today and go home."
2. To remove an amount from a total. / "Can you knock 10% off the final invoice?"
3. To produce a piece of work very fast. / "She knocked off the weekly report in just 20 minutes."
4. To make a cheap imitation of a product illegally. / "A competitor tried to knock off our main application."
5. To rob a place (informal). / "The thieves knocked off a local bank."
6. To kill someone (informal). / "The gang knocked him off."

**on**
1. To hit a door repeatedly. / "I knocked on, but no one answered the door."
2. Used as "knock-on effect" to describe how one event causes another (noun/adjective use). / "The bug in the Java code had a knock-on effect on the whole database."

**out**
1. To hit someone so hard they pass out. / "The boxer knocked his opponent out in the first round."
2. To remove a person or team from a competition. / "Our team was knocked out in the quarter-finals."
3. To stop a system from working (disable/destroy). / "The power outage knocked out our main servers."
4. To create something at high speed. / "The developers can knock out a prototype by tomorrow."
5. To greatly impress someone. / "Her leadership skills completely knocked me out."

**over**
1. To hit something so it falls on its side. / "I accidentally knocked over my coffee onto the keyboard."
2. To steal from a business (informal). / "They knocked over a gas station."

**through**
1. To remove a wall between two spaces to connect rooms. / "We knocked through the wall to create an open-plan office."

**together**
1. To create something fast using whatever is available. / "I knocked together a quick test environment for the new app."

**up**
1. To make a meal or item in a short time (prepare quickly). / "Let me knock up a quick presentation for the client."
2. To knock on a door to wake a person (UK English). / "Can you knock me up at 6 AM?"
3. To make pregnant (informal/slang). / "He knocked his girlfriend up."
4. To warm up for tennis by hitting the ball before a match begins. / "The players are knocking up on the court."

## Files to create / modify

- `src/pages/knock/KnockVerbPage.tsx` — new page (14 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `KNOCK_PARTICLES` constant + VERBS entry (alphabetical)
- `src/main.tsx` — import + register route `/phrasal-verbs/list/knock`
- `src/data/listVerbIndex.ts` — import knockSections + add `buildEntries` call
- `src/__tests__/knock_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/knock_verb_page/*.test.tsx` — 14 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Knock card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/carry/CarryVerbPage.tsx` (TASK-14)
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `knockOut_section_expanded`)
- Compound particle `about / around / round` → storageKeyPrefix `knockAbout`
- VERBS entry for Knock goes after Keep (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 #1 `src/pages/knock/KnockVerbPage.tsx` created with 14 sections, all meanings, all using default.png
- [ ] #2 #2 KNOCK_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 14 particles
- [ ] #3 #3 VERBS entry added for Knock in alphabetical position in PhrasalVerbsListPage.tsx
- [ ] #4 #4 Route `/phrasal-verbs/list/knock` registered in src/main.tsx
- [ ] #5 #5 knockSections added to listVerbIndex.ts search index
- [ ] #6 #6 14 test files created under src/__tests__/knock_verb_page/ (one per particle)
- [ ] #7 #7 PhrasalVerbsListPage.test.tsx extended with Knock card, subtitle, and copy-button describe blocks
- [ ] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
