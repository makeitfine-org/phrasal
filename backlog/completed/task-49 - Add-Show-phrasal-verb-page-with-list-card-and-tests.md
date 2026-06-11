---
id: TASK-49
title: Add "Show" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09 17:25'
updated_date: '2026-06-11 08:00'
labels:
  - phrasal-verbs
  - content
dependencies: []
modified_files:
  - src/pages/show/ShowVerbPage.tsx
  - src/pages/PhrasalVerbsListPage.tsx
  - src/main.tsx
  - src/data/listVerbIndex.ts
  - src/__tests__/show_verb_page/helpers.tsx
  - src/__tests__/show_verb_page/around_round_about.test.tsx
  - src/__tests__/show_verb_page/down.test.tsx
  - src/__tests__/show_verb_page/for.test.tsx
  - src/__tests__/show_verb_page/in_into.test.tsx
  - src/__tests__/show_verb_page/off.test.tsx
  - src/__tests__/show_verb_page/out.test.tsx
  - src/__tests__/show_verb_page/over.test.tsx
  - src/__tests__/show_verb_page/through.test.tsx
  - src/__tests__/show_verb_page/to.test.tsx
  - src/__tests__/show_verb_page/up.test.tsx
  - src/__tests__/PhrasalVerbsListPage.test.tsx
priority: medium
ordinal: 37000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Show" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (10 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| around / round / about | showAround | 1 |
| down | showDown | 1 |
| for | showFor | 1 |
| in / into | showIn | 2 |
| off | showOff | 3 |
| out | showOut | 1 |
| over | showOver | 1 |
| through | showThrough | 2 |
| to | showTo | 1 |
| up | showUp | 4 |

## Content

**around / round / about**
1. To act as a guide and give someone a tour of a new place. / "Welcome to the new headquarters! Let me show you around the office."

**down**
1. In card games, to lay your cards face-up on the table to reveal your hand. / "After the final bet, it was time to show down their cards."

**for**
1. Used in the phrase "have something to show for [an effort]," meaning to have a result or evidence of your hard work. / "I worked all weekend on the project, but because of a server crash, I have nothing to show for it."

**in / into**
1. To act as a guide and lead someone inside a room or building (show in). / "When the candidates arrive, please show them in."
2. To lead someone into a specific room (show into). / "The receptionist showed the guests into the main conference room."

**off**
1. To behave in a way that is intended to attract attention or admiration (often seen as negative or boastful). / "He only bought that expensive sports car to show off."
2. To proudly display something you have or have achieved. / "She wanted to show off her new Java application to the management team."
3. To make something look its best or highlight its good qualities. / "That tailored suit really shows off his professional style."

**out**
1. To lead or escort someone to the exit of a building or room. / "Thank you for the interview. My assistant will show you out."

**over**
1. To guide someone around a building to inspect it (primarily British English, similar to "show around"). / "The real estate agent showed us over the new office space."

**through**
1. To be visible under or through a layer of something else (like cloth or paper). / "You need to apply another coat of paint; the old dark color is showing through."
2. To become obvious or visible, referring to an emotion or quality someone is trying to hide. / "She tried to stay calm, but her frustration showed through when the software crashed again."

**to**
1. To escort or lead someone to a specific location or seat. / "The host showed us to our table."

**up**
1. To arrive or appear at a place, especially when expected or late. / "We waited for an hour, but the client never showed up for the meeting."
2. To be clearly visible. / "The coffee stain won't show up on a dark carpet."
3. To reveal someone's faults or make them feel embarrassed, usually by doing something better than them. / "The junior developer's clean, efficient code showed up the senior developer's messy work."
4. To test positive for something (e.g., in a medical or drug test). / "The virus did not show up in his blood test."

## Files to create / modify

- `src/pages/show/ShowVerbPage.tsx` — new page (10 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `SHOW_PARTICLES` constant + VERBS entry after 'settle'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/show`
- `src/data/listVerbIndex.ts` — import showSections + add `buildEntries` call
- `src/__tests__/show_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/show_verb_page/*.test.tsx` — 10 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Show card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `showUp_section_expanded`)
- Compound particle `around / round / about` → storageKeyPrefix `showAround`
- Compound particle `in / into` → storageKeyPrefix `showIn`
- VERBS entry for Show goes after Settle (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 #1 `src/pages/show/ShowVerbPage.tsx` created with 10 sections, all meanings, all using default.png
- [x] #2 #2 SHOW_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 10 particles
- [x] #3 #3 VERBS entry added for Show after Settle in PhrasalVerbsListPage.tsx
- [x] #4 #4 Route `/phrasal-verbs/list/show` registered in src/main.tsx
- [x] #5 #5 showSections added to listVerbIndex.ts search index
- [x] #6 #6 10 test files created under src/__tests__/show_verb_page/ (one per particle)
- [x] #7 #7 PhrasalVerbsListPage.test.tsx extended with Show card, subtitle, and copy-button describe blocks
- [x] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added Show phrasal verb page (10 sections, 16 total meanings) following the standard VerbPageLayout pattern. All images use default.png. Committed as d5bd3b3 — 16 files changed, 680 insertions. All 16,628 tests pass (694 files).
<!-- SECTION:FINAL_SUMMARY:END -->
