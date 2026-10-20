export type DiagramKind = 'uml-class' | 'uml-use-case' | 'uml-sequence' | 'flowchart' | 'state-machine' | 'data-model' | 'architecture' | 'algorithm' | 'api-design' | 'wireframe';

export interface DiagramNode { id: string; type: string; label: string; x: number; y: number; data?: Record<string, unknown>; }
export interface DiagramEdge { id: string; source: string; target: string; label?: string; type?: string; }
export interface DiagramDocument { id: string; title: string; kind: DiagramKind; nodes: DiagramNode[]; edges: DiagramEdge[]; revision: number; updatedAt: string; }

export class DiagramDocumentStore {
  private documents = new Map<string, DiagramDocument>();
  constructor(private readonly clock: () => string = () => new Date().toISOString()) {}

  create(title: string, kind: DiagramKind): DiagramDocument {
    const id = `diagram-${crypto.randomUUID()}`;
    const document: DiagramDocument = {id, title, kind, nodes: [], edges: [], revision: 1, updatedAt: this.clock()};
    this.documents.set(id, document);
    return document;
  }

  update(id: string, patch: Partial<Pick<DiagramDocument, 'title' | 'nodes' | 'edges'>>): DiagramDocument {
    const current = this.documents.get(id);
    if (!current) throw new Error(`Diagram not found: ${id}`);
    const next = {...current, ...patch, revision: current.revision + 1, updatedAt: this.clock()};
    this.documents.set(id, next);
    return next;
  }

  get(id: string): DiagramDocument | undefined { return this.documents.get(id); }
  list(): DiagramDocument[] { return [...this.documents.values()]; }
  remove(id: string): boolean { return this.documents.delete(id); }

  exportJson(id: string): string {
    const document = this.documents.get(id);
    if (!document) throw new Error(`Diagram not found: ${id}`);
    return JSON.stringify(document, null, 2);
  }
}

export const diagramDocumentStore = new DiagramDocumentStore();
