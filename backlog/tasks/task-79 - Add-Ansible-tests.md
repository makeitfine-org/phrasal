---
id: TASK-79
title: Add Ansible tests
status: To Do
assignee: []
created_date: '2026-07-16 19:33'
labels:
  - testing
  - ansible
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/37'
priority: medium
type: task
ordinal: 10000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Add tests for Ansible roles using the standard stack: yamllint, ansible-lint, Molecule (integration testing with Docker driver), and Testinfra verifier. Set up a CI pipeline: yamllint → ansible-lint → molecule test.

GitHub issue: #37
<!-- SECTION:DESCRIPTION:END -->
