## 2026-06-05T11:15:00Z
### Decisions
- Added PhrasalVerbsPage hub at /phrasal-verbs (mirrors GrammarPage pattern)
- Moved quiz (App) from /phrasal-verbs to /phrasal-verbs/test-most-popular
### Constraints Stated by User
- Mirror the same hub pattern used for Grammar
### Files Modified
- src/pages/PhrasalVerbsPage.tsx — new hub page for phrasal verbs section
- src/main.tsx — updated routing: /phrasal-verbs → PhrasalVerbsPage, added /phrasal-verbs/test-most-popular → App
- src/__tests__/PhrasalVerbsPage.test.tsx — new tests for hub page
- src/__tests__/HomePage.test.tsx — updated routing smoke tests for new sub-route
### Deferred
- None
---

## 2026-06-18T13:30:00Z
### Decisions
- Switched test environment from jsdom to happy-dom (73s → 16s wall-clock)
- Split PhrasalVerbsListPage.test.tsx (6799 lines, 725 tests, 67s bottleneck) into 10 files under src/__tests__/listPage/
- Fixed vi.spyOn(window, 'confirm') → vi.stubGlobal for happy-dom compat (App.test.tsx, useQuiz.test.ts)
- Fixed Object.assign(navigator, {clipboard:...}) → Object.defineProperty with configurable:true for happy-dom compat
- Added configurable:true to all Object.defineProperty(navigator, 'clipboard', ...) calls
### Constraints Stated by User
- None
### Files Modified
- vite.config.ts — environment: jsdom → happy-dom
- src/__tests__/App.test.tsx — vi.stubGlobal for confirm
- src/__tests__/useQuiz.test.ts — vi.stubGlobal for confirm and alert
- src/__tests__/PhrasalVerbsListPage.test.tsx — deleted (split into listPage/)
- src/__tests__/listPage/helpers.tsx — new shared test helpers
- src/__tests__/listPage/*.test.tsx — 10 new split test files (725 tests total)
### Deferred
- jsdom can be removed from devDependencies if no longer needed
---

## 2026-06-06T16:12:00Z
### Decisions
- Added "Give" phrasal verb page following the exact TakeVerbPage pattern
- Used `describeDefaultImageCards` for all 11 Give sections (all use default.png, no real images yet)
- Fixed badge count assertions in general test: "3" appears in 4 sections (not 2), "2" in ≥6 sections
### Constraints Stated by User
- Closely mirror the existing Take/Get page structure and test patterns
### Files Modified
- src/pages/give/GiveVerbPage.tsx — new Give verb page (11 sections, 23 meanings)
- src/main.tsx — added route /phrasal-verbs/list/give
- src/pages/PhrasalVerbsListPage.tsx — added Give card with GIVE_PARTICLES, copy handler
- src/__tests__/give_verb_page/helpers.tsx — test helpers for GiveVerbPage
- src/__tests__/give_verb_page/general.test.tsx — general Give page tests
- src/__tests__/give_verb_page/{away,back,in,in_to,off,on_onto,out,over,up,it_up_for,with}.test.tsx — per-particle tests
- src/__tests__/PhrasalVerbsListPage.test.tsx — added Give card and copy button tests
### Deferred
- Real images for Give particles (images/phrasal_verbs/list/give/…) — all use default.png for now
---

## 2026-06-18T10:30:00Z
### Decisions
- Removed `singleThread: true` from vite.config.ts, replaced with `minThreads: 2`
- Consolidated 869 per-particle verb test files into 71 per-verb test files (one `{verb}.test.tsx` per directory)
- Kept all `helpers.tsx` files unchanged; shared test helpers still used across all consolidated files
### Constraints Stated by User
- None (task-69 fully specified acceptance criteria)
### Files Modified
- vite.config.ts — removed singleThread: true, added minThreads: 2
- src/__tests__/*_verb_page/*.test.tsx — 869 files consolidated into 71
### Deferred
- None
---
