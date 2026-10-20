# Windows EXE Package

AI Second Brain includes a Windows desktop packaging path using Electron and electron-builder.

## Windows artifacts

The release pipeline is intended to produce:

- `AI-Second-Brain-<version>-win-x64.exe` — NSIS installer.
- `AI-Second-Brain-<version>-win-x64.exe` — portable executable target, with the final artifact name distinguished by the release manifest when both are published.

The desktop shell loads the same Vite-built browser application from `dist/`, so the Windows client shares the browser UI and core frontend code.

## Security model

The Electron shell uses context isolation, disables Node integration in the renderer, and enables sandboxing. Native local services such as Ollama remain separate local processes rather than being exposed directly to renderer JavaScript.

## Release status

The `.exe` packaging configuration is now in the repository. A Windows binary is only considered a release artifact after a Windows CI runner successfully builds it and the resulting installer/portable executable is verified.
