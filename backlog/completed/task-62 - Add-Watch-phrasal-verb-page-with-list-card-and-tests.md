---
id: TASK-62
title: Add "Watch" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09'
updated_date: '2026-06-12 09:57'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 50000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Watch" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (7 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| back | watchBack | 1 |
| for | watchFor | 1 |
| on | watchOn | 1 |
| out | watchOut | 1 |
| out for | watchOutFor | 3 |
| over | watchOver | 2 |
| through | watchThrough | 1 |

## Content

**back**
1. To view a video, film, or recording of a previous event, often for review or analysis. / "We recorded the interview so we could watch it back later and take notes."

**for**
1. To look actively for a sign, event, or specific thing to happen. / "Keep driving, and watch for the exit sign just past the bridge."

**on**
1. To observe something happening, often dramatic or serious, without becoming actively involved. / "A large crowd gathered and watched on in shock as the building burned."

**out**
1. To be careful and pay attention to immediate danger (usually used as an exclamation or warning). / "Watch out! There is a car coming right at us."

**out for**
1. To be alert to the danger or presence of something or someone. / "If you go hiking in those woods, watch out for bears."
2. To protect someone or look after their best interests. / "Older siblings usually watch out for the younger ones at school."
3. To wait expectantly for something to arrive or appear. / "Watch out for the postman; I am expecting an important package today."

**over**
1. To protect, guard, or care for someone or something. / "The shepherd watched over his flock of sheep through the night."
2. To strictly supervise someone or an activity to ensure it is done correctly. / "The manager stood at the back of the room and watched over the new employees as they worked."

**through**
1. To watch a program, movie, or series entirely from beginning to end. / "It took me a whole weekend, but I finally watched the series through."

## Files to create / modify

- `src/pages/watch/WatchVerbPage.tsx` — new page (7 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `WATCH_PARTICLES` constant + VERBS entry after 'warm'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/watch`
- `src/data/listVerbIndex.ts` — import watchSections + add `buildEntries` call
- `src/__tests__/watch_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/watch_verb_page/*.test.tsx` — 7 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Watch card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `watchOut_section_expanded`)
- Three-part particle `out for` → storageKeyPrefix `watchOutFor` (same convention as `tryOutFor`)
- VERBS entry for Watch goes after Warm (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 `src/pages/watch/WatchVerbPage.tsx` created with 7 sections, all meanings, all using default.png
- [x] #2 WATCH_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 7 particles
- [x] #3 VERBS entry added for Watch after Warm in PhrasalVerbsListPage.tsx
- [x] #4 Route `/phrasal-verbs/list/watch` registered in src/main.tsx
- [x] #5 watchSections added to listVerbIndex.ts search index
- [x] #6 7 test files created under src/__tests__/watch_verb_page/ (one per particle)
- [x] #7 PhrasalVerbsListPage.test.tsx extended with Watch card, subtitle, and copy-button describe blocks
- [x] #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
