export type FolderState = 'closed' | 'opening' | 'open' | 'closing';
export type DocumentStyle = 'lined' | 'plain' | 'grid' | 'graph' | 'code' | 'terminal' | 'form' | 'report' | 'sticky';
export type FolderView = 'grid' | 'list' | 'tree' | 'document' | 'graph' | 'report';
export type TabColor = 'red' | 'blue' | 'green' | 'yellow' | 'orange' | 'purple' | 'cyan' | 'pink' | 'gray' | 'black' | 'white';

export interface FolderDefinition {
  id: string; number: number; name: string; key: string; icon: string; tabColor: TabColor;
  parentId?: string; route: string; documentStyle: DocumentStyle; defaultView: FolderView;
  allowFiles: boolean; allowSubfolders: boolean; allowStickyNotes: boolean; allowDocuments: boolean;
}

export interface FolderPage {
  id: string; number: number; name: string; key: string; folderId: string;
  title: string; icon: string; style: DocumentStyle; content: string;
  fileIds: string[]; stickyNoteIds: string[]; locked: boolean; pinned: boolean;
  createdAt: string; updatedAt: string;
}

export interface FolderInstance extends FolderDefinition {
  state: FolderState; pageIds: string[]; childFolderIds: string[];
  activePageId?: string; selectedItemId?: string; createdAt: string; updatedAt: string;
}

export interface StickyNote {
  id: string; number: number; name: string; title: string; content: string; color: TabColor;
  folderId?: string; pageId?: string; x: number; y: number; zIndex: number;
  pinned: boolean; completed: boolean; tags: string[]; createdAt: string; updatedAt: string;
}

export interface WorkspaceSnapshot {
  folders: FolderInstance[]; pages: FolderPage[]; notes: StickyNote[]; version: number; updatedAt: string;
}
