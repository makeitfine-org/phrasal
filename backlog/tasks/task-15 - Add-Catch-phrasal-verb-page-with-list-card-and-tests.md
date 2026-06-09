---
id: TASK-15
title: Add "Catch" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09 11:18'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Catch" phrasal verb entry following the same pattern as Blow/Brush/Build/Call/Carry pages.

## Particles (4 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| on | catchOn | 2 |
| up | catchUp | 4 |
| out | catchOut | 2 |
| in | catchIn | 2 |

## Content

**on**
1. To understand something (often after a delay or difficulty). / "The syntax of the new Java library was confusing at first, but the junior developers eventually caught on."
2. To become popular or widely accepted. / "Microservices architecture quickly caught on as the standard for enterprise software development."

**up**
1. To reach the same level, standard, or position as someone or something else. / "Our software is lacking some features, so we need to release a major update to catch up with our main competitor."
2. To do work or tasks that you did not have time to do earlier (often followed by "on"). / "I need to block out two hours this afternoon to catch up on my code reviews and emails."
3. To talk to someone to find out the latest news about their life or work. / "Let's schedule a brief meeting on Friday to catch up on the project's progress."
4. To involve someone in a situation, often against their will (used in the passive: be/get caught up in). / "The lead engineer got caught up in administrative tasks and had no time to write code."

**out**
1. To discover that someone has made a mistake, lied, or done something wrong. / "The automated testing pipeline caught the developer out by exposing a critical security flaw in the code."
2. To put someone in a difficult, unexpected, or unprepared situation. / "The sudden crash of our cloud servers caught the management team out during the product launch."

**in**
1. To discover someone in the middle of doing something (usually bad). / "The audit team caught the vendor in a lie about their data protection protocols."
2. To be trapped or delayed by an unavoidable situation (used as caught in). / "I missed the daily Scrum meeting because I got caught in heavy traffic."

## Files to create / modify

- `src/pages/catch/CatchVerbPage.tsx` — new page (4 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `CATCH_PARTICLES` constant + VERBS entry after 'carry'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/catch`
- `src/data/listVerbIndex.ts` — import catchSections + add `buildEntries` call
- `src/__tests__/catch_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/catch_verb_page/*.test.tsx` — 4 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Catch card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/blow/BlowVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `catchOn_section_expanded`)
- VERBS entry goes after 'carry' (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 #1 `src/pages/catch/CatchVerbPage.tsx` created with 4 sections, all meanings, all using default.png
- [ ] #2 #2 CATCH_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 4 particles
- [ ] #3 #3 VERBS entry added for Catch after Carry in PhrasalVerbsListPage.tsx
- [ ] #4 #4 Route `/phrasal-verbs/list/catch` registered in src/main.tsx
- [ ] #5 #5 catchSections added to listVerbIndex.ts search index
- [ ] #6 #6 4 test files created under src/__tests__/catch_verb_page/ (one per particle)
- [ ] #7 #7 PhrasalVerbsListPage.test.tsx extended with Catch card, subtitle, and copy-button describe blocks
- [ ] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
