# Browser Local App System

## Goal

AI Second Brain can behave like an installable local-first application while being delivered from GitHub Pages. The browser is the application shell; device storage is the local data layer; Ollama and native development tools remain optional local services.

## Local app layers

```text
GitHub Pages / PWA
        |
        +-- Service Worker / cached application
        +-- IndexedDB / projects, chats, memory, agents
        +-- localStorage / preferences and lightweight settings
        +-- File System Access / supported browsers
        |
        +-- Local AI Bridge
              +-- REST/fetch
              +-- WebSocket streaming
              +-- Ollama
              +-- local API
              +-- optional MySQL
              +-- optional Git/build tools
```

## Browser file import

The application provides an **Import to Local Workspace** action. A user can select one or more files or folders where the browser supports the relevant file APIs. The application copies permitted file contents into its local workspace database/cache and records metadata.

Supported logical operations:

- Import files
- Import folders
- Create a local project
- Export project files
- Download an artifact
- Save generated source locally
- Attach files to an agent task
- Open a local file when the browser grants permission

A browser cannot silently write arbitrary paths on the device. The user must grant the browser's file permission when direct filesystem access is used. On browsers without that capability, the fallback is download/import through the browser's supported mechanisms.

## Ollama in the browser

The browser does not run the Ollama server inside GitHub Pages. Instead, the browser can connect to an Ollama instance running on the same device or an explicitly authorized machine through the Local AI Bridge.

The UI dynamically discovers installed models rather than hardcoding a fixed catalog. Chat requests use the selected model and return streamed or complete responses depending on bridge capabilities.

## Offline mode

When disconnected from the local bridge, the app continues to provide:

- local projects
- local conversations
- local memories
- agent configuration
- workshop configuration
- imported files
- cached application UI
- queued actions

The UI must show an explicit offline/local state and never silently route prompts to a remote AI provider.

## Install-like behavior

On supported browsers the user can add AI Second Brain to the home screen or install it as a PWA. The same Pages build can therefore appear as an app on iPhone, iPad, Android, Windows, macOS, and Linux browsers where PWA installation is supported.

## Privacy

No local project, conversation, memory, file, or model credential is uploaded merely because the user opened the Pages application. Synchronization and remote AI providers are separate, explicit features.
