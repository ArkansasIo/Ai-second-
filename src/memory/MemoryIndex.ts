import {conversationMemory, type MemoryMessage} from './ConversationMemoryStore';

export interface MemoryHit { message: MemoryMessage; score: number; }

export class MemoryIndex {
  search(query: string, limit = 20): MemoryHit[] {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return conversationMemory.list(1000).map(message => {
      const text = message.content.toLowerCase();
      const matched = terms.filter(term => text.includes(term)).length;
      return {message, score: matched / terms.length};
    }).filter(hit => hit.score > 0).sort((a, b) => b.score - a.score).slice(0, limit);
  }

  context(query: string, limit = 8): string {
    return this.search(query, limit).map(hit => `[${hit.message.role}] ${hit.message.content}`).join('\n');
  }
}

export const memoryIndex = new MemoryIndex();
