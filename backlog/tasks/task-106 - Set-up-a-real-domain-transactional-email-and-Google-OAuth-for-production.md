---
id: TASK-106
title: Set up a real domain, transactional email and Google OAuth for production
status: To Do
assignee: []
created_date: '2026-10-26T17:56:00Z'
updated_date: '2026-10-28T16:32:00Z'
labels:
  - multi-user
  - infra
milestone: m-0
dependencies: []
documentation:
  - >-
    .claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA
    and reliable storage for phrasal.md
priority: medium
type: chore
ordinal: 28500
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The project owner completes these manual steps outside the codebase. They were split out of task-97 so they don't hold up the backup and auth work. They can be done any time in parallel, but they must be finished before task-104 (Google login) and task-105 (production cutover). Production email for task-99 to task-101 also needs the SMTP credentials from this task. Local development and e2e use Mailpit instead.

**Why**
- Phrasal currently runs on the free dynamic DNS name `phrasal.ddns.net`.
- That name doesn't let you publish SPF/DKIM/DMARC records, so verification and password-reset emails would land in spam.
- Google sign-in needs an owned, authorized domain for its OAuth consent screen.

**Confirmed decisions (approved plan 2026-10-26)**
- Buy a real domain for about €10 a year. It replaces `phrasal.ddns.net`.
- Send transactional email through Brevo's free SMTP tier, or an equivalent provider.
- Google OAuth redirect path: `/api/v1/auth/oauth2/code/google`. It sits under `/api`, so ingress, nginx and the Vite proxy need no changes.
- The consent screen stays in Testing mode, with test users, until task-105 publishes it.

**This task provides**
- The domain name
- SMTP credentials
- The Google client ID and secret

They are stored only as GitHub Secrets, in a password manager, or in local `.env` files. They are never committed.

**Approved plan:** `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA and reliable storage for phrasal.md` (section P0: domain, email and Google items)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 A domain is purchased and its A record points to the VPS IP. `dig <domain>` returns the VPS IP.
- [ ] #2 A transactional email provider account (Brevo or equivalent) is created, and the domain is added as a sender domain.
- [ ] #3 SPF, DKIM and DMARC records for the domain are published and show as verified in the provider dashboard.
- [ ] #4 A Google Cloud project has an OAuth consent screen with app name, support email, the new domain as an authorized domain, and the scopes openid, email and profile. It is in Testing mode, with the owner added as a test user.
- [ ] #5 A Google OAuth client (Web application) exists with these redirect URIs: https://<domain>/api/v1/auth/oauth2/code/google, http://localhost:3000/api/v1/auth/oauth2/code/google and http://localhost:5173/api/v1/auth/oauth2/code/google.
- [ ] #6 The SMTP credentials and the Google client ID and secret are stored as GitHub Secrets and in a password manager. None of them are committed to git, audit.md or session-log.md.
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-10-28: domain phrasalbox.com, Brevo sender domain (SPF/DKIM/DMARC) and SMTP key done.

SMTP secrets step: create GitHub Secrets MAIL_USERNAME (Brevo SMTP login) and MAIL_PASSWORD (SMTP key) before the next tagged deploy; ci_cd.yml writes them into the prod secret patch (task-107 phase 8). AC #1-#3/#6 not checked yet: awaiting the user's confirmation.
<!-- SECTION:NOTES:END -->
