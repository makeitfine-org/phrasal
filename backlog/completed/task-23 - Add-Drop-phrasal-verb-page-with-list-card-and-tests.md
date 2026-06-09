---
id: TASK-23
title: Add "Drop" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09 14:34'
updated_date: '2026-06-09 16:11'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 11000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Drop" phrasal verb entry following the same pattern as Call/Carry pages.

## Particles (15 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| across | dropAcross | 1 |
| around / round | dropAround | 1 |
| away | dropAway | 1 |
| back | dropBack | 2 |
| behind | dropBehind | 1 |
| by | dropBy | 1 |
| down | dropDown | 1 |
| in | dropIn | 1 |
| into | dropInto | 2 |
| off | dropOff | 3 |
| on | dropOn | 2 |
| out | dropOut | 2 |
| over | dropOver | 1 |
| through | dropThrough | 1 |
| to | dropTo | 1 |

## Content

**across**
1. To happen to find or meet (very rare / old-fashioned; "come across" is almost always preferred today). / "I dropped across an old project file on the server."

**around / round**
1. To visit someone informally. / "I will drop round the office tomorrow to sign the final contracts."

**away**
1. To become weaker, smaller, or gradually disappear. / "Public interest in the old software version slowly dropped away."

**back**
1. To return to a lower position or level. / "Our company's market share dropped back to second place this quarter."
2. To move into a position behind someone else (like in a race). / "The runner dropped back because he was exhausted."

**behind**
1. To fail to keep up with others; to fall behind a schedule. / "We have dropped behind schedule on the latest software release."

**by**
1. To make a short, informal visit (similar to "drop in"). / "Please drop by my desk later so we can discuss the leadership training."

**down**
1. To fall or move to a lower position. / "Please select your country from the drop-down menu in the application."

**in**
1. To make a short, informal visit without arranging it in advance. / "Feel free to drop in if you have any questions about the new code."

**into**
1. To visit a place briefly. / "I will drop into the IT department to pick up my new laptop."
2. To accidentally fall into a habit or state. / "It is easy to drop into bad coding habits if you don't do code reviews."

**off**
1. To take someone or something to a place and leave them there. / "I will drop off the management report at your office tomorrow."
2. To decrease in level, amount, or quality. / "Software sales usually drop off during the summer holidays."
3. To fall asleep. / "The presentation was so boring that a few people dropped off."

**on**
1. To criticize or punish someone suddenly (mainly UK, informal). / "The boss dropped on the development team for missing the deadline."
2. To accidentally meet someone or find something (informal). / "We dropped on a great solution for the Java bug."

**out**
1. To stop participating or being involved in something. / "One of our main investors dropped out of the project."
2. To leave a school, college, or course before finishing. / "He dropped out of his business degree to start his own company."

**over**
1. To visit someone informally at their location (often their home). / "Why don't you drop over later to review the Java architecture together?"

**through**
1. To fail to happen or fail to be completed ("fall through" is much more common but "drop through" is sometimes used). / "The business merger dropped through at the last minute."

**to**
1. To decrease to a specific level or amount. / "The server response time dropped to 50 milliseconds after the update."

## Files to create / modify

- `src/pages/drop/DropVerbPage.tsx` — new page (15 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `DROP_PARTICLES` constant + VERBS entry after 'dress'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/drop`
- `src/data/listVerbIndex.ts` — import dropSections + add `buildEntries` call
- `src/__tests__/drop_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/drop_verb_page/*.test.tsx` — 15 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Drop card, subtitle, and copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/carry/CarryVerbPage.tsx` (TASK-14)
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `dropOff_section_expanded`)
- Compound particle `around / round` → storageKeyPrefix `dropAround`
- VERBS entry for Drop goes after Dress (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 #1 `src/pages/drop/DropVerbPage.tsx` created with 15 sections, all meanings, all using default.png
- [x] #2 #2 DROP_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 15 particles
- [x] #3 #3 VERBS entry added for Drop after Dress in PhrasalVerbsListPage.tsx
- [x] #4 #4 Route `/phrasal-verbs/list/drop` registered in src/main.tsx
- [x] #5 #5 dropSections added to listVerbIndex.ts search index
- [x] #6 #6 15 test files created under src/__tests__/drop_verb_page/ (one per particle)
- [x] #7 #7 PhrasalVerbsListPage.test.tsx extended with Drop card, subtitle, and copy-button describe blocks
- [x] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
