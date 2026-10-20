# AI Binder

**Professional Edition — Prototype**

Developer: ArkansasIo  
Version: 0.1.12  
Year: 2026

AI-native development and knowledge environment combining persistent project memory, AI agent teams, UML/Blueprint design, documentation, source code, Git/GitHub integration, offline/local operation, and a modular BrainScript-controlled runtime.

## Main AI Engine: Brain LLM

**Brain LLM** is the canonical application-level AI/LLM engine. Ollama is the default local inference backend used by Brain LLM.

## Modular Runtime

AI Binder now exposes a common module lifecycle across Core, Brain LLM, Agents, Workforce, Binder, Workspace, Tools, Plugins, Memory, BrainScript, Development, Verification, Security, Integrations, Runtime, UI and Packaging.

Each module can declare dependencies, permissions, configuration, health checks and editable submodules. Changes are routed through the module registry and verification loop before activation.

Lifecycle:

`register -> configure -> start -> execute -> verify -> self-verify -> recover/retry -> persist -> report -> stop`

## BrainScript

BrainScript is the orchestration/configuration layer for modules, submodules, workflows, tasks and module-change events. The runtime registry remains the authoritative execution and permission boundary.

## Verification

The modular execution loop includes:

1. Input and contract verification.
2. Process and invariant verification.
3. Output and postcondition verification.
4. Self-verification and bounded recovery.

## Desktop and Android builds

Version `0.1.12` continues packaging automation for the complete repository through Electron, Capacitor and Gradle.

## API

AI routes use `/api/brain-llm/*`. Existing `/api/ollama/*` routes remain compatibility aliases.

## Repository Layout

```text
apps/        Application frontends and integrations
packages/    Shared core services
config/      Runtime configuration
database/    Database schema and migrations
docs/        Product and developer documentation
uml/         UML and architecture sources
tests/       Automated tests
src/modules/ Module registry, contracts and default module graph
src/         Web application source and feature modules
```

## License

The project license remains pending final selection. See `LICENSE` and `docs/licensing/LICENSE-POLICY.md`.
