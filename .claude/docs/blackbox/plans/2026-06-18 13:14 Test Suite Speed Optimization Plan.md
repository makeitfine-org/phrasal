# Test Suite Speed Optimization Plan

## Context

The test suite (4734 tests, 101 files) runs in **73 seconds wall-clock**. The dominant bottleneck is `PhrasalVerbsListPage.test.tsx` — a single 6799-line, 725-test file that takes **67 seconds** and serializes within one thread. The remaining 100 files finish in ~6-7 seconds. Two complementary strategies target an **80-90% reduction** (73s -> ~8-15s): switching from jsdom to happy-dom (halves environment cost) and splitting the bottleneck file (enables parallelism).

---

## Phase 1: Switch jsdom -> happy-dom (~73s -> ~36s)

Benchmarked: happy-dom cuts wall-clock from 73s to 36s. Only 3 files need small fixes (57 failing tests, all from known API differences).

### Step 1.1: Change environment in `vite.config.ts`
- Line 8: `environment: 'jsdom'` -> `environment: 'happy-dom'`

### Step 1.2: Fix `App.test.tsx` (3 failing tests)
- Lines 260, 275, 302: Replace `vi.spyOn(window, 'confirm').mockReturnValue(...)` with `vi.stubGlobal('confirm', vi.fn(() => ...))`
- Reason: happy-dom doesn't expose `confirm` as a direct own-property on `window`

### Step 1.3: Fix `useQuiz.test.ts` (2 failing tests)
- Lines 209, 223: Same `vi.spyOn(window, 'confirm')` -> `vi.stubGlobal` fix

### Step 1.4: Fix `PhrasalVerbsListPage.test.tsx` (51 failing tests)
- 7 clipboard mocks at lines 277, 378, 467, 570, 673, 799, 902 use `Object.assign(navigator, { clipboard: ... })` which fails because happy-dom's `clipboard` is a read-only getter
- Replace with `Object.defineProperty(navigator, 'clipboard', { value: { writeText: vi.fn().mockResolvedValue(undefined) }, writable: true })`
- Note: 53 other blocks already use `Object.defineProperty` and 11 use `vi.spyOn(navigator, 'clipboard', 'get')` — both work fine with happy-dom

### Step 1.5: Verify
- `npm run test:run` — all 4734 tests pass, ~36s wall-clock

---

## Phase 2: Split `PhrasalVerbsListPage.test.tsx` (~36s -> ~8-15s)

After Phase 1, this file still takes ~33s sequentially. Splitting into ~8 files lets the 20-core machine parallelize. Each split file renders the same component but tests a subset of verbs.

### Step 2.1: Create shared helpers
- New file: `src/__tests__/listPage/helpers.tsx`
- Extract: `renderPage`, `renderPageWithRoutes`, `expandCard`, `LocationSpy`, portal setup, and all particle constant arrays

### Step 2.2: Split into ~8 test files
Group by verb (alphabetical batches of ~90 tests each):
- `listPage/core.test.tsx` — core renders, expand/collapse, search, expand-all, alphabetical, Particles card
- `listPage/get-come.test.tsx` — Get, Make, Put, Take, Give, Go, Come (card, subtitle, copy)
- `listPage/act-build.test.tsx` — Act through Build
- `listPage/call-do.test.tsx` — Call through Do
- `listPage/dress-find.test.tsx` — Dress through Find
- `listPage/grow-leave.test.tsx` — Grow through Leave
- `listPage/let-pass.test.tsx` — Let through Pass
- `listPage/pay-shut.test.tsx` — Pay through Shut
- `listPage/sit-zip.test.tsx` — Sit through Zip

Exact grouping will be tuned during implementation to balance test counts.

### Step 2.3: Delete original file
Remove `src/__tests__/PhrasalVerbsListPage.test.tsx`

### Step 2.4: Verify
- `npm run test:run` — all 4734 tests pass, ~8-15s wall-clock

---

## Files Modified
- `vite.config.ts` — environment: jsdom -> happy-dom
- `src/__tests__/App.test.tsx` — stubGlobal for confirm
- `src/__tests__/useQuiz.test.ts` — stubGlobal for confirm
- `src/__tests__/PhrasalVerbsListPage.test.tsx` — deleted (split into listPage/)
- `src/__tests__/listPage/helpers.tsx` — new shared helpers
- `src/__tests__/listPage/*.test.tsx` — ~8-9 new split files

## Verification
After each phase: `npm run test:run` — 4734 tests pass, no flakiness (run 3x).