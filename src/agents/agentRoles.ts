export type AgentDepartment =
  | 'executive'
  | 'engineering'
  | 'game-development'
  | 'creative'
  | 'writing'
  | 'infrastructure'
  | 'ai-research'
  | 'quality'
  | 'business';

export interface AgentRoleDefinition {
  id: string;
  number: number;
  name: string;
  title: string;
  department: AgentDepartment;
  description: string;
  skills: string[];
  defaultTools: string[];
  defaultCapabilities: string[];
}

export const AGENT_ROLES: AgentRoleDefinition[] = [
  { id: 'ROLE-001', number: 1, name: 'CTO', title: 'Chief Technology Officer', department: 'executive', description: 'Coordinates technical strategy, architecture, workforce, and delivery.', skills: ['architecture', 'planning', 'delegation', 'review'], defaultTools: ['github', 'tasks', 'agents', 'terminal', 'api'], defaultCapabilities: ['orchestration', 'approval-management'] },
  { id: 'ROLE-002', number: 2, name: 'Lead Software Engineer', title: 'Lead Software Engineer', department: 'engineering', description: 'Leads implementation and code architecture.', skills: ['typescript', 'architecture', 'code-review'], defaultTools: ['editor', 'terminal', 'git', 'build', 'test'], defaultCapabilities: ['coding', 'git', 'build'] },
  { id: 'ROLE-003', number: 3, name: 'Frontend Engineer', title: 'Frontend Engineer', department: 'engineering', description: 'Builds responsive application interfaces and client features.', skills: ['react', 'typescript', 'css', 'accessibility'], defaultTools: ['editor', 'terminal', 'browser', 'build'], defaultCapabilities: ['coding', 'preview'] },
  { id: 'ROLE-004', number: 4, name: 'Backend Engineer', title: 'Backend Engineer', department: 'engineering', description: 'Builds APIs, services, persistence, and integrations.', skills: ['api', 'databases', 'typescript', 'security'], defaultTools: ['editor', 'terminal', 'git', 'database', 'api'], defaultCapabilities: ['coding', 'database', 'network'] },
  { id: 'ROLE-005', number: 5, name: 'C++ Systems Programmer', title: 'C++ Systems Programmer', department: 'engineering', description: 'Develops native systems, engines, and performance-critical code.', skills: ['c++', 'cmake', 'debugging', 'profiling'], defaultTools: ['editor', 'terminal', 'compiler', 'debugger', 'git'], defaultCapabilities: ['coding', 'native-build'] },
  { id: 'ROLE-006', number: 6, name: 'Game Director', title: 'Game Director', department: 'game-development', description: 'Owns game vision, feature direction, and cross-discipline execution.', skills: ['game-direction', 'production', 'systems-design'], defaultTools: ['projects', 'tasks', 'agents', 'docs'], defaultCapabilities: ['planning', 'orchestration'] },
  { id: 'ROLE-007', number: 7, name: 'Lead Game Designer', title: 'Lead Game Designer', department: 'game-development', description: 'Designs core gameplay systems and coordinates game design work.', skills: ['game-design', 'systems', 'balance', 'documentation'], defaultTools: ['editor', 'docs', 'tasks', 'analytics'], defaultCapabilities: ['design', 'analysis'] },
  { id: 'ROLE-008', number: 8, name: 'Gameplay Programmer', title: 'Gameplay Programmer', department: 'game-development', description: 'Implements gameplay, combat, AI, input, and progression systems.', skills: ['gameplay', 'ai', 'c++', 'blueprints'], defaultTools: ['editor', 'terminal', 'git', 'build', 'test'], defaultCapabilities: ['coding', 'game-build'] },
  { id: 'ROLE-009', number: 9, name: 'Level Designer', title: 'Level Designer', department: 'game-development', description: 'Creates levels, encounters, zones, and progression spaces.', skills: ['level-design', 'world-building', 'encounters'], defaultTools: ['editor', 'assets', 'tasks', 'docs'], defaultCapabilities: ['design', 'world-editing'] },
  { id: 'ROLE-010', number: 10, name: 'Scriptwriter', title: 'Scriptwriter', department: 'writing', description: 'Creates dialogue, scripts, scenes, quests, and narrative content.', skills: ['screenwriting', 'dialogue', 'storytelling', 'quest-writing'], defaultTools: ['editor', 'memory', 'docs', 'tasks'], defaultCapabilities: ['writing', 'research'] },
  { id: 'ROLE-011', number: 11, name: 'Narrative Designer', title: 'Narrative Designer', department: 'writing', description: 'Connects story, gameplay, characters, quests, and world lore.', skills: ['narrative-design', 'lore', 'quest-design'], defaultTools: ['editor', 'memory', 'knowledge-base', 'tasks'], defaultCapabilities: ['writing', 'design'] },
  { id: 'ROLE-012', number: 12, name: 'Creative Director', title: 'Creative Director', department: 'creative', description: 'Owns creative direction and visual consistency.', skills: ['creative-direction', 'art-direction', 'brand'], defaultTools: ['projects', 'assets', 'docs', 'tasks'], defaultCapabilities: ['design', 'review'] },
  { id: 'ROLE-013', number: 13, name: 'Lead UI/UX Designer', title: 'Lead UI/UX Designer', department: 'creative', description: 'Designs application and game interfaces, flows, and interaction systems.', skills: ['ui', 'ux', 'prototyping', 'accessibility'], defaultTools: ['browser', 'editor', 'assets', 'tasks'], defaultCapabilities: ['design', 'prototype'] },
  { id: 'ROLE-014', number: 14, name: '3D Environment Designer', title: '3D Environment Designer', department: 'creative', description: 'Designs 3D environments, scenes, materials, and spatial composition.', skills: ['3d', 'environment-art', 'materials', 'lighting'], defaultTools: ['assets', 'editor', 'filesystem', 'tasks'], defaultCapabilities: ['design', 'asset-management'] },
  { id: 'ROLE-015', number: 15, name: 'Technical Artist', title: 'Technical Artist', department: 'creative', description: 'Bridges art pipelines, shaders, tools, optimization, and engines.', skills: ['shaders', 'pipelines', 'optimization', 'tools'], defaultTools: ['editor', 'terminal', 'assets', 'build'], defaultCapabilities: ['coding', 'asset-pipeline'] },
  { id: 'ROLE-016', number: 16, name: 'DevOps Engineer', title: 'DevOps Engineer', department: 'infrastructure', description: 'Owns CI/CD, builds, deployments, infrastructure, and automation.', skills: ['ci', 'cd', 'docker', 'linux', 'windows'], defaultTools: ['terminal', 'git', 'actions', 'build', 'deployment'], defaultCapabilities: ['terminal', 'deployment'] },
  { id: 'ROLE-017', number: 17, name: 'Database Engineer', title: 'Database Engineer', department: 'infrastructure', description: 'Designs schemas, migrations, queries, backups, and data services.', skills: ['mysql', 'sql', 'schema-design', 'migrations'], defaultTools: ['database', 'terminal', 'editor', 'backup'], defaultCapabilities: ['database'] },
  { id: 'ROLE-018', number: 18, name: 'Security Engineer', title: 'Security Engineer', department: 'quality', description: 'Audits code, dependencies, permissions, secrets, and network access.', skills: ['security', 'threat-modeling', 'secrets', 'audit'], defaultTools: ['scanner', 'terminal', 'git', 'audit-log'], defaultCapabilities: ['security-audit'] },
  { id: 'ROLE-019', number: 19, name: 'QA Engineer', title: 'QA Engineer', department: 'quality', description: 'Designs and executes automated and manual quality validation.', skills: ['testing', 'automation', 'regression', 'e2e'], defaultTools: ['test', 'browser', 'terminal', 'logs'], defaultCapabilities: ['testing', 'automation'] },
  { id: 'ROLE-020', number: 20, name: 'AI/ML Engineer', title: 'AI/ML Engineer', department: 'ai-research', description: 'Builds AI integrations, model pipelines, evaluation, and local inference.', skills: ['llm', 'ollama', 'ml', 'evaluation'], defaultTools: ['ollama', 'python', 'terminal', 'models', 'datasets'], defaultCapabilities: ['ai', 'research'] },
  { id: 'ROLE-021', number: 21, name: 'Research Analyst', title: 'Research Analyst', department: 'ai-research', description: 'Investigates technical topics, competitors, APIs, and new capabilities.', skills: ['research', 'web', 'analysis', 'documentation'], defaultTools: ['browser', 'web-search', 'memory', 'docs'], defaultCapabilities: ['research', 'web'] },
  { id: 'ROLE-022', number: 22, name: 'Product Manager', title: 'Product Manager', department: 'business', description: 'Converts goals into requirements, milestones, and prioritized work.', skills: ['requirements', 'roadmaps', 'prioritization'], defaultTools: ['projects', 'tasks', 'analytics', 'docs'], defaultCapabilities: ['planning', 'analysis'] },
  { id: 'ROLE-023', number: 23, name: 'Technical Writer', title: 'Technical Writer', department: 'writing', description: 'Creates source documentation, manuals, architecture docs, and release notes.', skills: ['markdown', 'uml', 'api-docs', 'technical-writing'], defaultTools: ['editor', 'docs', 'git', 'files'], defaultCapabilities: ['writing', 'documentation'] },
  { id: 'ROLE-024', number: 24, name: 'Data Analyst', title: 'Data Analyst', department: 'business', description: 'Analyzes project, agent, build, and business metrics.', skills: ['sql', 'analytics', 'charts', 'reporting'], defaultTools: ['database', 'analytics', 'python', 'reports'], defaultCapabilities: ['analysis', 'reporting'] },
];

export function getAgentRole(roleId: string): AgentRoleDefinition | undefined {
  return AGENT_ROLES.find((role) => role.id === roleId);
}
