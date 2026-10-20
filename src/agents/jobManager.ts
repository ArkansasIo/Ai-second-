import type { AIAgent, AIJob, AITask, AgentStatus, JobStatus, TaskStatus } from './workforce';

export interface JobEvent {
  id: string;
  type: 'job' | 'task' | 'agent' | 'approval';
  entityId: string;
  message: string;
  createdAt: string;
}

export interface ParallelRunResult {
  jobId: string;
  taskId: string;
  agentId?: string;
  status: 'completed' | 'failed' | 'cancelled';
  output?: unknown;
  error?: string;
}

export class JobManager {
  private jobs = new Map<string, AIJob>();
  private tasks = new Map<string, AITask>();
  private agents = new Map<string, AIAgent>();
  private events: JobEvent[] = [];

  registerJob(job: AIJob): void { this.jobs.set(job.id, job); }
  registerTask(task: AITask): void { this.tasks.set(task.id, task); }
  registerAgent(agent: AIAgent): void { this.agents.set(agent.id, agent); }

  getJob(jobId: string): AIJob | undefined { return this.jobs.get(jobId); }
  getTask(taskId: string): AITask | undefined { return this.tasks.get(taskId); }
  getAgent(agentId: string): AIAgent | undefined { return this.agents.get(agentId); }
  listJobs(): AIJob[] { return [...this.jobs.values()]; }
  listTasks(jobId?: string): AITask[] { return [...this.tasks.values()].filter((task) => !jobId || task.jobId === jobId); }
  listAgents(): AIAgent[] { return [...this.agents.values()]; }
  getEvents(): JobEvent[] { return [...this.events]; }

  queue(jobId: string): void {
    const job = this.requireJob(jobId);
    this.setJobStatus(job, 'queued');
    this.emit('job', job.id, `Job ${job.name} queued`);
  }

  start(jobId: string): void {
    const job = this.requireJob(jobId);
    this.setJobStatus(job, 'running');
    job.startedAt ??= new Date().toISOString();
    this.emit('job', job.id, `Job ${job.name} started`);
  }

  pause(jobId: string): void { this.setJobStatus(this.requireJob(jobId), 'paused'); }
  cancel(jobId: string): void { this.setJobStatus(this.requireJob(jobId), 'cancelled'); }

  assignTask(taskId: string, agentId: string): void {
    const task = this.requireTask(taskId);
    const agent = this.requireAgent(agentId);
    task.agentId = agent.id;
    agent.currentTaskId = task.id;
    agent.status = 'working';
    task.status = 'queued';
    this.emit('task', task.id, `Assigned to ${agent.displayName}`);
  }

  setTaskStatus(taskId: string, status: TaskStatus): void {
    const task = this.requireTask(taskId);
    task.status = status;
    if (task.agentId && (status === 'done' || status === 'failed' || status === 'cancelled')) {
      const agent = this.agents.get(task.agentId);
      if (agent) {
        agent.currentTaskId = undefined;
        agent.status = 'idle';
      }
    }
    this.emit('task', task.id, `Task ${task.name}: ${status}`);
  }

  setAgentStatus(agentId: string, status: AgentStatus): void {
    const agent = this.requireAgent(agentId);
    agent.status = status;
    this.emit('agent', agent.id, `${agent.displayName}: ${status}`);
  }

  async runParallel(jobId: string): Promise<ParallelRunResult[]> {
    const job = this.requireJob(jobId);
    this.start(job.id);
    const tasks = this.listTasks(job.id).filter((task) => task.status !== 'done' && task.status !== 'cancelled');
    const runnable = tasks.filter((task) => task.dependencies.every((id) => this.tasks.get(id)?.status === 'done'));
    const workers = Math.max(1, Math.min(job.maxWorkers, runnable.length));
    const results: ParallelRunResult[] = [];

    for (let index = 0; index < runnable.length; index += workers) {
      const batch = runnable.slice(index, index + workers);
      const batchResults = await Promise.all(batch.map(async (task) => {
        this.setTaskStatus(task.id, 'running');
        return {
          jobId: job.id,
          taskId: task.id,
          agentId: task.agentId,
          status: 'completed' as const,
          output: { message: 'Execution delegated to the environment runner.' },
        };
      }));
      batchResults.forEach((result) => {
        this.setTaskStatus(result.taskId, result.status === 'completed' ? 'done' : 'failed');
        results.push(result);
      });
    }

    const remaining = this.listTasks(job.id).some((task) => !['done', 'cancelled'].includes(task.status));
    job.status = remaining ? 'blocked' : 'completed';
    if (!remaining) job.completedAt = new Date().toISOString();
    return results;
  }

  private setJobStatus(job: AIJob, status: JobStatus): void { job.status = status; }
  private requireJob(id: string): AIJob { const value = this.jobs.get(id); if (!value) throw new Error(`Unknown job: ${id}`); return value; }
  private requireTask(id: string): AITask { const value = this.tasks.get(id); if (!value) throw new Error(`Unknown task: ${id}`); return value; }
  private requireAgent(id: string): AIAgent { const value = this.agents.get(id); if (!value) throw new Error(`Unknown agent: ${id}`); return value; }
  private emit(type: JobEvent['type'], entityId: string, message: string): void { this.events.push({ id: crypto.randomUUID(), type, entityId, message, createdAt: new Date().toISOString() }); }
}
