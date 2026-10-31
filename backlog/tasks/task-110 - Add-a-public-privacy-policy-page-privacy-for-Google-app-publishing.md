---
id: TASK-110
title: Add a public privacy policy page (/privacy) for Google app publishing
status: In Progress
assignee: []
created_date: '2026-10-31T01:44:00Z'
labels: []
dependencies: []
references:
  - TASK-105
priority: high
type: feature
ordinal: 39000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Google requires a public privacy policy URL (and a homepage URL) before the OAuth consent screen can move from Testing to production (TASK-105 AC #6). Add a public /privacy page to the SPA that states what Phrasal stores, why, who processes it, cookies, retention/deletion and contact. Link it from the footer/register and login pages. Needs a release before the URL works in production.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Public /privacy route renders a privacy policy without login, inside the normal page shell
- [ ] #2 Policy text matches the data the app really stores: email, password hash, Google subject, 2FA secret and recovery codes, sessions, quiz progress, cookies, email provider, Google sign-in
- [ ] #3 Policy says how to delete the account and how to contact the owner
- [ ] #4 A Privacy link is reachable from the login and register pages
- [ ] #5 Frontend unit tests cover the page and the links
- [ ] #6 An e2e scenario opens /privacy while logged out
- [ ] #7 README, frontend CLAUDE.md and docs reflect the new page
- [ ] #8 `make clean build` passes
<!-- AC:END -->
