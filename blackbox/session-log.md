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
