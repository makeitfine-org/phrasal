# CLAUDE.md — frontend

## Stack

- React 18, TypeScript (strict), Vite 8
- Tailwind CSS 4 (PostCSS plugin)
- react-router-dom 7
- Vitest, React Testing Library

## Architecture

Multi-page SPA with no global store. State is component-local + localStorage.

### Routing (`src/main.tsx`)

`ErrorBoundary` > `BrowserRouter` > `PageShell` (layout shell with `<Outlet />`) > all routes.

### Component Tree

**Structural:** `PageShell` (dark mode, home button, portal target), `ErrorBoundary`, `VerbPageLayout` (collapsible particle sections + meaning cards, portal for expand-all button).

**Quiz:** `PhrasalVerbQuiz` (receives `allVerbs` + `verbsForBrowse` props), `GrammarQuiz` (receives `entries` props).

**Quiz-shared:** `Header`, `QuizCard`, `Feedback`, `NavigationControls`, `ExcludedModal`, `SearchModal`.

**Other:** `AllVerbsModal`, `TutorialModal`, `ListSearchModal`, `Icons`.

### API Client (`src/api/`)

Native `fetch` wrapper, no external dependencies. Base URL `/api/v1`.

| File | Purpose |
|---|---|
| `client.ts` | `get<T>(path, params?)`, `ApiError` |
| `phrasalVerbsApi.ts` | Fetches phrasal verbs → `VerbEntry[]` + `BrowseVerbEntry[]` |
| `grammarEntriesApi.ts` | Fetches grammar entries by category → `GrammarEntry[]` |
| `verbDetailsApi.ts` | Fetches verb list summaries and full verb detail sections |

### Data-fetching Hooks (`src/hooks/`)

| Hook | Used by |
|---|---|
| `usePhrasalVerbs()` | `App.tsx` |
| `useGrammarEntries(category)` | `IWishPage.tsx` |
| `useVerbList()` | `PhrasalVerbsListPage.tsx` |
| `useVerbDetail(verb)` | `VerbDetailPage.tsx` |

### State Management

No context or global store. State is component-local + localStorage:

| Owner | localStorage key | Manages |
|---|---|---|
| `PageShell` | `phrasalQuizState` → `darkMode` | Dark mode (shared) |
| `PhrasalVerbQuiz` | `phrasalQuizState` | Quiz: mastered, excluded, history, currentIndex |
| `GrammarQuiz` | `grammarIWishState` | Grammar quiz (same shape) |
| `VerbPageLayout` | per-section/meaning keys | Section/meaning expand/collapse |
| `PhrasalVerbsListPage` | `verbListExpanded` | Verb list card expand/collapse |

`PageShell` and `PhrasalVerbQuiz` share `phrasalQuizState`. `PhrasalVerbQuiz` preserves fields it doesn't own (like `darkMode`) by merging before writing.

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
- No external state management libraries — component-local state + localStorage only

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
