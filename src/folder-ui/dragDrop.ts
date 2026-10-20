export interface DragPayload { type: 'folder' | 'page' | 'file' | 'note'; id: string; sourceId?: string; }
export function encodeDragPayload(payload: DragPayload): string { return JSON.stringify(payload); }
export function decodeDragPayload(value: string): DragPayload | null { try { const parsed = JSON.parse(value) as DragPayload; if (!parsed?.type || !parsed?.id) return null; return parsed; } catch { return null; } }
export function reorder<T>(items: T[], from: number, to: number): T[] { if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) return items; const next = [...items]; const [item] = next.splice(from, 1); next.splice(to, 0, item); return next; }
