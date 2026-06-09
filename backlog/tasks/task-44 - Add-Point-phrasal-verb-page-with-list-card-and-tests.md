---
id: TASK-44
title: Add "Point" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09 17:22'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 32000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Point" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (6 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| ahead / forward | pointAhead | 1 |
| back | pointBack | 1 |
| off | pointOff | 1 |
| out | pointOut | 2 |
| to | pointTo | 3 |
| up | pointUp | 1 |

## Content

**ahead / forward**
1. To look toward or indicate the future. / "This new business model points forward to a more automated and efficient company."

**back**
1. To show that something is connected to a past event, or to remind someone of the past. / "Most of these software bugs point back to the rushed code we merged last month."

**off**
1. To separate numbers with a decimal point (used mainly in mathematics and accounting). / "When calculating the final cost, remember to point off two decimal places."

**out**
1. To tell someone a fact they did not know or had forgotten. / "The lead developer pointed out that the Java update would break our older systems."
2. To direct attention to someone or something using your finger. / "During the office tour, the manager pointed out where the IT department sits."

**to**
1. To mention something as proof or as a reason why something happened. / "The CEO pointed to the new marketing strategy to explain the sudden growth in sales."
2. To suggest that a particular situation or result is likely. / "All the server performance metrics point to a memory leak in the application."
3. To physically aim your finger or an object at something. / "The architect pointed to the database schema on the whiteboard."

**up**
1. To emphasize something or make a problem easier to notice (similar to "highlight"). / "The recent system crash points up the need for better error handling in our code."

## Files to create / modify

- `src/pages/point/PointVerbPage.tsx` — new page (6 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `POINT_PARTICLES` constant + VERBS entry after 'pick'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/point`
- `src/data/listVerbIndex.ts` — import pointSections + add `buildEntries` call
- `src/__tests__/point_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/point_verb_page/*.test.tsx` — 6 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Point card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `pointOut_section_expanded`)
- Compound particle `ahead / forward` → storageKeyPrefix `pointAhead`
- VERBS entry for Point goes after Pick (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 #1 `src/pages/point/PointVerbPage.tsx` created with 6 sections, all meanings, all using default.png
- [ ] #2 #2 POINT_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 6 particles
- [ ] #3 #3 VERBS entry added for Point after Pick in PhrasalVerbsListPage.tsx
- [ ] #4 #4 Route `/phrasal-verbs/list/point` registered in src/main.tsx
- [ ] #5 #5 pointSections added to listVerbIndex.ts search index
- [ ] #6 #6 6 test files created under src/__tests__/point_verb_page/ (one per particle)
- [ ] #7 #7 PhrasalVerbsListPage.test.tsx extended with Point card, subtitle, and copy-button describe blocks
- [ ] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
