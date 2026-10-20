import type {ProjectModel} from '../core/model';
export interface ProjectSummary {project:ProjectModel; daysRemaining:number|null; progressPercent:number; health:'on-track'|'due-soon'|'overdue'|'no-deadline';}
export class ProjectManager {
 constructor(private projects:ProjectModel[]=[]){ }
 setProjects(projects:ProjectModel[]){this.projects=projects;}
 list(){return [...this.projects];}
 get(id:string){return this.projects.find(p=>p.id===id);}
 summary(project:ProjectModel,now=new Date()):ProjectSummary{const days=project.deadline?Math.ceil((new Date(project.deadline).getTime()-now.getTime())/86400000):null; const progress=project.status==='complete'?100:project.status==='active'?50:project.status==='blocked'?25:0; const health=days===null?'no-deadline':days<0?'overdue':days<=3?'due-soon':'on-track'; return {project,daysRemaining:days,progressPercent:progress,health};}
 summaries(now=new Date()){return this.projects.map(p=>this.summary(p,now));}
}
