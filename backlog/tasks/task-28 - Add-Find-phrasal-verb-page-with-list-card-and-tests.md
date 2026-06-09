---
id: TASK-28
title: Add "Find" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09 15:34'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 16000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Find" phrasal verb entry following the same pattern as existing verb pages.

## Particles (3 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| out | findOut | 2 |
| for | findFor | 1 |
| against | findAgainst | 1 |

## Content

**out**
1. To discover information, learn a fact, or solve a problem. / "We need to review the server logs to find out why the Java application is crashing."
2. To discover that someone has lied, kept a secret, or done something wrong (separable: find someone out). / "He lied on his resume, but the HR department eventually found him out."

**for**
1. To make an official decision in favor of someone (formal, used in legal or official settings). / "After reviewing the contract, the judge found for the software developer and ordered the client to pay the invoice."

**against**
1. To make an official decision that someone is guilty or loses a dispute (formal, used in legal or official settings). / "The court found against the leadership team because they did not follow labor laws."

## Files to create / modify

- `src/pages/find/FindVerbPage.tsx` — new page (3 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `FIND_PARTICLES` constant + VERBS entry (alphabetical)
- `src/main.tsx` — import + register route `/phrasal-verbs/list/find`
- `src/data/listVerbIndex.ts` — import findSections + add `buildEntries` call
- `src/__tests__/find_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/find_verb_page/*.test.tsx` — 3 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Find card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as existing verb pages (e.g. `src/pages/do/DoVerbPage.tsx`)
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `findOut_section_expanded`)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 #1 `src/pages/find/FindVerbPage.tsx` created with 3 sections, all meanings, all using default.png
- [ ] #2 #2 FIND_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 3 particles
- [ ] #3 #3 VERBS entry added for Find in alphabetical position in PhrasalVerbsListPage.tsx
- [ ] #4 #4 Route `/phrasal-verbs/list/find` registered in src/main.tsx
- [ ] #5 #5 findSections added to listVerbIndex.ts search index
- [ ] #6 #6 3 test files created under src/__tests__/find_verb_page/ (one per particle)
- [ ] #7 #7 PhrasalVerbsListPage.test.tsx extended with Find card, subtitle, and copy-button describe blocks
- [ ] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
