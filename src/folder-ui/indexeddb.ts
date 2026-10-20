import type { FolderInstance, FolderPage, StickyNote, WorkspaceSnapshot } from './types';

const DB_NAME = 'ai-second-brain-workspace';
const DB_VERSION = 1;
const STORE = 'workspace';
const KEY = 'snapshot';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Unable to open IndexedDB'));
  });
}

export async function loadWorkspace(): Promise<WorkspaceSnapshot | null> {
  if (typeof indexedDB === 'undefined') return null;
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction(STORE, 'readonly').objectStore(STORE).get(KEY);
    request.onsuccess = () => resolve((request.result as WorkspaceSnapshot | undefined) ?? null);
    request.onerror = () => reject(request.error);
  });
}

export async function saveWorkspace(snapshot: WorkspaceSnapshot): Promise<void> {
  if (typeof indexedDB === 'undefined') return;
  const db = await openDatabase();
  await new Promise<void>((resolve, reject) => {
    const request = db.transaction(STORE, 'readwrite').objectStore(STORE).put(snapshot, KEY);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export function createSnapshot(folders: FolderInstance[], pages: FolderPage[], notes: StickyNote[]): WorkspaceSnapshot {
  return { folders, pages, notes, version: 1, updatedAt: new Date().toISOString() };
}
