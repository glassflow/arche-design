#!/usr/bin/env bash
# Symlink every skill in this repo into a Claude Code skills dir (default: ~/.claude/skills).
# Usage: scripts/install.sh [target-dir]
set -euo pipefail
here="$(cd "$(dirname "$0")/.." && pwd)"
target="${1:-$HOME/.claude/skills}"
mkdir -p "$target"
for skill in "$here"/skills/*/; do
  name="$(basename "$skill")"
  dest="$target/$name"
  if [ -e "$dest" ] && [ ! -L "$dest" ]; then
    echo "skip $name: $dest exists and is not a symlink (move it aside first)"; continue
  fi
  ln -sfn "${skill%/}" "$dest"
  echo "linked $dest -> ${skill%/}"
done
