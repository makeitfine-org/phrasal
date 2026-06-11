---
id: TASK-45
title: Add "Pull" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09 17:23'
updated_date: '2026-06-10 19:28'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 33000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Pull" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (20 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| about | pullAbout | 1 |
| ahead | pullAhead | 1 |
| against | pullAgainst | 2 |
| apart | pullApart | 3 |
| around / round | pullAround | 1 |
| away | pullAway | 3 |
| back | pullBack | 2 |
| down | pullDown | 3 |
| for | pullFor | 1 |
| forward | pullForward | 1 |
| in | pullIn | 4 |
| into | pullInto | 1 |
| off | pullOff | 3 |
| on | pullOn | 2 |
| out | pullOut | 4 |
| over | pullOver | 1 |
| through | pullThrough | 2 |
| to | pullTo | 1 |
| together | pullTogether | 3 |
| up | pullUp | 4 |

## Content

**about**
1. To treat someone or something roughly. / "The older children were pulling the little boy about, so the teacher intervened."

**ahead**
1. To take the lead in a race or competition. / "In the final months of the year, our software company finally pulled ahead of the competition."

**against**
1. To resist or oppose a force. / "The dog kept pulling against the leash."
2. To work in opposition to someone. / "The team will fail if half the members are pulling against the manager."

**apart**
1. To separate people or animals that are fighting. / "The referee had to pull the two players apart."
2. To criticize heavily to show the flaws in something. / "The manager pulled the marketing plan apart during the meeting."
3. To break or tear something into pieces. / "The child pulled the toy apart to see how it worked."

**around / round**
1. To recover from a serious illness or injury (mostly British English). / "He was very sick after the surgery, but the doctors say he will pull round."

**away**
1. To start moving (usually a vehicle). / "The train pulled away from the station exactly on time."
2. To move your body back from someone. / "She pulled away when he tried to grab her arm."
3. To increase your lead in a competition. / "In the second half of the race, the leading runner pulled away from the rest of the group."

**back**
1. To retreat or move backwards. / "The army was ordered to pull back from the city."
2. To decide not to do something you previously planned. / "The investors pulled back from the deal at the last minute because of financial risks."

**down**
1. To demolish or destroy a building. / "They are pulling down the old factory to build a new office block."
2. To make someone feel depressed or weak. / "The stress of the new project is really pulling him down."
3. To earn a specific amount of money (informal). / "As a senior Java developer, she pulls down a very high salary."

**for**
1. To support, hope, or cheer for someone's success. / "Good luck with your job interview tomorrow! We are all pulling for you."

**forward**
1. To move a vehicle slightly forward. / "Can you pull forward a little bit so I have room to park behind you?"

**in**
1. To arrive (usually for trains). / "The train from Warsaw is pulling in at platform 3."
2. To move a vehicle to the side of the road. / "I need to pull in at the next gas station."
3. To attract people or money. / "The new advertising campaign is pulling in a lot of new customers."
4. To arrest someone. / "The police pulled him in for questioning."

**into**
1. To arrive at a destination (for vehicles). / "The bus pulled into the station twenty minutes late."

**off**
1. To succeed in doing something very difficult or unexpected. / "No one thought we could finish the software update by Friday, but the team pulled it off."
2. To drive a vehicle off the main road. / "We pulled off the highway to find a place to eat."
3. To remove clothing quickly. / "He pulled off his boots and left them by the door."

**on**
1. To put on clothing quickly. / "She pulled on a sweater because it was getting cold."
2. To breathe in smoke from a cigarette or pipe. / "He pulled heavily on his cigar."

**out**
1. To move into traffic (for vehicles). / "A truck pulled out right in front of me, and I had to brake hard."
2. To leave a station (for trains). / "Our train was pulling out just as we arrived at the platform."
3. To withdraw from an agreement, deal, or situation. / "The sponsor pulled out of the project due to budget cuts."
4. To extract or remove something. / "He reached into his bag and pulled out a laptop."

**over**
1. To stop a vehicle by the side of the road. / "The police officer signaled for the driver to pull over."

**through**
1. To recover from a very serious illness or injury. / "It was a terrible accident, but the doctors are confident she will pull through."
2. To succeed in a very difficult situation. / "The economy was bad, but strong leadership helped the business pull through."

**to**
1. To close something, like a door or window, but often without locking it. / "Please pull the door to when you leave the office."

**together**
1. To work as a team to achieve something. / "If we all pull together, we can finish this development phase by the deadline."
2. To collect or organize information/things. / "I need an hour to pull together the data for the presentation."
3. To regain emotional control (often "pull yourself together"). / "You need to pull yourself together and focus on the task."

**up**
1. To slow down and stop a vehicle. / "A black taxi pulled up outside the building."
2. To bring information onto a computer screen. / "Give me a second to pull up your account on my system."
3. To correct or criticize someone for a mistake. / "The manager pulled him up on his constant lateness."
4. To move a piece of furniture closer. / "Pull up a chair and join our meeting."

## Files to create / modify

- `src/pages/pull/PullVerbPage.tsx` — new page (20 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `PULL_PARTICLES` constant + VERBS entry after 'point'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/pull`
- `src/data/listVerbIndex.ts` — import pullSections + add `buildEntries` call
- `src/__tests__/pull_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/pull_verb_page/*.test.tsx` — 20 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Pull card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `pullUp_section_expanded`)
- Compound particle `around / round` → storageKeyPrefix `pullAround`
- VERBS entry for Pull goes after Point (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 #1 `src/pages/pull/PullVerbPage.tsx` created with 20 sections, all meanings, all using default.png
- [x] #2 #2 PULL_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 20 particles
- [x] #3 #3 VERBS entry added for Pull after Point in PhrasalVerbsListPage.tsx
- [x] #4 #4 Route `/phrasal-verbs/list/pull` registered in src/main.tsx
- [x] #5 #5 pullSections added to listVerbIndex.ts search index
- [x] #6 #6 20 test files created under src/__tests__/pull_verb_page/ (one per particle)
- [x] #7 #7 PhrasalVerbsListPage.test.tsx extended with Pull card, subtitle, and copy-button describe blocks
- [x] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added Pull phrasal verb page with 20 sections (about, ahead, against, apart, around/round, away, back, down, for, forward, in, into, off, on, out, over, through, to, together, up) and 42 total meanings, all using default.png. Created 21 new test files (20 particle tests + helpers), updated PhrasalVerbsListPage, main.tsx, listVerbIndex.ts, and PhrasalVerbsListPage.test.tsx. All 15,214 tests pass (636 files). Committed as 034ebd2.
<!-- SECTION:FINAL_SUMMARY:END -->
