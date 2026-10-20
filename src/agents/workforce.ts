import { AGENT_ROLES, getAgentRole, type AgentRoleDefinition } from './agentRoles';

export type AgentStatus = 'offline' | 'idle' | 'working' | 'waiting' | 'blocked' | 'error';
export type JobStatus = 'draft' | 'queued' | 'running' | 'paused' | 'blocked' | 'completed' | 'failed' | 'cancelled';
export type TaskStatus = 'todo' | 'queued' | 'running' | 'blocked' | 'review' | 'done' | 'failed' | 'cancelled';
export type JobPriority = 'low' | 'normal' | 'high' | 'critical';

export interface AgentCapabilities {
  coding: boolean;
  design: boolean;
  writing: boolean;
  research: boolean;
  testing: boolean;
  terminal: boolean;
  filesystem: boolean;
  git: boolean;
  network: boolean;
  api: boolean;
}

export interface AIAgent {
  id: string;
  number: number;
  name: string;
  displayName: string;
  roleId: string;
  department: string;
  teamId?: string;
  title: string;
  description: string;
  skills: string[];
  tools: string[];
  apiPermissions: string[];
  model: string;
  environmentId?: string;
  currentJobId?: string;
  currentTaskId?: string;
  status: AgentStatus;
  capabilities: AgentCapabilities;
}

export interface AITask {
  id: string;
  number: number;
  name: string;
  description: string;
  projectId: string;
  jobId: string;
  environmentId: string;
  agentId?: string;
  status: TaskStatus;
  priority: JobPriority;
  dependencies: string[];
  files: string[];
  branch?: string;
  pullRequest?: number;
  buildJobId?: string;
  testJobId?: string;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
}

export interface AIJob {
  id: string;
  number: number;
  name: string;
  description: string;
  projectId: string;
  environmentId: string;
  teamId?: string;
  leadAgentId?: string;
  taskIds: string[];
  status: JobStatus;
  priority: JobPriority;
  dependencies: string[];
  artifacts: string[];
  parallel: boolean;
  maxWorkers: number;
  retryLimit: number;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
}

export interface AgentTemplate {
  id: string;
  name: string;
  roleId: string;
  model: string;
  skills: string[];
  tools: string[];
  apiPermissions: string[];
  capabilities: AgentCapabilities;
}

export const DEFAULT_CAPABILITIES: AgentCapabilities = {
  coding: false,
  design: false,
  writing: false,
  research: false,
  testing: false,
  terminal: false,
  filesystem: false,
  git: false,
  network: false,
  api: false,
};

export const AGENT_TEMPLATES: AgentTemplate[] = AGENT_ROLES.map((role) => ({
  id: `TPL-${role.id.slice(-3)}`,
  name: `${role.name} Template`,
  roleId: role.id,
  model: 'qwen3',
  skills: role.skills,
  tools: role.defaultTools,
  apiPermissions: [],
  capabilities: {
    ...DEFAULT_CAPABILITIES,
    coding: role.department === 'engineering' || role.department === 'infrastructure' || role.name.includes('Programmer'),
    design: role.department === 'creative' || role.department === 'game-development',
    writing: role.department === 'writing',
    research: role.department === 'ai-research',
    testing: role.department === 'quality',
    terminal: role.defaultTools.includes('terminal'),
    filesystem: true,
    git: role.defaultTools.includes('git'),
    network: role.defaultTools.includes('api') || role.defaultTools.includes('web-search'),
    api: role.defaultTools.includes('api'),
  },
}));

export function createAgentFromTemplate(templateId: string, sequence: number, overrides: Partial<AIAgent> = {}): AIAgent {
  const template = AGENT_TEMPLATES.find((item) => item.id === templateId);
  if (!template) throw new Error(`Unknown agent template: ${templateId}`);
  const role = getAgentRole(template.roleId) as AgentRoleDefinition;
  const id = `AGENT-${String(sequence).padStart(5, '0')}`;
  return {
    id,
    number: sequence,
    name: `${role.name} #${String(sequence).padStart(2, '0')}`,
    displayName: `${role.title} ${String(sequence).padStart(2, '0')}`,
    roleId: role.id,
    department: role.department,
    title: role.title,
    description: role.description,
    skills: [...template.skills],
    tools: [...template.tools],
    apiPermissions: [...template.apiPermissions],
    model: template.model,
    status: 'idle',
    capabilities: { ...template.capabilities },
    ...overrides,
  };
}

export function createJob(projectId: string, environmentId: string, name: string, sequence: number): AIJob {
  return {
    id: `JOB-${String(sequence).padStart(5, '0')}`,
    number: sequence,
    name,
    description: '',
    projectId,
    environmentId,
    taskIds: [],
    status: 'draft',
    priority: 'normal',
    dependencies: [],
    artifacts: [],
    parallel: true,
    maxWorkers: 4,
    retryLimit: 2,
    createdAt: new Date().toISOString(),
  };
}

export function createTask(job: AIJob, name: string, sequence: number): AITask {
  return {
    id: `TASK-${String(sequence).padStart(5, '0')}`,
    number: sequence,
    name,
    description: '',
    projectId: job.projectId,
    jobId: job.id,
    environmentId: job.environmentId,
    status: 'todo',
    priority: job.priority,
    dependencies: [],
    files: [],
    createdAt: new Date().toISOString(),
  };
}
