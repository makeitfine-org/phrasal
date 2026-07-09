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

## Connect from Local Machine

```bash
# 1. Grab the kubeconfig
scp -i ~/dev/scripts/vps/ssh-key-h1.key vpsuser@116.203.78.118:~/.kube/config ~/.kube/config-hetzner

# 2. Replace localhost with the VPS IP
sed -i 's|https://127.0.0.1:6443|https://116.203.78.118:6443|' ~/.kube/config-hetzner

# 3. Use it
export KUBECONFIG=~/.kube/config-hetzner
kubectl get nodes
```

This works because the K3s config has `tls-san: 116.203.78.118` — the API server cert covers that IP.

To make it permanent, set `KUBECONFIG` in `~/.bashrc` or merge into `~/.kube/config`:

```bash
# Merge approach (if you have other clusters too)
KUBECONFIG=~/.kube/config:~/.kube/config-hetzner kubectl config view --flatten > ~/.kube/config-merged
mv ~/.kube/config-merged ~/.kube/config
```

After this, `~/.kube/config` contains both your existing clusters and the Hetzner K3s cluster. Switch between them with:

```bash
kubectl config get-contexts        # list all
kubectl config use-context default  # switch to K3s (K3s names its context "default")
```

## Lens (Kubernetes IDE)

### Install on Linux

```bash
# Option 1: Snap
sudo snap install kontena-lens --classic

# Option 2: Download .deb from https://k8slens.dev/download
# Then install:
sudo dpkg -i Lens-*.deb
sudo apt-get install -f   # fix dependencies if needed
```

### Connect Clusters

Lens reads `~/.kube/config` automatically. If you followed the merge step above, both clusters are already available:

1. Open Lens
2. Go to **File → Add Cluster** (or it auto-detects from kubeconfig)
3. You should see both contexts:
   - **default** — K3s on Hetzner VPS (`116.203.78.118:6443`)
   - **minikube** — local Minikube cluster
4. Click a cluster to connect

If clusters don't appear, add them manually:

```bash
# Verify both contexts exist in your kubeconfig
kubectl config get-contexts

# If missing, re-merge:
KUBECONFIG=~/.kube/config:~/.kube/config-hetzner kubectl config view --flatten > ~/.kube/config-merged
mv ~/.kube/config-merged ~/.kube/config
```

Lens shows workloads, pods, services, logs, and shell access — no `kubectl` needed for day-to-day operations.

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
