# Universal Blueprint Plugin

This package defines the language-neutral visual programming layer for AI Second Brain.

## Core contract

```text
Graph Editor -> Blueprint IR -> Validator -> Language Adapter -> Source -> Build/Test
```

The editor is designed to feel familiar to developers who use node-based visual programming systems, while remaining independent of any particular game engine.

## Plugin targets

A language or application plugin can register:

```text
BlueprintNodeProvider
BlueprintTypeProvider
BlueprintValidator
BlueprintCodeGenerator
BlueprintSourceParser
BlueprintDebugger
```

## Example

A `ForEach` node can target C++, Python, Rust, TypeScript, C#, or another registered language. The adapter decides how iteration, typing, ownership, async behavior, and error handling should be expressed idiomatically.

## IDs

Blueprint assets use permanent IDs:

- `BLUEPRINT-00001`
- `BLUEPRINT-00002`
- `NODE-00001`
- `PIN-00001`
- `EDGE-00001`

Names are editable without changing IDs, so project history, Git diffs, agent memory, and references remain stable.

## Developer extensibility

The eventual Blueprint SDK will support signed or explicitly trusted third-party plugins. Plugins may be enabled per workshop, allowing a developer to use the same Blueprint Studio for a C++ application, Python service, Android application, Unreal project, Blender automation project, or custom language without installing a different visual editor for every project.
