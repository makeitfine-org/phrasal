---
id: TASK-13
title: Add "Call" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09 10:59'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Call" phrasal verb entry following the same pattern as Blow/Brush/Build pages.

## Particles (21 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| off | callOff | 2 |
| on / upon | callOn | 3 |
| up | callUp | 4 |
| down | callDown | 2 |
| in | callIn | 3 |
| into | callInto | 2 |
| out | callOut | 3 |
| away | callAway | 1 |
| across | callAcross | 1 |
| forward | callForward | 1 |
| back | callBack | 2 |
| for | callFor | 3 |
| by | callBy | 1 |
| together | callTogether | 1 |
| over | callOver | 2 |
| ahead | callAhead | 1 |
| after | callAfter | 2 |
| through | callThrough | 1 |
| about | callAbout | 1 |
| around / round | callAround | 2 |
| to | callTo | 1 |

## Content

**off**
1. To cancel an event, meeting, or agreement that was planned. / "We had to call off the project meeting because the lead developer was sick."
2. To order a person or animal to stop attacking or searching. / "The manager told the legal team to call off their aggressive negotiations."

**on / upon**
1. To ask someone formally to speak or do something. / "I would like to call on our CEO to say a few words."
2. To use a quality, skill, or resource that you have. / "The team had to call on all their experience to fix the critical bug."
3. To visit someone for a short time (often formally). / "We will call on the new client tomorrow morning."

**up**
1. To telephone someone. / "I will call up the software vendor to ask about the pricing."
2. To find and show information on a computer screen. / "Can you call up the latest sales data on your monitor?"
3. To officially order someone to join the military. / "His grandfather was called up during the war."
4. To make someone remember something. / "The old office building called up memories of my first job."

**down**
1. To shout to someone who is on a lower level than you. / "She called down from the second floor to ask if the package had arrived."
2. To request negative consequences or punishment upon someone (formal/literary). / "He called down curses on his rivals."

**in**
1. To ask an expert or specialist to come and help with a problem. / "The system crashed, so we had to call in an external IT consultant."
2. To telephone your office or a radio/TV show. / "Two team members called in sick today."
3. To demand that people return a product because it is broken or dangerous (a recall). / "The manufacturer called in thousands of laptops due to battery issues."

**into**
1. To call into question means to make people doubt something (idiom). / "The recent security breach called into question the software's reliability."
2. To summon someone into a room. / "The manager called him into the office for a performance review."

**out**
1. To publicly criticize someone for doing something wrong. / "The leader called out the team member for unprofessional behavior."
2. To ask a professional to come for an emergency. / "We had to call out an engineer in the middle of the night."
3. To speak loudly so someone can hear you. / "The manager called out my name across the warehouse."

**away**
1. To ask someone to leave the place where they are to go somewhere else, usually for an emergency. / "The director was called away to an urgent meeting."

**across**
1. To shout to someone on the other side of a room, street, or space. / "He called across the open-plan office to ask for the password."

**forward**
1. To ask someone to step to the front of a group. / "The CEO called the project manager forward to receive an award."

**back**
1. To return a telephone call. / "I am in a meeting, can I call you back in an hour?"
2. To ask someone to return for a second job interview. / "They liked her portfolio and called her back for a final interview."

**for**
1. To demand or require a specific action or quality. / "Managing a large team calls for great communication skills."
2. To publicly ask for something to happen. / "The users are calling for better privacy features in the app."
3. To go to a place to pick someone or something up. / "I will call for you at the hotel at 8:00 AM."

**by**
1. To make a short, informal visit to a place while going somewhere else. / "I'll call by the IT department on my way to lunch to drop off the broken mouse."

**together**
1. To formally ask a group of people to meet in one place. / "We need to call the board of directors together to discuss the merger."

**over**
1. To ask someone to come to where you are standing. / "I called the junior developer over to look at my screen."
2. To read aloud a list of names to check who is present (mostly British English). / "The trainer called over the names before the workshop started."

**ahead**
1. To telephone a place before you arrive there (often to make a reservation or check something). / "We should call ahead to ensure the conference room is available."

**after**
1. To shout to someone as they are walking away from you. / "I called after him, but he had already entered the elevator."
2. To give a child the same name as someone else. / "He was called after his grandfather."

**through**
1. To connect a phone call to someone else. / "The receptionist called me through to the HR director."

**about**
1. To make a phone call concerning a specific topic. / "I am calling about the open software engineering position."

**around / round**
1. To telephone several different people or companies, usually to get information or compare prices. / "I will call around to find a better price for our cloud hosting."
2. To visit someone's house casually. / "Feel free to call round after work for a coffee."

**to**
1. To shout in order to get someone's attention. / "She called to the cab driver to stop."

## Files to create / modify

- `src/pages/call/CallVerbPage.tsx` — new page (21 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `CALL_PARTICLES` constant + VERBS entry after 'build'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/call`
- `src/data/listVerbIndex.ts` — import callSections + add `buildEntries` call
- `src/__tests__/call_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/call_verb_page/*.test.tsx` — 21 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Call card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/blow/BlowVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `callOff_section_expanded`)
- `.gitignore` does NOT need exceptions — "call" is not a blocked directory name
- Compound particle `on / upon` → storageKeyPrefix `callOn`
- Compound particle `around / round` → storageKeyPrefix `callAround`
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `src/pages/call/CallVerbPage.tsx` created with 21 sections, all meanings, all using default.png
- [ ] #2 CALL_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 21 particles
- [ ] #3 VERBS entry added for Call after Build in PhrasalVerbsListPage.tsx
- [ ] #4 Route `/phrasal-verbs/list/call` registered in src/main.tsx
- [ ] #5 callSections added to listVerbIndex.ts search index
- [ ] #6 21 test files created under src/__tests__/call_verb_page/ (one per particle)
- [ ] #7 PhrasalVerbsListPage.test.tsx extended with Call card, subtitle, and copy-button describe blocks
- [ ] #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
