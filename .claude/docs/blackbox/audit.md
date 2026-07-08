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

## 2026-07-02T14:36:12Z
On OCI on 
Upgrade your account
It ask my tax details. What if I set Tax information is not available.
---

## 2026-07-02T14:38:02Z
But it asks the reson "Applied for" or "Not registered"
---

## 2026-07-02T14:38:52Z
ID/VAT is it in Ukrainina ІПН?
---

## 2026-07-02T14:50:23Z
How to remove card from oracle?
---

## 2026-07-02T15:00:20Z
I sse in pyament method only add, no delete card how to handle that?
---

## 2026-07-02T15:00:56Z
No fucntionaly set as default
---

## 2026-07-02T15:03:47Z
there is not payment methods:

Skip to main content
Free Tier account
You are in a Free Trial. When your trial is over, your account is limited to Always Free resources. Upgrade at any time.
Learn more

Messages region has new messages. Press F6 to navigate.
Search
Home
Compute
Storage
Networking
Oracle AI Database
Databases
Analytics & AI
Developer Services
Identity & Security
Observability & Management
Hybrid & Multicloud
Migration & Recovery
Billing & Cost Management
Governance & Administration
Marketplace
Billing & Cost Management
Billing
Subscriptions
Invoices
Usage Statements
Payment History
Upgrade and Manage Payment
Cost Management
Overview
Cost Analysis
Cost and Usage Reports
Budgets
Scheduled Reports
Cost Anomaly Detection
Programs and Rewards
Oracle Support Rewards
Rewards Redemption History
Search resources, services, documentation, and Marketplace

Terms of Use and PrivacyCookie Preferences
Copyright © 2026, Oracle and/or its affiliates. All rights reserved.
---

## 2026-07-02T15:13:57Z
I have all the time issues with support on OCI, aws is better in that case?
---

## 2026-07-02T15:29:40Z
Something went wrong
We're unable to complete your request. Common errors are due to: (a) Using prepaid cards. Oracle only accepts credit card and debit cards (b) Intentionally or unintentionally masking one's location or identity (c) Entering incomplete or inaccurate account details. Please try again if this applies to you. Otherwise, contact Oracle Customer Service.
---

## 2026-07-02T15:36:30Z
Change the profile country in OCI
---

## 2026-07-02T15:38:55Z
But then after registration pay as you go can I remove the card?
---

## 2026-07-02T15:40:08Z
so if I reg. pay as you go with one card and then attach second, can I remove that what I used for reg.?
---

## 2026-07-02T15:41:37Z
If I buy 2 VMPs on other provider can I run k8s cluster for free?
---

## 2026-07-02T15:42:58Z
But what should I also install, compared to OCI? what willl I not have?
---

## 2026-07-02T16:21:18Z
Is it possible in OCI for free to use teraform for creating VMs and its configs?
---

## 2026-07-02T16:23:31Z
So in OCI I can use  Terraform + OCI Provider or OCI Resource Manager for free?
---

## 2026-07-02T16:23:52Z
What's better to use in OCI?
---

## 2026-07-02T16:25:05Z
I don't understand I can you terform to create claude OCI resouces and provision it, or I can use terafform only locally on my machine?
---

## 2026-07-02T16:27:42Z
But what the difference with OCI Resouce Manager then
---

## 2026-07-02T16:52:29Z
Oracle support isn't answer, I can't upgrate to pay as you go, it didn't take even correct account? is there better clouds services?
---

## 2026-07-02T17:11:28Z
The most free oracle zone to create free VMs on arm
---

## 2026-07-02T17:12:34Z
In the world. Phoenix?
---

## 2026-07-02T17:13:49Z
What to choose?
---

## 2026-07-02T17:15:26Z
How actual your data?
---

## 2026-07-02T17:16:38Z
" The real test is try to create the VM — you'll instantly see "Out of host capacity" if it's full"

How can I do that I registarte in franfurt region.
---

## 2026-07-02T17:27:19Z
:cp
---

## 2026-07-02T17:30:40Z
oci terminal command to see all payment methods I bound to account
---

## 2026-07-02T17:32:28Z
$>oci iam compartment list

Is empty
---

## 2026-07-02T17:37:34Z
 oci account subscription list
Usage: oci [OPTIONS] COMMAND [ARGS]...

Error: No such command 'account'.
---

## 2026-07-02T17:39:18Z
 oci budgets budget list --compartment-id $(grep tenancy ~/.oci/config | head -1 | cut -d= -f2)
Usage: oci budgets budget [OPTIONS] COMMAND [ARGS]...

Error: No such command 'list'.

For OCI CLI commands and parameters suggestion, auto completion and other useful features, try the Interactive mode by typing `oci -i`.
---

## 2026-07-02T17:39:58Z
 oci budgets budget --help
Usage: oci budgets budget [OPTIONS] COMMAND [ARGS]...

  Use the Budgets CLI to manage budgets and budget alerts. For more
  information, see [Budgets Overview].

Options:
  -?, -h, --help  For detailed help on any of these individual commands, enter
                  <command> --help.

Commands:
  alert-rule  The alert rule.
  budget      A budget.
---

## 2026-07-02T17:40:52Z
it works:  oci budgets budget budget list --compartment-id $(grep tenancy ~/.oci/config | head -1
 | cut -d= -f2)
---

## 2026-07-02T17:41:06Z
how to see all cards bound?
---

## 2026-07-02T17:41:59Z
can I upgrade to "pay as you go" through console terminal?
---

## 2026-07-02T17:44:01Z
I write to support few days ago That I cannot. Registry. Pay as you go and they don't answer.
---

## 2026-07-02T17:45:58Z
digital ocean cost for 4 cpu 24 ram VMs?
---

## 2026-07-02T20:24:58Z
Except OCI, what is the cheapest Cloud
---

## 2026-07-02T20:25:09Z
Except OCI, what is the cheapest Cloud for K8s
---

## 2026-07-03T15:13:46Z
What's fault domain in coracle instance
---

## 2026-07-03T15:20:41Z
Where to disable that:

Out of capacity for shape VM.Standard.A1.Flex in availability domain AD-2. Create the instance in a different availability domain or try again later.If you specified a fault domain, try creating the instance without specifying a fault domain. If that doesn’t work, please try again later.Learn more about host capacity.
---

## 2026-07-03T15:30:22Z
Consider that while creating instance:

Name
VPS-t1
Create in compartment
questtv8 (root)
Placement
Availability domain
AD-2
Capacity type
on-demand
Fault domain
FD-2
Image
Operating system
Canonical Ubuntu 24.04 Minimal aarch64
Image build
2026.04.30-1
Security
BM Confidential computing
Shape
Shape
VM.Standard.A1.Flex
Shape build
Virtual machine, 1 core OCPU, 8 GB memory, 1 Gbps network bandwidth
Management
Authorization header
Enabled
Tags
Namespace
Key
Value
No items to display
Create new items or search again using different filters or search terms.
Availability configuration
Live migration
Let Oracle choose the best migration option
Restart after infrastucture maintenance
Enabled
Oracle Cloud Agent
Vulnerability Scanning
Disabled
OS Management Hub Agent
Disabled
Management Agent
Disabled
Custom Logs Monitoring
Enabled
Compute RDMA GPU Monitoring
Disabled
Compute Instance Monitoring
Enabled
Compute HPC RDMA Auto-Configuration
Disabled
Compute HPC RDMA Authentication
Disabled
Cloud Guard Workload Protection
Enabled
Block Volume Management
Disabled
Bastion
Disabled

Security
Edit
Secure Boot
Disabled
Measured Boot
Disabled
Trusted Platform Module
Disabled
Confidential computing
Disabled
Security attributes
Namespace
Key
Value
No items to display
Create new items or search again using different filters or search terms.

Networking
Edit
VNIC name
-
Virtual cloud network
VCN-t1
Subnet
public subnet-VCN-t1
Launch options
-
DNS record
Yes
Use network security groups to control traffic
No
Public IPv4 address
Yes
Private IPv4 address
Automatically assigned on creation
Private IPv4 Ocid
-
IPv6 address
undefined
IPv6 address OCID
SSH keys
SSH keys
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCkX3OBnj6p1iLPAEFxQgBLPNfIgMb+9JDYqp0sVUVxDY30VB2F5eQs+KBA3L2nZVSkHoNB0WmNBa2koH0n92xWegVF7TVq52YLB6E6ZdzboGczHHLQQ4jVCpaYlb+0IxES+G2bsc8Rvx/WhaJ0fJiLoNiYO6Yrj1LOYlViQw5EGjDzDRBz3jOGKbXu2xe22ISLwYUBIPCaPD2ThC2Y/2GfSQkUHAG/AGq7b15HVJHDUSL+nVp2UGpDTRMisZhMmU0jvMqgzsyl7QvJZ81/fDJvMAepUqKzlAOPbDKcmCQyb8hMI85fWNR3+P81fCKOdJRouBbiUvJ8Q49l3dDEajEh ssh-key-2026-07-03ssh-rsa AA...

