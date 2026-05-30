---
id: TASK-6
title: Set timeout for GitHub Actions CI/CD
status: Done
assignee: []
created_date: '2026-05-30 11:42'
updated_date: '2026-05-30 11:43'
labels:
  - ci-cd
  - infrastructure
dependencies: []
modified_files:
  - .github/workflows/ci.yml
  - .github/workflows/phrasal-deploy.yml
priority: low
ordinal: 1100
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
GitHub Actions workflows for CI and Deployment have no explicit timeout set, defaulting to 360 minutes. This can lead to wasted minutes if a job hangs.

## Goal
Set a reasonable timeout (10 minutes) for all jobs in the GitHub Actions workflows to prevent excessive resource consumption in case of hangs.

## Scope
- `.github/workflows/ci.yml`: `ci` job
- `.github/workflows/phrasal-deploy.yml`: `build` and `deploy` jobs

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 `timeout-minutes: 10` added to `ci` job in `ci.yml`
- [x] #2 `timeout-minutes: 10` added to `build` job in `phrasal-deploy.yml`
- [x] #3 `timeout-minutes: 10` added to `deploy` job in `phrasal-deploy.yml`
- [x] #4 Workflows are still valid YAML
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added `timeout-minutes: 10` to all jobs in the project's GitHub Actions workflows (`ci.yml` and `phrasal-deploy.yml`). This ensures that jobs will be terminated if they exceed a reasonable execution time, preventing wasted CI minutes.
<!-- SECTION:FINAL_SUMMARY:END -->
