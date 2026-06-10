---
id: TASK-38
title: Add "Log" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09 16:57'
updated_date: '2026-06-10 15:13'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 26000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Log" phrasal verb entry following the same pattern as Call/Carry/Drop/Eat/Fall pages.

## Particles (5 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| in / into | logIn | 2 |
| out | logOut | 1 |
| on | logOn | 1 |
| off | logOff | 1 |
| up | logUp | 1 |

## Content

**in / into**
1. To provide credentials (like a username and password) to access a computer system, application, or network. / "You must log into the Java application using your administrator credentials."
2. To officially record that someone has arrived at a place, such as an office or hotel. / "All new contractors need to log in at the reception desk before entering the building."

**out**
1. To safely close your session and disconnect from a system, application, or website. / "Always remember to log out of the database when you finish your shift."

**on**
1. To connect to a computer network or start using a digital system (same meaning as log in). / "The project manager logged on to the company network to review the latest software release."

**off**
1. To disconnect from a computer network or system (same meaning as log out). / "Make sure you log off your workstation before leaving the office."

**up**
1. To achieve, record, or complete a specific amount of time, distance, or number of items (more common in British English). / "The development team has logged up over 200 hours of overtime to meet the project deadline."

## Files to create / modify

- `src/pages/log/LogVerbPage.tsx` — new page (5 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `LOG_PARTICLES` constant + VERBS entry after 'let'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/log`
- `src/data/listVerbIndex.ts` — import logSections + add `buildEntries` call
- `src/__tests__/log_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/log_verb_page/*.test.tsx` — 5 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Log card, subtitle, and copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fall/FallVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `logIn_section_expanded`)
- Compound particle `in / into` → storageKeyPrefix `logIn`, test file `in_into.test.tsx`
- VERBS entry for Log goes after Let (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 #1 `src/pages/log/LogVerbPage.tsx` created with 5 sections, all meanings, all using default.png
- [ ] #2 #2 LOG_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 5 particles
- [ ] #3 #3 VERBS entry added for Log after Let in PhrasalVerbsListPage.tsx
- [ ] #4 #4 Route `/phrasal-verbs/list/log` registered in src/main.tsx
- [ ] #5 #5 logSections added to listVerbIndex.ts search index
- [ ] #6 #6 5 test files created under src/__tests__/log_verb_page/ (one per particle)
- [ ] #7 #7 PhrasalVerbsListPage.test.tsx extended with Log card, subtitle, and copy-button describe blocks
- [ ] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
