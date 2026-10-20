# Offline Local Runtime

## Goal

AI Second Brain should remain useful when the browser has no Internet connection. The browser application stores its workspace locally, while native local tools are exposed through a local runtime when they are installed on the device.

## Offline architecture

```text
Browser / PWA
   |
   +-- Service Worker
   +-- IndexedDB
   +-- localStorage
   +-- Local Workspace Files
   |
   +-- Local Runtime (127.0.0.1)
         +-- Ollama
         +-- AI Second Brain API
         +-- Git
         +-- Compilers / SDKs
         +-- Build / Test Workers
         +-- MySQL (optional)
```

## What works offline in the browser

- Open previously cached AI Second Brain UI.
- Read and edit locally stored projects and documents.
- Review conversations and memories stored in IndexedDB.
- Manage workshops, agents, clusters, and settings.
- Import/export supported files.
- Queue work for a local runtime that is temporarily unavailable.
- Use browser-supported speech features when available.

## What requires a local runtime

A browser cannot directly execute arbitrary native programs. The following require the local bridge/runtime:

- Ollama inference.
- C/C++/Rust/Go/Java/Kotlin and other native compilation.
- Android APK/AAB builds.
- iOS/iPadOS builds with Xcode on macOS.
- Unreal/Godot/Blender native application automation.
- Native Git operations outside browser-managed data.
- MySQL server access.
- Arbitrary terminal commands.

When these services exist locally, the browser can use them without Internet access through loopback connections.

## Local bridge requirements

Default local endpoints should bind to loopback only:

- `127.0.0.1:8787` — AI Second Brain API.
- `127.0.0.1:11434` — Ollama.

LAN access is disabled by default and requires explicit user configuration, authentication, origin validation, and a clear security warning.

## PWA installation

The GitHub Pages application can be packaged as a Progressive Web App where supported. Installation provides an app-like browser shell, but PWA installation does not itself grant arbitrary filesystem, terminal, compiler, or Ollama permissions.

## Local-first rule

Internet connectivity is an enhancement, not a prerequisite. The application must not silently substitute a remote AI provider when Ollama or the local runtime is unavailable. Remote services require explicit user configuration.

## Recovery

If the local runtime is stopped, the browser should display a recoverable offline state with actions such as:

- Retry local runtime
- Open offline workspace
- Import files
- Export workspace
- View queued tasks
- Start/reconnect local runtime
- Configure authorized LAN runtime

The application must never erase local workspace data merely because a runtime connection failed.
