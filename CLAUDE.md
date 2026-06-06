# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build locally
npm test          # Vitest in watch mode
npm run test:run  # Vitest one-shot (CI)
```

## Architecture

Single-page React + TypeScript app (Vite + Tailwind). All state lives in `App.tsx` and is persisted to `localStorage` under the key `phrasalQuizState`.

**Data flow:** `phrasalVerbs.ts` → `App.tsx` (state + handlers) → props down to `Header`, `QuizCard`, `Feedback`, `NavigationControls`, `ExcludedModal`, `SearchModal`. No context or global store.

### Shared types (`src/types.ts`)

| Type | Shape | Notes |
|---|---|---|
| `Status` | `'idle' \| 'correct' \| 'wrong'` | Card answer state |
| `HistoryItem` | `{ index, inputValue, status }` | One card in navigation history |
| `RawVerbEntry` | 5-tuple `[verb, def, sentence\|string[], wordsToHide[], isLearned]` | Source data shape |
| `VerbEntry` | `{ verb, definition, sentences, wordsToHide }` | Normalized quiz entry |

### Key state shape (`App.tsx`)

| State | Type | Notes |
|---|---|---|
| `mastered` | `Set<number>` | Indices of correctly answered verbs |
| `excluded` | `Set<number>` | Indices excluded from the quiz pool |
| `history` | `HistoryItem[]` | All cards shown this session, in order |
| `currentIndex` | `number` | Pointer into `history` (enables back navigation) |
| `darkMode` | `boolean` | Synced to `dark` class on `<html>` |

### Verb data format (`src/data/phrasalVerbs.ts`)

Each entry in `rawData` is typed as `RawVerbEntry` (5-element tuple):

```ts
[verb, definition, exampleSentence, wordsToHide, isLearned]
//  0        1             2               3           4
```

`allVerbs: VerbEntry[]` is `rawData` filtered to `isLearned === false` and normalized (sentences always `string[]`). Setting the 5th field to `true` removes a verb from the active quiz pool.

`wordsToHide` (index 3) drives `renderSentenceWithMask` in `src/utils/renderSentence.tsx`, which splits the sentence on a case-insensitive regex (longest match first) and renders matched tokens as clickable masked spans.

### Answer checking

Comparison is case-insensitive with parentheses stripped: `cleanUser === cleanCorrect` (both lowercased, trimmed, `[()]` removed).

## Tests

Vitest + `@testing-library/react`. Test files live in `src/__tests__/`. The setup file is `src/__tests__/setup.ts` (jest-dom matchers, `scrollIntoView` stub, localStorage mock).

`renderSentenceWithMask` is exported from `src/utils/renderSentence.tsx` (extracted from `App.tsx`) so it can be unit tested directly.

## Workflow Defaults

- Plan mode for any task with 3+ steps or an architectural decision
- Use **Context7 MCP** proactively for library/API docs — don't wait to be asked
- Commits: semantic message ≤ 80 chars, no `Co-Authored-By` trailer
- When compacting, always preserve the full list of modified files and any test commands
- Don't change docs/blackbox/archive-*.md files
- Don't delete anything from docs/blackbox/plans folder

## Delivery Checklist

Before marking any task done:
1. On adding/modifing/removing any codebase files you **must** always check out all tests pass (`npm run test:run`) on completion.
2. Every backlog.md task Acceptance Criteria **must** include `npm run test:run` passes
3. Every backlog.md task which extend/modify existence codebase/functionality **must** always extend/modify tests for it.


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
