---
id: TASK-76
title: Move to private GitHub repo/docker registry
status: Skip
assignee: []
created_date: '2026-07-16 19:32'
updated_date: '2026-07-18 18:18'
labels:
  - devops
  - infrastructure
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/41'
priority: medium
type: task
ordinal: 7000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Migrate repository and Docker images to a private GitHub repo and private Docker registry.

GitHub issue: #41
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 GitHub repository is set to private
- [ ] #2 Docker images pushed to a private registry (GitHub Container Registry or private Docker Hub)
- [ ] #3 CI/CD `docker-push` job updated to authenticate and push to the private registry
- [ ] #4 K8s prod overlay uses `imagePullSecrets` to pull from private registry
- [ ] #5 Verify `deploy` job succeeds end-to-end with private image references
- [ ] #6 `make clean build` passes
<!-- AC:END -->
