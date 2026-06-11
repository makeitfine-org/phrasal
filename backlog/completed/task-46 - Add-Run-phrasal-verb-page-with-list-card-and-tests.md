---
id: TASK-46
title: Add "Run" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09 17:24'
updated_date: '2026-06-11 05:59'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 34000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Run" phrasal verb entry following the same pattern as the existing verb pages.

## Particles (23 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| about / around / round | runAbout | 2 |
| across | runAcross | 1 |
| after | runAfter | 1 |
| against | runAgainst | 2 |
| ahead | runAhead | 1 |
| away | runAway | 1 |
| back | runBack | 2 |
| behind | runBehind | 1 |
| by | runBy | 1 |
| down | runDown | 3 |
| for | runFor | 1 |
| in | runIn | 2 |
| into | runInto | 2 |
| off | runOff | 2 |
| on | runOn | 2 |
| out | runOut | 2 |
| over | runOver | 3 |
| through | runThrough | 2 |
| to | runTo | 2 |
| together | runTogether | 1 |
| up | runUp | 1 |
| with | runWith | 1 |
| without | runWithout | 1 |

## Content

**about / around / round**
1. To be very busy doing many different tasks. / "The project manager was running around all day trying to organize the sprint planning."
2. To deceive or cheat someone (usually "run around on"). / "The vendor was giving us the runaround instead of delivering the software on time."

**across**
1. To find something or meet someone by chance. / "I ran across an old Java library that perfectly solves our database problem."

**after**
1. To chase someone or something. / "Startups spend a lot of time running after new investors."

**against**
1. To compete with someone in an election or business contest. / "Our product is running against two major competitors in the enterprise market."
2. To cause difficulties or oppose principles. / "The new company policy runs against our agile working methods."

**ahead**
1. To progress faster than scheduled. / "The development team is running ahead of schedule for the Q3 release."

**away**
1. To escape or leave a difficult situation. / "A good leader does not run away from hard decisions."

**back**
1. To return quickly. / "I need to run back to the office to get my security badge."
2. To replay audio or video. / "Let's run the recording back to hear what the client said about the API requirements."

**behind**
1. To be late or delayed according to a schedule. / "We are running behind on the backend integration."

**by**
1. To tell someone about an idea to get their opinion or approval. / "I need to run this new architecture design by the CTO before we start coding."

**down**
1. To lose power (a battery/machine) or energy (a person). / "The server's backup battery finally ran down after three hours."
2. To criticize someone constantly. / "A toxic manager constantly runs down their employees in front of others."
3. To find the source of something after a long search. / "The QA team finally ran down the cause of the memory leak in the Java application."

**for**
1. To try to be elected to an official or leadership position. / "She decided to run for the board of directors."

**in**
1. To use a new machine carefully until it is ready for normal use. / "We need to run in the new servers before putting them into full production."
2. To arrest someone (informal police term). / "The police ran him in for trespassing."

**into**
1. To experience a problem or difficulty unexpectedly. / "We ran into an unexpected bug while compiling the code."
2. To meet someone unexpectedly. / "I ran into our former lead developer at a tech conference."

**off**
1. To quickly make copies of a document. / "Could you run off 20 copies of the meeting agenda?"
2. To force someone or something to leave. / "The aggressive takeover ran the original founders off."

**on**
1. To be powered by something. / "The legacy enterprise system still runs on Java 8."
2. To continue for too long. / "The daily stand-up meeting ran on for an hour."

**out**
1. To use all of a supply so there is nothing left. / "We ran out of budget before finishing the software testing phase."
2. To expire (for a contract, document, or agreement). / "Our cloud service contract runs out next month."

**over**
1. To go beyond a time limit. / "The project review ran over its scheduled time."
2. To quickly review or explain something. / "Let's run over the main points of the business strategy one more time."
3. To hit with a vehicle. / "The delivery truck ran over a sign in the company parking lot."

**through**
1. To practice, review, or explain something from beginning to end. / "The team ran through the deployment steps before the actual release."
2. To spend money very quickly. / "The startup ran through its initial funding in just six months."

**to**
1. To reach a particular amount or cost. / "The costs for upgrading the IT infrastructure will run to $50,000."
2. To ask someone for help, often too quickly. / "You cannot just run to the CEO every time there is a minor conflict in the team."

**together**
1. To mix or blend so that things cannot be separated. / "When you work from home, your professional and personal lives can easily run together."

**up**
1. To create a large debt or cost. / "We ran up a huge AWS bill during the load testing phase."

**with**
1. To take an idea and develop it independently. / "The management team loved the proposal and told us to run with it."

**without**
1. To function lacking something. / "The microservice is designed to run without a continuous database connection."

## Files to create / modify

- `src/pages/run/RunVerbPage.tsx` — new page (23 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `RUN_PARTICLES` constant + VERBS entry after 'pull'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/run`
- `src/data/listVerbIndex.ts` — import runSections + add `buildEntries` call
- `src/__tests__/run_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/run_verb_page/*.test.tsx` — 23 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Run card/subtitle/copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fill/FillVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `runUp_section_expanded`)
- Compound particle `about / around / round` → storageKeyPrefix `runAbout`
- VERBS entry for Run goes after Pull (alphabetical order)
- Sections sorted alphabetically by particle name
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 #1 `src/pages/run/RunVerbPage.tsx` created with 23 sections, all meanings, all using default.png
- [x] #2 #2 RUN_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 23 particles
- [x] #3 #3 VERBS entry added for Run after Pull in PhrasalVerbsListPage.tsx
- [x] #4 #4 Route `/phrasal-verbs/list/run` registered in src/main.tsx
- [x] #5 #5 runSections added to listVerbIndex.ts search index
- [x] #6 #6 23 test files created under src/__tests__/run_verb_page/ (one per particle)
- [x] #7 #7 PhrasalVerbsListPage.test.tsx extended with Run card, subtitle, and copy-button describe blocks
- [x] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
