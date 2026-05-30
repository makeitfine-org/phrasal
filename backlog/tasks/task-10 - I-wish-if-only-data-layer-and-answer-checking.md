---
id: TASK-10
title: I wish/if only data layer and answer-checking
status: Done
assignee: []
created_date: '2026-05-30 17:31'
updated_date: '2026-05-30 17:38'
labels:
  - grammar
  - data
  - answer-checking
dependencies: []
modified_files:
  - src/types.ts
  - src/data/wishData.ts
  - src/utils/normalizeAnswer.ts
  - src/__tests__/wishData.test.ts
  - src/__tests__/normalizeAnswer.test.ts
priority: medium
ordinal: 3100
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create the data file, types, and answer-normalisation utility for the I wish/if only grammar quiz.

## Scope

### Data (`src/data/wishData.ts`)
Export an array of `GrammarEntry` seeded with the 3 provided sentences:
- "Жаль, что я не прочитал ту документацию по Java на прошлой неделе" → `["I wish I had read that Java documentation last week"]`
- "Я бы хотел, чтобы мой компьютер перестал так медленно работать" → `["I wish my computer would stop working so slowly"]`
- "Если бы только я не забыл сохранить этот файл вчера!" → `["If only I hadn't forgotten to save this document yesterday", "I wish I hadn't forgotten to save this document yesterday"]`

### Types (`src/types.ts`)
Add:
```ts
export interface GrammarEntry {
  sentence: string;        // prompt shown to the user (Russian)
  correctAnswers: string[]; // one or more accepted English translations
}
```

### Normalisation (`src/utils/normalizeAnswer.ts`)
```ts
export function normalizeAnswer(s: string): string {
  return s.toLowerCase().trim().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
}
```
Answer is correct when `correctAnswers.some(a => normalizeAnswer(a) === normalizeAnswer(userInput))`.

## Files to create/modify
- `src/types.ts` — add `GrammarEntry`
- `src/data/wishData.ts` — new file
- `src/utils/normalizeAnswer.ts` — new file
- `src/__tests__/wishData.test.ts` — data shape validation
- `src/__tests__/normalizeAnswer.test.ts` — normalisation + multi-answer matching
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 wishData exports an array of GrammarEntry with at least 3 entries
- [x] #2 Each entry has a non-empty sentence string and at least one correctAnswer
- [x] #3 normalizeAnswer strips punctuation, collapses whitespace, lowercases
- [x] #4 Answer check accepts any of the correctAnswers ignoring punctuation and casing
- [x] #5 The sentence with two accepted answers passes for both variants
- [x] #6 `npm run test:run` passes
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added GrammarEntry type, wishData with 3 Russian sentences (one with two accepted English answers), and normalizeAnswer/isAnswerCorrect utilities. All 266 tests pass.
<!-- SECTION:FINAL_SUMMARY:END -->
