import React from 'react';
import { getPageDesign, type PageAction, type PagePanel } from './pageRegistry';
import './page-design.css';

export function PageDesign({ page, onAction }: { page: string; onAction?: (action: PageAction, panel?: PagePanel) => void }) {
  const design = getPageDesign(page);
  return <section className={`designed-page layout-${design.layout} accent-${design.accent}`} aria-label={`${design.title} page`}>
    <header className="designed-page__header">
      <div className="designed-page__identity"><span className="designed-page__eyebrow">{design.eyebrow}</span><h2>{design.title}</h2><p>{design.description}</p></div>
      <div className="designed-page__actions">{design.primaryActions.map(action => <ActionButton key={action.id} action={action} onClick={() => onAction?.(action)} />)}</div>
    </header>
    <div className="designed-page__toolbar"><button>⌕ Search</button><button>≡ Filters</button><button>▦ View</button><span className="toolbar-spacer"/><span className="page-id">{design.id}</span></div>
    <div className="designed-page__grid">{design.panels.map(panel => <DesignedPanel key={panel.id} panel={panel} onAction={onAction} />)}</div>
  </section>;
}

function ActionButton({ action, onClick }: { action: PageAction; onClick: () => void }) {
  return <button className={`design-action kind-${action.kind ?? 'secondary'}`} title={action.shortcut ? `${action.label} (${action.shortcut})` : action.label} onClick={onClick}><span>{action.icon}</span>{action.label}{action.shortcut && <kbd>{action.shortcut}</kbd>}</button>;
}

function DesignedPanel({ panel, onAction }: { panel: PagePanel; onAction?: (action: PageAction, panel?: PagePanel) => void }) {
  return <article className="designed-panel"><header><div className="panel-heading"><span className="panel-icon">{panel.icon}</span><div><h3>{panel.title}</h3><p>{panel.subtitle}</p></div></div><div className="panel-actions">{panel.actions.map(action => <ActionButton key={action.id} action={action} onClick={() => onAction?.(action, panel)} />)}</div></header><div className="panel-body"><div className="panel-subnav">{panel.subPanels.map((item, index) => <button key={item} className={index === 0 ? 'selected' : ''}>{item}<span>›</span></button>)}</div><div className="panel-canvas"><div className="empty-visual"><span>{panel.icon}</span><strong>{panel.title}</strong><small>Select a sub-panel or use an action above.</small></div></div></div></article>;
}
