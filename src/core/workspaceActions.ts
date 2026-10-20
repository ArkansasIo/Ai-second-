import { workspaceStore } from './store';
import type { DocumentModel, FolderModel } from './model';

export function renameFolder(folderId: string, name: string): FolderModel | undefined {
  const state = workspaceStore.snapshot();
  const folder = state.folders.find((item) => item.id === folderId);
  if (!folder) return undefined;
  const next = { ...folder, name: name.trim() || folder.name };
  workspaceStore.replaceState({ ...state, folders: state.folders.map((item) => item.id === folderId ? next : item) });
  return next;
}

export function renameDocument(documentId: string, name: string): DocumentModel | undefined {
  const state = workspaceStore.snapshot();
  const document = state.documents.find((item) => item.id === documentId);
  if (!document) return undefined;
  const next = { ...document, name: name.trim() || document.name, path: name.trim() || document.path };
  workspaceStore.replaceState({ ...state, documents: state.documents.map((item) => item.id === documentId ? next : item) });
  return next;
}

export function duplicateDocument(documentId: string): DocumentModel | undefined {
  const state = workspaceStore.snapshot();
  const source = state.documents.find((item) => item.id === documentId);
  if (!source) return undefined;
  return workspaceStore.addDocument(source.folderId, `${source.name} copy`, source.content, source.language);
}

export function moveDocument(documentId: string, folderId: string): DocumentModel | undefined {
  const state = workspaceStore.snapshot();
  if (!state.folders.some((item) => item.id === folderId)) return undefined;
  const document = state.documents.find((item) => item.id === documentId);
  if (!document) return undefined;
  const next = { ...document, folderId };
  workspaceStore.replaceState({ ...state, documents: state.documents.map((item) => item.id === documentId ? next : item) });
  return next;
}

export function deleteDocument(documentId: string): boolean {
  const state = workspaceStore.snapshot();
  if (!state.documents.some((item) => item.id === documentId)) return false;
  workspaceStore.replaceState({ ...state, documents: state.documents.filter((item) => item.id !== documentId) });
  return true;
}

export function deleteFolder(folderId: string): boolean {
  const state = workspaceStore.snapshot();
  if (folderId === state.workspace.rootFolderId || !state.folders.some((item) => item.id === folderId)) return false;
  const descendants = new Set<string>([folderId]);
  let changed = true;
  while (changed) {
    changed = false;
    for (const folder of state.folders) {
      if (folder.parentId && descendants.has(folder.parentId) && !descendants.has(folder.id)) {
        descendants.add(folder.id); changed = true;
      }
    }
  }
  workspaceStore.replaceState({
    ...state,
    folders: state.folders.filter((folder) => !descendants.has(folder.id)),
    documents: state.documents.filter((document) => !descendants.has(document.folderId)),
    projects: state.projects.filter((project) => !descendants.has(project.folderId)),
  });
  return true;
}
