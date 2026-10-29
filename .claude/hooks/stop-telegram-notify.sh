#!/usr/bin/env bash
# Stop hook: send a Telegram notification when Claude finishes a job.
# Requires NOTIFICATION_TELEGRAM_BOT_TOKEN and NOTIFICATION_TELEGRAM_CHAT_ID in the environment.

curl -X POST "https://api.telegram.org/bot$NOTIFICATION_TELEGRAM_BOT_TOKEN/sendMessage" \
  -H "Content-Type: application/json" \
  -d "{\"chat_id\": \"$NOTIFICATION_TELEGRAM_CHAT_ID\", \"text\": \"✴️ Claude Code ✅ 🤖\"}"