Storage
Edit
Boot volume
Specify a custom boot volume size and performance setting
-
Boot volume performance (VPU)
-
Use in-transit encryption
Enabled
Master encryption key
-
Block volume
Name
Attachment type
Create type
Reservations
Access
No items to display
Create new items or search again using different filters or search terms.
---

## 2026-07-03T15:31:02Z
based on the above show cli command
---

## 2026-07-03T15:38:20Z
Is that arm?:

  oci compute instance launch \
      --availability-domain Vcji:EU-FRANKFURT-1-AD-2 \
      --shape VM.Standard.A1.Flex \
      --shape-config '{"ocpus": 1, "memoryInGBs": 8}' \
      --image-id ocid1.image.oc1.eu-frankfurt-1.aaaaaaaa33mxho6qsnmm4yu7xo3nrnvjubiimgqpsc5ycpoakz6pb4cts2ma \
      --subnet-id ocid1.subnet.oc1.eu-frankfurt-1.aaaaaaaahsuuw4tlf3axapvev5vqt6oztiqgs44tvsf2zhbm5ar7feydnyea \
      --assign-public-ip true \
      --ssh-authorized-keys-file ~/.ssh/id_rsa.pub \
      --display-name "phrasal-arm-1"
---

## 2026-07-03T15:39:22Z
oci compute instance launch \
      --availability-domain Vcji:EU-FRANKFURT-1-AD-2 \
      --shape VM.Standard.A1.Flex \
      --shape-config '{"ocpus": 1, "memoryInGBs": 8}' \
      --image-id ocid1.image.oc1.eu-frankfurt-1.aaaaaaaa33mxho6qsnmm4yu7xo3nrnvjubiimgqpsc5ycpoakz6pb4cts2ma \
      --subnet-id ocid1.subnet.oc1.eu-frankfurt-1.aaaaaaaahsuuw4tlf3axapvev5vqt6oztiqgs44tvsf2zhbm5ar7feydnyea \
      --assign-public-ip true \
      --ssh-authorized-keys-file ~/.ssh/id_rsa.pub \
      --display-name "phrasal-arm-1"
ServiceError:
{
    "client_version": "Oracle-PythonSDK/2.180.0, Oracle-PythonCLI/3.88.0",
    "code": "InternalError",
    "logging_tips": "Please run the OCI CLI command using --debug flag to find more debug information.",
    "message": "Out of host capacity.",
    "opc-request-id": "0BE0B19F2420476DAAC08D227424B8B7/1B5C8C1A9066B2F696D7476A465241EE/F4873E1A6DEC65DD1E0BED25C9B694EE"$
    "operation_name": "launch_instance",
    "request_endpoint": "POST https://iaas.eu-frankfurt-1.oraclecloud.com/20160918/instances",
    "status": 500,
    "target_service": "compute",
    "timestamp": "2026-07-03T15:39:03.639787+00:00",
    "troubleshooting_tips": "See [https://docs.oracle.com/iaas/Content/API/References/apierrors.htm] for more information about resolving this error. If you are unable to resolve this issue, run this CLI command with --debug option and contact Oracle support and provide them the full error message."
}
---

## 2026-07-03T15:40:15Z
where did you read it's full?
---

## 2026-07-03T15:43:11Z
will @aux/scripts/ocivps.sh stop on creation instance?
---

## 2026-07-03T15:44:11Z
copy this script into VPs
---

## 2026-07-03T15:44:52Z
give me a command to copy, how to reach the vps see in @.github/workflows/phrasal-deploy.yml file
---

## 2026-07-03T15:47:12Z
install oci on ubuntu
---

## 2026-07-03T15:58:34Z
Usage: oci compute instance list [OPTIONS]

Error: Missing option(s) --compartment-id.

how to add --compartment-id by default?
---

## 2026-07-03T16:01:11Z
I have the same ~/.oci/config on 2 diff. PC. But on one `oci compute instance list` work on another it requires --compartment-id
---

## 2026-07-03T16:02:04Z
update oci on linux
---

## 2026-07-03T16:05:31Z
pip3 install oci-cli --upgrade
error: externally-managed-environment

× This environment is externally managed
╰─> To install Python packages system-wide, try apt install
    python3-xyz, where xyz is the package you are trying to
    install.

    If you wish to install a non-Debian-packaged Python package,
    create a virtual environment using python3 -m venv path/to/venv.
    Then use path/to/venv/bin/python and path/to/venv/bin/pip. Make
    sure you have python3-full installed.

    If you wish to install a non-Debian packaged Python application,
    it may be easiest to use pipx install xyz, which will manage a
    virtual environment for you. Make sure you have pipx installed.

    See /usr/share/doc/python3.14/README.venv for more information.

note: If you believe this is a mistake, please contact your Python installation or OS distribution provider. You can override this, at the risk of breaking your Python installation or OS, by passing --break-system-packages.
hint: See PEP 668 for the detailed specification.
---

## 2026-07-03T16:07:15Z
I have oci --version 3.88.0 and oci 3.89.0 (not work without contenporary-id)
---

## 2026-07-03T16:12:33Z
I added compartment-id into ~/.oci/config but `oci compute instance list` doesn't work withot it --compartment-id but it I add it to the command it works.
---

## 2026-07-03T16:15:29Z
[DEFAULT]
user=ocid1.user.oc1..aaaaaaaaenyllidaxbabu5unommz3h4jeagjk5ff44egrmi5ajgf575soa7q
fingerprint=02:96:e3:23:44:8a:6c:30:45:53:2d:73:e0:fe:e5:c4
key_file=/home/ubuntu/.oci/oci_api_key.pem
tenancy=ocid1.tenancy.oc1..aaaaaaaapllfascgsx71zahz2h66bybqtgejspeh2p3ygxvptyw7us3cxsiq
region=eu-frankfurt-1
compartment-id=ocid1.tenancy.oc1..aaaaaaaapllfascgsx71zahz2h66bybqtgejspeh2p3ygxvptyw7us3cxsiq
---

## 2026-07-03T16:16:27Z
doen't help
---

## 2026-07-03T16:28:08Z
Fri Jul  3 16:26:29 UTC 2026 — Attempting launch...
Usage: oci compute instance launch [OPTIONS]

Error: Invalid value for '--ssh-authorized-keys-file': '/home/ubuntu/.ssh/id_rsa.pub': No such file or directory

For OCI CLI commands and parameters suggestion, auto completion and other useful features, try the Interactive mode by typi
ng `oci -i`.
Failed — retrying in 75 sec...

should this file be like in ~/.oci/config key_file *.pem?
---

## 2026-07-03T16:28:58Z
how to generate that  ~/.ssh/id_rsa
---

## 2026-07-03T16:30:19Z
Is it just public key? why not private or both?
---

## 2026-07-03T16:33:28Z
so it doesnt' override my local machine ~/.ssh/id_rsa.pub key?
---

## 2026-07-03T16:35:03Z
 So:

  Local PC  →  (local ~/.ssh/id_rsa)  →  SSH into VPS
  VPS       →  (VPS ~/.ssh/id_rsa)    →  SSH into new ARM VM

Meaning?
---

## 2026-07-03T16:39:25Z
time_a=75

while true; do
    echo "$(date) — Attempting launch..."
    oci compute instance launch \
      --availability-domain Vcji:EU-FRANKFURT-1-AD-2 \
      --shape VM.Standard.A1.Flex \
      --shape-config '{"ocpus": 1, "memoryInGBs": 8}' \
      --image-id ocid1.image.oc1.eu-frankfurt-1.aaaaaaaa33mxho6qsnmm4yu7xo3nrnvjubiimgqpsc5ycpoakz6pb4cts2ma \
      --subnet-id ocid1.subnet.oc1.eu-frankfurt-1.aaaaaaaahsuuw4tlf3axapvev5vqt6oztiqgs44tvsf2zhbm5ar7feydnyea \
      --assign-public-ip true \
      --ssh-authorized-keys-file ~/.ssh/id_rsa.pub \
      --display-name "phrasal-arm-1" 2>&1 | tee /tmp/oci-launch.log

    if grep -q '"lifecycle-state"' /tmp/oci-launch.log; then
      echo "SUCCESS! Instance launched."
      break
    fi

    echo "Failed — retrying in $time_a sec..."
    sleep $time_a
  done


