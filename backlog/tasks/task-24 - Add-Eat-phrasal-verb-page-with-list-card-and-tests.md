---
id: TASK-24
title: Add "Eat" phrasal verb page with list card and tests
status: In Progress
assignee: []
created_date: '2026-06-09 15:33'
updated_date: '2026-06-09 16:38'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 12000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Eat" phrasal verb entry following the same pattern as existing verb pages.

## Particles (10 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| up | eatUp | 5 |
| into | eatInto | 2 |
| away | eatAway | 2 |
| out | eatOut | 1 |
| in | eatIn | 1 |
| through | eatThrough | 2 |
| around / round | eatAround | 1 |
| on | eatOn | 1 |
| down | eatDown | 1 |
| off | eatOff | 1 |

## Content

**up**
1. To consume a meal or food completely. / "You need to eat up your vegetables before you can have dessert."
2. To consume a large amount of time, money, or resources. / "Heating this massive house eats up a large portion of my monthly salary."
3. To enjoy something greatly, or to eagerly believe something without questioning it. / "The politician told the crowd exactly what they wanted to hear, and they ate it up."
4. To consume someone emotionally with negative feelings like guilt or jealousy. / "Keeping the secret from her best friend was slowly eating her up inside."
5. To completely absorb, destroy, or defeat a competitor. / "The tech giant easily ate up the smaller startups in the area."

**into**
1. To use up a portion of a valuable reserve, especially money or time. / "The unexpected plumbing repairs really ate into our vacation savings."
2. To gradually damage or destroy a surface through chemical action or corrosion. / "Without a protective coating, the salty sea air will quickly eat into the metal."

**away**
1. To gradually destroy, erode, or consume something over time. / "Over thousands of years, the river slowly ate away the soft limestone."
2. To continuously bother, distress, or cause anxiety for someone (often used with "at"). / "The stress of the upcoming trial was eating away at him."

**out**
1. To eat a meal at a restaurant or café rather than cooking at home. / "I am far too exhausted to cook, so let's eat out tonight."

**in**
1. To eat a meal at home instead of going to a restaurant. / "We are trying to stick to a tight budget, so we plan to eat in this weekend."

**through**
1. To make a physical hole in something by biting, chewing, or corroding. / "During the winter, mice managed to eat through the drywall in the garage."
2. To exhaust or consume a massive supply of money or resources very rapidly. / "He ate through his entire inheritance in just three years of reckless spending."

**around / round**
1. To consume a meal while deliberately avoiding a specific ingredient on the plate. / "The child absolutely hated mushrooms and carefully ate around them."

**on**
1. To gradually consume a large amount of leftover food over an extended period. / "We cooked a massive turkey for the holiday and will just eat on it for the rest of the week."

**down**
1. To graze pasture or grass until it is very short or completely gone. / "The herd of sheep completely ate down the grass in the lower field."

**off**
1. To remove a layer or surface by eating, chewing, or chemical corrosion. / "The dog chewed the furniture so aggressively that he ate the varnish off."

## Files to create / modify

- `src/pages/eat/EatVerbPage.tsx` — new page (10 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `EAT_PARTICLES` constant + VERBS entry (alphabetical)
- `src/main.tsx` — import + register route `/phrasal-verbs/list/eat`
- `src/data/listVerbIndex.ts` — import eatSections + add `buildEntries` call
- `src/__tests__/eat_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/eat_verb_page/*.test.tsx` — 10 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Eat card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as existing verb pages (e.g. `src/pages/do/DoVerbPage.tsx`)
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `eatUp_section_expanded`)
- Compound particle `around / round` → storageKeyPrefix `eatAround`
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 #1 `src/pages/eat/EatVerbPage.tsx` created with 10 sections, all meanings, all using default.png
- [x] #2 #2 EAT_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 10 particles
- [x] #3 #3 VERBS entry added for Eat in alphabetical position in PhrasalVerbsListPage.tsx
- [x] #4 #4 Route `/phrasal-verbs/list/eat` registered in src/main.tsx
- [x] #5 #5 eatSections added to listVerbIndex.ts search index
- [x] #6 #6 10 test files created under src/__tests__/eat_verb_page/ (one per particle)
- [x] #7 #7 PhrasalVerbsListPage.test.tsx extended with Eat card, subtitle, and copy-button describe blocks
- [x] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
