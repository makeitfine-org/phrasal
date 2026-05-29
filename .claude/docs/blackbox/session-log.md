# Blackbox — Session Log
# Append-only. See .claude/rules/blackbox-policy.md

<!-- git-snapshot 2026-05-29T08:10:04Z -->
- .claude/docs/blackbox/audit.md
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T08:13:30Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T08:18:52Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- src/__tests__/phrasalVerbs.test.js
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T08:34:31Z -->
- .claude/docs/blackbox/audit.md
- src/__tests__/__snapshots__/phrasalVerbs.test.js.snap
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T08:35:59Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- src/__tests__/__snapshots__/phrasalVerbs.test.js.snap
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T08:38:11Z -->
- .claude/docs/blackbox/audit.md
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T08:44:23Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- package.json
- src/__tests__/__snapshots__/phrasalVerbs.test.js.snap
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T08:52:28Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- .claude/settings.local.json
- src/__tests__/__snapshots__/phrasalVerbs.test.js.snap
- src/__tests__/phrasalVerbs.test.js
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T08:56:50Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- .claude/settings.local.json
- src/__tests__/__fixtures__/phrasalVerbs.json
- src/__tests__/__snapshots__/phrasalVerbs.test.js.snap
- src/__tests__/phrasalVerbs.test.js
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T09:00:37Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- .claude/settings.local.json
- src/__tests__/__fixtures__/phrasalVerbs.json
- src/__tests__/__snapshots__/phrasalVerbs.test.js.snap
- src/__tests__/phrasalVerbs.test.js
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T09:03:34Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- .claude/settings.local.json
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T09:24:53Z -->
- .claude/docs/blackbox/audit.md
- src/data/phrasalVerbs.js
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T09:32:25Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- src/__tests__/__fixtures__/phrasalVerbs.json
- src/__tests__/phrasalVerbs.test.js
- src/data/phrasalVerbs.js
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T09:34:19Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T10:14:11Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- src/__tests__/__fixtures__/phrasalVerbs.json
- src/__tests__/phrasalVerbs.test.js
- src/data/phrasalVerbs.js
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T10:35:02Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- src/__tests__/__fixtures__/phrasalVerbs.json
- src/__tests__/phrasalVerbs.test.js
- src/data/phrasalVerbs.js
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T10:37:02Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T10:48:02Z -->
- .claude/docs/blackbox/audit.md
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T10:50:56Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T11:00:50Z -->
- .claude/docs/blackbox/audit.md
- src/App.jsx
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T11:08:38Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- src/App.jsx
- src/__tests__/App.test.jsx
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T11:19:45Z -->
- .claude/docs/blackbox/audit.md
<!-- end-snapshot -->

