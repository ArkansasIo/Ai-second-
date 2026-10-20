export interface EditableDocument { id: string; title: string; style: string; content: string; updatedAt: string; }
export function updateDocument(document: EditableDocument, patch: Partial<Pick<EditableDocument, 'title' | 'style' | 'content'>>): EditableDocument { return { ...document, ...patch, updatedAt: new Date().toISOString() }; }
export function createDocument(folderId: string, title = 'New Document', style = 'plain'): EditableDocument { return { id: `DOC-${crypto.randomUUID()}`, title, style, content: '', updatedAt: new Date().toISOString() }; }
