---
id: TASK-54
title: Add "Talk" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 42000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Talk" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (17 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| about | talkAbout | 1 |
| across | talkAcross | 1 |
| against | talkAgainst | 1 |
| around / round | talkAround | 2 |
| away | talkAway | 1 |
| back | talkBack | 1 |
| down | talkDown | 3 |
| for | talkFor | 1 |
| into | talkInto | 1 |
| on | talkOn | 1 |
| out | talkOut | 2 |
| over | talkOver | 2 |
| through | talkThrough | 2 |
| to | talkTo | 2 |
| together | talkTogether | 1 |
| up | talkUp | 1 |
| with | talkWith | 1 |

## Content

**about**
1. To discuss a specific topic, person, or idea. / "We need to talk about the new software update."

**across**
1. To speak at the same time as someone else, often in a confusing way where people are not listening to each other. / "The meeting was a mess because everyone was talking across each other."

**against**
1. To speak in opposition to an idea, plan, or person. / "Several managers talked against the proposed budget cuts."

**around / round**
1. To avoid speaking directly about the main issue. / "Stop talking around the problem and tell me what is wrong."
2. To persuade someone to agree with you or change their mind. / "He didn't want to join the project, but I finally talked him round."

**away**
1. To continue talking for a long time, often in a relaxed manner. / "We sat in the cafe, talking away for hours."

**back**
1. To reply rudely to someone in a position of authority (like a parent, teacher, or boss). / "The student was sent to the principal for talking back to his teacher."

**down**
1. To speak to someone as if they are less intelligent or less important than you (talk down to). / "A good leader never talks down to their team members."
2. To negotiate a lower price for something. / "The car was $5,000, but I talked the seller down to $4,500."
3. To guide an aircraft to a safe landing using radio instructions. / "The air traffic controller talked the pilot down safely."

**for**
1. To speak on behalf of someone else or a group. / "I can only talk for myself, not the whole department."

**into**
1. To persuade someone to do something they initially did not want to do. / "She talked me into taking the management course."

**on**
1. To continue talking, often for a long time or in a boring way. / "He talked on and on about his holiday."

**out**
1. To discuss a problem thoroughly until it is completely resolved. / "We had a disagreement, but we sat down and talked it out."
2. To persuade someone not to do something (talk out of). / "I talked him out of quitting his job."

**over**
1. To discuss a plan or problem carefully before making a decision. / "Let's talk over the contract before we sign it."
2. To speak louder than someone else to interrupt them. / "Please don't talk over me while I am presenting."

**through**
1. To explain a process or idea to someone step by step. / "Can you talk me through how to use this Java framework?"
2. To discuss a problem in detail to find a solution. / "We need to talk through these errors in the code."

**to**
1. To have a conversation with someone. / "I need to talk to the client tomorrow."
2. To reprimand or scold someone for doing something wrong. / "The manager had to talk to him about arriving late."

**together**
1. To converse with one another (literal meaning). / "The two developers talked together quietly in the corner."

**up**
1. To praise or promote something to make it sound very good or exciting. / "They are really talking up the new product launch."

**with**
1. To have a discussion with someone, often implying a more equal, two-way conversation. / "I enjoyed talking with you at the conference."

## Files to create / modify

- `src/pages/talk/TalkVerbPage.tsx` — new page (17 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `TALK_PARTICLES` constant + VERBS entry after 'stick'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/talk`
- `src/data/listVerbIndex.ts` — import talkSections + add `buildEntries` call
- `src/__tests__/talk_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/talk_verb_page/*.test.tsx` — 17 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Talk card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `talkOver_section_expanded`)
- Compound particle `around / round` → storageKeyPrefix `talkAround`
- VERBS entry for Talk goes after Stick (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `src/pages/talk/TalkVerbPage.tsx` created with 17 sections, all meanings, all using default.png
- [ ] #2 TALK_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 17 particles
- [ ] #3 VERBS entry added for Talk after Stick in PhrasalVerbsListPage.tsx
- [ ] #4 Route `/phrasal-verbs/list/talk` registered in src/main.tsx
- [ ] #5 talkSections added to listVerbIndex.ts search index
- [ ] #6 17 test files created under src/__tests__/talk_verb_page/ (one per particle)
- [ ] #7 PhrasalVerbsListPage.test.tsx extended with Talk card, subtitle, and copy-button describe blocks
- [ ] #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
