# Plan: Create a Backlog.md task for JS → TS migration

## Context
The user wants a tracked Backlog.md task (created, **not executed**) describing the migration of this
project from JavaScript to TypeScript, including renaming `.jsx` → `.tsx` and `.js` → `.ts`.

The repo is a small Vite + React 18 + Tailwind SPA with no existing TS tooling:
- Entry: `src/main.jsx`, `src/App.jsx`
- Components: `src/components/*.jsx` (7 files)
- Util: `src/utils/renderSentence.jsx`
- Data: `src/data/phrasalVerbs.js`
- Tests: `src/__tests__/*.{jsx,js}` + `setup.js`
- Configs: `vite.config.js`, `postcss.config.js`, `tailwind.config.js`

A `task_search` for "typescript" / "migration tsx" returned no existing tasks, so this is not a duplicate.

## Deliverable
A single Backlog.md task via `mcp__backlog__task_create` capturing the migration scope. **No source
code changes** — the migration itself is deferred until the task is later executed.

## Task content to create

**Title:** Migrate project from JavaScript to TypeScript

**Description:** Convert the Vite + React SPA to TypeScript end to end — add TS tooling, rename
`.jsx`→`.tsx` and `.js`→`.ts`, and add types — while keeping the app and full test suite green.

**Acceptance Criteria:**
1. TypeScript tooling added: `typescript` + `@types/react` + `@types/react-dom` + `@types/node` devDeps, and a `tsconfig.json` (+ `tsconfig.node.json`) configured for Vite/React (`jsx: react-jsx`, `moduleResolution: bundler`, `strict: true`).
2. All component/entry/util files renamed to `.tsx`; pure-logic/data files renamed to `.ts` (e.g. `phrasalVerbs.js` → `.ts`); test files renamed to `.test.tsx`/`.test.ts`.
3. Config files migrated to TS where supported (`vite.config.ts`); `tailwind.config.js`/`postcss.config.js` updated (Tailwind content glob extended to `{ts,tsx}`).
4. Core domain types introduced: `HistoryItem` (`{ index, inputValue, status }`), `VerbEntry` / the `rawData` tuple shape, and component prop interfaces for `Header`, `QuizCard`, `Feedback`, `NavigationControls`, `ExcludedModal`, `SearchModal`.
5. `App.jsx` state typed: `mastered`/`excluded` as `Set<number>`, `currentIndex: number`, `darkMode: boolean`, `history: HistoryItem[]`.
6. `index.html` script `src` updated to `main.tsx`; all relative import extensions updated.
7. `npm run build` succeeds and `tsc --noEmit` reports zero type errors under `strict: true`.
8. `npm run test:run` passes (Vitest already resolves `.tsx`/`.ts`; `setup.js` → `setup.ts`).
9. CLAUDE.md updated to reflect TS file extensions and the new data/type model.

**Implementation Plan (notes on the task):**
- Add deps + `tsconfig.json`/`tsconfig.node.json` first; verify `tsc --noEmit` runs.
- Rename leaf files before importers, or rename all then fix imports in one pass (`git mv` to preserve history).
- Migration order: data/util (`phrasalVerbs.ts`, `renderSentence.tsx`) → components → `App.tsx` → `main.tsx` → tests → configs.
- Define shared types in a new `src/types.ts` (or co-locate per component); reuse the tuple shape documented in CLAUDE.md for `rawData`.
- Tighten incrementally: get it compiling loosely, then enable `strict` and resolve.

**Labels:** `tech-debt`, `tooling`
**Priority:** medium
**Status:** To Do

## Verification (of task creation, not the migration)
- After approval, run `mcp__backlog__task_create` with the above content.
- Confirm with `mcp__backlog__task_view` that the task exists with the acceptance criteria attached.
- Do **not** modify any source files.