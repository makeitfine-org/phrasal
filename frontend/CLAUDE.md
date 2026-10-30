# CLAUDE.md — frontend

## Stack

- React 19, TypeScript (strict), Vite 8
- Tailwind CSS 4 (PostCSS plugin)
- react-router-dom 7
- Vitest, React Testing Library

## Architecture

Multi-page SPA. State is component-local + localStorage; the only context is `auth/AuthContext` (current user, `useAuth()`).

### Routing (`src/main.tsx`)

`ErrorBoundary` > `AuthProvider` > `BrowserRouter` > `PageShell` (layout shell with `<Outlet />`) > all routes.

### Component Tree

**Structural:** `PageShell` (dark mode, home button, portal target), `ErrorBoundary`, `VerbPageLayout` (collapsible particle sections + meaning cards, portal for expand-all button).

**Quiz:** `PhrasalVerbQuiz` (receives `allVerbs` + `verbsForBrowse` props), `GrammarQuiz` (receives `entries` props).

**Quiz-shared:** `Header`, `QuizCard`, `Feedback`, `NavigationControls`, `ExcludedModal`, `SearchModal`.

**Auth:** `pages/LoginPage`, `pages/RegisterPage`, `pages/VerifyEmailPage`, `pages/ForgotPasswordPage`, `pages/ResetPasswordPage`, `pages/LoginTwoFactorPage` (routes `/login`, `/register`, `/verify-email`, `/forgot-password`, `/reset-password`, `/login/2fa`), `components/PasswordRequirements` (live password checklist + tip, shared by the register and reset pages), `components/ResendVerification` (email field + "send a new link", used on the register, login and verify pages), `components/GoogleSignInButton` (see "Sign in with Google"), `components/UserMenu`, `auth/AuthContext` + `auth/useAuth`, `auth/useAuthProviders`, `auth/googleErrors`, `hooks/useClickOutside`.

**Other:** `AllVerbsModal`, `TutorialModal`, `ListSearchModal`, `Icons`, `UserMenu` (login/signup links or email dropdown with logout, rendered by `NavigationMenu`).

### API Client (`src/api/`)

Native `fetch` wrapper, no external dependencies. Base URL `/api/v1`.

| File | Purpose |
|---|---|
| `client.ts` | `get<T>`, `post<T>`, `put<T>`, `del<T>`; sends `credentials: 'same-origin'` and the `X-XSRF-TOKEN` header (from the `XSRF-TOKEN` cookie, via `utils/cookies.ts`) on non-GET. `ApiError(status, message, problem?)` carries the parsed `ProblemDetail` |
| `authApi.ts` | `register` (returns nothing: `202`, no login), `verifyEmail(token)`, `resendVerification(email)`, `forgotPassword(email)`, `resetPassword(token, password)`, `login` (returns `'authenticated'` or `'two-factor-required'` for a `202 {twoFactorRequired: true}`), `verifyTwoFactorLogin(code)`, `logout`, `fetchCurrentUser` (401 → `null`), `fetchAuthProviders` (`GET /auth/providers` → `{ google }`). `register(email, password, website = '')` also sends the honeypot value. `GOOGLE_SIGN_IN_URL` is the full path `/api/v1/auth/oauth2/authorization/google`, used as an `href` |
| `accountApi.ts` | `changePassword(currentPassword, newPassword)`, `requestEmailChange(newEmail, currentPassword)`, `confirmEmailChange(token)`, `deleteAccount(password, code?)` under `/me` and `/auth/confirm-email-change`; `problemTypes.ts` has `ADMIN_ACCOUNT_MANAGED`, `EMAIL_CHANGE_LINK_INVALID`, `EMAIL_CHANGE_LINK_EXPIRED`, `EMAIL_CHANGE_CONFLICT` |
| `twoFactorApi.ts` | `fetchTwoFactorStatus`, `startTwoFactorSetup(password)`, `confirmTwoFactorSetup(code)` (returns the one-time recovery codes), `regenerateRecoveryCodes(code)`, `disableTwoFactor(code)` under `/me/2fa` |
| `problemTypes.ts` | `EMAIL_NOT_VERIFIED`, `VERIFICATION_LINK_EXPIRED`, `VERIFICATION_LINK_INVALID`, `RESET_LINK_EXPIRED`, `RESET_LINK_INVALID`, the 2FA types (`INVALID_TWO_FACTOR_CODE`, `TWO_FACTOR_LOGIN_EXPIRED`, `WRONG_PASSWORD`, `TWO_FACTOR_ALREADY_ENABLED`, `TWO_FACTOR_SETUP_NOT_STARTED`, `TWO_FACTOR_NOT_ENABLED`) and `isProblemType(error, type)` to branch on the `ProblemDetail` type suffix |
| `quizProgressApi.ts` | `fetchQuizProgress(key)` (404 → `null`), `saveQuizProgress(key, doc, { keepalive })`; `QuizKey` = `phrasal-verbs` \| `grammar-i-wish-if-only`. `client.put` accepts `{ keepalive }` for saves while the page unloads |
| `phrasalVerbsApi.ts` | Fetches phrasal verbs → `VerbEntry[]` + `BrowseVerbEntry[]` |
| `grammarEntriesApi.ts` | Fetches grammar entries by category → `GrammarEntry[]` |
| `verbDetailsApi.ts` | Fetches verb list summaries and full verb detail sections |

