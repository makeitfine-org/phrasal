#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../../../../.." && pwd)"

VPS_IP="141.144.227.73"
VPS_USER="ubuntu"
SSH_KEY="$HOME/dev/scripts/vps/ssh-key-2026-06-26.key"
SSH_OPTS="-i $SSH_KEY -o StrictHostKeyChecking=accept-new"

ssh_vps() { ssh $SSH_OPTS "$VPS_USER@$VPS_IP" "$@"; }

TARGETS=("backend" "frontend" "postgres" "all")

usage() {
    echo "Usage: $(basename "$0") <backend|frontend|postgres|all>"
    echo "  backend   — recreate systemd service, deploy JAR"
    echo "  frontend  — recreate nginx site, deploy static files"
    echo "  postgres  — re-enable service, recreate DB and user"
    echo "  all       — restore everything"
    exit 1
}

pick_target() {
    echo "What to restore?"
    select TARGET in "${TARGETS[@]}"; do
        if [ -n "$TARGET" ]; then
            break
        fi
        echo "Invalid choice. Try again."
    done
}

deploy_postgres() {
    if ssh_vps "systemctl is-active postgresql 2>/dev/null" | grep -q active; then
        echo "PostgreSQL already running — skipping"
        return
    fi
    echo "=== Restoring PostgreSQL ==="
    ssh_vps "sudo systemctl enable --now postgresql"
    ssh_vps "sudo -u postgres psql -tc \"SELECT 1 FROM pg_roles WHERE rolname='phrasaluser'\" | grep -q 1 || sudo -u postgres psql -c \"CREATE USER phrasaluser WITH PASSWORD 'phrasalpass';\""
    ssh_vps "sudo -u postgres psql -tc \"SELECT 1 FROM pg_database WHERE datname='phrasaldb'\" | grep -q 1 || sudo -u postgres psql -c \"CREATE DATABASE phrasaldb OWNER phrasaluser;\""
    echo "PostgreSQL restored"
}

deploy_backend() {
    if ssh_vps "test -f /etc/systemd/system/phrasal.service" 2>/dev/null; then
        echo "Backend service already exists — skipping"
        return
    fi
    echo "=== Restoring backend ==="

    # Recreate systemd service
    ssh_vps "sudo bash -c 'cat << \"UNIT\" > /etc/systemd/system/phrasal.service
[Unit]
Description=Phrasal Backend
After=postgresql.service
Requires=postgresql.service

[Service]
User=phrasal
ExecStart=/usr/bin/java \
  -Xms128m -Xmx256m \
  -XX:+UseSerialGC \
  -XX:MaxMetaspaceSize=128m \
  -jar /opt/phrasal/app.jar \
  --spring.profiles.active=prod
Restart=always

[Install]
WantedBy=multi-user.target
UNIT'"

    ssh_vps "id -u phrasal 2>/dev/null || sudo useradd -r -s /bin/false phrasal"
    ssh_vps "sudo mkdir -p /opt/phrasal && sudo chown phrasal: /opt/phrasal"

    # Upload JAR
    cd "$PROJECT_DIR/backend"
    JAR=$(ls target/backend-*.jar 2>/dev/null | head -1)
    if [ -z "$JAR" ]; then
        echo "ERROR: No JAR found in target/ — build first with: mvn clean package -DskipTests"
        exit 1
    fi
    scp $SSH_OPTS "$JAR" "$VPS_USER@$VPS_IP:/opt/phrasal/app.jar"
    ssh_vps "sudo chown phrasal: /opt/phrasal/app.jar"

    ssh_vps "sudo systemctl daemon-reload && sudo systemctl enable --now phrasal"
    sleep 3
    ssh_vps "sudo systemctl is-active phrasal && echo 'Backend is running' || (echo 'Backend FAILED'; sudo journalctl -u phrasal -n 20 --no-pager; exit 1)"
}

deploy_frontend() {
    if ssh_vps "test -f /etc/nginx/sites-available/phrasal" 2>/dev/null; then
        echo "Nginx site already exists — skipping"
        return
    fi
    echo "=== Restoring frontend ==="

    # Recreate nginx site config
    ssh_vps "sudo bash -c 'cat << \"NGINX\" > /etc/nginx/sites-available/phrasal
server {
    listen 80;
    server_name _;

    root /var/www/phrasal;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
NGINX'"

    ssh_vps "sudo ln -sf /etc/nginx/sites-available/phrasal /etc/nginx/sites-enabled/"

    # Upload dist
    cd "$PROJECT_DIR/frontend"
    if [ ! -d "dist" ]; then
        echo "ERROR: No dist/ directory — build first with: npm run build"
        exit 1
    fi
    ssh_vps "sudo mkdir -p /var/www/phrasal && sudo chown -R $VPS_USER: /var/www/phrasal"
    scp -r $SSH_OPTS dist/* "$VPS_USER@$VPS_IP:/var/www/phrasal/"

    ssh_vps "sudo nginx -t && sudo systemctl reload nginx && echo 'Frontend deployed'"
}

if [ $# -eq 0 ]; then
    pick_target
else
    TARGET="$1"
fi

case "$TARGET" in
    backend)  deploy_backend ;;
    frontend) deploy_frontend ;;
    postgres) deploy_postgres ;;
    all)      deploy_postgres; deploy_backend; deploy_frontend ;;
    *)        usage ;;
esac

echo "=== Deploy-after-undeploy-vps complete ($TARGET) ==="
