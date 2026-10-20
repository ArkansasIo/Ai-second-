# Agent Chat Panel

The first working UI target is a three-pane command center:

```text
Projects / Agents     Conversation                 Cluster
─────────────────     ───────────────────────      ─────────────
Projects              C++ Engineer                 Cluster Alpha
Agents                Research Agent               ● C++ Agent
Clusters              QA Agent                     ● Research
Memory                                             ● QA
Models                [ message input ]            3 / 12 active
```

## Features

- agent selector
- cloned-agent profiles
- model selector populated from Ollama discovery
- streaming responses
- cluster task status
- parallel worker count
- queue depth
- CPU/GPU/RAM/VRAM indicators
- approval prompts for privileged tools
- artifact links
- conversation memory
- cancel/retry
- handoff to another agent

## Ollama behavior

The panel displays Ollama as `Local` when the configured endpoint is reachable. It displays discovered installed models rather than assuming a fixed catalog.
