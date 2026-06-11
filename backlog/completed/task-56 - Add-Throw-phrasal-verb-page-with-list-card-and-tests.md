---
id: TASK-56
title: Add "Throw" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09'
updated_date: '2026-06-11 17:45'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 44000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Throw" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (12 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| about / around / round | throwAbout | 3 |
| away | throwAway | 3 |
| back | throwBack | 4 |
| down | throwDown | 2 |
| in | throwIn | 3 |
| into | throwInto | 2 |
| off | throwOff | 4 |
| on | throwOn | 1 |
| out | throwOut | 6 |
| over | throwOver | 2 |
| together | throwTogether | 2 |
| up | throwUp | 5 |

## Content

**about / around / round**
1. To scatter things untidily. / "Clothes and books were thrown about the messy room."
2. To discuss ideas or suggestions casually. / "We spent the afternoon throwing around some concepts for the new ad campaign."
3. To use power, money, or authority aggressively or recklessly (often "throw one's weight around"). / "As soon as he got promoted, he started throwing his weight around and demanding respect."

**away**
1. To discard as trash. / "Don't throw away that receipt; you might need it."
2. To waste or fail to make use of an opportunity or advantage. / "He had a great talent but threw it away by not practicing."
3. To speak casually or unintentionally (a "throwaway" comment). / "He threw away a comment about retiring next year, but nobody noticed."

**back**
1. To drink something quickly (usually alcohol). / "He threw back a shot of whiskey and left the bar."
2. To revert to or resemble an earlier time or type (often a noun: "throwback"). / "Her fashion style throws back to the 1980s."
3. To delay or impede progress. / "The bad weather threw back their construction schedule by two weeks."
4. To be forced to rely on something (often "throw back on"). / "When his business failed, he was thrown back on his savings."

**down**
1. To drop or push someone or something to the ground violently or abruptly. / "He threw down his pen in frustration and walked out."
2. To issue a challenge (often "throw down the gauntlet"). / "The opposing team threw down a challenge we couldn't ignore."

**in**
1. To include something extra for free with a purchase. / "If you buy the laptop today, we'll throw in a carrying case."
2. To interject or add a remark to a conversation. / "He threw in a joke to lighten the mood."
3. To surrender or give up (often "throw in the towel"). / "After three failed attempts to fix the engine, he finally threw in the towel."

**into**
1. To force a person, group, or place into a specific, usually negative, condition. / "The sudden power outage threw the entire city into chaos."
2. To engage enthusiastically in a task (usually "throw oneself into"). / "After the breakup, she threw herself into her work."

**off**
1. To remove quickly or carelessly (clothing). / "She threw off her heavy winter coat as soon as she entered the house."
2. To free oneself from something negative (illness, trouble, restraint). / "I can't seem to throw off this cold; I've had it for weeks."
3. To confuse, distract, or mislead someone. / "The unexpected question during the interview really threw me off."
4. To emit or radiate (heat, light, smell). / "That old radiator throws off a surprising amount of heat."

**on**
1. To put on quickly or hastily (clothing). / "I just threw on a pair of jeans and ran to the grocery store."

**out**
1. To discard or dispose of something as trash. / "It's time to throw out all these old magazines."
2. To evict or expel someone from a place. / "The bouncer threw them out of the club for fighting."
3. To reject or dismiss (a plan, idea, or legal case). / "The judge threw out the lawsuit due to a lack of evidence."
4. To emit or radiate (light, heat, smoke). / "The fireplace throws out a lot of warmth."
5. To offer an idea or suggestion for consideration. / "Let me just throw this idea out and see what you think."
6. To confuse someone or cause them to make a mistake (chiefly British). / "The loud music threw me out while I was trying to count the money."

**over**
1. To abandon, reject, or leave someone (especially a romantic partner). / "She threw him over for a wealthy businessman."
2. To abandon a plan or idea. / "We had to throw over our original strategy when the budget was cut."

**together**
1. To make, prepare, or assemble something quickly or hastily. / "I didn't have much time, so I just threw together a quick salad."
2. To force people to associate with each other due to circumstances. / "The blizzard threw the stranded passengers together for the night."

**up**
1. To vomit. / "The turbulent flight made him throw up."
2. To produce, reveal, or bring to light (ideas, problems, results). / "The data analysis threw up some very interesting anomalies."
3. To build or construct something hastily. / "They threw up a temporary fence to keep the dogs out."
4. To quit or abandon (a job or position) suddenly. / "She threw up her corporate career to travel the world."
5. To cause something (like dust or water) to rise into the air. / "The speeding truck threw up a massive cloud of dust."

## Files to create / modify

- `src/pages/throw/ThrowVerbPage.tsx` — new page (12 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `THROW_PARTICLES` constant + VERBS entry after 'think'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/throw`
- `src/data/listVerbIndex.ts` — import throwSections + add `buildEntries` call
- `src/__tests__/throw_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/throw_verb_page/*.test.tsx` — 12 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Throw card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `throwUp_section_expanded`)
- Compound particle `about / around / round` → storageKeyPrefix `throwAbout`
- VERBS entry for Throw goes after Think (alphabetical order)
- Sections sorted alphabetically by particle name
- Note: idiomatic uses of "throw for/with/after/behind/to" are fixed idioms, not phrasal verbs — do NOT include them as sections
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 `src/pages/throw/ThrowVerbPage.tsx` created with 12 sections, all meanings, all using default.png
- [x] #2 THROW_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 12 particles
- [x] #3 VERBS entry added for Throw after Think in PhrasalVerbsListPage.tsx
- [x] #4 Route `/phrasal-verbs/list/throw` registered in src/main.tsx
- [x] #5 throwSections added to listVerbIndex.ts search index
- [x] #6 12 test files created under src/__tests__/throw_verb_page/ (one per particle)
- [x] #7 PhrasalVerbsListPage.test.tsx extended with Throw card, subtitle, and copy-button describe blocks
- [x] #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
