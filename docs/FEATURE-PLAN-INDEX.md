# AI Second Brain — Feature Plan Index

## Purpose

This index is the master planning document for the new AI Second Brain features. Each feature area has a dedicated implementation plan, acceptance criteria, dependencies, and release target.

## Release lifecycle

`Pre-alpha` → `Alpha` → `Pre-beta` → `Beta` → `Gold`

Features are planned independently but promoted through the same release gates.

## Master feature plan

| ID | Feature | Plan | Primary deliverable | Initial target |
|---|---|---|---|---|
| FEAT-00001 | Local-first architecture | `FEATURE-LOCAL-FIRST.md` | Local data/services/privacy boundary | Pre-alpha |
| FEAT-00002 | Ollama AI runtime | `FEATURE-OLLAMA.md` | Model discovery/chat/streaming/provider routing | Alpha |
| FEAT-00003 | Agent system | `FEATURE-AGENTS.md` | Agent profiles, cloning, permissions, tools | Alpha |
| FEAT-00004 | Agent clusters | `FEATURE-CLUSTERS.md` | Parallel orchestration, shared memory, scheduling | Alpha |
| FEAT-00005 | Virtual environments | `FEATURE-VIRTUAL-ENVIRONMENTS.md` | Isolated build/workspaces | Alpha |
| FEAT-00006 | Workshop tabs | `FEATURE-WORKSHOPS.md` | Named environment tabs and persistence | Alpha |
| FEAT-00007 | Universal Blueprint | `FEATURE-BLUEPRINTS.md` | Graph IR and language adapters | Alpha |
| FEAT-00008 | IDE/application plugins | `FEATURE-PLUGINS.md` | VS Code, Visual Studio, Unreal, Godot, Blender, custom adapters | Alpha |
| FEAT-00009 | Git/GitHub workspace | `FEATURE-GITHUB-WORKSPACE.md` | Issues, code, PRs, actions, projects, security, insights | Alpha |
| FEAT-00010 | Project management | `FEATURE-PROJECT-MANAGEMENT.md` | Roadmaps, milestones, deadlines, dependencies | Alpha |
| FEAT-00011 | Voice AI | `FEATURE-VOICE-AI.md` | STT/TTS, voice profiles, spoken commands | Pre-beta |
| FEAT-00012 | Universal C++ core | `FEATURE-UNIVERSAL-CORE.md` | Shared cross-platform runtime | Pre-beta |
| FEAT-00013 | Cross-platform builds | `FEATURE-CROSS-PLATFORM.md` | Windows/macOS/Linux/Android/iOS/Raspberry Pi/browser | Beta |
| FEAT-00014 | Installer and bootloader | `FEATURE-INSTALLER.md` | Install, startup checks, recovery | Beta |
| FEAT-00015 | Release/update system | `FEATURE-UPDATES.md` | Channels, packages, verification, rollback | Beta |
| FEAT-00016 | Memory and knowledge | `FEATURE-MEMORY.md` | Project memory, retrieval, embeddings | Alpha |
| FEAT-00017 | Security and permissions | `FEATURE-SECURITY.md` | Sandboxing, approvals, secrets, audit | Alpha |
| FEAT-00018 | Build/test automation | `FEATURE-BUILD-TEST.md` | Compilers, test runners, artifacts | Alpha |
| FEAT-00019 | External AI providers | `FEATURE-EXTERNAL-AI.md` | Optional OpenAI/Gemini/Anthropic/custom APIs | Pre-beta |
| FEAT-00020 | Browser/GitHub Pages | `FEATURE-WEB.md` | Free browser test/demo client | Pre-alpha |

## Shared requirements

Every feature plan must define:

- User story and scope
- Architecture
- Source tree impact
- Data model/API impact
- UI/UX impact
- Permissions and security
- Offline/local behavior
- External dependency policy
- Tests
- Failure/recovery behavior
- Migration/compatibility strategy
- Release acceptance criteria
- Known limitations

## Planning rule

A feature may be documented before implementation, but release documentation must distinguish **planned**, **implemented**, **CI-verified**, and **production-verified** states.

## Dependency order

```text
Local Core
   ↓
Ollama + Memory
   ↓
Agents
   ↓
Clusters
   ↓
Virtual Environments
   ↓
Workshops + Plugins
   ↓
Build/Test + Git/GitHub
   ↓
Blueprints + Project Management
   ↓
Voice + External AI
   ↓
Installer + Cross-platform Packaging
   ↓
Updates + Gold Release
```

## Definition of done

A feature is complete only when its implementation, tests, documentation, security policy, failure handling, and release status are all recorded. A design document alone does not mark a feature implemented.
