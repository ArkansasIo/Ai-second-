# AI Second Brain 0.1.9

## Release state

- Prototype release channel: Gold metadata remains configurable.
- Version metadata is synchronized to `0.1.9`.
- **Brain LLM** remains the canonical main AI/LLM engine.
- Ollama remains the default local inference backend for Brain LLM.
- Agent execution now has a canonical `BrainLLMAgentRuntime` bridge.
- Agent system prompts, roles, and tool declarations are injected into Brain LLM requests.
- Provider selection remains configurable through the Brain LLM provider registry.
- License remains pending final open-source/source-available selection.

## Development scope

This release extends the Brain LLM foundation into the agent/workforce layer. Agents no longer need to couple their execution logic directly to a backend; the runtime delegates inference through the Brain LLM provider contract.
