#!/bin/bash
set -euo pipefail

VPS_IP="116.203.78.118"
SSH_KEY="$HOME/dev/scripts/vps/ssh-key-h1.key"
SSH_OPTS="-i $SSH_KEY -o StrictHostKeyChecking=accept-new"

NEW_USER="vpsuser"
ssh_root() { ssh $SSH_OPTS "root@$VPS_IP" "$@"; }
ssh_new() { ssh $SSH_OPTS "$NEW_USER@$VPS_IP" "$@"; }

if ssh_new "true" 2>/dev/null; then
    echo "=== $NEW_USER can already log in — skipping setup ==="
    echo "=== Testing sudo ==="
    ssh_new "sudo whoami"
    echo "=== Done. User $NEW_USER is ready. ==="
    exit 0
fi

echo "=== Setting root password ==="
ssh_root "passwd"

echo "=== Creating user $NEW_USER with sudo ==="
ssh_root "adduser --disabled-password --gecos '' $NEW_USER"
ssh_root "usermod -aG sudo $NEW_USER"
ssh_root "echo '$NEW_USER ALL=(ALL) NOPASSWD:ALL' | tee /etc/sudoers.d/$NEW_USER && chmod 440 /etc/sudoers.d/$NEW_USER"

echo "=== Copying SSH key to $NEW_USER ==="
ssh_root "mkdir -p /home/$NEW_USER/.ssh"
ssh_root "cp /root/.ssh/authorized_keys /home/$NEW_USER/.ssh/"
ssh_root "chown -R $NEW_USER:$NEW_USER /home/$NEW_USER/.ssh"
ssh_root "chmod 700 /home/$NEW_USER/.ssh"
ssh_root "chmod 600 /home/$NEW_USER/.ssh/authorized_keys"

echo "=== Testing login with $NEW_USER ==="
ssh_new "sudo whoami"

# echo "=== Disabling root SSH login and password authentication ==="
# ssh_new "sudo sed -i 's/^PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config"
# ssh_new "sudo sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config"
# ssh_new "sudo systemctl restart ssh"

echo "=== Done. User $NEW_USER is ready. ==="
