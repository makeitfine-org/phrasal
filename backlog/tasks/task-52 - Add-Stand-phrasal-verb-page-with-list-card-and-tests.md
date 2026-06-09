---
id: TASK-52
title: Add "Stand" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 40000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Stand" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (19 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| about / around | standAbout | 1 |
| against | standAgainst | 1 |
| apart | standApart | 2 |
| away | standAway | 1 |
| back | standBack | 2 |
| behind | standBehind | 1 |
| by | standBy | 4 |
| down | standDown | 2 |
| for | standFor | 3 |
| in | standIn | 1 |
| into | standInto | 1 |
| off | standOff | 1 |
| on | standOn | 2 |
| out | standOut | 3 |
| over | standOver | 2 |
| to | standTo | 2 |
| together | standTogether | 1 |
| up | standUp | 3 |
| with | standWith | 1 |

## Content

**about / around**
1. To spend time in a place doing nothing or waiting. / "We were just standing around waiting for the meeting to start."

**against**
1. To oppose or fight against someone or something. / "The team leader stood against the new policy because it was bad for productivity."

**apart**
1. To be separate or isolated from others. / "The two servers stand apart in the data center for security reasons."
2. To be noticeably different or better than others. / "Her excellent management skills make her stand apart from the other candidates."

**away**
1. To move backwards or keep a distance from something (mostly literal). / "Please stand away from the servers while they are restarting."

**back**
1. To move a short distance away or backwards. / "The firefighters told everyone to stand back."
2. To view a situation objectively, from a wider perspective. / "Sometimes a manager needs to stand back and look at the whole project before making a decision."

**behind**
1. To support someone or guarantee the quality of something. / "We stand behind the quality of our Java software products."

**by**
1. To be ready for action. / "The IT support team is standing by to fix the network issue."
2. To remain loyal to someone in a difficult situation. / "A good leader stands by their team during a crisis."
3. To adhere to a promise, decision, or belief. / "I stand by my decision to hire him for the development team."
4. To watch something bad happen without trying to help. / "I cannot simply stand by while the project fails."

**down**
1. To resign or leave a position of leadership. / "The CEO agreed to stand down after ten years in charge."
2. To relax from a state of military or security readiness. / "The security team was told to stand down after the false alarm."

**for**
1. To represent a word or idea (for abbreviations). / "In software development, API stands for Application Programming Interface."
2. To tolerate or accept (usually used in the negative). / "The boss will not stand for poor communication."
3. To support a cause or principle. / "Our company stands for equality and respect."

**in**
1. To temporarily replace or substitute for someone who is absent (often "stand in for"). / "I will stand in for the manager while she is on a business trip."

**into**
1. To sail or move toward danger (rare, old nautical term). / "The ship was standing into the storm."

**off**
1. To keep at a distance, or to keep someone away. / "The police managed to stand off the angry crowd."

**on**
1. To insist on strict rules or formalities. / "We don't need to stand on ceremony; just call me by my first name."
2. To rely on or be based on. / "My argument stands on solid financial data."

**out**
1. To be very easy to see or notice. / "The red button stands out against the dark background of the app."
2. To be much better than others. / "As a Java developer, his coding skills really stand out."
3. To stubbornly resist or hold out for a better offer. / "The union is standing out for a higher salary."

**over**
1. To watch someone closely, often in an intimidating or annoying way. / "I can't write code well if the boss is standing over me."
2. To be postponed or delayed to a later time. / "This agenda item can stand over until our next meeting."

**to**
1. To take up defensive positions (military). / "The soldiers were ordered to stand to."
2. To be in a position where you are likely to gain or lose something. / "The company stands to gain a lot of money from this new software contract."

**together**
1. To remain united and support each other. / "The team must stand together during this difficult transition period."

**up**
1. To rise to your feet. / "Please stand up when the clients enter the room."
2. To remain valid, true, or strong when tested. / "This new software architecture will stand up to heavy user traffic."
3. To fail to keep an appointment or date with someone. / "The contractor stood me up for our 10:00 AM meeting."

**with**
1. To express solidarity or support for someone. / "We stand with our colleagues in the overseas office during their difficult time."

## Files to create / modify

- `src/pages/stand/StandVerbPage.tsx` — new page (19 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `STAND_PARTICLES` constant + VERBS entry after 'sit'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/stand`
- `src/data/listVerbIndex.ts` — import standSections + add `buildEntries` call
- `src/__tests__/stand_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/stand_verb_page/*.test.tsx` — 19 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Stand card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `standBy_section_expanded`)
- Compound particle `about / around` → storageKeyPrefix `standAbout`
- VERBS entry for Stand goes after Sit (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `src/pages/stand/StandVerbPage.tsx` created with 19 sections, all meanings, all using default.png
- [ ] #2 STAND_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 19 particles
- [ ] #3 VERBS entry added for Stand after Sit in PhrasalVerbsListPage.tsx
- [ ] #4 Route `/phrasal-verbs/list/stand` registered in src/main.tsx
- [ ] #5 standSections added to listVerbIndex.ts search index
- [ ] #6 19 test files created under src/__tests__/stand_verb_page/ (one per particle)
- [ ] #7 PhrasalVerbsListPage.test.tsx extended with Stand card, subtitle, and copy-button describe blocks
- [ ] #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
