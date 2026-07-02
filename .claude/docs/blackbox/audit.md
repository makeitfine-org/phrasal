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

## 2026-07-01T12:02:35Z
Is all good?:

Jul 01 12:00:48 vps-t1 java[124734]: 2026-07-01T12:00:48.518Z  INFO 124734 --- [backend] [           main] o.f.core.internal.command.DbMigrate      : Migrating schema "public" to version "7 - create verb details table"
Jul 01 12:00:49 vps-t1 java[124734]: 2026-07-01T12:00:49.104Z  INFO 124734 --- [backend] [           main] o.f.core.internal.command.DbMigrate      : Migrating schema "public" to version "8 - seed verb details"
Jul 01 12:00:49 vps-t1 java[124734]: 2026-07-01T12:00:49.727Z  INFO 124734 --- [backend] [           main] o.f.core.internal.command.DbMigrate      : Successfully applied 8 migrations to schema "public", now at version v8 (execution time 00:01.162s)
Jul 01 12:00:50 vps-t1 java[124734]: 2026-07-01T12:00:50.617Z  INFO 124734 --- [backend] [           main] o.hibernate.jpa.internal.util.LogHelper  : HHH000204: Processing PersistenceUnitInfo [name: default]
Jul 01 12:00:51 vps-t1 java[124734]: 2026-07-01T12:00:51.406Z  INFO 124734 --- [backend] [           main] org.hibernate.Version                    : HHH000412: Hibernate ORM core version 6.6.39.Final
Jul 01 12:00:51 vps-t1 java[124734]: 2026-07-01T12:00:51.631Z  INFO 124734 --- [backend] [           main] o.h.c.internal.RegionFactoryInitiator    : HHH000026: Second-level cache disabled
Jul 01 12:00:54 vps-t1 java[124734]: 2026-07-01T12:00:54.123Z  INFO 124734 --- [backend] [           main] o.s.o.j.p.SpringPersistenceUnitInfo      : No LoadTimeWeaver setup: ignoring JPA class transformer
Jul 01 12:00:54 vps-t1 java[124734]: 2026-07-01T12:00:54.506Z  INFO 124734 --- [backend] [           main] org.hibernate.orm.connections.pooling    : HHH10001005: Database info:
Jul 01 12:00:54 vps-t1 java[124734]:         Database JDBC URL [Connecting through datasource 'HikariDataSource (HikariPool-1)']
Jul 01 12:00:54 vps-t1 java[124734]:         Database driver: undefined/unknown
Jul 01 12:00:54 vps-t1 java[124734]:         Database version: 16.14
Jul 01 12:00:54 vps-t1 java[124734]:         Autocommit mode: undefined/unknown
Jul 01 12:00:54 vps-t1 java[124734]:         Isolation level: undefined/unknown
Jul 01 12:00:54 vps-t1 java[124734]:         Minimum pool size: undefined/unknown
Jul 01 12:00:54 vps-t1 java[124734]:         Maximum pool size: undefined/unknown
Jul 01 12:01:00 vps-t1 java[124734]: 2026-07-01T12:01:00.831Z  INFO 124734 --- [backend] [           main] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000489: No JTA platform available (set 'hibernate.transaction.jta.platform' to enable JTA platform integration)
Jul 01 12:01:01 vps-t1 java[124734]: 2026-07-01T12:01:01.223Z  INFO 124734 --- [backend] [           main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
Jul 01 12:01:03 vps-t1 java[124734]: 2026-07-01T12:01:03.432Z  INFO 124734 --- [backend] [           main] o.s.d.j.r.query.QueryEnhancerFactory     : Hibernate is in classpath; If applicable, HQL parser will be used.
Jul 01 12:01:16 vps-t1 java[124734]: 2026-07-01T12:01:16.721Z  INFO 124734 --- [backend] [           main] o.s.b.a.e.web.EndpointLinksResolver      : Exposing 3 endpoints beneath base path '/actuator'
Jul 01 12:01:17 vps-t1 java[124734]: 2026-07-01T12:01:17.528Z  INFO 124734 --- [backend] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path '/'
Jul 01 12:01:17 vps-t1 java[124734]: 2026-07-01T12:01:17.905Z  INFO 124734 --- [backend] [           main] net.phrasal.PhrasalApplication           : Started PhrasalApplication in 68.424 seconds (process running for 73.776)
Jul 01 12:01:19 vps-t1 java[124734]: 2026-07-01T12:01:19.016Z  INFO 124734 --- [backend] [nio-8080-exec-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring DispatcherServlet 'dispatcherServlet'
Jul 01 12:01:19 vps-t1 java[124734]: 2026-07-01T12:01:19.019Z  INFO 124734 --- [backend] [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
Jul 01 12:01:19 vps-t1 java[124734]: 2026-07-01T12:01:19.025Z  INFO 124734 --- [backend] [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 5 ms
Jul 01 12:01:21 vps-t1 java[124734]: 2026-07-01T12:01:21.717Z  WARN 124734 --- [backend] [nio-8080-exec-1] ration$PageModule$WarningLoggingModifier : Serializing PageImpl instances as-is is not supported, meaning that there is no guarantee about the stability of the resulting JSON structure!
Jul 01 12:01:21 vps-t1 java[124734]:         For a stable JSON structure, please use Spring Data's PagedModel (globally via @EnableSpringDataWebSupport(pageSerializationMode = VIA_DTO))
Jul 01 12:01:21 vps-t1 java[124734]:         or Spring HATEOAS and Spring Data's PagedResourcesAssembler as documented in https://docs.spring.io/spring-data/commons/reference/repositories/core-extensions.html#core.web.pageables.
---

## 2026-07-01T12:07:49Z
./aux/scripts/vps/mini/redeploy-vps.sh backend 
=== Building backend ===
Built: target/backend-0.1.0.jar
=== Uploading JAR to VPS ===
scp: dest open "/opt/phrasal/app.jar": Permission denied
scp: failed to upload file target/backend-0.1.0.jar to /opt/phrasal/app.jar
---

## 2026-07-01T12:15:42Z
Change @aux/scripts/vps/mini/special/install-infra.sh to do script to execute on vps like in uddeply-vsp.sh etc.
---

## 2026-07-01T12:16:44Z
git add all changes and commit them with suitable message
---

## 2026-07-01T12:22:05Z
I changed @frontend/src/pages/GrammarPage.tsx but @frontend/src/__tests__/GrammarPage.test.tsx didn't fail
---

## 2026-07-01T12:25:02Z
I change @frontend/src/pages/GrammarPage.tsx and run `make clean build` but @frontend/src/__tests__/GrammarPage.test.tsx didn't fail
---

## 2026-07-01T12:26:29Z
Fix that in @Makefile
---

## 2026-07-01T12:32:07Z
git add all changes and commit them with suitable message
---

## 2026-07-01T12:39:07Z
how to run *.test.tsx from intellij idea, cause there is not button to run test as it's for java tests
---

## 2026-07-01T12:41:12Z
No such plugin Vitest
---

## 2026-07-01T12:46:11Z
windows remove files for intellij idea ultimate trial
---

## 2026-07-01T16:49:07Z
I'm going to use Oracle pay as you go 2 VMs on arm 12 RAM and 2 cpu each is free?
---

## 2026-07-01T16:54:44Z
If I already have 1 VM: 1 cpu 1 ram on Ubuntu. How much capacities is awailable for free for me?
---

## 2026-07-01T17:03:58Z
I uze tmux in ubuntu (linux for windows), I split window on 2 by hirizontal, when I click on below window cntr+b, z, I get window full screen, and I try to copy text of by holding cntr and scrolling the mouse but I get copy text which more then screen
---

## 2026-07-01T17:08:42Z
Not working
---

## 2026-07-01T17:13:14Z
I run `oci compute instance list` and get

{
  "data": [
    {
      "agent-config": {
        "are-all-plugins-disabled": false,
        "is-management-disabled": false,
        "is-monitoring-disabled": false,
        "plugins-config": [
          {
            "desired-state": "DISABLED",
            "name": "Vulnerability Scanning"
          },
          {
            "desired-state": "DISABLED",
            "name": "OS Management Hub Agent"
          },
          {
            "desired-state": "DISABLED",
            "name": "Management Agent"
          },
          {
            "desired-state": "ENABLED",
            "name": "Custom Logs Monitoring"
          },
          {
            "desired-state": "DISABLED",
            "name": "Compute RDMA GPU Monitoring"
          },
          {
            "desired-state": "ENABLED",
            "name": "Compute Instance Monitoring"
          },
          {
            "desired-state": "DISABLED",
            "name": "Compute HPC RDMA Auto-Configuration"
          },
          {
            "desired-state": "DISABLED",
            "name": "Compute HPC RDMA Authentication"
          },
          {
            "desired-state": "ENABLED",
            "name": "Cloud Guard Workload Protection"
          },
          {
            "desired-state": "DISABLED",
            "name": "Block Volume Management"
          },
          {
            "desired-state": "DISABLED",
            "name": "Bastion"
          }
        ]
      },
      "availability-config": {
        "is-live-migration-preferred": null,
        "recovery-action": "RESTORE_INSTANCE"
      },
      "availability-domain": "Vcji:EU-FRANKFURT-1-AD-2",
      "capacity-reservation-id": null,
      "cluster-placement-group-id": null,
      "compartment-id": "ocid1.tenancy.oc1..aaaaaaaapllfascgsx52zahz2h66bybqtgejspeh2p3ygxvptyw7us3cxsiq",
      "dedicated-vm-host-id": null,
      "defined-tags": {
        "Oracle-Tags": {
          "CreatedBy": "default/questtv8@gmail.com",
          "CreatedOn": "2026-06-26T16:12:32.372Z"
        }
      },
      "display-name": "VPS-t1",
      "extended-metadata": {},
      "fault-domain": "FAULT-DOMAIN-2",
      "freeform-tags": {},
      "id": "ocid1.instance.oc1.eu-frankfurt-1.antheljtw6ts67qc4odrpmsgq6amfcvsifilbcov64tmmrumcx4osav7zd7a",
      "image-id": "ocid1.image.oc1.eu-frankfurt-1.aaaaaaaaola3pvhd5tx7nnyt3ohx3ef62thau2nuxmbd7geg2u7jxvsruqmq",
      "instance-configuration-id": null,
      "instance-options": {
        "are-legacy-imds-endpoints-disabled": true
      },
      "ipxe-script": null,
      "is-ai-enterprise-enabled": null,
      "is-cross-numa-node": false,
      "launch-mode": "PARAVIRTUALIZED",
      "launch-options": {
        "boot-volume-type": "PARAVIRTUALIZED",
        "firmware": "UEFI_64",
        "is-consistent-volume-naming-enabled": true,
        "is-pv-encryption-in-transit-enabled": true,
        "network-type": "PARAVIRTUALIZED",
        "remote-data-volume-type": "PARAVIRTUALIZED"
      },
      "licensing-configs": null,
      "lifecycle-state": "RUNNING",
      "metadata": {
        "ssh_authorized_keys": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDbntJBsh1mQPGrk5rhGP2Zalj93vNIxLgyKt2N9Am55RUrxrwX82Awajuu49pSgydHst6qvbNaApQV+7Z9sNsv9FPQF00kzTWmy1BttjhR52d3bCJE9O1gm6VQCdKkNMcno25Uez6wHe2tRw0jaOrgGGxaZkj+6O0f+C4b3D0zE6Um92gElRWnS+NXZoj2mgxpwSA58EZhlNtQ4kRDcrWITHB66oaesfF914j+p+jpQUgP0IiWSpjiPsBtm820vOX6SFlBiGzUwjdceUEdwYlD5CKZoCiRBmO4WJBlLrTJkuYKdG0Pc5P5KrnBHPblstNj9HA3HSs2z7bH5Cj8sMbj ssh-key-2026-06-26"
      },
      "placement-constraint-details": null,
      "platform-config": null,
      "preemptible-instance-config": null,
      "region": "eu-frankfurt-1",
      "security-attributes": {},
      "security-attributes-state": "STABLE",
      "shape": "VM.Standard.E2.1.Micro",
      "shape-config": {
        "baseline-ocpu-utilization": null,
        "gpu-description": null,
        "gpus": 0,
        "local-disk-description": null,
        "local-disks": 0,
        "local-disks-total-size-in-gbs": null,
        "local-volume-size-in-gbs": null,
        "max-vnic-attachments": 1,
        "memory-in-gbs": 1.0,
        "networking-bandwidth-in-gbps": 0.48,
        "ocpus": 1.0,
        "processor-description": "2.0 GHz AMD EPYC™ 7551 (Naples)",
        "resource-management": null,
        "vcpus": 2
      },
      "source-details": {
        "boot-volume-size-in-gbs": null,
        "boot-volume-vpus-per-gb": null,
        "image-id": "ocid1.image.oc1.eu-frankfurt-1.aaaaaaaaola3pvhd5tx7nnyt3ohx3ef62thau2nuxmbd7geg2u7jxvsruqmq",
        "instance-source-image-filter-details": null,
        "kms-key-id": null,
        "source-type": "image"
      },
      "system-tags": {
        "orcl-cloud": {
          "free-tier-retained": "true"
        }
      },
      "time-created": "2026-06-26T16:12:32.926000+00:00",
      "time-maintenance-reboot-due": null
    }
  ]
}


What that mean?
---

## 2026-07-01T17:16:27Z
What did I use, how much free I still have?
---

## 2026-07-01T17:17:31Z
  - 2 VMs total, each 1/8 OCPU + 1 GB RAM. You say 1/8 OCPU but I see 1 OCPU, right? didn't catch the differenct, I didn't see 1/8 OCPU
---

## 2026-07-01T17:20:09Z
1/8 of a core, but I run my fullstack web app: java + nginx + postgres, and it's work fine.
---

## 2026-07-01T17:21:29Z
- so how much users simultaniously can the app handle now?
- it is better to move to Node? how much users simultln. then the app. will be able to handle?
---

## 2026-07-01T19:26:11Z
If turn on virtual threads in spring boot backend?
---

## 2026-07-01T19:30:01Z
If rewrite backend postrgess spring boot to reactive non-blocking approach?
---

## 2026-07-01T19:32:04Z
I don't understand the issue with RAM which you are talking about all the time? explain simpler, simple example
---

## 2026-07-01T19:34:15Z
- but disk is SSD, it very fast
- it to connect virtual threads and use non-blockin IO drivers for postgres
---

## 2026-07-01T19:37:53Z
You're right that this combo uses less memory per request — maybe ~0.1 MB instead of ~1 MB per connection. So:

  50 users: ~5 MB instead of ~50 MB for threads

  That saves ~45 MB.

but was
  50 users at the same time = ~300 MB. Problem:

so its 6x users more?
---

## 2026-07-01T19:39:50Z
Is there any sense not just turn on virtual thread in spring without non-blocking postgress driver
---

## 2026-07-01T19:41:07Z
but if in addition to switch to non-bloking postgress IO driver
---

## 2026-07-01T19:42:45Z
But if in addition to migrate to webflux
---

## 2026-07-01T19:44:08Z
activate virtual threads in spring
---

## 2026-07-01T19:44:59Z
Will it now be active in all @backend/src/main/resources/application-dev.yml and @backend/src/main/resources/application-prod.yml?
---

## 2026-07-01T19:46:59Z
git add all changes and commit them with suitable message
---

## 2026-07-02T08:05:37Z
Liquibase or mongock
---

## 2026-07-02T08:07:33Z
If migrate from mysql to mongo
---

## 2026-07-02T11:11:09Z
What does this mean?:


Cost Management
Overview
Cost analysis
Cost and Usage Reports
Budgets
Scheduled reports
Oracle FinOps Hub
The FinOps Hub is your centralized place to allocate, analyze, and optimize your cloud cost on OCI.
Inform

Active subscriptions
Subscription

77112865-Universal Credits
Usage period:
Jun 25, 2026 - Jul 24, 2026
Usage
-&#x2F;PLN 1,150.00
Expires: Jul 24, 2026

Costs
Time Frame

Last Month
Analyze costs
Cost by compartment
Cost by region
Cost by product description
No data found for this request
No data found for this request
No data found for this request
Budgets & forecasts
Create budget
Name
Budget type
Amount
Spent
% spent in period
Forecast
Row header
Budget
Monthly    PLN1.00    PLN0.00    Not available    PLN0.00    Row with I.D. row_ocid1.budget.oc1.eu-frankfurt-1.amaaaaaaw6ts67qa24zkc37vnzg32fmeajc5vo56whpvchrk4yau35vpjdka
Showing 1 item
Previous page
1 of 1
Next page
Optimize

All recommendations
Potential savings per month
Recommendations
Recommendation type
Potential/monthly savings
Row header
Improve fault tolerance
-    Row with I.D. high-availability-compute-fault-domain-name
Enable object versioning
-    Row with I.D. high-availability-object-storage-enable-object-versioning
Enable object replication
-    Row with I.D. high-availability-object-storage-enable-replication
Downsize underutilized ADW and ATP databases
-    Row with I.D. cost-management-autonomous-database-underutilized-name
Delete unattached block volumes
-    Row with I.D. cost-management-block-volume-attachment-name
Showing 5 items
Previous page
1 of 5
Next to page 2
Operate
FinOps FOCUS compliant data export
Export your OCI usage & cost data in the standardized FOCUS CSV format to manage costs outside of OCI.

Exports
Control User Access
Create policies to enable user access for cost management

Identity Access Policies
Manage resource metadata
Define resource metadata using Tags. Automate tagging using Tag default values.

Tag Namespaces
Find savings opportunities
Analyze resource usage to identify waste

Resource Utilization Monitoring
Documentation
Understand usage and cost
Reporting & analytics
Business planning
Budgeting
Forecasting
Planning & estimating
Optimize usage and cost
Cloud sustainability
Workload optimization
Manage FinOps
Cloud policy
Governance
Invoicing
Organization Management cost reporting integration
Use arrow keys to read it, To move around, please hold and drag
The FinOps Hub is your centralized place to access FinOps capabilities in the Oracle Cloud Console. Explore the FinOps hub to learn about the features and tools available to you.

Start the tour
---

## 2026-07-02T11:12:06Z
But I set bugdet:

Billing & Cost Management


Cost Management
Overview
Cost Analysis
Cost and Usage Reports
Budgets
Scheduled Reports
Cost Anomaly Detection
Budgets
You can use budgets to track costs in your tenancy. After creating a budget for a compartment, you can set up alerts that will notify you if a budget is forecast to be exceeded or if spending surpasses a certain amount.
Search and Filter
Search
Create Budget

Name
Status
Budget Type
Budget Scope
Target
Amount
Spent
% Spent In Period
Forecast
Budget
Active
Monthly
Compartment
questtv8 (root)

zł1
zł0
N/A
zł0



Page 1 of 1
Items per page
25
---

## 2026-07-02T11:13:08Z
I didn't set that 1150 zlt budged, how torestict that to 1 zlt?
---

## 2026-07-02T11:14:47Z
Is it possible to set budget so that oracle just not to take more? Not only alert
---

## 2026-07-02T11:39:21Z
If I set up 2 VM arm 2 cpu and 12 each with cubernetes? What should I pay for? what traffic limits? is it enough for 100 users simultaniously on a month for my `phrasal` app?
---

## 2026-07-02T11:43:01Z
 - ~20GB left for your actual app
  - ~3 cores left for your workloads

Where is 1 core? and 4 GB RAM?
---

## 2026-07-02T11:44:46Z
But if I want to use K8s with 2 VMs, is it good for 100 users simultaniously? Will it work fine?
---

## 2026-07-02T11:54:26Z
How's better to divide the noted in such case for control plane and workers? what benefit of k8s instead of docker compose here?
---

## 2026-07-02T11:59:41Z
How to redeploy with docker compose in case I choose that? is it possible zero downtime?
---

## 2026-07-02T12:02:08Z
shoud it be deployed on single VM docker compose?
---

## 2026-07-02T12:03:27Z
what the reason of docker compose? can it be replicated on diff nodes like k8s?
---

## 2026-07-02T12:06:56Z
if I split k8s to 4 VM: 1 cpu 6 ram each? cons, proc?
---

## 2026-07-02T12:07:06Z
if I split k8s to 4 VM: 1 cpu 6 ram each? cons, proc? best way to do that for my app?
---

## 2026-07-02T12:14:31Z
If I choose 2 VM with 2 cpu  X 12 Gb each on k8s: 1 vm (control + worker), 1 vm (worker).
What the reason for donw first VM or second VM, or even both.  will k8s solve that automatically if it happen or I should do/activate something?
---

## 2026-07-02T12:23:08Z
If to have cluster: 1 VM 1 cpu 4 ram for controll and 1 VM 3 cpu 20 ram for worker? or you can propose somthing better?
---

## 2026-07-02T12:26:43Z
 - If VM2 dies → backend reschedules to VM3
  - If VM3 dies → DB reschedules to VM2

What does it mean reschedule
---

## 2026-07-02T12:51:32Z
 OCI Block Volume (network disk) │ Yes — K8s reattaches it to the new pod on VM2? Is it free? when to say to create that for OCI while createing that VMs
---

## 2026-07-02T12:58:03Z
So I have 200 gb free is there sense to create VMs with smaller boot storage to have more disk memory in spare for other usage?
---

## 2026-07-02T13:04:05Z
But as for the storage, I have already 1 VM with 1 cpu, 1 RAM with ubuntu.
---

## 2026-07-02T13:09:23Z
But as for the storage, I have already 1 VM with 1 cpu, 1 RAM with ubuntu (not from ARM).
---

## 2026-07-02T13:11:24Z
on that vm:
 uname -m
x86_64
---

## 2026-07-02T13:14:01Z
But in such case show be the best way to create k8s cluster?
---

## 2026-07-02T13:14:30Z
That VM is separate and used for other purposes. So in such case show be the best way to create k8s cluster?
---

## 2026-07-02T13:20:47Z
git add all changes and commit them with suitable message
---
