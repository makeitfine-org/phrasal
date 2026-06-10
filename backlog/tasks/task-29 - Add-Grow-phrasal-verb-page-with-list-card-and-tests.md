---
id: TASK-29
title: Add "Grow" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09 15:58'
updated_date: '2026-06-09 21:53'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 17000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Grow" phrasal verb entry following the same pattern as Call/Carry pages.

## Particles (12 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| apart | growApart | 1 |
| away | growAway | 1 |
| back | growBack | 1 |
| in | growIn | 1 |
| into | growInto | 3 |
| on | growOn | 1 |
| out / out of | growOut | 4 |
| over | growOver | 1 |
| to | growTo | 1 |
| together | growTogether | 2 |
| up | growUp | 3 |
| with | growWith | 1 |

## Content

**apart**
1. To gradually become less close in a relationship over time. / "The co-founders grew apart over the years and eventually split the business."

**away**
1. To gradually become less connected to someone or something, or to stop supporting a past habit or idea. / "As the startup expanded, we naturally grew away from our original, informal working style."

**back**
1. To grow again after being cut, broken, or damaged (usually referring to plants or hair). / "We had to cut down the tree, but the branches are starting to grow back."

**in**
1. To fill an empty space by growing (often used for hair or plants). / "We planted new seeds in the garden, and the grass is finally growing in."

**into**
1. To develop the skills and confidence needed for a new role or responsibility. / "It was a big promotion, but she quickly grew into her position as a team leader."
2. To become large enough to fit into clothing. / "The jacket is too big for him now, but he will grow into it."
3. To develop into a different or larger state. / "What started as a simple Java application grew into a massive enterprise platform."

**on**
1. To become increasingly liked or appreciated by someone over time. / "I didn't like the new management software at first, but it is starting to grow on me."

**out / out of**
1. To allow hair to grow back to its natural style or color. / "She is growing out her dyed blonde hair."
2. To become too big for a physical space or piece of clothing. / "Our development team grew out of the small office in just six months."
3. To stop doing something as you become older or more mature. / "He used to micromanage his team, but luckily he grew out of that habit."
4. To develop or happen as a direct result of something else. / "The new mobile app grew out of a simple idea shared during a brainstorming meeting."

**over**
1. To become covered with growing plants (like vines, moss, or grass). / "The old, abandoned factory was eventually grown over by ivy."

**to**
1. To gradually begin to experience a feeling or an action (usually followed by another verb, like like, love, realize, understand). / "After working with him for a year, I grew to respect his leadership style."

**together**
1. To become closely united or emotionally connected. / "After the merger, the two departments slowly grew together to form one strong team."
2. To fuse or join while growing (often used for plants or healing bones). / "The broken bone was set in a cast and grew together perfectly."

**up**
1. To change from being a child to being an adult. / "He grew up in Poland and later moved abroad to study software engineering."
2. To behave in a mature, adult way (often used as a criticism or command when someone is acting childish). / "Stop arguing about minor code formatting and grow up!"
3. To slowly develop, arise, or establish itself (often used for cities, industries, or systems). / "A massive ecosystem of tools and frameworks grew up around the Java programming language."

**with**
1. To expand, develop, or change proportionally alongside something else. / "You need a server architecture that can grow with your business needs."

## Files to create / modify

- `src/pages/grow/GrowVerbPage.tsx` — new page (12 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `GROW_PARTICLES` constant + VERBS entry (alphabetical)
- `src/main.tsx` — import + register route `/phrasal-verbs/list/grow`
- `src/data/listVerbIndex.ts` — import growSections + add `buildEntries` call
- `src/__tests__/grow_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/grow_verb_page/*.test.tsx` — 12 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Grow card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/carry/CarryVerbPage.tsx` (TASK-14)
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `growUp_section_expanded`)
- Compound particle `out / out of` → storageKeyPrefix `growOut`
- VERBS entry for Grow goes after Find (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 #1 `src/pages/grow/GrowVerbPage.tsx` created with 12 sections, all meanings, all using default.png
- [x] #2 #2 GROW_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 12 particles
- [x] #3 #3 VERBS entry added for Grow in alphabetical position in PhrasalVerbsListPage.tsx
- [x] #4 #4 Route `/phrasal-verbs/list/grow` registered in src/main.tsx
- [x] #5 #5 growSections added to listVerbIndex.ts search index
- [x] #6 #6 12 test files created under src/__tests__/grow_verb_page/ (one per particle)
- [x] #7 #7 PhrasalVerbsListPage.test.tsx extended with Grow card, subtitle, and copy-button describe blocks
- [x] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
