---
id: TASK-105
title: >-
  Move production to the new domain and harden the deployment for public
  multi-user launch
status: To Do
assignee: []
created_date: '2026-10-26T17:38:00Z'
updated_date: '2026-10-26T17:56:00Z'
labels:
  - multi-user
  - security
  - infra
  - k8s
  - docs
milestone: m-0
dependencies:
  - TASK-98
  - TASK-104
  - TASK-106
documentation:
  - >-
    .claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA
    and reliable storage for phrasal.md
  - k8s/overlays/prod/ingress.yaml
  - .github/workflows/ci_cd.yml
  - aux/docs/k3sconf.md
  - ansible/README.md
priority: medium
type: task
ordinal: 36000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**Why**

Before public sign-up is announced, production must run on the owned domain. That domain is what makes the email SPF/DKIM records and the Google consent screen work.

Known operational gaps also need closing:
- The Kubernetes API (port 6443) is open to the whole internet, so that GitHub Actions can run `kubectl apply`.
- `server.error.include-message: always` can leak internals in error responses.
- The docs still describe the old `phrasal.ddns.net` setup, and `aux/docs/k3sconf.md` has other stale statements, such as NodePort services and deploy-on-push.
- The blackbox policy requires a diagram for the new auth flow.

**Confirmed decisions (approved plan 2026-10-26)**
- Move the ingress host and TLS certificate to the new domain. `phrasal.ddns.net` either redirects with a 301 or is dropped; the owner decides at implementation time.
- In production, error responses no longer include exception messages or binding errors.
- CI reaches the cluster over a private channel (for example Tailscale or SSH) instead of a public 6443, and 6443 is then firewalled.
- Before launch, verify email deliverability, publish the Google consent screen (move it out of Testing mode), and confirm the backup job ran.

**Depends on**
- task-104: all user-facing features are complete.
- task-98: backups.
- task-106: the domain, email provider and Google consent screen.

**Approved plan:** `.claude/docs/blackbox/plans/2026-10-26 18:10 Multi-user accounts TOTP 2FA and reliable storage for phrasal.md` (section P8)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Production is served over HTTPS on the new domain with a valid cert-manager certificate. phrasal.ddns.net either 301-redirects to it or is removed, as decided.
- [ ] #2 Production error responses no longer include exception messages or binding error details.
- [ ] #3 The CI deploy reaches the cluster without a publicly open port 6443. 6443 is firewalled from the internet, and the change is codified in Ansible.
- [ ] #4 From outside, an anonymous POST to the content API on the new domain returns 401, and the session cookie carries the Secure, HttpOnly and SameSite=Lax flags.
- [ ] #5 A test email from production passes SPF and DKIM (checked with mail-tester.com or similar).
- [ ] #6 The Google OAuth consent screen is published (out of testing mode), and Google sign-in works on the production domain.
- [ ] #7 The nightly backup ran successfully at least once after cutover, verified in the B2 bucket.
- [ ] #8 docs/diagrams/auth-flow.md contains a Mermaid diagram of the register, verify, login, 2FA, Google and session flows.
- [ ] #9 README.md, aux/docs/k3sconf.md, ansible/README.md and the CLAUDE.md files reflect the new domain, deploy path and auth setup. Known stale statements in k3sconf.md are corrected.
- [ ] #10 `make clean build` passes
<!-- AC:END -->
