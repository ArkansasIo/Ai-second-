export type ProjectStatus = 'planned' | 'active' | 'blocked' | 'completed' | 'cancelled';
export type TaskStatus = 'queued' | 'running' | 'blocked' | 'review' | 'completed' | 'failed' | 'cancelled';

export interface RoadmapItem {
  id: string;
  title: string;
  status: ProjectStatus;
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate?: string;
  dependencies: string[];
}

export interface ProjectTask {
  id: string;
  title: string;
  status: TaskStatus;
  assignee?: string;
  agentId?: string;
  environmentId?: string;
  dueDate?: string;
  dependsOn: string[];
}

export interface ProjectModel {
  projectId: string;
  name: string;
  managerAgentId?: string;
  repository?: string;
  roadmap: RoadmapItem[];
  tasks: ProjectTask[];
}

export interface ProjectSummary {
  totalTasks: number;
  completedTasks: number;
  blockedTasks: number;
  overdueTasks: number;
  progressPercent: number;
}

export class ProjectManager {
  constructor(private readonly project: ProjectModel) {}

  summary(now = new Date()): ProjectSummary {
    const total = this.project.tasks.length;
    const completed = this.project.tasks.filter(t => t.status === 'completed').length;
    const blocked = this.project.tasks.filter(t => t.status === 'blocked').length;
    const overdue = this.project.tasks.filter(t =>
      !!t.dueDate && new Date(t.dueDate).getTime() < now.getTime() && t.status !== 'completed' && t.status !== 'cancelled'
    ).length;
    return {
      totalTasks: total,
      completedTasks: completed,
      blockedTasks: blocked,
      overdueTasks: overdue,
      progressPercent: total === 0 ? 0 : Math.round((completed / total) * 100)
    };
  }

  readyTasks(): ProjectTask[] {
    const completed = new Set(this.project.tasks.filter(t => t.status === 'completed').map(t => t.id));
    return this.project.tasks.filter(task =>
      task.status === 'queued' && task.dependsOn.every(id => completed.has(id))
    );
  }

  roadmapStatus(id: string, status: ProjectStatus): void {
    const item = this.project.roadmap.find(entry => entry.id === id);
    if (!item) throw new Error(`Roadmap item not found: ${id}`);
    item.status = status;
  }

  taskStatus(id: string, status: TaskStatus): void {
    const task = this.project.tasks.find(entry => entry.id === id);
    if (!task) throw new Error(`Task not found: ${id}`);
    task.status = status;
  }

  overdueTasks(now = new Date()): ProjectTask[] {
    return this.project.tasks.filter(task =>
      !!task.dueDate && new Date(task.dueDate).getTime() < now.getTime() &&
      task.status !== 'completed' && task.status !== 'cancelled'
    );
  }
}
