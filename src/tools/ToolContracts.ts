export type ToolPermission = 'read' | 'write' | 'network' | 'execute' | 'secret';

export interface ToolContext { actorId: string; workspaceId?: string; projectId?: string; signal?: AbortSignal; }
export interface ToolRequest<T = unknown> { toolId: string; input: T; context: ToolContext; }
export interface ToolResult<T = unknown> { ok: boolean; output?: T; error?: string; metadata?: Record<string, unknown>; }
export interface ToolDefinition<T = unknown, R = unknown> { id: string; name: string; description: string; permissions: ToolPermission[]; inputSchema?: unknown; run(request: ToolRequest<T>): Promise<ToolResult<R>>; }
