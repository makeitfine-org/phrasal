---
id: TASK-67
title: Add "Cast" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-13 11:16'
updated_date: '2026-06-13 11:29'
labels:
  - feature
  - phrasal-verb-page
dependencies: []
references:
  - src/pages/take/TakeVerbPage.tsx
  - src/__tests__/take_verb_page/
  - src/pages/PhrasalVerbsListPage.tsx
  - src/main.tsx
modified_files:
  - src/pages/cast/CastVerbPage.tsx
  - src/pages/PhrasalVerbsListPage.tsx
  - src/main.tsx
  - src/__tests__/cast_verb_page/helpers.tsx
  - src/__tests__/cast_verb_page/general.test.tsx
  - src/__tests__/cast_verb_page/separators.test.tsx
  - src/__tests__/cast_verb_page/about_around_round.test.tsx
  - src/__tests__/cast_verb_page/away.test.tsx
  - src/__tests__/cast_verb_page/back.test.tsx
  - src/__tests__/cast_verb_page/down.test.tsx
  - src/__tests__/cast_verb_page/forward.test.tsx
  - src/__tests__/cast_verb_page/off.test.tsx
  - src/__tests__/cast_verb_page/on.test.tsx
  - src/__tests__/cast_verb_page/out.test.tsx
  - src/__tests__/cast_verb_page/up.test.tsx
priority: medium
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Cast" phrasal verb entry to the list page and implement its dedicated verb page with all sections, following the exact same pattern as `TakeVerbPage`.

## Phrasal verbs to include

### cast about / around / round (1 meaning)
- Search anxiously or desperately for something (idea, solution, excuse)
- Example: "After the system crashed, the developers cast about for a quick fix to get the servers running again."

### cast away (2 meanings)
1. Throw something away because it is no longer wanted (discard)
   - "Do not cast away your old Java components; you might be able to reuse them in future microservices."
2. Be left stranded after a shipwreck (usually passive)
   - "The sailors were cast away on a remote island for three months."

### cast back (1 meaning)
- Think about things from the past (almost always "cast your mind back")
- "If we cast our minds back to the last Agile sprint, we can identify exactly why the feature was delayed."

### cast down (1 meaning)
- Make someone feel sad/discouraged (almost always passive or adjective)
- "The engineering team was very cast down when the CEO canceled their project."

### cast forward (1 meaning)
- Direct thoughts toward the future (often "cast your mind forward")
- "Let's cast our minds forward to next year and plan our marketing strategy for the new product launch."

### cast off (3 meanings)
1. Get rid of something/someone no longer wanted
   - "The company managed to cast off its old-fashioned image by launching an innovative software platform."
2. Untie a boat from its dock so it can sail
   - "The captain ordered the crew to cast off at sunrise."
3. (Knitting) Remove final stitches from needle to finish a piece
   - "Once the scarf is the right length, you can cast off."

### cast on (1 meaning)
- (Knitting) Create the first row of stitches on a needle to start a project
- "She cast on fifty stitches to begin making the sweater."

### cast out (1 meaning)
- Forcefully expel someone from a group/organisation
- "The corrupt board member was cast out of the company after the financial audit."

### cast up (2 meanings)
1. Calculate or add up a column of figures (formal, British English)
   - "The financial manager cast up the final expenses for the software development cycle."
2. (Of the sea) Wash something onto the shore
   - "The storm cast up pieces of broken wood onto the beach."

## Implementation steps

### 1. List page link (`src/pages/PhrasalVerbsListPage.tsx`)
- Add `CAST_PARTICLES` constant: `['about / around / round', 'away', 'back', 'down', 'forward', 'off', 'on', 'out', 'up']`
- Add a list card entry (alphabetically between "call" and "carry"):
  `{ key: 'cast', label: 'Cast', to: '/phrasal-verbs/list/cast', particles: CAST_PARTICLES }`

### 2. Verb page (`src/pages/cast/CastVerbPage.tsx`)
- Model exactly on `src/pages/take/TakeVerbPage.tsx`
- Use `default.png` for all images (no custom images needed)
- `storageKey` / `storageKeyPrefix` convention: `castAboutAroundRound`, `castAway`, `castBack`, `castDown`, `castForward`, `castOff`, `castOn`, `castOut`, `castUp`
- Title: `"Cast"`

### 3. Route (`src/main.tsx`)
- Import `CastVerbPage` and add route: `<Route path="/phrasal-verbs/list/cast" element={<CastVerbPage />} />`
  (alphabetically between `/call` and `/carry`)

### 4. Tests (`src/__tests__/cast_verb_page/`)
- Mirror the structure of `src/__tests__/take_verb_page/`
- `helpers.tsx` — render helper + `getCard`
- `general.test.tsx` — page title renders, section count, expand/collapse all
- `separators.test.tsx` — HR separators between sections
- One test file per particle: `about_around_round.test.tsx`, `away.test.tsx`, `back.test.tsx`, `down.test.tsx`, `forward.test.tsx`, `off.test.tsx`, `on.test.tsx`, `out.test.tsx`, `up.test.tsx`
- Each particle file: verifies definition text, example text, and card count for that section

## Reference files
- `src/pages/take/TakeVerbPage.tsx` — page component template
- `src/__tests__/take_verb_page/` — test directory template
- `src/pages/PhrasalVerbsListPage.tsx` — list page (add CAST_PARTICLES + card entry)
- `src/main.tsx` — route registration
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 List page shows a 'Cast' card with particles: about / around / round, away, back, down, forward, off, on, out, up
- [x] #2 Clicking the 'Cast' card navigates to /phrasal-verbs/list/cast
- [x] #3 Cast page title is 'Cast'
- [x] #4 Cast page has 9 sections (one per particle group)
- [x] #5 Each section displays the correct number of meaning cards with the correct definitions and examples
- [x] #6 All images use default.png (no custom images required)
- [x] #7 Section expand/collapse state is persisted to localStorage using camelCase keys (castOff_section_expanded, etc.)
- [x] #8 Expand all / Collapse all portal button works correctly
- [x] #9 'Cast' card appears in alphabetical order on the list page (between Call and Carry)
- [x] #10 npm run test:run passes with all new tests included
<!-- AC:END -->
