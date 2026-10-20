import type { ToolDefinition } from './toolRegistry';

export type ToolCategory = 'workspace' | 'ai' | 'code' | 'git' | 'design' | 'system' | 'data';

export interface CatalogTool extends ToolDefinition {
  category: ToolCategory;
  icon: string;
  confirmationRequired?: boolean;
  endpoint?: string;
}

const stub = (id: string) => async (input: unknown) => ({ tool: id, status: 'not-connected', input });

export const defaultTools: CatalogTool[] = [
  { id: 'workspace.open', name: 'Open Workspace', description: 'Open or switch the active project workspace.', permission: 'read', category: 'workspace', icon: 'folder', endpoint: '/api/v1/workspaces' , execute: stub('workspace.open') },
  { id: 'workspace.create', name: 'Create Project', description: 'Create a project, workspace metadata, and starter folders.', permission: 'write', category: 'workspace', icon: 'plus', endpoint: '/api/v1/projects', confirmationRequired: true, execute: stub('workspace.create') },
  { id: 'workspace.search', name: 'Workspace Search', description: 'Search files, symbols, documents, memory, and project metadata.', permission: 'read', category: 'workspace', icon: 'search', endpoint: '/api/v1/search', execute: stub('workspace.search') },
  { id: 'files.read', name: 'Read File', description: 'Read a workspace file with path and encoding metadata.', permission: 'read', category: 'code', icon: 'file', endpoint: '/api/v1/files', execute: stub('files.read') },
  { id: 'files.write', name: 'Write File', description: 'Create or update a workspace file.', permission: 'write', category: 'code', icon: 'edit', endpoint: '/api/v1/files', confirmationRequired: true, execute: stub('files.write') },
  { id: 'code.analyze', name: 'Analyze Code', description: 'Run static analysis, diagnostics, dependency checks, and architecture inspection.', permission: 'read', category: 'code', icon: 'scan', endpoint: '/api/v1/code/analyze', execute: stub('code.analyze') },
  { id: 'code.test', name: 'Run Tests', description: 'Execute the configured test suite and collect structured results.', permission: 'execute', category: 'code', icon: 'test', endpoint: '/api/v1/jobs', confirmationRequired: true, execute: stub('code.test') },
  { id: 'terminal.run', name: 'Terminal', description: 'Run an explicitly approved local command in the workspace sandbox.', permission: 'execute', category: 'system', icon: 'terminal', endpoint: '/api/v1/terminal', confirmationRequired: true, execute: stub('terminal.run') },
  { id: 'git.status', name: 'Git Status', description: 'Inspect branch, changed files, and repository state.', permission: 'read', category: 'git', icon: 'git', endpoint: '/api/v1/git', execute: stub('git.status') },
  { id: 'git.diff', name: 'Git Diff', description: 'Review staged and unstaged source changes.', permission: 'read', category: 'git', icon: 'diff', endpoint: '/api/v1/git', execute: stub('git.diff') },
  { id: 'git.commit', name: 'Git Commit', description: 'Create a commit from approved workspace changes.', permission: 'write', category: 'git', icon: 'commit', endpoint: '/api/v1/git', confirmationRequired: true, execute: stub('git.commit') },
  { id: 'git.push', name: 'Git Push', description: 'Push approved commits to the configured remote.', permission: 'network', category: 'git', icon: 'upload', endpoint: '/api/v1/git', confirmationRequired: true, execute: stub('git.push') },
  { id: 'ai.chat', name: 'AI Chat', description: 'Send a prompt to the configured Brain LLM provider.', permission: 'network', category: 'ai', icon: 'spark', endpoint: '/api/v1/chat', execute: stub('ai.chat') },
  { id: 'ai.agent', name: 'Run Agent', description: 'Start an agent task with scoped tools and workspace context.', permission: 'execute', category: 'ai', icon: 'agent', endpoint: '/api/v1/agents/run', confirmationRequired: true, execute: stub('ai.agent') },
  { id: 'memory.search', name: 'Memory Search', description: 'Retrieve relevant project memory and prior decisions.', permission: 'read', category: 'data', icon: 'memory', endpoint: '/api/v1/memory', execute: stub('memory.search') },
  { id: 'memory.write', name: 'Save Memory', description: 'Persist an explicit project decision, fact, or note.', permission: 'write', category: 'data', icon: 'bookmark', endpoint: '/api/v1/memory', confirmationRequired: true, execute: stub('memory.write') },
  { id: 'blueprint.create', name: 'Blueprint Designer', description: 'Create and edit visual program, workflow, and architecture graphs.', permission: 'write', category: 'design', icon: 'nodes', endpoint: '/api/v1/blueprints', execute: stub('blueprint.create') },
  { id: 'uml.generate', name: 'UML Designer', description: 'Generate class, sequence, component, state, and deployment diagrams.', permission: 'write', category: 'design', icon: 'uml', endpoint: '/api/v1/uml', execute: stub('uml.generate') },
  { id: 'docs.generate', name: 'Documentation', description: 'Generate README, API, architecture, changelog, and developer documentation.', permission: 'write', category: 'workspace', icon: 'docs', endpoint: '/api/v1/docs', execute: stub('docs.generate') },
  { id: 'system.health', name: 'System Health', description: 'Check API, Ollama, database, native runtime, and job workers.', permission: 'read', category: 'system', icon: 'pulse', endpoint: '/api/v1/health', execute: stub('system.health') },
];
