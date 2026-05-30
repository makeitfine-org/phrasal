---
id: TASK-11
title: I wish/if only quiz page
status: Done
assignee: []
created_date: '2026-05-30 17:32'
updated_date: '2026-05-30 17:43'
labels:
  - grammar
  - quiz
  - frontend
dependencies:
  - TASK-10
modified_files:
  - src/main.tsx
  - src/pages/IWishPage.tsx
  - src/components/Header.tsx
  - src/components/ExcludedModal.tsx
  - src/components/SearchModal.tsx
  - src/__tests__/IWishPage.test.tsx
priority: medium
ordinal: 4100
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create the full quiz page at `/grammar/i-wish-if-only`, reusing existing quiz UI components but wired to `wishData` and `GrammarEntry`.

## Scope
- `src/pages/IWishPage.tsx` — mirrors `App.tsx` state/handler structure; uses `wishData`; localStorage key `grammarIWishState`
- Reuse components unchanged: `QuizCard`, `Feedback`, `NavigationControls`
- Pass label overrides to `Header` (or equivalent) and modals:
  - Search button/modal: label "Search by sentences"
  - Excluded button/modal: label "View excluded sentences"
  - All-verbs button: replaced by "Tutorial" button (opens `TutorialModal` — see TASK-12)
- Russian sentence maps to the `definition` prop of `QuizCard`; `verb` can be an empty string or a display index; `wordsToHide` is empty (no masking needed)
- Answer checking uses `normalizeAnswer` from TASK-10 with multi-answer support
- Add route `/grammar/i-wish-if-only` in `src/main.tsx`
- `ExcludedModal` and `SearchModal` receive a label/title prop (or a wrapper with renamed heading) so they show "sentences" wording

## Files to create/modify
- `src/pages/IWishPage.tsx` — new file
- `src/main.tsx` — add route
- `src/components/ExcludedModal.tsx` — add optional `itemLabel` prop (default "phrasal verb") for heading/empty-state text
- `src/components/SearchModal.tsx` — add optional `searchPlaceholder` prop (default "Search phrasal verbs…")
- `src/__tests__/IWishPage.test.tsx` — new tests
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Route /grammar/i-wish-if-only renders the quiz with Russian sentence as prompt
- [x] #2 Submitting the correct English answer (with differing punctuation/casing) marks it correct
- [x] #3 Submitting a wrong answer marks it wrong and shows the first accepted answer in Feedback
- [x] #4 Header shows Tutorial, Search by sentences, and View excluded sentences buttons
- [x] #5 Search modal placeholder says 'Search by sentences'
- [x] #6 Excluded modal heading/empty-state uses 'sentences' wording
- [x] #7 State persists to localStorage under key grammarIWishState
- [x] #8 `npm run test:run` passes with no regressions to existing phrasal-verbs tests
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Created IWishPage with full quiz logic using wishData and isAnswerCorrect. Added optional label props to Header (title, searchTitle, excludedTitle, allVerbsTitle), ExcludedModal (itemLabel), and SearchModal (searchPlaceholder). Added route /grammar/i-wish-if-only. All 282 tests pass.
<!-- SECTION:FINAL_SUMMARY:END -->
