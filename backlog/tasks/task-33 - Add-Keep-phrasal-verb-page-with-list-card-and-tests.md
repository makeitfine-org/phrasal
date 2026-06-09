---
id: TASK-33
title: Add "Keep" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09 15:59'
updated_date: '2026-06-09 16:02'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 21000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Keep" phrasal verb entry following the same pattern as Call/Carry pages.

## Particles (16 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| about / around / round | keepAbout | 2 |
| across | keepAcross | 1 |
| after | keepAfter | 1 |
| ahead | keepAhead | 1 |
| apart | keepApart | 2 |
| away | keepAway | 2 |
| back | keepBack | 3 |
| behind | keepBehind | 2 |
| down | keepDown | 4 |
| in | keepIn | 3 |
| off | keepOff | 4 |
| on | keepOn | 4 |
| out | keepOut | 2 |
| to | keepTo | 4 |
| together | keepTogether | 2 |
| up | keepUp | 4 |

## Content

**about / around / round**
1. To keep something near you because it might be useful. / "I always keep a pen around just in case I need to take notes."
2. To continue to associate with someone or let them stay in a group/company. / "He isn't very productive, so I don't know why they keep him around."

**across**
1. To stay informed about a situation or topic (mainly British English). / "As a project manager, I need to keep across all the software updates."

**after**
1. To repeatedly remind or nag someone to do something (mainly US English). / "I have to keep after my team to submit their timesheets on Friday."

**ahead**
1. To stay in front of others or stay more advanced than competitors. / "To succeed in business, you must innovate to keep ahead of your rivals."

**apart**
1. To prevent people, animals, or things from coming together. / "The two dogs were fighting, so we had to keep them apart."
2. To stay away from each other. / "The two rival teams were told to keep apart before the match."

**away**
1. To avoid going near something or someone. / "You should keep away from that dog; it looks aggressive."
2. To prevent someone or something from going near. / "Keep the children away from the hot stove."

**back**
1. To stay at a safe distance, or make someone stay back. / "The police told the crowd to keep back from the accident."
2. To hide information; to not tell someone everything you know. / "I feel like the client is keeping something back from us."
3. To stop yourself from showing an emotion (like crying). / "She struggled to keep back her tears during the sad movie."

**behind**
1. To stay in a place after everyone else has left. / "I kept behind after the meeting to ask the speaker a question."
2. To make someone stay after others have left. / "The manager kept me behind to discuss my performance."

**down**
1. To stop the number, level, or size of something from increasing. / "We need to keep our expenses down this quarter."
2. To manage to keep food or medicine in your stomach (not vomit). / "He was so sick that he couldn't keep any water down."
3. To stay hidden by crouching or lying flat. / "Keep down! I don't want anyone to see us."
4. To prevent a person or group of people from having power or freedom. / "The corrupt government tried to keep the citizens down."

**in**
1. To make someone (usually a child) stay inside as a punishment. / "The teacher kept him in after school because he didn't do his homework."
2. To control or hide an emotion. / "She was very angry but managed to keep her feelings in."
3. To prevent a fire from dying out. / "Add some more wood to keep the fire in."

**off**
1. To avoid touching or walking on something. / "Please keep off the grass while the park is being maintained."
2. To avoid mentioning or discussing a specific topic. / "Let's keep off the subject of politics during the meeting."
3. To prevent something from touching or harming something else. / "Use this spray to keep the bugs off your plants."
4. To avoid eating, drinking, or using something. / "I am trying to keep off sugar to improve my health."

**on**
1. To continue doing something. / "Even though the project was difficult, the team kept on working."
2. To continue to employ someone. / "The company decided to keep him on as a consultant after he retired."
3. To leave a piece of clothing on your body. / "It's cold in here, so I will keep my jacket on."
4. To repeatedly remind or complain to someone (keep on at someone). / "My manager keeps on at me to finish the financial report."

**out**
1. To not enter a place, or to stop someone/something from entering. / "There is a sign on the door that says 'Danger: Keep Out.'"
2. To stay away from a problem, argument, or situation. / "This is a private argument, so please keep out of it."

**to**
1. To follow a plan, rule, or agreement. / "We have a tight deadline, so let's keep to the schedule."
2. To limit something to a certain amount. / "Please keep your presentation to ten minutes."
3. To stay on a particular path or road. / "When hiking in the forest, always keep to the marked trail."
4. To avoid talking to other people; to stay private (keep to oneself). / "He is very shy and mostly keeps to himself at the office."

**together**
1. To stay in a group and not separate. / "We need to keep together so we don't get lost in the city."
2. To not break apart or fall to pieces. / "I hope my old laptop keeps together until I can buy a new one."

**up**
1. To move at the same speed as someone or something else. / "The software industry changes so fast that it's hard to keep up."
2. To continue doing something at a high level. / "You are doing a great job — keep up the good work!"
3. To stay awake, or to prevent someone from sleeping. / "My neighbor's loud music kept me up all night."
4. To maintain something in good condition. / "It costs a lot of money to keep up such a large office building."

## Files to create / modify

- `src/pages/keep/KeepVerbPage.tsx` — new page (16 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `KEEP_PARTICLES` constant + VERBS entry (alphabetical)
- `src/main.tsx` — import + register route `/phrasal-verbs/list/keep`
- `src/data/listVerbIndex.ts` — import keepSections + add `buildEntries` call
- `src/__tests__/keep_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/keep_verb_page/*.test.tsx` — 16 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Keep card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/carry/CarryVerbPage.tsx` (TASK-14)
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `keepUp_section_expanded`)
- Compound particle `about / around / round` → storageKeyPrefix `keepAbout`
- VERBS entry for Keep goes after Hold (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 #1 `src/pages/keep/KeepVerbPage.tsx` created with 16 sections, all meanings, all using default.png
- [ ] #2 #2 KEEP_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 16 particles
- [ ] #3 #3 VERBS entry added for Keep in alphabetical position in PhrasalVerbsListPage.tsx
- [ ] #4 #4 Route `/phrasal-verbs/list/keep` registered in src/main.tsx
- [ ] #5 #5 keepSections added to listVerbIndex.ts search index
- [ ] #6 #6 16 test files created under src/__tests__/keep_verb_page/ (one per particle)
- [ ] #7 #7 PhrasalVerbsListPage.test.tsx extended with Keep card, subtitle, and copy-button describe blocks
- [ ] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
