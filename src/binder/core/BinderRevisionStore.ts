export interface BinderRevision {
  id: string;
  documentId: string;
  revision: number;
  content: string;
  author: string;
  createdAt: string;
  message: string;
}

export class BinderRevisionStore {
  private revisions = new Map<string, BinderRevision[]>();

  constructor(private readonly clock: () => string = () => new Date().toISOString()) {}

  commit(documentId: string, content: string, author = 'local-user', message = 'Update document'): BinderRevision {
    const history = this.revisions.get(documentId) ?? [];
    const revision: BinderRevision = {
      id: `${documentId}-r${history.length + 1}`,
      documentId,
      revision: history.length + 1,
      content,
      author,
      createdAt: this.clock(),
      message,
    };
    history.push(revision);
    this.revisions.set(documentId, history);
    return revision;
  }

  history(documentId: string): BinderRevision[] {
    return [...(this.revisions.get(documentId) ?? [])];
  }

  latest(documentId: string): BinderRevision | undefined {
    const history = this.revisions.get(documentId);
    return history?.at(-1);
  }

  restore(documentId: string, revision: number): BinderRevision | undefined {
    return this.revisions.get(documentId)?.find(item => item.revision === revision);
  }
}
