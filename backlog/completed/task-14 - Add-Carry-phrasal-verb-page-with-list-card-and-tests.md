---
id: TASK-14
title: Add "Carry" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09 11:04'
updated_date: '2026-06-09 11:48'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 2000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Carry" phrasal verb entry following the same pattern as Call/Blow/Brush/Build pages.

## Particles (9 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| about / around / round | carryAbout | 2 |
| away | carryAway | 1 |
| back | carryBack | 1 |
| forward | carryForward | 2 |
| off | carryOff | 3 |
| on | carryOn | 4 |
| out | carryOut | 2 |
| over | carryOver | 2 |
| through | carryThrough | 2 |

## Content

**about / around / round**
1. To keep something with you everywhere you go (physical). / "The lead developer carries around a notebook to write down new software ideas."
2. To hold onto a feeling or emotion (usually negative) for a long time. / "She carried around a lot of stress after the project failed."

**away**
1. To become too excited and lose control of your behavior (almost always used in the passive voice: "get/be carried away"). / "The marketing team got carried away with the new features and promised the client things we couldn't build."

**back**
1. To bring a past memory to mind; to make someone remember a specific time. / "Hearing that old startup story carried the CEO back to his first year in business."

**forward**
1. To make a project or idea progress to the next stage. / "We need a strong manager to carry this initiative forward."
2. (Business / Accounting) To transfer a financial total or a specific benefit to a new page, period, or year. / "Any unused vacation days from this year will be carried forward to next year."

**off**
1. To succeed in doing something difficult, often when others did not expect you to. / "It was a highly risky strategy, but the leadership team carried it off perfectly."
2. To win a prize, competition, or award. / "Our company carried off three major industry awards this year."
3. To cause death, usually due to a disease (formal and older use). / "The virus carried off thousands of people in the 19th century."

**on**
1. To continue doing something. / "Please carry on with your coding; I will check your progress after lunch."
2. To manage, run, or take part in a business or activity. / "They carry on a successful IT consulting business in Warsaw."
3. To behave in an uncontrolled, angry, or childish way. / "The customer carried on for ten minutes about the delayed software release."
4. To have a secret, often romantic or sexual, relationship. / "It was rumored that the two directors were carrying on."

**out**
1. To perform, execute, or complete a task, instruction, experiment, or plan. / "The IT department carried out the system update over the weekend without any issues."
2. To fulfill a promise or a threat. / "The management carried out their promise to increase employee training budgets."

**over**
1. To continue to exist in a different situation, environment, or time. / "His excellent management skills carried over perfectly into his new role as a director."
2. To delay or postpone something to a later time. / "We ran out of time, so the final agenda item was carried over to next week's meeting."

**through**
1. To complete a task successfully despite facing significant difficulties. / "The team's dedication carried the software release through to a successful launch."
2. To help someone or something survive a difficult situation. / "The emergency investment carried the business through the financial crisis."

## Files to create / modify

- `src/pages/carry/CarryVerbPage.tsx` — new page (9 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `CARRY_PARTICLES` constant + VERBS entry after 'call'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/carry`
- `src/data/listVerbIndex.ts` — import carrySections + add `buildEntries` call
- `src/__tests__/carry_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/carry_verb_page/*.test.tsx` — 9 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Carry card, subtitle, and copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/call/CallVerbPage.tsx` (TASK-13)
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `carryOn_section_expanded`)
- Compound particle `about / around / round` → storageKeyPrefix `carryAbout`
- VERBS entry for Carry goes after Call (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 #1 `src/pages/carry/CarryVerbPage.tsx` created with 9 sections, all meanings, all using default.png
- [x] #2 #2 CARRY_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 9 particles
- [x] #3 #3 VERBS entry added for Carry after Call in PhrasalVerbsListPage.tsx
- [x] #4 #4 Route `/phrasal-verbs/list/carry` registered in src/main.tsx
- [x] #5 #5 carrySections added to listVerbIndex.ts search index
- [x] #6 #6 9 test files created under src/__tests__/carry_verb_page/ (one per particle)
- [x] #7 #7 PhrasalVerbsListPage.test.tsx extended with Carry card, subtitle, and copy-button describe blocks
- [x] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
