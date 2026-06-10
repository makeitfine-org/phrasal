---
id: TASK-40
title: Add "Mix" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09 16:58'
updated_date: '2026-06-10 16:56'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 28000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Mix" phrasal verb entry following the same pattern as Call/Carry/Drop/Eat/Fall pages.

## Particles (5 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| up | mixUp | 4 |
| in / into | mixIn | 2 |
| with | mixWith | 2 |
| together | mixTogether | 1 |
| down | mixDown | 1 |

## Content

**up**
1. To confuse two things or people by thinking that one person or thing is another because they are similar. / "I always mix up the two brothers because they look exactly the same."
2. To make a mixture by combining different ingredients. / "Give me a few minutes, and I will mix up some pancake batter for breakfast."
3. To do something differently to make it more interesting and less boring ("mix it up"). / "We usually have our team meetings on Mondays, but let's mix it up and meet on Friday this week."
4. To be connected to or involved in something illegal, dishonest, or complicated ("be mixed up in"). / "The manager was fired when the company discovered he was mixed up in financial fraud."

**in / into**
1. To put a new substance into an existing mixture and stir it. / "Add the sugar to the bowl and mix it in slowly."
2. To join a group of people and interact with them naturally. / "The new employee tried to mix in with the rest of the team during the lunch break."

**with**
1. To spend time talking to different people, usually at a social event or at work. / "A good leader needs to be able to mix with people from all departments."
2. To put two or more substances together. / "Oil does not mix with water."

**together**
1. To blend two or more items so that they become a single substance or group. / "In software development, you cannot easily mix together two completely different programming architectures."

**down**
1. In audio engineering and music production, to combine multiple individual sound tracks into one final stereo or mono track. / "After recording the vocals and instruments, the sound engineer will mix down the project."

## Files to create / modify

- `src/pages/mix/MixVerbPage.tsx` — new page (5 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `MIX_PARTICLES` constant + VERBS entry after 'look'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/mix`
- `src/data/listVerbIndex.ts` — import mixSections + add `buildEntries` call
- `src/__tests__/mix_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/mix_verb_page/*.test.tsx` — 5 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Mix card, subtitle, and copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fall/FallVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `mixUp_section_expanded`)
- Compound particle `in / into` → storageKeyPrefix `mixIn`, test file `in_into.test.tsx`
- VERBS entry for Mix goes after Look (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 #1 `src/pages/mix/MixVerbPage.tsx` created with 5 sections, all meanings, all using default.png
- [x] #2 #2 MIX_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 5 particles
- [x] #3 #3 VERBS entry added for Mix after Look in PhrasalVerbsListPage.tsx
- [x] #4 #4 Route `/phrasal-verbs/list/mix` registered in src/main.tsx
- [x] #5 #5 mixSections added to listVerbIndex.ts search index
- [x] #6 #6 5 test files created under src/__tests__/mix_verb_page/ (one per particle)
- [x] #7 #7 PhrasalVerbsListPage.test.tsx extended with Mix card, subtitle, and copy-button describe blocks
- [x] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
