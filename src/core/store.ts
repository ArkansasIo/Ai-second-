import {createWorkspace,id,nowIso,type DocumentModel,type FolderModel,type ProjectModel,type WorkspaceState} from './model';
import {workspaceStorage} from './persistence';

export class WorkspaceStore {
 private state:WorkspaceState=createWorkspace();
 private history:WorkspaceState[]=[]; private future:WorkspaceState[]=[];
 async init(){const saved=await workspaceStorage.load(); if(saved)this.state=saved; return this.state;}
 snapshot(){return structuredClone(this.state);}
 private commit(next:WorkspaceState){this.history.push(this.snapshot()); this.future=[]; this.state={...next,workspace:{...next.workspace,updatedAt:nowIso()}}; void workspaceStorage.save(this.state);}
 undo(){const prev=this.history.pop(); if(!prev)return false; this.future.push(this.snapshot()); this.state=prev; void workspaceStorage.save(this.state); return true;}
 redo(){const next=this.future.pop(); if(!next)return false; this.history.push(this.snapshot()); this.state=next; void workspaceStorage.save(this.state); return true;}
 addFolder(name:string,parentId=this.state.workspace.rootFolderId,projectId?:string){const folder:FolderModel={id:id('folder'),name,parentId,projectId,order:this.state.folders.filter(f=>f.parentId===parentId).length}; this.commit({...this.state,folders:[...this.state.folders,folder]}); return folder;}
 addProject(name:string,description='',deadline?:string){const folder=this.addFolder(name); const stamp=nowIso(); const project:ProjectModel={id:id('project'),name,description,folderId:folder.id,status:'planned',tags:[],deadline,createdAt:stamp,updatedAt:stamp}; const next={...this.state,projects:[...this.state.projects,project],workspace:{...this.state.workspace,projectIds:[...this.state.workspace.projectIds,project.id]}}; this.commit(next); return project;}
 addDocument(folderId:string,name:string,content='',language='plaintext'){const doc:DocumentModel={id:id('doc'),folderId,name,path:name,language,content,frozen:false,createdAt:nowIso(),updatedAt:nowIso()}; this.commit({...this.state,documents:[...this.state.documents,doc]}); return doc;}
 updateDocument(idValue:string,patch:Partial<DocumentModel>){this.commit({...this.state,documents:this.state.documents.map(d=>d.id===idValue?{...d,...patch,updatedAt:nowIso()}:d)});}
 freezeDocument(idValue:string,frozen=true){this.updateDocument(idValue,{frozen});}
}
export const workspaceStore=new WorkspaceStore();
