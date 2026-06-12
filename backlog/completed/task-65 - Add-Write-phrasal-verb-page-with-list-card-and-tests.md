---
id: TASK-65
title: Add "Write" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09'
updated_date: '2026-06-12 10:53'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 53000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Write" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (16 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| about | writeAbout | 1 |
| against | writeAgainst | 2 |
| around / round | writeAround | 2 |
| away | writeAway | 2 |
| back | writeBack | 1 |
| down | writeDown | 3 |
| for | writeFor | 2 |
| in | writeIn | 3 |
| into | writeInto | 1 |
| off | writeOff | 5 |
| on | writeOn | 2 |
| out | writeOut | 3 |
| over | writeOver | 1 |
| through | writeThrough | 1 |
| to | writeTo | 2 |
| up | writeUp | 4 |

## Content

**about**
1. To discuss a particular subject in writing. / "I want to write about the impact of artificial intelligence on the job market."

**against**
1. To write essays, articles, or books opposing a specific idea, policy, or person. / "He spent his later years writing against the dangers of censorship."
2. To deduct an expense from a specific account or budget (finance). / "We will write the cost of the software against this quarter's IT budget."

**around / round**
1. To intentionally avoid addressing the main point or a difficult topic in a text. / "The biography is frustrating because the author writes around the politician's well-known scandals."
2. To circulate a memo or letter to a group of people (British: write round). / "I'll write round to the committee members to see who is available."

**away**
1. To send a letter requesting something (synonymous with write off for). / "When I was a kid, I used to write away for x-ray glasses I saw in comic books."
2. To write continuously and diligently. / "I left her at her desk, just writing away at her novel."

**back**
1. To reply to someone's letter, email, or message. / "I sent him an email last week, but he still hasn't written back."

**down**
1. To record something on paper so it is not forgotten. / "Please write down my phone number before you lose it."
2. To reduce the estimated or nominal value of an asset (finance). / "The company had to write down its inventory due to the sudden drop in market prices."
3. To write in a condescendingly simple way (usually write down to). / "A good children's author never writes down to their audience."

**for**
1. To be employed by or submit writing to a specific publication. / "She writes for several major technology magazines."
2. To request something by mail. / "You can write for a free copy of the catalog."

**in**
1. To send a letter or email to an organization or television station to express an opinion. / "Hundreds of viewers wrote in to complain about the controversial episode."
2. To cast a vote for a candidate whose name is not on the official ballot by writing their name. / "Because she missed the deadline to get on the ballot, her supporters had to write her in."
3. To insert text into a document or form. / "Please write in your name and address at the top of the page."

**into**
1. To formally include a specific clause, rule, or condition in a contract or script. / "We made sure to write a penalty clause into the agreement to protect our investment."

**off**
1. To cancel a bad debt or accept a financial loss. / "The bank decided to write off the unpaid loan."
2. To decide that someone or something is useless, unimportant, or a failure. / "He had a bad first semester, but don't write him off just yet; he is improving."
3. To damage a vehicle so badly that it cannot be repaired (British/Commonwealth). / "She lost control on the ice and completely wrote off her car."
4. To deduct an expense to reduce taxable income. / "You can write off the cost of your home office on your taxes."
5. To send a letter requesting something (often write off for). / "I wrote off for a free sample of the new moisturizer."

**on**
1. To write about a specific topic or subject (formal/academic). / "Professor Smith writes primarily on medieval European history."
2. To continue writing despite distractions or obstacles. / "Despite the noise in the cafe, she just put her headphones in and wrote on."

**out**
1. To write something completely in full rather than using abbreviations or numbers. / "You need to write out the numbers one through ten, but you can use digits for 11 and up."
2. To remove a character from a television series by not including them in future scripts. / "When the actor decided to leave the show, the writers wrote him out by having his character move to Paris."
3. To fill in all the necessary details on a document such as a check or prescription. / "The doctor wrote out a prescription for antibiotics."

**over**
1. To replace old computer data with new data; to overwrite. / "Be careful when saving the document, or you might write over yesterday's work."

**through**
1. To revise a piece of writing completely from beginning to end (journalism/editing). / "The editor told the reporter to write through the draft to make the narrative flow better."

**to**
1. To send a written message or letter to a specific person or entity. / "I write to my grandmother at least once a month."
2. To target a piece of writing toward a specific demographic. / "It's hard to write to a teenage audience without sounding inauthentic."

**up**
1. To produce a formal, complete written document based on notes or a draft. / "Give me an hour to write up the minutes from our meeting."
2. To officially record someone's poor performance or rule violation in a disciplinary file. / "The manager wrote him up for arriving late three days in a row."
3. To publish a review or article praising someone or something. / "The local newspaper wrote up the new restaurant in their weekend edition."
4. To artificially increase the recorded, nominal value of an asset (finance). / "The corporation wrote up the value of its real estate portfolio."

## Files to create / modify

- `src/pages/write/WriteVerbPage.tsx` — new page (16 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `WRITE_PARTICLES` constant + VERBS entry after 'work'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/write`
- `src/data/listVerbIndex.ts` — import writeSections + add `buildEntries` call
- `src/__tests__/write_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/write_verb_page/*.test.tsx` — 16 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Write card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `writeOff_section_expanded`)
- Compound particle `around / round` → storageKeyPrefix `writeAround`
- VERBS entry for Write goes after Work (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `src/pages/write/WriteVerbPage.tsx` created with 16 sections, all meanings, all using default.png
- [ ] #2 WRITE_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 16 particles
- [ ] #3 VERBS entry added for Write after Work in PhrasalVerbsListPage.tsx
- [ ] #4 Route `/phrasal-verbs/list/write` registered in src/main.tsx
- [ ] #5 writeSections added to listVerbIndex.ts search index
- [ ] #6 16 test files created under src/__tests__/write_verb_page/ (one per particle)
- [ ] #7 PhrasalVerbsListPage.test.tsx extended with Write card, subtitle, and copy-button describe blocks
- [ ] #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
