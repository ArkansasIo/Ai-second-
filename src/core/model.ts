export type WorkspaceId = string;
export type ProjectId = string;
export type FolderId = string;
export type DocumentId = string;

export interface WorkspaceModel { id: WorkspaceId; name: string; rootFolderId: FolderId; projectIds: ProjectId[]; createdAt: string; updatedAt: string; }
export interface ProjectModel { id: ProjectId; name: string; description: string; folderId: FolderId; status: 'planned'|'active'|'blocked'|'complete'|'archived'; tags: string[]; repository?: string; deadline?: string; createdAt: string; updatedAt: string; }
export interface FolderModel { id: FolderId; name: string; parentId?: FolderId; projectId?: ProjectId; order: number; }
export interface DocumentModel { id: DocumentId; folderId: FolderId; name: string; path: string; language: string; content: string; frozen: boolean; createdAt: string; updatedAt: string; }
export interface WorkspaceState { version: 1; workspace: WorkspaceModel; projects: ProjectModel[]; folders: FolderModel[]; documents: DocumentModel[]; }
export const nowIso = () => new Date().toISOString();
export const id = (prefix: string) => `${prefix}_${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;
export function createWorkspace(name='AI Second Brain'): WorkspaceState { const root=id('folder'); const stamp=nowIso(); return {version:1,workspace:{id:id('ws'),name,rootFolderId:root,projectIds:[],createdAt:stamp,updatedAt:stamp},projects:[],folders:[{id:root,name:'Workspace',order:0}],documents:[]}; }
