---
id: TASK-58
title: Add "Turn" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09'
updated_date: '2026-06-11 20:14'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 46000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Turn" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (14 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| about | turnAbout | 1 |
| against | turnAgainst | 2 |
| around / round | turnAround | 3 |
| away | turnAway | 2 |
| back | turnBack | 3 |
| down | turnDown | 3 |
| in | turnIn | 4 |
| into | turnInto | 2 |
| off | turnOff | 3 |
| on | turnOn | 4 |
| out | turnOut | 5 |
| over | turnOver | 5 |
| to | turnTo | 3 |
| up | turnUp | 4 |

## Content

**about**
1. To physically turn to face the opposite direction. / "The soldier turned about and marched away."

**against**
1. To suddenly become hostile toward someone or something. / "The public turned against the mayor after the scandal broke."
2. To cause someone to be hostile toward another person. / "She tried to turn the team against their new manager."

**around / round**
1. To change direction and face the opposite way. / "Turn around and look at the camera."
2. To dramatically improve a bad situation or make a failing business successful. / "The new CEO managed to turn the struggling company around in just two years."
3. To complete a piece of work or fulfill a request within a specific timeframe. / "We can turn this project around by Friday afternoon."

**away**
1. To refuse someone entry or admittance. / "The bouncer turned us away because the club was at full capacity."
2. To look in a different direction, often out of disgust, shame, or lack of interest. / "The movie scene was so gruesome that I had to turn away."

**back**
1. To return the way you came, usually because of a problem. / "The snowstorm was so heavy that we had to turn back."
2. To reverse a process or return to a previous state. / "We've come too far to turn back the clock now."
3. To fold back a cover or page. / "Turn back the first page to see the dedication."

**down**
1. To decrease the volume, heat, or power of a device. / "Please turn down the music; it's too loud."
2. To reject or refuse an offer, request, or person. / "She turned down the job offer because the salary was too low."
3. To fold down the covers of a bed in preparation for sleep. / "The hotel staff turned down the bed while we were at dinner."

**in**
1. To submit an assignment, report, or document. / "Don't forget to turn in your paperwork by the end of the day."
2. To go to bed (informal). / "I'm exhausted; I think I'll turn in early tonight."
3. To surrender to the authorities or police. / "The fugitive finally turned himself in after a week on the run."
4. To produce a particular amount or degree of something (like a performance). / "The team turned in an outstanding performance during the final match."

**into**
1. To transform or change into something completely different. / "The caterpillar turned into a beautiful butterfly."
2. To direct a vehicle into a specific space or road. / "He turned into the driveway and parked the car."

**off**
1. To stop a machine, device, or flow of power. / "Remember to turn off the lights when you leave the room."
2. To cause someone to lose interest, enthusiasm, or sexual arousal. / "His arrogance is a massive turn-off for me."
3. To leave a road or path to go onto another. / "We need to turn off the highway at the next exit."

**on**
1. To start a machine, device, or flow of power. / "Can you turn on the air conditioning?"
2. To suddenly and unexpectedly attack someone, physically or verbally. / "The previously friendly dog suddenly turned on the stranger."
3. To cause someone to feel excited or sexually aroused. / "Confidence is a trait that really turns people on."
4. To depend or hinge entirely on a specific detail. / "The entire legal case turns on the forensic evidence."

**out**
1. To end up or result in a particular way. / "Despite the rain, the outdoor party turned out to be a great success."
2. To attend an event or gather as a crowd. / "A massive crowd turned out for the free concert in the park."
3. To extinguish a light. / "Turn out the lights before you go to sleep."
4. To produce or manufacture something. / "That factory turns out over five hundred cars a day."
5. To empty one's pockets or a receptacle. / "The security guard asked him to turn out his pockets."

**over**
1. To flip something so the other side faces up. / "If your pancakes are bubbling, it's time to turn them over."
2. To transfer control, responsibility, or possession to someone else. / "He turned the business over to his daughter when he retired."
3. To start an engine (referring to the mechanical rotation). / "The battery was dead, so the engine wouldn't even turn over."
4. To generate a specific amount of revenue in a business. / "The retail store turns over a million dollars annually."
5. To think about a concept or idea carefully. / "She turned the idea over in her mind before giving an answer."

**to**
1. To go to someone or something for help, advice, or comfort. / "When I have a problem, I always turn to my best friend."
2. To start doing a particular activity or habit, often a negative one, to cope with stress. / "He turned to drinking after he lost his job."
3. To direct your attention to a new topic or to a specific page. / "Let's turn to page 42 in the textbook."

**up**
1. To increase the volume, heat, or power of a device. / "Can you turn up the radio? I love this song."
2. To appear unexpectedly or arrive, sometimes late. / "He turned up at the party completely uninvited."
3. To be found, usually by accident, after being lost. / "Don't worry, your missing keys will turn up eventually."
4. To shorten a garment by folding the hem upward. / "I bought these trousers, but they are too long and need to be turned up."

## Files to create / modify

- `src/pages/turn/TurnVerbPage.tsx` — new page (14 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `TURN_PARTICLES` constant + VERBS entry after 'try'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/turn`
- `src/data/listVerbIndex.ts` — import turnSections + add `buildEntries` call
- `src/__tests__/turn_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/turn_verb_page/*.test.tsx` — 14 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Turn card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `turnUp_section_expanded`)
- Compound particle `around / round` → storageKeyPrefix `turnAround`
- VERBS entry for Turn goes after Try (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 `src/pages/turn/TurnVerbPage.tsx` created with 14 sections, all meanings, all using default.png
- [x] #2 TURN_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 14 particles
- [x] #3 VERBS entry added for Turn after Try in PhrasalVerbsListPage.tsx
- [x] #4 Route `/phrasal-verbs/list/turn` registered in src/main.tsx
- [x] #5 turnSections added to listVerbIndex.ts search index
- [x] #6 14 test files created under src/__tests__/turn_verb_page/ (one per particle)
- [x] #7 PhrasalVerbsListPage.test.tsx extended with Turn card, subtitle, and copy-button describe blocks
- [x] #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
