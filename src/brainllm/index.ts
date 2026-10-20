export * from './BrainLLM';
export * from './OllamaBrainLLMProvider';
export * from './OllamaStreamClient';
export * from './NeuroEngine';
export * from './NeuroBrainEngineRouter';
export * from './NeuroBrainAgent';
export * from './NeuroBrainBackend';
export * from './NeuroBrainOrchestrator';
export * from './NeuroBrainSettingsStore';
export * from './BrainDecisionTree';
export * from './neural/NeuralNetwork';
export * from './neural/defaultBrainNetworks';
export * from './neural/BrainSegments';
export * from './personality/PersonalityContracts';
export * from './personality/PersonalityRegistry';
export * from './personality/defaultPersonalities';
export * from './NeuroBrainArchitectureControlCenter';

import{brainLLM}from'./BrainLLM';
import{OllamaBrainLLMProvider}from'./OllamaBrainLLMProvider';
export const defaultOllamaProvider=brainLLM.register(new OllamaBrainLLMProvider());
/** Canonical NeuroBrain registry. Ollama is its default local inference provider. */
export const defaultBrainLLM=brainLLM;