### Email verification

Register no longer logs the user in: `RegisterPage` shows a check-your-inbox panel (`register-check-email`) after `202`. The emailed link opens `/verify-email?token=...`; `VerifyEmailPage` moves the token out of the address bar into a ref, waits for the auth check (it sets the CSRF cookie), then posts it and shows `verify-status` with `data-state` `verifying|success|expired|invalid|incomplete|error`. `LoginPage` shows `ResendVerification` on `email-not-verified`. `RegisterPage` has a `VERIFICATION_LINK_TTL_HOURS = 24` constant: keep it in sync with the backend `EMAIL_VERIFICATION_TOKEN_TTL`.

### Password reset

`LoginPage` has a "Forgot password?" link (`forgot-password-link`) to `/forgot-password`, passing the typed email in router state. `ForgotPasswordPage` prefills it, always shows the check-your-inbox panel after `202` (`forgot-check-email`), and redirects an authenticated visitor to `/`. The emailed link opens `/reset-password?token=...`; `ResetPasswordPage` moves the token into a ref and out of the address bar, then shows `reset-status` with `data-state` `incomplete|form|submitting|success|expired|invalid`. It checks the password with `passwordViolation` (no email rule; the backend enforces it) and the confirmation field, keeps the form (and the link) on field errors and `429`, and calls `refresh()` after success because the backend closes every session. It never redirects a logged-in visitor. `ForgotPasswordPage` has `RESET_LINK_TTL_HOURS = 1`: keep it in sync with the backend `PASSWORD_RESET_TOKEN_TTL`. `passwordRules(password, email?)` omits the `no-email` rule when `email` is `undefined`.

### Two-factor login

`AuthContext.login` resolves to `'two-factor-required'` when the password was right but a code is needed; the visitor stays anonymous and `LoginPage` navigates to `/login/2fa` (router state `from` is kept). `LoginTwoFactorPage` calls `completeTwoFactorLogin(code)` (then `refresh()`), takes an authenticator code (`two-factor-code`) or a recovery code (`two-factor-recovery-code`, toggled by `two-factor-use-recovery`), shows `Invalid or already used code` under the field (`two-factor-error`) and an alert with a "Log in again" link when the server answers `two-factor-login-expired`. `CurrentUser` carries `twoFactorEnabled`, `twoFactorEnrollmentRequired` and `hasPassword`. `login` returns a `LoginResult` (`'authenticated' | 'two-factor-required'`).

### Sign in with Google

