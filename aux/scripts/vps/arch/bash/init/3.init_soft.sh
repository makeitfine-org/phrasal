#!/bin/bash
set -euo pipefail

VPS_IP="116.203.78.118"
VPS_USER="vpsuser"
SSH_KEY="$HOME/dev/scripts/vps/ssh-key-h1.key"
SSH_OPTS="-i $SSH_KEY -o StrictHostKeyChecking=accept-new"

ssh_vps() { ssh $SSH_OPTS "$VPS_USER@$VPS_IP" "$@"; }

echo "=== Installing speedtest ==="
ssh_vps "command -v speedtest >/dev/null || sudo apt-get install -y speedtest-cli"

echo "=== Installing tmux ==="
ssh_vps "command -v tmux >/dev/null || sudo apt-get install -y tmux"

echo "=== Configuring tmux ==="
ssh_vps "cat > ~/.tmux.conf << 'EOF'
set -g mouse on

# Enable 256 colors
set -g default-terminal \"tmux-256color\"

# Enable RGB/True color support
set -as terminal-features ',*:RGB'
set -as terminal-overrides ',*:Tc'
EOF"

echo "=== Done ==="
