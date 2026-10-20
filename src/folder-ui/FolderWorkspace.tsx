import React, { useEffect, useMemo, useState } from 'react';
import { folderWorkspace } from './store';
import { TAB_COLORS } from './registry';
import { importBrowserFiles, formatFileSize } from './fileImport';
import type { FolderInstance, FolderPage, WorkspaceSnapshot } from './types';
import { PageEditor } from './PageEditor';
import './folder-workspace.css';

export function FolderWorkspace() {
  const [snapshot, setSnapshot] = useState<WorkspaceSnapshot>(folderWorkspace.getSnapshot());
  const [activeFolderId, setActiveFolderId] = useState<string>();
  const [editingPageId, setEditingPageId] = useState<string>();
  const [draggedPageId, setDraggedPageId] = useState<string>();
  const [dropActive, setDropActive] = useState(false);

  useEffect(() => {
    let mounted = true;
    const unsubscribe = folderWorkspace.subscribe(next => mounted && setSnapshot(next));
    void folderWorkspace.initialize().then(next => mounted && setSnapshot(next));
    return () => { mounted = false; unsubscribe(); };
  }, []);

  const activeFolder = useMemo(() => snapshot.folders.find(f => f.id === activeFolderId), [snapshot.folders, activeFolderId]);
  const editingPage = editingPageId ? snapshot.pages.find(page => page.id === editingPageId) : undefined;

  async function importFiles(files: FileList | File[]) {
    const records = await importBrowserFiles(files);
    if (!activeFolder || !records.length) return;
    const page = snapshot.pages.find(item => item.id === activeFolder.activePageId) ?? snapshot.pages.find(item => item.folderId === activeFolder.id);
    if (!page) return;
    const next = { ...snapshot, pages: snapshot.pages.map(item => item.id === page.id ? { ...item, fileIds: [...item.fileIds, ...records.map(file => file.id)], updatedAt: new Date().toISOString() } : item) };
    await folderWorkspace.replaceSnapshot(next);
  }

  return <section className="folder-workspace" aria-label="AI Second Brain folder workspace">
    <header className="folder-workspace__toolbar">
      <div><strong>WORKSPACE / FOLDERS</strong><span>{snapshot.folders.length} folders · {snapshot.pages.length} pages · {snapshot.notes.length} notes</span></div>
      <label className="file-import-button">＋ Import Files<input type="file" multiple onChange={event => { if (event.target.files) void importFiles(event.target.files); event.currentTarget.value = ''; }} /></label>
    </header>
    <div className="folder-workspace__body">
      <aside className="folder-tree" aria-label="Folders">
        {snapshot.folders.map(folder => <FolderRow key={folder.id} folder={folder} active={folder.id === activeFolderId} onClick={() => { setActiveFolderId(folder.id); void folderWorkspace.openFolder(folder.id); }} />)}
      </aside>
      <main className={`folder-canvas ${dropActive ? 'is-drop-target' : ''}`} onDragOver={event => { if (event.dataTransfer.types.includes('Files')) { event.preventDefault(); setDropActive(true); } }} onDragLeave={() => setDropActive(false)} onDrop={event => { event.preventDefault(); setDropActive(false); if (event.dataTransfer.files.length) void importFiles(event.dataTransfer.files); }}>
        {activeFolder ? <OpenFolder folder={activeFolder} snapshot={snapshot} draggedPageId={draggedPageId} onDragStart={setDraggedPageId} onDragEnd={() => setDraggedPageId(undefined)} onDropPage={(targetId) => { if (!draggedPageId || draggedPageId === targetId) return; const ids = [...activeFolder.pageIds]; const from = ids.indexOf(draggedPageId); const to = ids.indexOf(targetId); if (from >= 0 && to >= 0) { ids.splice(from, 1); ids.splice(to, 0, draggedPageId); void folderWorkspace.reorderPages(activeFolder.id, ids); } }} onEdit={setEditingPageId} onClose={() => { void folderWorkspace.closeFolder(activeFolder.id); setActiveFolderId(undefined); }} /> : <div className="folder-empty"><span>📁</span><h2>Select a folder</h2><p>Open a colored folder to work with documents, files, and notes.</p></div>}
      </main>
    </div>
    {editingPage && activeFolder && <PageEditor page={editingPage} snapshot={snapshot} onClose={() => setEditingPageId(undefined)} />}
  </section>;
}

function FolderRow({ folder, active, onClick }: { folder: FolderInstance; active: boolean; onClick: () => void }) {
  return <button className={`folder-row ${active ? 'is-active' : ''}`} onClick={onClick} style={{ '--tab': TAB_COLORS[folder.tabColor] } as React.CSSProperties}>
    <span className="folder-row__tab" /> <span>{folder.icon}</span><strong>{folder.name}</strong><small>{folder.id}</small>
  </button>;
}

interface OpenFolderProps {
  folder: FolderInstance;
  snapshot: WorkspaceSnapshot;
  draggedPageId?: string;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDropPage: (id: string) => void;
  onEdit: (id: string) => void;
  onClose: () => void;
}

function OpenFolder({ folder, snapshot, draggedPageId, onDragStart, onDragEnd, onDropPage, onEdit, onClose }: OpenFolderProps) {
  const pages = folder.pageIds.map(id => snapshot.pages.find(p => p.id === id)).filter((page): page is FolderPage => Boolean(page));
  return <article className={`open-folder folder-${folder.tabColor}`}>
    <div className="open-folder__cover" style={{ '--tab': TAB_COLORS[folder.tabColor] } as React.CSSProperties}>
      <div className="folder-tab">{folder.icon} {folder.name} <small>{folder.id}</small></div>
      <button onClick={onClose}>Close</button>
    </div>
    <div className="open-folder__pages">
      {pages.map((page, index) => <button key={page.id} draggable={!page.locked} onDragStart={() => onDragStart(page.id)} onDragEnd={onDragEnd} onDragOver={event => event.preventDefault()} onDrop={() => onDropPage(page.id)} className={`document-page style-${page.style} ${draggedPageId === page.id ? 'is-dragged' : ''}`} style={{ zIndex: pages.length - index }} onClick={() => onEdit(page.id)}>
        <span className="page-number">{String(page.number).padStart(2, '0')}</span><span className="page-icon">{page.icon}</span><strong>{page.title}</strong><small>{page.key} · {page.id}</small>
        {page.fileIds.length > 0 && <span className="page-file-count">📎 {page.fileIds.length} files</span>}
      </button>)}
      <div className="folder-file-hint">Drop files anywhere in the folder to import them.</div>
    </div>
  </article>;
}

export function ImportedFileSummary({ name, size }: { name: string; size: number }) {
  return <span>{name} · {formatFileSize(size)}</span>;
}
