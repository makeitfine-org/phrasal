---
id: TASK-20
title: Add "Deal" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09 14:33'
updated_date: '2026-06-09 15:15'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 8000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Deal" phrasal verb entry following the same pattern as Call/Carry pages.

## Particles (8 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| around / round | dealAround | 1 |
| away | dealAway | 1 |
| by | dealBy | 1 |
| in | dealIn | 2 |
| into | dealInto | 1 |
| out | dealOut | 2 |
| to | dealTo | 1 |
| with | dealWith | 4 |

## Content

**around / round**
1. To give a share of something to everyone present in a circle or group. / "Please deal the documents around so everyone has a copy."

**away**
1. To give something away in a trade or negotiation, often losing a valuable asset. / "The company dealt away its most profitable division to pay off debts."

**by**
1. To treat someone in a particular way (formal / old-fashioned). / "She always felt that she had been dealt by unfairly in the promotion process."

**in**
1. To buy and sell specific products as a business. / "His store deals in rare books and antique maps."
2. To include someone in an activity, especially a card game. / "We are going to start the next game of poker. Deal me in!"

**into**
1. To physically or metaphorically include someone in a group or game (very similar to "deal in"). / "Pull up a chair and we will deal you into the game."

**out**
1. To distribute or share things among a group of people. / "The manager dealt out the new project assignments to the team."
2. To give a punishment to someone. / "The judge dealt out a very harsh sentence for the crime."

**to**
1. To punish, attack someone, or take strong action to fix a problem (Regional: Australia / New Zealand). / "If the server keeps crashing, the IT department will have to deal to it."

**with**
1. To take action to solve a problem or complete a task. / "I have a lot of emails to deal with this morning."
2. To do business with someone or an organization. / "Our company only deals with local suppliers to reduce shipping costs."
3. To be about a specific subject. / "This training course deals with effective management techniques."
4. To manage or handle difficult emotions or situations. / "It can be hard to deal with stress when you have a tight deadline."

## Files to create / modify

- `src/pages/deal/DealVerbPage.tsx` — new page (8 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `DEAL_PARTICLES` constant + VERBS entry after 'count'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/deal`
- `src/data/listVerbIndex.ts` — import dealSections + add `buildEntries` call
- `src/__tests__/deal_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/deal_verb_page/*.test.tsx` — 8 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Deal card, subtitle, and copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/carry/CarryVerbPage.tsx` (TASK-14)
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `dealWith_section_expanded`)
- Compound particle `around / round` → storageKeyPrefix `dealAround`
- VERBS entry for Deal goes after Count (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 #1 `src/pages/deal/DealVerbPage.tsx` created with 8 sections, all meanings, all using default.png
- [x] #2 #2 DEAL_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 8 particles
- [x] #3 #3 VERBS entry added for Deal after Count in PhrasalVerbsListPage.tsx
- [x] #4 #4 Route `/phrasal-verbs/list/deal` registered in src/main.tsx
- [x] #5 #5 dealSections added to listVerbIndex.ts search index
- [x] #6 #6 8 test files created under src/__tests__/deal_verb_page/ (one per particle)
- [x] #7 #7 PhrasalVerbsListPage.test.tsx extended with Deal card, subtitle, and copy-button describe blocks
- [x] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Created DealVerbPage.tsx with 8 sections (around / round, away, by, in, into, out, to, with) using default.png. Added DEAL_PARTICLES to PhrasalVerbsListPage.tsx after Count, registered route in main.tsx, added dealSections to listVerbIndex.ts. Created helpers.tsx + 8 particle test files. Extended PhrasalVerbsListPage.test.tsx with Deal card, subtitle, and copy-button describe blocks. All 8985 tests green. Committed as d093025.
<!-- SECTION:FINAL_SUMMARY:END -->
