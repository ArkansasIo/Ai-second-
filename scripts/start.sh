#!/usr/bin/env bash
set -Eeuo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ -x "$ROOT_DIR/apps/api/start.sh" ]]; then
  exec "$ROOT_DIR/apps/api/start.sh" "$@"
fi

if [[ -f "$ROOT_DIR/package.json" ]] && command -v npm >/dev/null 2>&1; then
  cd "$ROOT_DIR"
  exec npm run start -- "$@"
fi

echo "AI Second Brain source tree: $ROOT_DIR"
echo "The application runtime has not been installed yet."
