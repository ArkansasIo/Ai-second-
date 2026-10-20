# Windows Workshop Tabs

AI Second Brain Professional Edition uses browser-style workshop tabs on Windows. Each tab is an isolated project workspace backed by a cluster, while the global core can coordinate work between tabs.

## Tab contract

Each workshop owns:

- `workshopId`
- project and repository binding
- workspace folder
- virtual environment
- agent cluster
- terminal sessions
- build/test jobs
- Git branch/worktree
- memory scope
- Ollama model routing
- voice profile
- artifacts
- permissions and approval policy

## Built-in workshops

- WORKSHOP-00001 — C++ Workshop
- WORKSHOP-00002 — Python Workshop
- WORKSHOP-00003 — Unreal Workshop
- WORKSHOP-00004 — Godot Workshop
- WORKSHOP-00005 — Android Workshop
- WORKSHOP-00006 — iOS Workshop
- WORKSHOP-00007 — Blender Workshop
- WORKSHOP-00008 — Web Workshop
- WORKSHOP-00009 — Research Workshop
- WORKSHOP-00010 — Documentation Workshop

## Windows behavior

The desktop shell provides browser-like tabs, pinning, tab restore, detachable windows, split views, close/reopen, and a global Command Center tab. Closing a tab does not destroy its workspace; the lifecycle manager can suspend or terminate the environment explicitly.

## Parallel work

Workshops may execute concurrently subject to resource policy. For example, Android can run a Gradle build while Unreal compiles C++ and Blender renders an asset. The cluster scheduler owns concurrency, CPU/GPU/RAM/VRAM limits, queueing, cancellation, and approval gates.

## Global coordination

The Command Center can create cross-workshop tasks and delegate subtasks to the appropriate cluster. Artifacts and task results can be passed between workshops through the shared project artifact registry without sharing unrelated private data.
