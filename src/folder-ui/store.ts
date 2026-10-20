import { FOLDER_REGISTRY, makeId } from './registry';
import { createSnapshot, loadWorkspace, saveWorkspace } from './indexeddb';
import type { FolderInstance, FolderPage, StickyNote, WorkspaceSnapshot } from './types';

export class FolderWorkspaceStore {
  private snapshot: WorkspaceSnapshot = { folders: [], pages: [], notes: [], version: 1, updatedAt: new Date().toISOString() };
  private listeners = new Set<(snapshot: WorkspaceSnapshot) => void>();

  async initialize(): Promise<WorkspaceSnapshot> {
    const stored = await loadWorkspace();
    if (stored) this.snapshot = stored;
    else {
      const now = new Date().toISOString();
      this.snapshot.folders = FOLDER_REGISTRY.map(def => ({ ...def, state: 'closed', pageIds: [], childFolderIds: [], createdAt: now, updatedAt: now }));
      this.snapshot.pages = this.snapshot.folders.map((folder, index) => {
        const page: FolderPage = { id: `PAGE-${String(index + 1).padStart(4, '0')}`, number: 1, name: 'Overview', key: 'overview', folderId: folder.id, title: `${folder.name} Overview`, icon: '📄', style: folder.documentStyle, content: '', fileIds: [], stickyNoteIds: [], locked: false, pinned: false, createdAt: now, updatedAt: now };
        folder.pageIds = [page.id];
        folder.activePageId = page.id;
        return page;
      });
      await this.persist();
    }
    this.emit();
    return this.snapshot;
  }

  subscribe(listener: (snapshot: WorkspaceSnapshot) => void) { this.listeners.add(listener); return () => this.listeners.delete(listener); }
  getSnapshot() { return this.snapshot; }

  async openFolder(id: string) { this.updateFolder(id, { state: 'open' }); }
  async closeFolder(id: string) { this.updateFolder(id, { state: 'closed' }); }

  async addPage(folderId: string, page: Omit<FolderPage, 'id' | 'number' | 'folderId' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const existing = this.snapshot.pages.filter(p => p.folderId === folderId);
    const created: FolderPage = { ...page, id: makeId('PAGE'), number: existing.length + 1, folderId, createdAt: now, updatedAt: now };
    this.snapshot.pages = [...this.snapshot.pages, created];
    this.snapshot.folders = this.snapshot.folders.map(f => f.id === folderId ? { ...f, pageIds: [...f.pageIds, created.id], activePageId: created.id, updatedAt: now } : f);
    await this.persist();
    return created;
  }

  async reorderPages(folderId: string, pageIds: string[]) {
    const valid = new Set(this.snapshot.pages.filter(p => p.folderId === folderId).map(p => p.id));
    const ordered = pageIds.filter(id => valid.has(id));
    this.snapshot.folders = this.snapshot.folders.map(f => f.id === folderId ? { ...f, pageIds: ordered, updatedAt: new Date().toISOString() } : f);
    this.snapshot.pages = this.snapshot.pages.map(p => p.folderId === folderId ? { ...p, number: ordered.indexOf(p.id) + 1, updatedAt: new Date().toISOString() } : p);
    await this.persist();
  }

  async upsertNote(note: StickyNote) {
    const index = this.snapshot.notes.findIndex(n => n.id === note.id);
    this.snapshot.notes = index < 0 ? [...this.snapshot.notes, note] : this.snapshot.notes.map((n, i) => i === index ? note : n);
    await this.persist();
  }

  private updateFolder(id: string, patch: Partial<FolderInstance>) {
    this.snapshot.folders = this.snapshot.folders.map(f => f.id === id ? { ...f, ...patch, updatedAt: new Date().toISOString() } : f);
    void this.persist();
  }

  private async persist() { this.snapshot = createSnapshot(this.snapshot.folders, this.snapshot.pages, this.snapshot.notes); await saveWorkspace(this.snapshot); this.emit(); }
  private emit() { this.listeners.forEach(listener => listener(this.snapshot)); }
}

export const folderWorkspace = new FolderWorkspaceStore();
