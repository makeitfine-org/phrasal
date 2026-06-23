# Plan: Connect Frontend to Backend API

## Context

The frontend currently uses hardcoded data files (`phrasalVerbs.ts`, `wishData.ts`) imported directly by quiz components. The backend exposes a complete REST API at `/api/v1/phrasal-verbs` and `/api/v1/grammar-entries` with paginated responses, but nothing in the frontend fetches from it. This plan connects the two — the frontend will load quiz data from the backend API, with loading/error states, while keeping the quiz logic (mastered/excluded/history in localStorage) unchanged.

**Scope**: Frontend API client + hooks, update `App.tsx` and `IWishPage.tsx` to fetch from backend, update frontend tests, add frontend e2e tests.

**Not in scope**: Syncing quiz progress to backend, converting verb detail pages (71 pages with static educational content) to API-driven, admin UI.

## Data Shape Mapping

| Frontend Type | Backend Response | Mapping |
|---|---|---|
| `VerbEntry { verb, definition, sentences, wordsToHide }` | `PhrasalVerbResponse { id, verb, definition, sentences, wordsToHide, isLearned, ... }` | Pick 4 fields, filter by `isLearned` |
| `BrowseVerbEntry` (adds `quizIndex?`) | Same response, all items | Compute `quizIndex` for non-learned entries |
| `GrammarEntry { sentence, correctAnswers }` | `GrammarEntryResponse { id, category, sentence, correctAnswers, ... }` | Pick 2 fields |

Backend returns paginated (`Page<T>`) responses. We'll fetch with `size=1000` to get all entries at once, since the quiz needs the full pool in memory for index-based navigation.

## Steps

### Step 1: Create API client layer

**New file: `frontend/src/api/client.ts`**
- Typed `fetch` wrapper with base URL `/api/v1`
- `get<T>(path, params?)` — builds URL with query params, returns parsed JSON
- Handles HTTP errors (throws typed `ApiError` with status + message)
- No external dependencies (native `fetch`)

**New file: `frontend/src/api/phrasalVerbsApi.ts`**
- `fetchPhrasalVerbs(learned?: boolean)` → fetches `GET /api/v1/phrasal-verbs?size=1000&learned=...`
- Maps `PhrasalVerbResponse[]` from `page.content` to `VerbEntry[]` and `BrowseVerbEntry[]`
- Returns `{ allVerbs, verbsForBrowse }` matching existing data shapes

**New file: `frontend/src/api/grammarEntriesApi.ts`**
- `fetchGrammarEntries(category: string)` → fetches `GET /api/v1/grammar-entries?category=...&size=1000`
- Maps `GrammarEntryResponse[]` from `page.content` to `GrammarEntry[]`

### Step 2: Create data-fetching hooks

**New file: `frontend/src/hooks/usePhrasalVerbs.ts`**
- Returns `{ allVerbs, verbsForBrowse, loading, error }`
- Fetches on mount, stores in state
- Error state includes user-friendly message

**New file: `frontend/src/hooks/useGrammarEntries.ts`**
- Takes `category: string` parameter
- Returns `{ entries, loading, error }`
- Fetches on mount, stores in state

### Step 3: Update consuming components

**`frontend/src/App.tsx`**:
- Replace `import { allVerbs, verbsForBrowse } from './data/phrasalVerbs'` with `usePhrasalVerbs()` hook
- Since hooks can't be called conditionally, extract quiz UI into a child component `PhrasalVerbQuiz` that receives `allVerbs` and `verbsForBrowse` as props
- `App` renders loading spinner while fetching, error state on failure, `PhrasalVerbQuiz` on success
- Move `checkAnswer` into `PhrasalVerbQuiz` where it can close over the prop-supplied `allVerbs`

