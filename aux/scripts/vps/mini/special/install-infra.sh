#!/usr/bin/env bash
set -euo pipefail

# Swap (critical with 1 GB RAM)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# PostgreSQL
sudo apt update
sudo apt install -y postgresql postgresql-client

# Java 25
sudo apt install -y openjdk-25-jre-headless

# Nginx (serves React static files, reverse-proxies /api to Spring Boot)
sudo apt install -y nginx

# iptables persistence
sudo apt install -y iptables-persistent

# Open HTTP/HTTPS ports in iptables
sudo iptables -I INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 443 -j ACCEPT
sudo sh -c 'iptables-save > /etc/iptables/rules.v4'
