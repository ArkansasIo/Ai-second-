import React, { useMemo, useState } from 'react';
import { DOCUMENT_TREE, getTreeChildren, getTreeNode, getTreePath } from './documentTree';
import type { TreeNode } from './treeTypes';
import './document-tree.css';

export interface DocumentTreeProps { onOpen?: (node: TreeNode) => void; onCreate?: (parent: TreeNode) => void; }

export function DocumentTree({ onOpen, onCreate }: DocumentTreeProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => Object.fromEntries(DOCUMENT_TREE.filter((n) => n.expanded).map((n) => [n.id, true])));
  const [selected, setSelected] = useState('overview');
  const roots = useMemo(() => getTreeChildren('root'), []);
  const toggle = (node: TreeNode) => {
    if (!node.children.length) { setSelected(node.id); onOpen?.(node); return; }
    setExpanded((value) => ({ ...value, [node.id]: !value[node.id] }));
    setSelected(node.id);
  };
  return <aside className="document-tree" aria-label="AI Binder document tree">
    <header className="document-tree__header">
      <div><span className="document-tree__eyebrow">AI BINDER · WORKSPACE TREE</span><h3>AI BINDER</h3></div>
      <button type="button" onClick={() => onCreate?.(getTreeNode('root')!)} title="Create folder or document">＋</button>
    </header>
    <div className="document-tree__path" aria-label="Current path">
      {getTreePath(selected).map((node, index, path) => <React.Fragment key={node.id}><span>{node.name}</span>{index < path.length - 1 && <b>›</b>}</React.Fragment>)}
    </div>
    <div className="document-tree__body">{roots.map((node) => <TreeRow key={node.id} node={node} depth={0} expanded={expanded} selected={selected} toggle={toggle} onOpen={onOpen} onCreate={onCreate} />)}</div>
  </aside>;
}

function TreeRow({ node, depth, expanded, selected, toggle, onOpen, onCreate }: { node: TreeNode; depth: number; expanded: Record<string, boolean>; selected: string; toggle: (node: TreeNode) => void; onOpen?: (node: TreeNode) => void; onCreate?: (node: TreeNode) => void }) {
  const children = getTreeChildren(node.id); const open = !!expanded[node.id];
  return <div className="tree-branch"><div className={`tree-row ${selected === node.id ? 'is-selected' : ''}`} style={{ '--depth': depth } as React.CSSProperties}>
    <button className="tree-row__main" type="button" onClick={() => toggle(node)}><span className={`tree-row__chevron ${open ? 'is-open' : ''}`}>{children.length ? '›' : ''}</span><span className="tree-row__icon">{node.icon}</span><span className="tree-row__name">{node.name}</span><span className="tree-row__number">{String(node.number).padStart(3, '0')}</span></button>
    <div className="tree-row__actions">{node.kind === 'folder' && <button type="button" onClick={() => onCreate?.(node)} title={`Create in ${node.name}`}>＋</button>}<button type="button" onClick={() => onOpen?.(node)} title={`Open ${node.name}`}>↗</button></div>
  </div>{open && children.map((child) => <TreeRow key={child.id} node={child} depth={depth + 1} expanded={expanded} selected={selected} toggle={toggle} onOpen={onOpen} onCreate={onCreate} />)}</div>;
}
