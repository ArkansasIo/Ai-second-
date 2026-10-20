export type BrainLLMRole = 'system' | 'user' | 'assistant' | 'tool';
export interface BrainLLMMessage { role: BrainLLMRole; content: string; name?: string; }
export interface BrainLLMModel { id: string; provider: string; displayName?: string; contextWindow?: number; capabilities?: string[]; }
export interface BrainLLMRequest { model: string; messages: BrainLLMMessage[]; temperature?: number; maxTokens?: number; stream?: boolean; }
export interface BrainLLMResponse { model: string; content: string; provider: string; createdAt: string; usage?: { promptTokens?: number; completionTokens?: number; totalTokens?: number }; }
export interface BrainLLMProvider { id: string; name: string; listModels(): Promise<BrainLLMModel[]>; chat(request: BrainLLMRequest): Promise<BrainLLMResponse>; }

export class BrainLLM {
  private providers = new Map<string, BrainLLMProvider>();
  register(provider: BrainLLMProvider) { this.providers.set(provider.id, provider); return provider; }
  provider(id: string) { return this.providers.get(id); }
  providersList() { return [...this.providers.values()]; }
  async chat(providerId: string, request: BrainLLMRequest) {
    const provider = this.providers.get(providerId);
    if (!provider) throw new Error(`Brain LLM provider not registered: ${providerId}`);
    return provider.chat(request);
  }
  async models(providerId?: string) {
    if (providerId) {
      const provider = this.providers.get(providerId);
      if (!provider) throw new Error(`Brain LLM provider not registered: ${providerId}`);
      return provider.listModels();
    }
    const groups = await Promise.all([...this.providers.values()].map(async p => p.listModels()));
    return groups.flat();
  }
}

export const brainLLM = new BrainLLM();
