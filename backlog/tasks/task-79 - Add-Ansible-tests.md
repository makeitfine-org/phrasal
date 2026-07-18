---
id: TASK-79
title: Add Ansible tests
status: Skip
assignee: []
created_date: '2026-07-16 19:33'
updated_date: '2026-07-18 18:18'
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

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Add `.yamllint` config to `ansible/` and all YAML files pass `yamllint`
- [ ] #2 Add `.ansible-lint` config to `ansible/` and all playbooks/roles pass `ansible-lint`
- [ ] #3 Add Molecule test scenarios for the `k3s` role (Docker driver, verify k3s binary installed, kubeconfig exists, port 6443 open)
- [ ] #4 Add Molecule test scenarios for the `ingress-tls` role (verify cert-manager CRDs applied, ClusterIssuer created)
- [ ] #5 Add Testinfra verifier scripts for infrastructure assertions
- [ ] #6 CI pipeline step added: `yamllint → ansible-lint → molecule test`
- [ ] #7 Document test setup in `ansible/README.md`
<!-- AC:END -->
