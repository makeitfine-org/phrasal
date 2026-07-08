#!/usr/bin/env bash
set -euo pipefail

VPS_IP="116.203.78.118"
VPS_USER="vpsuser"
SSH_KEY="$HOME/dev/scripts/vps/ssh-key-h1.key"
SSH_OPTS="-i $SSH_KEY -o StrictHostKeyChecking=accept-new"

ssh_vps() { ssh $SSH_OPTS "$VPS_USER@$VPS_IP" "$@"; }

# Swap (critical with 1 GB RAM)
read -rp "Set up swap? [y/N] " SETUP_SWAP
if [[ "$SETUP_SWAP" =~ ^[Yy]$ ]]; then
    read -rp "Swap size (e.g. 1G, 2G, 4G): " SWAP_SIZE
    echo "=== Setting up ${SWAP_SIZE} swap ==="
    ssh_vps "sudo fallocate -l $SWAP_SIZE /swapfile"
ssh_vps "sudo chmod 600 /swapfile"
ssh_vps "sudo mkswap /swapfile"
ssh_vps "sudo swapon /swapfile"
ssh_vps "grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab"
else
    echo "Skipping swap setup"
fi

# PostgreSQL
echo "=== Installing PostgreSQL ==="
ssh_vps "command -v psql >/dev/null || { sudo apt-get update && sudo apt-get install -y postgresql postgresql-client; }"

# Java 25
echo "=== Installing Java 25 ==="
ssh_vps "command -v java >/dev/null || sudo apt-get install -y openjdk-25-jre-headless"

# Nginx (serves React static files, reverse-proxies /api to Spring Boot)
echo "=== Installing Nginx ==="
ssh_vps "command -v nginx >/dev/null || sudo apt-get install -y nginx"

# iptables persistence
echo "=== Setting up iptables ==="
ssh_vps "command -v iptables >/dev/null || sudo DEBIAN_FRONTEND=noninteractive apt-get install -y iptables-persistent"

# Firewall: allow only SSH, HTTP, HTTPS — drop everything else
ssh_vps "sudo iptables -F INPUT"
ssh_vps "sudo iptables -A INPUT -i lo -j ACCEPT"
ssh_vps "sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT"
ssh_vps "sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT"
ssh_vps "sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT"
ssh_vps "sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT"
ssh_vps "sudo iptables -A INPUT -p tcp --dport 8080 -j ACCEPT"
ssh_vps "sudo iptables -A INPUT -p tcp --dport 5432 -j ACCEPT"
ssh_vps "sudo iptables -P INPUT DROP"
ssh_vps "sudo sh -c 'iptables-save > /etc/iptables/rules.v4'"

echo "=== Infrastructure installed ==="
