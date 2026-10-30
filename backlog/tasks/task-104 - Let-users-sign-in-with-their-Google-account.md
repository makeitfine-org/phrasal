---
id: TASK-104
title: Let users sign in with their Google account
status: In Progress
assignee: []
created_date: '2026-10-26T17:38:00Z'
updated_date: '2026-10-30T16:56:00Z'
labels:
  - multi-user
  - security
  - backend
  - frontend
milestone: m-0
dependencies:
  - TASK-103
  - TASK-106
documentation:
  - >-
    .claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA
    and reliable storage for phrasal.md
  - k8s/overlays/prod/ingress.yaml
priority: medium
type: feature
ordinal: 35000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Why**

Many visitors would rather not create yet another password. Google sign-in gives one-click registration, and Google handles that account's own 2FA. The product owner chose email+password **and** Google as the sign-in methods.

**Confirmed decisions (approved plan 2026-10-26)**

- **Login mechanism:** Spring Security OAuth2/OIDC login with Google.
- **Endpoints and routing:**
  - The OAuth2 endpoints sit under `/api/v1/auth/oauth2/...`: `/api/v1/auth/oauth2/authorization/google` starts the flow and `/api/v1/auth/oauth2/code/google` is the callback.
  - The Traefik ingress, frontend nginx and Vite proxy already route `/api` to the backend, so they need no changes.
- **Account matching:**
  - First look up an existing account by its stored Google subject.
  - Then link by email, but only when Google reports the email as verified.
  - Otherwise create a new verified USER account.
- **Pre-registration hijacking protection:** when a Google login links to an existing *unverified* local account, that account's password is removed.
- **2FA still applies:** if the account has TOTP enabled (which is always the case for admins), a Google login goes through the same pending-2FA step as a password login.
- **Redirects:** success redirects back to the SPA. Failure redirects to the login page with an error flag.
- **Production redirect URI:** must use https behind Traefik, which relies on the forwarded-headers setting.
- **"Sign in with Google" button:** this task adds it to the Login and Register pages. task-103 builds those pages without it.

**Depends on**
- task-106: the real domain, the Google OAuth client ID and secret, and the consent screen.
- task-103: the login and 2FA pages the redirects land on.
- Indirectly, task-101: the pending-2FA state.

**Approved plan:** `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA and reliable storage for phrasal.md` (section P5)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 A 'Sign in with Google' button on the Login and Register pages starts the Google flow. On success the user lands back in the app logged in.
- [ ] #2 A first-time Google user gets a new verified USER account. A returning Google user is matched by their Google subject.
- [ ] #3 A Google login whose verified email matches an existing account links to that account. An unverified Google email never links.
- [ ] #4 When a Google login links to an existing unverified local account, that account's password is removed.
- [ ] #5 A Google login to an account with 2FA enabled requires the TOTP or recovery code step before a session is created.
- [ ] #6 A cancelled or failed Google login returns the user to the login page with a readable error.
- [ ] #7 In production the OAuth redirect URI uses https and the real domain.
- [x] #8 A new Flyway migration stores the Google subject per user. Existing migrations are not edited.
- [ ] #9 Google client id and secret env vars are wired into docker-compose (optional locally), k8s base/prod and CI. docker-compose wires a mock-oauth2-server stand-in provider for local dev and e2e; the k8s dev overlay keeps Google sign-in off. No secrets are committed.
- [ ] #10 Integration tests cover the new-user, link-by-verified-email, unverified-email refusal and 2FA-pending branches. Vitest covers the button.
- [ ] #11 README.md documents the Google setup (OAuth client, redirect URIs, env vars). backend/CLAUDE.md documents the account-linking rules.
- [ ] #12 `make clean build` passes
- [ ] #13 `GET /api/v1/auth/providers` reports whether Google sign-in is on; the button is hidden when it is off
- [ ] #14 Google sign-in to an ADMIN account is refused with a readable error
- [ ] #15 An account without a password can set one through the emailed reset link from the account security page
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-10-30: task-101 left the seam `SessionAuthenticator#startTwoFactorChallenge` for a 2FA challenge after Google sign-in. `POST /me/2fa/setup` asks for the current password, so Google-only accounts (no password) need another proof before they can enroll.

2026-10-30: Implementation plan: `.claude/docs/blackbox/todos/google-account-todos.md`. Decisions that differ from or add to plan P5:
- **Switch + own client registration:** `phrasal.google.enabled` (`GOOGLE_LOGIN_ENABLED`, default false). Our `GoogleLoginConfig` builds the `ClientRegistrationRepository` from `CommonOAuth2Provider.GOOGLE` with optional URI overrides (for the stand-in provider); Boot's `spring.security.oauth2.client.registration.*` is not used. Enabled with a blank client id/secret fails startup. Public `GET /api/v1/auth/providers` → `{"google": bool}`.
- **Redirect URI from `APP_BASE_URL`:** `${APP_BASE_URL}/api/v1/auth/oauth2/code/{registrationId}`, not `{baseUrl}`, because `frontend/nginx.conf` hard-codes `X-Forwarded-Port 3000`. Success/failure redirects are relative.
- **ADMIN accounts refused** (`google-admin-account`).
- **Principal stays `AuthenticatedUser`:** request-attribute `SecurityContextRepository` on `oauth2Login`, no-op authorized-client repository (Google tokens never kept), userinfo call off when supported.
- **Accounts without a password:** password login keeps the generic 401; change password/email, delete and 2FA setup keep requiring the password; such users set one through forgot-password → reset-password (no new endpoint). `AuthenticatedUser.passwordless`, `UserResponse.hasPassword`.
- **Local dev/e2e:** `mock-oauth2-server` in docker-compose (like Mailpit for Brevo). k8s dev overlay keeps Google off.
<!-- SECTION:NOTES:END -->
