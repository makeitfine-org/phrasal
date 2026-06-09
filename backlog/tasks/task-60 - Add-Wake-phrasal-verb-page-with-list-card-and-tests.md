---
id: TASK-60
title: Add "Wake" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 48000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Wake" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (3 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| to | wakeTo | 2 |
| up | wakeUp | 4 |
| up to | wakeUpTo | 1 |

## Content

**to**
1. To stop sleeping and immediately find a specific condition, sound, or situation greeting you. / "We woke to the sound of birds singing outside the window."
2. To become aware of a fact or responsibility (literary). / "Society is slowly waking to the severe impacts of climate change."

**up**
1. To transition naturally from sleep to an awake state. / "I usually wake up at 6:30 AM without an alarm."
2. To rouse another person, animal, or system from sleep. / "Please wake me up when the train gets to London."
3. To stop being inattentive or oblivious and start paying attention to responsibilities. / "The team was playing terribly, but they finally woke up in the second half and won the game."
4. To inject energy, excitement, or activity into a dull environment or event. / "We need to hire a better DJ to wake this party up."

**up to**
1. To finally realize or understand a fact, condition, or danger that one was previously ignoring or failing to notice. / "The company's board needs to wake up to the fact that their competitors are innovating faster."

## Files to create / modify

- `src/pages/wake/WakeVerbPage.tsx` — new page (3 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `WAKE_PARTICLES` constant + VERBS entry after 'use'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/wake`
- `src/data/listVerbIndex.ts` — import wakeSections + add `buildEntries` call
- `src/__tests__/wake_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/wake_verb_page/*.test.tsx` — 3 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Wake card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `wakeUp_section_expanded`)
- Three-part particle `up to` → storageKeyPrefix `wakeUpTo` (same convention as `tryOutFor`)
- VERBS entry for Wake goes after Use (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `src/pages/wake/WakeVerbPage.tsx` created with 3 sections, all meanings, all using default.png
- [ ] #2 WAKE_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 3 particles
- [ ] #3 VERBS entry added for Wake after Use in PhrasalVerbsListPage.tsx
- [ ] #4 Route `/phrasal-verbs/list/wake` registered in src/main.tsx
- [ ] #5 wakeSections added to listVerbIndex.ts search index
- [ ] #6 3 test files created under src/__tests__/wake_verb_page/ (one per particle)
- [ ] #7 PhrasalVerbsListPage.test.tsx extended with Wake card, subtitle, and copy-button describe blocks
- [ ] #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
