# NeuroBrain Backend Architecture

Version: 0.1.15

NeuroBrain is organized as a software architecture inspired by brain systems. The names are architectural metaphors, not claims of biological equivalence.

## Processing layout

```text
INPUT
  ↓
THALAMUS / BRAINSTEM
  ↓
ATTENTION
  ↓
PERSONALITY MODULE
  ↓
MEMORY + REASONING + PLANNING
  ↓
ACTION / TOOL POLICY
  ↓
SAFETY
  ↓
CORPUS CALLOSUM FUSION
  ↓
FOUR-STAGE VERIFICATION
  ↓
OUTPUT
```

## Personality modules

Personality is a configurable module rather than a hard-coded prompt. Each module contains:

- trait vector
- system directives
- preferred engines
- tone
- response structure
- version and enabled state

Built-in modules: Balanced, Analyst, Teacher, Systems Engineer, Researcher, Creative, Guardian and Executive.

## Neural networks

Each NeuroEngine has its own neural-network profile. Profiles define input width, output width, layers, activation functions, trainability flags and learning rate. The current runtime is a deterministic lightweight forward-pass implementation intended as an architectural/runtime foundation; it is not a trained general-purpose model.

The ten networks correspond to:

1. Cortex — reasoning/synthesis
2. Prefrontal — planning/policy
3. Hippocampus — memory encoding/retrieval
4. Amygdala — risk/safety
5. Thalamus — attention/routing
6. Hypothalamus — regulation/resources
7. Basal Ganglia — action selection
8. Cerebellum — calibration/error correction
9. Brainstem — runtime/watchdog
10. Corpus Callosum — coordination/fusion

## Segments and layers

Segments are higher-level processing regions composed from engine layers. They are independently enableable and priority-ranked. This makes it possible to create fast paths that bypass deep processing and deep paths that activate additional reasoning and verification stages.

## Decision tree

`BrainDecisionTree.ts` is the backend contract for the Brain Layout Decision Tree. It exposes nodes, fields, selectable options and transitions for:

`root -> input -> intent -> personality -> segment -> engine -> model -> tool -> verification -> output`

The fields cover context budget, intent confidence, personality, selected segments, selected engines, provider/model, temperature, token budget, tool permissions, parallel tools, verification strictness, recovery retries, streaming and diagnostics.

## Front-end connection

`NeuroBrainArchitectureControlCenter` consumes the same backend registries and schemas. It displays:

- personality modules
- brain segments
- neural-network counts
- decision-tree nodes
- configurable personality/priority
- segment mappings
- individual network layers and activation functions

The UI is therefore reading the same source-of-truth structures used by the backend rather than maintaining a second architecture definition.

## Security boundary

Neural processing does not grant direct filesystem, shell, network or credential access. Tool execution remains behind the existing agent tool registry, permission policy, audit and provenance boundaries.
