# Makefile for phrasal

.PHONY: clean updateFrontend updateAcceptance buildBackend buildFrontend acceptanceTest build dockerAll dockerDown \
        ghList ghView defaultMessage message help ciCheck

# Function to execute commands sequentially with success and failure messages
# Usage: $(call execute_commands,command1 && command2 && .. && commandN, success_msg, fail_msg)
define execute_commands
@( $(1) ) && $(MAKE) message $(2) || { $(MAKE) message $(3); exit 1; }
endef

clean:
	@echo "### Cleaning (phrasal) ..."
	$(call execute_commands,\
		docker compose down ; \
		docker rmi -f phrasal-backend:latest phrasal-frontend:latest 2>/dev/null || true && \
		cd backend && JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 mvn clean && \
		cd ../frontend && rm -rf dist && \
		cd ../e2e && rm -rf reports test-results playwright-report,\
		"✅ CLEAN SUCCESSFUL (phrasal) ✅",\
		"❌ CLEAN FAILED (phrasal) ❌")

updateFrontend:
	@echo "### Updating frontend (phrasal) ..."
	$(call execute_commands,\
		cd frontend && rm -rf dist node_modules package-lock.json && npx npm-check-updates -u && npm install,\
		"✅ UPDATE FRONTEND SUCCESSFUL (phrasal) ✅",\
		"❌ UPDATE FRONTEND FAILED (phrasal) ❌")

updateAcceptance:
	@echo "### Updating acceptance tests (phrasal) ..."
	$(call execute_commands,\
		cd e2e && rm -rf node_modules package-lock.json && npx npm-check-updates -u && npm install,\
		"✅ UPDATE ACCEPTANCE SUCCESSFUL (phrasal) ✅",\
		"❌ UPDATE ACCEPTANCE FAILED (phrasal) ❌")

buildBackend:
	@echo "### Building backend (phrasal) ..."
	$(call execute_commands,\
		cd backend && JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 mvn clean verify,\
		"✅ BUILD BACKEND SUCCESSFUL (phrasal) ✅",\
		"❌ BUILD BACKEND FAILED (phrasal) ❌")

buildFrontend:
	@echo "### Building frontend (phrasal) ..."
	$(call execute_commands,\
		cd frontend && npm install && npm run build,\
		"✅ BUILD FRONTEND SUCCESSFUL (phrasal) ✅",\
		"❌ BUILD FRONTEND FAILED (phrasal) ❌")

acceptanceTest:
	@echo "### Running acceptance tests (phrasal) ..."
	$(call execute_commands,\
		cd e2e && npm ci && npm test,\
		"✅ ACCEPTANCE TESTS SUCCESSFUL (phrasal) ✅",\
		"❌ ACCEPTANCE TESTS FAILED (phrasal) ❌")

build:
	@echo "### Full build (phrasal) ..."
	$(call execute_commands,\
		$(MAKE) buildBackend && \
		$(MAKE) buildFrontend && \
		docker compose build && \
		docker compose up -d --wait && \
		$(MAKE) acceptanceTest && \
		docker compose down,\
		"✅ BUILD SUCCESSFUL (phrasal) ✅",\
		"❌ BUILD FAILED (phrasal) ❌")

ciCheck:
	@echo "### CI simulation (phrasal) ..."
	$(call execute_commands,\
		cd backend && JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 mvn clean verify && \
		cd .. && cd frontend && npm ci && npm run build && \
		cd .. && docker compose build --no-cache && \
		docker compose up -d --wait && \
		cd e2e && npm ci && npm test && \
		cd .. && docker compose down,\
		"✅ CI CHECK SUCCESSFUL (phrasal) ✅",\
		"❌ CI CHECK FAILED (phrasal) ❌")

dockerAll:
	@echo "### Building and docker up locally (phrasal) ..."
	$(call execute_commands,\
		$(MAKE) buildBackend && \
		$(MAKE) buildFrontend && \
		docker compose build && \
		$(MAKE) message "✅ DOCKER COMPOSE RUNNING (phrasal) ... ⏩⏩⏩" && \
		docker compose up,\
		"✅ DOCKER COMPOSE ALL SUCCESSFUL (phrasal) ✅",\
		"❌ DOCKER COMPOSE ALL FAILED (phrasal) ❌")

dockerDown:
	docker compose down

ghList:
	gh run list --limit 5

ghView:
	gh run view --web

###
# Common commands
defaultMessage:
	make message "🔔 Execution finished (phrasal) 🔔"

message:
	@echo "=============================================="
	@echo "============= MESSAGE (TELEGRAM) ============="
	@echo "=============================================="
	@if [ -z "$(filter-out $@,$(MAKECMDGOALS))" ]; then \
		echo "Usage: make message \"Your message here\""; \
		exit 1; \
	fi
	@echo "Sending message:"
	@echo "$(filter-out $@,$(MAKECMDGOALS))"
	@echo
	bash -c ' \
		tn() { \
			local msg="$${*:-🔔 Job finished (phrasal) 🔔}"; \
			local api="https://api.telegram.org/bot$${NOTIFICATION_TELEGRAM_BOT_TOKEN}/sendMessage"; \
			curl -sS -X POST "$$api" \
				--data "chat_id=$${NOTIFICATION_TELEGRAM_CHAT_ID}" \
				--data-urlencode "text=$$msg"; \
		}; \
		tn "$(filter-out $@,$(MAKECMDGOALS))" \
	'
	@echo
%:
	@:

help:
	@echo ""
	@echo "╔═══════════════════════════════════════════════════════════════════╗"
	@echo "║               phrasal - Makefile Commands                        ║"
	@echo "╚═══════════════════════════════════════════════════════════════════╝"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "🔨 Build Targets:"
	@echo "  clean             - Docker down, remove images, mvn clean, remove frontend dist"
	@echo "  updateFrontend    - Update frontend deps (npm-check-updates -u && npm install)"
	@echo "  updateAcceptance  - Update e2e deps (npm-check-updates -u && npm install)"
	@echo "  buildBackend      - Build backend with Maven (mvn clean verify, enforces JaCoCo)"
	@echo "  buildFrontend     - Build frontend (npm install && npm run build)"
	@echo "  build             - Full build: backend + frontend + docker rebuild + e2e (--wait)"
	@echo "  ciCheck           - Strict CI simulation: no-cache docker build, npm ci, mvn verify"
	@echo ""
	@echo "🧪 Test Targets:"
	@echo "  acceptanceTest    - Run Cucumber+Playwright e2e tests (stack must be running)"
	@echo ""
	@echo "🐳 Docker Targets:"
	@echo "  dockerAll        - Build backend + frontend, then docker compose up (foreground)"
	@echo "  dockerDown       - Stop and remove all Docker services"
	@echo ""
	@echo "🐙 GitHub Actions:"
	@echo "  ghList            - List last 5 GitHub Actions runs"
	@echo "  ghView            - Open latest GitHub Actions run in browser"
	@echo ""
	@echo "📬 Notification Targets:"
	@echo "  defaultMessage    - Send default notification to Telegram"
	@echo "  message <text>    - Send custom notification to Telegram"
	@echo "                      Example: make message \"Build completed\""
	@echo ""
	@echo "  Requires env vars: NOTIFICATION_TELEGRAM_BOT_TOKEN, NOTIFICATION_TELEGRAM_CHAT_ID"
	@echo ""
	@echo "❓ Other:"
	@echo "  help              - Show this help message"
	@echo ""
