import {brainLLM, type BrainLLMMessage, type BrainLLMRequest, type BrainLLMResponse} from './BrainLLM';
import {neuroBrainBackend} from './NeuroBrainBackend';
import {neuroBrainEngineRouter, type NeuroRoute} from './NeuroBrainEngineRouter';
import {memoryIndex} from '../memory/MemoryIndex';

export interface NeuroBrainExecutionRequest extends BrainLLMRequest {
  provider?: string;
  verify?: boolean;
  maxRetries?: number;
  includeMemory?: boolean;
}

export interface NeuroBrainVerification {
  passed: boolean;
  checks: string[];
  errors: string[];
  attempts: number;
}

export interface NeuroBrainExecutionResult {
  response: BrainLLMResponse;
  route: NeuroRoute;
  verification: NeuroBrainVerification;
}

export class NeuroBrainOrchestrator {
  async execute(request: NeuroBrainExecutionRequest): Promise<NeuroBrainExecutionResult> {
    const taskText = request.messages.map(message => message.content).join('\n');
    const route = neuroBrainEngineRouter.route(taskText);
    const state = neuroBrainBackend.getDecisionState();
    if (!state.settings.engines.length) neuroBrainBackend.updateDecision({engines: route.engines});

    const provider = request.provider ?? state.settings.provider;
    const messages: BrainLLMMessage[] = [...request.messages];
    const personality = neuroBrainBackend.personalityPrompt(taskText);
    const memory = request.includeMemory === false ? '' : memoryIndex.context(taskText, 6);
    const systemParts = [personality, `NeuroBrain route: ${route.engines.join(', ')} (${route.priority}).`];
    if (memory) systemParts.push(`Relevant memory:\n${memory}`);
    messages.unshift({role: 'system', content: systemParts.join('\n\n')});

    const attempts = Math.max(1, Math.min(request.maxRetries ?? state.settings.retries, 5) + 1);
    const errors: string[] = [];
    let response: BrainLLMResponse | undefined;
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        response = await brainLLM.chat(provider, {...request, messages});
        const verification = request.verify === false
          ? {passed: true, checks: ['verification-disabled'], errors: [], attempts: attempt}
          : this.verify(response, route, attempt);
        if (verification.passed || attempt === attempts) return {response, route, verification};
        errors.push(...verification.errors);
      } catch (error) {
        errors.push(error instanceof Error ? error.message : String(error));
        if (attempt === attempts) throw error;
      }
    }
    throw new Error(errors.join('; ') || 'NeuroBrain execution failed');
  }

  private verify(response: BrainLLMResponse, route: NeuroRoute, attempts: number): NeuroBrainVerification {
    const checks = ['response-present', 'provider-present', 'route-selected', 'content-nonempty'];
    const errors: string[] = [];
    if (!response.content.trim()) errors.push('Response content is empty');
    if (!response.provider) errors.push('Response provider is missing');
    if (!route.engines.length) errors.push('No NeuroBrain engines were selected');
    return {passed: errors.length === 0, checks, errors, attempts};
  }
}

export const neuroBrainOrchestrator = new NeuroBrainOrchestrator();
