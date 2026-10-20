export type EnvironmentKind = 'web' | 'cpp' | 'android' | 'game' | 'python' | 'ai' | 'custom';
export type IsolationLevel = 'strict' | 'standard' | 'trusted';

export interface EnvironmentCapability {
  id: string;
  label: string;
  enabled: boolean;
  permission: 'read' | 'write' | 'execute' | 'network' | 'admin';
}

export interface EnvironmentTemplate {
  id: string;
  number: number;
  name: string;
  key: string;
  kind: EnvironmentKind;
  description: string;
  isolation: IsolationLevel;
  capabilities: EnvironmentCapability[];
  defaultAgents: string[];
  defaultTools: string[];
  resourceLimits: {
    maxAgents: number;
    maxParallelJobs: number;
    maxCpuPercent: number;
    maxMemoryMb: number;
    maxStorageMb: number;
  };
}

const capability = (
  id: string,
  label: string,
  permission: EnvironmentCapability['permission'],
  enabled = false,
): EnvironmentCapability => ({ id, label, permission, enabled });

const common = [
  capability('files.read', 'Read workspace files', 'read', true),
  capability('files.write', 'Write workspace files', 'write', true),
  capability('git.read', 'Read Git repositories', 'read', true),
  capability('git.write', 'Modify Git workspace', 'write', false),
  capability('terminal.execute', 'Execute terminal commands', 'execute', false),
  capability('network.http', 'HTTP network access', 'network', false),
];

export const ENVIRONMENT_TEMPLATES: EnvironmentTemplate[] = [
  {
    id: 'ENV-T001', number: 1, name: 'TypeScript Web', key: 'typescript-web', kind: 'web',
    description: 'Vite/React development environment for the Second Brain web client.', isolation: 'strict',
    capabilities: [...common, capability('browser.preview', 'Browser preview', 'network', true)],
    defaultAgents: ['frontend-engineer', 'qa-engineer'], defaultTools: ['node', 'npm', 'vite', 'git'],
    resourceLimits: { maxAgents: 8, maxParallelJobs: 8, maxCpuPercent: 80, maxMemoryMb: 8192, maxStorageMb: 20480 },
  },
  {
    id: 'ENV-T002', number: 2, name: 'C++ Native', key: 'cpp-native', kind: 'cpp',
    description: 'Native C++/CMake toolchain for desktop and runtime components.', isolation: 'strict',
    capabilities: [...common, capability('compiler.execute', 'Run C++ compiler', 'execute', true)],
    defaultAgents: ['cpp-engineer', 'qa-engineer'], defaultTools: ['cmake', 'ninja', 'git'],
    resourceLimits: { maxAgents: 12, maxParallelJobs: 12, maxCpuPercent: 100, maxMemoryMb: 16384, maxStorageMb: 40960 },
  },
  {
    id: 'ENV-T003', number: 3, name: 'Android', key: 'android', kind: 'android',
    description: 'Android SDK, Gradle, Java/Kotlin, APK and emulator tooling.', isolation: 'strict',
    capabilities: [...common, capability('android.build', 'Build Android packages', 'execute', true)],
    defaultAgents: ['android-engineer', 'qa-engineer'], defaultTools: ['java', 'gradle', 'adb', 'git'],
    resourceLimits: { maxAgents: 8, maxParallelJobs: 6, maxCpuPercent: 90, maxMemoryMb: 12288, maxStorageMb: 30720 },
  },
  {
    id: 'ENV-T004', number: 4, name: 'AI / Ollama', key: 'ai-ollama', kind: 'ai',
    description: 'Local model environment for Ollama, RAG, agent jobs and model testing.', isolation: 'strict',
    capabilities: [...common, capability('ollama.invoke', 'Invoke local Ollama models', 'execute', true), capability('network.http', 'Controlled provider access', 'network', false)],
    defaultAgents: ['ai-engineer', 'research-agent'], defaultTools: ['ollama', 'python', 'git'],
    resourceLimits: { maxAgents: 16, maxParallelJobs: 16, maxCpuPercent: 100, maxMemoryMb: 32768, maxStorageMb: 102400 },
  },
  {
    id: 'ENV-T005', number: 5, name: 'Game Development', key: 'game-development', kind: 'game',
    description: 'Game-engine project workspace with source, assets, builds, tests and tools.', isolation: 'strict',
    capabilities: [...common, capability('assets.write', 'Write game assets', 'write', true), capability('engine.execute', 'Run game tools', 'execute', false)],
    defaultAgents: ['game-developer', 'technical-artist', 'qa-engineer'], defaultTools: ['git', 'cmake', 'node'],
    resourceLimits: { maxAgents: 16, maxParallelJobs: 10, maxCpuPercent: 100, maxMemoryMb: 32768, maxStorageMb: 204800 },
  },
  {
    id: 'ENV-T006', number: 6, name: 'Custom', key: 'custom', kind: 'custom',
    description: 'User-defined environment with explicit sandbox policy and tool permissions.', isolation: 'strict',
    capabilities: [...common], defaultAgents: [], defaultTools: [],
    resourceLimits: { maxAgents: 8, maxParallelJobs: 8, maxCpuPercent: 80, maxMemoryMb: 8192, maxStorageMb: 20480 },
  },
];

export function getEnvironmentTemplate(key: string): EnvironmentTemplate | undefined {
  return ENVIRONMENT_TEMPLATES.find((template) => template.key === key);
}

export function cloneEnvironmentTemplate(template: EnvironmentTemplate): EnvironmentTemplate {
  return structuredClone(template);
}
