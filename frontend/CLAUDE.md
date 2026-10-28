# CLAUDE.md — frontend

## Stack

- React 19, TypeScript (strict), Vite 8
- Tailwind CSS 4 (PostCSS plugin)
- react-router-dom 7
- Vitest, React Testing Library

## Architecture

Multi-page SPA. State is component-local + localStorage; the only context is `auth/AuthContext` (current user, `useAuth()`).

### Routing (`src/main.tsx`)

`ErrorBoundary` > `AuthProvider` > `BrowserRouter` > `PageShell` (layout shell with `<Outlet />`) > all routes.

### Component Tree

**Structural:** `PageShell` (dark mode, home button, portal target), `ErrorBoundary`, `VerbPageLayout` (collapsible particle sections + meaning cards, portal for expand-all button).

**Quiz:** `PhrasalVerbQuiz` (receives `allVerbs` + `verbsForBrowse` props), `GrammarQuiz` (receives `entries` props).

**Quiz-shared:** `Header`, `QuizCard`, `Feedback`, `NavigationControls`, `ExcludedModal`, `SearchModal`.

**Auth:** `pages/LoginPage`, `pages/RegisterPage` (routes `/login`, `/register`), `components/UserMenu`, `auth/AuthContext` + `auth/useAuth`, `hooks/useClickOutside`.

**Other:** `AllVerbsModal`, `TutorialModal`, `ListSearchModal`, `Icons`, `UserMenu` (login/signup links or email dropdown with logout, rendered by `NavigationMenu`).

### API Client (`src/api/`)

Native `fetch` wrapper, no external dependencies. Base URL `/api/v1`.

| File | Purpose |
|---|---|
| `client.ts` | `get<T>`, `post<T>`, `put<T>`, `del<T>`; sends `credentials: 'same-origin'` and the `X-XSRF-TOKEN` header (from the `XSRF-TOKEN` cookie, via `utils/cookies.ts`) on non-GET. `ApiError(status, message, problem?)` carries the parsed `ProblemDetail` |
| `authApi.ts` | `register`, `login`, `logout`, `fetchCurrentUser` (401 → `null`) |
| `quizProgressApi.ts` | `fetchQuizProgress(key)` (404 → `null`), `saveQuizProgress(key, doc, { keepalive })`; `QuizKey` = `phrasal-verbs` \| `grammar-i-wish-if-only`. `client.put` accepts `{ keepalive }` for saves while the page unloads |
| `phrasalVerbsApi.ts` | Fetches phrasal verbs → `VerbEntry[]` + `BrowseVerbEntry[]` |
| `grammarEntriesApi.ts` | Fetches grammar entries by category → `GrammarEntry[]` |
| `verbDetailsApi.ts` | Fetches verb list summaries and full verb detail sections |

### Data-fetching Hooks (`src/hooks/`)

| Hook | Used by |
|---|---|
| `useQuizProgressSync({ quizKey, itemIds, snapshot, applyState })` | `useQuiz` (logged-in users only; also exports `flushQuizProgress()`, called on logout) |
| `usePhrasalVerbs()` | `App.tsx` |
| `useGrammarEntries(category)` | `IWishPage.tsx` |
| `useVerbList()` | `PhrasalVerbsListPage.tsx` |
| `useVerbDetail(verb)` | `VerbDetailPage.tsx` |

### State Management

Only one context: `auth/AuthContext` (default value = anonymous, so components work without a provider). State is component-local + localStorage:

| Owner | localStorage key | Manages |
|---|---|---|
| `PageShell` | `phrasalQuizState` → `darkMode` | Dark mode (shared); defaults to OS `prefers-color-scheme` until cached |
| `PhrasalVerbQuiz` | `phrasalQuizState` | Quiz: mastered, excluded, history, currentIndex (localStorage; logged-in users also sync to the server) |
| `GrammarQuiz` | `grammarIWishState` | Grammar quiz (same shape) |
| `useQuizProgressSync` | `quizProgressSync` | Per-quiz sync metadata `{ ownerId, dirty }` (who owns the cached progress, unsent changes) |
| `VerbPageLayout` | per-section/meaning keys | Section/meaning expand/collapse |
| `PhrasalVerbsListPage` | `verbListExpanded` | Verb list card expand/collapse |

`PageShell` and `PhrasalVerbQuiz` share `phrasalQuizState`. `PhrasalVerbQuiz` preserves fields it doesn't own (like `darkMode`) by merging before writing.

Quiz progress sync: anonymous = localStorage only. A logged-in user's progress is loaded from the server (server wins; an empty server takes the local copy once), saved after a 2 s debounce, and flushed on unmount, `pagehide` and logout. Before an account replaces the local copy, the anonymous progress is stashed in `localStorage['quizProgressAnonymous']` (`stashAnonymousProgress`); logout clears the account-owned quiz state and restores that anonymous copy to storage and screen (`resetToAnonymousProgress`).

Utils: `utils/quizProgressMapping.ts` converts between list indexes and stable content ids (`VerbEntry.id`, `GrammarEntry.id`); `utils/quizProgressStorage.ts` reads/writes the sync metadata and clears local quiz state. The old `isLearned` split is gone: every verb enters the quiz pool.

### Data Files (`src/data/`)

Static reference data (quizzes fetch from backend API):

- `phrasalVerbs.ts` — `rawData: RawVerbEntry[]`. Retained as reference/seed data.
- `wishData.ts` — `wishData: GrammarEntry[]`. Retained as reference.
- `listVerbIndex.ts` — async `fetchListVerbIndex()` fetches from `GET /verb-details/all`, builds searchable index. Used by `ListSearchModal`.

### Answer Checking

- **Phrasal quiz**: case-insensitive, parentheses stripped.
- **Grammar quiz**: `isAnswerCorrect()` from `src/utils/normalizeAnswer.ts` — lowercases, trims, strips non-word/space chars, collapses whitespace.

### Adding a New Verb

Verb data is in the `verb_details` database table. Create a Flyway migration — no frontend changes needed.

## Coding Rules

- Use **Context7 MCP** before writing any React/Vite/library API code — docs drift
- No external state management libraries — component-local state + localStorage only; the single exception is `AuthContext` (no other global state)

## Testing

- Vitest + `@testing-library/react`. Setup: `src/__tests__/setup.ts`.
- Test files in `src/__tests__/`. One `.test.tsx` per component/page.
- List page tests in `src/__tests__/listPage/` with shared `helpers.tsx`.
- `renderSentenceWithMask` exported from `src/utils/renderSentence.tsx` for direct unit testing.

## Skaffold Dev Builds

The Dockerfile uses a BuildKit cache mount (`--mount=type=cache,target=/root/.npm`) so `npm install` reuses the package cache across rebuilds. A `.dockerignore` keeps the build context small.

`skaffold.yaml` sets `useBuildkit: true` to ensure BuildKit is active.

## Makefile Targets (frontend)

Use these from the **repo root**:

| Target | Command |
|---|---|
| `make buildFrontend` | `cd frontend && npm install && npm run build` |
| `make updateFrontend` | Upgrade deps via `npm-check-updates -u && npm install` |

## Testing Requirements
- For new or updated functionality add or update tests

## Local Dev
- `npm run dev` (Vite HMR, http://localhost:5173) proxies `/api` and `/actuator` to the backend on :8080. See root README "Local Development".
