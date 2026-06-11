---
id: TASK-51
title: Add "Sit" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09'
updated_date: '2026-06-11 12:55'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 39000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Sit" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (12 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| about / around / round | sitAbout | 1 |
| back | sitBack | 2 |
| by | sitBy | 1 |
| down | sitDown | 2 |
| for | sitFor | 3 |
| in | sitIn | 3 |
| on | sitOn | 2 |
| out | sitOut | 2 |
| over | sitOver | 1 |
| through | sitThrough | 1 |
| up | sitUp | 3 |
| with | sitWith | 2 |

## Content

**about / around / round**
1. To spend time doing nothing productive or useful. / "Instead of looking for a new job, he just sits around the house all day."

**back**
1. To relax in a chair. / "Now that the software release is finished, we can sit back and relax."
2. To intentionally take no action when you should probably do something. / "A good manager doesn't just sit back while the team struggles with a project."

**by**
1. To fail to take action to stop something bad from happening. / "I cannot sit by and let them make this terrible business decision."

**down**
1. To take a seat (literal). / "Please sit down, the meeting will begin shortly."
2. To have a serious conversation or a formal meeting with someone (sit down with). / "We need to sit down with the client and discuss the new Java requirements."

**for**
1. To take an official exam. / "She is going to sit for her project management certification next month."
2. To pose for an artist or photographer. / "The CEO sat for a professional portrait for the company website."
3. To take care of children while their parents are out (babysit). / "My sister is sitting for my children tonight."

**in**
1. To attend a meeting or class as an observer, rather than an active participant (sit in on). / "As a junior developer, can I sit in on the architecture meeting to learn how it works?"
2. To temporarily replace someone and do their job (sit in for). / "I will sit in for the team leader while she is on holiday."
3. To occupy a building as a form of protest. / "The workers decided to sit in at the factory until their demands were met."

**on**
1. To be an official member of a board or committee. / "He sits on the board of directors for three different tech companies."
2. To delay making a decision or taking action on something. / "The HR department has been sitting on my promotion request for weeks."

**out**
1. To choose not to participate in an activity. / "I don't know much about this part of the project, so I will sit this discussion out."
2. To wait patiently until a difficult or unpleasant situation finishes. / "We just have to sit out the economic crisis and hope the market improves soon."

**over**
1. To spend a long time doing something, usually eating or drinking, while having a conversation. / "We sat over coffee for hours discussing the new business strategy."

**through**
1. To stay until the end of an event that is long, boring, or difficult. / "I had to sit through a three-hour presentation on software compliance."

**up**
1. To move from a lying down position to a sitting position, or to sit straight. / "You should sit up straight during your job interview."
2. To stay awake late into the night. / "The developers sat up until 2 AM fixing bugs in the code."
3. To suddenly pay attention to something because it is surprising or important (sit up and take notice). / "When sales dropped by 20%, the leadership team finally sat up and took notice."

**with**
1. To be acceptable to someone, or to cause a certain feeling. / "The new remote work policy does not sit well with the development team."
2. To spend time with someone who is upset or sick to give them support. / "I sat with him after he heard that his project was canceled."

## Files to create / modify

- `src/pages/sit/SitVerbPage.tsx` — new page (12 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `SIT_PARTICLES` constant + VERBS entry after 'shut'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/sit`
- `src/data/listVerbIndex.ts` — import sitSections + add `buildEntries` call
- `src/__tests__/sit_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/sit_verb_page/*.test.tsx` — 12 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Sit card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `sitBack_section_expanded`)
- Compound particle `about / around / round` → storageKeyPrefix `sitAbout`
- VERBS entry for Sit goes after Shut (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 `src/pages/sit/SitVerbPage.tsx` created with 12 sections, all meanings, all using default.png
- [x] #2 SIT_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 12 particles
- [x] #3 VERBS entry added for Sit after Shut in PhrasalVerbsListPage.tsx
- [x] #4 Route `/phrasal-verbs/list/sit` registered in src/main.tsx
- [x] #5 sitSections added to listVerbIndex.ts search index
- [x] #6 12 test files created under src/__tests__/sit_verb_page/ (one per particle)
- [x] #7 PhrasalVerbsListPage.test.tsx extended with Sit card, subtitle, and copy-button describe blocks
- [x] #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