The backend runs the whole OIDC flow; there is no Google SDK in the browser. `GoogleSignInButton` (on `LoginPage` and `RegisterPage`, above the form) is a plain `<a href={GOOGLE_SIGN_IN_URL}>` (`google-sign-in`, not a router `Link`) plus an "or" divider (`auth-divider`). It renders only when `useAuthProviders()` says `google: true`; the hook fetches `/auth/providers` once per page load (module-level promise, `resetAuthProvidersCache()` for tests) and treats a failed request as `{ google: false }`. The backend ends the flow with a full page load of `/` (signed in; `useQuizProgressSync` stashes the anonymous progress itself, since `AuthContext.login` never ran), `/login/2fa` (a pending 2FA login) or `/login?error=<code>`. `LoginPage` maps the code with `googleErrorMessage` (`google`, `google-email-unverified`, `google-account-conflict`, `google-admin-account`; any other value gets the generic text and is never printed), shows it in `auth-error`, and removes `error` from the URL with `setSearchParams(…, { replace: true, state })`. With Google on, the login page also shows "Signed up with Google? Use Continue with Google." (`login-google-hint`).

### Account security (`/account/security`)

`AccountSecurityPage` (anonymous → `/login` with `from`) loads `fetchTwoFactorStatus()` and switches between views: status (`two-factor-status`, `recovery-codes-remaining`, a warning at 3 codes or fewer), setup, regenerate, new codes and disable. `components/twoFactor/`: `TwoFactorSetup` (password → QR + grouped key → code → recovery codes; Done calls `refresh()` because an admin gains rights on enabling), `CodeForm` (one code field for confirm/regenerate/disable, test ids `<prefix>-code|submit|error|alert`), `RecoveryCodesPanel` (Download/Copy/Done) and `QrCode` (`qrcode` data URL; renders nothing on error, the manual key is the fallback). Utils: `formatSecret`, `recoveryCodesFile`. `UserMenu` has an "Account security" link (`nav-account-security`, `nav-mobile-account-security`); `TwoFactorEnrollmentBanner` (in `PageShell`) shows for an admin with `twoFactorEnrollmentRequired` outside the security page. The QR code comes from the `qrcode` package; Vitest mocks it (use a plain function through `vi.hoisted`, and do not call `vi.resetAllMocks()` in those tests).

### Account settings

`AccountSecurityPage` also hosts `components/account/ChangePasswordForm`, `ChangeEmailForm` and `DeleteAccountSection` (an admin sees a "managed through configuration" note instead, test id `admin-managed-note`). Each form needs the current password; delete also asks for a 2FA code when `user.twoFactorEnabled`. An account created by Google sign-in has `hasPassword: false` (never an admin): the page shows `components/account/SetPasswordPanel` (`set-password-panel`; `set-password-request` calls `forgotPassword(user.email)`, then `set-password-sent` with `RESET_LINK_TTL_HOURS`) instead of the three forms, and the 2FA status view shows `two-factor-needs-password` instead of "Turn on". Only `hasPassword === false` hides them. A changed password calls `refresh()` (the session id was rotated); an email change shows a check-your-inbox message and nothing else changes until the link is opened. `pages/ConfirmEmailChangePage` (`/confirm-email-change?token=...`) moves the token out of the address bar, posts it once and offers a link to `/login`; `invalid`, `expired` and `conflict` have their own messages. `AuthContext.deleteAccount(password, code?)` calls the API and clears the user; `DeleteAccountSection` then navigates to `/login` with `state: { notice }`, and `LoginPage` shows it (`login-notice`) from `location.state`. `RegisterPage` has an off-screen honeypot input (`register-website`, `aria-hidden`, `tabIndex={-1}`) that is sent as `website`; do not remove it or make it visible.

### Data-fetching Hooks (`src/hooks/`)

| Hook | Used by |
|---|---|
| `useQuizProgressSync({ quizKey, itemIds, snapshot, applyState })` | `useQuiz` (logged-in users only; also exports `flushQuizProgress()`, called on logout) |
| `usePhrasalVerbs()` | `App.tsx` |
| `useGrammarEntries(category)` | `IWishPage.tsx` |
| `useVerbList()` | `PhrasalVerbsListPage.tsx` |
| `useVerbDetail(verb)` | `VerbDetailPage.tsx` |

### State Management

