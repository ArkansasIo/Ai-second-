# Full Ollama Integration

AI Second Brain treats Ollama as a first-class local AI runtime, not as a single hard-coded model.

## Runtime

Default endpoint: `http://127.0.0.1:11434`

The application dynamically discovers installed models and exposes model selection through the Models screen. No fixed model count is assumed.

## Supported operations

- health/status check
- model discovery
- model metadata inspection
- model pull/download
- model removal through an explicit user action
- chat completion
- streaming chat completion
- embeddings
- model capability metadata
- context-size configuration
- temperature/top-p configuration
- agent-specific system prompts
- cancellation
- timeout handling
- retry handling
- local-only operation

## Agent architecture

One Ollama model can power many independent agent configurations. Cloning an agent creates a new profile containing role, system prompt, tools, permissions, memory scope, language specialization, and model assignment; it does not duplicate model weights.

## Model routing

The cluster scheduler may assign different installed Ollama models to different agents according to task requirements, resource availability, and user policy.

Example roles:

- C++ Engineer
- C# Engineer
- Python Engineer
- Rust Engineer
- Web Engineer
- Systems Engineer
- Researcher
- Technical Writer
- QA Engineer
- DevOps Engineer
- Project Manager
- Accountant
- CAD Engineer
- Robotics Engineer
- Game Designer

## Privacy

Ollama requests remain on the local machine unless the user explicitly configures another AI provider or remote endpoint. API credentials and provider settings are stored locally and are never embedded in the GitHub Pages frontend.

## Configuration

```text
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_TIMEOUT_MS=120000
OLLAMA_STREAM=true
OLLAMA_EMBEDDING_MODEL=nomic-embed-text
```

## Failure handling

If Ollama is unavailable, the UI reports the local runtime as offline. The application does not silently send the prompt to a cloud provider. A fallback provider requires explicit user configuration.
