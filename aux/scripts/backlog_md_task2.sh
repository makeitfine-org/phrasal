# Usage:
# backlog_md_task2.sh 28 29
#
#!/bin/bash

SESSION="claude_session"

if [ $# -eq 0 ]; then
    echo "Usage: $0 <task-number> [task-number2] ..."
    exit 1
fi

wait_for_completion() {
    local timeout=300
    local elapsed=0
    local last_output=""

    while [ $elapsed -lt $timeout ]; do
        local output
        output=$(tmux capture-pane -t "$SESSION" -p -S -50)

        # Print new output
        if [ "$output" != "$last_output" ]; then
            clear
            echo "$output"
            last_output="$output"
        fi

        # Claude idle prompt: line ending with "> " or "❯ "
        if echo "$output" | tail -5 | grep -qE '>\s*$|❯\s*$'; then
            return 0
        fi

        sleep 2
        elapsed=$((elapsed + 2))
    done

    echo "Timeout waiting for Claude to finish"
    return 1
}

tmux new-session -d -s "$SESSION" -x 220 -y 50
tmux send-keys -t "$SESSION" 'claude -r "[s] Add new phrasal verb" --permission-mode dontAsk --allowedTools "Read,Edit,Bash" --max-turns 10' Enter

echo "Waiting for Claude to start..."
sleep 5

for num in "$@"; do
    echo ""
    echo "=== Starting task-${num} ==="
    tmux send-keys -t "$SESSION" "Complete the backlog task-${num}" Enter

    wait_for_completion

    echo ""
    echo "=== Compacting after task-${num} ==="
    tmux send-keys -t "$SESSION" "/compact" Enter
    sleep 3
done

echo ""
echo "All tasks completed."