Only one context: `auth/AuthContext` (default value = anonymous, so components work without a provider). State is component-local + localStorage:

| Owner | localStorage key | Manages |
|---|---|---|
| `PageShell` | `phrasalQuizState` → `darkMode` | Dark mode (shared); defaults to OS `prefers-color-scheme` until cached |
| `PhrasalVerbQuiz` | `phrasalQuizState` | Quiz: mastered, excluded, history, currentIndex (localStorage; logged-in users also sync to the server) |
| `GrammarQuiz` | `grammarIWishState` | Grammar quiz (same shape) |
| `useQuizProgressSync` | `quizProgressSync` | Per-quiz sync metadata `{ ownerId, dirty }` (who owns the cached progress, unsent changes) |
| `VerbPageLayout` | per-section/meaning keys | Section/meaning expand/collapse |
| `PhrasalVerbsListPage` | `verbListExpanded` | Verb list card expand/collapse |

`PageShell` and `PhrasalVerbQuiz` share `phrasalQuizState`. `PhrasalVerbQuiz` preserves fields it doesn't own (like `darkMode`) by merging before writing.

Quiz progress sync: anonymous = localStorage only. A logged-in user's progress is loaded from the server (server wins; an empty server takes the local copy once), saved after a 2 s debounce, and flushed on unmount, `pagehide` and logout. Before an account replaces the local copy, the anonymous progress is stashed in `localStorage['quizProgressAnonymous']` (`stashAnonymousProgress`); logout clears the account-owned quiz state and restores that anonymous copy to storage and screen (`resetToAnonymousProgress`).

Utils: `utils/quizProgressMapping.ts` converts between list indexes and stable content ids (`VerbEntry.id`, `GrammarEntry.id`); `utils/quizProgressStorage.ts` reads/writes the sync metadata and clears local quiz state. The old `isLearned` split is gone: every verb enters the quiz pool.

### Data Files (`src/data/`)

Static reference data (quizzes fetch from backend API):

- `phrasalVerbs.ts` — `rawData: RawVerbEntry[]`. Retained as reference/seed data.
- `wishData.ts` — `wishData: GrammarEntry[]`. Retained as reference.
- `listVerbIndex.ts` — async `fetchListVerbIndex()` fetches from `GET /verb-details/all`, builds searchable index. Used by `ListSearchModal`.

### Answer Checking

- **Phrasal quiz**: case-insensitive, parentheses stripped.
- **Grammar quiz**: `isAnswerCorrect()` from `src/utils/normalizeAnswer.ts` — lowercases, trims, strips non-word/space chars, collapses whitespace.

### Adding a New Verb

Verb data is in the `verb_details` database table. Create a Flyway migration — no frontend changes needed.

## Coding Rules

- Use **Context7 MCP** before writing any React/Vite/library API code — docs drift
- No external state management libraries — component-local state + localStorage only; the single exception is `AuthContext` (no other global state)

## Testing

- Vitest + `@testing-library/react`. Setup: `src/__tests__/setup.ts`.
- Test files in `src/__tests__/`. One `.test.tsx` per component/page.
- List page tests in `src/__tests__/listPage/` with shared `helpers.tsx`.
- `renderSentenceWithMask` exported from `src/utils/renderSentence.tsx` for direct unit testing.

## Skaffold Dev Builds

The Dockerfile uses a BuildKit cache mount (`--mount=type=cache,target=/root/.npm`) so `npm install` reuses the package cache across rebuilds. A `.dockerignore` keeps the build context small.

`skaffold.yaml` sets `useBuildkit: true` to ensure BuildKit is active.

## Makefile Targets (frontend)

Use these from the **repo root**:

| Target | Command |
|---|---|
| `make buildFrontend` | `cd frontend && npm install && npm run build` |
| `make updateFrontend` | Upgrade deps via `npm-check-updates -u && npm install` |

## Testing Requirements
- For new or updated functionality add or update tests

## Local Dev
- `npm run dev` (Vite HMR, http://localhost:5173) proxies `/api` and `/actuator` to the backend on :8080. See root README "Local Development".
