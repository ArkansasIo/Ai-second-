export type ApiPermission = 'read' | 'write' | 'network' | 'execute' | 'admin';
export type ApiStatus = 'ok' | 'accepted' | 'error';

export interface ApiError { code: string; message: string; details?: unknown; }
export interface ApiResponse<T> { status: ApiStatus; requestId: string; data?: T; error?: ApiError; }

export interface ProjectSummary { id: string; name: string; path?: string; status: 'active' | 'paused' | 'archived'; updatedAt: string; }
export interface WorkspaceSummary { id: string; name: string; projectId?: string; root?: string; dirty: boolean; }
export interface AgentSummary { id: string; name: string; role: string; status: 'idle' | 'running' | 'blocked' | 'error'; model?: string; }
export interface MemoryRecord { id: string; title: string; content: string; tags: string[]; source?: string; createdAt: string; updatedAt: string; }
export interface ToolSummary { id: string; name: string; category: string; description: string; permission: ApiPermission; enabled: boolean; }
export interface JobSummary { id: string; type: string; status: 'queued' | 'running' | 'success' | 'failed' | 'cancelled'; progress: number; message?: string; createdAt: string; }
export interface HealthSummary { appVersion: string; api: 'online' | 'offline'; ollama: 'online' | 'offline'; database: 'online' | 'offline' | 'not-configured'; nativeRuntime: 'online' | 'offline'; }

export interface ChatRequest { conversationId?: string; model: string; message: string; stream?: boolean; }
export interface ToolCallRequest { toolId: string; input: unknown; confirmationToken?: string; }
export interface SearchRequest { query: string; scope?: 'workspace' | 'project' | 'memory' | 'code' | 'docs' | 'all'; limit?: number; }
export interface FileOperationRequest { operation: 'read' | 'write' | 'move' | 'delete'; path: string; content?: string; destination?: string; }
export interface AgentRunRequest { agentId: string; prompt: string; workspaceId?: string; model?: string; }
export interface GitRequest { operation: 'status' | 'diff' | 'log' | 'branch' | 'commit' | 'pull' | 'push'; args?: string[]; }

export const API_ROUTES = {
  health: '/api/v1/health',
  projects: '/api/v1/projects',
  workspaces: '/api/v1/workspaces',
  agents: '/api/v1/agents',
  tools: '/api/v1/tools',
  memory: '/api/v1/memory',
  search: '/api/v1/search',
  files: '/api/v1/files',
  jobs: '/api/v1/jobs',
  chat: '/api/v1/chat',
  toolCall: '/api/v1/tools/call',
  agentRun: '/api/v1/agents/run',
  git: '/api/v1/git',
} as const;
