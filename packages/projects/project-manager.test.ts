import { describe, expect, it } from 'vitest';
import { ProjectManager, ProjectModel } from './project-manager';

describe('ProjectManager', () => {
  const project: ProjectModel = {
    projectId: 'PROJECT-00001',
    name: 'Example',
    roadmap: [
      { id: 'ROADMAP-00001', title: 'Foundation', status: 'active', priority: 'high', dependencies: [] }
    ],
    tasks: [
      { id: 'TASK-00001', title: 'Setup', status: 'completed', dependsOn: [] },
      { id: 'TASK-00002', title: 'Build', status: 'queued', dependsOn: ['TASK-00001'] },
      { id: 'TASK-00003', title: 'Blocked task', status: 'queued', dependsOn: ['TASK-99999'] }
    ]
  };

  it('calculates progress and task counts', () => {
    expect(new ProjectManager(project).summary()).toMatchObject({
      totalTasks: 3,
      completedTasks: 1,
      blockedTasks: 0,
      progressPercent: 33
    });
  });

  it('returns tasks whose dependencies are complete', () => {
    expect(new ProjectManager(project).readyTasks().map(t => t.id)).toEqual(['TASK-00002']);
  });

  it('updates roadmap and task status', () => {
    const manager = new ProjectManager(project);
    manager.roadmapStatus('ROADMAP-00001', 'completed');
    manager.taskStatus('TASK-00002', 'running');
    expect(project.roadmap[0].status).toBe('completed');
    expect(project.tasks[1].status).toBe('running');
  });
});
