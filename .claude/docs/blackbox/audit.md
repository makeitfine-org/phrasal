# Blackbox — Prompt Audit Log
# Append-only. Raw user inputs for session auditability.

## 2026-07-01T09:31:48Z
I have: java-1.21.0-openjdk-amd64  java-21-openjdk-amd64. Install on vps ubuntu 24.04 mini 25 java?
---

## 2026-07-01T09:41:37Z
Change @aux/scripts/deploy-vps.sh to re-deploy-vps.sh. And change that in all related files
---

## 2026-07-01T09:43:36Z
Change @aux/scripts/deploy-vps.sh to vps/mini/redeploy-vps.sh. And change that in all related files
---

## 2026-07-01T09:47:13Z
git add all changes and commit them with suitable message
---

## 2026-07-01T10:10:22Z
based on @aux/docs/save_while_work.txt create in @aux/scripts/vps/mini/ install-infra.sh with installaction all that are in that file as `sudo apt install` with short comments
---

## 2026-07-01T10:14:41Z
git add all changes and commit them with suitable message
---

## 2026-07-01T10:24:41Z
Based on @aux/docs/save_while_work.txt @aux/scripts/vps/mini/install-infra.sh @aux/scripts/vps/mini/redeploy-vps.sh 
Write the script to undeploy frontend and backend
---

## 2026-07-01T10:25:33Z
Based on @aux/docs/save_while_work.txt @aux/scripts/vps/mini/install-infra.sh @aux/scripts/vps/mini/redeploy-vps.sh 
Write the script where I can choose to undeploy frontend, backend, postgress
---

## 2026-07-01T10:29:55Z
extend @aux/scripts/vps/mini/redeploy-vps-completion.bash with @aux/scripts/vps/mini/undeploy-vps.sh commands and rename @aux/scripts/vps/mini/redeploy-vps-completion.bash to vps-completion.bash
---

## 2026-07-01T10:34:42Z
move @aux/scripts/vps/mini/undeploy-vps.sh and @aux/scripts/vps/mini/install-infra.sh into `special` folder
---

## 2026-07-01T10:42:33Z
based on @aux/scripts/vps/mini/special/undeploy-vps.sh extend @aux/scripts/vps/mini/  considering if service was redeployed
---

## 2026-07-01T10:44:43Z
based on @aux/scripts/vps/mini/special/undeploy-vps.sh extend redeploy-vps.sh  considering if services were undeploy
---

## 2026-07-01T10:48:59Z
git add all changes and commit them with suitable message
---

