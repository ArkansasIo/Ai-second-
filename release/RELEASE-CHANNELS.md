# AI Second Brain Release Channels

AI Second Brain uses a staged release lifecycle so builds can move from experimental development to stable production without confusing test artifacts with finished releases.

## Channel order

`pre-alpha` → `alpha` → `pre-beta` → `beta` → `gold`

| Channel | Purpose | Stability | Typical audience | Distribution |
|---|---|---|---|---|
| Pre-alpha | Early internal engineering builds | Very low | Developers/testers | Development releases |
| Alpha | First integrated feature builds | Low | Early testers | Alpha/pre-release |
| Pre-beta | Feature-complete candidate preparation | Low–medium | Extended testers | Pre-release |
| Beta | Release candidate stabilization | Medium–high | Public/selected testers | Beta/pre-release |
| Gold | Production release | High | General users | Stable release |

## Version naming

Examples:

- `v0.1.0-pre-alpha.1`
- `v0.1.0-alpha.1`
- `v0.1.0-pre-beta.1`
- `v0.1.0-beta.1`
- `v1.0.0`

Patch releases use the normal semantic-version pattern after Gold, for example `v1.0.1`.

## Promotion gates

### Pre-alpha → Alpha

Required:

- Core architecture builds
- Basic automated tests pass
- Major crashes/blockers documented
- Release manifest exists
- No claim of production readiness

### Alpha → Pre-beta

Required:

- Major planned alpha features integrated
- CI green
- Regression tests passing
- Upgrade path tested
- Data migration path documented
- Known issues tracked

### Pre-beta → Beta

Required:

- Feature freeze for the target release
- Platform builds validated for supported targets
- Installer/update flow tested
- Security and permission review completed
- Performance/resource testing completed
- Critical and high-severity release blockers resolved or explicitly accepted

### Beta → Gold

Required:

- Release candidate passes CI and platform validation
- Supported platform packages are verified
- Upgrade and rollback paths tested
- Release notes finalized
- Checksums/signatures generated where applicable
- No unresolved release-blocking defects
- Documentation and recovery procedures published

## Platform package rule

Each release version can contain platform-specific artifacts:

- Windows EXE/installer
- macOS APP/DMG
- Linux AppImage/package
- Android APK/AAB
- iOS/iPadOS package through Apple's distribution pipeline
- Raspberry Pi ARM packages
- Browser/GitHub Pages build
- Source archive

A platform is marked **verified** only after its own build and validation succeeds. A missing platform artifact must never be represented as an existing binary.

## Update compatibility

The updater compares the installed version, platform, architecture, release channel, and package compatibility before offering an update. Users can select a channel independently, subject to the product's update policy.

The default channel for a production installation is **Gold/Stable**. Development installations may opt into Pre-alpha, Alpha, Pre-beta, or Beta.

## Rollback

Every installed release records its version and update metadata. Where the platform permits it, the updater retains a rollback-capable previous package or supports reinstalling the previous verified release.
