#!/usr/bin/env bash
set -euo pipefail

VPS_IP="141.144.227.73"
VPS_USER="ubuntu"
SSH_KEY="$HOME/dev/scripts/vps/ssh-key-2026-06-26.key"
SSH_OPTS="-i $SSH_KEY -o StrictHostKeyChecking=accept-new"

#todo: set: jar name, db creds names

ssh_vps() { ssh $SSH_OPTS "$VPS_USER@$VPS_IP" "$@"; }

TARGETS=("backend" "frontend" "postgres" "all")

usage() {
    echo "Usage: $(basename "$0") <backend|frontend|postgres|all>"
    echo "  backend   — stop service, remove JAR"
    echo "  frontend  — remove static files, reset nginx"
    echo "  postgres  — stop service, drop DB and user"
    echo "  all       — undeploy everything"
    exit 1
}

pick_target() {
    echo "What to undeploy?"
    select TARGET in "${TARGETS[@]}"; do
        if [ -n "$TARGET" ]; then
            break
        fi
        echo "Invalid choice. Try again."
    done
}

confirm() {
    read -rp "Undeploy $1? [y/N] " ans
    [[ "$ans" =~ ^[Yy]$ ]] || { echo "Skipped $1"; exit 0; }
}

undeploy_backend() {
    if ! ssh_vps "test -f /etc/systemd/system/phrasal.service" 2>/dev/null; then
        echo "Backend not deployed — skipping"
        return
    fi
    echo "=== Undeploying backend ==="
    ssh_vps "sudo systemctl stop phrasal 2>/dev/null || true"
    ssh_vps "sudo systemctl disable phrasal 2>/dev/null || true"
    ssh_vps "sudo rm -f /etc/systemd/system/phrasal.service && sudo systemctl daemon-reload"
    ssh_vps "sudo rm -rf /opt/phrasal"
    echo "Backend removed"
}

undeploy_frontend() {
    if ! ssh_vps "test -d /var/www/phrasal" 2>/dev/null; then
        echo "Frontend not deployed — skipping"
        return
    fi
    echo "=== Undeploying frontend ==="
    ssh_vps "sudo rm -rf /var/www/phrasal"

    if ssh_vps "test -f /etc/systemd/system/phrasal.service" 2>/dev/null; then
        # Backend still deployed — keep /api/ proxy, remove static serving
        ssh_vps "sudo bash -c 'cat << \"NGINX\" > /etc/nginx/sites-available/phrasal
server {
    listen 80;
    server_name phrasal.ddns.net;

    location /api/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
NGINX'"
        echo "  Restoring SSL certificate..."
        ssh_vps "sudo certbot --nginx -d phrasal.ddns.net --non-interactive"
    else
        ssh_vps "sudo rm -f /etc/nginx/sites-enabled/phrasal /etc/nginx/sites-available/phrasal"
    fi
    ssh_vps "sudo nginx -t 2>/dev/null && sudo systemctl reload nginx || true"
    echo "Frontend removed"
}

undeploy_postgres() {
    if ! ssh_vps "systemctl is-enabled postgresql 2>/dev/null" | grep -q enabled; then
        echo "PostgreSQL not running — skipping"
        return
    fi
    echo "=== Undeploying PostgreSQL ==="
    ssh_vps "sudo -u postgres psql -c \"DROP DATABASE IF EXISTS phrasaldb;\""
    ssh_vps "sudo -u postgres psql -c \"DROP USER IF EXISTS phrasaluser;\""
    ssh_vps "sudo systemctl stop postgresql"
    ssh_vps "sudo systemctl disable postgresql"
    echo "PostgreSQL stopped and phrasal DB dropped"
}

if [ $# -eq 0 ]; then
    pick_target
else
    TARGET="$1"
fi

confirm "$TARGET"

case "$TARGET" in
    backend)  undeploy_backend ;;
    frontend) undeploy_frontend ;;
    postgres) undeploy_postgres ;;
    all)      undeploy_backend; undeploy_frontend; undeploy_postgres ;;
    *)        usage ;;
esac

echo "=== Undeploy complete ($TARGET) ==="
