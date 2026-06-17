---
id: TASK-69
title: Speed up test suite with parallel threads and reduced verb page overhead
status: To Do
assignee: []
created_date: '2026-06-17'
updated_date: '2026-06-17'
labels:
  - testing
  - performance
dependencies: []
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
- [ ] #1 `singleThread: true` removed from `vite.config.ts` test config; multi-threaded execution enabled
- [ ] #2 All 71 verb page test directories consolidated: each directory has one `{verb}.test.tsx` instead of per-particle files
- [ ] #3 Shared test helpers (`describeSectionToggle`, `describeChevronAndColour`, `describeDefaultImageCards`) still used — test coverage unchanged
- [ ] #4 Per-verb `helpers.tsx` files still export `renderPage`, `getCard`, `getSection`, `expandSection`
- [ ] #5 No test flakiness introduced — run `npm run test:run` 3 times consecutively, all green
- [ ] #6 Before/after timing comparison documented (run `time npm run test:run` before and after changes)
- [ ] #7 `npm run test:run` passes
<!-- AC:END -->
