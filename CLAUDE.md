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
- **`backend/`** — Java 21 + Spring Boot 3.4 + PostgreSQL REST API (Maven, Flyway, MapStruct)
- **`e2e/`** — Cucumber.js + Playwright acceptance tests

Root files: `Makefile`, `docker-compose.yml`, `.env`, `.github/workflows/ci.yml`

## Architecture

### Backend

Java 21 + Spring Boot 3.4.1 REST API. Clean architecture layers under `net.phrasal`:

| Layer | Package | Contents |
|---|---|---|
| Domain | `domain.entity` | `PhrasalVerb`, `GrammarEntry` (JPA entities, JSONB columns) |
| Domain | `domain.repository` | Spring Data JPA repos with `@Query` search/filter |
| Application | `application.dto` | Request/Response classes (validation annotations, no Lombok) |
| Application | `application.mapper` | MapStruct interfaces (`componentModel = "spring"`) |
| Application | `application.service` | `@Service @Transactional`, constructor injection |
| Infrastructure | `infrastructure.exception` | `@RestControllerAdvice` with RFC 7807 ProblemDetail |
| Presentation | `presentation.rest` | REST controllers at `/api/phrasal-verbs` and `/api/grammar-entries` |
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
| `/phrasal-verbs/list/:verb` | `{Verb}VerbPage` | Individual verb detail (71 verbs) |
| `/grammar` | `GrammarPage` | Choose grammar exercise |
| `/grammar/i-wish-if-only` | `IWishPage` | Translation quiz (Russian → English) |
| `*` | `NotFoundPage` | 404 |

### Component tree

**Structural components:**
- **`PageShell`** (`frontend/src/components/PageShell.tsx`) — wraps all routes via `<Outlet />`. Owns dark mode toggle (reads/writes `darkMode` in `phrasalQuizState` localStorage), home button, and `#verb-page-actions` portal target used by verb pages for the expand-all button.
- **`ErrorBoundary`** (`frontend/src/components/ErrorBoundary.tsx`) — class component wrapping everything.
- **`VerbPageLayout`** (`frontend/src/components/VerbPage.tsx`) — reusable layout for verb detail pages. Renders collapsible particle sections, each with collapsible meaning cards. Exports `VerbPageLayout`, `MeaningData`, `SectionData`. Uses `ReactDOM.createPortal` to render expand-all button into PageShell's `#verb-page-actions` div.

**Quiz-shared components** (used by both `App` and `IWishPage`): `Header`, `QuizCard`, `Feedback`, `NavigationControls`, `ExcludedModal`, `SearchModal`.

**Other components:** `AllVerbsModal` (phrasal quiz browse), `TutorialModal` (grammar quiz), `ListSearchModal` (verb list search across all meanings), `Icons` (SVG icon components).

### State management

No context or global store. State is component-local + localStorage:

| Owner | localStorage key | Manages |
|---|---|---|
| `PageShell` | `phrasalQuizState` → `darkMode` field | Dark mode (shared across all pages) |
| `App` | `phrasalQuizState` | Phrasal quiz: mastered, excluded, history, currentIndex |
| `IWishPage` | `grammarIWishState` | Grammar quiz: same shape as phrasal quiz |
| `VerbPageLayout` | per-section/meaning keys | Section and meaning expand/collapse |
| `PhrasalVerbsListPage` | `verbListExpanded` | Verb list card expand/collapse |

`PageShell` and `App` share the `phrasalQuizState` key. `App` preserves fields it doesn't own (like `darkMode`) by merging with existing data before writing.

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

- **`phrasalVerbs.ts`** — `rawData: RawVerbEntry[]`. Exports `allVerbs: VerbEntry[]` (filtered to `isLearned === false`), `allVerbsWithLearned: VerbEntry[]` (all entries), and `verbsForBrowse: BrowseVerbEntry[]`.
- **`wishData.ts`** — `wishData: GrammarEntry[]` (Russian sentences → English translations).
- **`listVerbIndex.ts`** — builds a flat searchable index from all verb page `sections` exports. Exports `ListSearchEntry` type and `listVerbIndex` array. Used by `ListSearchModal`.

### Verb data format (`frontend/src/data/phrasalVerbs.ts`)

Each entry in `rawData` is typed as `RawVerbEntry` (5-element tuple):

```ts
[verb, definition, exampleSentence, wordsToHide, isLearned]
//  0        1             2               3           4
```

Setting the 5th field to `true` removes a verb from `allVerbs` (the active quiz pool).

`wordsToHide` (index 3) drives `renderSentenceWithMask` in `frontend/src/utils/renderSentence.tsx`, which splits the sentence on a case-insensitive regex (longest match first) and renders matched tokens as clickable masked spans.

### Answer checking

- **Phrasal quiz** (`App.tsx`): case-insensitive, parentheses stripped — `cleanUser === cleanCorrect`.
- **Grammar quiz** (`IWishPage`): uses `isAnswerCorrect()` from `frontend/src/utils/normalizeAnswer.ts` — lowercases, trims, strips non-word/space chars, collapses whitespace, then checks against all `correctAnswers`.

### Adding a new verb page

1. Create `frontend/src/pages/{verb}/{Verb}VerbPage.tsx`
2. Define `MeaningData[]` arrays per particle, then export `sections: SectionData[]`
3. Default export renders `<VerbPageLayout title="Verb" sections={sections} />`
4. Add route in `frontend/src/main.tsx`
5. Add `VERBS` entry + particle constant in `frontend/src/pages/PhrasalVerbsListPage.tsx`
6. Add import + `buildEntries()` call in `frontend/src/data/listVerbIndex.ts`
7. Add tests in `frontend/src/__tests__/{verb}_verb_page/` — create `helpers.tsx` using `createVerbPageHelpers()` from `frontend/src/__tests__/verbPage/helpers.tsx`

## Tests

Vitest + `@testing-library/react`. Setup file: `frontend/src/__tests__/setup.ts` (jest-dom matchers, `scrollIntoView` stub, localStorage mock).

Test files live in `frontend/src/__tests__/`. One `.test.tsx` per component/page. Verb page tests are in subdirectories `frontend/src/__tests__/{verb}_verb_page/` — each has a `helpers.tsx` that calls `createVerbPageHelpers()` from `frontend/src/__tests__/verbPage/helpers.tsx`, plus per-particle test files.

`renderSentenceWithMask` is exported from `frontend/src/utils/renderSentence.tsx` so it can be unit tested directly.

## Workflow Defaults

- Plan mode for any task with 3+ steps or an architectural decision
- Use **Context7 MCP** proactively for library/API docs — don't wait to be asked
- Commits: semantic message ≤ 80 chars, no `Co-Authored-By` trailer
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
