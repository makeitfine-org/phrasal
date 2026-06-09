---
id: TASK-25
title: Add "Fall" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09 15:33'
updated_date: '2026-06-09 16:48'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 13000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Fall" phrasal verb entry following the same pattern as existing verb pages.

## Particles (15 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| about / around / round | fallAbout | 1 |
| apart | fallApart | 3 |
| away | fallAway | 3 |
| back | fallBack | 2 |
| behind | fallBehind | 2 |
| down | fallDown | 2 |
| for | fallFor | 2 |
| in | fallIn | 3 |
| into | fallInto | 3 |
| off | fallOff | 2 |
| on / upon | fallOn | 4 |
| out | fallOut | 3 |
| over | fallOver | 2 |
| through | fallThrough | 1 |
| to | fallTo | 2 |

## Content

**about / around / round**
1. To laugh uncontrollably (mostly British/Australian English). / "The whole team fell about laughing during the presentation."

**apart**
1. To fail completely (systems, plans, or organizations). / "The software project fell apart due to poor management."
2. To experience a serious emotional or mental breakdown. / "He fell apart after losing his leadership role."
3. To break into pieces because of poor condition. / "These old documents are starting to fall apart."

**away**
1. To gradually decrease, fade, or disappear. / "Client interest fell away when the prices increased."
2. To break off and drop to the ground. / "The old plaster fell away from the ceiling."
3. To slope downwards. / "The land falls away sharply behind the building."

**back**
1. To retreat or move backwards (often military or strategic). / "Our competitors pushed hard, forcing us to fall back and rethink our strategy."
2. To rely on something as a backup plan when other things fail (fall back on). / "If the Java application fails, we have a backup system to fall back on."

**behind**
1. To fail to complete work or make payments on time. / "If you don't manage your time well, you will fall behind on the project schedule."
2. To move slower than the rest of a group. / "She fell behind the other runners because her leg hurt."

**down**
1. To be proven weak, inadequate, or incorrect (often an argument or plan). / "His business strategy falls down when you look at the financial data."
2. To drop to the ground (literal). / "The sign was not attached properly and fell down."

**for**
1. To be tricked or deceived by a lie or scam. / "I can't believe the manager fell for that obvious phishing email."
2. To fall deeply in love with someone. / "They met at a tech conference and fell for each other immediately."

**in**
1. To collapse inwards (like a roof, wall, or ceiling). / "The roof of the old warehouse fell in under the heavy snow."
2. To form a line (military). / "The sergeant ordered the soldiers to fall in."
3. To agree to a plan or join a group of people (fall in with). / "We decided to fall in with the director's new strategy."

**into**
1. To start doing something by chance, rather than by plan (like a career). / "I didn't study management; I just fell into it."
2. To be naturally divided into categories. / "The users of this software fall into three main groups."
3. To enter a specific state or condition. / "The building fell into ruin after years of neglect."

**off**
1. To decrease in quantity, quality, or frequency. / "Product sales usually fall off during the summer holidays."
2. To detach from something. / "The handle fell off the door."

**on / upon**
1. To become someone's duty or responsibility. / "When the CEO resigned, the responsibility fell on the vice president."
2. To happen on a specific date. / "This year, the project deadline falls on a Friday."
3. To attack eagerly or suddenly. / "The press fell on the politician after the scandal broke."
4. To experience difficult times (idiom: fall on hard times). / "The company fell on hard times during the recession."

**out**
1. To have an argument and stop being friends or colleagues. / "The two founders fell out over the future direction of the company."
2. To become detached and drop (usually hair or teeth). / "Stress can cause your hair to fall out."
3. To leave a formation (military). / "The troops were ordered to fall out and rest."

**over**
1. To collapse or drop to the ground. / "The server rack almost fell over during the earthquake."
2. To try extremely hard, often looking foolish, to do something (fall over oneself). / "Recruiters are falling over themselves to hire good Java developers."

**through**
1. To fail to happen or be completed (usually plans, deals, or projects). / "The merger fell through at the last minute due to legal issues."

**to**
1. To become someone's duty or responsibility (similar to fall on). / "It falls to the senior developer to train the new team members."
2. To start doing something energetically, especially eating or working. / "They fell to eating as soon as the food arrived."

## Files to create / modify

- `src/pages/fall/FallVerbPage.tsx` — new page (15 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `FALL_PARTICLES` constant + VERBS entry (alphabetical)
- `src/main.tsx` — import + register route `/phrasal-verbs/list/fall`
- `src/data/listVerbIndex.ts` — import fallSections + add `buildEntries` call
- `src/__tests__/fall_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/fall_verb_page/*.test.tsx` — 15 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Fall card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as existing verb pages (e.g. `src/pages/do/DoVerbPage.tsx`)
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `fallApart_section_expanded`)
- Compound particle `about / around / round` → storageKeyPrefix `fallAbout`
- Compound particle `on / upon` → storageKeyPrefix `fallOn`
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 #1 `src/pages/fall/FallVerbPage.tsx` created with 15 sections, all meanings, all using default.png
- [x] #2 #2 FALL_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 15 particles
- [x] #3 #3 VERBS entry added for Fall in alphabetical position in PhrasalVerbsListPage.tsx
- [x] #4 #4 Route `/phrasal-verbs/list/fall` registered in src/main.tsx
- [x] #5 #5 fallSections added to listVerbIndex.ts search index
- [x] #6 #6 15 test files created under src/__tests__/fall_verb_page/ (one per particle)
- [x] #7 #7 PhrasalVerbsListPage.test.tsx extended with Fall card, subtitle, and copy-button describe blocks
- [x] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
