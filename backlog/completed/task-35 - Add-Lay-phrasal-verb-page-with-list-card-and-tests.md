---
id: TASK-35
title: Add "Lay" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09 16:00'
updated_date: '2026-06-10 11:20'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 23000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Lay" phrasal verb entry following the same pattern as Call/Carry pages.

## Particles (13 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| about | layAbout | 1 |
| away | layAway | 1 |
| by | layBy | 1 |
| down | layDown | 4 |
| for | layFor | 1 |
| in | layIn | 1 |
| into | layInto | 1 |
| off | layOff | 3 |
| on | layOn | 2 |
| out | layOut | 4 |
| over | layOver | 1 |
| to | layTo | 1 |
| up | layUp | 2 |

## Content

**about**
1. To hit out in all directions; to attack violently. / "When the attackers approached, he began laying about him with a heavy stick."

**away**
1. To save money or goods for future use (often used in retail as "layaway"). / "The company lays away a portion of its quarterly profits for future software investments."

**by**
1. To save money for a specific future need (similar to lay away). / "She laid by some money every month to fund her new startup."

**down**
1. To officially establish a rule, policy, or principle. / "The management team laid down clear guidelines for remote work."
2. To surrender weapons; to stop fighting. / "The rebels finally agreed to lay down their arms."
3. To record music or audio. / "The band went into the studio to lay down a new track."
4. To store wine in a cellar for aging. / "We laid down several bottles of red wine to drink in ten years."

**for**
1. To wait secretly to attack someone; to ambush (old-fashioned/rare). / "The thieves were laying for the manager outside the bank."

**in**
1. To collect and store a large supply of something for future use. / "We need to lay in plenty of coffee before the development team starts the big sprint."

**into**
1. To criticize someone angrily or attack them physically. / "The lead developer laid into the junior programmer for pushing broken code to the main server."

**off**
1. To end a worker's employment, usually because the company has no work or no budget. / "The business had to lay off 20 employees due to the economic crisis."
2. To stop criticizing or bothering someone. / "Lay off him! He is doing the best he can to meet the deadline."
3. To stop using, consuming, or doing something for a while. / "I need to lay off the caffeine; I've been drinking too much coffee."

**on**
1. To provide or supply something, especially food, entertainment, or transport. / "The company laid on a massive buffet for the leadership conference."
2. To apply something very thickly (like paint) or to exaggerate something (like praise or guilt). / "Don't lay on the praise too thick, or it will sound insincere."

**out**
1. To explain a plan or idea clearly and in detail. / "The CEO laid out the new business strategy during the meeting."
2. To arrange things so they can be easily seen or used. / "The designer laid out the new Java application interface on the screen."
3. To spend a large amount of money. / "We laid out thousands of dollars on the new server infrastructure."
4. To knock someone unconscious. / "One punch was enough to lay him out."

**over**
1. To stop somewhere temporarily during a long journey (this creates the noun "layover"). / "I had to lay over in Frankfurt for six hours before my connecting flight to New York."

**to**
1. (Nautical) To bring a ship to a standstill while facing the wind. / "The captain decided to lay to until the storm passed."

**up**
1. To be forced to stay in bed because of illness or injury (usually used in the passive: "laid up"). / "Our project manager is laid up with the flu and won't be in the office this week."
2. To take something out of active use and store it (often applied to ships, cars, or machinery). / "The old hardware was laid up in the storage room."

## Files to create / modify

- `src/pages/lay/LayVerbPage.tsx` — new page (13 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `LAY_PARTICLES` constant + VERBS entry (alphabetical)
- `src/main.tsx` — import + register route `/phrasal-verbs/list/lay`
- `src/data/listVerbIndex.ts` — import laySections + add `buildEntries` call
- `src/__tests__/lay_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/lay_verb_page/*.test.tsx` — 13 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Lay card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/carry/CarryVerbPage.tsx` (TASK-14)
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `layOff_section_expanded`)
- VERBS entry for Lay goes after Knock (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 #1 `src/pages/lay/LayVerbPage.tsx` created with 13 sections, all meanings, all using default.png
- [x] #2 #2 LAY_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 13 particles
- [x] #3 #3 VERBS entry added for Lay in alphabetical position in PhrasalVerbsListPage.tsx
- [x] #4 #4 Route `/phrasal-verbs/list/lay` registered in src/main.tsx
- [x] #5 #5 laySections added to listVerbIndex.ts search index
- [x] #6 #6 13 test files created under src/__tests__/lay_verb_page/ (one per particle)
- [x] #7 #7 PhrasalVerbsListPage.test.tsx extended with Lay card, subtitle, and copy-button describe blocks
- [x] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added Lay phrasal verb page with 13 sections and 23 meanings. Created LayVerbPage.tsx, 13 test files (one per particle: about, away, by, down, for, in, into, off, on, out, over, to, up), helpers.tsx, and updated PhrasalVerbsListPage.tsx, main.tsx, listVerbIndex.ts, and PhrasalVerbsListPage.test.tsx. All 13,000 tests pass (547 files).
<!-- SECTION:FINAL_SUMMARY:END -->
