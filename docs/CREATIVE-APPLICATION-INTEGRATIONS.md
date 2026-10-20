# Creative Application Integrations

AI Second Brain treats creative applications as first-class development environments alongside programming IDEs and game engines.

## Supported integration model

Each application adapter exposes:

- application discovery and version detection
- project/workspace attachment
- scripting/API bridge
- scene/document inspection
- task execution
- artifact import/export
- build/render/export operations
- logs and diagnostics
- agent permissions and approval gates
- resource reporting

## Blender

Blender is a first-class integration target. The Blender adapter uses Blender's Python API for automation and communicates with the AI Second Brain cluster/task runtime.

Example environment:

```text
Blender Environment
├── Blender Project
├── Scene Agent
├── Modeling Agent
├── Material Agent
├── Animation Agent
├── Rigging Agent
├── Lighting Agent
├── Rendering Agent
├── Asset Export Agent
└── QA Agent
```

A coordinated task can create or modify a scene, run validation, render a preview, and export assets for Unreal Engine, Godot, or a general asset workspace.

## Other applications

The same adapter contract can support CAD, DCC, audio, video, image, and other applications when they expose a scripting interface, command-line interface, plugin SDK, or automation API.

Applications without a native adapter can use the generic application environment with explicit user approval for desktop automation.

## Security

Application adapters run inside the virtual-environment permission model. File writes, process execution, network access, credentials, destructive operations, and external publication can each require separate approval.

## Architecture

```text
AI Second Brain
      |
Cluster Scheduler
      |
Virtual Environment
      |
Application Adapter
      |
+---------------------------+
| Blender / Unreal / Godot  |
| CAD / DCC / IDE / Custom  |
+---------------------------+
      |
Application API / Plugin
      |
Artifacts + Logs + Results
```
