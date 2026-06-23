# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Frontend (from frontend/)
cd frontend && npm run dev       # dev server at http://localhost:5173
cd frontend && npm run build     # production build → dist/
cd frontend && npm test          # Vitest in watch mode
cd frontend && npm run test:run  # Vitest one-shot (CI)

# Backend (from backend/, requires Java 21)
cd backend && JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 mvn clean verify

# Full stack (from root)
make build        # build all + docker + e2e
make dockerAll    # build + docker compose up (foreground)
make dockerDown   # stop containers
make help         # show all Makefile targets
```

## Project Structure

Monorepo with three modules:
- **`frontend/`** — React 18 + TypeScript SPA (Vite, Tailwind, react-router-dom v7)
- **`backend/`** — Java 21 + Spring Boot 3.4 + PostgreSQL REST API (Maven, Flyway, MapStruct, Lombok)
- **`e2e/`** — Cucumber.js + Playwright acceptance tests

Root files: `Makefile`, `docker-compose.yml`, `.env`, `.github/workflows/ci.yml`

## Architecture

### Backend

Java 21 + Spring Boot 3.4.1 REST API. Clean architecture layers under `net.phrasal`:

| Layer | Package | Contents |
|---|---|---|
| Domain | `domain.entity` | `PhrasalVerb`, `GrammarEntry`, `VerbDetail` (JPA entities, JSONB columns, Lombok `@Getter`/`@Setter`/`@EqualsAndHashCode(of=...)`) |
| Domain | `domain.repository` | Spring Data JPA repos with `@Query` search/filter |
| Application | `application.dto` | Java 21 records (request with validation annotations, response immutable) |
| Application | `application.mapper` | MapStruct interfaces (`componentModel = "spring"`, with `lombok-mapstruct-binding`) |
| Application | `application.service` | `@Service @Transactional`, Lombok `@RequiredArgsConstructor`, SLF4J logging |
| Infrastructure | `infrastructure.exception` | `@RestControllerAdvice` with RFC 7807 ProblemDetail, SLF4J logging |
| Presentation | `presentation.rest` | Versioned REST controllers at `/api/v1/phrasal-verbs`, `/api/v1/grammar-entries`, and `/api/v1/verb-details` (`@Validated`, Location headers) |
| Config | `config` | `JpaAuditingConfig`, `WebMvcConfig` (CORS) |

Database: PostgreSQL (`phrasaldb`), Flyway migrations in `backend/src/main/resources/db/migration/`.
Testing: JUnit 5 + Testcontainers + JaCoCo (85% min line coverage).

### Frontend

Multi-page React 18 + TypeScript app (Vite, Tailwind, react-router-dom v7).

### Routing (`frontend/src/main.tsx`)

`ErrorBoundary` > `BrowserRouter` > `PageShell` (layout shell with `<Outlet />`) > all routes:

| Path | Component | Purpose |
|---|---|---|
| `/` | `HomePage` | Choose exercise type |
| `/phrasal-verbs` | `PhrasalVerbsPage` | Choose quiz, list, or particles |
| `/phrasal-verbs/test-most-popular` | `App` | Phrasal verbs fill-in-the-blank quiz |
| `/phrasal-verbs/particles` | `ParticlesPage` | Reference: 27 particle core meanings |
| `/phrasal-verbs/list` | `PhrasalVerbsListPage` | Browse all verbs as expandable cards |
| `/phrasal-verbs/list/:verb` | `VerbDetailPage` | Dynamic verb detail page (fetches from API) |
| `/grammar` | `GrammarPage` | Choose grammar exercise |
| `/grammar/i-wish-if-only` | `IWishPage` | Translation quiz (Russian → English) |
| `*` | `NotFoundPage` | 404 |

### Component tree

**Structural components:**
- **`PageShell`** (`frontend/src/components/PageShell.tsx`) — wraps all routes via `<Outlet />`. Owns dark mode toggle (reads/writes `darkMode` in `phrasalQuizState` localStorage), home button, and `#verb-page-actions` portal target used by verb pages for the expand-all button.
- **`ErrorBoundary`** (`frontend/src/components/ErrorBoundary.tsx`) — class component wrapping everything.
- **`VerbPageLayout`** (`frontend/src/components/VerbPage.tsx`) — reusable layout for verb detail pages. Renders collapsible particle sections, each with collapsible meaning cards. Exports `VerbPageLayout`, `MeaningData`, `SectionData`. Uses `ReactDOM.createPortal` to render expand-all button into PageShell's `#verb-page-actions` div.

