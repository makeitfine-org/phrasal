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
