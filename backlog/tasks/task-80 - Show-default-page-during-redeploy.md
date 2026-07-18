---
id: TASK-80
title: Show default page during redeploy
status: To Do
assignee: []
created_date: '2026-07-16 19:33'
updated_date: '2026-07-18 18:18'
labels:
  - devops
  - k8s
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/36'
priority: medium
type: enhancement
ordinal: 11000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Display a default/maintenance page while the application is being redeployed, so users don't see errors or blank screens.

GitHub issue: #36
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 During rolling deployment, users see a friendly maintenance page instead of 502/503 errors or blank screens
- [ ] #2 Traefik or nginx configured with a custom error page for backend-unavailable states
- [ ] #3 K8s readiness probe (`/actuator/health/readiness`) prevents traffic routing to unready pods
- [ ] #4 Maintenance page is static HTML (no backend dependency) with a “Please wait” message
- [ ] #5 Verified by deploying a new version and confirming the maintenance page appears during rollout
- [ ] #6 K8s manifests updated in `k8s/base/` or `k8s/overlays/prod/`
- [ ] #7 `make clean build` passes
<!-- AC:END -->
