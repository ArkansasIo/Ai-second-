# Brain LLM Agent Runtime

Version: 0.1.9

## Purpose

`BrainLLMAgentRuntime` is the canonical execution bridge between AI Second Brain agents and the Brain LLM provider registry.

```text
Agent Definition
      |
      v
BrainLLMAgentRuntime
      |
      v
    Brain LLM
      |
      +--> Provider Registry
              +--> Ollama
              +--> Future external providers
```

## Responsibilities

- Validate that an agent is enabled.
- Convert the agent role and system prompt into a Brain LLM system message.
- Preserve the application's declared tool permissions as context.
- Select the requested Brain LLM provider, defaulting to `ollama`.
- Submit inference through `brainLLM.chat()`.
- Return the provider response with the originating agent ID.

## Boundary

The runtime does **not** execute arbitrary tools, shell commands, or network operations. Tool execution remains governed by the application `ToolRegistry` and its permission model.

Ollama is a backend/provider only. New agent integrations should depend on `BrainLLMAgentRuntime` and the Brain LLM contracts instead of importing an Ollama client directly.
