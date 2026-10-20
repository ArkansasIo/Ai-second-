# AI Second Brain — Wiring Status 0.1.11

## End-to-end path

`UI -> WorkspaceStore -> WorkspaceContextBuilder -> AgentWorkforceOrchestrator -> BrainLLMAgentRuntime -> BrainLLM provider -> Memory/Audit/Provenance`

## Wired services

- Brain LLM model discovery and model persistence
- Configurable Ollama Brain LLM endpoint
- Brain LLM application chat endpoint
- Conversation memory persistence and search
- Workspace context injection into agent prompts
- Agent registry and workforce assignment
- Workforce job/task state transitions
- Agent permission persistence
- Tool permission enforcement
- Search tool registration
- Math tool registration
- Local workspace search provider
- arXiv search provider
- Safe local arithmetic provider
- Search provenance records
- Math provenance records
- Brain LLM provenance records
- Workforce audit events
- Workspace import/export
- Workspace undo/redo
- Document freeze/unfreeze
- Responsive application shell

## Security boundary

Tool permissions are checked before execution. Network, write, and execute capabilities are separate policy flags. Provider credentials are not stored by the control panels in browser localStorage.

## Compatibility

The API retains legacy `/api/ollama/*` compatibility routes, but the application shell uses `/api/brain-llm/*` as the canonical interface.

## Verification

Added `tests/wired-services.test.ts` for the safe local math engine and agent policy enforcement. GitHub Actions should be treated as the authoritative build/typecheck/test result; source edits alone do not imply a successful CI run.
