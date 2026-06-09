---
id: TASK-30
title: Add "Hand" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09 15:58'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 18000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Hand" phrasal verb entry following the same pattern as Call/Carry pages.

## Particles (9 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| back | handBack | 1 |
| down | handDown | 2 |
| in | handIn | 1 |
| off | handOff | 1 |
| on | handOn | 1 |
| out | handOut | 1 |
| over | handOver | 2 |
| around / round / about | handAround | 1 |
| to | handTo | 1 |

## Content

**back**
1. To return something to the person who owned it or gave it to you. / "After reviewing the code, please hand back the printed reports to the project manager."

**down**
1. To pass knowledge, traditions, or items from an older person to a younger person (or from a predecessor to a successor). / "The retiring CEO handed down his leadership principles to the new management team."
2. To officially announce a formal or legal decision. / "The board of directors will hand down their final decision on the software budget next week."

**in**
1. To submit something or give it to a person in authority (like a boss, teacher, or official). / "He decided to hand in his resignation because he found a new job in software development."

**off**
1. To pass the responsibility, control, or execution of a task to someone else. / "I will hand off the server maintenance tasks to the junior Java developers tomorrow."

**on**
1. To give something to the next person, often in a sequence (similar to passing a message or object along). / "Please read this project update and hand it on to the rest of the management team."

**out**
1. To distribute something to multiple people in a group. / "The team leader handed out the new coding guidelines during the meeting."

**over**
1. To give control, responsibility, or ownership of something to someone else. / "When the project is finished, we will hand over the new application to the client."
2. To give something to someone because they demand it (often formal or forced). / "The security guard asked him to hand over his company ID card."

**around / round / about**
1. To offer or pass something to each person in a group. / "They handed around the new smartphones so the development team could test them."

**to**
1. Used in the phrase "have to hand it to someone" — to admit that someone has done something very well and give them credit for it. / "You have to hand it to her; she managed that difficult software project perfectly."

## Files to create / modify

- `src/pages/hand/HandVerbPage.tsx` — new page (9 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `HAND_PARTICLES` constant + VERBS entry (alphabetical)
- `src/main.tsx` — import + register route `/phrasal-verbs/list/hand`
- `src/data/listVerbIndex.ts` — import handSections + add `buildEntries` call
- `src/__tests__/hand_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/hand_verb_page/*.test.tsx` — 9 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Hand card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/carry/CarryVerbPage.tsx` (TASK-14)
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `handOver_section_expanded`)
- Compound particle `around / round / about` → storageKeyPrefix `handAround`
- VERBS entry for Hand goes after Grow (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 #1 `src/pages/hand/HandVerbPage.tsx` created with 9 sections, all meanings, all using default.png
- [ ] #2 #2 HAND_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 9 particles
- [ ] #3 #3 VERBS entry added for Hand in alphabetical position in PhrasalVerbsListPage.tsx
- [ ] #4 #4 Route `/phrasal-verbs/list/hand` registered in src/main.tsx
- [ ] #5 #5 handSections added to listVerbIndex.ts search index
- [ ] #6 #6 9 test files created under src/__tests__/hand_verb_page/ (one per particle)
- [ ] #7 #7 PhrasalVerbsListPage.test.tsx extended with Hand card, subtitle, and copy-button describe blocks
- [ ] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
