#!/bin/bash

# Get the current timestamp for the commit message
timestamp=$(date "+%Y-%m-%d %H:%M:%S")

# Add all changes
git add .

# Ask for commit message
echo "Enter commit message (press Enter to use timestamp as message):"
read commit_message

# If no message is provided, use timestamp
if [ -z "$commit_message" ]; then
    commit_message="Update at $timestamp"
fi

# Commit with message
git commit -m "$commit_message"

# Push to current branch
current_branch=$(git symbolic-ref --short HEAD)
git push origin $current_branch

echo "Changes pushed successfully to branch: $current_branch" 