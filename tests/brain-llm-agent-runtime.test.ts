import { describe, expect, it } from 'vitest';
import { BrainLLMAgentRuntime } from '../src/agents/BrainLLMAgentRuntime';
import { brainLLM } from '../src/brainllm/BrainLLM';
import type { BrainLLMProvider } from '../src/brainllm/BrainLLM';
import type { AgentDefinition } from '../src/agents/agentRegistry';

const agent: AgentDefinition = {
  id: 'test-agent',
  name: 'Test Agent',
  role: 'tester',
  systemPrompt: 'Validate runtime behavior.',
  tools: ['test'],
  enabled: true
};

describe('BrainLLMAgentRuntime', () => {
  it('injects agent identity into the Brain LLM request', async () => {
    const provider: BrainLLMProvider = {
      id: 'test-provider',
      name: 'Test Provider',
      async listModels() { return [{ id: 'test-model', provider: 'test-provider' }]; },
      async chat(request) {
        expect(request.messages[0].role).toBe('system');
        expect(request.messages[0].content).toContain('Test Agent');
        expect(request.messages[0].content).toContain('tester');
        return { model: request.model, provider: 'test-provider', content: 'ok', createdAt: new Date().toISOString() };
      }
    };

    brainLLM.register(provider);
    const result = await new BrainLLMAgentRuntime().run({
      agent,
      providerId: 'test-provider',
      model: 'test-model',
      messages: [{ role: 'user', content: 'Run the test.' }]
    });

    expect(result.agentId).toBe('test-agent');
    expect(result.response.content).toBe('ok');
  });
});
