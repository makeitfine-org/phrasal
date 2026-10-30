---
id: TASK-103
title: >-
  Add sign-up, login, 2FA and account screens to the frontend, and sync quiz
  progress for logged-in users
status: To Do
assignee: []
created_date: '2026-10-26T17:38:00Z'
updated_date: '2026-10-30T11:35:00Z'
labels:
  - multi-user
  - frontend
  - ui
  - e2e
milestone: m-0
dependencies:
  - TASK-101
  - TASK-102
documentation:
  - >-
    .claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA
    and reliable storage for phrasal.md
  - frontend/CLAUDE.md
  - frontend/src/hooks/useQuiz.ts
  - frontend/src/api/client.ts
  - e2e/CLAUDE.md
priority: medium
type: feature
ordinal: 34000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Why**

The backend auth, 2FA and progress APIs from task-99 to task-102 have no UI. Users need screens to:
- register
- verify their email
- log in, including the 2FA step
- reset a password
- manage 2FA
- delete their account

Logged-in users also expect their quiz progress to follow them across devices.

**Confirmed decisions (approved plan 2026-10-26)**
- **Anonymous use stays as it is today:** content and quizzes work without login, and progress stays in localStorage. Logging in is optional and adds server sync.
- **Auth state:**
  - Held in a small React Context loaded from `/api/v1/auth/me` at app start, and refreshed after login and logout so the CSRF token updates.
  - This changes the documented "no context or global store" rule in `frontend/CLAUDE.md`, so that file must be updated.
  - No external state libraries.
- **2FA enrollment:**
  - Shows a QR code rendered client-side from the otpauth URI, using a small QR library.
  - Shows the recovery codes once and offers to download them.
  - Admins who haven't enrolled are prompted to enroll.
- **Progress sync for logged-in users:**
  - Load server progress on login.
  - Save changes debounced, about 2 s.
  - On first login, when the server returns 404, upload the existing local progress.
  - Saved progress must use stable content IDs, not array positions. Map them in both directions on the client.
- **Remove the client-side isLearned split.** task-102 removes that field.
- **The "Sign in with Google" button is not part of this task.** It ships with task-104.

**Depends on**
- task-101: 2FA endpoints.
- task-102: progress endpoints.
- task-99 and task-100: auth, reset and delete endpoints.

**Approved plan:** `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA and reliable storage for phrasal.md` (section P7)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Visitors can open Register, Verify email, Login, Forgot password and Reset password pages from the app shell. All pages work at mobile width and in dark mode.
- [x] #2 Login for a 2FA-enabled account moves to a code-entry step, which accepts a TOTP code or a recovery code.
- [ ] #3 A logged-in user sees a user menu with their email and options for Account/Security and Logout.
- [ ] #4 On the Account/Security page a user can enable 2FA (QR code plus manual secret), see and download recovery codes once, regenerate them, disable 2FA with a code, and delete their account with password confirmation.
- [x] #5 An admin without 2FA is clearly prompted to enroll.
- [ ] #6 Backend errors (ProblemDetail, including 429 rate limits) are shown as readable messages on forms.
- [x] #7 Anonymous users keep the current quiz behaviour with localStorage only, and no progress requests are sent.
- [x] #8 For a logged-in user, quiz progress is saved to the server and restored after clearing localStorage or on another browser.
- [x] #9 On a user's first login, existing local quiz progress is uploaded to their account.
- [x] #10 Saved progress references content by stable IDs. Adding or removing a verb does not shift other verbs' mastered or excluded state.
- [x] #11 The frontend no longer reads or types the removed isLearned field. Every verb from the API enters the quiz pool unless it is excluded in the visitor's own progress (local or server).
- [ ] #12 frontend/CLAUDE.md is updated: auth context allowed, React 19, new pages, hooks and API files. README.md describes the user-facing auth features.
- [ ] #13 Vitest tests exist for each new page and hook, for the API client's CSRF and 401 handling, and for sync debounce, first-login import and index-to-ID mapping.
- [ ] #14 E2E: features/frontend/auth.feature covers register, verify via Mailpit, login and logout. A progress-sync feature verifies that progress survives clearing localStorage for a logged-in user.
- [ ] #15 `make clean build` passes
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Partly done in task-99 (2026-10-27): API client write methods with CSRF/ProblemDetail, AuthContext + useAuth, Login and Register pages, UserMenu in the nav bar, and e2e for them. Still open here: 2FA and account screens, and quiz progress sync.

Progress-sync part started 2026-10-28 in `.claude/docs/blackbox/todos/save-on-server-multiuser-todos.md` (branch `quiz-progress`).

Sync part done 2026-10-28: useQuizProgressSync, id mapping, logout flush/clear, progress-sync.feature. AC #13 and #14 are done for the sync part only. Still open: 2FA, account and email-flow screens (AC #1-#6, #12 rest, #15).

Done in task-107: the /verify-email page (VerifyEmailPage), the resend action (ResendVerification), check-your-inbox panel after register, and readable errors for email-not-verified and the verification-link problems (part of AC #1 and #6).

2026-10-29: the Forgot password and Reset password pages (part of AC #1, #6, #13) are planned in TASK-108 (`.claude/docs/blackbox/todos/reset-password-todos.md`, branch `password-reset`).

2026-10-29: the Forgot password and Reset password pages, the login-page link, the shared PasswordRequirements component, Vitest tests and the browser e2e (features/frontend/password-reset.feature) are done in TASK-108 (part of AC #1, #6, #13). Still open: 2FA and account screens, AC #12 rest and #15.

2026-10-29: the 2FA screens (AC #2, #4 without account deletion, #5) are planned in TASK-101's `.claude/docs/blackbox/todos/2FA-todos.md` (branch `two-factor`, Phases 8-10).

2026-10-30: 2FA screens done in task-101 (branch `two-factor`, Phases 8-10): login code step (AC #2, accepts TOTP or recovery code), enrollment banner (AC #5), Account security page with QR code, recovery codes, regenerate and disable, user menu link (part of AC #3, #4, #6, #13, #14). Still open here: account deletion (rest of AC #4), AC #12 rest, #15.

2026-10-30: the account-deletion screen (rest of AC #4), plus AC #6 and #13 for the new Change password / Change email / Delete account sections and the /confirm-email-change page, are planned in `.claude/docs/blackbox/todos/account-funcs-todos.md` (branch `account-settings`, Phases 2-4). Change password and email are tracked in TASK-109.
<!-- SECTION:NOTES:END -->
