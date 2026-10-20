# Brain LLM

## Canonical AI engine

**Brain LLM** is the primary AI/LLM engine of AI Second Brain.

The name describes the application-level intelligence layer. Model runtimes are implementation backends and are not the product-level AI identity.

### Architecture

```text
AI Second Brain
      |
      v
  Brain LLM
      |
      +--> Provider Registry
      |      +--> Ollama (default local backend)
      |      +--> External API providers
      |      +--> Future local runtimes
      |
      +--> Agent / Workforce Router
      +--> Memory
      +--> Search Tools
      +--> Math Tools
      +--> BrainScript Tools
      +--> Provenance / Audit
```

## Naming rules

- Use **Brain LLM** for the main AI engine.
- Use `brainLLM` for the TypeScript singleton/API object.
- Use `BrainLLM` for the TypeScript class.
- Use **Ollama** only when referring to the runtime/provider/backend.
- Legacy `/api/ollama/*` endpoints remain compatibility routes; new integrations should use `/api/brain-llm/*`.

## Source

- `src/brainllm/BrainLLM.ts` — core engine and provider contract
- `src/brainllm/OllamaBrainLLMProvider.ts` — Ollama backend adapter
- `src/brainllm/index.ts` — canonical exports/default provider
- `config/brain-llm.json` — runtime configuration
- `apps/api/src/server.ts` — Brain LLM API routes
