# K8s Ansible

Ansible playbooks for provisioning a K3s Kubernetes cluster on a Hetzner VPS and configuring ingress with TLS.

## Prerequisites

- Ansible installed locally
- SSH key at `~/dev/scripts/vps/ssh-key-h1.key`

## Configuration

Connection variables are centralized in two files:

| File | Purpose |
|---|---|
| `inventory/hosts.yml` | VPS host, user, SSH key path |
| `inventory/group_vars/all.yml` | K3s version |

## Playbooks

### K3s Install

```bash
ansible-playbook playbooks/k3s.yml
```

Installs K3s single-node cluster with:
- Config at `/etc/rancher/k3s/config.yaml` (`write-kubeconfig-mode: "0644"`, `tls-san: <vps-ip>`)
- Traefik enabled (K3s default ingress controller)
- Kubeconfig copied to `~vpsuser/.kube/config`
- `KUBECONFIG` env var added to bashrc
- kubectl bash completion installed to `/etc/bash_completion.d/`
- Port 6443 opened via iptables for external kubectl access

The install is idempotent — reruns skip if `/usr/local/bin/k3s` already exists.

### Ingress + TLS

```bash
ansible-playbook playbooks/ingress-tls.yml
```

Runs two plays in sequence (handlers flush between them so K3s restart completes before cert-manager looks for Traefik):

1. **K3s role** — ensures K3s config is current and Traefik is running
2. **ingress-tls role** — installs cert-manager and creates a `letsencrypt-prod` ClusterIssuer

The ingress-tls role:
- Waits for the Traefik deployment to exist (12 retries, 10s delay)
- Installs cert-manager from the official manifest URL
- Waits for the cert-manager webhook to be ready
- Applies a `ClusterIssuer` using HTTP-01 challenge solver via Traefik

cert-manager version and Let's Encrypt email are configured in `roles/ingress-tls/defaults/main.yml`.

## Roles Overview

```
ansible/
├── ansible.cfg
├── inventory/
│   ├── hosts.yml
│   └── group_vars/all.yml
├── playbooks/
│   ├── k3s.yml
│   └── ingress-tls.yml
└── roles/
    ├── k3s/
    │   ├── defaults/main.yml         # k3s version, config path
    │   ├── handlers/main.yml         # restart k3s
    │   ├── tasks/main.yml            # install, configure, verify
    │   ├── templates/config.yaml.j2  # k3s server config
    │   └── files/k8s-completion      # kubectl bash completion
    └── ingress-tls/
        ├── defaults/main.yml         # cert-manager version, email, domain
        ├── tasks/main.yml            # install cert-manager, apply ClusterIssuer
        └── templates/cluster-issuer.yaml.j2
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

## Web-Based K8s Dashboards

Run a browser-based Kubernetes UI as a Docker container, connected to your kubeconfig.


### Headlamp — lightweight, clean UI, open-source

```bash
docker run -d --name headlamp \
  --network=host \
  -v "$HOME/.kube:$HOME/.kube:ro" \
  -v "$HOME/.minikube:$HOME/.minikube:ro" \
  ghcr.io/kinvolk/headlamp:latest \
  -kubeconfig $HOME/.kube/config \
  -insecure-ssl
```

Open `http://localhost:4466`.

`--network=host` is required so the container can reach minikube's API at `127.0.0.1`. The `.minikube` mount is needed because minikube's kubeconfig entries reference cert files there (unlike K3s which embeds certs as base64 data).

Recommendation: **Headlamp** — lightest, no signup, shows both clusters from your kubeconfig out of the box. Portainer if you want more features (Docker management too, not just K8s).

> **Note:** Kubernetes Dashboard (`kubernetesui/dashboard`) only runs inside a cluster, not as a standalone Docker container.

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
