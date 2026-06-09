---
id: TASK-47
title: Add "Set" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09 17:24'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 35000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Set" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (14 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| about | setAbout | 1 |
| against | setAgainst | 2 |
| ahead | setAhead | 1 |
| apart | setApart | 2 |
| back | setBack | 2 |
| by | setBy | 1 |
| down | setDown | 3 |
| in | setIn | 1 |
| off | setOff | 4 |
| on | setOn | 2 |
| out | setOut | 3 |
| over | setOver | 1 |
| to | setTo | 1 |
| up | setUp | 4 |

## Content

**about**
1. To start doing something that needs a lot of time and energy. / "The team immediately set about rewriting the legacy Java code."

**against**
1. To make people or groups oppose or hate each other. / "Poor leadership set the development team against the testing team."
2. To balance one thing against another (often used in finance). / "You can set the cost of the new servers against your tax bill."

**ahead**
1. To change the time on a clock to a later time. / "Don't forget to set your clocks ahead by one hour this weekend."

**apart**
1. To make someone or something different and better than others. / "Her excellent leadership skills set her apart from other managers."
2. To keep time or space for a special purpose. / "We set apart two hours on Friday afternoons for code reviews."

**back**
1. To delay the progress of a project or plan. / "A critical bug in the database set the project back by three weeks."
2. To cost someone a large amount of money (informal). / "Buying those enterprise software licenses will set us back a lot of money."

**by**
1. To save money or things for the future. / "The company has a budget set by for emergency server repairs."

**down**
1. To write something on paper so there is an official record. / "The new coding standards are set down in the employee handbook."
2. To state officially how something must be done (to make a rule). / "The CEO set down strict rules for working remotely."
3. To stop a vehicle to let a passenger get out. / "The taxi driver set him down right in front of the office building."

**in**
1. To begin and seem likely to continue for a long time (usually used for negative situations, feelings, or bad weather). / "Panic set in when the main production server crashed."

**off**
1. To start a journey. / "They set off for the tech conference in Berlin at 8:00 AM."
2. To cause an alarm to ring or a bomb to explode. / "The faulty sensor set off the fire alarm in the data center."
3. To cause a series of events to happen. / "The manager's email set off a wave of complaints."
4. To make someone start laughing or crying. / "The presenter's joke set the whole room off."

**on**
1. To attack someone, or to make an animal attack someone. / "The security guards set their dogs on the intruders."
2. To be very determined to do something (used passively as "be set on"). / "The lead architect is set on using microservices for this project."

**out**
1. To begin an activity with a specific goal in mind. / "We set out to build the fastest application on the market."
2. To explain ideas, facts, or plans clearly in writing or speaking. / "The project manager set out the timeline during the sprint planning meeting."
3. To start a journey (similar to "set off"). / "She set out for the client's office early in the morning."

**over**
1. To give someone authority or power over someone else. / "She was set over the entire IT department after the reorganization."

**to**
1. To start working or doing something with a lot of energy and determination. / "The developers set to and fixed all the major bugs before the deadline."

**up**
1. To start a new business or organization. / "They set up a successful software company five years ago."
2. To arrange or plan a meeting or event. / "I will set up a video call with the stakeholders for tomorrow."
3. To prepare equipment or software so it is ready to use. / "The IT support team is coming to set up your new Java development environment."
4. To trick someone in order to make them look guilty of a crime or mistake. / "He didn't leak the company data; he was set up by a rival."

## Files to create / modify

- `src/pages/set/SetVerbPage.tsx` — new page (14 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `SET_PARTICLES` constant + VERBS entry after 'run'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/set`
- `src/data/listVerbIndex.ts` — import setSections + add `buildEntries` call
- `src/__tests__/set_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/set_verb_page/*.test.tsx` — 14 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Set card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `setOff_section_expanded`)
- VERBS entry for Set goes after Run (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 #1 `src/pages/set/SetVerbPage.tsx` created with 14 sections, all meanings, all using default.png
- [ ] #2 #2 SET_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 14 particles
- [ ] #3 #3 VERBS entry added for Set after Run in PhrasalVerbsListPage.tsx
- [ ] #4 #4 Route `/phrasal-verbs/list/set` registered in src/main.tsx
- [ ] #5 #5 setSections added to listVerbIndex.ts search index
- [ ] #6 #6 14 test files created under src/__tests__/set_verb_page/ (one per particle)
- [ ] #7 #7 PhrasalVerbsListPage.test.tsx extended with Set card, subtitle, and copy-button describe blocks
- [ ] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
