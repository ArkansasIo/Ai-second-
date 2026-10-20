export interface AgentHandoff { id: string; fromAgent: string; toAgent: string; taskId: string; summary: string; artifacts: string[]; createdAt: string; acknowledgedAt?: string; }

export class AgentHandoffStore {
  private handoffs = new Map<string, AgentHandoff>();

  create(input: Omit<AgentHandoff, 'id' | 'createdAt'>): AgentHandoff {
    const handoff = {...input, id: `handoff-${crypto.randomUUID()}`, createdAt: new Date().toISOString()};
    this.handoffs.set(handoff.id, handoff); return handoff;
  }

  acknowledge(id: string): AgentHandoff {
    const handoff = this.handoffs.get(id);
    if (!handoff) throw new Error(`Handoff not found: ${id}`);
    handoff.acknowledgedAt = new Date().toISOString(); return handoff;
  }

  pending(agentId: string): AgentHandoff[] {
    return [...this.handoffs.values()].filter(h => h.toAgent === agentId && !h.acknowledgedAt);
  }

  list(taskId?: string): AgentHandoff[] {
    return [...this.handoffs.values()].filter(h => !taskId || h.taskId === taskId);
  }
}

export const agentHandoffStore = new AgentHandoffStore();
