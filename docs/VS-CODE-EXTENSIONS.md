# Visual Studio Code Extension Integration

AI Second Brain supports Visual Studio Code extensions as installable **workshop capabilities**. Extensions are not limited to a single language: the selected workshop can enable extensions for its language, framework, debugger, formatter, SCM, AI tools, or domain.

## Architecture

```text
AI Second Brain Workshop
        |
        +-- Environment Profile
        |     +-- Language
        |     +-- Toolchain
        |     +-- Job
        |     +-- Task
        |
        +-- VS Code Extension Manager
        |     +-- Discover
        |     +-- Install
        |     +-- Enable/Disable
        |     +-- Update
        |     +-- Remove
        |
        +-- VS Code Adapter
              +-- workspace
              +-- terminal
              +-- tasks
              +-- debugger
              +-- language server
              +-- extension commands
```

## Extension sources

The manager can support:

1. VS Code Marketplace extensions.
2. VSIX files supplied by the user.
3. Private/local extension packages.
4. Extensions bundled with AI Second Brain plugins.
5. Organization-approved extension catalogs.

The system should preserve the source and version for reproducibility.

## Workshop profiles

Each workshop has an extension manifest. Example:

```json
{
  "workshopId": "WORKSHOP-00001",
  "environment": "cpp-core",
  "extensions": [
    {
      "id": "ms-vscode.cpptools",
      "enabled": true,
      "version": "latest-approved"
    },
    {
      "id": "llvm-vs-code-extensions.vscode-clangd",
      "enabled": false
    }
  ]
}
```

A workshop may have a different extension set from every other workshop, even when both use VS Code.

## Environment changes

Selecting C++, Python, Rust, Android, Unreal, Godot, or another environment can offer a recommended extension set. Recommendations never silently install software. Installation requires the workshop's extension permission and, where configured, user approval.

Examples:

- C++: C/C++, clangd, CMake Tools, debugger tooling.
- Python: Python, Pylance-compatible tooling, test/debug tooling.
- Rust: rust-analyzer, Cargo tooling.
- TypeScript: TypeScript/JavaScript, ESLint, framework tooling.
- Unreal: Unreal-aware C++ tooling, CMake/build/debug utilities, Blueprint integration adapter.
- Godot: Godot language/editor integration and GDScript tooling.
- Android: Android, Kotlin, Java, Gradle, ADB tooling.
- Blender: Python and Blender scripting tooling.

## Security

Extensions execute third-party code and therefore run behind an explicit trust policy. AI Second Brain records extension ID, publisher/source, version, permissions, installation time, and workshop association. A workspace may be marked trusted, restricted, or isolated.

## Multi-repo behavior

A workshop remains bound to its own repository and virtual environment. VS Code extensions are scoped to that workshop unless the user explicitly promotes an extension to a global installation. This prevents one project's extension requirements from silently changing another project's environment.

## AI integration

AI Second Brain agents can use VS Code tasks, diagnostics, terminal output, language-server information, and extension commands through the adapter. Agent actions still follow the workshop permission policy.
