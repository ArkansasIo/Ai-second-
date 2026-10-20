import { brainLLM, type BrainLLMMessage, type BrainLLMResponse } from '../brainllm/BrainLLM';
import type { AgentDefinition } from './agentRegistry';

export interface BrainLLMAgentRequest {
  agent: AgentDefinition;
  providerId?: string;
  model: string;
  messages: BrainLLMMessage[];
  temperature?: number;
  maxTokens?: number;
}

export interface BrainLLMAgentResult {
  agentId: string;
  response: BrainLLMResponse;
}

/**
 * Canonical bridge between the workforce/agent layer and the Brain LLM engine.
 * Agent roles and permissions remain application concerns; model inference is
 * delegated to the registered Brain LLM provider.
 */
export class BrainLLMAgentRuntime {
  async run(request: BrainLLMAgentRequest): Promise<BrainLLMAgentResult> {
    if (!request.agent.enabled) throw new Error(`Agent is disabled: ${request.agent.id}`);

    const systemMessage: BrainLLMMessage = {
      role: 'system',
      content: [
        `You are the ${request.agent.name} agent.`,
        `Role: ${request.agent.role}.`,
        request.agent.systemPrompt,
        `Available application tools: ${request.agent.tools.join(', ') || 'none'}.`,
        'Use tools only through the application tool permission system.'
      ].join('\n')
    };

    const providerId = request.providerId ?? 'ollama';
    const response = await brainLLM.chat(providerId, {
      model: request.model,
      messages: [systemMessage, ...request.messages],
      temperature: request.temperature,
      maxTokens: request.maxTokens,
      stream: false
    });

    return { agentId: request.agent.id, response };
  }
}

export const brainLLMAgentRuntime = new BrainLLMAgentRuntime();
