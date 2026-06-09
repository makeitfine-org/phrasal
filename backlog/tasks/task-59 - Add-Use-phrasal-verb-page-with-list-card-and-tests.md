---
id: TASK-59
title: Add "Use" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 47000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Use" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (3 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| against | useAgainst | 1 |
| to / used to | useTo | 2 |
| up | useUp | 2 |

## Content

**against**
1. To utilize information, evidence, or a person's trait to harm, manipulate, or gain an advantage over them. / "You have the right to remain silent; anything you say can and will be used against you in a court of law."

**to / used to**
1. Indicates an action done regularly in the past but no longer done, or a past state that no longer exists. / "I used to play the piano every day when I was a child."
2. To be familiar with something so it no longer seems new, strange, or difficult (be/get used to). / "It took me a few months, but I am finally used to waking up at 5:00 AM."

**up**
1. To consume entirely, expending the entirety of a supply, resource, or material so that nothing is left. / "We need to use up all the fresh vegetables in the fridge before they spoil."
2. To drain someone of their energy, strength, or usefulness (often passive). / "After working three double shifts in a row, he felt completely used up."

## Files to create / modify

- `src/pages/use/UseVerbPage.tsx` — new page (3 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `USE_PARTICLES` constant + VERBS entry after 'turn'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/use`
- `src/data/listVerbIndex.ts` — import useSections + add `buildEntries` call
- `src/__tests__/use_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/use_verb_page/*.test.tsx` — 3 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Use card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `useUp_section_expanded`)
- Compound particle `to / used to` → storageKeyPrefix `useTo`
- VERBS entry for Use goes after Turn (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `src/pages/use/UseVerbPage.tsx` created with 3 sections, all meanings, all using default.png
- [ ] #2 USE_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 3 particles
- [ ] #3 VERBS entry added for Use after Turn in PhrasalVerbsListPage.tsx
- [ ] #4 Route `/phrasal-verbs/list/use` registered in src/main.tsx
- [ ] #5 useSections added to listVerbIndex.ts search index
- [ ] #6 3 test files created under src/__tests__/use_verb_page/ (one per particle)
- [ ] #7 PhrasalVerbsListPage.test.tsx extended with Use card, subtitle, and copy-button describe blocks
- [ ] #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
