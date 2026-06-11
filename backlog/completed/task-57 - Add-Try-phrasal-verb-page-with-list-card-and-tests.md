---
id: TASK-57
title: Add "Try" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09'
updated_date: '2026-06-11 19:39'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 45000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Try" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (6 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| back | tryBack | 1 |
| for | tryFor | 1 |
| on | tryOn | 2 |
| out | tryOut | 2 |
| out for | tryOutFor | 1 |
| over | tryOver | 1 |

## Content

**back**
1. To make another attempt to contact someone or return to a place at a later time because the first attempt was unsuccessful. / "The hiring manager is currently stuck in a meeting; I'll try back in an hour."

**for**
1. To make a concerted effort to achieve, win, or obtain something, often when success is not guaranteed. / "After updating his professional profile, Sam decided to try for the Senior Recruitment Coordinator position."

**on**
1. To put on an item of clothing or accessories to see if it fits or looks good before buying or wearing it. / "I need to try on this blazer to make sure it looks professional for the client meeting."
2. To attempt to deceive someone or test someone's boundaries to see what you can get away with (primarily British/Australian English, "try it on"). / "The candidate knew the salary cap was strict, but he still tried it on during negotiations by asking for an extra 20%."

**out**
1. To test something (such as a new system, tool, or method) in a practical setting to evaluate its effectiveness or performance. / "We decided to try out a new GitHub sourcing extension to see if it helps us find specialized DevOps talent faster."
2. To test an idea, pitch, or product on someone to get their reaction (try out on). / "Can I try out my new interview script on you before I call the first applicant?"

**out for**
1. To undergo a competitive evaluation, audition, or test to earn a position on a team, in a play, or in a company. / "Several junior developers are going to try out for the lead engineering vacancy by submitting technical assessments."

**over**
1. To practice, rehearse, or run through something from beginning to end to check for flaws (slightly dated, most commonly used with music or speeches). / "Let's try over the presentation one more time before the stakeholders arrive."

## Files to create / modify

- `src/pages/try/TryVerbPage.tsx` — new page (6 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `TRY_PARTICLES` constant + VERBS entry after 'throw'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/try`
- `src/data/listVerbIndex.ts` — import trySections + add `buildEntries` call
- `src/__tests__/try_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/try_verb_page/*.test.tsx` — 6 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Try card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `tryOn_section_expanded`)
- Particle `out for` is a distinct entry from `out` → storageKeyPrefix `tryOutFor`
- VERBS entry for Try goes after Throw (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 `src/pages/try/TryVerbPage.tsx` created with 6 sections, all meanings, all using default.png
- [x] #2 TRY_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 6 particles
- [x] #3 VERBS entry added for Try after Throw in PhrasalVerbsListPage.tsx
- [x] #4 Route `/phrasal-verbs/list/try` registered in src/main.tsx
- [x] #5 trySections added to listVerbIndex.ts search index
- [x] #6 6 test files created under src/__tests__/try_verb_page/ (one per particle)
- [x] #7 PhrasalVerbsListPage.test.tsx extended with Try card, subtitle, and copy-button describe blocks
- [x] #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
