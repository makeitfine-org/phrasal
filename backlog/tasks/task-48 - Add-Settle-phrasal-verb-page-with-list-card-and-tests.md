---
id: TASK-48
title: Add "Settle" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09 17:25'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 36000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Settle" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (11 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| back | settleBack | 1 |
| down | settleDown | 3 |
| for | settleFor | 1 |
| in | settleIn | 1 |
| into | settleInto | 1 |
| on | settleOn | 2 |
| out | settleOut | 2 |
| over | settleOver | 1 |
| to | settleTo | 1 |
| up | settleUp | 1 |
| with | settleWith | 2 |

## Content

**back**
1. To relax into a comfortable physical position, usually leaning backward. / "After a very successful product launch, the CEO settled back in his chair with a smile."

**down**
1. To become quiet and relaxed after being excited, nervous, or angry. / "The manager waited for the noisy room to settle down before starting her presentation."
2. To start living a quiet, stable life, often by staying in one place, buying a house, or starting a family. / "After years of moving between different tech startups, he decided to settle down in Warsaw and take a stable corporate job."
3. To start paying serious attention to a task ("settle down to"). / "We need to settle down to work if we want to finish this software update today."

**for**
1. To accept something that is available, even though it is not exactly what you wanted or hoped for. / "We wanted to hire a senior Java developer, but because of the budget, we had to settle for a mid-level programmer."

**in**
1. To become comfortable, relaxed, and familiar in a new home, environment, or job. / "It takes about a month for a new employee to fully settle in and learn the company culture."

**into**
1. To get used to a new role, routine, or situation and become comfortable with it. / "She quickly settled into her new position as the lead project manager."

**on**
1. To make a final decision or choice after thinking about multiple options. / "After reviewing several different programming languages, the development team settled on Java for the new project."
2. To land or rest on a physical surface. / "The dust finally settled on the old office desks."

**out**
1. To reach an agreement without going through a full court trial (often phrased as "settle out of court"). / "The two companies decided to settle out of court to avoid a long and expensive legal battle."
2. To sink to the bottom of a liquid. / "If you leave the coffee pot alone, the grounds will settle out at the bottom."

**over**
1. To descend and cover something (often used to describe weather, a feeling, or a mood in a room). / "A deep silence settled over the boardroom when the team saw the terrible financial results."

**to**
1. To begin giving your full attention and effort to a task (very similar to "settle down to"). / "Once everyone had their coffee, the team settled to the task of fixing the software bugs."

**up**
1. To pay money that you owe, usually to balance an account or share a bill. / "I will pay for the client's lunch now, and we can settle up when we get back to the office."

**with**
1. To reach a financial agreement or pay a debt to a person or organization. / "The company finally settled with its suppliers after a long dispute over the late invoices."
2. To punish someone who has done something bad to you in the past. / "I have an old argument to settle with a former competitor."

## Files to create / modify

- `src/pages/settle/SettleVerbPage.tsx` — new page (11 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `SETTLE_PARTICLES` constant + VERBS entry after 'set'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/settle`
- `src/data/listVerbIndex.ts` — import settleSections + add `buildEntries` call
- `src/__tests__/settle_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/settle_verb_page/*.test.tsx` — 11 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Settle card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `settleDown_section_expanded`)
- VERBS entry for Settle goes after Set (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 #1 `src/pages/settle/SettleVerbPage.tsx` created with 11 sections, all meanings, all using default.png
- [ ] #2 #2 SETTLE_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 11 particles
- [ ] #3 #3 VERBS entry added for Settle after Set in PhrasalVerbsListPage.tsx
- [ ] #4 #4 Route `/phrasal-verbs/list/settle` registered in src/main.tsx
- [ ] #5 #5 settleSections added to listVerbIndex.ts search index
- [ ] #6 #6 11 test files created under src/__tests__/settle_verb_page/ (one per particle)
- [ ] #7 #7 PhrasalVerbsListPage.test.tsx extended with Settle card, subtitle, and copy-button describe blocks
- [ ] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
