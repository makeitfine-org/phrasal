#!/usr/bin/env bash
#
#  Tab completion — source it once (or add to .bashrc):
#  source aux/scripts/vps/mini/vps-completion.bash
#  Then ./aux/scripts/vps/mini/redeploy-vps.sh <tab> shows backend  frontend  all.
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../../../.." && pwd)"

VPS_IP="141.144.227.73"
VPS_USER="ubuntu"
SSH_KEY="$HOME/dev/scripts/vps/ssh-key-2026-06-26.key"
SSH_OPTS="-i $SSH_KEY -o StrictHostKeyChecking=accept-new"

ssh_vps() { ssh $SSH_OPTS "$VPS_USER@$VPS_IP" "$@"; }

TARGETS=("backend" "frontend" "all")

usage() {
    echo "Usage: $(basename "$0") <backend|frontend|all>"
    echo "  backend   — build & deploy Spring Boot JAR"
    echo "  frontend  — build & deploy React static files"
    echo "  all       — deploy both"
    exit 1
}

pick_target() {
    echo "What to deploy?"
    select TARGET in "${TARGETS[@]}"; do
        if [ -n "$TARGET" ]; then
            break
        fi
        echo "Invalid choice. Try again."
    done
}

deploy_backend() {
    if ! ssh_vps "test -f /etc/systemd/system/phrasal.service" 2>/dev/null; then
        echo "ERROR: Backend not deployed — run install-infra.sh and set up the systemd service first"
        exit 1
    fi

    echo "=== Building backend ==="
    cd "$PROJECT_DIR/backend"
    ## Todo: uncomment?
    #mvn clean package -DskipTests -q

    JAR=$(ls target/backend-*.jar 2>/dev/null | head -1)
    if [ -z "$JAR" ]; then
        echo "ERROR: No JAR found in target/"
        exit 1
    fi
    echo "Built: $JAR"

    echo "=== Uploading JAR to VPS ==="
    ssh_vps "sudo mkdir -p /opt/phrasal && sudo chown -R $VPS_USER: /opt/phrasal"
    scp $SSH_OPTS "$JAR" "$VPS_USER@$VPS_IP:/opt/phrasal/app.jar"
    ssh_vps "sudo chown -R phrasal: /opt/phrasal"

    echo "=== Ensuring prod profile in systemd service ==="
    ssh_vps "grep -q 'spring.profiles.active=prod' /etc/systemd/system/phrasal.service || sudo sed -i 's|--spring.profiles.active=[^ ]*|--spring.profiles.active=prod|; t; s|-jar /opt/phrasal/app.jar|-jar /opt/phrasal/app.jar --spring.profiles.active=prod|' /etc/systemd/system/phrasal.service && sudo systemctl daemon-reload"

    echo "=== Restarting backend service ==="
    ssh_vps "sudo systemctl restart phrasal"
    sleep 3
    ssh_vps "sudo systemctl is-active phrasal && echo 'Backend is running' || (echo 'Backend FAILED'; sudo journalctl -u phrasal -n 20 --no-pager; exit 1)"
}

deploy_frontend() {
    if ! ssh_vps "test -f /etc/nginx/sites-available/phrasal" 2>/dev/null; then
        echo "ERROR: Frontend not deployed — run install-infra.sh and set up the nginx site first"
        exit 1
    fi

    echo "=== Building frontend ==="
    cd "$PROJECT_DIR/frontend"
    ## Todo: uncomment?
    #npm ci --silent
    #npm run build

    if [ ! -d "dist" ]; then
        echo "ERROR: No dist/ directory after build"
        exit 1
    fi

    echo "=== Uploading frontend to VPS ==="
    ssh_vps "sudo mkdir -p /var/www/phrasal && sudo chown -R $VPS_USER: /var/www/phrasal"
    scp -r $SSH_OPTS dist/* "$VPS_USER@$VPS_IP:/var/www/phrasal/"

    echo "=== Reloading nginx ==="
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
    all)      deploy_backend; deploy_frontend ;;
    *)        usage ;;
esac

echo "=== Deploy complete ($TARGET) ==="
