import type { FolderWorkQueue, WorkJob, WorkTask } from './taskTypes';

const now = () => new Date().toISOString();

export function createTask(folderId: string, name: string, description = ''): WorkTask {
  const timestamp = now();
  return {
    id: `TASK-${crypto.randomUUID()}`,
    number: Date.now(),
    name,
    description,
    folderId,
    status: 'queued',
    priority: 'normal',
    dependencies: [],
    subtasks: [],
    artifacts: [],
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function createJob(folderId: string, name: string, description = ''): WorkJob {
  const timestamp = now();
  return {
    id: `JOB-${crypto.randomUUID()}`,
    number: Date.now(),
    name,
    description,
    folderId,
    taskIds: [],
    status: 'queued',
    priority: 'normal',
    dependencies: [],
    artifacts: [],
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function createFolderQueue(folderId: string, folderName: string): FolderWorkQueue {
  return { folderId, folderName, tasks: [], jobs: [] };
}

export function addTask(queue: FolderWorkQueue, task: WorkTask): FolderWorkQueue {
  return { ...queue, tasks: [...queue.tasks, task] };
}

export function addJob(queue: FolderWorkQueue, job: WorkJob): FolderWorkQueue {
  return { ...queue, jobs: [...queue.jobs, job] };
}

export function attachTaskToJob(queue: FolderWorkQueue, jobId: string, taskId: string): FolderWorkQueue {
  return {
    ...queue,
    jobs: queue.jobs.map(job => job.id === jobId && !job.taskIds.includes(taskId)
      ? { ...job, taskIds: [...job.taskIds, taskId], updatedAt: now() }
      : job),
  };
}
