#!/bin/bash
set -euo pipefail

VPS_IP="116.203.78.118"
SSH_KEY="$HOME/dev/scripts/vps/ssh-key-h1.key"
SSH_OPTS="-i $SSH_KEY -o StrictHostKeyChecking=accept-new"

NEW_USER="vpsuser"
ssh_root() { ssh $SSH_OPTS "root@$VPS_IP" "$@"; }
ssh_new() { ssh $SSH_OPTS "$NEW_USER@$VPS_IP" "$@"; }

if ssh_root "passwd -S root" 2>/dev/null | grep -q ' L \| NP '; then
    echo "=== Root has no password — setting it now ==="
    ssh_root "passwd"
else
    echo "=== Root password already set — skipping ==="
fi

#===

if ssh_new "true" 2>/dev/null; then
    echo "=== $NEW_USER already configured — nothing to do ==="
    exit 0
fi

#===

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
