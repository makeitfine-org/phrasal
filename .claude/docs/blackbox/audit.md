# Blackbox — Prompt Audit Log
# Append-only. Raw user inputs for session auditability.

## 2026-07-01T09:31:48Z
I have: java-1.21.0-openjdk-amd64  java-21-openjdk-amd64. Install on vps ubuntu 24.04 mini 25 java?
---

## 2026-07-01T09:41:37Z
Change @aux/scripts/deploy-vps.sh to re-deploy-vps.sh. And change that in all related files
---

## 2026-07-01T09:43:36Z
Change @aux/scripts/deploy-vps.sh to vps/mini/redeploy-vps.sh. And change that in all related files
---

## 2026-07-01T09:47:13Z
git add all changes and commit them with suitable message
---

## 2026-07-01T10:10:22Z
based on @aux/docs/save_while_work.txt create in @aux/scripts/vps/mini/ install-infra.sh with installaction all that are in that file as `sudo apt install` with short comments
---

## 2026-07-01T10:14:41Z
git add all changes and commit them with suitable message
---

## 2026-07-01T10:24:41Z
Based on @aux/docs/save_while_work.txt @aux/scripts/vps/mini/install-infra.sh @aux/scripts/vps/mini/redeploy-vps.sh 
Write the script to undeploy frontend and backend
---

## 2026-07-01T10:25:33Z
Based on @aux/docs/save_while_work.txt @aux/scripts/vps/mini/install-infra.sh @aux/scripts/vps/mini/redeploy-vps.sh 
Write the script where I can choose to undeploy frontend, backend, postgress
---

## 2026-07-01T10:29:55Z
extend @aux/scripts/vps/mini/redeploy-vps-completion.bash with @aux/scripts/vps/mini/undeploy-vps.sh commands and rename @aux/scripts/vps/mini/redeploy-vps-completion.bash to vps-completion.bash
---

## 2026-07-01T10:34:42Z
move @aux/scripts/vps/mini/undeploy-vps.sh and @aux/scripts/vps/mini/install-infra.sh into `special` folder
---

## 2026-07-01T10:42:33Z
based on @aux/scripts/vps/mini/special/undeploy-vps.sh extend @aux/scripts/vps/mini/  considering if service was redeployed
---

## 2026-07-01T10:44:43Z
based on @aux/scripts/vps/mini/special/undeploy-vps.sh extend redeploy-vps.sh  considering if services were undeploy
---

## 2026-07-01T10:48:59Z
git add all changes and commit them with suitable message
---
