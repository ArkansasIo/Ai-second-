# AI Binder Feature Map

## Product identity

- Product: **AI Binder**
- Primary AI engine: **Brain LLM**
- Default local inference backend: **Ollama**
- Workspace model: persistent binder sections, folders, paper-like pages, documents, tabs, and trees

## Binder sections

1. Dashboard
2. Projects
3. GitHub
4. Blueprints
5. Agents
6. Memory
7. Extensions
8. Releases
9. Issues
10. Code
11. Pull Requests
12. Actions
13. Roadmaps
14. Security
15. Insights
16. Environments
17. Terminal

## Page types

- Dashboard
- Project
- Source Code
- Brain Idea Storm
- Whiteboard
- UML Class Diagram
- UML Use Case
- UML Sequence Diagram
- Flowchart
- State Machine
- Data Model
- Architecture
- Algorithm
- API Design
- Requirements
- Database Draft
- UI Wireframe
- Technical Notes

## AI and workforce

- Brain LLM provider registry
- Ollama provider
- model discovery and selection
- conversation memory
- provenance and audit logging
- agent registry
- per-agent policies
- permitted tools
- workspace context injection
- workforce scheduler
- tasks and jobs
- Search tools
- Math tools
- plugin registry

## Development environment

- Workspace persistence
- folder/document CRUD
- document editing
- freeze/unfreeze pages
- undo/redo
- Program Studio
- Program Canvas
- BrainScript
- templates
- development runner contract
- tests and type checking
- desktop packaging
- Android packaging
- release channels and update checking

## Next implementation layers

The feature map is intentionally broader than the currently implemented runtime. Remaining layers should be implemented in dependency order: persistent binder page documents; diagram persistence/export; BrainScript parser/typechecker/stdlib; agent tool-call loop; GitHub API actions; secure native credentials; filesystem/terminal bridges; artifact viewer; release automation; cross-platform launchers; accessibility and end-to-end tests.

This document is the canonical checklist for continuing the AI Binder implementation.
