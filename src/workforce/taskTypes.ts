export type WorkItemStatus = 'draft' | 'queued' | 'running' | 'blocked' | 'paused' | 'completed' | 'failed' | 'cancelled';
export type WorkItemPriority = 'low' | 'normal' | 'high' | 'critical';

export interface WorkTask {
  id: string;
  number: number;
  name: string;
  description: string;
  folderId: string;
  projectId?: string;
  jobId?: string;
  parentTaskId?: string;
  assigneeAgentId?: string;
  status: WorkItemStatus;
  priority: WorkItemPriority;
  dependencies: string[];
  subtasks: string[];
  artifacts: string[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkJob {
  id: string;
  number: number;
  name: string;
  description: string;
  folderId: string;
  projectId?: string;
  leadAgentId?: string;
  taskIds: string[];
  status: WorkItemStatus;
  priority: WorkItemPriority;
  dependencies: string[];
  artifacts: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FolderWorkQueue {
  folderId: string;
  folderName: string;
  tasks: WorkTask[];
  jobs: WorkJob[];
}
