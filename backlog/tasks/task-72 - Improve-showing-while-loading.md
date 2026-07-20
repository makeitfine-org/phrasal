---
id: TASK-72
title: Improve showing while loading
status: Done
assignee: []
created_date: '2026-07-16 19:32'
updated_date: '2026-07-18 18:39'
labels:
  - frontend
  - ui
  - ux
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/45'
modified_files:
  - frontend/src/App.tsx
  - frontend/src/pages/IWishPage.tsx
  - frontend/src/pages/VerbDetailPage.tsx
  - frontend/src/pages/PhrasalVerbsListPage.tsx
  - frontend/src/__tests__/App.test.tsx
  - frontend/src/__tests__/VerbDetailPage.test.tsx
  - frontend/src/__tests__/loading-states.test.tsx
priority: medium
type: enhancement
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Improve the loading experience. Options to consider:
- Show loading indicator from top to bottom
- Show just background and then immediately everything
- Other approaches

GitHub issue: #45
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Skeleton-to-content swap uses a fade-in CSS transition (no abrupt DOM swap blink)
- [x] #2 Existing `.fade-in` animation (index.css) or equivalent applied to all data-fetching pages (App, IWishPage, VerbDetailPage, PhrasalVerbsListPage)
- [x] #3 Skeleton component dimensions match real content layout to minimize layout shift
- [x] #4 Loading-state integration tests updated to verify transition behavior
- [x] #5 `make clean build` passes
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Problem
All 4 data-fetching pages (App, IWishPage, VerbDetailPage, PhrasalVerbsListPage) use a binary `if (loading) return <Skeleton />` pattern. When loading finishes, the skeleton is instantly replaced by content — causing an abrupt visual "blink".

### Solution
Add the existing `.fade-in` CSS class (already in index.css — 0.4s ease-in-out opacity+translateY animation) to each page's content wrapper when it renders after loading completes.

### Steps
1. **App.tsx** — Wrap `<PhrasalVerbQuiz>` return in a `<div className="fade-in">`
2. **IWishPage.tsx** — Wrap `<GrammarQuiz>` return in a `<div className="fade-in">`  
3. **VerbDetailPage.tsx** — Wrap `<VerbPageLayout>` return in a `<div className="fade-in">`
4. **PhrasalVerbsListPage.tsx** — Add `fade-in` to the outer content div
5. **Skeleton dimensions** — Verify skeleton layouts match content layouts (already matching)
6. **Tests** — Update `loading-states.test.tsx` to verify fade-in class is present on loaded content
7. **Run `make clean build`**
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
All 4 pages updated with fade-in class. Tests added for all 4 pages. All 1288 frontend tests pass. Skeleton dimensions already match content layouts (same outer classes).
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Summary\n\nAdded fade-in CSS transition to all 4 data-fetching pages to eliminate the abrupt skeleton-to-content blink.\n\n### Changes\n- **App.tsx** — Wrapped `<PhrasalVerbQuiz>` in `<div className=\"fade-in\">`\n- **IWishPage.tsx** — Wrapped `<GrammarQuiz>` in `<div className=\"fade-in\">`\n- **VerbDetailPage.tsx** — Wrapped `<VerbPageLayout>` in `<div className=\"fade-in\">`\n- **PhrasalVerbsListPage.tsx** — Added `fade-in` to the outer content div class\n\nUses the existing `.fade-in` animation from `index.css` (0.4s ease-in-out opacity + translateY). Skeleton components already match content layout dimensions — no changes needed.\n\n### Tests\n- Added fade-in verification tests to `App.test.tsx`, `VerbDetailPage.test.tsx`, and `loading-states.test.tsx`\n- All 1288 frontend tests pass\n- `make clean build` passes (full pipeline including backend, frontend, docker, e2e)
<!-- SECTION:FINAL_SUMMARY:END -->
