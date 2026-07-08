# VPS Scripts

## Prerequisites

All scripts use these connection variables — update them in each script if VPS changes:

```bash
VPS_IP="116.203.78.118"
SSH_KEY="$HOME/dev/scripts/vps/ssh-key-h1.key"
SSH_OPTS="-i $SSH_KEY -o StrictHostKeyChecking=accept-new"
NEW_USER="vpsuser"
```

## VPS Init (run once, in order)

```
aux/scripts/vps/arch/bash/init/
├── 1.init-user.sh    # Create vpsuser with SSH key and passwordless sudo
├── 2.init_bash.sh    # Install basic tools (vim, certbot, net-tools), configure .bashrc, set Telegram secrets
└── 3.init_soft.sh    # Install additional software (speedtest)
```

## Deployment Setup (run once, in order)

```
aux/scripts/vps/arch/bash/deployment/mini/special/
├── 1.install-infra.sh                      # Install PostgreSQL, Java, Nginx, iptables firewall
└── 2.deploy-first-or-after-undeploy-vps.sh # First deploy: create DB, systemd service, Nginx config, SSL
```

## Day-to-day

| Script | Purpose |
|---|---|
| `deployment/mini/redeploy-vps.sh <backend\|frontend\|all>` | Rebuild and redeploy after code changes |
| `deployment/mini/special/3.undeploy-vps.sh <backend\|frontend\|postgres\|all>` | Tear down components |

## Tab Completion

Enable argument completion for deploy/undeploy scripts:

```bash
source aux/scripts/vps/arch/bash/deployment/mini/vps-completion.bash
```
