export * from './BrainLLM';
export * from './OllamaBrainLLMProvider';
export * from './NeuroEngine';
export * from './NeuroBrainEngineRouter';
export * from './NeuroBrainAgent';

import{brainLLM}from'./BrainLLM';
import{OllamaBrainLLMProvider}from'./OllamaBrainLLMProvider';
export const defaultOllamaProvider=brainLLM.register(new OllamaBrainLLMProvider());
/** Canonical NeuroBrain registry. Ollama is its default local inference provider. */
export const defaultBrainLLM=brainLLM;
