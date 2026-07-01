#!/usr/bin/env bash
set -euo pipefail

VPS_IP="141.144.227.73"
VPS_USER="ubuntu"
SSH_KEY="$HOME/dev/scripts/vps/ssh-key-2026-06-26.key"
SSH_OPTS="-i $SSH_KEY -o StrictHostKeyChecking=accept-new"

ssh_vps() { ssh $SSH_OPTS "$VPS_USER@$VPS_IP" "$@"; }

# Swap (critical with 1 GB RAM)
echo "=== Setting up swap ==="
ssh_vps "sudo fallocate -l 2G /swapfile"
ssh_vps "sudo chmod 600 /swapfile"
ssh_vps "sudo mkswap /swapfile"
ssh_vps "sudo swapon /swapfile"
ssh_vps "grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab"

# PostgreSQL
echo "=== Installing PostgreSQL ==="
ssh_vps "sudo apt update"
ssh_vps "sudo apt install -y postgresql postgresql-client"

# Java 25
echo "=== Installing Java 25 ==="
ssh_vps "sudo apt install -y openjdk-25-jre-headless"

# Nginx (serves React static files, reverse-proxies /api to Spring Boot)
echo "=== Installing Nginx ==="
ssh_vps "sudo apt install -y nginx"

# iptables persistence
echo "=== Setting up iptables ==="
ssh_vps "sudo DEBIAN_FRONTEND=noninteractive apt install -y iptables-persistent"

# Open HTTP/HTTPS ports in iptables
ssh_vps "sudo iptables -I INPUT -p tcp --dport 80 -j ACCEPT"
ssh_vps "sudo iptables -I INPUT -p tcp --dport 443 -j ACCEPT"
ssh_vps "sudo sh -c 'iptables-save > /etc/iptables/rules.v4'"

echo "=== Infrastructure installed ==="
