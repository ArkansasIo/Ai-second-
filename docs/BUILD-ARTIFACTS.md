# AI Second Brain Build Artifacts

## Version

`0.1.10`

## Windows

The Windows workflow builds the complete repository with:

- Electron production web bundle.
- Windows NSIS installer.
- Windows portable executable.
- TypeScript typecheck.
- Automated test suite.
- Version consistency validation.

Workflow: `.github/workflows/windows-exe.yml`

## Android

The Android workflow builds the complete repository with:

1. Full repository checkout.
2. Node.js dependency installation.
3. Web production build.
4. Capacitor Android project generation.
5. Capacitor synchronization.
6. Gradle debug APK.
7. Gradle unsigned release APK.

Workflow: `.github/workflows/android-apk.yml`

The generated Android project is intentionally created during CI so the native build always reflects the current repository source and dependency versions.

## Artifacts

Expected Android outputs:

- `AI-Second-Brain-v0.1.10-debug.apk`
- `AI-Second-Brain-v0.1.10-release-unsigned.apk`

Expected Windows outputs include the Electron Builder NSIS installer and portable `.exe`.

## Release signing

The repository does not contain a private Android signing key or Windows code-signing certificate. Production signing must be supplied through protected CI secrets or a local release environment.
