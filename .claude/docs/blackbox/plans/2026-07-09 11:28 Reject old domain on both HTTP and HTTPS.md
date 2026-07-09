# Reject old domain on both HTTP and HTTPS

## Context
The reject template only listens on port 80. HTTPS requests to `phrasal.ddns.net` on port 443 fall through to the default nginx server block (the actual site), so the old domain still serves content with a cert mismatch warning.

## Change
Update `ansible-bare/roles/deploy/templates/phrasal-reject.conf.j2` to also listen on 443 with SSL, reusing the existing `outphrasal.ddns.net` Let's Encrypt certificate:

```nginx
server {
    listen 80;
    listen 443 ssl;
    server_name phrasal.ddns.net;

    ssl_certificate /etc/letsencrypt/live/outphrasal.ddns.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/outphrasal.ddns.net/privkey.pem;

    return 444;
}
```

## Verification
```bash
ansible-playbook playbooks/init-deploy.yml --tags frontend
```
Then confirm `phrasal.ddns.net` no longer serves anything on HTTP or HTTPS.