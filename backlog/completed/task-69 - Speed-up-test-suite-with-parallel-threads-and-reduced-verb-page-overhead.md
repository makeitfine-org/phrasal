---
id: TASK-69
title: Speed up test suite with parallel threads and reduced verb page overhead
status: Done
assignee:
  - claude
created_date: '2026-06-17'
updated_date: '2026-06-18 10:33'
labels:
  - testing
  - performance
dependencies: []
modified_files:
  - vite.config.ts
  - >-
    src/__tests__/*_verb_page/*.test.tsx (71 consolidated files replacing 869
    per-particle files)
priority: medium
ordinal: 69000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The test suite has 890 test files (49,782 lines total), with 869 verb-page test files making up 40,294 lines (~81%). Currently Vitest runs with `pool: 'threads'` but `singleThread: true` and `isolate: false`, meaning all tests run sequentially in one thread. This was likely set to avoid flaky tests from shared `localStorage` state, but the setup file already clears localStorage via `afterEach(cleanup)`.

### Bottleneck analysis
- **869 verb page test files** each import their verb page component and render it via `createVerbPageHelpers()`. Each file calls `renderPage()` multiple times (typically 4-8 renders per file). That's ~5,000+ React renders of verb pages, all sequential.
- **`singleThread: true`** prevents Vitest from distributing work across CPU cores.
- Each of the 71 verb page test directories has 5-15 small test files (one per particle), each independently importing and rendering the same page component.

### Proposed optimizations

**1. Enable multi-threaded execution**
Remove `singleThread: true` from vitest config. Each test file already clears localStorage in `beforeEach`, and `isolate: false` is already set. Test with `poolOptions.threads.minThreads: 2, maxThreads: <cpu-cores>`.

**2. Consolidate verb page test files per verb**
Each verb currently has 5-15 tiny files (one per particle, ~40 lines each). Consolidate into a single `{verb}.test.tsx` per verb directory. This reduces file-level overhead (module resolution, thread scheduling) from 869 files to 71, while keeping the same test coverage. The shared helpers (`describeSectionToggle`, `describeChevronAndColour`, `describeDefaultImageCards`) already parameterize by particle — they can all run within one `describe` block.

**3. Profile and address slow test files**
Run `npx vitest run --reporter=verbose` to identify the slowest individual test files. Address any outliers (e.g., tests that render heavy component trees unnecessarily).

### Expected impact
- Multi-threading alone should give ~2-4x speedup on multi-core machines
- File consolidation reduces per-file overhead (import resolution, thread dispatch) for 869→71 verb test files
- Combined: estimated 3-5x faster test suite execution
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 `singleThread: true` removed from `vite.config.ts` test config; multi-threaded execution enabled
- [x] #2 All 71 verb page test directories consolidated: each directory has one `{verb}.test.tsx` instead of per-particle files
- [x] #3 Shared test helpers (`describeSectionToggle`, `describeChevronAndColour`, `describeDefaultImageCards`) still used — test coverage unchanged
- [x] #4 Per-verb `helpers.tsx` files still export `renderPage`, `getCard`, `getSection`, `expandSection`
- [x] #5 No test flakiness introduced — run `npm run test:run` 3 times consecutively, all green
- [x] #6 Before/after timing comparison documented (run `time npm run test:run` before and after changes)
- [x] #7 `npm run test:run` passes
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan\n\n1. **Record baseline timing** — `time npm run test:run` (done: 70.09s, 899 files, 4734 tests)\n2. **Update `vite.config.ts`** — Remove `singleThread: true` from poolOptions.threads\n3. **Write consolidation script** — Node.js script that merges per-particle `.test.tsx` files into a single `{verb}.test.tsx` per verb directory, merging imports, deduplicating beforeEach/LABEL, and preserving all test body content\n4. **Run consolidation script** — Execute and verify output\n5. **Run tests** — `npm run test:run` to verify all pass\n6. **Flakiness check** — Run tests 3 consecutive times\n7. **Record after timing** — Compare with baseline
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Timing Comparison

**Before** (899 files, singleThread: true):
- Wall clock: 70.09s
- Aggregate: transform 39.49s, setup 13.54s, import 55.77s, tests 158.02s, environment 1213.10s

**After** (101 files, multi-threaded):
- Wall clock: ~70s (Run 1: 70.44s, Run 2: 69.49s, Run 3: 70.72s)
- Aggregate: transform ~17s, setup ~7s, import ~25s, tests ~173s, environment ~153s

**Key improvements:**
- File count: 899 → 101 (89% reduction)
- Environment setup aggregate: 1213s → 153s (87% reduction)
- Transform aggregate: 39s → 17s (57% reduction)
- Test count: 4734 → 4734 (unchanged)
- Wall clock: ~70s → ~70s (same — 20 cores already saturated parallelism)

**Analysis:** The consolidation massively reduced per-file overhead (jsdom environment setup, module resolution, thread scheduling). However, wall-clock time stayed similar because the 20-core machine was already parallelizing work effectively. The benefit will be more visible on machines with fewer cores where per-file overhead dominates.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Summary\n\n- Removed `singleThread: true` from `vite.config.ts`, replaced with `minThreads: 2` for multi-threaded test execution\n- Consolidated 869 per-particle verb page test files into 71 per-verb test files (one `{verb}.test.tsx` per verb directory)\n- All 71 `helpers.tsx` files preserved with original exports\n- All shared test helpers (`describeSectionToggle`, `describeChevronAndColour`, `describeDefaultImageCards`, `describeMeaningCardLayout`) still used across all 71 consolidated files\n- Test count unchanged: 4734 tests across 101 files (71 verb + 30 non-verb)\n- 3 consecutive test runs all green — no flakiness\n- Aggregate overhead reduced 87% (environment setup: 1213s → 153s) though wall-clock stayed ~70s on 20-core machine"
<!-- SECTION:FINAL_SUMMARY:END -->
