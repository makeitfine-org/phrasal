---
id: TASK-21
title: Add "Do" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09 14:33'
updated_date: '2026-06-09 15:28'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 9000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Do" phrasal verb entry following the same pattern as Call/Carry pages.

## Particles (13 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| about | doAbout | 1 |
| away | doAway | 2 |
| by | doBy | 1 |
| down | doDown | 2 |
| for | doFor | 1 |
| in | doIn | 3 |
| into | doInto | 1 |
| out | doOut | 2 |
| over | doOver | 3 |
| to | doTo | 1 |
| up | doUp | 3 |
| with | doWith | 2 |
| without | doWithout | 1 |

## Content

**about**
1. To take action to fix a problem. / "The project deadline is at risk; what are we going to do about it?"

**away**
1. To abolish, get rid of, or stop using something. / "Many companies are trying to do away with paper receipts."
2. To kill someone or an animal (informal). / "The villain in the movie planned to do away with the king."

**by**
1. To treat someone in a particular way (almost always used in the phrase "do right by" or "do well by" someone). / "As a leader, you must always try to do right by your team members."

**down**
1. To criticize someone unfairly, making them or yourself seem less successful or important. / "Stop doing yourself down; you gave an excellent presentation today."
2. To cheat someone, usually in a business deal. / "The mechanic tried to do me down on the cost of the car repairs."

**for**
1. To severely damage, ruin, or kill (usually used in the passive "be done for"). / "If the manager catches us sleeping at our desks, we are done for."

**in**
1. To make someone extremely tired (exhaust). / "That 10-kilometer run really did me in."
2. To injure a body part. / "I did my back in while moving that heavy sofa."
3. To kill or murder (informal). / "The gang threatened to do him in if he went to the police."

**into**
1. To translate a piece of text into another language (formal and slightly old-fashioned). / "The ancient poem was done into English by a famous scholar."

**out**
1. To clean or decorate a room thoroughly. / "I need to do out the kitchen cupboards this weekend; they are so messy."
2. To cheat someone in order to take something from them (do someone out of something). / "He lied on the contract to do his business partner out of his share of the money."

**over**
1. To do something again because it was wrong the first time (mainly US English). / "This financial report is full of mistakes; you need to do it over."
2. To attack and beat someone up (UK informal). / "He got done over by a group of angry football fans."
3. To burgle or rob a place (UK informal). / "Their apartment was done over while they were on holiday."

**to**
1. To treat someone in a certain way, usually causing harm, damage, or change. / "I can't believe what the hairdresser did to my hair!"

**up**
1. To fasten or tie clothes, shoelaces, or seatbelts. / "It is very cold outside, so make sure to do up your coat."
2. To repair, decorate, or renovate a building or room. / "They bought an old, ruined house to do it up and sell it for a profit."
3. To wrap a parcel or gift. / "I need to do up this present with a nice red ribbon."

**with**
1. To need or want something (always used with "could" or "can"). / "I could really do with a hot cup of coffee right now."
2. To have a connection or relationship with (often used as "have something/nothing to do with"). / "The software bug has nothing to do with the recent system update."

**without**
1. To manage to survive or continue even when you do not have something you need. / "We have no milk left for the coffee, so we will just have to do without."

## Files to create / modify

- `src/pages/do/DoVerbPage.tsx` — new page (13 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `DO_PARTICLES` constant + VERBS entry after 'deal'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/do`
- `src/data/listVerbIndex.ts` — import doSections + add `buildEntries` call
- `src/__tests__/do_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/do_verb_page/*.test.tsx` — 13 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Do card, subtitle, and copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/carry/CarryVerbPage.tsx` (TASK-14)
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `doUp_section_expanded`)
- VERBS entry for Do goes after Deal (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 #1 `src/pages/do/DoVerbPage.tsx` created with 13 sections, all meanings, all using default.png
- [x] #2 #2 DO_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 13 particles
- [x] #3 #3 VERBS entry added for Do after Deal in PhrasalVerbsListPage.tsx
- [x] #4 #4 Route `/phrasal-verbs/list/do` registered in src/main.tsx
- [x] #5 #5 doSections added to listVerbIndex.ts search index
- [x] #6 #6 13 test files created under src/__tests__/do_verb_page/ (one per particle)
- [x] #7 #7 PhrasalVerbsListPage.test.tsx extended with Do card, subtitle, and copy-button describe blocks
- [x] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Created DoVerbPage.tsx with 13 sections (about, away, by, down, for, in, into, out, over, to, up, with, without), all using default.png. Added DO_PARTICLES constant and VERBS entry to PhrasalVerbsListPage.tsx, registered route in main.tsx, imported doSections into listVerbIndex.ts. Created helpers.tsx + 13 particle test files under src/__tests__/do_verb_page/. Extended PhrasalVerbsListPage.test.tsx with Do card, subtitle, and copy-button describe blocks. All 9303 tests green. Committed as 9e6a1c9.
<!-- SECTION:FINAL_SUMMARY:END -->
