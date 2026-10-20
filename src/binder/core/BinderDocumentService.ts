import {binderStore} from './BinderStore';
import {BinderDocumentRepository, type BinderDocumentRecord} from './BinderDocumentRepository';
import {BinderRevisionStore} from './BinderRevisionStore';

export class BinderDocumentService {
  constructor(
    readonly documents = new BinderDocumentRepository(),
    readonly revisions = new BinderRevisionStore(),
  ) {}

  sync(): void {
    for (const page of binderStore.snapshot().pages) this.documents.ensurePage(page);
  }

  open(pageId: string): BinderDocumentRecord {
    const page = binderStore.page(pageId);
    if (!page) throw new Error(`Unknown binder page: ${pageId}`);
    return this.documents.ensurePage(page);
  }

  save(pageId: string, patch: {title?: string; content?: string; tags?: string[]}): BinderDocumentRecord {
    const page = binderStore.page(pageId);
    if (!page) throw new Error(`Unknown binder page: ${pageId}`);
    if (page.status === 'frozen' && patch.content !== undefined) throw new Error('Binder page is frozen');
    const current = this.open(pageId);
    const next = this.documents.upsert(pageId, patch);
    if (patch.content !== undefined && patch.content !== current.content) this.revisions.commit(pageId, patch.content, 'local-user', 'Update binder document');
    binderStore.updatePage(pageId, {title: next.title, content: next.content, tags: next.tags});
    return next;
  }

  search(query: string): BinderDocumentRecord[] { return this.documents.search(query); }
}

export const binderDocumentService = new BinderDocumentService();
