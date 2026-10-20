export interface OllamaStreamEvent { model?: string; message?: {role?: string; content?: string}; response?: string; done?: boolean; error?: string; }

export interface OllamaStreamOptions { baseUrl?: string; timeoutMs?: number; signal?: AbortSignal; }

export class OllamaStreamClient {
  constructor(private readonly options: OllamaStreamOptions = {}) {}

  async *chat(body: Record<string, unknown>): AsyncGenerator<OllamaStreamEvent> {
    const baseUrl = this.options.baseUrl ?? 'http://127.0.0.1:11434';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.options.timeoutMs ?? 120000);
    const signal = this.options.signal ?? controller.signal;
    try {
      const response = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify({...body, stream: true}), signal,
      });
      if (!response.ok || !response.body) throw new Error(`Ollama streaming request failed: ${response.status} ${response.statusText}`);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      while (true) {
        const {done, value} = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, {stream: true});
        const lines = buffer.split('\n'); buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.trim()) continue;
          yield JSON.parse(line) as OllamaStreamEvent;
        }
      }
      if (buffer.trim()) yield JSON.parse(buffer) as OllamaStreamEvent;
    } finally { clearTimeout(timeout); }
  }
}
