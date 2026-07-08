# VPS Ansible

Ansible equivalent of the bash scripts in `aux/scripts/vps/arch/bash/`.

## Prerequisites

- Ansible installed locally
- SSH key at `~/dev/scripts/vps/ssh-key-h1.key`
- `community.postgresql` collection: `ansible-galaxy collection install community.postgresql`

## Configuration

Connection variables are centralized in two files:

| File | Purpose |
|---|---|
| `inventory/hosts.yml` | VPS host, user, SSH key path |
| `group_vars/all.yml` | Domain, DB creds, swap, firewall ports, JVM settings |

## VPS Init (run once, in order)

```bash
# First run as root — create vpsuser:
ansible-playbook playbooks/init.yml -e ansible_user=root --tags user

# Then as vpsuser — shell config + software:
ansible-playbook playbooks/init.yml

# With Telegram secrets:
ansible-playbook playbooks/init.yml -e telegram_bot_token=XXX -e telegram_chat_id=YYY
```

```
roles/
├── base_user/   # Create vpsuser with SSH key and passwordless sudo
├── base_shell/  # Install basic tools, configure .bashrc, set Telegram secrets
└── soft/        # Install additional software (speedtest, tmux)
```

## Infrastructure + First Deploy (run once)

```bash
ansible-playbook playbooks/setup.yml
ansible-playbook playbooks/setup.yml -e setup_swap=true -e swap_size=2G
ansible-playbook playbooks/setup.yml --tags postgres,java   # partial
```

```
roles/
├── infra/       # Swap, PostgreSQL, Java 25, Nginx, iptables firewall
└── deploy/      # Create DB/user, systemd service, Nginx site config, SSL
```

## Day-to-day

| Command | Purpose |
|---|---|
| `ansible-playbook playbooks/redeploy.yml --tags backend` | Rebuild and redeploy Spring Boot JAR |
| `ansible-playbook playbooks/redeploy.yml --tags frontend` | Rebuild and redeploy React static files |
| `ansible-playbook playbooks/redeploy.yml` | Redeploy both |

## Teardown

```bash
ansible-playbook playbooks/undeploy.yml --tags backend
ansible-playbook playbooks/undeploy.yml --tags frontend
ansible-playbook playbooks/undeploy.yml --tags postgres
ansible-playbook playbooks/undeploy.yml                     # everything
```

## Roles Overview

```
aux/scripts/vps/ansible/
├── ansible.cfg
├── inventory/hosts.yml
├── group_vars/all.yml
├── playbooks/
│   ├── init.yml        # VPS initialization
│   ├── setup.yml       # Infrastructure + first deploy
│   ├── redeploy.yml    # Day-to-day redeploy
│   └── undeploy.yml    # Tear down components
└── roles/
    ├── base_user/      # User creation, sudo, SSH key
    ├── base_shell/     # Packages, .bashrc, Telegram secrets
    ├── soft/           # speedtest-cli, tmux
    ├── infra/          # Swap, PostgreSQL, Java, Nginx, firewall
    ├── deploy/         # DB setup, systemd service, Nginx site, SSL
    ├── redeploy/       # Upload JAR/dist, restart services
    └── undeploy/       # Stop services, remove files, drop DB
```
