# K8s Ansible

Ansible playbooks for provisioning a K3s Kubernetes cluster on VPS.

## Prerequisites

- Ansible installed locally
- SSH key at `~/dev/scripts/vps/ssh-key-h1.key`

## Configuration

Connection variables are centralized in two files:

| File | Purpose |
|---|---|
| `inventory/hosts.yml` | VPS host, user, SSH key path |
| `inventory/group_vars/all.yml` | K3s version |

## K3s Install

```bash
ansible-playbook playbooks/k3s.yml
```

Installs K3s single-node cluster with:
- Config at `/etc/rancher/k3s/config.yaml`
- Traefik disabled (bring your own ingress)
- Kubeconfig copied to `~vpsuser/.kube/config`
- `kubectl` alias `k` added to bashrc

The install is idempotent — reruns skip if `/usr/local/bin/k3s` already exists.

## Roles Overview

```
ansible/
├── ansible.cfg
├── inventory/
│   ├── hosts.yml
│   └── group_vars/all.yml
├── playbooks/
│   └── k3s.yml
└── roles/
    └── k3s/
        ├── defaults/main.yml       # k3s version, config path
        ├── handlers/main.yml       # restart k3s
        ├── tasks/main.yml          # install, configure, verify
        └── templates/config.yaml.j2 # k3s server config
```

## Useful Commands

```shell
# Cluster status
kubectl get nodes -o wide

# All pods
kubectl get pods -A

# K3s service logs
sudo journalctl -u k3s -n 25 -f

# Uninstall k3s
/usr/local/bin/k3s-uninstall.sh
```
