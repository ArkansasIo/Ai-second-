# AI Second Brain Bootloader

The bootloader is the first-stage installer/launcher experience for AI Second Brain.

It is intentionally platform-neutral at the design level. Native launchers can use the same manifest and state model on Windows, macOS, Linux, Android, iOS/iPadOS, and Raspberry Pi.

## Boot sequence

```text
Power / Installer
      |
      v
AI SECOND BRAIN
Bootloader v0.1.0
      |
      +--> Detect platform
      +--> Verify installation
      +--> Check update channel
      +--> Check required runtime
      +--> Check Ollama availability
      +--> Load local configuration
      +--> Start local services
      +--> Start application
      |
      v
Professional Edition
```

## Safety

The bootloader must never silently install cloud credentials, enable remote synchronization, delete user data, or download AI models. These actions require explicit configuration or approval.

## Recovery

If startup validation fails, the loader should present a recovery menu:

1. Start normally
2. Repair installation
3. Check for updates
4. Rebuild local runtime
5. Open diagnostics
6. Start offline/local-only mode
7. Roll back the last update
8. Exit