**`frontend/src/pages/IWishPage.tsx`**:
- Replace `import { wishData } from '../data/wishData'` with `useGrammarEntries('i-wish-if-only')` hook  
- Extract quiz UI into child component `GrammarQuiz` that receives `entries` as prop
- Move `entryToVerbEntry`, `displayEntries`, `checkAnswer` into `GrammarQuiz`
- Loading/error states in `IWishPage`

### Step 4: Update frontend tests

**`frontend/src/__tests__/App.test.tsx`**:
- Replace `vi.mock('../data/phrasalVerbs')` with `vi.mock('../hooks/usePhrasalVerbs')`
- Mock returns `{ allVerbs: [...], verbsForBrowse: [...], loading: false, error: null }`
- All existing test assertions remain the same (they test quiz UI behavior)

**`frontend/src/__tests__/IWishPage.test.tsx`**:
- Replace `vi.mock('../data/wishData')` with `vi.mock('../hooks/useGrammarEntries')`
- Mock returns `{ entries: [...], loading: false, error: null }`
- All existing test assertions remain the same

**New file: `frontend/src/__tests__/api/client.test.ts`**:
- Test `get()` with mocked `fetch`
- Test error handling (4xx, 5xx, network error)

**New file: `frontend/src/__tests__/hooks/usePhrasalVerbs.test.ts`**:
- Test loading → success flow
- Test loading → error flow
- Mock the API module

**New file: `frontend/src/__tests__/hooks/useGrammarEntries.test.ts`**:
- Test loading → success flow with category param
- Test loading → error flow

**Keep unchanged**:
- `phrasalVerbs.test.ts`, `wishData.test.ts` — these test the data files themselves (still valid, data files remain as reference)
- `AllVerbsModal.test.tsx`, `ExcludedModal.test.tsx`, `SearchModal.test.tsx`, `QuizCard.test.tsx`, etc. — use inline test data via props
- All 71 verb page tests — completely unaffected

### Step 5: Add frontend E2E tests

**New file: `e2e/features/frontend/quiz.feature`**:
- Scenario: Homepage loads and links to quiz
- Scenario: Phrasal verb quiz loads data from API, displays question
- Scenario: Grammar quiz loads data from API, displays question

**New file: `e2e/src/steps/frontend.steps.ts`**:
- Use Playwright to navigate to `http://localhost:3000`
- Assert quiz loads (check for quiz UI elements after data loads from backend)

**Update `e2e/src/hooks.ts`**:
- Initialize Playwright browser in `Before` hook
- Close browser in `After` hook

### Step 6: Verify

1. `cd frontend && npm run test:run` — all existing + new tests pass
2. `cd backend && JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 mvn clean verify` — no backend changes, still passes
3. `make dockerAll` → navigate to `http://localhost:3000`, verify quiz loads data from backend
4. `cd e2e && npm test` — API + frontend e2e tests pass

## Files Modified/Created

| Action | Path |
|---|---|
| Create | `frontend/src/api/client.ts` |
| Create | `frontend/src/api/phrasalVerbsApi.ts` |
| Create | `frontend/src/api/grammarEntriesApi.ts` |
| Create | `frontend/src/hooks/usePhrasalVerbs.ts` |
| Create | `frontend/src/hooks/useGrammarEntries.ts` |
| Modify | `frontend/src/App.tsx` |
| Modify | `frontend/src/pages/IWishPage.tsx` |
| Modify | `frontend/src/__tests__/App.test.tsx` |
| Modify | `frontend/src/__tests__/IWishPage.test.tsx` |
| Create | `frontend/src/__tests__/api/client.test.ts` |
| Create | `frontend/src/__tests__/hooks/usePhrasalVerbs.test.ts` |
| Create | `frontend/src/__tests__/hooks/useGrammarEntries.test.ts` |
| Create | `e2e/features/frontend/quiz.feature` |
| Create | `e2e/src/steps/frontend.steps.ts` |
| Modify | `e2e/src/hooks.ts` |
| Modify | `e2e/src/world.ts` |