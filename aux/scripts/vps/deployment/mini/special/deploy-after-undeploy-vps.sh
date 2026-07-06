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
    local is_active has_user has_db
    is_active=$(ssh_vps "systemctl is-active postgresql 2>/dev/null || echo inactive")

    if [ "$is_active" != "active" ]; then
        echo "=== Restoring PostgreSQL ==="
        echo "  Starting service..."
        ssh_vps "sudo systemctl enable --now postgresql"
    fi

    has_user=$(ssh_vps "sudo -u postgres psql -tc \"SELECT 1 FROM pg_roles WHERE rolname='phrasaluser'\"" | grep -q 1 && echo y || echo n)
    has_db=$(ssh_vps "sudo -u postgres psql -tc \"SELECT 1 FROM pg_database WHERE datname='phrasaldb'\"" | grep -q 1 && echo y || echo n)

    if [ "$is_active" = "active" ] && [ "$has_user" = "y" ] && [ "$has_db" = "y" ]; then
        echo "PostgreSQL fully running — skipping"
        return
    fi

    if [ "$has_user" != "y" ]; then
        echo "  Creating user phrasaluser..."
        ssh_vps "sudo -u postgres psql -c \"CREATE USER phrasaluser WITH PASSWORD 'phrasalpass';\""
    fi
    if [ "$has_db" != "y" ]; then
        echo "  Creating database phrasaldb..."
        ssh_vps "sudo -u postgres psql -c \"CREATE DATABASE phrasaldb OWNER phrasaluser;\""
    fi
    echo "PostgreSQL restored"
}

deploy_backend() {
    local has_service has_jar is_active
    has_service=$(ssh_vps "test -f /etc/systemd/system/phrasal.service && echo y || echo n")
    has_jar=$(ssh_vps "test -f /opt/phrasal/app.jar && echo y || echo n")
    is_active=$(ssh_vps "systemctl is-active phrasal 2>/dev/null || echo inactive")

    if [ "$has_service" = "y" ] && [ "$has_jar" = "y" ] && [ "$is_active" = "active" ]; then
        echo "Backend fully running — skipping"
        return
    fi
    echo "=== Restoring backend ==="

    # Recreate systemd service if missing
    if [ "$has_service" != "y" ]; then
        echo "  Creating systemd service..."
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
    fi

    ssh_vps "id -u phrasal >/dev/null 2>&1 || sudo useradd -r -s /bin/false phrasal"

    # Upload JAR if missing
    if [ "$has_jar" != "y" ]; then
        echo "  Uploading JAR..."
        ssh_vps "sudo mkdir -p /opt/phrasal && sudo chown $VPS_USER: /opt/phrasal"
        cd "$PROJECT_DIR/backend"
        JAR=$(ls target/backend-*.jar 2>/dev/null | head -1)
        if [ -z "$JAR" ]; then
            echo "ERROR: No JAR found in target/ — build first with: mvn clean package -DskipTests"
            exit 1
        fi
        scp $SSH_OPTS "$JAR" "$VPS_USER@$VPS_IP:/opt/phrasal/app.jar"
        ssh_vps "sudo chown -R phrasal: /opt/phrasal"
    fi

    # Start service if not active
    if [ "$is_active" != "active" ]; then
        echo "  Starting service..."
        ssh_vps "sudo systemctl daemon-reload && sudo systemctl enable --now phrasal"
        sleep 3
        ssh_vps "sudo systemctl is-active phrasal && echo 'Backend is running' || (echo 'Backend FAILED'; sudo journalctl -u phrasal -n 20 --no-pager; exit 1)"
    fi
}

deploy_frontend() {
    local has_config has_files has_root_location
    has_config=$(ssh_vps "test -f /etc/nginx/sites-available/phrasal && echo y || echo n")
    has_files=$(ssh_vps "test -d /var/www/phrasal && test -f /var/www/phrasal/index.html && echo y || echo n")
    has_root_location=$(ssh_vps "grep -q 'root /var/www/phrasal' /etc/nginx/sites-available/phrasal 2>/dev/null && echo y || echo n")

    if [ "$has_config" = "y" ] && [ "$has_files" = "y" ] && [ "$has_root_location" = "y" ]; then
        echo "Frontend fully deployed — skipping"
        return
    fi
    echo "=== Restoring frontend ==="

    # Recreate full nginx config if missing or api-only
    if [ "$has_config" != "y" ] || [ "$has_root_location" != "y" ]; then
        echo "  Creating nginx site config..."
        ssh_vps "sudo bash -c 'cat << \"NGINX\" > /etc/nginx/sites-available/phrasal
server {
    listen 80;
    server_name phrasal.ddns.net;

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
        echo "  Restoring SSL certificate..."
        ssh_vps "sudo certbot --nginx -d phrasal.ddns.net --non-interactive"
    fi

    # Upload dist if missing
    if [ "$has_files" != "y" ]; then
        echo "  Uploading static files..."
        cd "$PROJECT_DIR/frontend"
        if [ ! -d "dist" ]; then
            echo "ERROR: No dist/ directory — build first with: npm run build"
            exit 1
        fi
        ssh_vps "sudo mkdir -p /var/www/phrasal && sudo chown -R $VPS_USER: /var/www/phrasal"
        scp -r $SSH_OPTS dist/* "$VPS_USER@$VPS_IP:/var/www/phrasal/"
    fi

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
