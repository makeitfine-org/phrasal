# Plan: Rename "Test most popular" → "Quiz most popular" and "Phrasal Verbs" → "Quiz Phrasal Verbs"

## Context
Two UI label changes requested by the user:
1. On `/phrasal-verbs` page: card heading "Test most popular" → "Quiz most popular"
2. On `/phrasal-verbs/test-most-popular` page: app header title "Phrasal Verbs" → "Quiz Phrasal Verbs"

## Changes

### 1. `src/pages/PhrasalVerbsPage.tsx` (line 20)
Change `Test most popular` → `Quiz most popular` in the `<h2>` heading of the card.

### 2. `src/App.tsx` (line ~283)
Pass explicit `title="Quiz Phrasal Verbs"` prop to `<Header>`. Currently no title is passed, so it falls back to the default `'Phrasal Verbs'` in Header's prop definition.

### 3. `src/__tests__/PhrasalVerbsPage.test.tsx` (lines 25, 27, 30, 32)
Update three test descriptions/assertions referencing "Test most popular" → "Quiz most popular".

### 4. `src/__tests__/App.test.tsx` (line 39)
Update `getByText('Phrasal Verbs')` → `getByText('Quiz Phrasal Verbs')`.

**Note:** `Header.test.tsx` does NOT need updating — it renders Header with no title prop (uses the default `'Phrasal Verbs'`), which is unchanged.

## Verification
Run `npm run test:run` — all tests should pass.