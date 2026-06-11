---
id: TASK-39
title: Add "Look" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09 16:58'
updated_date: '2026-06-11 20:02'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 27000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Look" phrasal verb entry following the same pattern as Call/Carry/Drop/Eat/Fall pages.

## Particles (16 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| after | lookAfter | 1 |
| ahead | lookAhead | 1 |
| around / round / about | lookAround | 2 |
| away | lookAway | 1 |
| back (on) | lookBack | 1 |
| down on | lookDown | 1 |
| for | lookFor | 1 |
| forward to | lookForward | 1 |
| in (on) | lookIn | 1 |
| into | lookInto | 1 |
| on | lookOn | 2 |
| out | lookOut | 3 |
| over | lookOver | 1 |
| through | lookThrough | 2 |
| to | lookTo | 2 |
| up | lookUp | 4 |

## Content

**after**
1. To take care of someone or something and make sure they have what they need. / "As a manager, you must look after your team's well-being."

**ahead**
1. To think about and plan for the future. / "A good leader needs to look ahead to anticipate changes in the market."

**around / round / about**
1. To walk through a place to see what is there. / "We took some time to look around the new office before the meeting."
2. To search for something in various places. / "I am looking about for a new software developer to join the team."

**away**
1. To turn your eyes away from someone or something. / "The presentation data was so confusing that I had to look away from the screen."

**back (on)**
1. To think about something that happened in the past. / "When I look back on my early days programming in Java, I realize how much I have learned."

**down on**
1. To think that you are better or more important than someone else. / "A professional leader should never look down on junior employees."

**for**
1. To try to find something or someone. / "The development team is looking for a solution to the database error."

**forward to**
1. To feel excited and happy about something that is going to happen in the future. / "I look forward to reviewing the new business strategy with you tomorrow."

**in (on)**
1. To visit a person for a short time, usually to check that they are okay. / "I will look in on the new trainees later to see if they need help."

**into**
1. To investigate or research the facts of a situation or problem. / "The IT department will look into why the server crashed."

**on**
1. To watch an event happen without taking part in it. / "The manager looked on as the team successfully deployed the new code."
2. To consider someone or something in a specific way. / "I look on her as the best project manager in the company."

**out**
1. To be careful or to warn someone of danger. / "Look out! That server rack is falling."
2. To take care of someone and make sure they are treated well (look out for). / "Good business partners always look out for each other."
3. To watch carefully in order to find something (look out for). / "Please look out for any spelling errors in the final contract."

**over**
1. To examine or read something quickly to check its quality. / "Could you look over this financial report before I send it to the client?"

**through**
1. To read something quickly. / "I will look through the Java documentation to find the correct method."
2. To deliberately ignore someone you know by pretending you do not see them. / "I smiled at my former boss, but he just looked straight through me."

**to**
1. To rely on someone to provide something (like help or advice). / "The board of directors looks to the CEO for clear guidance."
2. To direct your attention to something. / "We must look to our competitors to see what strategies they are using."

**up**
1. To try to find a piece of information in a book, list, or on the internet. / "If you don't know the exact syntax, look it up in the manual."
2. To improve or get better (usually referring to a situation or business). / "After a difficult first quarter, sales are finally looking up."
3. To contact or visit someone you have not seen for a long time. / "If you are ever in Warsaw, please look me up."
4. To deeply respect and admire someone (look up to). / "Many junior developers look up to him because of his deep technical knowledge."

## Files to create / modify

- `src/pages/look/LookVerbPage.tsx` — new page (16 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `LOOK_PARTICLES` constant + VERBS entry after 'log'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/look`
- `src/data/listVerbIndex.ts` — import lookSections + add `buildEntries` call
- `src/__tests__/look_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/look_verb_page/*.test.tsx` — 16 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Look card, subtitle, and copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fall/FallVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `lookAfter_section_expanded`)
- Compound particle `around / round / about` → storageKeyPrefix `lookAround`, test file `around_round_about.test.tsx`
- Particle `back (on)` → storageKeyPrefix `lookBack`, test file `back_on.test.tsx`
- Particle `down on` → storageKeyPrefix `lookDown`, test file `down_on.test.tsx`
- Particle `forward to` → storageKeyPrefix `lookForward`, test file `forward_to.test.tsx`
- Particle `in (on)` → storageKeyPrefix `lookIn`, test file `in_on.test.tsx`
- VERBS entry for Look goes after Log (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 #1 `src/pages/look/LookVerbPage.tsx` created with 16 sections, all meanings, all using default.png
- [x] #2 #2 LOOK_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 16 particles
- [x] #3 #3 VERBS entry added for Look after Log in PhrasalVerbsListPage.tsx
- [x] #4 #4 Route `/phrasal-verbs/list/look` registered in src/main.tsx
- [x] #5 #5 lookSections added to listVerbIndex.ts search index
- [x] #6 #6 16 test files created under src/__tests__/look_verb_page/ (one per particle)
- [x] #7 #7 PhrasalVerbsListPage.test.tsx extended with Look card, subtitle, and copy-button describe blocks
- [x] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added Look phrasal verb page with 16 sections (23 meanings total). Created LookVerbPage.tsx, helpers.tsx, and 16 test files under src/__tests__/look_verb_page/. Updated PhrasalVerbsListPage.tsx, main.tsx, listVerbIndex.ts, and PhrasalVerbsListPage.test.tsx. All 19,386 tests pass (804 files). Committed as feat: add Look phrasal verb page with list card and tests (4cd49b1, 22 files, 1134 insertions).
<!-- SECTION:FINAL_SUMMARY:END -->
