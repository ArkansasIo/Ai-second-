export interface EnvironmentFeature {
  id: string;
  category: 'isolation' | 'agents' | 'jobs' | 'development' | 'knowledge' | 'integration' | 'operations' | 'security';
  name: string;
  description: string;
  enabledByDefault: boolean;
}

/**
 * Feature baseline derived from current capabilities in Open WebUI, AnythingLLM,
 * and OpenHands, then adapted to the Second Brain's local-first architecture.
 */
export const ENVIRONMENT_FEATURES: EnvironmentFeature[] = [
  { id: 'ENV-F001', category: 'isolation', name: 'Per-environment sandbox', description: 'Separate filesystem, processes, credentials, ports and network policy for every environment.', enabledByDefault: true },
  { id: 'ENV-F002', category: 'isolation', name: 'Snapshots and reset', description: 'Capture a known-good environment state and restore it without destroying the parent project.', enabledByDefault: true },
  { id: 'ENV-F003', category: 'agents', name: 'Parallel agent cluster', description: 'Run multiple agents concurrently with explicit roles, quotas and workspace boundaries.', enabledByDefault: true },
  { id: 'ENV-F004', category: 'agents', name: 'Per-agent worktree', description: 'Give coding agents isolated Git worktrees so parallel changes do not collide.', enabledByDefault: true },
  { id: 'ENV-F005', category: 'agents', name: 'Agent skills and tools', description: 'Bind reusable skills, tools, MCP connections and knowledge to individual agents.', enabledByDefault: true },
  { id: 'ENV-F006', category: 'jobs', name: 'Job queue', description: 'Queue builds, tests, indexing, model calls and maintenance jobs with priority and cancellation.', enabledByDefault: true },
  { id: 'ENV-F007', category: 'jobs', name: 'Scheduled automation', description: 'Run recurring or event-driven jobs with logs and failure reporting.', enabledByDefault: true },
  { id: 'ENV-F008', category: 'development', name: 'Integrated terminal', description: 'Provide a terminal tied to the environment sandbox rather than the host by default.', enabledByDefault: true },
  { id: 'ENV-F009', category: 'development', name: 'Full IDE workspace', description: 'Editor, file tree, search, Git, problems, output, debugger and AI coding assistant.', enabledByDefault: true },
  { id: 'ENV-F010', category: 'development', name: 'Build/test/debug pipeline', description: 'Keep build, test, debug and artifact lifecycle inside the environment.', enabledByDefault: true },
  { id: 'ENV-F011', category: 'knowledge', name: 'Knowledge collections', description: 'Attach documents, notes, indexed files and project memory to an environment.', enabledByDefault: true },
  { id: 'ENV-F012', category: 'knowledge', name: 'Hybrid retrieval', description: 'Support keyword and vector retrieval with optional reranking when a backend is configured.', enabledByDefault: false },
  { id: 'ENV-F013', category: 'integration', name: 'Multi-model providers', description: 'Switch between Ollama and approved cloud/OpenAI-compatible providers without moving project context.', enabledByDefault: true },
  { id: 'ENV-F014', category: 'integration', name: 'MCP/tool gateway', description: 'Connect tools through an explicit permissioned gateway instead of granting unrestricted model access.', enabledByDefault: true },
  { id: 'ENV-F015', category: 'integration', name: 'GitHub integration', description: 'Connect repositories, issues, pull requests, Actions and releases to environment work.', enabledByDefault: true },
  { id: 'ENV-F016', category: 'operations', name: 'Observability', description: 'Expose task logs, agent events, build output, resource metrics and audit trails.', enabledByDefault: true },
  { id: 'ENV-F017', category: 'operations', name: 'Resource quotas', description: 'Limit CPU, memory, storage, agent count, parallel jobs and execution duration.', enabledByDefault: true },
  { id: 'ENV-F018', category: 'security', name: 'Permission approval gates', description: 'Require explicit approval before sensitive filesystem, shell, network, credential or deployment operations.', enabledByDefault: true },
  { id: 'ENV-F019', category: 'security', name: 'Role-based access', description: 'Apply owner, admin, developer and viewer permissions to environments and tools.', enabledByDefault: true },
  { id: 'ENV-F020', category: 'security', name: 'Secrets isolation', description: 'Keep credentials in an encrypted local/desktop store and inject them only into approved processes.', enabledByDefault: true },
  { id: 'ENV-F021', category: 'operations', name: 'Environment templates', description: 'Create repeatable TypeScript, C++, Android, AI/Ollama, game and custom environments.', enabledByDefault: true },
  { id: 'ENV-F022', category: 'operations', name: 'Mobile remote control', description: 'Allow authorized phones/tablets to inspect and control a desktop environment without exposing host credentials.', enabledByDefault: true },
  { id: 'ENV-F023', category: 'operations', name: 'Offline-first operation', description: 'Keep environment metadata, tasks, notes and cached project state usable without the network.', enabledByDefault: true },
  { id: 'ENV-F024', category: 'agents', name: 'Human-in-the-loop approvals', description: 'Pause autonomous work at configurable checkpoints for review and approval.', enabledByDefault: true },
];
