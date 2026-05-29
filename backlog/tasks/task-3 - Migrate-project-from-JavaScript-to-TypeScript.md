---
id: TASK-3
title: Migrate project from JavaScript to TypeScript
status: To Do
assignee: []
created_date: '2026-05-29 11:19'
labels:
  - tech-debt
  - tooling
dependencies: []
priority: medium
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Convert the Vite + React SPA to TypeScript end to end — add TS tooling, rename `.jsx`→`.tsx` and `.js`→`.ts`, and add types — while keeping the app and full test suite green.

## Implementation Notes

**Migration order:** data/util (`phrasalVerbs.ts`, `renderSentence.tsx`) → components → `App.tsx` → `main.tsx` → tests → configs.

**Setup first:** add deps + `tsconfig.json`/`tsconfig.node.json`; verify `tsc --noEmit` runs before renaming any files.

**Rename strategy:** use `git mv` to preserve history, then fix all import extensions in one pass.

**Types:** define shared types in a new `src/types.ts` (or co-locate per component); reuse the 5-tuple shape documented in CLAUDE.md for `rawData`.

**Tighten incrementally:** get it compiling without `strict` first, then enable `strict: true` and resolve all errors.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 TypeScript tooling added: `typescript` + `@types/react` + `@types/react-dom` + `@types/node` devDeps, and a `tsconfig.json` (+ `tsconfig.node.json`) configured for Vite/React (`jsx: react-jsx`, `moduleResolution: bundler`, `strict: true`).
- [ ] #2 All component/entry/util files renamed to `.tsx`; pure-logic/data files renamed to `.ts` (e.g. `phrasalVerbs.js` → `phrasalVerbs.ts`); test files renamed to `.test.tsx` / `.test.ts`.
- [ ] #3 Config files migrated to TS where supported (`vite.config.ts`); `tailwind.config.js` / `postcss.config.js` updated (Tailwind content glob extended to `{ts,tsx}`).
- [ ] #4 Core domain types introduced: `HistoryItem` (`{ index, inputValue, status }`), `VerbEntry` / the `rawData` 5-tuple shape, and component prop interfaces for all 7 components in `src/components/`.
- [ ] #5 `App` state typed: `mastered` / `excluded` as `Set<number>`, `currentIndex: number`, `darkMode: boolean`, `history: HistoryItem[]`.
- [ ] #6 `index.html` script `src` updated to `main.tsx`; all relative import extensions updated throughout.
- [ ] #7 `npm run build` succeeds and `tsc --noEmit` reports zero type errors under `strict: true`.
- [ ] #8 `npm run test:run` passes (Vitest already resolves `.tsx` / `.ts`; `setup.js` → `setup.ts`).
- [ ] #9 CLAUDE.md updated to reflect TS file extensions and the data/type model.
<!-- AC:END -->
