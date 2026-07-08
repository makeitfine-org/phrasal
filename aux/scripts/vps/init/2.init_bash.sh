#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

VPS_IP="116.203.78.118"
VPS_USER="vpsuser"
SSH_KEY="$HOME/dev/scripts/vps/ssh-key-h1.key"
SSH_OPTS="-i $SSH_KEY -o StrictHostKeyChecking=accept-new"

ssh_vps() { ssh $SSH_OPTS "$VPS_USER@$VPS_IP" "$@"; }

echo "=== Updating/upgrading packages ==="
ssh_vps "sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get update"

echo "=== Installing vim ==="
ssh_vps "command -v vim >/dev/null || sudo apt-get install -y vim"

echo "=== Installing certbot ==="
ssh_vps "command -v certbot >/dev/null || sudo apt-get install -y certbot python3-certbot-nginx"

echo "=== Installing net-tools ==="
ssh_vps "command -v netstat >/dev/null || sudo apt-get install -y net-tools"

echo "=== Creating secrets ==="
if ssh_vps "test -f ~/.secrets.d/secrets.sh" 2>/dev/null; then
    echo "secrets.sh already exists — skipping"
else
    read -rp "Telegram bot token: " BOT_TOKEN
    read -rp "Telegram chat ID: " CHAT_ID
    ssh_vps "mkdir -p ~/.secrets.d"
    ssh_vps "cat > ~/.secrets.d/secrets.sh << EOF
export NOTIFICATION_TELEGRAM_BOT_TOKEN=\"$BOT_TOKEN\"
export NOTIFICATION_TELEGRAM_CHAT_ID=\"$CHAT_ID\"
EOF"
fi

echo "=== Appending .bashrc config ==="
if ssh_vps "test -f /tmp/.bashrc_append" 2>/dev/null; then
    echo ".bashrc already configured — skipping"
else
    scp $SSH_OPTS "$SCRIPT_DIR/.bashrc.txt" "$VPS_USER@$VPS_IP:/tmp/.bashrc_append"
    ssh_vps "cat /tmp/.bashrc_append >> ~/.bashrc"
fi

echo "=== Done ==="
