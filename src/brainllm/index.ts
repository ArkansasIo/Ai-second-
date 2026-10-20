export * from './BrainLLM';
export * from './OllamaBrainLLMProvider';

import { brainLLM } from './BrainLLM';
import { OllamaBrainLLMProvider } from './OllamaBrainLLMProvider';

export const defaultBrainLLM = brainLLM.register(new OllamaBrainLLMProvider());
