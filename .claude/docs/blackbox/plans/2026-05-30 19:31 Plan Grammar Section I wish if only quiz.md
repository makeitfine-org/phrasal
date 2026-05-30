# Plan: Grammar Section — "I wish / if only" quiz

## Context

The app currently has a single quiz mode for phrasal verbs (`/phrasal-verbs`). The user wants a new **Grammar** section at `/grammar` housing topic-specific grammar quizzes. The first topic is "I wish / if only", reusing the same quiz UI but with Russian→English translation sentences, a tutorial modal instead of the all-verbs modal, renamed UI labels, and punctuation-agnostic multi-answer checking.

No code is written in this plan — only 4 backlog tasks are created.

---

## Tasks to Create

### TASK-9: Grammar landing page and routing
**What:** Add `/grammar` route and a `GrammarPage.tsx` landing page.  
- Route entry in `src/main.tsx` (alongside `/phrasal-verbs`)  
- `GrammarPage` shows a card/link to "I wish / if only" (`/grammar/i-wish-if-only`)  
- `HomePage.tsx` gets a "Grammar" navigation card alongside "Phrasal Verbs"  
- Tests: `GrammarPage.test.tsx` (renders, link present), update `HomePage.test.tsx`

### TASK-10: I wish/if only data layer and answer-checking
**What:** Data file + types + normalisation for the new quiz.  
- `src/data/wishData.ts` — exports an array of `GrammarEntry` (Russian sentence + array of accepted English answers), seeded with the 3 provided sentences  
- `src/types.ts` — add `GrammarEntry` type  
- `src/utils/normalizeAnswer.ts` — shared normalise fn: lowercase, trim, strip all punctuation (`/[^\w\s]/g`), collapse whitespace  
- Answer check: `correctAnswers.some(a => normalize(a) === normalize(userInput))`  
- Tests: `wishData.test.ts` validates data shape; `normalizeAnswer.test.ts` covers punctuation stripping, casing, multi-answer matching

### TASK-11: I wish/if only quiz page
**What:** New page at `/grammar/i-wish-if-only` reusing existing quiz components.  
- `src/pages/IWishPage.tsx` — mirrors `App.tsx` structure, using `wishData` and `GrammarEntry`; self-contained localStorage key `grammarIWishState`  
- Reuse components as-is: `QuizCard`, `Feedback`, `NavigationControls`, `SearchModal`, `ExcludedModal`  
- Override display strings via props/config: "Search by sentences" (SearchModal), "View excluded sentences" (ExcludedModal), "Tutorial" button (replaces "All Verbs")  
- QuizCard shows Russian sentence as the "definition" field; `wordsToHide` unused (no masking — grammar quiz is full free-text answer)  
- Add route `/grammar/i-wish-if-only` to `src/main.tsx`  
- Tests: `IWishPage.test.tsx` — render, submit correct/wrong answer (punctuation ignored), excluded/search modal labels

### TASK-12: Tutorial modal for Grammar
**What:** `TutorialModal.tsx` component for the I wish / if only reference.  
- Renders the full tutorial content (4 sections: I wish + past simple, I wish + past perfect, I wish + would, If only) with formatted headings, rule text, and example sentences  
- Opened by the "Tutorial" button in `IWishPage`  
- Close on Escape / click-outside (same pattern as `AllVerbsModal`)  
- Tests: `TutorialModal.test.tsx` — renders all section headings, renders example sentences, closes on Escape

---

## Verification

After all tasks are implemented:
1. `npm run test:run` — all tests pass
2. Navigate `/grammar` → see Grammar landing with "I wish / if only" card
3. Click through to `/grammar/i-wish-if-only`, answer a sentence (with punctuation differences) → marked correct
4. Open Tutorial modal → all 4 sections visible
5. Open Search / Excluded modals → correct labels shown