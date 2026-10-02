#!/usr/bin/env bash
# Thin wrapper — the real build is the cross-platform Node script.
set -euo pipefail
exec node "$(dirname "$0")/build_combined.mjs"
