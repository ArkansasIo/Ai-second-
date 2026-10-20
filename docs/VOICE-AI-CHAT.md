# Voice AI Chat

AI Second Brain includes a voice-chat layer so the user can speak naturally to the system instead of relying only on keyboard input.

## Architecture

```text
Microphone
   |
   v
Speech-to-Text
   |
   v
AI Second Brain Chat
   |
   +--> Agent / Cluster Router
   +--> Ollama (local)
   +--> Optional external AI API
   |
   v
Text Response
   |
   v
Text-to-Speech
   |
   v
Speaker
```

## Requirements

- Push-to-talk and optional hands-free mode
- Speech-to-text provider abstraction
- Text-to-speech provider abstraction
- Local-first operation where supported
- Conversation history stored locally by default
- Agent/cluster selection by voice
- Voice interruption/cancellation
- Streaming responses
- Microphone permission controls
- Audio-device selection
- Input/output level indicators
- Accessibility controls
- Explicit remote-provider permission

## Voice commands

Examples:

- "Create a new Unreal environment."
- "Ask the C++ agent to inspect this build error."
- "Start the Blender cluster."
- "Run the Android build."
- "Show me the current agents."
- "Pause the rendering agent."
- "Commit these changes." 

Destructive actions such as commits, pushes, deleting files, publishing builds, or changing credentials should use the configured approval policy even when requested by voice.

## Provider model

Speech recognition and speech synthesis are provider plugins. The application does not require one commercial provider. A local provider can be selected when installed; remote providers can be enabled explicitly.

The chat model remains independent from speech. Ollama can provide the local AI response while separate local or remote speech adapters handle transcription and playback.

## Privacy

Default policy:

- microphone data is processed locally when a local speech provider is configured
- conversations remain on the user's device unless synchronization is explicitly enabled
- external AI APIs are opt-in
- API credentials remain local
- audio recordings are not persisted unless the user explicitly enables recording
