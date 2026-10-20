import {ENVIRONMENT_TEMPLATES, cloneEnvironmentTemplate, type EnvironmentTemplate} from './environmentRegistry';

export interface WorkshopEnvironment { id: string; templateKey: string; name: string; projectId?: string; status: 'stopped'|'starting'|'running'|'stopping'|'error'; template: EnvironmentTemplate; openedAt: string; }

export class WorkshopEnvironmentManager {
  private environments = new Map<string, WorkshopEnvironment>();

  create(templateKey: string, name?: string, projectId?: string): WorkshopEnvironment {
    const template = ENVIRONMENT_TEMPLATES.find(item => item.key === templateKey);
    if (!template) throw new Error(`Unknown environment template: ${templateKey}`);
    const environment: WorkshopEnvironment = {
      id: `workshop-${crypto.randomUUID()}`, templateKey, name: name ?? template.name,
      projectId, status: 'stopped', template: cloneEnvironmentTemplate(template), openedAt: new Date().toISOString(),
    };
    this.environments.set(environment.id, environment);
    return environment;
  }

  start(id: string): WorkshopEnvironment { const env = this.require(id); env.status = 'running'; return env; }
  stop(id: string): WorkshopEnvironment { const env = this.require(id); env.status = 'stopped'; return env; }
  get(id: string): WorkshopEnvironment | undefined { return this.environments.get(id); }
  list(): WorkshopEnvironment[] { return [...this.environments.values()]; }
  remove(id: string): boolean { return this.environments.delete(id); }

  private require(id: string): WorkshopEnvironment { const env = this.environments.get(id); if (!env) throw new Error(`Workshop environment not found: ${id}`); return env; }
}

export const workshopEnvironmentManager = new WorkshopEnvironmentManager();
