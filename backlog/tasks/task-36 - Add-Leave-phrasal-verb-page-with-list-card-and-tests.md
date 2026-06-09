---
id: TASK-36
title: Add "Leave" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09 16:57'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 24000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Leave" phrasal verb entry following the same pattern as Call/Carry/Drop/Eat/Fall pages.

## Particles (12 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| about / around | leaveAbout | 1 |
| back | leaveBack | 1 |
| behind | leaveBehind | 3 |
| for | leaveFor | 1 |
| in | leaveIn | 1 |
| off | leaveOff | 2 |
| on | leaveOn | 2 |
| out | leaveOut | 2 |
| over | leaveOver | 1 |
| to | leaveTo | 2 |
| up (to) | leaveUp | 2 |
| with | leaveWith | 1 |

## Content

**about / around**
1. To put things in random places in an untidy way, making a mess. / "Please don't leave your dirty clothes around the house."

**back**
1. To make a student repeat a school year because their grades were too low (mainly used in US English). / "He failed his math and science exams, so the school left him back a year."

**behind**
1. To forget to take someone or something with you when you depart. / "I accidentally left my umbrella behind at the coffee shop."
2. To permanently move on from a situation, place, or person. / "She moved to a new city to leave her difficult past behind."
3. To progress much faster than competitors, making them look slow or outdated. / "The software company left its competitors behind by releasing a revolutionary new app."

**for**
1. To begin a journey with a specific destination in mind. / "We need to pack our bags because we leave for London early tomorrow morning."

**in**
1. To not remove something; to let it stay where it is. / "The editor decided to leave that paragraph in the final article."

**off**
1. To stop doing something. / "Let's start the meeting exactly where we left off yesterday."
2. To purposefully or accidentally exclude someone or something from a list. / "I think there is a mistake; my name was left off the guest list."

**on**
1. To let a machine, device, or light continue working. / "Don't leave the TV on when you go to sleep."
2. To continue wearing a piece of clothing. / "It's cold in the office, so I will leave my jacket on."

**out**
1. To not include someone or something. / "You can leave out the last exercise; it is optional."
2. To make a person feel excluded from a group or activity. / "She felt left out when her colleagues went to lunch without her."

**over**
1. To have a portion of something remaining after the rest has been used or eaten (almost always used in the passive as "left over"). / "We have a lot of pizza left over from the project launch party."

**to**
1. To give someone else the responsibility or authority to handle a task. / "I don't know how to fix this server error; I'll leave it to the IT department."
2. To give money or property to someone in a will after passing away. / "The CEO left his entire estate to charity."

**up (to)**
1. To let someone else make a decision or choose an option. / "We can eat pizza or sushi for lunch; I will leave it up to you."
2. To let a physical object or decoration remain hanging. / "We usually leave our holiday decorations up until the middle of January."

**with**
1. To give an object to someone so they can keep it safe or take care of it temporarily. / "Can I leave my heavy bags with you while I quickly run to the store?"

## Files to create / modify

- `src/pages/leave/LeaveVerbPage.tsx` — new page (12 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `LEAVE_PARTICLES` constant + VERBS entry after 'lay'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/leave`
- `src/data/listVerbIndex.ts` — import leaveSections + add `buildEntries` call
- `src/__tests__/leave_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/leave_verb_page/*.test.tsx` — 12 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Leave card, subtitle, and copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fall/FallVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `leaveOff_section_expanded`)
- Compound particle `about / around` → storageKeyPrefix `leaveAbout`
- Particle `up (to)` → storageKeyPrefix `leaveUp`, test file `up_to.test.tsx`
- VERBS entry for Leave goes after Lay (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 #1 `src/pages/leave/LeaveVerbPage.tsx` created with 12 sections, all meanings, all using default.png
- [ ] #2 #2 LEAVE_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 12 particles
- [ ] #3 #3 VERBS entry added for Leave after Lay in PhrasalVerbsListPage.tsx
- [ ] #4 #4 Route `/phrasal-verbs/list/leave` registered in src/main.tsx
- [ ] #5 #5 leaveSections added to listVerbIndex.ts search index
- [ ] #6 #6 12 test files created under src/__tests__/leave_verb_page/ (one per particle)
- [ ] #7 #7 PhrasalVerbsListPage.test.tsx extended with Leave card, subtitle, and copy-button describe blocks
- [ ] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
