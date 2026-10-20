import type {BinderPage, BinderWorkspace} from './binderTypes';

export interface BinderDocumentRecord {
  id: string;
  pageId: string;
  title: string;
  content: string;
  revision: number;
  updatedAt: string;
  tags: string[];
}

export class BinderDocumentRepository {
  private documents = new Map<string, BinderDocumentRecord>();

  constructor(private readonly clock: () => string = () => new Date().toISOString()) {}

  seed(workspace: BinderWorkspace): void {
    for (const section of workspace.sections) {
      for (const page of section.pages) this.ensurePage(page);
    }
  }

  ensurePage(page: BinderPage): BinderDocumentRecord {
    const existing = this.documents.get(page.id);
    if (existing) return existing;
    const record: BinderDocumentRecord = {
      id: `doc-${page.id}`,
      pageId: page.id,
      title: page.title,
      content: page.content ?? '',
      revision: 1,
      updatedAt: this.clock(),
      tags: [],
    };
    this.documents.set(page.id, record);
    return record;
  }

  get(pageId: string): BinderDocumentRecord | undefined {
    return this.documents.get(pageId);
  }

  upsert(pageId: string, patch: Partial<Pick<BinderDocumentRecord, 'title' | 'content' | 'tags'>>): BinderDocumentRecord {
    const current = this.documents.get(pageId) ?? {
      id: `doc-${pageId}`,
      pageId,
      title: pageId,
      content: '',
      revision: 0,
      updatedAt: this.clock(),
      tags: [],
    };
    const next = {...current, ...patch, revision: current.revision + 1, updatedAt: this.clock()};
    this.documents.set(pageId, next);
    return next;
  }

  list(): BinderDocumentRecord[] {
    return [...this.documents.values()].sort((a, b) => a.title.localeCompare(b.title));
  }

  search(query: string): BinderDocumentRecord[] {
    const needle = query.trim().toLowerCase();
    if (!needle) return this.list();
    return this.list().filter(d => `${d.title} ${d.content} ${d.tags.join(' ')}`.toLowerCase().includes(needle));
  }
}
