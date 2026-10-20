export type BinderPageKind = 'dashboard' | 'project' | 'code' | 'brainstorm' | 'whiteboard' | 'uml' | 'flowchart' | 'state-machine' | 'data-model' | 'architecture' | 'algorithm' | 'api' | 'requirements' | 'database' | 'wireframe' | 'notes';

export type BinderPageStatus = 'draft' | 'active' | 'frozen' | 'archived';

export interface BinderPage {
  id: string;
  sectionId: string;
  title: string;
  kind: BinderPageKind;
  status: BinderPageStatus;
  content: string;
  tags: string[];
  linkedDocumentIds: string[];
  linkedTaskIds: string[];
  linkedJobIds: string[];
  createdAt: number;
  updatedAt: number;
}

export interface BinderSection {
  id: string;
  title: string;
  description: string;
  order: number;
  pageIds: string[];
}

export interface BinderWorkspace {
  id: string;
  name: string;
  sections: BinderSection[];
  pages: BinderPage[];
  activePageId?: string;
  version: number;
  updatedAt: number;
}

export function createBinderPage(sectionId: string, title: string, kind: BinderPageKind, content = ''): BinderPage {
  const now = Date.now();
  return { id: `binder-page-${now}-${Math.random().toString(36).slice(2, 8)}`, sectionId, title, kind, status: 'draft', content, tags: [], linkedDocumentIds: [], linkedTaskIds: [], linkedJobIds: [], createdAt: now, updatedAt: now };
}

export function createBinderWorkspace(name = 'AI Binder'): BinderWorkspace {
  return { id: `binder-${Date.now()}`, name, sections: [], pages: [], version: 1, updatedAt: Date.now() };
}
