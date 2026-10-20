# Virtual Environment Clusters

AI Second Brain uses isolated development environments as first-class cluster nodes. A single project can run multiple environments in parallel, each with its own toolchain, dependencies, filesystem workspace, secrets policy, build cache, and task queue.

## Example parallel workspace

```text
Project: CrossPlatformApp
│
├── Cluster: Mobile
│   ├── Android Environment
│   │   ├── Android SDK / NDK
│   │   ├── Gradle
│   │   ├── Kotlin / Java
│   │   └── APK/AAB build tasks
│   └── iOS Environment
│       ├── Swift / Objective-C
│       ├── Xcode toolchain (macOS host)
│       └── IPA/archive build tasks
│
├── Cluster: Game
│   ├── Unreal Engine Environment
│   │   └── UE 5.x project/plugin build
│   └── Godot Environment
│       └── Godot project/plugin build
│
└── Cluster: Services
    ├── C++ Environment
    ├── Python Environment
    ├── Node/TypeScript Environment
    └── Database/Integration Environment
```

## Isolation

Each environment has:

- environment ID and platform
- language/toolchain profile
- isolated working directory
- environment variables and secret references
- package/dependency cache
- compiler/build configuration
- test configuration
- artifact output directory
- terminal/process policy
- Git branch or worktree mapping
- agent assignment
- resource limits

Agents operate inside the environment assigned to their task. They do not automatically gain access to another environment.

## Parallel task execution

The cluster scheduler decomposes work into independent tasks and assigns them to environments. Tasks can run concurrently when dependencies permit.

```text
Epic
 ├── Android APK ───────► Android Environment
 ├── iOS App ────────────► iOS Environment
 ├── UE Plugin ──────────► Unreal Environment
 ├── Godot Plugin ───────► Godot Environment
 └── API/Backend ────────► C++/Node Environment
```

The scheduler tracks dependencies, CPU/RAM/GPU usage, queue depth, failures, retries, approvals, and artifacts.

## Cross-platform build policy

The shared C++ core and plugin APIs are platform-neutral. Platform-specific environment images/toolchains provide the actual build commands.

- Android builds run on Linux, Windows, or macOS hosts with the Android SDK/NDK.
- iOS builds require a macOS host with Apple's toolchain for native iOS packaging/signing.
- Unreal Engine environments require an installed compatible Unreal Engine version and project toolchain.
- Godot environments use the configured Godot editor/runtime and export templates.

AI Second Brain does not claim that GitHub Pages can execute these native toolchains. The browser client schedules work against a local or explicitly configured build worker.

## Environment lifecycle

1. Create environment profile.
2. Provision or validate toolchain.
3. Create isolated workspace.
4. Attach project/repository.
5. Attach agent(s) and task queue.
6. Execute build/test commands under policy.
7. Collect logs and artifacts.
8. Run review/approval gates.
9. Commit changes when authorized.
10. Destroy, suspend, or retain the environment.

## Security boundary

Environment execution is sandboxed by policy. Commands are allowlisted or require approval according to project settings. Secrets are references to local secure storage rather than values committed to source control.
