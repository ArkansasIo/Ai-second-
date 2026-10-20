# AI Second Brain Update & Patch System

## Purpose

Define the versioning, patch, release, update, rollback, and release-notes system for AI Second Brain.

## Release channels

- Stable: production-ready releases.
- Beta: feature-complete pre-release builds.
- Development: experimental builds.

## Versioning

Use Semantic Versioning: `MAJOR.MINOR.PATCH`.

- MAJOR: incompatible architecture or API changes.
- MINOR: backward-compatible features.
- PATCH: bug fixes and security fixes.

## Update flow

1. Client launcher requests the release manifest.
2. Compare installed version with the selected channel.
3. Show release notes and compatibility information.
4. Download the platform-specific artifact.
5. Verify checksum and release signature when available.
6. Back up application configuration and database metadata.
7. Run database migrations.
8. Install the update.
9. Run health checks.
10. Restart the application.
11. Record the result locally.
12. Roll back when installation or health checks fail and a rollback package exists.

## Platform artifacts

- Windows installer and portable package.
- macOS application/package.
- Linux AppImage and distribution packages.
- Android APK/AAB.
- iOS/iPadOS distribution builds.
- Raspberry Pi 3/4/5 ARM builds.
- GitHub Pages web build for the trial/demo channel.

## Patch notes

Each release should include:

- version
- release date
- channel
- security fixes
- bug fixes
- features
- breaking changes
- database migrations
- plugin changes
- model/Ollama compatibility
- platform compatibility
- known issues
- rollback notes

## Local update history

The client records installed versions, timestamps, update result, migration result, and rollback result locally. Private user data is not uploaded to GitHub as part of this process.

## Automation

GitHub Actions should build platform artifacts, validate tests, generate release metadata, and publish GitHub Releases. The launcher consumes release metadata; it does not need repository write access.
