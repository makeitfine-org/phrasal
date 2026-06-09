---
id: TASK-17
title: Add "Cheer" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09 11:18'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 5000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Cheer" phrasal verb entry following the same pattern as Blow/Brush/Build/Call/Carry pages.

## Particles (5 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| up | cheerUp | 2 |
| on | cheerOn | 1 |
| for | cheerFor | 1 |
| against | cheerAgainst | 1 |
| off | cheerOff | 1 |

## Content

**up**
1. (Intransitive) To start feeling happier; to stop being sad. / "You need to cheer up! The project delay is not a total disaster."
2. (Transitive) To make another person feel happier. / "We bought some coffee and cake to cheer the team up after a stressful week."

**on**
1. To encourage someone by shouting words of support, usually when they are competing or doing something difficult. / "The whole department went to the meeting to cheer her on during her final presentation."

**for**
1. To publicly support a specific person, team, or idea, hoping they will succeed. / "Everyone in the office is cheering for the new software release to be a success."

**against**
1. To express a desire for someone or something to fail or lose. / "In a healthy business environment, you focus on improving your own product rather than cheering against your competitors."

**off**
1. To applaud or shout in support of someone as they are leaving a stage, field, or room. / "After 20 years with the company, the retiring manager was cheered off the stage by his colleagues."

## Files to create / modify

- `src/pages/cheer/CheerVerbPage.tsx` — new page (5 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `CHEER_PARTICLES` constant + VERBS entry after 'check'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/cheer`
- `src/data/listVerbIndex.ts` — import cheerSections + add `buildEntries` call
- `src/__tests__/cheer_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/cheer_verb_page/*.test.tsx` — 5 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Cheer card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/blow/BlowVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `cheerUp_section_expanded`)
- VERBS entry goes after 'check' (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 #1 `src/pages/cheer/CheerVerbPage.tsx` created with 5 sections, all meanings, all using default.png
- [ ] #2 #2 CHEER_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 5 particles
- [ ] #3 #3 VERBS entry added for Cheer after Check in PhrasalVerbsListPage.tsx
- [ ] #4 #4 Route `/phrasal-verbs/list/cheer` registered in src/main.tsx
- [ ] #5 #5 cheerSections added to listVerbIndex.ts search index
- [ ] #6 #6 5 test files created under src/__tests__/cheer_verb_page/ (one per particle)
- [ ] #7 #7 PhrasalVerbsListPage.test.tsx extended with Cheer card, subtitle, and copy-button describe blocks
- [ ] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
