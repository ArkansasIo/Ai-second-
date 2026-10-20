import React, { useEffect, useMemo, useState } from 'react';
import { folderWorkspace } from './store';
import { TAB_COLORS } from './registry';
import type { FolderInstance, WorkspaceSnapshot } from './types';
import './folder-workspace.css';

export function FolderWorkspace() {
  const [snapshot, setSnapshot] = useState<WorkspaceSnapshot>(folderWorkspace.getSnapshot());
  const [activeFolderId, setActiveFolderId] = useState<string>();

  useEffect(() => {
    let mounted = true;
    const unsubscribe = folderWorkspace.subscribe(next => mounted && setSnapshot(next));
    void folderWorkspace.initialize().then(next => mounted && setSnapshot(next));
    return () => { mounted = false; unsubscribe(); };
  }, []);

  const activeFolder = useMemo(() => snapshot.folders.find(f => f.id === activeFolderId), [snapshot.folders, activeFolderId]);

  return <section className="folder-workspace" aria-label="AI Second Brain folder workspace">
    <header className="folder-workspace__toolbar">
      <div><strong>WORKSPACE / FOLDERS</strong><span>{snapshot.folders.length} folders · {snapshot.pages.length} pages · {snapshot.notes.length} notes</span></div>
      <button onClick={() => window.dispatchEvent(new CustomEvent('folder-ui:new-folder'))}>＋ New Folder</button>
    </header>
    <div className="folder-workspace__body">
      <aside className="folder-tree">
        {snapshot.folders.map(folder => <FolderRow key={folder.id} folder={folder} active={folder.id === activeFolderId} onClick={() => { setActiveFolderId(folder.id); void folderWorkspace.openFolder(folder.id); }} />)}
      </aside>
      <main className="folder-canvas">
        {activeFolder ? <OpenFolder folder={activeFolder} snapshot={snapshot} onClose={() => { void folderWorkspace.closeFolder(activeFolder.id); setActiveFolderId(undefined); }} /> : <div className="folder-empty"><span>📁</span><h2>Select a folder</h2><p>Open a colored folder to work with its document pages, files, and notes.</p></div>}
      </main>
    </div>
  </section>;
}

function FolderRow({ folder, active, onClick }: { folder: FolderInstance; active: boolean; onClick: () => void }) {
  return <button className={`folder-row ${active ? 'is-active' : ''}`} onClick={onClick} style={{ '--tab': TAB_COLORS[folder.tabColor] } as React.CSSProperties}>
    <span className="folder-row__tab" /> <span>{folder.icon}</span><strong>{folder.name}</strong><small>{folder.id}</small>
  </button>;
}

function OpenFolder({ folder, snapshot, onClose }: { folder: FolderInstance; snapshot: WorkspaceSnapshot; onClose: () => void }) {
  const pages = folder.pageIds.map(id => snapshot.pages.find(p => p.id === id)).filter(Boolean);
  return <article className={`open-folder folder-${folder.tabColor}`}>
    <div className="open-folder__cover" style={{ '--tab': TAB_COLORS[folder.tabColor] } as React.CSSProperties}>
      <div className="folder-tab">{folder.icon} {folder.name} <small>{folder.id}</small></div>
      <button onClick={onClose}>Close</button>
    </div>
    <div className="open-folder__pages">
      {pages.map((page, index) => page && <button key={page.id} className={`document-page style-${page.style}`} style={{ zIndex: pages.length - index }} onClick={() => {}}>
        <span className="page-number">{String(page.number).padStart(2, '0')}</span>
        <span className="page-icon">{page.icon}</span>
        <strong>{page.title}</strong>
        <small>{page.key} · {page.id}</small>
      </button>)}
    </div>
  </article>;
}
