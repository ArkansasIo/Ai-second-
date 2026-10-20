# NeuroBrain Architecture

Version: 0.1.14

NeuroBrain is the application-level intelligence and agent orchestration layer for AI Binder. Ollama is a local inference provider, not the identity of the application AI.

## Runtime pipeline

```text
Input
  -> Thalamus Routing
  -> Prefrontal Planning
  -> Cortex Reasoning
  -> Basal Ganglia Action Selection
  -> Tools / Workforce
  -> Hippocampus Memory
  -> Cerebellum Verification
  -> Amygdala Risk Check
  -> Corpus Callosum Coordination
  -> Brainstem Runtime / Recovery
  -> Output
```

## Engines

| Engine | Software responsibility |
|---|---|
| Cortex | language, abstraction, reasoning, synthesis |
| Prefrontal | goals, planning, decomposition, policy |
| Hippocampus | episodic memory, retrieval, consolidation |
| Amygdala | risk, urgency, anomaly and safety scoring |
| Thalamus | routing, attention and context selection |
| Hypothalamus | resource budgets, health and scheduling |
| Basal Ganglia | action and tool selection |
| Cerebellum | feedback, calibration and verification |
| Brainstem | low-latency runtime and watchdog behavior |
| Corpus Callosum | parallel-engine synchronization and result fusion |

These names are architectural metaphors inspired by brain systems; NeuroBrain is not a biological brain simulation.

## Tool loop

1. Route the task.
2. Generate a plan using the selected engine profile.
3. Request model output with tool definitions.
4. Execute independent tool calls in parallel.
5. Return tool results to the model as `tool` messages.
6. Repeat until the model completes or the configured round limit is reached.
7. Preserve tool errors instead of hiding them.
8. Verify important outputs before reporting completion.

## Ollama optimization

The provider supports configurable context size, batching, temperature, top-k/top-p/min-p sampling, repetition penalty, seed, CPU threads, GPU layers, prediction length, stop sequences, and keep-alive behavior. Provider options are normalized to Ollama's snake_case API fields.

## Safety boundary

Tool execution remains outside the model. A model can request a tool, but application policy must decide whether the tool is allowed and execute it through the existing audited tool layer.

## Future engines

The architecture leaves room for dedicated vision, embeddings, retrieval, long-context, code-specialist, and multimodal providers without changing the NeuroBrain public agent contract.
