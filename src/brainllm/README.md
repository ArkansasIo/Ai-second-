# Brain LLM source package

This directory is the canonical application-level AI engine.

- `BrainLLM.ts` — provider-neutral engine and contracts
- `OllamaBrainLLMProvider.ts` — default local provider adapter
- `index.ts` — public entry point

Do not make Ollama the application-level abstraction. New AI features should depend on `BrainLLM` and provider interfaces.
