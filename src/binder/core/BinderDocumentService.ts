import {binderStore, type BinderPage} from './BinderStore';
import {BinderDocumentRepository, type BinderDocumentRecord} from './BinderDocumentRepository';
import {BinderRevisionStore} from './BinderRevisionStore';

export class BinderDocumentService {
  constructor(
    readonly documents = new BinderDocumentRepository(),
    readonly revisions = new BinderRevisionStore(),
  ) {}

  sync(): void {
    documentsSeed(this.documents, binderStore.snapshot());
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
    this.revisions.record(pageId, current.content, next.content);
    binderStore.updatePage(pageId, {title: next.title, content: next.content, tags: next.tags});
    return next;
  }

  search(query: string): BinderDocumentRecord[] { return this.documents.search(query); }
}

function documentsSeed(repository: BinderDocumentRepository, workspace: ReturnType<typeof binderStore.snapshot>): void {
  for (const page of workspace.pages) repository.ensurePage(page as BinderPage);
}

export const binderDocumentService = new BinderDocumentService();
