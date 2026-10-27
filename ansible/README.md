# K8s Ansible

Ansible playbooks for provisioning a K3s Kubernetes cluster on a Hetzner VPS and configuring ingress with TLS.

## Prerequisites

- Ansible installed locally
- SSH key at `~/dev/scripts/hetzner/ssh-key-h1.key`

Install Ansible (Ubuntu) with `pipx install --include-deps ansible` (or `sudo apt install ansible`).
Run all `ansible` / `ansible-playbook` commands from this `ansible/` directory — otherwise
`ansible.cfg` is not picked up and the inventory is empty ("Could not match supplied host pattern").

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
- Kubelet image GC drop-in at `/var/lib/rancher/k3s/agent/etc/kubelet.conf.d/90-image-gc.conf` — deletes images unused for `k3s_image_max_gc_age` (default `1440h`)

The install is idempotent — reruns skip if `/usr/local/bin/k3s` already exists.

#### Image garbage collection

K3s stores images in its embedded containerd under `/var/lib/rancher/k3s/agent/containerd/` (not Docker).
By default the kubelet only deletes unused images when disk usage exceeds 85% (down to 80%), so every
deployed release stays on disk. The role adds `imageMaximumGCAge` so images unused for 30 days are deleted.
A rollback to a deleted version simply re-pulls the image from Docker Hub.

```bash
# Apply only the image GC config (restarts k3s; running pods are not affected)
ansible-playbook playbooks/k3s.yml --tags image-gc

# Inspect images on the VPS
sudo k3s crictl images
sudo k3s crictl imagefsinfo

# Verify the active kubelet setting from your machine
kubectl get --raw /api/v1/nodes/vps-h1/proxy/configz | jq '.kubeletconfig.imageMaximumGCAge'
```

### Client IP behind Traefik

The backend rate-limits register and login per client IP. With K3s ServiceLB, Traefik would see one internal
address for every visitor, so the limits would apply site-wide. The k3s role writes a `HelmChartConfig` for
`traefik` (`templates/traefik-config.yaml.j2`) that sets `service.spec.externalTrafficPolicy: Local`.

```bash
ansible-playbook playbooks/k3s.yml --tags traefik-client-ip
# verify: prints Local
kubectl get svc traefik -n kube-system -o jsonpath='{.spec.externalTrafficPolicy}'
```

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
    │   ├── defaults/main.yml         # k3s version, config paths, image GC age
    │   ├── handlers/main.yml         # restart k3s
    │   ├── tasks/main.yml            # install, configure, verify
    │   ├── templates/config.yaml.j2  # k3s server config
    │   ├── templates/traefik-config.yaml.j2  # Traefik HelmChartConfig (keep client IP)
    │   ├── templates/kubelet-image-gc.conf.j2  # kubelet image GC drop-in
    │   └── files/k8s-completion      # kubectl bash completion
    └── ingress-tls/
        ├── defaults/main.yml         # cert-manager version, email, domain
        ├── tasks/main.yml            # install cert-manager, apply ClusterIssuer
        └── templates/cluster-issuer.yaml.j2
```

## Connect from Local Machine

```bash
# 1. Grab the kubeconfig
scp -i ~/dev/scripts/hetzner/ssh-key-h1.key -o IdentitiesOnly=yes \
  vpsuser@116.203.78.118:~/.kube/config ~/.kube/config-hetzner

# 2. Replace localhost with the VPS IP
sed -i 's|https://127.0.0.1:6443|https://116.203.78.118:6443|' ~/.kube/config-hetzner

# 3. Rename cluster/user/context from K3s' generic "default" to "hetzner" (avoids merge clashes)
sed -i 's/: default$/: hetzner/' ~/.kube/config-hetzner

# 4. Use it
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
kubectl config use-context hetzner  # switch to K3s (renamed from "default" in step 3)
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
   - **hetzner** — K3s on Hetzner VPS (`116.203.78.118:6443`)
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
