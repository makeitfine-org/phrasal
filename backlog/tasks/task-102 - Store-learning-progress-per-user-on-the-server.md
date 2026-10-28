---
id: TASK-102
title: Store learning progress per user on the server
status: In Progress
assignee: []
created_date: '2026-10-26T17:38:00Z'
updated_date: '2026-10-28T10:46:00Z'
labels:
  - multi-user
  - backend
milestone: m-0
dependencies:
  - TASK-99
documentation:
  - >-
    .claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA
    and reliable storage for phrasal.md
  - aux/docs/decomposition_plan.md
  - frontend/src/hooks/useQuiz.ts
priority: medium
type: feature
ordinal: 33000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Why**

Quiz progress (mastered, excluded, history, current position) lives only in browser localStorage. The frontend writes it in `useQuiz` for the phrasal verb quiz and the grammar quiz. As a result, a user loses it when they switch devices or clear the browser.

The only per-user field in the database is `phrasal_verbs.is_learned`. It is global, so it is shared by everyone, and it is false on every row. The frontend uses it only to keep verbs out of the quiz pool. That is the same concept as the quiz's per-user "excluded" set.

**Confirmed decisions (approved plan 2026-10-26)**

- Logged-in users get their progress stored on the server. Anonymous visitors keep localStorage exactly as today.
- "Learned" is merged into per-user quiz progress:
  - Drop the global `is_learned` column and its index.
  - Drop the `?learned=` filter.
- Progress is stored per user and per quiz key as a JSON document, with optimistic versioning. The last write wins.
- Progress must reference content by stable IDs, not array positions. Today the state is keyed by index, so any admin add or delete would silently corrupt every user's saved progress. The ID mapping on the client is task-103's work, but the API stores whatever stable-ID document it receives.
- First-login import happens without any special endpoint. If no progress is saved yet, the read returns 404 and the client uploads its local state.
- Quiz keys are whitelisted, and payload size is capped (about 64 KB).

**Depends on**

task-99 (users and sessions).

**Unblocks**

task-103 (frontend sync).

**Related**

task-87 (versioning localStorage state).

**Approved plan**

`.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA and reliable storage for phrasal.md` (section P6). `aux/docs/decomposition_plan.md` holds an earlier server-side quiz-state sketch.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 A logged-in user can save and read their progress for each supported quiz key. The read returns 404 before the first save.
- [x] #2 Anonymous requests to the progress endpoints return 401 ProblemDetail.
- [x] #3 A user cannot read or overwrite another user's progress.
- [x] #4 Unknown quiz keys are rejected with 400. Payloads above the size limit, or that are not JSON objects, are rejected with 400.
- [ ] #5 Deleting a user account removes their progress.
- [x] #6 The global is_learned column, its index, the `learned` query parameter and the isLearned field in API responses are removed. All existing anonymous content GETs still work.
- [x] #7 New Flyway migrations add the progress table and drop is_learned. Existing migrations are not edited.
- [x] #8 Unit and integration tests cover save/read, 404 before the first save, 401, cross-user isolation, key whitelist and size limit. Existing PhrasalVerb tests are updated for the removed field. JaCoCo 85% per package is met.
- [x] #9 The e2e crud.feature and API steps are updated for the removed isLearned field.
- [x] #10 backend/CLAUDE.md and README.md document the progress API.
- [x] #11 `make clean build` passes
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Started 2026-10-28 on branch `quiz-progress` (from `multi-user`). Step-by-step plan: `.claude/docs/blackbox/todos/save-on-server-multiuser-todos.md`.

Implemented 2026-10-28 on branch `quiz-progress` (V11 drops is_learned, V12 creates user_quiz_progress; QuizKey whitelist; native upsert, last write wins; 64 KB cap; /api/v1/me/** authenticated).

AC #5: covered by `ON DELETE CASCADE` + a repository test; the account deletion endpoint is task-100.

Docs: README 'Learning progress', backend/CLAUDE.md, docs/diagrams/quiz-progress-flow.md. `make clean build` green (248 backend tests, 64 Vitest files, 61 e2e scenarios).
<!-- SECTION:NOTES:END -->
