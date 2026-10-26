---
id: TASK-104
title: Let users sign in with their Google account
status: To Do
assignee: []
created_date: '2026-10-26T17:38:00Z'
updated_date: '2026-10-26T17:56:00Z'
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
- [ ] #8 A new Flyway migration stores the Google subject per user. Existing migrations are not edited.
- [ ] #9 Google client id and secret env vars are wired into docker-compose (optional locally), k8s base/prod and CI. No secrets are committed.
- [ ] #10 Integration tests cover the new-user, link-by-verified-email, unverified-email refusal and 2FA-pending branches. Vitest covers the button.
- [ ] #11 README.md documents the Google setup (OAuth client, redirect URIs, env vars). backend/CLAUDE.md documents the account-linking rules.
- [ ] #12 `make clean build` passes
<!-- AC:END -->
