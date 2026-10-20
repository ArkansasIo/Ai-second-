# AI Binder — Software Systems Matrix

## Core platform

- Binder workspace persistence
- Sections, pages, documents, folders
- Search and navigation
- Undo/redo
- Page freeze/unfreeze/archive
- Tags and cross-links
- Import/export contracts
- Versioned workspace state

## AI

- Brain LLM provider registry
- Local Ollama backend
- External provider adapters
- Model discovery and selection
- Conversation memory
- Workspace context
- Agent orchestration
- Tool execution
- Provenance
- Audit logging

## Agents and workforce

- Agent registry
- Roles and specialties
- Agent permissions
- Tool allowlists
- Task creation
- Job creation
- Scheduler
- Priorities
- Job state transitions
- Result persistence
- Failure handling

## Developer tools

- BrainScript
- Lexer/compiler/runtime
- Program Studio
- Program Canvas
- Code editor
- Template generator
- Diagnostics
- Tests
- Build runner
- Artifact viewer
- Environment manager
- Git integration
- GitHub integration

## Design tools

- Whiteboard
- UML class/use-case/sequence diagrams
- Flowcharts
- State machines
- Data models
- Architecture diagrams
- Algorithms
- API design
- Requirements
- Database drafts
- UI wireframes
- Technical notes
- Diagram serialization and export

## Integrations

- Search providers
- Math providers
- GitHub
- Plugin SDK
- Provider credentials
- Local filesystem bridge
- Terminal bridge
- Desktop Electron shell
- Android/Capacitor shell

## Security

- Permission model
- Secret storage abstraction
- Provider credential isolation
- Tool permission checks
- Audit events
- Provenance records
- Safe execution boundaries
- Native secure storage for desktop/mobile

## Packaging and operations

- Development build
- Production web build
- Windows installer
- Windows portable executable
- macOS package
- Linux package
- Android debug APK
- Android unsigned release APK
- Release channels
- Update checks
- Checksums
- CI validation

## Product behavior

Every major feature should expose: a user-facing binder page, a persistent data model, a command/action surface, Brain LLM context where appropriate, audit/provenance events for consequential operations, permissions for privileged operations, and tests for its core behavior.

The system is intentionally modular so additional tools, agents, providers, page types, and software environments can be added without changing the Binder core.