## 2026-05-29T13:55:00Z
### Decisions
- TASK-3 executed: full JS→TS migration (both sessions combined)
- Used `vitest/config` (not `vite`) in `vite.config.ts` to type the `test` property
- Added `src/vite-env.d.ts` for CSS side-effect import typing
- React 19 `useRef` returns `RefObject<T | null>` — propagated to `QuizCardProps.inputRef`
- Shared domain types centralised in `src/types.ts` (Status, HistoryItem, RawVerbEntry, VerbEntry)
### Constraints Stated by User
- None
### Files Modified
- tsconfig.json, tsconfig.node.json — new TypeScript config files
- src/types.ts — new shared domain types
- src/vite-env.d.ts — Vite client type reference (CSS import support)
- src/*.tsx, src/components/*.tsx, src/utils/*.tsx, src/data/*.ts, src/__tests__/*.tsx/.ts — all sources renamed and typed
- vite.config.ts, tailwind.config.js, index.html, CLAUDE.md — config/docs updated for TS
### Deferred
- None
---

<!-- git-snapshot 2026-05-29T13:56:40Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- .claude/settings.local.json
- CLAUDE.md
- backlog/tasks/task-3 - Migrate-project-from-JavaScript-to-TypeScript.md
- index.html
- package-lock.json
- package.json
- src/App.tsx
- src/__tests__/App.test.tsx
- src/__tests__/ExcludedModal.test.tsx
- src/__tests__/Feedback.test.tsx
- src/__tests__/Header.test.tsx
- src/__tests__/NavigationControls.test.tsx
- src/__tests__/QuizCard.test.tsx
- src/__tests__/SearchModal.test.tsx
- src/__tests__/phrasalVerbs.test.ts
- src/__tests__/renderSentence.test.tsx
- src/__tests__/setup.js
- src/__tests__/setup.ts
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T13:58:27Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- .claude/settings.local.json
- CLAUDE.md
- backlog/tasks/task-3 - Migrate-project-from-JavaScript-to-TypeScript.md
- index.html
- package-lock.json
- package.json
- src/App.tsx
- src/__tests__/App.test.tsx
- src/__tests__/ExcludedModal.test.tsx
- src/__tests__/Feedback.test.tsx
- src/__tests__/Header.test.tsx
- src/__tests__/NavigationControls.test.tsx
- src/__tests__/QuizCard.test.tsx
- src/__tests__/SearchModal.test.tsx
- src/__tests__/phrasalVerbs.test.ts
- src/__tests__/renderSentence.test.tsx
- src/__tests__/setup.js
- src/__tests__/setup.ts
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T13:59:38Z -->
- .claude/docs/blackbox/audit.md
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T15:00:33Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/plans/2026-05-29 16:50 Plan Add Routing Home Page English Tutorial.md
- index.html
- package-lock.json
- package.json
- src/main.tsx
- src/pages/HomePage.tsx
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T15:03:54Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T15:14:31Z -->
- .claude/docs/blackbox/audit.md
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T15:39:39Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- CLAUDE.md
- backlog/tasks/task-4 - Shared-layout-routing-tests-and-theme-toggle.md
- src/App.tsx
- src/__tests__/App.test.tsx
- src/__tests__/Header.test.tsx
- src/components/Header.tsx
- src/main.tsx
- src/pages/HomePage.tsx
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T15:46:47Z -->
- .claude/docs/blackbox/audit.md
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T15:48:56Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T15:49:48Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- backlog/tasks/task-4 - Shared-layout-routing-tests-and-theme-toggle.md
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T15:51:22Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- backlog/tasks/task-1 - Extend-phrasalVerbs.js-with-new-entries-and-meanings-from-provided-data.md
- backlog/tasks/task-2 - Align-all-phrasalVerbs.js-entries-with-canonical-reference-data-sentences.md
- backlog/tasks/task-4 - Shared-layout-routing-tests-and-theme-toggle.md
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T16:30:02Z -->
- .claude/docs/blackbox/audit.md
- CLAUDE.md
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T16:37:11Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- CLAUDE.md
- src/components/ExcludedModal.tsx
- src/components/Header.tsx
- src/components/NavigationControls.tsx
- src/components/PageShell.tsx
- src/components/QuizCard.tsx
- src/components/SearchModal.tsx
- src/index.css
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T16:44:53Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- CLAUDE.md
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T16:51:39Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- CLAUDE.md
- src/__tests__/ExcludedModal.test.tsx
- src/__tests__/Header.test.tsx
- src/__tests__/NavigationControls.test.tsx
- src/__tests__/PageShell.test.tsx
- src/__tests__/QuizCard.test.tsx
- src/__tests__/SearchModal.test.tsx
- src/components/ExcludedModal.tsx
- src/components/Header.tsx
- src/components/NavigationControls.tsx
- src/components/PageShell.tsx
- src/components/QuizCard.tsx
- src/components/SearchModal.tsx
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T17:00:53Z -->
- .claude/docs/blackbox/audit.md
- index.html
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T17:04:59Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- index.html
- public/favicon.svg
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T17:08:54Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- CLAUDE.md
- index.html
- public/favicon.svg
- src/__tests__/favicon.test.ts
- tsconfig.json
<!-- end-snapshot -->

<!-- git-snapshot 2026-05-29T17:09:58Z -->
- .claude/docs/blackbox/audit.md
- .claude/docs/blackbox/session-log.md
- CLAUDE.md
<!-- end-snapshot -->
