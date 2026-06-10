---
id: TASK-41
title: Add "Pass" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09 16:59'
updated_date: '2026-06-10 17:20'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 29000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Pass" phrasal verb entry following the same pattern as Call/Carry/Drop/Eat/Fall pages.

## Particles (14 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| away | passAway | 1 |
| by | passBy | 2 |
| down | passDown | 1 |
| for | passFor | 1 |
| in | passIn | 1 |
| into | passInto | 1 |
| off | passOff | 2 |
| on | passOn | 3 |
| out | passOut | 2 |
| over | passOver | 2 |
| through | passThrough | 2 |
| to | passTo | 1 |
| up | passUp | 1 |
| around / round / about | passAround | 1 |

## Content

**away**
1. To die (a polite and respectful phrase). / "The founder of the company passed away peacefully last year."

**by**
1. To go past a place or person. / "I pass by your office every morning on my way to get coffee."
2. To happen without affecting someone, or to miss an opportunity. / "We cannot let this great market opportunity pass us by."

**down**
1. To give knowledge, skills, or items to younger generations or junior members. / "The senior manager passed down her negotiation skills to the new team members."

**for**
1. To be accepted as something else, often despite not being it. / "His Java skills are so good that he could easily pass for a senior developer."

**in**
1. To give work to a teacher or manager (similar to "hand in"). / "Please remember to pass in your project reports by Friday afternoon."

**into**
1. To become part of something, usually history or legend. / "His successful software release passed into company history."

**off**
1. To falsely present someone or something as something else. / "He tried to pass off the copied code as his own original work."
2. To happen or take place in a certain way. / "The project launch passed off without any major problems."

**on**
1. To give information or an object to someone else. / "Please pass on this message to the development team."
2. To refuse an opportunity or offer. / "I think I will pass on the invitation to the conference."
3. To die (another polite phrase). / "Sadly, his grandfather passed on last week."

**out**
1. To distribute something to a group of people. / "Could you pass out these documents before the management meeting starts?"
2. To lose consciousness or faint. / "It was so hot in the server room that he almost passed out."

**over**
1. To ignore or not choose someone for a position or promotion. / "She was passed over for the leadership role, so she decided to leave the company."
2. To ignore a topic in a conversation. / "Let's pass over this minor detail and focus on the main strategy."

**through**
1. To travel or stop in a place for a very short time. / "I am just passing through Warsaw, so I only have time for a quick lunch."
2. To experience a phase or situation. / "The tech industry is passing through a difficult period right now."

**to**
1. To transfer ownership or responsibility to someone else. / "When the CEO retired, leadership passed to her deputy."

**up**
1. To fail to take advantage of an opportunity. / "You should not pass up the chance to lead this new team."

**around / round / about**
1. To offer or give something to every person in a group. / "They passed around the tablet so everyone could see the new app design."

## Files to create / modify

- `src/pages/pass/PassVerbPage.tsx` — new page (14 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `PASS_PARTICLES` constant + VERBS entry after 'mix'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/pass`
- `src/data/listVerbIndex.ts` — import passSections + add `buildEntries` call
- `src/__tests__/pass_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/pass_verb_page/*.test.tsx` — 14 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Pass card, subtitle, and copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fall/FallVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `passAway_section_expanded`)
- Compound particle `around / round / about` → storageKeyPrefix `passAround`, test file `around_round_about.test.tsx`
- VERBS entry for Pass goes after Mix (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 #1 `src/pages/pass/PassVerbPage.tsx` created with 14 sections, all meanings, all using default.png
- [x] #2 #2 PASS_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 14 particles
- [x] #3 #3 VERBS entry added for Pass after Mix in PhrasalVerbsListPage.tsx
- [x] #4 #4 Route `/phrasal-verbs/list/pass` registered in src/main.tsx
- [x] #5 #5 passSections added to listVerbIndex.ts search index
- [x] #6 #6 14 test files created under src/__tests__/pass_verb_page/ (one per particle)
- [x] #7 #7 PhrasalVerbsListPage.test.tsx extended with Pass card, subtitle, and copy-button describe blocks
- [x] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
