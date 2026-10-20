# AI Second Brain

**Professional Edition — Prototype**

Developer: ArkansasIo  
Version: 0.1.9  
Year: 2026

AI-native development and knowledge environment combining persistent project memory, AI agent teams, UML/Blueprint design, documentation, source code, Git/GitHub integration, and offline/local operation.

## Main AI Engine: Brain LLM

**Brain LLM** is the canonical application-level AI/LLM engine. Ollama is the default local inference backend used by Brain LLM.

New AI integrations should target `BrainLLM`/`brainLLM` rather than directly coupling to Ollama. Agent execution should use `BrainLLMAgentRuntime` so agent roles, system prompts, and tool declarations stay above the provider layer.

## API

New AI routes use `/api/brain-llm/*`. Existing `/api/ollama/*` routes remain compatibility aliases.

## Current Foundation

- Binder-style folder workspace with document tree
- Program Studio for code, canvas, whiteboard, and drafting
- BrainScript OOP language contracts and compiler foundation
- Brain LLM primary AI engine
- Ollama provider adapter
- Brain LLM agent runtime bridge
- Agent/tool/work scheduler
- Search and math provider systems
- Persistent workspace storage
- Responsive desktop, tablet, and mobile layout
- GitHub Pages deployment workflow
- Release/version metadata and licensing policy records

## Repository Layout

```text
apps/        Application frontends and integrations
packages/    Shared core services
config/      Runtime configuration
database/    Database schema and migrations
docs/        Product and developer documentation
uml/         UML and architecture sources
tests/       Automated tests
workers/     Background jobs and agent workers
cron/        Scheduled maintenance
src/         Web application source and feature modules
```

## License

The project license remains pending final selection. See `LICENSE` and `docs/licensing/LICENSE-POLICY.md`.
