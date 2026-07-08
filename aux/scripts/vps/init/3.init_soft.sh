#!/bin/bash
set -euo pipefail

VPS_IP="116.203.78.118"
VPS_USER="vpsuser"
SSH_KEY="$HOME/dev/scripts/vps/ssh-key-h1.key"
SSH_OPTS="-i $SSH_KEY -o StrictHostKeyChecking=accept-new"

ssh_vps() { ssh $SSH_OPTS "$VPS_USER@$VPS_IP" "$@"; }

echo "=== Installing speedtest ==="
ssh_vps "command -v speedtest >/dev/null || sudo apt-get install -y speedtest-cli"

echo "=== Done ==="
