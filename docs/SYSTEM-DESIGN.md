# AI Second Brain System Design

## Product

AI Second Brain is a local-first, cross-platform AI development and knowledge environment. The browser trial is hosted by GitHub Pages. Full installations run the local backend, database, files, agent orchestration, plugins, and Ollama integration.

## Core principles

1. Local data ownership by default.
2. Shared application core across platforms.
3. Ollama as the default local AI provider.
4. Agents are configurable profiles; cloning an agent clones its configuration, not model weights.
5. Clusters orchestrate multiple agents concurrently.
6. Human approval for privileged operations by default.
7. GitHub Releases are the distribution/update source for installed clients.

## Layers

### Client layer

- Web/GitHub Pages client
- Windows desktop
- macOS desktop
- Linux desktop
- Android
- iOS/iPadOS
- Raspberry Pi 3/4/5

### API layer

REST/JSON endpoints accessed by browser and native clients. Browser communication uses Fetch/AJAX semantics. CORS is restricted to configured origins.

### Application services

- Project service
- Agent registry
- Agent clone service
- Cluster manager
- Task scheduler
- Memory service
- Artifact service
- Model manager
- Ollama provider
- Plugin manager
- Git/GitHub service
- Build/test service
- Update service
- Audit service

### Persistence

MySQL stores durable application metadata. Redis may provide queues and transient coordination. Browser-only mode uses IndexedDB for local cache/offline state. Project source files remain on the user's machine in the full local installation.

### AI layer

Ollama is the default local provider. Model discovery is dynamic through the local Ollama API. Agent definitions specify model, system prompt, tools, permissions, memory scope, temperature, and role.

## Agent and cluster hierarchy

`Cluster -> Node -> Branch -> Sub-branch -> Task -> Subtask -> Module -> Submodule`

Clusters can run independent tasks concurrently, enforce dependencies, collect artifacts, share approved project memory, and hand work between agents.

## Security boundary

GitHub Pages is treated as an untrusted presentation/client surface. Private data, local API credentials, database credentials, model data, and filesystem access remain on the user's device. Explicit synchronization is required before private information leaves the device.

## Release architecture

GitHub Actions builds and tests platform packages. GitHub Releases publish versioned artifacts and update metadata. The launcher verifies and installs compatible releases and records update history locally.
