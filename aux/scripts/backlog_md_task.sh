#!/bin/bash

# Check if at least one task is provided
if [ $# -eq 0 ]; then
    echo "Error: No tasks provided."
    echo "Usage: $0 <task1> <task2> ... <taskN>"
    exit 1
fi

# Loop through all arguments passed to the script
for task in "$@"; do
    echo "----------------------------------------"
    echo "Executing task: $task"
    echo "----------------------------------------"

    # Resume session, auto-approve tools, prevent stalling, and execute the task
    claude -r "[s] Add new phrasal verb" \
        --permission-mode dontAsk \
        --allowedTools "Read,Edit,Bash" \
        --max-turns 15 \
        -p "/compact

        Complete the backlog $task"

    echo ""
    echo ">>> Completed: $task"
    echo ""
done