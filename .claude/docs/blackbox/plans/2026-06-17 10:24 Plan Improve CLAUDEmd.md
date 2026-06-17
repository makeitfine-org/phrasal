# Plan: Improve CLAUDE.md

## Context

The current CLAUDE.md is significantly outdated. It describes the app as a "single-page React + TypeScript app" with state living entirely in `App.tsx`, but the project has evolved into a multi-page app with react-router-dom v7, 71 verb detail pages, a grammar section, multiple layout components, and distributed state management across several localStorage keys. A new developer (or Claude Code) reading the current doc would get a misleading picture of the architecture.

## Changes to CLAUDE.md

### Rewrite the Architecture section

**Opening line**: Change from "Single-page React + TypeScript app" to "Multi-page React 18 + TypeScript app (Vite, Tailwind, react-router-dom v7)" and note the `/phrasal/` base path.

**Add routing table** (`src/main.tsx`): Document all route groups — home, phrasal-verbs hub/quiz/particles/list/verb-pages, grammar hub/i-wish, 404. Mention that `ErrorBoundary` > `BrowserRouter` > `PageShell` > `Outlet` is the wrapping structure.

**Rewrite component tree**: Focus on the three structural components that need documentation:
- `PageShell` — layout wrapper, owns dark mode, home button, `#verb-page-actions` portal target
- `ErrorBoundary` — class component wrapping everything
- `VerbPageLayout` (`src/components/VerbPage.tsx`) — reusable verb detail layout. Exports `MeaningData`, `SectionData`. Uses portal for expand-all.

List the quiz-shared components (Header, QuizCard, Feedback, etc.) plus newer ones (AllVerbsModal, TutorialModal, ListSearchModal, Icons) as a group.

**Rewrite state management**: Replace the old "Key state shape" table with a localStorage ownership table:
| Owner | Key | Manages |
|---|---|---|
| PageShell | `phrasalQuizState.darkMode` | Dark mode |
| App | `phrasalQuizState` | Phrasal quiz state |
| IWishPage | `grammarIWishState` | Grammar quiz state |
| VerbPageLayout | per-section keys | Section/meaning expand/collapse |
| PhrasalVerbsListPage | `verbListExpanded` | List card expand/collapse |

Note that PageShell and App share the `phrasalQuizState` key.

**Update types table**: Add `BrowseVerbEntry` and `GrammarEntry`.

**Add data files section**: Document `phrasalVerbs.ts` (allVerbs, allVerbsWithLearned, verbsForBrowse), `wishData.ts`, `listVerbIndex.ts`.

**Keep verb data format section**: Still accurate.

**Split answer checking**: Document both the phrasal quiz approach (App.tsx, case-insensitive + parens stripped) and the grammar approach (normalizeAnswer.ts, multi-answer).

**Add "Adding a new verb page" recipe**: 7 steps — create page file, define meanings/sections, add route, add to list page, add to search index, add tests.

### Update Tests section

Document the `src/__tests__/{verb}_verb_page/` subdirectory pattern and the `createVerbPageHelpers()` factory from `src/__tests__/verbPage/helpers.tsx`.

### Keep unchanged sections

- Commands (still accurate)
- Workflow Defaults (still accurate)
- Delivery Checklist (still accurate)
- Backlog MCP block (still accurate)

## Verification

1. Read through the final CLAUDE.md to ensure all route paths match `src/main.tsx`
2. Ensure all mentioned file paths exist
3. Ensure no sections reference stale patterns