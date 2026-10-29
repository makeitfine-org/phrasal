#!/usr/bin/env bash
# Send a Telegram notification. Usage: notify-telegram.sh [message]
# Used by Stop, Notification and PreToolUse(AskUserQuestion) hooks.
# Requires NOTIFICATION_TELEGRAM_BOT_TOKEN and NOTIFICATION_TELEGRAM_CHAT_ID in the environment.

MESSAGE="${1:-✴️ Claude Code ✅ 🤖}"

curl -X POST "https://api.telegram.org/bot$NOTIFICATION_TELEGRAM_BOT_TOKEN/sendMessage" \
  -H "Content-Type: application/json" \
  -d "{\"chat_id\": \"$NOTIFICATION_TELEGRAM_CHAT_ID\", \"text\": \"$MESSAGE\"}"
