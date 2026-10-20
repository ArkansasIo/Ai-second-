# AI Second Brain 0.1.10

## Release state

- Prototype release channel: Gold metadata remains configurable.
- Version metadata is synchronized to `0.1.10`.
- **Brain LLM** remains the canonical main AI/LLM engine.
- Ollama remains the default local inference backend for Brain LLM.
- Agent execution has a canonical `BrainLLMAgentRuntime` bridge.
- Windows NSIS and portable EXE packaging is automated with Electron Builder.
- Android debug and unsigned release APK packaging is automated with Capacitor and Gradle.
- Packaging workflows check out the complete repository and validate version metadata.
- License remains pending final open-source/source-available selection.

## Build outputs

- `AI-Second-Brain-0.1.10-win-x64.exe` / equivalent Electron Builder installer artifact.
- Portable Windows EXE.
- `AI-Second-Brain-v0.1.10-debug.apk`.
- `AI-Second-Brain-v0.1.10-release-unsigned.apk`.

The unsigned APK is suitable for development/testing installation. A Play Store or production-distribution APK requires signing with the project's release keystore, which is intentionally not stored in the repository.
