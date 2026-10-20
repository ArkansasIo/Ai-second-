import {brainLLM, type BrainLLMRequest, type BrainLLMResponse} from './BrainLLM';
import {neuroBrainBackend} from './NeuroBrainBackend';
import {neuroBrainEngineRouter, type NeuroRoute} from './NeuroBrainEngineRouter';

export interface NeuroBrainExecutionRequest extends BrainLLMRequest {
  provider?: string;
  verify?: boolean;
}

export interface NeuroBrainExecutionResult {
  response: BrainLLMResponse;
  route: NeuroRoute;
  verification: {passed: boolean; checks: string[]};
}

export class NeuroBrainOrchestrator {
  async execute(request: NeuroBrainExecutionRequest): Promise<NeuroBrainExecutionResult> {
    const route = neuroBrainEngineRouter.route(request.messages.map(message => message.content).join('\n'));
    const state = neuroBrainBackend.getDecisionState();
    if (!state.settings.engines.length) neuroBrainBackend.updateDecision({engines: route.engines});

    const provider = request.provider ?? state.settings.provider;
    const response = await brainLLM.chat(provider, request);
    const verification = request.verify === false ? {passed: true, checks: ['verification-disabled']} : this.verify(response, route);
    return {response, route, verification};
  }

  private verify(response: BrainLLMResponse, route: NeuroRoute) {
    const checks = ['response-present', 'provider-present', 'route-selected'];
    const passed = Boolean(response.content.trim()) && Boolean(response.provider) && route.engines.length > 0;
    return {passed, checks};
  }
}

export const neuroBrainOrchestrator = new NeuroBrainOrchestrator();
