---
id: TASK-32
title: Add "Hold" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09 15:59'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 20000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Hold" phrasal verb entry following the same pattern as Call/Carry pages.

## Particles (12 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| against | holdAgainst | 1 |
| back | holdBack | 3 |
| down | holdDown | 3 |
| in | holdIn | 2 |
| off | holdOff | 2 |
| on | holdOn | 3 |
| out | holdOut | 4 |
| over | holdOver | 2 |
| to | holdTo | 2 |
| together | holdTogether | 2 |
| up | holdUp | 4 |
| with | holdWith | 1 |

## Content

**against**
1. To let a past mistake or negative action influence your opinion of someone; to hold a grudge. / "The developer made a major error in the code, but the manager did not hold it against him during his performance review."

**back**
1. To hesitate to act or speak. / "We need all your ideas for this project, so please do not hold back in the meeting."
2. To stop something from moving forward, developing, or succeeding. / "The team is highly skilled, but outdated legacy software is holding them back."
3. To keep information a secret. / "I suspect the client is holding back some details about their budget."

**down**
1. To manage to keep a job for a period of time. / "It requires excellent leadership skills to hold down a management position in such a fast-paced company."
2. To keep costs, prices, or numbers at a low level. / "We need to hold down our server costs this quarter to remain profitable."
3. To physically prevent someone or something from moving. / "The wind was so strong that we had to hold down the equipment."

**in**
1. To hide or control your emotions. / "The CEO was furious about the delayed release, but she managed to hold in her anger."
2. To pull your stomach inwards. / "He held his stomach in to look better in the photograph."

**off**
1. To delay doing something. / "We decided to hold off on deploying the new Java application until the testing phase was 100% complete."
2. To stop an opponent or competitor from defeating you. / "The company managed to hold off its main competitors by launching a superior product."

**on**
1. To wait for a short time (often used on the phone). / "Could you hold on a minute while I check the project schedule?"
2. To survive in a difficult or dangerous situation. / "The startup held on through the economic crisis and eventually became a market leader."
3. To grip something tightly. / "Hold on to the handrail so you do not fall on the stairs."

**out**
1. To continue to defend yourself or survive in a difficult situation. / "The team held out against the pressure from the clients and delivered high-quality work."
2. To offer a possibility, chance, or hope. / "The new business strategy holds out hope for a better financial year."
3. To extend a part of your body (like a hand) or an object. / "She held out her hand to welcome the new employee."
4. To wait and refuse to accept anything less than what you want (hold out for). / "The senior developer is holding out for a higher salary before signing the contract."

**over**
1. To postpone or delay an event or discussion until a later time. / "We do not have enough time today, so we will hold over the architecture discussion until tomorrow's meeting."
2. To allow someone to stay in a job or position longer than originally planned. / "The outgoing director was held over for three months to help train the new leadership team."

**to**
1. To make someone keep a promise or follow a standard. / "We agreed to deliver the software by Friday, and the client will hold us to that deadline."
2. To continue to believe an idea or follow a plan, even when it is difficult. / "We must hold to our original business plan if we want to see long-term results."

**together**
1. To remain united or to keep a group united. / "A strong manager knows how to hold a team together during stressful project sprints."
2. To remain intact and not break into pieces. / "The old database system is barely holding together; we need to replace it soon."

**up**
1. To delay someone or something. / "A critical bug in the code is holding up the entire product release."
2. To remain strong, successful, or true when tested. / "Their argument sounded good at first, but it did not hold up under close examination."
3. To support the weight of something. / "These concrete pillars hold up the entire roof of the building."
4. To rob a bank, shop, or person using violence or a weapon. / "The thieves tried to hold up the security van."

**with**
1. To approve of an idea or activity (almost always used in the negative). / "I do not hold with micromanaging experienced developers; they work better with independence."

## Files to create / modify

- `src/pages/hold/HoldVerbPage.tsx` — new page (12 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `HOLD_PARTICLES` constant + VERBS entry (alphabetical)
- `src/main.tsx` — import + register route `/phrasal-verbs/list/hold`
- `src/data/listVerbIndex.ts` — import holdSections + add `buildEntries` call
- `src/__tests__/hold_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/hold_verb_page/*.test.tsx` — 12 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Hold card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/carry/CarryVerbPage.tsx` (TASK-14)
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `holdUp_section_expanded`)
- VERBS entry for Hold goes after Hang (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 #1 `src/pages/hold/HoldVerbPage.tsx` created with 12 sections, all meanings, all using default.png
- [ ] #2 #2 HOLD_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 12 particles
- [ ] #3 #3 VERBS entry added for Hold in alphabetical position in PhrasalVerbsListPage.tsx
- [ ] #4 #4 Route `/phrasal-verbs/list/hold` registered in src/main.tsx
- [ ] #5 #5 holdSections added to listVerbIndex.ts search index
- [ ] #6 #6 12 test files created under src/__tests__/hold_verb_page/ (one per particle)
- [ ] #7 #7 PhrasalVerbsListPage.test.tsx extended with Hold card, subtitle, and copy-button describe blocks
- [ ] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
