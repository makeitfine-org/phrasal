---
id: TASK-42
title: Add "Pay" phrasal verb page with list card and tests
status: Done
assignee: []
created_date: '2026-06-09 16:59'
updated_date: '2026-06-10 17:35'
labels:
  - phrasal-verbs
  - content
dependencies: []
priority: medium
ordinal: 30000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add the "Pay" phrasal verb entry following the same pattern as Call/Carry/Drop/Eat/Fall pages.

## Particles (10 total)

| Particle | storageKeyPrefix | # meanings |
|---|---|---|
| off | payOff | 4 |
| up | payUp | 1 |
| down | payDown | 1 |
| in / into | payIn | 1 |
| out | payOut | 2 |
| away | payAway | 1 |
| forward | payForward | 1 |
| back | payBack | 2 |
| for | payFor | 2 |
| over | payOver | 1 |

## Content

**off**
1. To completely pay back a debt. / "After five years, the company finally paid off its bank loan."
2. To result in success or yield good results after hard work or investment. / "The team's long hours of coding really paid off when the software launched successfully."
3. To bribe someone so they keep quiet or do not cause trouble. / "The corrupt manager tried to pay off the inspector."
4. To dismiss workers and give them their final wages (more common in British English). / "The factory closed down and paid off all its workers."

**up**
1. To give someone the money you owe them, especially when you do not want to or when you are forced to do it. / "The supplier threatened legal action until the client finally paid up."

**down**
1. To reduce the total amount of a debt by paying a portion of it. / "The management team decided to pay down the company's debt before investing in new projects."

**in / into**
1. To put money into a bank account, pension, or fund. / "I need to go to the bank to pay in these checks."

**out**
1. To disburse or spend a large amount of money, often from a fund, insurance, or company profit (like dividends). / "The insurance policy paid out $50,000 after the office roof leaked."
2. To slowly release or let out a rope (nautical). / "The sailor paid out the rope to let the boat move away from the dock."

**away**
1. Similar to "pay out," meaning to let a rope slide through your hands (nautical/rare). / "He paid away the line as the anchor dropped."

**forward**
1. To respond to someone's kindness or help by doing a good deed for someone else, rather than returning the favor to the original person. / "My mentor helped me start my career, so I try to pay it forward by mentoring junior developers."

**back**
1. To return money to someone who loaned it to you. / "If you lend me $20 for lunch, I will pay you back tomorrow."
2. To do something bad to someone because they did something bad to you (revenge). / "I will pay him back for stealing my promotion."

**for**
1. To give money in exchange for goods or services. / "The company will pay for your travel expenses."
2. To suffer the negative results of a mistake or bad decision. / "We ignored the software bugs during testing, and now we are paying for it with customer complaints."

**over**
1. To transfer money to someone in authority or to a third party. / "The business is required to pay over all collected taxes to the government at the end of the quarter."

## Files to create / modify

- `src/pages/pay/PayVerbPage.tsx` — new page (10 sections, all `default.png`)
- `src/pages/PhrasalVerbsListPage.tsx` — add `PAY_PARTICLES` constant + VERBS entry after 'pass'
- `src/main.tsx` — import + register route `/phrasal-verbs/list/pay`
- `src/data/listVerbIndex.ts` — import paySections + add `buildEntries` call
- `src/__tests__/pay_verb_page/helpers.tsx` — new helpers file
- `src/__tests__/pay_verb_page/*.test.tsx` — 10 test files (one per particle)
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — add Pay card, subtitle, and copy-button tests

## Implementation notes

- Follow the exact same pattern as `src/pages/fall/FallVerbPage.tsx`
- All images use `default.png`: `${base}images/phrasal_verbs/list/default.png`
- storageKey format: `{prefix}_section_expanded` (e.g. `payOff_section_expanded`)
- Compound particle `in / into` → storageKeyPrefix `payIn`, test file `in_into.test.tsx`
- VERBS entry for Pay goes after Pass (alphabetical order)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 #1 `src/pages/pay/PayVerbPage.tsx` created with 10 sections, all meanings, all using default.png
- [x] #2 #2 PAY_PARTICLES constant added to PhrasalVerbsListPage.tsx with all 10 particles
- [x] #3 #3 VERBS entry added for Pay after Pass in PhrasalVerbsListPage.tsx
- [x] #4 #4 Route `/phrasal-verbs/list/pay` registered in src/main.tsx
- [x] #5 #5 paySections added to listVerbIndex.ts search index
- [x] #6 #6 10 test files created under src/__tests__/pay_verb_page/ (one per particle)
- [x] #7 #7 PhrasalVerbsListPage.test.tsx extended with Pay card, subtitle, and copy-button describe blocks
- [x] #8 #8 `npm run test:run` passes with all tests green
<!-- AC:END -->
