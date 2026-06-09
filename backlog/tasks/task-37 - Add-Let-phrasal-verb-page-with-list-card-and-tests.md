---
id: TASK-37
title: Add "Let" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09 16:57'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 25000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Let" phrasal verb entry following the same pattern as Call/Carry/Drop/Eat/Fall pages.

## Particles (9 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| down | letDown | 3 |
| in | letIn | 2 |
| into | letInto | 2 |
| off | letOff | 3 |
| on | letOn | 2 |
| out | letOut | 4 |
| up | letUp | 2 |
| by | letBy | 1 |
| through | letThrough | 1 |

## Content

**down**
1. To disappoint someone by failing to do what you promised or what they expected. / "The manager promised a bonus, but she let the team down by canceling it."
2. To make clothing longer. / "My son has grown so much that I need to let down his trousers."
3. To allow air to escape from something (like a tire). / "Someone let down the tires on my car."

**in**
1. To allow someone or something to enter a place. / "Please open the door and let the client in."
2. To allow someone to share a secret or know about a special plan. / "The CEO let me in on the new business strategy before it was announced."

**into**
1. To allow someone to enter a room or building. / "The security guard let us into the server room."
2. To share a secret with someone. / "She let me into her plans for starting a new software company."

**off**
1. To not punish someone, or to give them a very light punishment. / "The boss let him off with a warning for being late to the meeting."
2. To make a bomb explode, or to fire a gun or firework. / "The children let off fireworks in the park to celebrate."
3. To excuse someone from a duty or obligation. / "My manager let me off early today so I could go to the doctor."

**on**
1. To reveal a secret or show that you know something. / "We are planning a surprise party, so please don't let on."
2. To pretend. / "He let on that he was an expert in Java, but he actually knew very little."

**out**
1. To allow a person or animal to leave a place. / "Someone left the gate open and let the dogs out."
2. To make clothing wider. / "I gained a few kilos on holiday, so I need to let out this suit."
3. To suddenly make a sound. / "She let out a sigh of relief when the code finally compiled."
4. When a class, school, or meeting finishes and people can leave. / "The leadership seminar lets out at 4:00 PM."

**up**
1. To stop or become less severe (usually referring to bad weather or a difficult situation). / "The heavy workload hasn't let up since we started this new project."
2. To stop working as hard as you were before. / "We are close to the deadline, so we can't let up now."

**by**
1. To move aside to allow someone or something to pass you. / "Please step aside and let the paramedics by."

**through**
1. To allow someone or something to pass a barrier, a security check, or a test. / "The firewall is strictly configured and will not let unauthorized traffic through."

## Files to create / modify

- `src/pages/let/LetVerbPage.tsx` — new page (9 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `LET_PARTICLES` constant + VERBS entry after 'leave'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/let`
- `src/data/listVerbIndex.ts` — import letSections + add `buildEntries` call
- `src/__tests__/let_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/let_verb_page/*.test.tsx` — 9 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Let card, subtitle, and copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fall/FallVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `letDown_section_expanded`)
- VERBS entry for Let goes after Leave (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 #1 `src/pages/let/LetVerbPage.tsx` created with 9 sections, all meanings, all using default.png
- [ ] #2 #2 LET_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 9 particles
- [ ] #3 #3 VERBS entry added for Let after Leave in PhrasalVerbsListPage.tsx
- [ ] #4 #4 Route `/phrasal-verbs/list/let` registered in src/main.tsx
- [ ] #5 #5 letSections added to listVerbIndex.ts search index
- [ ] #6 #6 9 test files created under src/__tests__/let_verb_page/ (one per particle)
- [ ] #7 #7 PhrasalVerbsListPage.test.tsx extended with Let card, subtitle, and copy-button describe blocks
- [ ] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
