# Browser Voice System

AI Second Brain supports voice interaction in the browser as a first-class interface alongside typed chat.

## Supported browser targets

The browser voice layer is designed for:

- Desktop browsers on Windows, macOS and Linux
- iPhone browser
- iPad browser
- Android browser
- Responsive browser/PWA shells

The interface must gracefully fall back to typed chat when microphone, speech recognition, or speech synthesis is unavailable or permission is denied.

## Voice pipeline

```text
Microphone
   |
   v
Browser Speech / Local STT Adapter
   |
   v
AI Second Brain Chat Router
   |
   +--> Workshop
   +--> Agent
   +--> Cluster
   +--> Ollama model
   |
   v
Text response
   |
   v
TTS / Browser Speech Adapter
   |
   v
Speaker
```

## Voice and Ollama are separate

Ollama remains the reasoning/chat model provider. A voice profile is attached to the selected agent or workshop, but the voice engine is independent of the Ollama model.

For example:

```text
AGENT-00003
  Model: qwen3-coder
  Voice: VOICE-00003
  Voice Name: Emma
  Speaking Style: Professional
```

Changing the Ollama model does not require changing the voice.

## Browser requirements

The UI should:

- request microphone permission only after the user activates voice
- provide visible recording/listening state
- support push-to-talk
- support optional hands-free mode
- support stop/cancel during recognition and speech
- provide text transcript before executing a command
- allow the user to choose an input/output audio device where the browser exposes it
- provide volume/activity indicators
- remain usable without voice
- avoid storing microphone recordings unless explicitly enabled
- keep voice preferences in local browser storage by default

## Mobile behavior

### iPhone and iPad

- responsive voice button remains accessible in the chat composer
- controls avoid unsafe bottom-edge and browser-toolbar areas
- large touch targets are used for microphone, stop and send
- portrait and landscape layouts are supported
- speech features are capability-detected rather than assumed
- the page remains functional when the browser does not expose a requested speech API

### Android

- same responsive voice controls
- capability detection for speech recognition and synthesis
- microphone permission is user initiated
- typed chat remains the fallback

### Desktop

- keyboard shortcut/push-to-talk can be supported
- hands-free mode can remain active while the workshop is open
- audio activity and listening state are visible in the workspace header

## Voice presets

The existing catalog supports stable five-digit IDs. Built-in female presets include:

```text
VOICE-00001 = Ava
VOICE-00002 = Sofia
VOICE-00003 = Emma
VOICE-00004 = Mia
VOICE-00005 = Olivia
```

Saved configurations can scale to:

```text
PRESET-00001 ... PRESET-05000
```

A preset can bind an Ollama model, voice, personality, speaking style and temperature without duplicating model weights.

## Privacy

Default behavior is local-first:

- microphone audio is not persisted by the application unless explicitly enabled
- conversations remain local by default
- local STT/TTS providers are preferred when available
- external speech providers require explicit configuration
- external AI providers remain opt-in
- API credentials stay on the user's device

## Command safety

Voice commands are treated like typed commands. Destructive operations still require the configured approval policy.

Examples:

- "Create an Android workshop."
- "Run the Unreal build."
- "Pause the rendering agent."
- "Commit these changes."
- "Push the current branch."

The voice interface does not bypass filesystem, terminal, Git, plugin, deployment, or security permissions.

## Implementation layers

1. `VoiceInputAdapter` — microphone and speech-to-text abstraction.
2. `VoiceOutputAdapter` — text-to-speech abstraction.
3. `VoiceProfile` — stable voice identity and speaking settings.
4. `VoicePreset` — model + voice + personality configuration.
5. `VoiceCommandRouter` — converts recognized speech into normal application commands.
6. `VoicePermissionPolicy` — handles microphone and external-provider permissions.
7. `VoiceSession` — tracks active listening, transcript, response and playback state.

The same voice system is available to desktop, mobile and browser frontends through the shared application contracts.