## 2026-07-01T10:51:31Z
Based on @aux/docs/save_while_work.txt and @aux/scripts/vps/mini/*.sh create in @aux/scripts/vps/mini/special/deploy-after-undeploy.sh with will check and install what needed after @aux/scripts/vps/mini/special/undeploy-vps.sh
---

## 2026-07-01T10:52:17Z
Based on @aux/docs/save_while_work.txt and @aux/scripts/vps/mini/*.sh create in @aux/scripts/vps/mini/special/deploy-after-undeploy.sh with will check and install what needed if undeployed @aux/scripts/vps/mini/special/undeploy-vps.sh used
---

## 2026-07-01T10:56:47Z
extend @aux/scripts/vps/mini/vps-completion.bash with @aux/scripts/vps/mini/deploy-after-undeploy-vps.sh commands
---

## 2026-07-01T11:00:02Z
git add all changes and commit them with suitable message
---

## 2026-07-01T11:02:44Z
./aux/scripts/vps/mini/special/deploy-after-undeploy-vps.sh backend 
=== Restoring backend ===
999
scp: dest open "/opt/phrasal/app.jar": Permission denied
scp: failed to upload file target/backend-0.1.0.jar to /opt/phrasal/app.jar
---

## 2026-07-01T11:06:44Z
 ./aux/scripts/vps/mini/special/deploy-after-undeploy-vps.sh backend 
Backend service already exists — skipping
=== Deploy-after-undeploy-vps complete (backend) ===

but on VPS /opt/phrasal is empty and:

 sudo journalctl -u phrasal.service -f
Jul 01 10:36:53 vps-t1 systemd[1]: Stopping phrasal.service - Phrasal Backend...
Jul 01 10:36:53 vps-t1 java[117183]: 2026-07-01T10:36:53.252Z  INFO 117183 --- [backend] [ionShutdownHook] o.s.b.w.e.tomcat.GracefulShutdown        : Commencing graceful shutdown. Waiting for active requests to complete
Jul 01 10:36:53 vps-t1 java[117183]: 2026-07-01T10:36:53.304Z  INFO 117183 --- [backend] [tomcat-shutdown] o.s.b.w.e.tomcat.GracefulShutdown        : Graceful shutdown complete
Jul 01 10:36:53 vps-t1 java[117183]: 2026-07-01T10:36:53.327Z  INFO 117183 --- [backend] [ionShutdownHook] j.LocalContainerEntityManagerFactoryBean : Closing JPA EntityManagerFactory for persistence unit 'default'
Jul 01 10:36:53 vps-t1 java[117183]: 2026-07-01T10:36:53.333Z  INFO 117183 --- [backend] [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
Jul 01 10:36:53 vps-t1 java[117183]: 2026-07-01T10:36:53.412Z  INFO 117183 --- [backend] [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.
Jul 01 10:36:53 vps-t1 systemd[1]: phrasal.service: Main process exited, code=exited, status=143/n/a
Jul 01 10:36:53 vps-t1 systemd[1]: phrasal.service: Failed with result 'exit-code'.
Jul 01 10:36:53 vps-t1 systemd[1]: Stopped phrasal.service - Phrasal Backend.
Jul 01 10:36:53 vps-t1 systemd[1]: phrasal.service: Consumed 2min 22.290s CPU time.
^C
ubuntu@vps-t1:~$ sudo journalctl -u phrasal.service -f
Jul 01 10:36:53 vps-t1 systemd[1]: Stopping phrasal.service - Phrasal Backend...
Jul 01 10:36:53 vps-t1 java[117183]: 2026-07-01T10:36:53.252Z  INFO 117183 --- [backend] [ionShutdownHook] o.s.b.w.e.tomcat.GracefulShutdown        : Commencing graceful shutdown. Waiting for active requests to complete
Jul 01 10:36:53 vps-t1 java[117183]: 2026-07-01T10:36:53.304Z  INFO 117183 --- [backend] [tomcat-shutdown] o.s.b.w.e.tomcat.GracefulShutdown        : Graceful shutdown complete
Jul 01 10:36:53 vps-t1 java[117183]: 2026-07-01T10:36:53.327Z  INFO 117183 --- [backend] [ionShutdownHook] j.LocalContainerEntityManagerFactoryBean : Closing JPA EntityManagerFactory for persistence unit 'default'
Jul 01 10:36:53 vps-t1 java[117183]: 2026-07-01T10:36:53.333Z  INFO 117183 --- [backend] [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
Jul 01 10:36:53 vps-t1 java[117183]: 2026-07-01T10:36:53.412Z  INFO 117183 --- [backend] [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.
Jul 01 10:36:53 vps-t1 systemd[1]: phrasal.service: Main process exited, code=exited, status=143/n/a
Jul 01 10:36:53 vps-t1 systemd[1]: phrasal.service: Failed with result 'exit-code'.
Jul 01 10:36:53 vps-t1 systemd[1]: Stopped phrasal.service - Phrasal Backend.
Jul 01 10:36:53 vps-t1 systemd[1]: phrasal.service: Consumed 2min 22.290s CPU time.
---

## 2026-07-01T11:09:34Z
git add all changes and commit them with suitable message
---

## 2026-07-01T11:16:47Z
why on undelpoly frontend you deleted all ssh_vps "sudo rm -f /etc/nginx/sites-enabled/phrasal /etc/nginx/sites-available/phrasal" even /api/ which related to backend
---

## 2026-07-01T11:17:32Z
yes
---

## 2026-07-01T11:18:43Z
Also in @aux/scripts/vps/mini/special/deploy-after-undeploy-vps.sh check more conditions at the beginning for frontend as it was done for backend
---

## 2026-07-01T11:27:02Z
I have phrasal.ddns.net with
---

## 2026-07-01T11:27:29Z
I have phrasal.ddns.net with

 cat /etc/nginx/sites-available/phrasal
server {
    listen 80;
    server_name phrasal.ddns.net;

    root /var/www/phrasal;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

but after redeply this site can't be reached
---

## 2026-07-01T11:27:51Z
I have https://phrasal.ddns.net with

 cat /etc/nginx/sites-available/phrasal
server {
    listen 80;
    server_name phrasal.ddns.net;

    root /var/www/phrasal;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

but after redeply this site can't be reached
---

## 2026-07-01T11:28:39Z
I have https://phrasal.ddns.net with

 cat /etc/nginx/sites-available/phrasal
server {
    listen 80;
    server_name phrasal.ddns.net;

    root /var/www/phrasal;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

but after redeply this site can't be reached

but by https://141.144.227.73 it works
---

## 2026-07-01T11:30:26Z
previously it works on https://phrasal.ddns.net  but now only on http://141.144.227.73 not on https://141.144.227.73
---

## 2026-07-01T11:32:16Z
update
---

## 2026-07-01T11:43:47Z
git add all changes and commit them with suitable message
---

## 2026-07-01T11:45:12Z
Also in @aux/scripts/vps/mini/special/install-infra.sh add opening ports 80, 443 in iptable
---

## 2026-07-01T11:49:08Z
Also install iptablees
---

## 2026-07-01T11:49:22Z
git add all changes and commit them with suitable message
---

## 2026-07-01T11:53:03Z
Check @aux/scripts/vps/mini/special/deploy-after-undeploy-vps.sh postgress if necessary db and user exists
---

## 2026-07-01T11:54:55Z
git add all changes and commit them with suitable message
---

## 2026-07-01T11:57:49Z
In @.github/workflows/phrasal-deploy.yml on `all`

=== Restoring backend ===
  Creating systemd service...
999
  Uploading JAR...
---

## 2026-07-01T11:59:31Z
git add all changes and commit them with suitable message
---
