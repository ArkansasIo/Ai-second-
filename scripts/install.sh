#!/usr/bin/env bash
set -Eeuo pipefail

APP_NAME="AI Second Brain"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INSTALL_DIR="${AI_SECOND_BRAIN_HOME:-$HOME/.ai-second-brain}"
BIN_DIR="${AI_SECOND_BRAIN_BIN:-$HOME/.local/bin}"

log() { printf '[AI Second Brain] %s\n' "$*"; }
warn() { printf '[AI Second Brain] WARNING: %s\n' "$*" >&2; }
die() { printf '[AI Second Brain] ERROR: %s\n' "$*" >&2; exit 1; }

command_exists() { command -v "$1" >/dev/null 2>&1; }

log "Installing ${APP_NAME}..."
mkdir -p "$INSTALL_DIR" "$BIN_DIR"

# Copy the repository into the local runtime directory when this script is run
# from a checked-out repository. Never overwrite user data directories.
if [[ -d "$ROOT_DIR" ]]; then
  mkdir -p "$INSTALL_DIR/repo"
  cp -R "$ROOT_DIR"/. "$INSTALL_DIR/repo/"
fi

# Record the source revision when Git is available.
if command_exists git && git -C "$ROOT_DIR" rev-parse HEAD >/dev/null 2>&1; then
  git -C "$ROOT_DIR" rev-parse HEAD > "$INSTALL_DIR/version.commit"
fi

# Create a launcher. The launcher prefers the project-provided start script,
# then falls back to the API/web development commands when available.
cat > "$BIN_DIR/ai-second-brain" <<EOF
#!/usr/bin/env bash
set -Eeuo pipefail
ROOT="${INSTALL_DIR}/repo"
if [[ -x "\$ROOT/scripts/start.sh" ]]; then
  exec "\$ROOT/scripts/start.sh" "\$@"
fi
if [[ -f "\$ROOT/package.json" ]] && command -v npm >/dev/null 2>&1; then
  cd "\$ROOT"
  exec npm run start -- "\$@"
fi
printf 'AI Second Brain is installed at %s\\n' "\$ROOT"
printf 'Add %s to PATH if the launcher is not already available.\\n' "${BIN_DIR}"
EOF
chmod +x "$BIN_DIR/ai-second-brain"

# Optional Ollama integration. Do not install or download models silently.
if command_exists ollama; then
  log "Ollama detected: $(ollama --version 2>/dev/null || true)"
else
  warn "Ollama was not detected. Install Ollama separately to enable local AI models."
fi

# Helpful PATH message for shells that do not already include ~/.local/bin.
case ":${PATH}:" in
  *":${BIN_DIR}:"*) ;;
  *) warn "Add ${BIN_DIR} to PATH, for example: export PATH=\"${BIN_DIR}:\$PATH\"" ;;
esac

log "Installation files prepared in ${INSTALL_DIR}."
log "Launcher: ${BIN_DIR}/ai-second-brain"
log "No cloud account, model download, or remote synchronization is enabled by this installer."
