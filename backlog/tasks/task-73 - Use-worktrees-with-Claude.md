---
id: TASK-73
title: Use worktrees with Claude
status: Skip
assignee: []
created_date: '2026-07-16 19:32'
updated_date: '2026-07-18 18:18'
labels:
  - tooling
  - devops
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/44'
priority: low
type: task
ordinal: 4000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Explore using git worktrees with Claude. Try it with `macb`, it might be suitable for parallel work.

GitHub issue: #44
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Document a git worktree workflow for running parallel Claude sessions on separate branches
- [ ] #2 Test the workflow with `macb` and verify branches stay isolated
- [ ] #3 Add worktree usage instructions to CLAUDE.md or a dedicated docs file
- [ ] #4 Confirm that `docker compose`, `mvn`, and `npm` commands work correctly from a worktree directory
<!-- AC:END -->
