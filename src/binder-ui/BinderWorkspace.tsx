import React, { useState } from 'react';
import { ProgramCanvas } from '../blueprint/ProgramCanvas';
import './binder-workspace.css';

type BinderPage = { id: string; title: string; icon: string; kind: 'page' | 'folder' | 'program' };
const pages: BinderPage[] = [
  { id: 'overview', title: 'Overview', icon: '▤', kind: 'page' },
  { id: 'tasks', title: 'Tasks', icon: '✓', kind: 'page' },
  { id: 'jobs', title: 'Jobs', icon: '⚙', kind: 'page' },
  { id: 'program', title: 'Program', icon: '◇', kind: 'program' },
  { id: 'brain', title: 'BrainScript', icon: '🧠', kind: 'page' },
  { id: 'files', title: 'Source Files', icon: '▱', kind: 'folder' },
  { id: 'docs', title: 'Documentation', icon: '▤', kind: 'folder' },
];

export function BinderWorkspace({ folderName = 'AI SECOND BRAIN' }: { folderName?: string }) {
  const [active, setActive] = useState('overview');
  const [openFolders, setOpenFolders] = useState<string[]>(['files', 'docs']);
  const activePage = pages.find(page => page.id === active) ?? pages[0];
  return <section className="binder" aria-label={`${folderName} binder`}>
    <header className="binder__cover"><div className="binder__rings" aria-hidden="true"><i/><i/><i/><i/><i/></div><div><span className="binder__label">PROJECT BINDER</span><h1>{folderName}</h1><p>Pages · folders · programs · tasks · jobs</p></div><span className="binder__key">BINDER-001</span></header>
    <div className="binder__body">
      <nav className="binder__index" aria-label="Binder pages"><div className="binder__index-title">INDEX</div>
        {pages.map(page => <React.Fragment key={page.id}><button className={`binder__tab ${active === page.id ? 'active' : ''} kind-${page.kind}`} onClick={() => page.kind !== 'folder' ? setActive(page.id) : setOpenFolders(current => current.includes(page.id) ? current.filter(id => id !== page.id) : [...current, page.id])}><span>{page.icon}</span>{page.title}{page.kind === 'folder' && <em>{openFolders.includes(page.id) ? '−' : '+'}</em>}</button>{page.kind === 'folder' && openFolders.includes(page.id) && <div className="binder__subpages"><button onClick={() => setActive(page.id)}>.index</button><button onClick={() => setActive(page.id)}>.registry</button><button onClick={() => setActive(page.id)}>.config</button></div>}</React.Fragment>)}
        <button className="binder__new" onClick={() => setActive('tasks')}>＋ New Page</button>
      </nav>
      <main className="binder__page"><header className="binder__page-header"><span>{activePage.icon} {activePage.kind.toUpperCase()}</span><h2>{activePage.title}</h2><small>PAGE-{active.toUpperCase()}</small></header><div className="binder__paper">{active === 'program' ? <ProgramCanvas title={`${folderName} Program`} /> : <><div className="binder__lines"/><div className="binder__placeholder"><strong>{activePage.title}</strong><p>This binder page is ready for content, tasks, jobs, files, and agent work.</p><div className="binder__actions"><button onClick={() => setActive('tasks')}>＋ Task</button><button onClick={() => setActive('jobs')}>＋ Job</button><button onClick={() => setActive('program')}>◇ Open Program Canvas</button></div></div></>}</div></main>
    </div>
  </section>;
}
