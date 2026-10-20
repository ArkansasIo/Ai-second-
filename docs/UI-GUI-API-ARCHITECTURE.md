# AI Second Brain — UI / GUI / API Architecture

## Command-center layout

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ Brand │ Command/Search │ Workspace │ Agent │ API │ Health │ Settings      │
├───────────────┬───────────────────────────────────────────┬──────────────┤
│ NAVIGATION    │ MAIN WORKSPACE                            │ INSPECTOR    │
│ Projects      │ Context toolbar / breadcrumbs             │ Selection    │
│ Files         │ Dashboard / editor / terminal / graph      │ Properties   │
│ Agents        │                                           │ Tool config  │
│ Memory        │                                           │ Activity     │
│ Search        │                                           │ Permissions  │
│ Git           │                                           │ Logs         │
│ Blueprints    │                                           │              │
│ UML           │                                           │              │
│ Documentation │                                           │              │
│ Terminal      │                                           │              │
│ API           │                                           │              │
│ System        │                                           │              │
└───────────────┴───────────────────────────────────────────┴──────────────┘
```

## Primary screens

- Home / Command Center — health, active project, jobs, agents, recent files.
- Projects — project cards, environments, activity, and settings.
- Files — tree explorer, editor, diff view, and metadata.
- Agents — roster, roles, tasks, tool permissions, and run history.
- Chat — model selection, context attachments, tool-call timeline.
- Memory — persistent project memory with tags and provenance.
- Search — code, docs, files, memory, Git, and symbol search.
- Git — branch graph, status, diff, commit, pull/push controls.
- Blueprints — node graph for workflows, programs, agent plans, and automation.
- UML — class, sequence, component, state, activity, and deployment diagrams.
- Documentation — Markdown editor, preview, generated docs, API explorer.
- Terminal — sandboxed commands, output stream, and process state.
- Jobs — queue, progress, logs, cancellation, and artifacts.
- API Explorer — endpoint catalog, schemas, request builder, response viewer.
- System — API/Ollama/database/native-runtime diagnostics.
- Settings — models, providers, security, permissions, appearance, storage, updates.

## Tool categories

Workspace: `workspace.open`, `workspace.create`, `workspace.search`, `files.read`, `files.write`.

AI: `ai.chat`, `ai.agent`, `memory.search`, `memory.write`.

Code: `code.analyze`, `code.test`, `terminal.run`.

Git: `git.status`, `git.diff`, `git.commit`, `git.push`.

Design: `blueprint.create`, `uml.generate`, `docs.generate`.

System: `system.health`.

Every tool has a permission class, description, icon, endpoint, and optional confirmation requirement.

## Interaction model

1. Select a workspace or project.
2. Show active context in the command bar.
3. Search and command palette address any screen or registered tool.
4. Read-only operations execute immediately.
5. Write, network, execute, and admin operations use confirmation boundaries when required.
6. Long operations become jobs and appear in the global job tray.
7. Agent actions display tool calls, inputs, outputs, and provenance.
8. Mutations are recorded in the activity/audit stream.

## API surface

Base path: `/api/v1`.

| Endpoint | Purpose |
|---|---|
| `GET /health` | Runtime health and service status |
| `GET/POST /projects` | Project discovery and creation |
| `GET/POST /workspaces` | Workspace management |
| `GET /agents` | Agent registry and status |
| `POST /agents/run` | Start an agent job |
| `GET /tools` | Registered tools and permissions |
| `POST /tools/call` | Execute a registered tool |
| `GET/POST /memory` | Persistent memory |
| `POST /search` | Unified search |
| `GET/POST /files` | Workspace file operations |
| `GET /jobs` | Job status and history |
| `POST /chat` | Brain LLM chat |
| `POST /git` | Git operations |

All responses use `{ status, requestId, data, error }` envelopes. Long-running operations return a job identifier.

## Security model

- Local-first by default.
- Explicit permissions: `read`, `write`, `network`, `execute`, `admin`.
- Dangerous operations require confirmation.
- Terminal commands run only inside an approved workspace/sandbox.
- Network tools identify their destination.
- Agent tools are scoped per role.
- API errors never expose secrets or credentials.
- Audit records capture actor, tool, permission, timestamp, workspace, result status, and correlation ID.

## Responsive behavior

Desktop uses the three-column command-center layout. Tablet collapses the inspector. Mobile collapses the sidebar into a drawer and presents one workspace panel at a time.

## Visual language

`src/ui/designTokens.css` provides the dark command-center theme. The design uses compact panels, monospace metadata, cyan system accents, explicit health states, and dense developer-tool information architecture.