Change the above script to add time and date to log.
And how to run that as separate process and follow it log if I want
---

## 2026-07-03T16:40:07Z
@aux/scripts/ocivps.sh 


  Change the above script to add time and date to log.
---

## 2026-07-03T16:45:50Z
How to run that as separate process and follow it log if I want
---

## 2026-07-03T16:52:32Z
If I connect into vps from tmux and run tmux inside vps
---

## 2026-07-03T16:53:08Z
ubuntu@vps-t1:~$ nohup bash ~/ocivps.sh &
[1] 145998
ubuntu@vps-t1:~$ nohup: ignoring input and appending output to 'nohup.out'
---

## 2026-07-03T16:55:52Z
install tail on ubuntu
---

## 2026-07-03T17:12:56Z
A have alias in ~/.bashrc but it don't work in script, how to source .bashrc in script?
---

## 2026-07-03T17:31:14Z
$ ./ocivps.sh
[2026-07-03 19:30:56] Attempting launch...
Traceback (most recent call last):
  File "/home/ubuntu/bin/oci", line 6, in <module>
    sys.exit(cli())
             ^^^^^
  File "/home/ubuntu/lib/oracle-cli/lib/python3.12/site-packages/click/core.py", line 1130, in __call__
    return self.main(*args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/ubuntu/lib/oracle-cli/lib/python3.12/site-packages/click/core.py", line 1055, in main
    rv = self.invoke(ctx)
         ^^^^^^^^^^^^^^^^
  File "/home/ubuntu/lib/oracle-cli/lib/python3.12/site-packages/click/core.py", line 1654, in invoke
    super().invoke(ctx)
  File "/home/ubuntu/lib/oracle-cli/lib/python3.12/site-packages/click/core.py", line 1404, in invoke
    return ctx.invoke(self.callback, **ctx.params)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/ubuntu/lib/oracle-cli/lib/python3.12/site-packages/click/core.py", line 760, in invoke
    return __callback(*args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/ubuntu/lib/oracle-cli/lib/python3.12/site-packages/click/decorators.py", line 26, in new_func
    return f(get_current_context(), *args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/ubuntu/lib/oracle-cli/lib/python3.12/site-packages/oci_cli/cli_root.py", line 553, in cli
    check_key_for_security(auth, config_file, profile)
  File "/home/ubuntu/lib/oracle-cli/lib/python3.12/site-packages/oci_cli/cli_root.py", line 601, in check_key_for_security
    if key_file and not validate_label_private_key(key_file):
                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/ubuntu/lib/oracle-cli/lib/python3.12/site-packages/oci_cli/cli_root.py", line 613, in validate_label_private_key
    with open(file_path, "r") as file:
         ^^^^^^^^^^^^^^^^^^^^
FileNotFoundError: [Errno 2] No such file or directory: '/home/ubuntuu/.oci/oci_api_key.pem'
[2026-07-03 19:30:56] Failed — retrying in 60 sec...
^C
---

## 2026-07-03T17:39:14Z
tail last 100 lines
---

## 2026-07-03T17:42:11Z
ServiceError:
{
    "client_version": "Oracle-PythonSDK/2.180.0, Oracle-PythonCLI/3.88.0",
    "code": "InternalError",
    "logging_tips": "Please run the OCI CLI command using --debug flag to find more debug information.",
    "message": "Out of host capacity.",
    "opc-request-id": "BC3FA559F61E44D4BA6BEEBA8EECE47F/E175D6B6C5DBCEB350F4476A4652417D/E33BCD689CAFF5034167DC2EEBEC1B98",
    "operation_name": "launch_instance",
    "request_endpoint": "POST https://iaas.eu-frankfurt-1.oraclecloud.com/20160918/instances",
    "status": 500,
    "target_service": "compute",
    "timestamp": "2026-07-03T17:41:37.638390+00:00",
    "troubleshooting_tips": "See [https://docs.oracle.com/iaas/Content/API/References/apierrors.htm] for more information about resolving this error. If you are unable to resolve this issue, run this CLI command with --debug option and contact Oracle support and provide them the full error message."
---

## 2026-07-03T17:43:29Z
 oci compute instance list
ServiceError:
{
    "client_version": "Oracle-PythonSDK/2.181.0, Oracle-PythonCLI/3.89.0",
    "code": "NotAuthenticated",
    "logging_tips": "Please run the OCI CLI command using --debug flag to find more debug information.",
    "message": "Failed to verify the HTTP(S) Signature",
    "opc-request-id": "6FC68F136B6F4C74A5B959DFA07986D1/5430F9F7CD82E593B0F4476A46524187/F3CBA35D4E827A89B61F755F2F2C69B9",
    "operation_name": "list_instances",
    "request_endpoint": "GET https://iaas.eu-frankfurt-1.oraclecloud.com/20160918/instances",
    "status": 401,
    "target_service": "compute",
    "timestamp": "2026-07-03T17:43:12.429863+00:00",
    "troubleshooting_tips": "See [https://docs.oracle.com/iaas/Content/API/References/apierrors.htm] for more information about resolving this error. If you are unable to resolve this issue, run this CLI command with --debug option and contact Oracle support and provide them the full error message."
}
---

## 2026-07-03T18:10:41Z
Is it fully correct command?

oci compute instance launch \
      --availability-domain Vcji:EU-FRANKFURT-1-AD-2 \
      --shape VM.Standard.A1.Flex \
      --shape-config '{"ocpus": 1, "memoryInGBs": 8}' \
      --image-id ocid1.image.oc1.eu-frankfurt-1.aaaaaaaa33mxho6qsnmm4yu7xo3nrnvjubiimgqpsc5ycpoakz6pb4cts2ma \
      --subnet-id ocid1.subnet.oc1.eu-frankfurt-1.aaaaaaaahsuuw4tlf3axapvev5vqt6oztiqgs44tvsf2zhbm5ar7feydnyea \
      --assign-public-ip true \
      --ssh-authorized-keys-file ~/.ssh/id_rsa.pub \
      --display-name "phrasal-arm-1" 2>&1
---

## 2026-07-03T18:19:08Z
ServiceError:                                                                                                20:09 [0/1397]
{
    "client_version": "Oracle-PythonSDK/2.181.0, Oracle-PythonCLI/3.89.0",
    "code": "InternalError",
    "logging_tips": "Please run the OCI CLI command using --debug flag to find more debug information.",
    "message": "Out of host capacity.",
    "opc-request-id": "BB3A508C353E4417B924F9A8311E1E74/5C9C0D327E535571F8FA476A465241E9/B65919829F27ABD673FA51B3547B4769",
    "operation_name": "launch_instance",
    "request_endpoint": "POST https://iaas.eu-frankfurt-1.oraclecloud.com/20160918/instances",
    "status": 500,
    "target_service": "compute",
    "timestamp": "2026-07-03T18:10:01.116595+00:00",
    "troubleshooting_tips": "See [https://docs.oracle.com/iaas/Content/API/References/apierrors.htm] for more information a
bout resolving this error. If you are unable to resolve this issue, run this CLI command with --debug option and contact Or
acle support and provide them the full error message."
}
[2026-07-03 20:08:21] Failed — retrying in 90 sec...
[2026-07-03 20:11:31] Attempting launch...
ServiceError:
{
    "client_version": "Oracle-PythonSDK/2.181.0, Oracle-PythonCLI/3.89.0",
    "code": "InternalError",
    "logging_tips": "Please run the OCI CLI command using --debug flag to find more debug information.",
    "message": "Out of host capacity.",
    "opc-request-id": "1DF3975A32F04BAC815B4CF25F39BD67/915E97F1CC68F93FB9FB476A4652412A/E64784CEEFB3C37376D86DD34DFE73D5",
    "operation_name": "launch_instance",
    "request_endpoint": "POST https://iaas.eu-frankfurt-1.oraclecloud.com/20160918/instances",
    "status": 500,
    "target_service": "compute",
    "timestamp": "2026-07-03T18:13:13.796651+00:00",
    "troubleshooting_tips": "See [https://docs.oracle.com/iaas/Content/API/References/apierrors.htm] for more information a
bout resolving this error. If you are unable to resolve this issue, run this CLI command with --debug option and contact Or
acle support and provide them the full error message."
}
[2026-07-03 20:11:31] Failed — retrying in 90 sec...
[2026-07-03 20:14:44] Attempting launch...
ServiceError:
{
    "client_version": "Oracle-PythonSDK/2.181.0, Oracle-PythonCLI/3.89.0",
    "code": "InternalError",
    "logging_tips": "Please run the OCI CLI command using --debug flag to find more debug information.",
    "message": "Out of host capacity.",
    "opc-request-id": "29686B170B91479D91175F2D366F6EAA/9E47A71AAE588E7279FC476A46524163/4C741F7BA601918AA73BC21C389BF227",
    "operation_name": "launch_instance",
    "request_endpoint": "POST https://iaas.eu-frankfurt-1.oraclecloud.com/20160918/instances",
    "status": 500,
    "target_service": "compute",
    "timestamp": "2026-07-03T18:16:26.610755+00:00",
    "troubleshooting_tips": "See [https://docs.oracle.com/iaas/Content/API/References/apierrors.htm] for more information a
bout resolving this error. If you are unable to resolve this issue, run this CLI command with --debug option and contact Or
acle support and provide them the full error message."
}
[2026-07-03 20:14:44] Failed — retrying in 90 sec...
[2026-07-03 20:17:57] Attempting launch...
---

## 2026-07-03T18:23:07Z
Add colour to script logs and errors messages
---

## 2026-07-03T18:25:42Z
Also add collor to json fields which return as response of OCI
---

## 2026-07-03T18:31:44Z
If you get json response, for example:

[2026-07-03 20:27:26] Trying Vcji:EU-FRANKFURT-1-AD-1...
ServiceError:
{
    "client_version": "Oracle-PythonSDK/2.181.0, Oracle-PythonCLI/3.89.0",
    "code": "InternalError",
    "logging_tips": "Please run the OCI CLI command using --debug flag to find more debug information.",
    "message": "Out of host capacity.",
    "opc-request-id": "8D159D715046419BB7EBF3245AEC9636/B10D0207AC40018475FF476A4652413A/F26A024721BFC393BA88DF2D48D69902",
    "operation_name": "launch_instance",
    "request_endpoint": "POST https://iaas.eu-frankfurt-1.oraclecloud.com/20160918/instances",
    "status": 500,
    "target_service": "compute",
    "timestamp": "2026-07-03T18:29:11.123932+00:00",
    "troubleshooting_tips": "See [https://docs.oracle.com/iaas/Content/API/References/apierrors.htm] for more information a
bout resolving this error. If you are unable to resolve this issue, run this CLI command with --debug option and contact Or
acle support and provide them the full error message."
}

you should parse set and make green color for json field and blue collor for value
---

## 2026-07-03T18:39:10Z
and write into $LOG colorized result also
---

## 2026-07-03T18:43:02Z
git add all changes and commit them with suitable message
---

## 2026-07-06T10:15:52Z
Cheap and good uptime and quality VPS servers in Europe
---

## 2026-07-06T10:22:11Z
Console
Search…
Ctrl K

1
Activities
View all 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

K0733309926
Important status messages
Maintenance:
1
Other:
2
Last updated:
about 2 hours ago
Hetzner Accounts routine maintenance work
Start at:
2026-07-06 21:00 GMT+2
End at:
2026-07-06 21:30 GMT+2
Last updated:
about 2 hours ago
Details
Limited availability of cloud instances
Created:
2026-06-26 08:00 GMT+2
Last updated:
10 days ago
Details
High traffic of Object Storage may lead to timeouts
Created:
2026-01-15 16:39 GMT+1
Last updated:
about 2 months ago
Details

Dismiss all
Back to servers
Create a server
Type
Shared Resources
Dedicated Resources
Traffic
cpx22
2
4 GB
80 GB
20 TB
€0.031
 / h
€19.49
 / mo
cpx32
4
8 GB
160 GB
20 TB
€0.057
 / h
€35.49
 / mo
cpx42
8
16 GB
320 GB
20 TB
€0.111
 / h
€69.49
 / mo
cpx52
12
24 GB
480 GB
20 TB
€0.161
 / h
€100.49
 / mo
cpx62
16
32 GB
640 GB
20 TB
€0.208
 / h
€129.99
 / mo
Location
Choose a location for your server. You can only select some features, such as private Networks and Load Balancers, if they are in the same network zone as the server. You can only select Primary IPs and Volumes that are in the same location as the server.

Image
Ubuntu, Fedora, Debian, CentOS and Rocky Linux – you have a wide variety of operating systems to choose from, and of course, we provide the most current release. Our apps provide you easy access to popular software, such as Docker, WordPress or Nextcloud and comes pre-installed and ready to use when you create your server.

OS Images
Apps
Networking
Choose from three networking options for your server. You can also create servers without a public network. If you want to disable the public network, you need to select a private network first. You can also assign existing and available Primary IPs.

Primary IPs of type IPv4 cost €0.0008/h, regardless of being attached to a server or not.

IPv6 addresses are free of charge.

Private networks allow your servers to communicate with each other over a dedicated link. You can also disable the public network with this function, so that your server can be reached only within this network. Only networks of the same network zone are available.

SSH keys
Use SSH keys for secure and efficient authentication. Ensure the key is in OpenSSH format. If you add an SSH key, no root credentials will be sent via email. Learn more.

No SSH key selected.
We recommend using an SSH key. Otherwise you will receive the root password via email.
Add SSH key
Volumes
Volumes offer you highly available and reliable SSD-based storage space for your cloud servers. You can expand each Volume to up to 10 TB at any time. The Volume must be in the same location as the server that you are creating.

Create Volume
Firewalls
Firewalls allow you to easily secure your servers by restricting or allowing traffic based on rules.

There are no Firewalls in this project yet. Go to Firewalls to create your first one.
Backups
Backups are daily automatic copies of your server's disk. With Backups, you can easily restore a server to a previous state or use it to create a new server. Learn more.

Backups cost an additional 20 % of the server price. Volumes are not included in backups.

Placement groups
Group multiple servers into a placement group to optimize your availability requirements. The type “spread” ensures that servers in a group use different hosts to reduce downtime and achieve maximum availability. Learn more.

Create placement group
Labels
Labels are key-value pairs. Both key and value must be 63 characters or less, and must begin and end with an alphanumeric character. Alphanumerics or dashes, hyphens, and dots can be used in-between. The value is optional. Learn more.

Cloud config
When creating a server, you can use cloud-init to process and execute scripts of up to 32 KiB for your server configuration. Learn more.

Name
1
ubuntu-4gb-fsn1-1
Legal NoticeData PrivacySystem PoliciesTerms and Conditions
---

## 2026-07-06T10:26:00Z
Console
Search…
Ctrl K

1
Activities
View all 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

K0733309926
Important status messages
Maintenance:
1
Other:
2
Last updated:
about 2 hours ago
Hetzner Accounts routine maintenance work
Start at:
2026-07-06 21:00 GMT+2
End at:
2026-07-06 21:30 GMT+2
Last updated:
about 2 hours ago
Details
Limited availability of cloud instances
Created:
2026-06-26 08:00 GMT+2
Last updated:
10 days ago
Details
High traffic of Object Storage may lead to timeouts
Created:
2026-01-15 16:39 GMT+1
Last updated:
about 2 months ago
Details

Dismiss all
Back to servers
Create a server
Type
Shared Resources
Dedicated Resources
Traffic
cx23
2
4 GB
40 GB
20 TB
€0.009
 / h
€5.49
 / mo
cx33
4
8 GB
80 GB
20 TB
€0.014
 / h
€8.49
 / mo
cx43
8
16 GB
160 GB
20 TB
€0.026
 / h
€15.99
 / mo
cx53
16
32 GB
320 GB
20 TB
€0.047
 / h
€29.49
 / mo
Location
Choose a location for your server. You can only select some features, such as private Networks and Load Balancers, if they are in the same network zone as the server. You can only select Primary IPs and Volumes that are in the same location as the server.

Image
Ubuntu, Fedora, Debian, CentOS and Rocky Linux – you have a wide variety of operating systems to choose from, and of course, we provide the most current release. Our apps provide you easy access to popular software, such as Docker, WordPress or Nextcloud and comes pre-installed and ready to use when you create your server.

OS Images
Apps
Networking
Choose from three networking options for your server. You can also create servers without a public network. If you want to disable the public network, you need to select a private network first. You can also assign existing and available Primary IPs.

Primary IPs of type IPv4 cost €0.0008/h, regardless of being attached to a server or not.

IPv6 addresses are free of charge.

Private networks allow your servers to communicate with each other over a dedicated link. You can also disable the public network with this function, so that your server can be reached only within this network. Only networks of the same network zone are available.

SSH keys
Use SSH keys for secure and efficient authentication. Ensure the key is in OpenSSH format. If you add an SSH key, no root credentials will be sent via email. Learn more.

No SSH key selected.
We recommend using an SSH key. Otherwise you will receive the root password via email.
Add SSH key
Volumes
Volumes offer you highly available and reliable SSD-based storage space for your cloud servers. You can expand each Volume to up to 10 TB at any time. The Volume must be in the same location as the server that you are creating.

Create Volume
Firewalls
Firewalls allow you to easily secure your servers by restricting or allowing traffic based on rules.

There are no Firewalls in this project yet. Go to Firewalls to create your first one.
Backups
Backups are daily automatic copies of your server's disk. With Backups, you can easily restore a server to a previous state or use it to create a new server. Learn more.

Backups cost an additional 20 % of the server price. Volumes are not included in backups.

Placement groups
Group multiple servers into a placement group to optimize your availability requirements. The type “spread” ensures that servers in a group use different hosts to reduce downtime and achieve maximum availability. Learn more.

Create placement group
Labels
Labels are key-value pairs. Both key and value must be 63 characters or less, and must begin and end with an alphanumeric character. Alphanumerics or dashes, hyphens, and dots can be used in-between. The value is optional. Learn more.

Cloud config
When creating a server, you can use cloud-init to process and execute scripts of up to 32 KiB for your server configuration. Learn more.

Name
1
ubuntu-8gb-nbg1-3
Legal NoticeData PrivacySystem PoliciesTerms and Conditions
---

## 2026-07-06T10:28:25Z
The cx33 at 4 vCPU / 8GB / 80GB SSD. Does Hetzner use NVMe? Is it enough for deploying with k3m?
---

## 2026-07-06T10:33:22Z
e cx33 at 4 vCPU / 8GB / 80GB SSD for €8.49/mo is it full price all vat will be included?
---

## 2026-07-06T10:36:39Z
"Primary IPs of type IPv4 cost €0.0008/h, regardless of being attached to a server or not." what's that mean?
Should I add IPv4 (0.5 euro)?
---

## 2026-07-06T10:41:18Z
Compare support of Hetzner and OCI?
---

## 2026-07-06T10:46:24Z
Analyze my `phrasal` project answer if deploy it on "cx33 at 4 vCPU / 8GB / 80GB SSD for €8.49/mo" with k3s.
- What's the best config for such k3s server.
- How many users simultaniously it can handle?
---

## 2026-07-06T10:52:50Z
Did you consider that all fullstack app with deploy with k3s (docker)?
---

## 2026-07-06T10:55:54Z
so how many user simultaniously?
---

## 2026-07-06T10:58:28Z
with the configs of k3m I can handle my k8s with kubectl, rancher, helm, etc. and any other tools for k8s, as usual I handle on minikube?
---

## 2026-07-06T10:58:48Z
with the configs of k3m you provided, I can handle my k8s with kubectl, rancher, helm, etc. and any other tools for k8s, as usual I handle on minikube?
---

## 2026-07-06T11:03:10Z
Maybe you recomend better alternative of k8s then k3s for production for up 100 users simultaniously on such hatzner server?
---

## 2026-07-06T11:04:55Z
" Cost-efficient on older hardware generations, with limited availability. Ideal for variable workloads that can handle changing CPU performance. Optimized for low CPU usage with variable workloads. "

This server for 8.49 euro + 0.5 for IPv4 has the above desc. Is it fine?
---

## 2026-07-06T11:10:53Z
e cx33 at 4 vCPU / 8GB / 80GB SSD for €8.49/mo I have x86 (intel/amd) and arm64 (ampere). But ampere isn't available. what do I lose without ampere?
---

## 2026-07-06T11:12:47Z
The price is the same on hetzner for x86 and arm64.
---

## 2026-07-06T11:14:05Z
x86 is 32 or 64 bit?
---

## 2026-07-06T11:25:44Z
- What's the purpose of a private network?
- Can I create private network between OCI VPS and Hetzner VPS?
---

## 2026-07-06T11:29:48Z
I accedenlty removed VPS in OCI.
I'd like to protect that for the future. How to creats some group or privilages for that from oci cli or in OCI console I can't do that for the future.
The best approaches?
---

## 2026-07-06T11:36:17Z
 MFA Required for Destructive Actions

  In Identity → Authentication Settings, you can require MFA for all operations or specific ones. This forces a second
  confirmation before any destructive action.

Where? cant find?
---

## 2026-07-06T11:38:23Z
Identity & Security

Identity
Overview
Domains
Network Sources
Policies
Compartments
My profile


Domains
Default
Active
Domain

Actions
Factors
Enable or Disable factors
Mobile app passcode
Enabled
Edit
Mobile app notification
Enabled
Enable mobile app notifications by first enabling a mobile app passcode.
Phone call
Disabled
Edit
Text message (SMS)
Disabled
Edit
Email
Disabled
Edit
DUO security
Disabled
Edit
Security questions
Disabled
Edit
Fast ID Online (FIDO) passkey authenticator
Enabled
Edit
Bypass code
Enabled
Maximum number of enrolled factors
5
Trusted devices
Trusted devices
Enabled
Edit
Maximum number of trusted devices
5
Number of days a device can be trusted
15
Sign-in rules
Maximum unsuccessful MFA attempts
10
Edit
---

## 2026-07-06T11:41:39Z
 4. Left sidebar → Security
  5. MFA or Sign-on policies

Cant find
---

## 2026-07-06T11:46:34Z
  2. IAM policy — if you want a second layer:
  Go to Identity & Security → Policies → Create Policy and add:
  Deny any-user to manage instances in tenancy where request.permission='INSTANCE_DELETE'

Details
---

## 2026-07-06T11:49:13Z
API Error
Deny statement passed into a Allow compilation
---

## 2026-07-06T12:05:27Z
What compartment and tenacy?
---

## 2026-07-06T12:05:32Z
What compartment and tenacy? diff?
---

## 2026-07-06T12:08:17Z
create comparment and vps inside that
---

## 2026-07-06T12:08:59Z
Inside OCI Console
---

## 2026-07-06T12:14:31Z
- Can  I apply some policies for created compartment that forbid to remove intances?
- Can I change VPS to other compartment?
---

## 2026-07-06T12:20:44Z
  3. Statement:
  Allow any-user to use instances in compartment production

  use allows start/stop/reboot but not terminate. Only manage includes delete permission. As long as no policy grants
  manage instances on that compartment, nobody can delete.

  Catch: If you have a tenancy-level policy like Allow group Administrators to manage all-resources in tenancy, it
  overrides this. Check your existing policies first:

What should I insert?
---

## 2026-07-06T12:23:37Z
ALLOW GROUP Administrators to manage all-resources IN TENANCY
---

## 2026-07-06T12:26:06Z
  Options

  Option A: Replace the broad policy (recommended)

  Delete the current policy and create two:

  Allow group Administrators to manage all-resources in tenancy where request.permission != 'INSTANCE_DELETE'
  Allow group Administrators to use instances in tenancy

  This keeps full access to everything but blocks instance termination.

If I do that how to delete instance if I need?
---

## 2026-07-06T12:32:00Z
Is policie applied for compartment, or they are independent?
---

## 2026-07-06T12:35:10Z
Write step by step.
- reduce root policy to delete all.
- create compartment, in that compartment create vps, and add some policity to that comparmtnet
---

## 2026-07-06T12:38:54Z
can policies be applied to multiple compartment.
If 2 policies of same level on compartment they additive
---

## 2026-07-06T13:36:35Z
API Error
Cannot update policy - Tenant Admin Policy. Only Service Principal can update this policy
---

## 2026-07-06T13:49:58Z
I'm the root user, I I can't?
---

## 2026-07-06T13:56:03Z
I OCI policies I have 2 policies:
deny any-user to manage policies in tenancy where all {target.policy.type = 'deny', request.principal.id != 'ocid1.user.oc1..aaaaaaaaenyllidaxbzgu5unommz3h4jeagjk5ff44egrmi5ajgf575soa7q'}

ALLOW GROUP Administrators to manage all-resources IN TENANCY

What's different, and meaning?
---

## 2026-07-06T13:58:40Z
How to modify policie to prevent deletion of the intances?
---

## 2026-07-06T14:05:05Z
Policy Builder
Hide manual editor


  deny any-user to manage instance-family in tenancy
    where all {
      any {request.operation = 'TerminateInstance', request.operation = 'InstanceAction'},
      request.principal.id != 'ocid1.user.oc1..aaaaaaaaenyllidaxbzgu5unommz3h4jeagjk5ff44egrmi5ajgf575soa7q'
    }

Tags
Add tags to organize your resources. What can I do with tagging?
No items to display
Add tag
API Error
Failed to parse policy due to an issue with token: where at character: 0
---

## 2026-07-06T14:15:04Z
I have 2 policies:
ALLOW GROUP Administrators to manage all-resources IN TENANCY
deny any-user to manage instance-family in tenancy where all {request.operation = 'TerminateInstance'}

How in result will them work in combination?
---

## 2026-07-06T14:17:34Z
But I click teminate on instance and it was teminated.
---

## 2026-07-06T14:23:39Z
 oci iam user get --user-id $(oci iam user list --query 'data[0].id' --raw-output) 2>/dev/null
{
  "data": {
    "capabilities": {
      "can-use-api-keys": true,
      "can-use-auth-tokens": true,
      "can-use-console-password": true,
      "can-use-customer-secret-keys": true,
      "can-use-db-credentials": true,
      "can-use-o-auth2-client-credentials": true,
      "can-use-smtp-credentials": true
    },
    "compartment-id": "ocid1.tenancy.oc1..aaaaaaaapllfascgsx52zahz2h66bybqtgejspeh2p3ygxvptyw7us3cxsiq",
    "db-user-name": null,
    "defined-tags": {},
    "description": null,
    "email": "questtv8@gmail.com",
    "email-verified": true,
    "external-identifier": "aeade55b585545119a27b47721e48558",
    "freeform-tags": {},
    "id": "ocid1.user.oc1..aaaaaaaaenyllidaxbzgu5unommz3h4jeagjk5ff44egrmi5ajgf575soa7q",
    "identity-provider-id": null,
    "inactive-status": null,
    "is-mfa-activated": true,
    "last-successful-login-time": "2026-07-06T09:20:02.096000+00:00",
    "lifecycle-state": "ACTIVE",
    "name": "questtv8@gmail.com",
    "previous-successful-login-time": null,
    "time-created": "2026-06-25T07:26:33.872000+00:00"
  },
  "etag": "32dcf04249224c0aa26f100c96ab1e02"
}
---

## 2026-07-06T14:40:12Z
I checked the policy deny doesn't work
---

## 2026-07-06T15:07:43Z
I have that 2 policies I mentioned.
I create User, how to make it admin without rule to delete.
How compartment, policy and group related?
---

## 2026-07-06T15:38:50Z
I use oci cli, how to set my user not admin in order to prevert deletion of intanse?
---

## 2026-07-06T15:43:25Z
no, I want my OCI cli works not as admin but like user I created in console just right previousely
---

## 2026-07-06T15:53:03Z
auth token vs api key
---

## 2026-07-06T15:54:07Z
auth token vs api key in general difference, simple example
---

## 2026-07-06T15:56:15Z
delete instance in OCI
---

## 2026-07-06T15:56:34Z
from OCI cli
---

## 2026-07-06T15:59:50Z
oci compute instance terminate --instance-id ocid1.instance.oc1.eu-frankfurt-1.antheljtw6ts67qcnzvgz3zv45v7xxcugqswmvzxqnff44okzulmnvyrnnka --preserve-boot-volume false
Are you sure you want to delete this resource? [y/N]: y
ServiceError:
{
    "client_version": "Oracle-PythonSDK/2.180.0, Oracle-PythonCLI/3.88.0",
    "code": "InvalidParameter",
    "logging_tips": "Please run the OCI CLI command using --debug flag to find more debug information.",
    "message": "instance ocid1.instance.oc1.eu-frankfurt-1.antheljtw6ts67qcnzvgz3zv45v7xxcugqswmvzxqnff44okzulmnvyrnnka cannot be terminated because this user does not have sufficient permissions",
    "opc-request-id": "EC1F1AEAC72C448C880347AA4DBC48DD/C1BA05B583FDAB2AD9D04B6A46524175/1C49C545BED49C468B976493311B3C0C",
    "operation_name": "terminate_instance",
    "request_endpoint": "DELETE https://iaas.eu-frankfurt-1.oraclecloud.com/20160918/instances/ocid1.instance.oc1.eu-frankfurt-1.antheljtw6ts67qcnzvgz3zv45v7xxcugqswmvzxqnff44okzulmnvyrnnka",
    "status": 400,
    "target_service": "compute",
    "timestamp": "2026-07-06T15:59:21.852783+00:00",
    "troubleshooting_tips": "See [https://docs.oracle.com/iaas/Content/API/References/apierrors.htm] for more information about resolving this error. If you are unable to resolve this issue, run this CLI command with --debug option and contact Oracle support and provide them the full error message."
}
---

## 2026-07-06T16:12:01Z
Is it posible in OCI after creation VPS add Block volume and place DB there?
---

## 2026-07-06T16:56:29Z
in @aux/scripts/vps/deployment/ files  change VPS_IP="141.144.227.73" to VPS_IP="129.159.221.205"
---

## 2026-07-06T17:02:23Z
With ssh like in @aux/scripts/vps/deployment/mini/special/install-infra.sh add to @aux/scripts/vps/init/init.sh 

PROMPT_DIRTRIM=1
PS1="\[\e[32m\]\u\[\e[0m\]@\[\e[34m\]\h\[\e[0m\]:\[\e[33m\]\w\[\e[0m\]\$ "
export TERM=xterm-mono
alias ls='ls --color=never'
---

## 2026-07-06T17:03:12Z
If it's already added don't add.
---

## 2026-07-06T17:16:12Z
Add to @aux/scripts/vps/init/init.sh to vps .bashrc the content @aux/scripts/vps/init/.bashrc.txt
---

## 2026-07-06T17:16:57Z
Add to @aux/scripts/vps/init/init.sh to vps .bashrc end of file the content @aux/scripts/vps/init/.bashrc.txt
---

## 2026-07-06T17:17:45Z
yes
---

## 2026-07-06T17:18:46Z
no just add to the end of .bashrc file the content of @aux/scripts/vps/init/.bashrc.txt
---

## 2026-07-06T17:21:03Z
Add to @aux/scripts/vps/init/init.sh the command for adding to the end of vps .bashrc the content @aux/scripts/vps/init/.bashrc.txt
---

## 2026-07-06T17:22:00Z
Add to @aux/scripts/vps/init/init.sh the command for adding to the end of vps .bashrc the content @aux/scripts/vps/init/.bashrc.txt
---

## 2026-07-06T17:23:28Z
if /tmp/.bashrc_append exists on vps don't append
---

## 2026-07-06T17:25:18Z
in @aux/scripts/vps/deployment/ files  change $HOME/dev/scripts/vps/ssh-key-2026-06-26.key to $HOME/dev/scripts/vps/n1-ssh-key-2026-07-06.key
---

## 2026-07-06T17:28:58Z
ubuntu@vps-n1:~$ exec bash
bash: /home/ubuntu/.bashrc: line 120: syntax error near unexpected token `$'{\r''
'ash: /home/ubuntu/.bashrc: line 120: `function alias_completion {
---

## 2026-07-06T17:30:12Z
add to init.sh install vim if it not installed yet
---

## 2026-07-06T17:31:58Z
Add `sudo apt update` and `sudo apt upgrade`
---

## 2026-07-06T17:32:46Z
Add `sudo apt update` and `sudo apt upgrade`
---

## 2026-07-06T17:46:22Z
WARNING: apt does not have a stable CLI interface. Use with caution in scripts.
---

## 2026-07-06T17:50:18Z
sudo apt-get upgrade
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Calculating upgrade... Done
The following upgrades have been deferred due to phasing:
  fwupd
0 upgraded, 0 newly installed, 0 to remove and 1 not upgraded.
---

## 2026-07-06T17:53:40Z
Add to init.sh: Creation of ~/.secrets.d/secrets.sh with content:

export NOTIFICATION_TELEGRAM_BOT_TOKEN="6106447531:AAE2EjO6JK-QNB8kdKxCeUMW_iYW803lTQk"
export NOTIFICATION_TELEGRAM_CHAT_ID="-1001933314383"
---

## 2026-07-06T17:54:42Z
change to placefolder the secrets
---

## 2026-07-06T17:58:43Z
@> tn "abc !!!"
tn "abc tn "abc <>tn "abc <><>"!"!"
{"ok":true,"result":{"message_id":4177,"from":{"id":6106447531,"is_bot":true,"first_name":"MBot","username":"TestDev0001Bot"},"chat":{"id":-1001933314383,"title":"MChat","type":"supergroup"},"date":1783360673,"text":"abc tn abc abc <><>!!"}}ubuntu@vps-n1:~$
---

## 2026-07-06T17:59:15Z
with not "abc !!!"
---

## 2026-07-06T18:00:10Z
why ubuntu@vps-n1:~$ not on new line?
---

## 2026-07-06T18:28:24Z
how to check wheather postgres install
---

## 2026-07-06T18:28:39Z
how to check wheather postgresql postgresql-client install
---

## 2026-07-06T18:28:45Z
how to check wheather postgresql postgresql-client installed
---

## 2026-07-06T18:29:14Z
client?
---

## 2026-07-06T18:36:01Z
IN @aux/scripts/vps/deployment/ folder fix  PROJECT_DIR="$(cd "$SCRIPT_DIR/../../../../.." && pwd)"
---

## 2026-07-06T18:44:22Z
sudo: certbot: command not found
---

## 2026-07-06T18:44:39Z
add to init.sh
---

## 2026-07-06T18:45:31Z
check if ssh_vps "mkdir -p ~/.secrets.d"
ssh_vps "cat > ~/.secrets.d/secrets.sh << 'EOF'


then don't create again
---

## 2026-07-06T18:48:23Z
Add ` net-tools` command
---

## 2026-07-06T19:08:55Z
=== Restoring frontend ===
  Creating nginx site config...
  Restoring SSL certificate...
Saving debug log to /var/log/letsencrypt/letsencrypt.log
You should register before running non-interactively, or provide --agree-tos and --email <email_address> flags.
Ask for help or search for solutions at https://community.letsencrypt.org. See the logfile /var/log/letsencrypt/letsencrypt.log or re-run Certbot with -v for more details.
---

## 2026-07-06T19:09:32Z
x7warrio@gmail.com
---

## 2026-07-06T19:16:49Z
after applying @aux/scripts/vps/deployment/mini/ port 80 still listening and nginx works
---

## 2026-07-06T19:23:18Z
in @aux/scripts/vps/deployment/mini/vps-completion.bash deploy-fist not workin
---

## 2026-07-06T19:26:32Z
how to make @aux/scripts/vps/deployment/mini/vps-completion.bash work?
---

## 2026-07-06T19:27:09Z
temporary
---

## 2026-07-06T19:29:56Z
source aux/scripts/vps/deployment/mini/vps-completion.bash
ubuntuu@LP-BSF-EMALYSH:~/.../phrasal$ ./aux/scripts/vps/deployment/mini/special/deploy-first-or-after-undeploy-vps.sh
.claude/            .github/            CLAUDE.md           aux/                docker-compose.yml  phrasal.iml
.env                .gitignore          GEMINI.md           backend/            e2e/
.envrc              .idea/              Makefile            backlog/            frontend/
.git/               .mcp.json           README.md           blackbox/           node_modules/

On tab I get list of files in folder
---

## 2026-07-06T19:30:29Z
rename
---

## 2026-07-08T06:16:42Z
I created hatzner server with ssh key  but on login with root user it asked password? why? what user should I use for just login with ssh key file private key?
---

## 2026-07-08T06:19:07Z
chmod 600 helped, thanks!
Does all hatzner vps use NVMe?
---

## 2026-07-08T06:21:23Z
I bought:
4
vCPU
8 GB
RAM
80 GB
Disk local
0.01
Usage
0/20
 TB
Traffic out
8.49
/mo
Price

I see:
root@vps-h1:~# free -m
               total        used        free      shared  buff/cache   available
Mem:            7751         425        7345           4         220        7325
Swap:              0           0           0
root@vps-h1:~# df -h
Filesystem      Size  Used Avail Use% Mounted on
tmpfs           776M  844K  775M   1% /run
/dev/sda1        75G  1.2G   71G   2% /
tmpfs           3.8G     0  3.8G   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
/dev/sda15      253M  146K  252M   1% /boot/efi
tmpfs           776M   12K  776M   1% /run/user/0
root@vps-h1:~# cpu
Command 'cpu' not found, but can be installed with:
apt install cpu
root@vps-h1:~# free -m
               total        used        free      shared  buff/cache   available
Mem:            7751         423        7346           4         222        7327
Swap:              0           0           0
root@vps-h1:~# nproc --all
4

Correct?
---

## 2026-07-08T06:23:12Z
lsblk -io NAME,TYPE,SIZE,MOUNTPOINT,FSTYPE,MODEL
NAME    TYPE  SIZE MOUNTPOIN FSTYPE MODEL
sda     disk 76.3G                  QEMU HARDDISK
|-sda1  part   76G /         ext4
|-sda14 part    1M
`-sda15 part  256M /boot/efi vfat
sr0     rom  1024M                  QEMU DVD-ROM

Is NVMe drive?
---

## 2026-07-08T06:26:23Z
drive is listed as sda, which indicates a traditional SATA-emulated device, and the model is QEMU HARDDISK, meaning this is a standard virtual disk inside a QEMU/KVM virtual machine.

No?
---

## 2026-07-08T06:31:55Z
I connect to vps on ubuntu with root user and ssh key file. Is it good idea to create separate user with sudo right and don't use root? Is so how to do that?
---

## 2026-07-08T06:41:33Z
Add to @aux/scripts/vps/init/init-user.sh these instructions:

  Copy your SSH key to the new user:

  chmod 600 /home/deploy/.ssh/authorized_keys

  Test login with the new user before locking root:

  ssh -i your-key.key deploy@129.159.221.205
  sudo whoami   # should print "root"

  Then disable root SSH login:

  sudo sed -i 's/^PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
  sudo systemctl restart sshd

  Optional but recommended — also disable password auth entirely (key-only):

  sudo sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
  sudo systemctl restart sshd

  Keep your current root session open until you've confirmed the new user can SSH in and sudo — that way you can't lock
  yourself out.

But name user not deploy but vpsuser
---

## 2026-07-08T06:43:45Z
what the password for vpsuser?
---

## 2026-07-08T06:45:28Z
1
---

## 2026-07-08T06:45:47Z
what about passord for root?
---

## 2026-07-08T06:46:37Z
if I switch locally on vps on root don't I need password?
---

## 2026-07-08T06:48:02Z
make @aux/scripts/vps/init/init-user.sh executable
---

## 2026-07-08T06:49:10Z
so now I can just run @aux/scripts/vps/init/init-user.sh ?
---

## 2026-07-08T06:53:33Z
info: Copying files from `/etc/skel' ...
New password: vpsuserpass1
Retype new password: vpsuserpass1
passwd: password updated successfully
info: Adding new user `vpsuser' to supplemental / extra groups `users' ...
info: Adding user `vpsuser' to group `users' ...
=== Copying SSH key to vpsuser ===
=== Testing login with vpsuser ===
sudo: a terminal is required to read the password; either use the -S option to read from standard input or configure an askpass helper
sudo: a password is required
---

## 2026-07-08T06:58:19Z
disable password for vpsuser and add it to sudo without password
---

## 2026-07-08T07:00:13Z
check again script and fix
---

## 2026-07-08T07:02:13Z
how to rm vpsuser and rm it from sudo just show command
---

## 2026-07-08T07:04:38Z
can script be applied and also check condition if user created, dont crate it again
---

## 2026-07-08T07:06:40Z
when `sudo whoami` will it ask root password?
---

## 2026-07-08T07:07:40Z
but did script is still running in root?
---

## 2026-07-08T07:13:22Z
echo "=== Disabling root SSH login and password authentication ==="
ssh_new "sudo sed -i 's/^PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config"
ssh_new "sudo sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config"

rollback
---

## 2026-07-08T07:15:35Z
Failed to restart sshd.service: Unit sshd.service not found.
---

## 2026-07-08T07:16:45Z
disabling
---

## 2026-07-08T07:23:25Z
Add in the top if root user doesn't have password than set ti interactivly
---

## 2026-07-08T07:28:42Z
Split @aux/scripts/vps/init/init-user.sh  to 2 script init-user and init-root files and separate operations for both
---

## 2026-07-08T07:32:55Z
rollback
---

## 2026-07-08T07:33:08Z
yes
---

## 2026-07-08T07:47:46Z
Check if user is configured don't do that
---

## 2026-07-08T07:48:57Z
No I told: Check if user is configured don't do that again
---

## 2026-07-08T07:50:14Z
but check root also for password
---

## 2026-07-08T07:50:53Z
no you can just rrun if ssh_roo "pa .. first
---

## 2026-07-08T07:54:13Z
1 package can be upgraded. Run 'apt list --upgradable' to see it.
vpsuser@vps-h1:~$ sudo apt-get upgrade
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Calculating upgrade... Done
The following packages have been kept back:
  linux-image-virtual
0 upgraded, 0 newly installed, 0 to remove and 1 not upgraded.
---

## 2026-07-08T07:55:01Z
sudo apt-get dist-upgrade
Will it upgrade to ubuntu 26?
---

## 2026-07-08T08:09:06Z
change in @aux/scripts/vps/init/1_init_bash.sh when export NOTIFICATION_TELEGRAM_BOT_TOKEN=\"<TELEGRAM_BOT_TOKEN>\"
export NOTIFICATION_TELEGRAM_CHAT_ID=\"<TELEGRAM_CHAT_ID>\"

Ask interactivly these 2 tokens
---

## 2026-07-08T08:16:21Z
Change in @aux/scripts/vps/deployment/ access to VPS to VPS_IP="116.203.78.118"
VPS_USER="vpsuser"
SSH_KEY="$HOME/dev/scripts/vps/ssh-key-h1.key"
SSH_OPTS="-i $SSH_KEY -o StrictHostKeyChecking=accept-new"
---

## 2026-07-08T08:20:26Z
in @aux/scripts/vps/deployment/mini/special/install-infra.sh ask interactivly if to "Setting up swap" what's size
---

## 2026-07-08T08:25:45Z
how to remove just setting swap. Just write don't do it?
---

## 2026-07-08T09:41:07Z
Based on @aux/scripts/vps/deployment/mini/special/install-infra.sh create in @aux/scripts/vps/init/ folder the script with 3_init_soft and add speedtest app if it not installed yet
---

## 2026-07-08T09:42:01Z
but you can check it simple like this: `command -v vim >/dev/null || sudo apt-get install -y vim`
---

## 2026-07-08T09:42:31Z
make the script executable
---

## 2026-07-08T09:44:05Z
Is it good to add after adding speedtest `sudo apt-get update`
---

## 2026-07-08T09:46:39Z
Add to @aux/scripts/vps/deployment/mini/special/install-infra.sh checking wheather it was already installed for app before installing
---

## 2026-07-08T09:52:34Z

# Open HTTP/HTTPS ports in iptables
ssh_vps "sudo iptables -I INPUT -p tcp --dport 80 -j ACCEPT"
ssh_vps "sudo iptables -I INPUT -p tcp --dport 443 -j ACCEPT"
ssh_vps "sudo sh -c 'iptables-save > /etc/iptables/rules.v4'"

If it's set dont do it twice, or it's not a problem to run it  multiple times?
---

## 2026-07-08T09:55:56Z
So it overide all the file?
---

## 2026-07-08T09:56:35Z
If somehting inportant in rules.v4 it wouold be rewrited?
---

## 2026-07-08T09:57:52Z
 If it bothers you, you could guard with -C (check if rule exists):

  ssh_vps "sudo iptables -C INPUT -p tcp --dport 80 -j ACCEPT 2>/dev/null || sudo iptables -I INPUT -p tcp --dport 80 -j
  ACCEPT"
---

## 2026-07-08T09:58:09Z
If it bothers you, you could guard with -C (check if rule exists):

  ssh_vps "sudo iptables -C INPUT -p tcp --dport 80 -j ACCEPT 2>/dev/null || sudo iptables -I INPUT -p tcp --dport 80 -j
  ACCEPT"

Make that check for 80 and 443 ports
---

## 2026-07-08T10:00:42Z
I have:

sudo iptables -nL --line-numbers
Chain INPUT (policy ACCEPT)
num  target     prot opt source               destination
1    ACCEPT     6    --  0.0.0.0/0            0.0.0.0/0            tcp dpt:443
2    ACCEPT     6    --  0.0.0.0/0            0.0.0.0/0            tcp dpt:80

Chain FORWARD (policy ACCEPT)
num  target     prot opt source               destination

Chain OUTPUT (policy ACCEPT)
num  target     prot opt source  

Will 22 port also open?
---

## 2026-07-08T10:01:39Z
But I want to prevent all accept ssh 22 port and that in files
---

## 2026-07-08T10:02:38Z
Add 8080, 5432
---

## 2026-07-08T10:03:26Z
where in file is written the all other if prevented?
---

## 2026-07-08T10:04:25Z
sudo iptables -nL --line-numbers
Chain INPUT (policy DROP)
num  target     prot opt source               destination
1    ACCEPT     0    --  0.0.0.0/0            0.0.0.0/0
2    ACCEPT     0    --  0.0.0.0/0            0.0.0.0/0            state RELATED,ESTABLISHED
3    ACCEPT     6    --  0.0.0.0/0            0.0.0.0/0            tcp dpt:22
4    ACCEPT     6    --  0.0.0.0/0            0.0.0.0/0            tcp dpt:80
5    ACCEPT     6    --  0.0.0.0/0            0.0.0.0/0            tcp dpt:443
6    ACCEPT     6    --  0.0.0.0/0            0.0.0.0/0            tcp dpt:8080
7    ACCEPT     6    --  0.0.0.0/0            0.0.0.0/0            tcp dpt:5432

Chain FORWARD (policy ACCEPT)
num  target     prot opt source               destination

Chain OUTPUT (policy ACCEPT)
num  target     prot opt source               destination
---

## 2026-07-08T10:04:29Z
sudo iptables -nL --line-numbers
Chain INPUT (policy DROP)
num  target     prot opt source               destination
1    ACCEPT     0    --  0.0.0.0/0            0.0.0.0/0
2    ACCEPT     0    --  0.0.0.0/0            0.0.0.0/0            state RELATED,ESTABLISHED
3    ACCEPT     6    --  0.0.0.0/0            0.0.0.0/0            tcp dpt:22
4    ACCEPT     6    --  0.0.0.0/0            0.0.0.0/0            tcp dpt:80
5    ACCEPT     6    --  0.0.0.0/0            0.0.0.0/0            tcp dpt:443
6    ACCEPT     6    --  0.0.0.0/0            0.0.0.0/0            tcp dpt:8080
7    ACCEPT     6    --  0.0.0.0/0            0.0.0.0/0            tcp dpt:5432

Chain FORWARD (policy ACCEPT)
num  target     prot opt source               destination

Chain OUTPUT (policy ACCEPT)
num  target     prot opt source               destination

all right?
---

## 2026-07-08T10:05:32Z
Question: if I run again @aux/scripts/vps/deployment/mini/special/install-infra.sh will it install twise the rules?
---

## 2026-07-08T10:07:40Z
git add all changes and commit them with suitable message
---

## 2026-07-08T10:10:12Z
fix @aux/scripts/vps/deployment/mini/vps-completion.bash
---

## 2026-07-08T10:10:18Z
fix @aux/scripts/vps/deployment/mini/vps-completion.bash pathes
---

## 2026-07-08T10:11:17Z
 source aux/scripts/vps/deployment/mini/vps-completion.bash
ubuntuu@LP-BSF-EMALYSH:~/.../phrasal$ ./aux/scripts/vps/deployment/mini/special/2.deploy-first-or-after-undeploy-vps.sh  .claude/            .github/            CLAUDE.md           aux/                docker-compose.yml  phrasal.iml
.env                .gitignore          GEMINI.md           backend/            e2e/
.envrc              .idea/              Makefile            backlog/            frontend/
.git/               .mcp.json           README.md           blackbox/           node_modules/

Doesn't work
---
