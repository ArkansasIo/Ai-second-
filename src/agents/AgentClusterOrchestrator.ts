import type {AgentDefinition} from './agentRegistry';

export interface AgentClusterTask { id: string; title: string; agentId: string; dependsOn?: string[]; input: string; status?: 'pending'|'running'|'completed'|'failed'; output?: string; error?: string; }
export interface AgentCluster { id: string; name: string; agents: string[]; tasks: AgentClusterTask[]; sharedMemory: Record<string, unknown>; }

export class AgentClusterOrchestrator {
  private clusters = new Map<string, AgentCluster>();

  create(name: string, agents: AgentDefinition[]): AgentCluster {
    const id = `cluster-${crypto.randomUUID()}`;
    const cluster: AgentCluster = {id, name, agents: agents.map(a => a.id), tasks: [], sharedMemory: {}};
    this.clusters.set(id, cluster);
    return cluster;
  }

  addTask(clusterId: string, task: Omit<AgentClusterTask, 'status'>): AgentClusterTask {
    const cluster = this.require(clusterId);
    if (!cluster.agents.includes(task.agentId)) throw new Error(`Agent ${task.agentId} is not assigned to ${clusterId}`);
    const next = {...task, status: 'pending' as const};
    cluster.tasks.push(next);
    return next;
  }

  readyTasks(clusterId: string): AgentClusterTask[] {
    const cluster = this.require(clusterId);
    return cluster.tasks.filter(task => task.status === 'pending' && (task.dependsOn ?? []).every(id => cluster.tasks.find(t => t.id === id)?.status === 'completed'));
  }

  completeTask(clusterId: string, taskId: string, output: string): void {
    const cluster = this.require(clusterId);
    const task = cluster.tasks.find(item => item.id === taskId);
    if (!task) throw new Error(`Task not found: ${taskId}`);
    task.status = 'completed'; task.output = output;
    cluster.sharedMemory[`task:${taskId}`] = output;
  }

  failTask(clusterId: string, taskId: string, error: string): void {
    const task = this.require(clusterId).tasks.find(item => item.id === taskId);
    if (!task) throw new Error(`Task not found: ${taskId}`);
    task.status = 'failed'; task.error = error;
  }

  get(id: string): AgentCluster | undefined { return this.clusters.get(id); }
  list(): AgentCluster[] { return [...this.clusters.values()]; }

  private require(id: string): AgentCluster { const cluster = this.clusters.get(id); if (!cluster) throw new Error(`Cluster not found: ${id}`); return cluster; }
}

export const agentClusterOrchestrator = new AgentClusterOrchestrator();
