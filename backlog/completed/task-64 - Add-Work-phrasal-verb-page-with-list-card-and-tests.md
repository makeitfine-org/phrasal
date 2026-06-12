---
id: TASK-64
title: Add "Work" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09'
updated_date: '2026-06-12 10:37'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 52000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Work" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (18 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| against | workAgainst | 1 |
| ahead | workAhead | 1 |
| around / round | workAround | 2 |
| away | workAway | 1 |
| back | workBack | 1 |
| down | workDown | 1 |
| for | workFor | 2 |
| in | workIn | 2 |
| into | workInto | 3 |
| off | workOff | 2 |
| on | workOn | 2 |
| out | workOut | 4 |
| over | workOver | 2 |
| through | workThrough | 2 |
| to | workTo | 1 |
| together | workTogether | 1 |
| up | workUp | 3 |
| with | workWith | 3 |

## Content

**against**
1. To make it harder for someone to succeed; to act as a disadvantage. / "His lack of formal experience might work against him in the interview."

**ahead**
1. To complete tasks before they are due or scheduled. / "Whenever I have free time, I try to work ahead on my assignments."

**around / round**
1. To find a way to bypass or overcome an obstacle without actually fixing the core issue (giving the noun: workaround). / "The software has a bug, but we found a way to work around it."
2. To schedule or arrange plans to accommodate someone else's constraints. / "Tell me when you are free, and I will work around your schedule."

**away**
1. To continue working hard and diligently for a sustained period. / "She was happily working away at her desk all afternoon."

**back**
1. To start from an end result or deadline and calculate backwards to determine when to begin. / "If the project is due on Friday, we need to work back to see when we must start."

**down**
1. To gradually reduce something or progress downwards systematically, often through a list or pile. / "I have a huge stack of files; I'm just going to start at the top and work down."

**for**
1. To be employed by a person or organization. / "I work for an IT consultancy firm."
2. To be suitable, convenient, or effective for someone's needs. / "Meeting at 10 AM doesn't work for me."

**in**
1. To make time or space for something or someone in a busy schedule. / "My schedule is packed, but I can work a quick meeting in at 3:00 PM."
2. To mix a substance into another substance thoroughly. / "Gently work in the butter until the dough is crumbly."

**into**
1. To successfully fit someone or something into a busy schedule. / "The dentist was able to work me into her schedule."
2. To blend or push one material into another. / "Work the lotion into your skin."
3. To gradually reach a certain emotional state, usually negative. / "He managed to work himself into a frenzy."

**off**
1. To eliminate something like stress, anger, or calories through physical activity. / "After a frustrating meeting, I went to the gym to work off my anger."
2. To repay a debt by providing labor or services instead of money. / "He couldn't afford the repairs, so he offered to work off the debt by painting the mechanic's house."

**on**
1. To spend time repairing, improving, or developing something. / "She is working on her pronunciation to sound more fluent."
2. To try to persuade or influence someone to do something. / "My manager doesn't want to approve the budget, but I'll work on him."

**out**
1. To exercise to improve physical fitness. / "I try to work out at the gym three times a week."
2. To solve a problem or calculate an answer. / "Let me just work out the total cost with taxes included."
3. To happen or develop in a particular, usually successful, way. / "I was worried about the relocation, but everything worked out perfectly."
4. To understand someone's character or a confusing situation. / "He is so mysterious; I just can't work him out."

**over**
1. To physically assault or beat someone up severely (informal). / "The gang threatened to work him over if he didn't pay."
2. To examine, treat, or revise something very thoroughly. / "The editors will work over the manuscript before publishing it."

**through**
1. To deal with, resolve, or overcome a complex problem or difficult emotion step by step. / "Couples counseling helped them work through their trust issues."
2. To read, process, or complete a large amount of material from beginning to end. / "It took me three hours to work through all the emails in my inbox."

**to**
1. To operate according to a specific schedule, rule, or constraint. / "We are working to a very tight deadline."

**together**
1. To collaborate or cooperate as a team. / "If we work together, we can finish this much faster."

**up**
1. To gradually develop or build something, often a feeling like an appetite, courage, or sweat. / "We went for a long hike and worked up a huge appetite."
2. To make oneself or someone else feel upset, excited, or anxious (often used in the passive: worked up). / "Don't get yourself all worked up over a minor mistake."
3. To gradually progress to something more advanced or demanding. / "Start with lighter weights and work up to the heavy ones."

**with**
1. To collaborate alongside someone. / "I love working with my new team."
2. To use something as a tool, material, or basis for a project. / "Wood is a beautiful material to work with."
3. To accommodate or adapt to a situation or constraint. / "We have a very tight budget, but we'll try to work with it."

## Files to create / modify

- `src/pages/work/WorkVerbPage.tsx` — new page (18 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `WORK_PARTICLES` constant + VERBS entry after 'wear'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/work`
- `src/data/listVerbIndex.ts` — import workSections + add `buildEntries` call
- `src/__tests__/work_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/work_verb_page/*.test.tsx` — 18 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Work card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `workOut_section_expanded`)
- Compound particle `around / round` → storageKeyPrefix `workAround`
- VERBS entry for Work goes after Wear (alphabetical order)
- Sections sorted alphabetically by particle name
- Note: cross/across, forward, without, apart, about, by, after/behind are NOT included — they are literal uses, not phrasal verbs
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `src/pages/work/WorkVerbPage.tsx` created with 18 sections, all meanings, all using default.png
- [ ] #2 WORK_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 18 particles
- [ ] #3 VERBS entry added for Work after Wear in PhrasalVerbsListPage.tsx
- [ ] #4 Route `/phrasal-verbs/list/work` registered in src/main.tsx
- [ ] #5 workSections added to listVerbIndex.ts search index
- [ ] #6 18 test files created under src/__tests__/work_verb_page/ (one per particle)
- [ ] #7 PhrasalVerbsListPage.test.tsx extended with Work card, subtitle, and copy-button describe blocks
- [ ] #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
