---
id: TASK-78
title: Organize releases for k8s
status: Done
assignee: []
created_date: '2026-07-16 19:33'
updated_date: '2026-07-17 16:10'
labels:
  - devops
  - k8s
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/38'
priority: medium
type: task
ordinal: 9000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Set up a proper release process for Kubernetes deployments of the project.

GitHub issue: #38
<!-- SECTION:DESCRIPTION:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Already implemented. CI/CD pipeline has docker-push and deploy jobs gated by version tags (v*). README documents full release workflow including `gh release create`, semantic versioning, and 4-step rollback procedure. Kustomize prod overlay applied via `kubectl apply -k k8s/overlays/prod`.
<!-- SECTION:FINAL_SUMMARY:END -->
