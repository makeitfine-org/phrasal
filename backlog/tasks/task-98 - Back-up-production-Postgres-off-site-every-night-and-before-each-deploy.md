---
id: TASK-98
title: Back up production Postgres off-site every night and before each deploy
status: To Do
assignee: []
created_date: '2026-10-26T17:36:00Z'
updated_date: '2026-10-26T17:56:00Z'
labels:
  - multi-user
  - infra
  - k8s
milestone: m-0
dependencies:
  - TASK-97
documentation:
  - >-
    .claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA
    and reliable storage for phrasal.md
  - k8s/base/postgres-statefulset.yaml
  - k8s/overlays/prod/kustomization.yaml
  - .github/workflows/ci_cd.yml
priority: high
type: task
ordinal: 29000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Why**

Production Postgres runs as a single K3s StatefulSet pod (`k8s/base/postgres-statefulset.yaml`) on a 1 Gi `local-path` volume, which lives on the VPS's own disk. It has no backups and no replica. The `local-path` reclaim policy is Delete.

Today that's acceptable because every table is seed data that Flyway can rebuild. The multi-user work (task-99 onward) will store real accounts, password hashes and 2FA secrets. A lost disk, a deleted PVC or a bad migration would then destroy that data for good. This must be in place **before** any user data exists.

Prod DB credentials are probably still the default `postgres/postgres`. `POSTGRES_PASSWORD` is only applied when PGDATA is empty, so changing the GitHub Secret alone doesn't change the real password.

**Confirmed decisions (approved plan 2026-10-26)**
- Postgres stays on the VPS. Managed cloud options (Neon, DigitalOcean) were rejected for cost and latency, since the data is a few MB.
- Backup method: a nightly logical dump uploaded to the Backblaze B2 bucket from task-97, plus an on-demand dump just before each tagged deploy, so there's a fresh dump from right before Flyway migrations run.
- CloudNativePG with WAL archiving was rejected as too heavy for a single small node. It would need extra operators and cert-manager in minikube.
- A 24 h recovery point (RPO) plus the pre-deploy dump is acceptable at this scale.

**Depends on**
task-97, for the B2 bucket and its credentials.

**Approved plan**
`.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA and reliable storage for phrasal.md` (section P1)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 A scheduled backup job in the prod overlay dumps phrasaldb every night and uploads a timestamped dump to the off-site B2 bucket. Credentials come from a dedicated Kubernetes Secret.
- [ ] #2 The tagged-release deploy job in .github/workflows/ci_cd.yml runs a backup and waits for it to succeed before applying manifests. The deploy aborts if the backup fails.
- [ ] #3 The Postgres PersistentVolume reclaim policy is Retain, so deleting the PVC no longer deletes the data.
- [ ] #4 The prod DB password is rotated away from postgres/postgres in the running database. The rotation steps (with the init-only POSTGRES_PASSWORD caveat) are documented.
- [ ] #5 A restore runbook exists at aux/docs/runbooks/db-restore.md and covers: fetch dump, stop backend, restore, start backend, verify.
- [ ] #6 A restore drill was performed: the latest dump was restored into a throwaway postgres:16-alpine container and its table row counts match production.
- [ ] #7 The runbook schedules a quarterly restore drill and gives a place to record the date and result of each drill.
- [ ] #8 A nightly backup that fails or does not run is noticed. Either a free dead-man's-switch ping (e.g. healthchecks.io) alerts the owner, or the decision to skip alerting and how to check backup health manually is documented in the runbook.
- [ ] #9 New secrets (B2 key id/app key, bucket) are added to the CI workflow and the prod secret generation. No secret values are committed.
- [ ] #10 README.md and aux/docs/k3sconf.md describe the backup schedule, location, retention and restore procedure.
- [ ] #11 `make clean build` passes
<!-- AC:END -->
