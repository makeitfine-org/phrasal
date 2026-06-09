---
id: TASK-66
title: Add "Zip" phrasal verb page with list card and tests
status: To Do
assignee: []
created_date: '2026-06-09'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 54000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Zip" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (18 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| about / around / round | zipAbout | 1 |
| across | zipAcross | 1 |
| ahead | zipAhead | 1 |
| apart | zipApart | 1 |
| away | zipAway | 1 |
| back | zipBack | 1 |
| by | zipBy | 2 |
| down | zipDown | 2 |
| in | zipIn | 2 |
| into | zipInto | 2 |
| off | zipOff | 2 |
| on | zipOn | 1 |
| out | zipOut | 2 |
| over | zipOver | 1 |
| through | zipThrough | 2 |
| to | zipTo | 1 |
| together | zipTogether | 1 |
| up | zipUp | 2 |

## Content

**about / around / round**
1. To move quickly and energetically from one place to another within an area. / "She spent the entire Saturday zipping around town running errands."

**across**
1. To travel very rapidly from one side of a space, surface, or area to the other. / "The speedboat zipped across the lake in under a minute."

**ahead**
1. To advance quickly, often leaving others behind or moving to the front of a line or progression. / "He zipped ahead of the rest of the runners in the final lap."

**apart**
1. To separate two pieces of fabric or material by opening a zipper that connects them. / "These convertible hiking pants zip apart at the knee to become shorts."

**away**
1. To depart or move away very rapidly. / "As soon as the light turned green, the sports car zipped away."

**back**
1. To return to a place very quickly for a short duration. / "I just need to zip back to the office to grab my laptop."

**by**
1. To physically pass someone or something very quickly. / "A cyclist zipped by me on the trail and nearly startled me."
2. Of time: to pass very quickly. / "The summer holidays just seemed to zip by this year."

**down**
1. To unfasten a zipper by moving it in a downward direction. / "He zipped down his jacket because the sun came out."
2. To travel quickly down a path, road, or digital page. / "Let me just zip down to the bottom of this document to check the signature line."

**in**
1. To arrive or enter a place very quickly. / "I'll zip in and grab a coffee before the meeting starts."
2. To attach an inner lining to a larger garment using a zipper. / "You can zip in the fleece lining to make the raincoat suitable for winter."

**into**
1. To put on a piece of clothing rapidly. / "She zipped into her wetsuit and ran toward the ocean."
2. To maneuver a vehicle or oneself into a space quickly. / "He zipped into the parking spot right before the other driver could take it."

**off**
1. To leave or depart quickly in a hurry. / "I have to zip off to a dentist appointment now, but I'll call you later."
2. To detach a removable part of a garment using a zipper. / "He zipped off the sleeves of his jacket when it got too hot."

**on**
1. To attach a piece of fabric or a removable garment part using a zipper. / "If it starts raining, you can just zip on the hood."

**out**
1. To go outside or leave a place for a very brief, quick errand. / "I'm going to zip out to the grocery store for some milk; I'll be back in ten minutes."
2. To remove an inner lining from a garment by unzipping it. / "Make sure you zip out the thermal layer before you put the coat in the washing machine."

**over**
1. To travel quickly to a nearby location, often someone's home or office. / "I'll zip over to your place after work to drop off the tools you lent me."

**through**
1. To do, read, or complete a task very quickly and with ease. / "She zipped through the exam in half the allotted time."
2. To travel through a place without stopping, or to navigate a physical space rapidly. / "We bypassed the traffic and zipped through the city centre."

**to**
1. To move rapidly to a specific destination or state. / "Zip to the end of the video to see the surprise reveal."

**together**
1. To connect two separate items using their interlocking zippers. / "We zipped together our two sleeping bags to make one large bed for the camping trip."

**up**
1. To close a garment, bag, or tent completely by fastening its zipper. / "Make sure you zip up your coat; it's freezing outside!"
2. To be quiet or stop talking (slang/idiomatic, often commanded as zip it). / "I told him to zip up before his complaining got us into more trouble."

## Files to create / modify

- `src/pages/zip/ZipVerbPage.tsx` — new page (18 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `ZIP_PARTICLES` constant + VERBS entry after 'write'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/zip`
- `src/data/listVerbIndex.ts` — import zipSections + add `buildEntries` call
- `src/__tests__/zip_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/zip_verb_page/*.test.tsx` — 18 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Zip card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `zipUp_section_expanded`)
- Compound particle `about / around / round` → storageKeyPrefix `zipAbout`
- VERBS entry for Zip goes after Write (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 `src/pages/zip/ZipVerbPage.tsx` created with 18 sections, all meanings, all using default.png
- [ ] #2 ZIP_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 18 particles
- [ ] #3 VERBS entry added for Zip after Write in PhrasalVerbsListPage.tsx
- [ ] #4 Route `/phrasal-verbs/list/zip` registered in src/main.tsx
- [ ] #5 zipSections added to listVerbIndex.ts search index
- [ ] #6 18 test files created under src/__tests__/zip_verb_page/ (one per particle)
- [ ] #7 PhrasalVerbsListPage.test.tsx extended with Zip card, subtitle, and copy-button describe blocks
- [ ] #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
