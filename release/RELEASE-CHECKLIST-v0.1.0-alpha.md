# AI Second Brain v0.1.0-alpha Release Checklist

**Product:** AI Second Brain  
**Edition:** Professional  
**Developer:** ArkansasIo  
**Release channel:** Alpha  
**Target tag:** `v0.1.0-alpha`

## Pre-release verification

- [x] GitHub Actions workflow present
- [x] CI dependency installation passes
- [x] Vite production build passes
- [x] Automated tests pass
- [x] GitHub Pages artifact generated
- [x] GitHub Pages deployment job succeeds
- [x] Release manifest committed
- [x] Release notes committed
- [x] Product identity and branding committed
- [x] Bootloader manifest committed
- [x] Ollama/local-first configuration committed
- [x] Workshop/environment architecture committed
- [x] Agent/cluster architecture committed
- [x] Universal Blueprint foundation committed

## Alpha scope

The alpha release contains the browser workspace and foundational local architecture. It is not yet a finished native desktop/mobile distribution.

Included:

- React/Vite browser workspace
- Workshop/environment model
- Agent and cluster UI foundation
- Universal Blueprint foundation
- Local API foundation
- Ollama model discovery/chat proxy
- MySQL schema foundation
- GitHub Pages deployment
- CI build/test pipeline
- Product branding and bootloader metadata

Not yet production-complete:

- Native Windows installer
- macOS package
- Linux package
- Android APK/AAB release package
- iOS/iPadOS signed package
- Full MySQL runtime adapter
- Full streaming chat UI
- Production Blueprint editor
- Sandboxed build/test worker
- Full resource-aware cluster scheduler
- Local STT/TTS runtime integration
- Native updater, rollback, and signed release pipeline

## Release procedure

1. Confirm `main` CI is green.
2. Create Git tag `v0.1.0-alpha` from the verified release commit.
3. Create GitHub Release for `v0.1.0-alpha`.
4. Mark it as a pre-release/alpha release.
5. Use `release/RELEASE-0.1.0-alpha.md` as the release-note source.
6. Attach any verified release artifacts; do not attach unverified or placeholder binaries.
7. Verify the GitHub Pages deployment after publishing.
8. Record the final release URL and Pages URL in the release record.

## Integrity

The verified Pages artifact from CI run #5 is named `github-pages`.

Artifact SHA-256:

`f631267b1c7efe614eab9c987ab6b5be230a103f10bf8d4799e49c2af63832e8`

Verified build commit:

`d3ec7f7699821e5655449c9a564dc70cfe1ae39d`

## Privacy defaults

- Local mode is the default.
- Cloud synchronization is disabled by default.
- Remote models are disabled by default.
- Telemetry is disabled by default.
- Ollama is the default local AI provider.
- Credentials and private project data remain local unless the user explicitly enables an external provider or synchronization path.
