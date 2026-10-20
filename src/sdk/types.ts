export type SDKRuntime = 'browser' | 'desktop' | 'server' | 'worker';

export type SDKCapability =
  | 'ai.chat'
  | 'ai.stream'
  | 'ai.embeddings'
  | 'agents.spawn'
  | 'agents.execute'
  | 'algorithms.run'
  | 'filesystem.read'
  | 'filesystem.write'
  | 'terminal.execute'
  | 'git.read'
  | 'git.write'
  | 'github.read'
  | 'github.write'
  | 'network.request'
  | 'database.read'
  | 'database.write'
  | 'notifications.send';

export interface SDKContext {
  appVersion: string;
  runtime: SDKRuntime;
  projectId?: string;
  environmentId?: string;
  agentId?: string;
  jobId?: string;
  taskId?: string;
  signal?: AbortSignal;
}

export interface SDKRequest<T = unknown> {
  input: T;
  context: SDKContext;
  metadata?: Record<string, string>;
}

export interface SDKResult<T = unknown> {
  ok: boolean;
  value?: T;
  error?: { code: string; message: string; details?: unknown };
  durationMs: number;
}

export interface SDKPermission {
  capability: SDKCapability;
  reason: string;
  granted: boolean;
}

export interface SDKManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  runtime: SDKRuntime[];
  capabilities: SDKCapability[];
  entry: string;
  apiVersion: string;
}

export interface SDKModule {
  manifest: SDKManifest;
  initialize(context: SDKContext): Promise<void>;
  shutdown(): Promise<void>;
}
