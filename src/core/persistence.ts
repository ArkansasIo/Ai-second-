import type { WorkspaceState } from './model';

const KEY='ai-second-brain.workspace.v1';
export interface WorkspaceStorage { load(): Promise<WorkspaceState|null>; save(state:WorkspaceState): Promise<void>; clear(): Promise<void>; }

export class LocalWorkspaceStorage implements WorkspaceStorage {
 async load(){ if(typeof localStorage==='undefined') return null; const raw=localStorage.getItem(KEY); if(!raw) return null; try{return JSON.parse(raw) as WorkspaceState;}catch{return null;} }
 async save(state:WorkspaceState){ if(typeof localStorage==='undefined') return; localStorage.setItem(KEY,JSON.stringify(state)); }
 async clear(){ if(typeof localStorage==='undefined') return; localStorage.removeItem(KEY); }
}

export class MemoryWorkspaceStorage implements WorkspaceStorage { private state:WorkspaceState|null=null; async load(){return this.state;} async save(state:WorkspaceState){this.state=structuredClone(state);} async clear(){this.state=null;} }
export const workspaceStorage: WorkspaceStorage = new LocalWorkspaceStorage();
