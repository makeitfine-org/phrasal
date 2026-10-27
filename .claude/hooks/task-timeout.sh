#!/usr/bin/env bash
# Asks the user to confirm continuing once a task has run longer than LIMIT seconds.
# usage: task-timeout.sh start   (UserPromptSubmit: records the start time)
#        task-timeout.sh check   (PreToolUse: prompts when LIMIT is exceeded)
LIMIT=900
STAMP="${TMPDIR:-/tmp}/claude-task-start-$(jq -r .session_id)"
now=$(date +%s)

if [ "$1" = "start" ]; then
  echo "$now" > "$STAMP"
  exit 0
fi

start=$(cat "$STAMP" 2>/dev/null || echo "$now")
if [ $((now - start)) -gt $LIMIT ]; then
  echo "$now" > "$STAMP"
  jq -n '{hookSpecificOutput: {hookEventName: "PreToolUse",
    permissionDecision: "ask",
    permissionDecisionReason: "Task has run over 15 minutes. Continue?"}}'
fi
