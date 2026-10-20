import type { BinderPage, BinderPageKind, BinderSection, BinderWorkspace } from './binderTypes';
import { createBinderPage, createBinderWorkspace } from './binderTypes';

const STORAGE_KEY = 'ai-binder.workspace.v1';

function storage(): Storage | null {
  return typeof localStorage === 'undefined' ? null : localStorage;
}

function seed(): BinderWorkspace {
  const workspace = createBinderWorkspace();
  const definitions: Array<[string, string]> = [
    ['dashboard', 'Dashboard'], ['projects', 'Projects'], ['github', 'GitHub'], ['blueprints', 'Blueprints'], ['agents', 'Agents'], ['memory', 'Memory'], ['extensions', 'Extensions'], ['releases', 'Releases'],
  ];
  workspace.sections = definitions.map(([id, title], order): BinderSection => ({ id, title, description: `${title} binder section`, order, pageIds: [] }));
  return workspace;
}

export class BinderStore {
  private workspace: BinderWorkspace;
  private listeners = new Set<() => void>();

  constructor() { this.workspace = this.load(); }

  private load(): BinderWorkspace {
    const raw = storage()?.getItem(STORAGE_KEY);
    if (!raw) return seed();
    try { return JSON.parse(raw) as BinderWorkspace; } catch { return seed(); }
  }

  private persist() {
    this.workspace.version += 1;
    this.workspace.updatedAt = Date.now();
    storage()?.setItem(STORAGE_KEY, JSON.stringify(this.workspace));
    this.listeners.forEach((listener) => listener());
  }

  snapshot(): BinderWorkspace { return JSON.parse(JSON.stringify(this.workspace)) as BinderWorkspace; }
  subscribe(listener: () => void) { this.listeners.add(listener); return () => this.listeners.delete(listener); }

  section(sectionId: string) { return this.workspace.sections.find((section) => section.id === sectionId); }
  page(pageId: string) { return this.workspace.pages.find((page) => page.id === pageId); }

  createPage(sectionId: string, title: string, kind: BinderPageKind, content = ''): BinderPage {
    if (!this.section(sectionId)) throw new Error(`Unknown binder section: ${sectionId}`);
    const page = createBinderPage(sectionId, title, kind, content);
    this.workspace.pages.push(page);
    this.section(sectionId)!.pageIds.push(page.id);
    this.workspace.activePageId = page.id;
    this.persist();
    return page;
  }

  updatePage(pageId: string, patch: Partial<Pick<BinderPage, 'title' | 'content' | 'status' | 'tags' | 'linkedDocumentIds' | 'linkedTaskIds' | 'linkedJobIds'>>) {
    const page = this.page(pageId);
    if (!page) throw new Error(`Unknown binder page: ${pageId}`);
    if (page.status === 'frozen' && patch.content !== undefined) throw new Error('Binder page is frozen');
    Object.assign(page, patch, { updatedAt: Date.now() });
    this.persist();
  }

  setActive(pageId: string) { if (!this.page(pageId)) throw new Error(`Unknown binder page: ${pageId}`); this.workspace.activePageId = pageId; this.persist(); }
  freeze(pageId: string) { this.updatePage(pageId, { status: 'frozen' }); }
  unfreeze(pageId: string) { this.updatePage(pageId, { status: 'active' }); }
  archive(pageId: string) { this.updatePage(pageId, { status: 'archived' }); }
  reset() { this.workspace = seed(); this.persist(); }
}

export const binderStore = new BinderStore();
