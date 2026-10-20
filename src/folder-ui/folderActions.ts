import { folderWorkspace } from './store';
import { reorder } from './dragDrop';

export function movePage(folderId: string, from: number, to: number) {
  const folder = folderWorkspace.getSnapshot().folders.find(item => item.id === folderId);
  if (!folder) return;
  const pageIds = reorder(folder.pageIds, from, to);
  void folderWorkspace.updateFolder(folderId, { pageIds });
}

export function addPage(folderId: string, pageId: string) {
  const folder = folderWorkspace.getSnapshot().folders.find(item => item.id === folderId);
  if (!folder || folder.pageIds.includes(pageId)) return;
  void folderWorkspace.updateFolder(folderId, { pageIds: [...folder.pageIds, pageId] });
}

export function removePage(folderId: string, pageId: string) {
  const folder = folderWorkspace.getSnapshot().folders.find(item => item.id === folderId);
  if (!folder) return;
  void folderWorkspace.updateFolder(folderId, { pageIds: folder.pageIds.filter(id => id !== pageId) });
}
