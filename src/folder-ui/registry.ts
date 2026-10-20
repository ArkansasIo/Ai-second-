import type { DocumentStyle, FolderDefinition, TabColor } from './types';

export const TAB_COLORS: Record<TabColor, string> = {
  red: '#ef4444', blue: '#3b82f6', green: '#22c55e', yellow: '#eab308', orange: '#f97316',
  purple: '#a855f7', cyan: '#06b6d4', pink: '#ec4899', gray: '#6b7280', black: '#111827', white: '#f8fafc'
};

export const DOCUMENT_STYLES: Record<DocumentStyle, string> = {
  lined: 'lined', plain: 'plain', grid: 'grid', graph: 'graph', code: 'code', terminal: 'terminal',
  form: 'form', report: 'report', sticky: 'sticky'
};

export const FOLDER_REGISTRY: FolderDefinition[] = [
  ['Dashboard','blue','📊','report','grid'],
  ['Projects','green','📁','lined','grid'],
  ['GitHub','black','🐙','code','tree'],
  ['Agents','purple','🤖','plain','grid'],
  ['Development','orange','🛠️','code','tree'],
  ['Files','yellow','🗂️','plain','grid'],
  ['Reports','red','📑','report','list'],
  ['Settings','gray','⚙️','plain','list']
].map(([name, tabColor, icon, documentStyle, defaultView], index) => ({
  id: `FOLDER-${String(index + 1).padStart(3, '0')}`,
  number: index + 1,
  name,
  key: name.toLowerCase(),
  icon,
  tabColor: tabColor as TabColor,
  route: `/${name.toLowerCase()}`,
  documentStyle: documentStyle as DocumentStyle,
  defaultView: defaultView as FolderDefinition['defaultView'],
  allowFiles: true,
  allowSubfolders: true,
  allowStickyNotes: name !== 'Settings',
  allowDocuments: true
}));

export const makeId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;
