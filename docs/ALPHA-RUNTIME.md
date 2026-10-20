# AI Second Brain 0.1.0 Alpha Runtime

The alpha runtime is split into a browser frontend and a local API process.

```text
Browser / GitHub Pages
        |
        | HTTP fetch
        v
Local API :8787
   |       |       |
   |       |       +-- Blueprint sample/generator
   |       +---------- Ollama :11434
   +------------------ Future MySQL persistence
```

## Current implementation

- React/Vite Professional Edition shell
- Workshop tabs and cluster view
- Local API health endpoint
- Ollama model discovery
- Ollama non-streaming chat proxy
- Blueprint sample endpoint
- Blueprint source generation for C++, Python, and TypeScript
- MySQL-compatible initial persistence schema

## Next runtime layer

1. Connect the browser chat to `/api/ollama/chat`.
2. Load live models from `/api/ollama/models`.
3. Persist projects, workshops, agents, tasks, memories, and blueprints in MySQL.
4. Add command/build/test workers with explicit approval gates.
5. Add streaming Ollama responses.
6. Add agent-cluster scheduling and resource-aware concurrency.
7. Add local STT/TTS adapters for voice chat.
