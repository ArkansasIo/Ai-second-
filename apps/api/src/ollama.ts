export type OllamaMessage = { role: 'system' | 'user' | 'assistant'; content: string };
export type OllamaModel = { name: string; modified_at?: string; size?: number; digest?: string; details?: Record<string, unknown> };

export class OllamaClient {
  constructor(private readonly baseUrl = process.env.OLLAMA_BASE_URL ?? 'http://127.0.0.1:11434') {}

  async models(): Promise<OllamaModel[]> {
    const response = await fetch(`${this.baseUrl}/api/tags`);
    if (!response.ok) throw new Error(`Ollama model discovery failed: ${response.status}`);
    const data = await response.json() as { models?: OllamaModel[] };
    return data.models ?? [];
  }

  async chat(model: string, messages: OllamaMessage[]): Promise<string> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ model, messages, stream: false })
    });
    if (!response.ok) throw new Error(`Ollama chat failed: ${response.status}`);
    const data = await response.json() as { message?: { content?: string } };
    return data.message?.content ?? '';
  }
}
