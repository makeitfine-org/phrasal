---
id: TASK-97
title: Check VPS capacity and create off-site backup storage
status: To Do
assignee: []
created_date: '2026-10-26T17:36:00Z'
updated_date: '2026-10-26T17:56:00Z'
labels:
  - multi-user
  - infra
milestone: m-0
dependencies: []
documentation:
  - >-
    .claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA
    and reliable storage for phrasal.md
  - aux/docs/k3sconf.md
priority: high
type: chore
ordinal: 28000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
These are manual steps the project owner does outside the codebase. They are the only prerequisites for task-98, which sets up the Postgres backups. The domain, email and Google OAuth setup used to be part of this task. It now lives in task-106 so that it doesn't block the backup and auth work.

**Why**
- The size of the VPS is unclear. `aux/docs/k3sconf.md` says 4 CPU / 8 GB, and task-93 says 1 CPU / 1 GB. The real size decides whether the backend JVM, Postgres and the backup jobs fit on the node.
- Off-site database backups need a bucket at a provider other than Hetzner. If the VPS is lost, the backups survive.

**Confirmed decisions (approved plan, 2026-10-26)**
- Backups go to a Backblaze B2 bucket. It has a free tier and is a separate provider from the VPS.
- If the node is the 1 GB variant, upgrade it before the auth work starts in task-99.

**Gives task-98**
- B2 credentials (key id and app key) and the bucket name.
- These are stored only as GitHub Secrets and in a password manager, never committed.

**Approved plan:** `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA and reliable storage for phrasal.md` (section P0: VPS and backup items).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 VPS size is checked (`nproc`, `free -h`, `kubectl top node`) and the real figures are written into aux/docs/k3sconf.md. If the box has less than 2 GB RAM, it is upgraded before the auth work starts.
- [ ] #2 Backblaze B2 bucket is created with a 30-day lifecycle rule, plus an application key scoped to that bucket only.
- [ ] #3 The B2 key id, app key and bucket name are stored as GitHub Secrets and in a password manager. None are committed to git, audit.md or session-log.md.
<!-- AC:END -->
