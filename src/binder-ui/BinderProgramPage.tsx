import React,{useState} from 'react';
import {ProgramCanvas} from '../blueprint/ProgramCanvas';
import {WhiteboardPage} from './WhiteboardPage';
import {DRAFT_PAGE_TEMPLATES} from '../drafting/draftingPages';
import './binder-program-page.css';

export function BinderProgramPage(){
 const [page,setPage]=useState<'code'|'canvas'|'whiteboard'|'draft'>('code');
 const [draft,setDraft]=useState(DRAFT_PAGE_TEMPLATES[0]);
 const [source,setSource]=useState(draft.starterText);
 const [frozen,setFrozen]=useState(false);
 function selectDraft(id:string){const next=DRAFT_PAGE_TEMPLATES.find(x=>x.id===id)||DRAFT_PAGE_TEMPLATES[0];setDraft(next);setSource(next.starterText);}
 return <section className="binder-program-page">
  <header className="binder-program-page__cover"><div><span>DEVELOPMENT BINDER · PROGRAM</span><h2>Program Studio</h2><p>Draft, design, code, visualize, test, and run programs from one binder page.</p></div><div className="binder-program-page__actions"><button onClick={()=>setFrozen(v=>!v)}>{frozen?'🔒 Frozen':'✎ Edit Page'}</button><button onClick={()=>setFrozen(true)}>Freeze Page</button><button onClick={()=>setFrozen(false)}>Unfreeze</button><button>▶ Run</button><button>⚙ Build</button></div></header>
  <nav className="binder-program-page__tabs"><button className={page==='code'?'active':''} onClick={()=>setPage('code')}>▤ Code</button><button className={page==='canvas'?'active':''} onClick={()=>setPage('canvas')}>◇ Program Canvas</button><button className={page==='whiteboard'?'active':''} onClick={()=>setPage('whiteboard')}>□ Whiteboard</button><button className={page==='draft'?'active':''} onClick={()=>setPage('draft')}>✎ Draft Pages</button></nav>
  {page==='code'&&<div className="binder-program-page__code"><aside><b>PROGRAM SOURCE</b><button>main.brain</button><button>agents.brain</button><button>workflows.brain</button><button>tools.brain</button></aside><textarea readOnly={frozen} value={source} onChange={e=>setSource(e.target.value)} spellCheck={false}/></div>}
  {page==='canvas'&&<ProgramCanvas title="Program Studio"/>}
  {page==='whiteboard'&&<WhiteboardPage title="Program Studio Whiteboard"/>}
  {page==='draft'&&<div className="binder-program-page__draft"><aside><b>DRAFT PAGE TYPES</b>{DRAFT_PAGE_TEMPLATES.map(item=><button className={item.id===draft.id?'selected':''} key={item.id} onClick={()=>selectDraft(item.id)}>{String(item.number).padStart(2,'0')} · {item.name}</button>)}</aside><main><header><h3>{draft.name}</h3><p>{draft.description}</p></header><div className="draft-meta">{draft.sections.map(s=><span key={s}>{s}</span>)}</div><textarea value={source} onChange={e=>setSource(e.target.value)} spellCheck={false}/></main><aside><b>UML / LOGIC SYMBOLS</b>{draft.symbols.map(s=><span key={s}>◇ {s}</span>)}</aside></div>}
 </section>;
}
