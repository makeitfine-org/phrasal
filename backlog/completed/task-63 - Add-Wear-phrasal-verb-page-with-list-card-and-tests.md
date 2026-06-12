---
id: TASK-63
title: Add "Wear" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09'
updated_date: '2026-06-12 10:16'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 51000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Wear" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (7 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| away | wearAway | 1 |
| down | wearDown | 2 |
| in | wearIn | 1 |
| off | wearOff | 1 |
| on | wearOn | 2 |
| out | wearOut | 2 |
| through | wearThrough | 1 |

## Content

**away**
1. To erode or cause something to gradually disappear, thin, or become smooth through continuous friction, use, or weather. / "Years of salty sea breezes have worn away the bright paint on the older coastal buildings."

**down**
1. To overcome someone's resistance, opposition, or reluctance through persistent pressure. / "The developer initially wanted a much higher salary, but the long negotiation process eventually wore them down."
2. To reduce the size, thickness, or effectiveness of something by continuous friction or prolonged use. / "The treads on the 20-inch bicycle tires were completely worn down from a summer of heavy riding."

**in**
1. To wear new clothing, especially stiff shoes or boots, until they conform to your body and become comfortable to use. / "I need to walk around the apartment for a few days to wear in these new shoes before we do any serious walking."

**off**
1. To gradually disappear, fade, or stop having an effect, usually referring to a feeling, a drug's effect, or a novelty. / "The excitement of moving to a new country can start to wear off once the heavy paperwork begins."

**on**
1. Of time or an event: to pass, especially when it feels slow, tedious, or prolonged. / "As the technical interview wore on, it became clear the applicant didn't actually have the required Java experience."
2. To gradually annoy, irritate, or exhaust someone's patience over time. / "The constant noise from the street below started to wear on Sam as the afternoon progressed."

**out**
1. To use something until it is damaged, broken, or completely useless. / "I've practically worn out my laptop's keyboard from typing so many outreach messages."
2. To make someone extremely physically or mentally tired; to exhaust. / "Coordinating two young children's daily schedules while managing full-time work can really wear you out."

**through**
1. To create a hole in something as a result of continuous use, friction, or rubbing. / "She leaned on her desk so much that she completely wore through the elbows of her favourite sweater."

## Files to create / modify

- `src/pages/wear/WearVerbPage.tsx` — new page (7 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `WEAR_PARTICLES` constant + VERBS entry after 'watch'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/wear`
- `src/data/listVerbIndex.ts` — import wearSections + add `buildEntries` call
- `src/__tests__/wear_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/wear_verb_page/*.test.tsx` — 7 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Wear card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `wearOff_section_expanded`)
- VERBS entry for Wear goes after Watch (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 `src/pages/wear/WearVerbPage.tsx` created with 7 sections, all meanings, all using default.png
- [x] #2 WEAR_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 7 particles
- [x] #3 VERBS entry added for Wear after Watch in PhrasalVerbsListPage.tsx
- [x] #4 Route `/phrasal-verbs/list/wear` registered in src/main.tsx
- [x] #5 wearSections added to listVerbIndex.ts search index
- [x] #6 7 test files created under src/__tests__/wear_verb_page/ (one per particle)
- [x] #7 PhrasalVerbsListPage.test.tsx extended with Wear card, subtitle, and copy-button describe blocks
- [x] #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
