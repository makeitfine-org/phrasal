---
id: TASK-16
title: Add "Check" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09 11:18'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 4000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Check" phrasal verb entry following the same pattern as Blow/Brush/Build/Call/Carry pages.

## Particles (14 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| off | checkOff | 1 |
| on | checkOn | 1 |
| up | checkUp | 1 |
| down | checkDown | 1 |
| in | checkIn | 4 |
| into | checkInto | 2 |
| out | checkOut | 6 |
| back | checkBack | 1 |
| for | checkFor | 1 |
| with | checkWith | 1 |
| over | checkOver | 1 |
| through | checkThrough | 2 |
| around / round | checkAround | 1 |
| against | checkAgainst | 1 |

## Content

**off**
1. To mark an item on a list to show that it has been completed or verified. / "After completing the code review, I checked off the task in Jira."

**on**
1. To look at someone or something to make sure they are safe, progressing well, or in good condition. / "The manager stopped by to check on the new Java developers."

**up**
1. To investigate someone or something to discover what they are doing or if they are okay. / "The client called to check up on the progress of the software release."

**down**
1. To go down a list of options until you find one that works (often used in processes or sports). / "If the main database fails, the system will check down the list and connect to the backup server."

**in**
1. To register your arrival at a hotel, airport, or event. / "The CEO checked in at the hotel right before the leadership conference."
2. To contact someone briefly to give an update or make sure everything is okay. / "Let's check in on Friday to discuss the sprint results."
3. (Tech) To upload or save source code to a version control system (like Git or SVN). / "Make sure to check in your Java code before you leave for the weekend."
4. To leave your bags at the airport before a flight. / "I need to check in my heavy suitcase."

**into**
1. To arrive and register at a hotel, clinic, or hospital. / "We checked into the Hilton at 3:00 PM."
2. To investigate or look for more information about a problem. / "The application keeps crashing; the IT team needs to check into it immediately."

**out**
1. To pay your bill and leave a hotel. / "We have to check out of our rooms by 11:00 AM."
2. To examine, investigate, or look at something interesting. / "You should check out this new Java framework; it could save us a lot of time."
3. To prove to be true or correct after investigation. / "The server logs show no errors, so the user's story doesn't check out."
4. To pay for goods at a store or online. / "I added the books to my online cart and checked out."
5. (Tech) To download or switch to a specific version of code from a repository (like Git). / "Please check out the feature-login branch and run the tests."
6. (Informal) To stop paying attention or disconnect mentally because you are tired or bored. / "The meeting was so long that half the team checked out after an hour."

**back**
1. To return later to see if something has happened or is ready. / "The system is still restarting; please check back in five minutes."

**for**
1. To look closely to find a specific thing (often errors, signs, or problems). / "We ran automated tests to check for security bugs in the code."

**with**
1. To ask someone for permission, advice, or information before doing something. / "You need to check with the project manager before changing the database structure."

**over**
1. To examine something carefully from start to finish to find errors or problems. / "Please check over the business contract before you sign it."

**through**
1. To look at or read a collection of items carefully. / "I checked through the error logs to find where the Java exception happened."
2. To send luggage directly to a final destination without needing to collect it during a connection. / "My bags were checked through all the way to Warsaw."

**around / round**
1. To look in various places or ask several people for information (often to compare prices or options). / "We should check around for a cheaper cloud hosting provider before signing a contract."

**against**
1. To compare one thing with another to see if they match or to find differences. / "The finance team must check the monthly expenses against the budget."

## Files to create / modify

- `src/pages/check/CheckVerbPage.tsx` — new page (14 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `CHECK_PARTICLES` constant + VERBS entry after 'catch'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/check`
- `src/data/listVerbIndex.ts` — import checkSections + add `buildEntries` call
- `src/__tests__/check_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/check_verb_page/*.test.tsx` — 14 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Check card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/blow/BlowVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `checkOff_section_expanded`)
- Compound particle `around / round` → storageKeyPrefix `checkAround`
- VERBS entry goes after 'catch' (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 #1 `src/pages/check/CheckVerbPage.tsx` created with 14 sections, all meanings, all using default.png
- [ ] #2 #2 CHECK_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 14 particles
- [ ] #3 #3 VERBS entry added for Check after Catch in PhrasalVerbsListPage.tsx
- [ ] #4 #4 Route `/phrasal-verbs/list/check` registered in src/main.tsx
- [ ] #5 #5 checkSections added to listVerbIndex.ts search index
- [ ] #6 #6 14 test files created under src/__tests__/check_verb_page/ (one per particle)
- [ ] #7 #7 PhrasalVerbsListPage.test.tsx extended with Check card, subtitle, and copy-button describe blocks
- [ ] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
