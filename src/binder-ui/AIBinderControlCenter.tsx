import React, { useMemo, useState } from 'react';
import './ai-binder-control-center.css';

type BinderPageKind = 'dashboard' | 'project' | 'code' | 'brainstorm' | 'whiteboard' | 'uml' | 'flowchart' | 'state-machine' | 'data-model' | 'architecture' | 'algorithm' | 'api' | 'requirements' | 'database' | 'wireframe' | 'notes';

type BinderSection = {
  id: string;
  label: string;
  description: string;
  pages: BinderPageKind[];
};

const sections: BinderSection[] = [
  { id: 'dashboard', label: 'Dashboard', description: 'Command-center overview and active work.', pages: ['dashboard', 'notes'] },
  { id: 'projects', label: 'Projects', description: 'Persistent project workspaces and source trees.', pages: ['project', 'code', 'requirements', 'notes'] },
  { id: 'github', label: 'GitHub', description: 'Repositories, issues, pull requests, actions, and releases.', pages: ['project', 'code', 'requirements'] },
  { id: 'blueprints', label: 'Blueprints', description: 'Program Studio, diagrams, architecture, and design drafts.', pages: ['brainstorm', 'whiteboard', 'uml', 'flowchart', 'state-machine', 'data-model', 'architecture', 'algorithm', 'api', 'wireframe'] },
  { id: 'agents', label: 'Agents', description: 'Agent roles, policies, tools, tasks, and jobs.', pages: ['project', 'requirements', 'notes'] },
  { id: 'memory', label: 'Memory', description: 'Conversation, project context, provenance, and audit records.', pages: ['notes', 'data-model'] },
  { id: 'extensions', label: 'Extensions', description: 'SDK, plugins, providers, Search, Math, and integrations.', pages: ['api', 'architecture', 'notes'] },
  { id: 'releases', label: 'Releases', description: 'Versions, channels, packages, migrations, and checksums.', pages: ['requirements', 'architecture', 'notes'] },
];

const pageLabels: Record<BinderPageKind, string> = {
  dashboard: 'Dashboard', project: 'Project', code: 'Source Code', brainstorm: 'Brain Idea Storm', whiteboard: 'Whiteboard', uml: 'UML', flowchart: 'Flowchart', 'state-machine': 'State Machine', 'data-model': 'Data Model', architecture: 'Architecture', algorithm: 'Algorithm', api: 'API Design', requirements: 'Requirements', database: 'Database Draft', wireframe: 'UI Wireframe', notes: 'Technical Notes',
};

export function AIBinderControlCenter() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [page, setPage] = useState<BinderPageKind>('dashboard');
  const [frozen, setFrozen] = useState(false);
  const [filter, setFilter] = useState('');
  const section = sections.find((item) => item.id === activeSection) ?? sections[0];
  const visibleSections = useMemo(() => sections.filter((item) => `${item.label} ${item.description}`.toLowerCase().includes(filter.toLowerCase())), [filter]);

  const selectSection = (id: string) => {
    const next = sections.find((item) => item.id === id) ?? sections[0];
    setActiveSection(next.id);
    setPage(next.pages[0]);
  };

  return (
    <section className="ai-binder panel">
      <header className="ai-binder__cover">
        <div>
          <span className="ai-binder__eyebrow">AI BINDER · WORKSPACE</span>
          <h2>AI Binder</h2>
          <p>Physical-binder workspace for projects, source, design pages, agents, memory, and Brain LLM workflows.</p>
        </div>
        <div className="ai-binder__controls">
          <input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="Find binder section…" aria-label="Find binder section" />
          <button type="button" onClick={() => setFrozen((value) => !value)}>{frozen ? 'Unfreeze Binder' : 'Freeze Binder'}</button>
        </div>
      </header>

      <div className="ai-binder__body">
        <nav className="ai-binder__tabs" aria-label="Binder sections">
          {visibleSections.map((item) => <button key={item.id} type="button" className={item.id === activeSection ? 'is-active' : ''} onClick={() => selectSection(item.id)}>{item.label}</button>)}
        </nav>

        <div className="ai-binder__workspace">
          <aside className="ai-binder__index">
            <div className="ai-binder__index-title">{section.label}</div>
            <p>{section.description}</p>
            {section.pages.map((kind) => <button key={kind} type="button" className={kind === page ? 'is-selected' : ''} onClick={() => setPage(kind)}>{pageLabels[kind]}</button>)}
          </aside>
          <article className="ai-binder__page">
            <div className="ai-binder__page-head"><span>PAGE {String(section.pages.indexOf(page) + 1).padStart(2, '0')}</span><strong>{pageLabels[page]}</strong><span>{frozen ? 'FROZEN' : 'EDITABLE'}</span></div>
            <div className="ai-binder__paper">
              <h3>{pageLabels[page]}</h3>
              <p>This binder page is a persistent design surface. Connect it to Workspace documents, Program Studio, BrainScript, agents, jobs, tools, and release artifacts.</p>
              <div className="ai-binder__actions">
                <button type="button" disabled={frozen}>Edit Page</button>
                <button type="button">Open Document</button>
                <button type="button">Send to Program Studio</button>
                <button type="button">Create Task</button>
              </div>
              <div className="ai-binder__grid">
                <div><b>Inputs</b><span>Documents · prompts · diagrams · requirements</span></div>
                <div><b>AI</b><span>Brain LLM · agents · tools · memory</span></div>
                <div><b>Outputs</b><span>Source · tasks · jobs · artifacts · documentation</span></div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
