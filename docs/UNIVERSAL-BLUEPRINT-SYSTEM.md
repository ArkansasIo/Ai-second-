# Universal Blueprint System

AI Second Brain includes a visual, node-based programming system inspired by the usability of Unreal Engine Blueprints, but designed as a language-agnostic developer tool. It is an original system and does not reproduce Unreal Engine's proprietary implementation or assets.

## Purpose

A developer can build program logic visually and then:

1. generate source code;
2. edit generated source directly;
3. compile and test in the selected workshop environment;
4. map source functions back to nodes;
5. reuse graphs as plugins, templates, libraries, or project modules.

## Supported language targets

The blueprint graph is an intermediate representation rather than a replacement for a programming language.

- C / C++
- C#
- Rust
- Python
- Java / Kotlin
- Go
- JavaScript / TypeScript
- Swift / Objective-C
- GDScript
- shader languages
- assembly profiles where a compiler adapter is available
- custom language plugins

## Graph model

A graph contains typed nodes connected by execution and data edges.

```text
Event / Entry
      |
      v
Validate Input --> Load Data --> Transform --> Call Function
                                      |               |
                                      v               v
                                  Branch --------> Output
                                      |
                                      v
                                   Error
```

### Node categories

- Events / entry points
- Functions
- Methods
- Variables
- Constants
- Operators
- Branch / switch / loop
- Async / await
- Tasks
- Signals / events
- Classes / structs
- Interfaces
- API calls
- File operations
- Database operations
- Network operations
- AI/agent calls
- Build/test commands
- Error handling
- Logging / diagnostics
- Language-specific nodes
- Custom plugin nodes

## Typed pins

Each node exposes input and output pins with a declared type, direction, optional/default value, and connection policy. The compiler adapter validates graph connections before code generation.

Example types:

```text
bool
int32
int64
float
string
bytes
array<T>
map<K,V>
struct<T>
object<T>
future<T>
result<T,E>
custom::<plugin-type>
```

## Language adapters

Each language plugin implements a common blueprint compiler interface:

```text
Blueprint Graph
      |
      v
IR Validation
      |
      +--> C++ Adapter ------> C++ source
      +--> Python Adapter ----> Python source
      +--> Rust Adapter ------> Rust source
      +--> C# Adapter --------> C# source
      +--> TypeScript Adapter -> TypeScript source
      +--> Kotlin Adapter ----> Kotlin source
      +--> Swift Adapter -----> Swift source
      +--> Custom Adapter ----> custom source
```

Adapters own language syntax, imports, type mapping, project conventions, formatter integration, compiler invocation, and source-to-node diagnostics.

## Two-way synchronization

The system supports two modes:

- **Graph-first:** graph is authoritative and source is generated.
- **Source-first:** source is authoritative and supported code structures are represented in the graph.

When exact reverse mapping is impossible, the system preserves an explicit external-code node instead of silently rewriting source.

## Developer workflow

1. Create or open a workshop.
2. Select environment, language, compiler, IDE, and repository.
3. Open Blueprint Studio.
4. Add nodes and connect typed pins.
5. Validate the graph.
6. Select a language target.
7. Generate source into the workshop workspace.
8. Run formatter, compiler, and tests.
9. Review the source diff.
10. Commit only when permitted by the workshop policy.

## Plugin SDK

Third-party developers can add:

- node definitions;
- pin types;
- graph validators;
- code generators;
- source parsers;
- debugger adapters;
- compiler/build adapters;
- UI panels;
- asset import/export handlers;
- language-specific templates.

Plugins declare capabilities and permissions. File writes, process execution, network access, dependency installation, Git commits, and Git pushes are independently permissioned.

## AI integration

Agents can work directly on graphs:

- Architect Agent designs graph structure.
- Language Agent converts graph intent into idiomatic source.
- Debug Agent identifies invalid connections and compiler failures.
- Test Agent generates graph and source tests.
- Documentation Agent explains graph nodes and generated APIs.
- Project Manager Agent maps blueprint modules to roadmap tasks.

A cluster can edit separate graphs in parallel, with shared memory and explicit merge/review gates.

## Non-goals

The system is not intended to make every language behave identically. Language-specific semantics remain visible, and unsupported constructs are represented explicitly rather than hidden behind unsafe automatic conversion.
