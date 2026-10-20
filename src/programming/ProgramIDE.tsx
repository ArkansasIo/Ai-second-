import React, { useMemo, useState } from 'react';
import { PROGRAM_TEMPLATES, type ProgramTemplate } from './programTemplates';
import { ProgramCanvas } from '../blueprint/ProgramCanvas';
import { WhiteboardPage } from '../binder-ui/WhiteboardPage';
import './program-ide.css';

export function ProgramIDE() {
  const [templateId, setTemplateId] = useState(PROGRAM_TEMPLATES[0].id);
  const [file, setFile] = useState(PROGRAM_TEMPLATES[0].files[0]);
  const [code, setCode] = useState(PROGRAM_TEMPLATES[0].starterCode[file] ?? '');
  const [frozen, setFrozen] = useState(false);
  const [view, setView] = useState<'code' | 'canvas' | 'whiteboard'>('code');
  const template = useMemo(() => PROGRAM_TEMPLATES.find(item => item.id === templateId) ?? PROGRAM_TEMPLATES[0], [templateId]);

  function chooseTemplate(next: ProgramTemplate) {
    setTemplateId(next.id); const nextFile = next.files[0]; setFile(nextFile); setCode(next.starterCode[nextFile] ?? ''); setFrozen(false);
  }
  function chooseFile(nextFile: string) { setFile(nextFile); setCode(template.starterCode[nextFile] ?? ''); }

  return <section className="program-ide" aria-label="Binder Program IDE">
    <header className="program-ide__top"><div className="program-ide__brand"><span>AI SECOND BRAIN / BINDER / PROGRAM</span><h2>{template.name}</h2></div><div className="program-ide__actions"><button onClick={() => setFrozen(value => !value)}>{frozen ? '🔒 Frozen' : '✎ Edit Page'}</button><button onClick={() => setFrozen(true)}>Freeze Page</button><button onClick={() => setFrozen(false)}>Unfreeze</button><button>▶ Run</button><button>⚙ Build</button></div></header>
    <div className="program-ide__tabs"><button className={view === 'code' ? 'active' : ''} onClick={() => setView('code')}>▤ Code</button><button className={view === 'canvas' ? 'active' : ''} onClick={() => setView('canvas')}>◇ Program Canvas</button><button className={view === 'whiteboard' ? 'active' : ''} onClick={() => setView('whiteboard')}>□ Whiteboard</button><span className="program-ide__spacer"/><span>PROGRAM-{template.id}</span></div>
    <div className="program-ide__body">
      <aside className="program-ide__explorer"><strong>PROGRAM TEMPLATES</strong><div className="template-list">{PROGRAM_TEMPLATES.map(item => <button key={item.id} className={item.id === template.id ? 'selected' : ''} onClick={() => chooseTemplate(item)}><span>{item.number.toString().padStart(2, '0')}</span>{item.name}</button>)}</div><strong className="explorer-title">FILES</strong>{template.files.map(item => <button className={`file ${item === file ? 'selected' : ''}`} key={item} onClick={() => chooseFile(item)}>▤ {item}</button>)}</aside>
      <main className="program-ide__editor">{view === 'code' && <div className="code-editor"><div className="code-gutter">{code.split('\n').map((_, index) => <span key={index}>{index + 1}</span>)}</div><textarea value={code} readOnly={frozen} onChange={event => setCode(event.target.value)} spellCheck={false} aria-label={`Editing ${file}`} /></div>}{view === 'canvas' && <ProgramCanvas title={template.name} />}{view === 'whiteboard' && <WhiteboardPage title={`${template.name} Whiteboard`} />}</main>
      <aside className="program-ide__inspector"><strong>TEMPLATE</strong><h3>{template.name}</h3><p>{template.description}</p><div className="inspector-section"><b>Features</b>{template.features.map(item => <span key={item}>• {item}</span>)}</div><div className="inspector-section"><b>Functions</b>{template.functions.map(item => <code key={item}>{item}</code>)}</div><div className="inspector-section"><b>Logic</b>{template.logic.map(item => <span key={item}>{item}</span>)}</div><div className="inspector-section"><b>Variables</b>{template.variables.map(item => <code key={item}>{item}</code>)}</div></aside>
    </div>
  </section>;
}
