# Ollama Resource Scheduler

## Goal

Allow many configured AI agents to coexist while limiting simultaneous generation to what the host can safely support.

## Default

The initial policy is 12 concurrent generation workers. This is a safe starting value, not a hardware maximum.

## Dynamic controls

The scheduler monitors:

- CPU utilization
- system RAM
- GPU utilization
- GPU VRAM utilization
- swap pressure
- active model loads
- request latency
- queue depth

When resource pressure rises, new tasks remain queued and existing work is allowed to finish. When capacity returns, queued tasks are dispatched.

## Agent versus model

An agent is a configuration/profile. Multiple agents can share one loaded Ollama model. This means a large number of agent definitions does not imply an equivalent number of model instances.

## Policy

`configured agents -> queued tasks -> resource admission -> Ollama worker -> result -> shared memory/artifact`

Users can change maximum parallelism. The scheduler should refuse unsafe settings when the host reports insufficient resources, unless the user explicitly overrides the warning.

## Shadow PC

Shadow PC hardware varies by plan and generation, so the application should detect actual resources at runtime rather than assume a particular Shadow configuration. The launcher uses the detected CPU/RAM/GPU/VRAM values to recommend a concurrency limit.
