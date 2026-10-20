import React, { useMemo, useState } from 'react';
import { createProgramCanvas, type CanvasNode, type CanvasNodeKind } from './canvasTypes';
import './program-canvas.css';

const palette: Array<{ kind: CanvasNodeKind; label: string; icon: string }> = [
  { kind: 'event', label: 'Event', icon: '⚡' },
  { kind: 'data', label: 'Data', icon: '◇' },
  { kind: 'logic', label: 'Logic', icon: '◆' },
  { kind: 'function', label: 'Function', icon: 'ƒ' },
  { kind: 'ai', label: 'AI Agent', icon: '🧠' },
  { kind: 'tool', label: 'Tool', icon: '⚙' },
  { kind: 'output', label: 'Output', icon: '→' },
];

export function ProgramCanvas({ title = 'Program Canvas' }: { title?: string }) {
  const [canvas, setCanvas] = useState(() => createProgramCanvas(title));
  const [selected, setSelected] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const selectedNode = useMemo(() => canvas.nodes.find(node => node.id === selected), [canvas.nodes, selected]);

  function addNode(kind: CanvasNodeKind, label: string) {
    const index = canvas.nodes.length;
    const node: CanvasNode = { id: `NODE-${crypto.randomUUID()}`, title: label, kind, x: 48 + (index % 3) * 220, y: 48 + Math.floor(index / 3) * 140, inputs: ['in'], outputs: ['out'], properties: {} };
    setCanvas(current => ({ ...current, nodes: [...current.nodes, node], updatedAt: new Date().toISOString() }));
    setSelected(node.id);
  }
  function removeSelected() {
    if (!selected) return;
    setCanvas(current => ({ ...current, nodes: current.nodes.filter(node => node.id !== selected), connections: current.connections.filter(connection => connection.fromNodeId !== selected && connection.toNodeId !== selected), updatedAt: new Date().toISOString() }));
    setSelected(null);
  }

  return <section className="program-canvas" aria-label="Visual program canvas">
    <header className="program-canvas__header"><div><span className="program-canvas__eyebrow">BLUEPRINT / PROGRAM</span><h2>{canvas.name}</h2></div><div className="program-canvas__controls"><button onClick={() => setZoom(value => Math.max(.5, value - .1))}>−</button><span>{Math.round(zoom * 100)}%</span><button onClick={() => setZoom(value => Math.min(2, value + .1))}>+</button><button onClick={removeSelected} disabled={!selected}>Delete Node</button></div></header>
    <div className="program-canvas__body">
      <aside className="program-canvas__palette"><b>Nodes</b>{palette.map(item => <button key={item.kind} onClick={() => addNode(item.kind, item.label)}><span>{item.icon}</span>{item.label}</button>)}</aside>
      <div className="program-canvas__viewport"><div className="program-canvas__stage" style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}>{canvas.nodes.map(node => <button key={node.id} className={`program-node kind-${node.kind}${selected === node.id ? ' selected' : ''}`} style={{ left: node.x, top: node.y }} onClick={() => setSelected(node.id)}><small>{node.kind.toUpperCase()}</small><strong>{node.title}</strong><span className="node-port input">●</span><span className="node-port output">●</span></button>)}{!canvas.nodes.length && <div className="program-canvas__empty">Choose a node from the palette to start building the program.</div>}</div></div>
      <aside className="program-canvas__inspector"><b>Inspector</b>{selectedNode ? <><label>Node<input value={selectedNode.title} onChange={event => setCanvas(current => ({ ...current, nodes: current.nodes.map(node => node.id === selectedNode.id ? { ...node, title: event.target.value } : node), updatedAt: new Date().toISOString() }))} /></label><span>ID {selectedNode.id}</span><span>Type {selectedNode.kind}</span></> : <p>Select a node to edit its properties.</p>}</aside>
    </div>
  </section>;
}
