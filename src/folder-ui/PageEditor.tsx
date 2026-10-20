import React, { useEffect, useState } from 'react';
import { folderWorkspace } from './store';
import type { FolderPage, WorkspaceSnapshot } from './types';

interface PageEditorProps {
  page: FolderPage;
  snapshot: WorkspaceSnapshot;
  onClose: () => void;
}

export function PageEditor({ page, snapshot, onClose }: PageEditorProps) {
  const [title, setTitle] = useState(page.title);
  const [content, setContent] = useState(page.content);
  const [style, setStyle] = useState(page.style);

  useEffect(() => {
    setTitle(page.title);
    setContent(page.content);
    setStyle(page.style);
  }, [page.id, page.title, page.content, page.style]);

  async function save() {
    const next: FolderPage = { ...page, title: title.trim() || page.title, content, style, updatedAt: new Date().toISOString() };
    const pages = snapshot.pages.map(item => item.id === page.id ? next : item);
    const nextSnapshot = { ...snapshot, pages, updatedAt: new Date().toISOString() };
    await folderWorkspace.replaceSnapshot(nextSnapshot);
    onClose();
  }

  return <div className="page-editor" role="dialog" aria-modal="true" aria-label={`Edit ${page.title}`}>
    <div className="page-editor__toolbar">
      <strong>{page.id}</strong>
      <div><button onClick={onClose}>Cancel</button><button className="primary" onClick={save}>Save Document</button></div>
    </div>
    <label>Title<input value={title} onChange={event => setTitle(event.target.value)} /></label>
    <label>Document style<select value={style} onChange={event => setStyle(event.target.value as FolderPage['style'])}>{['lined','plain','grid','graph','code','terminal','form','report','sticky'].map(value => <option key={value} value={value}>{value}</option>)}</select></label>
    <label>Content<textarea value={content} onChange={event => setContent(event.target.value)} rows={18} spellCheck /></label>
  </div>;
}
