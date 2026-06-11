---
id: TASK-55
title: Add "Think" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09'
updated_date: '2026-06-11 17:32'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 43000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Think" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (11 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| about | thinkAbout | 3 |
| ahead | thinkAhead | 1 |
| around / round | thinkAround | 1 |
| back | thinkBack | 1 |
| for | thinkFor | 1 |
| on | thinkOn | 2 |
| out | thinkOut | 1 |
| over | thinkOver | 1 |
| through | thinkThrough | 1 |
| to | thinkTo | 2 |
| up | thinkUp | 1 |

## Content

**about**
1. To consider a person, thing, or idea — to spend time examining an idea or focusing your mind on someone or something. / "Give me a few days to think about your proposal."
2. To hold a specific view or belief regarding a topic. / "What do you think about the new company policy?"
3. To recall a memory or picture something in your mind. / "It makes me sad to think about how much time we wasted."

**ahead**
1. To consider what might happen in the future so that you are prepared. / "Good managers always think ahead to avoid potential problems."

**around / round**
1. To consider a situation or problem from every possible perspective in order to find a solution. / "The team needs to think around this issue to find a creative fix."

**back**
1. To focus your mind on events that have already happened. / "When I think back to my first job, I realize how much I have learned."

**for**
1. To form your own opinions and make your own choices, rather than letting others decide for you (think for yourself). / "A good leader encourages their team to think for themselves."

**on**
1. To spend time considering something — similar to "think about," meaning to reflect on a decision or idea. / "It is a strong offer, but I need to think on it for a few days."
2. To keep in mind or remember (mainly British/informal). / "You should think on what I told you before you make a mistake."

**out**
1. To plan something completely and carefully from start to finish. / "We need to think out our strategy before the client meeting."

**over**
1. To take time to reflect on a suggestion, offer, or problem before making a final decision. / "Take the weekend to think over the job offer."

**through**
1. To carefully consider every step, detail, and possible result of a plan or action before doing it. / "You should think through the consequences before you quit your job."

**to**
1. To remember to do something (usually used in the negative). / "I was so busy that I didn't think to call my clients to update them."
2. To expect or imagine that a specific situation is possible. / "Who would have thought to see you here today?"

**up**
1. To use your imagination to create a plan, an idea, or an excuse. / "The developers thought up a brilliant solution to the software bug."

## Files to create / modify

- `src/pages/think/ThinkVerbPage.tsx` — new page (11 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `THINK_PARTICLES` constant + VERBS entry after 'talk'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/think`
- `src/data/listVerbIndex.ts` — import thinkSections + add `buildEntries` call
- `src/__tests__/think_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/think_verb_page/*.test.tsx` — 11 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Think card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `thinkAbout_section_expanded`)
- Compound particle `around / round` → storageKeyPrefix `thinkAround`
- VERBS entry for Think goes after Talk (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 `src/pages/think/ThinkVerbPage.tsx` created with 11 sections, all meanings, all using default.png
- [x] #2 THINK_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 11 particles
- [x] #3 VERBS entry added for Think after Talk in PhrasalVerbsListPage.tsx
- [x] #4 Route `/phrasal-verbs/list/think` registered in src/main.tsx
- [x] #5 thinkSections added to listVerbIndex.ts search index
- [x] #6 11 test files created under src/__tests__/think_verb_page/ (one per particle)
- [x] #7 PhrasalVerbsListPage.test.tsx extended with Think card, subtitle, and copy-button describe blocks
- [x] #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