**Quiz components:**
- **`PhrasalVerbQuiz`** (`frontend/src/components/PhrasalVerbQuiz.tsx`) — phrasal verb quiz UI. Receives `allVerbs` and `verbsForBrowse` as props from `App`.
- **`GrammarQuiz`** (`frontend/src/components/GrammarQuiz.tsx`) — grammar quiz UI. Receives `entries` as props from `IWishPage`.

**Quiz-shared components** (used by both `PhrasalVerbQuiz` and `GrammarQuiz`): `Header`, `QuizCard`, `Feedback`, `NavigationControls`, `ExcludedModal`, `SearchModal`.

**Other components:** `AllVerbsModal` (phrasal quiz browse), `TutorialModal` (grammar quiz), `ListSearchModal` (verb list search across all meanings), `Icons` (SVG icon components).

### API client (`frontend/src/api/`)

Frontend fetches quiz data from the backend REST API on mount. Native `fetch` wrapper, no external dependencies.

| File | Exports | Purpose |
|---|---|---|
| `client.ts` | `get<T>(path, params?)`, `ApiError` | Typed fetch wrapper, base URL `/api/v1` |
| `phrasalVerbsApi.ts` | `fetchPhrasalVerbs()` | Fetches all phrasal verbs, maps to `VerbEntry[]` + `BrowseVerbEntry[]` |
| `grammarEntriesApi.ts` | `fetchGrammarEntries(category)` | Fetches grammar entries by category, maps to `GrammarEntry[]` |
| `verbDetailsApi.ts` | `fetchVerbList()`, `fetchVerbDetail(verb)` | Fetches verb list summaries and full verb detail sections |

### Data-fetching hooks (`frontend/src/hooks/`)

| Hook | Returns | Used by |
|---|---|---|
| `usePhrasalVerbs()` | `{ allVerbs, verbsForBrowse, loading, error }` | `App.tsx` |
| `useGrammarEntries(category)` | `{ entries, loading, error }` | `IWishPage.tsx` |
| `useVerbList()` | `{ verbs: VerbListItem[], loading, error }` | `PhrasalVerbsListPage.tsx` |
| `useVerbDetail(verb)` | `{ title, sections: SectionData[], loading, error }` | `VerbDetailPage.tsx` |

`App` and `IWishPage` render loading/error states, then delegate to `PhrasalVerbQuiz` / `GrammarQuiz` once data is available. `PhrasalVerbsListPage` and `VerbDetailPage` similarly fetch verb data from the backend.

### State management

No context or global store. State is component-local + localStorage:

| Owner | localStorage key | Manages |
|---|---|---|
| `PageShell` | `phrasalQuizState` → `darkMode` field | Dark mode (shared across all pages) |
| `PhrasalVerbQuiz` | `phrasalQuizState` | Phrasal quiz: mastered, excluded, history, currentIndex |
| `GrammarQuiz` | `grammarIWishState` | Grammar quiz: same shape as phrasal quiz |
| `VerbPageLayout` | per-section/meaning keys | Section and meaning expand/collapse |
| `PhrasalVerbsListPage` | `verbListExpanded` | Verb list card expand/collapse |

`PageShell` and `PhrasalVerbQuiz` share the `phrasalQuizState` key. `PhrasalVerbQuiz` preserves fields it doesn't own (like `darkMode`) by merging with existing data before writing.

### Shared types (`frontend/src/types.ts`)

| Type | Shape | Notes |
|---|---|---|
| `Status` | `'idle' \| 'correct' \| 'wrong'` | Card answer state |
| `HistoryItem` | `{ index, inputValue, status }` | One card in navigation history |
| `RawVerbEntry` | 5-tuple `[verb, def, sentence\|string[], wordsToHide[], isLearned]` | Source data shape |
| `VerbEntry` | `{ verb, definition, sentences, wordsToHide }` | Normalized quiz entry |
| `BrowseVerbEntry` | `VerbEntry & { quizIndex?: number }` | For AllVerbsModal browse view |
| `GrammarEntry` | `{ sentence, correctAnswers: string[] }` | Grammar translation exercise |

### Data files (`frontend/src/data/`)

Static reference data (not consumed by quizzes — quizzes fetch from backend API):

- **`phrasalVerbs.ts`** — `rawData: RawVerbEntry[]`. Exports `allVerbs`, `allVerbsWithLearned`, `verbsForBrowse`. Retained as reference/seed data; quizzes use `usePhrasalVerbs()` hook instead.
- **`wishData.ts`** — `wishData: GrammarEntry[]`. Retained as reference; quizzes use `useGrammarEntries()` hook instead.
- **`listVerbIndex.ts`** — async `fetchListVerbIndex()` fetches all verb details from `GET /verb-details/all`, builds a flat searchable index, and caches the result. Exports `ListSearchEntry` type. Used by `ListSearchModal`.

