---
id: TASK-61
title: Add "Warm" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 49000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Warm" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (5 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| down | warmDown | 1 |
| over | warmOver | 2 |
| through | warmThrough | 1 |
| to | warmTo | 2 |
| up | warmUp | 5 |

## Content

**down**
1. To perform gentle exercises or stretches after vigorous physical activity to help the body recover (British English). / "After testing out the new 20-inch bike on the trail, make sure to walk for a bit to warm down."

**over**
1. To reheat cooked food (North American English, synonymous with warm up). / "We can just warm over last night's dinner."
2. To present an old idea or strategy as if it were new or original, usually with a negative connotation (as the adjective warmed-over). / "The agency pitched us a new sourcing strategy, but it was just a warmed-over version of what we did in 2024."

**through**
1. To heat food gently until it is warm right to the middle without cooking it further or changing its texture. / "Just put the tortillas in the oven for a few minutes to warm through."

**to**
1. To begin to like someone or something after initial hesitation or doubt (often warm up to). / "I wasn't sure about the Adizes PAEI management model at first, but I'm really warming to it."
2. To become interested in or enthusiastic about an idea or topic. / "The executive team is finally warming to the idea of reopening the individual entrepreneurship structure."

**up**
1. To increase in temperature or make someone or something warmer. / "Let's step inside the cafe to warm up; the wind is freezing today."
2. To prepare for an activity, event, or performance by practicing or doing gentle exercises. / "I usually warm up with some simple coding exercises before jumping into heavy software development."
3. To become more animated, relaxed, or friendly in a social or professional setting. / "The candidate was nervous at first, but she warmed up after we started discussing her GitHub projects."
4. To reheat food that has already been cooked. / "I'll warm up the leftover pierogi for lunch."
5. To leave a machine running for a short time until it reaches its optimal operating temperature. / "Give the car a minute to warm up before we drive off."

## Files to create / modify

- `src/pages/warm/WarmVerbPage.tsx` — new page (5 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `WARM_PARTICLES` constant + VERBS entry after 'wake'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/warm`
- `src/data/listVerbIndex.ts` — import warmSections + add `buildEntries` call
- `src/__tests__/warm_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/warm_verb_page/*.test.tsx` — 5 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Warm card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `warmUp_section_expanded`)
- VERBS entry for Warm goes after Wake (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `src/pages/warm/WarmVerbPage.tsx` created with 5 sections, all meanings, all using default.png
- [ ] #2 WARM_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 5 particles
- [ ] #3 VERBS entry added for Warm after Wake in PhrasalVerbsListPage.tsx
- [ ] #4 Route `/phrasal-verbs/list/warm` registered in src/main.tsx
- [ ] #5 warmSections added to listVerbIndex.ts search index
- [ ] #6 5 test files created under src/__tests__/warm_verb_page/ (one per particle)
- [ ] #7 PhrasalVerbsListPage.test.tsx extended with Warm card, subtitle, and copy-button describe blocks
- [ ] #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
