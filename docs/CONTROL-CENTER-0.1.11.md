# AI Second Brain Control Center — 0.1.11

The workspace UI now exposes the remaining application-control surfaces as reusable React components.

## Included

- Brain LLM provider/model control
- Agent role permissions
- Search and Math provider selection
- Agent workforce job queue
- Conversation memory search and clearing
- Workspace JSON import/export
- Workspace folder/document editing
- Freeze/unfreeze document pages
- Undo/redo workspace operations
- Responsive control-center layout

## Architecture

The UI depends on the application service boundaries:

- `BrainLLM` / `defaultBrainLLM`
- `SearchEngine`
- `MathEngine`
- `WorkspaceStore`
- `ConversationMemoryStore`
- agent/workforce task contracts

Ollama remains a local provider/backend for Brain LLM rather than the product-level AI identity.

## Security boundary

Provider credentials must continue to use the existing secret-store abstraction. The browser control panels do not persist API keys or private signing material.

## Packaging

The same web bundle remains the source for the desktop and Android packaging workflows. The feature pack is therefore part of the Windows and Android build inputs after the repository checkout and web build steps complete.