### Verb data format (`frontend/src/data/phrasalVerbs.ts`)

Each entry in `rawData` is typed as `RawVerbEntry` (5-element tuple):

```ts
[verb, definition, exampleSentence, wordsToHide, isLearned]
//  0        1             2               3           4
```

Setting the 5th field to `true` removes a verb from `allVerbs` (the active quiz pool).

`wordsToHide` (index 3) drives `renderSentenceWithMask` in `frontend/src/utils/renderSentence.tsx`, which splits the sentence on a case-insensitive regex (longest match first) and renders matched tokens as clickable masked spans.

### Answer checking

- **Phrasal quiz** (`PhrasalVerbQuiz`): case-insensitive, parentheses stripped — `cleanUser === cleanCorrect`.
- **Grammar quiz** (`GrammarQuiz`): uses `isAnswerCorrect()` from `frontend/src/utils/normalizeAnswer.ts` — lowercases, trims, strips non-word/space chars, collapses whitespace, then checks against all `correctAnswers`.

### Adding a new verb

Verb data is stored in the `verb_details` database table. To add a new verb:

1. Create a Flyway migration inserting the new row with `verb` (slug), `label` (display name), `particles` (JSONB array), and `sections` (JSONB array of `{particle, storageKeyPrefix, meanings: [{definition, example, imageSrc, imageAlt}]}`)
2. No frontend changes needed — the dynamic `VerbDetailPage` and `PhrasalVerbsListPage` fetch from the API automatically

## Tests

Vitest + `@testing-library/react`. Setup file: `frontend/src/__tests__/setup.ts` (jest-dom matchers, `scrollIntoView` stub, localStorage mock).

Test files live in `frontend/src/__tests__/`. One `.test.tsx` per component/page. List page tests are in `frontend/src/__tests__/listPage/` with a shared `helpers.tsx` that mocks `useVerbList` and provides particle constants.

`renderSentenceWithMask` is exported from `frontend/src/utils/renderSentence.tsx` so it can be unit tested directly.

## Workflow Defaults

- Plan mode for any task with 3+ steps or an architectural decision
- Use **Context7 MCP** proactively for library/API docs — don't wait to be asked
- CRITICAL: Commits: semantic message ≤ 80 chars; DO NOT add `Co-Authored-By` trailer
- When compacting, always preserve the full list of modified files and any test commands
- Don't change docs/blackbox/archive-*.md files
- Don't delete anything from docs/blackbox/plans folder

## Delivery Checklist

Before marking any task done:
1. On adding/modifying/removing any codebase files you **must** always check that all tests pass on completion:
   - Frontend: `cd frontend && npm run test:run`
   - Backend: `cd backend && JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 mvn clean verify`
2. Every backlog.md task Acceptance Criteria **must** include relevant test suites passing
3. Every backlog.md task which extend/modify existing codebase/functionality **must** always extend/modify tests for it.


<!-- BACKLOG.MD MCP GUIDELINES START -->

<CRITICAL_INSTRUCTION>

## BACKLOG WORKFLOW INSTRUCTIONS

This project uses Backlog.md MCP for all task and project management activities.

**CRITICAL GUIDANCE**

- **Task execution**: When asked to work on or complete a backlog task, move it to `in progress` status IMMEDIATELY — before writing any code or taking any implementation steps.

- If your client supports MCP resources, read `backlog://workflow/overview` to understand when and how to use Backlog for this project.
- If your client only supports tools or the above request fails, call `backlog.get_backlog_instructions()` to load the tool-oriented overview. Use the `instruction` selector when you need `task-creation`, `task-execution`, or `task-finalization`.

- **First time working here?** Read the overview resource IMMEDIATELY to learn the workflow
- **Already familiar?** You should have the overview cached ("## Backlog.md Overview (MCP)")
- **When to read it**: BEFORE creating tasks, or when you're unsure whether to track work

These guides cover:
- Decision framework for when to create tasks
- Search-first workflow to avoid duplicates
- Links to detailed guides for task creation, execution, and finalization
- MCP tools reference

You MUST read the overview resource to understand the complete workflow. The information is NOT summarized here.

</CRITICAL_INSTRUCTION>

<!-- BACKLOG.MD MCP GUIDELINES END -->
