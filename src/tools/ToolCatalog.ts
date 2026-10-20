import type { ToolDefinition, ToolPermission, ToolRequest, ToolResult } from './ToolContracts';

export class ToolCatalog {
  private readonly tools = new Map<string, ToolDefinition<any, any>>();
  register<T, R>(tool: ToolDefinition<T, R>) { if (this.tools.has(tool.id)) throw new Error(`Tool already registered: ${tool.id}`); this.tools.set(tool.id, tool as ToolDefinition<any, any>); return tool; }
  get(id: string) { return this.tools.get(id); }
  list() { return [...this.tools.values()]; }
  allowed(id: string, permissions: ToolPermission[]) { const tool = this.get(id); return !!tool && tool.permissions.every((permission) => permissions.includes(permission)); }
  async run<T, R>(request: ToolRequest<T>, permissions: ToolPermission[]): Promise<ToolResult<R>> {
    const tool = this.get(request.toolId);
    if (!tool) return { ok: false, error: `Unknown tool: ${request.toolId}` };
    if (!this.allowed(request.toolId, permissions)) return { ok: false, error: `Tool permission denied: ${request.toolId}` };
    return tool.run(request) as Promise<ToolResult<R>>;
  }
}

export const toolCatalog = new ToolCatalog();
