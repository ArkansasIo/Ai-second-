import React,{useEffect,useMemo,useState} from 'react';
import {DocumentTree} from './folder-ui/DocumentTree';
import type {TreeNode} from './folder-ui/treeTypes';
import {WorkspaceManager} from './workspace-ui/WorkspaceManager';
import {FeaturePanels} from './ui/FeaturePanels';
import {conversationMemory} from './memory/ConversationMemoryStore';
import {auditLog} from './ai/auditLog';
import './styles.css';
import './workspace-ui/workspace-manager.css';

type UpdateState={version:string;status:'current'|'available'|'error';message:string};
const APP_VERSION='0.1.15';
const activities=[['explorer','EXPLORER'],['search','SEARCH'],['source','SOURCE CONTROL'],['run','RUN AND DEBUG'],['extensions','EXTENSIONS'],['agents','AI AGENTS']];
const nav=['Projects','Issues','Code','Pull Requests','Agents','Actions','Roadmaps','Security','Insights','Releases','Environments','Blueprints','Extensions','Terminal','Memory','GitHub'];
const channels=['pre-alpha','alpha','pre-beta','beta','gold'];
function apiBase(){return(localStorage.getItem('ai-second-brain.apiBase')||'http://127.0.0.1:8787').replace(/\/$/,'')}
async function models(){const r=await fetch(`${apiBase()}/api/brain-llm/models`);if(!r.ok)throw new Error(`Brain LLM API returned ${r.status}`);const d=await r.json() as {models?:Array<{name?:string;id?:string}>};return(d.models||[]).map(x=>x.name||x.id||'').filter(Boolean)}
async function chat(model:string,messages:Array<{role:string;content:string}>){const r=await fetch(`${apiBase()}/api/brain-llm/chat`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({model,messages})});if(!r.ok)throw new Error(`Brain LLM API returned ${r.status}`);const d=await r.json() as {response?:string;message?:{content?:string};choices?:Array<{message?:{content?:string}}>};return d.response||d.message?.content||d.choices?.[0]?.message?.content||''}

export default function App(){
 const [active,setActive]=useState('Projects');
 const [activity,setActivity]=useState('explorer');
 const [model,setModel]=useState(localStorage.getItem('ai-second-brain.brain-llm-model')||'');
 const [modelsList,setModelsList]=useState<string[]>([]);
 const [online,setOnline]=useState(false);
 const [prompt,setPrompt]=useState('');
 const [messages,setMessages]=useState<Array<{role:'user'|'assistant'|'system';content:string}>>([]);
 const [busy,setBusy]=useState(false);
 const [channel,setChannel]=useState(localStorage.getItem('ai-second-brain.channel')||'gold');
 const [update,setUpdate]=useState<UpdateState>({version:`v${APP_VERSION}`,status:'current',message:'Current release channel.'});
 const [treeOpen,setTreeOpen]=useState(true);
 const [opened,setOpened]=useState<TreeNode|null>(null);
 const [terminalOpen,setTerminalOpen]=useState(true);
 const [terminalInput,setTerminalInput]=useState('');
 const [terminalLines,setTerminalLines]=useState<string[]>(['AI Second Brain terminal','Type a command to run a local workspace action.']);
 const [commandOpen,setCommandOpen]=useState(false);
 const [browserUrl,setBrowserUrl]=useState('aibinder://workspace');
 useEffect(()=>{let live=true;models().then(list=>{if(!live)return;setModelsList(list);const preferred=localStorage.getItem('ai-second-brain.brain-llm-model');const selected=preferred&&list.includes(preferred)?preferred:list[0]||'';setModel(selected);if(selected)localStorage.setItem('ai-second-brain.brain-llm-model',selected);setOnline(true)}).catch(()=>live&&setOnline(false));return()=>{live=false}},[]);
 useEffect(()=>{localStorage.setItem('ai-second-brain.channel',channel)},[channel]);
 useEffect(()=>{const remembered=conversationMemory.list(30).filter(m=>m.role==='user'||m.role==='assistant').map(m=>({role:m.role as 'user'|'assistant',content:m.content}));setMessages(remembered)},[]);
 useEffect(()=>{const handler=(e:KeyboardEvent)=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='p'){e.preventDefault();setCommandOpen(v=>!v)}};window.addEventListener('keydown',handler);return()=>window.removeEventListener('keydown',handler)},[]);
 const section=useMemo(()=>({Projects:['Projects','Local projects and persistent workspaces.'],Issues:['Issues','Tasks, bugs, priorities, and assignments.'],Code:['Code','Source files, tests, branches, and artifacts.'],'Pull Requests':['Pull Requests','Review proposed changes before merge.'],Agents:['Agents','Agent registry, permissions, tools, and workforce.'],Actions:['Actions','Build, test, package, and automation.'],Roadmaps:['Roadmaps','Milestones, dependencies, and release planning.'],Security:['Security','Credentials, permissions, provenance, and audit.'],Insights:['Insights','System health, memory, provenance, and audit.'],Releases:['Releases','Versions, channels, packages, and checksums.'],Environments:['Environments','Development environments and toolchains.'],Blueprints:['Blueprints','Program canvas, BrainScript, UML, and diagrams.'],Extensions:['Extensions','Plugins, SDKs, Search, Math, and integrations.'],Terminal:['Terminal','Execution boundaries and development commands.'],Memory:['Memory','Persistent conversation and project context.'],GitHub:['GitHub','Repository and collaboration integration.']} as Record<string,[string,string]>),[]);
 async function send(){const text=prompt.trim();if(!text||busy)return;setPrompt('');setMessages(m=>[...m,{role:'user',content:text}]);conversationMemory.append({role:'user',content:text});setBusy(true);try{const answer=await chat(model||'qwen3',[{role:'user',content:text}]);setMessages(m=>[...m,{role:'assistant',content:answer}]);conversationMemory.append({role:'assistant',content:answer});auditLog.record({action:'ui.neurobrain.chat',actor:'user',target:model||'default'});setOnline(true)}catch(e){setMessages(m=>[...m,{role:'system',content:e instanceof Error?e.message:'NeuroBrain connection failed.'}]);setOnline(false)}finally{setBusy(false)}}
 async function checkUpdates(){try{const r=await fetch('https://api.github.com/repos/ArkansasIo/Ai-second-/releases');if(!r.ok)throw new Error(`GitHub returned ${r.status}`);const releases=await r.json() as Array<{tag_name:string;draft:boolean;prerelease:boolean;name?:string}>;const found=releases.find(x=>!x.draft&&(channel==='gold'?!x.prerelease:x.prerelease));setUpdate(found?{version:found.tag_name,status:'available',message:`${found.name||found.tag_name} is available.`}:{version:`v${APP_VERSION}`,status:'current',message:`No ${channel} update is published.`})}catch(e){setUpdate({version:`v${APP_VERSION}`,status:'error',message:e instanceof Error?e.message:'Update check failed.'})}}
 function openNode(node:TreeNode){setOpened(node);if(node.kind==='folder'&&nav.includes(node.name))setActive(node.name)}
 function runTerminal(){const command=terminalInput.trim();if(!command)return;setTerminalLines(lines=>[...lines,`> ${command}`,`[local] command queued: ${command}`]);setTerminalInput('')}
 const title=opened?.name||section[active]?.[0]||active;
 return <div className="ide-shell">
  <header className="ide-titlebar">
   <div className="ide-app-icon">✦</div><div className="ide-title">AI Second Brain</div>
   <div className="ide-menu"><button onClick={()=>setCommandOpen(true)}>File</button><button onClick={()=>setCommandOpen(true)}>Edit</button><button onClick={()=>setCommandOpen(true)}>View</button><button onClick={()=>setCommandOpen(true)}>Run</button><button onClick={()=>setCommandOpen(true)}>Terminal</button><button onClick={()=>setCommandOpen(true)}>Help</button></div>
   <button className="command-trigger" onClick={()=>setCommandOpen(true)}>⌕ <span>Search files, commands, symbols...</span><kbd>Ctrl+P</kbd></button>
   <div className="ide-title-actions"><span className={online?'connection online':'connection'}>● {online?'Connected':'Offline'}</span><span>v{APP_VERSION}</span></div>
  </header>
  <div className="ide-toolbar"><button onClick={()=>setBrowserUrl('aibinder://workspace')}>←</button><button>→</button><button onClick={()=>window.location.reload()}>↻</button><input value={browserUrl} onChange={e=>setBrowserUrl(e.target.value)} onKeyDown={e=>e.key==='Enter'&&setBrowserUrl(e.currentTarget.value)}/><select value={model} onChange={e=>{setModel(e.target.value);localStorage.setItem('ai-second-brain.brain-llm-model',e.target.value)}}><option value="">NeuroBrain model</option>{modelsList.map(m=><option key={m} value={m}>{m}</option>)}</select></div>
  <div className="ide-body">
   <aside className="activity-bar">{activities.map(([id,label])=><button key={id} className={activity===id?'activity active':'activity'} title={label} onClick={()=>setActivity(id)}><span>{id==='explorer'?'▤':id==='search'?'⌕':id==='source'?'⑂':id==='run'?'▷':id==='extensions'?'⊞':'✦'}</span></button>)}<div className="activity-spacer"/><button className="activity" title="Settings" onClick={()=>setActive('Security')}>⚙</button></aside>
   <aside className="explorer-panel">
    <div className="panel-heading"><span>{activity==='explorer'?'EXPLORER':activities.find(x=>x[0]===activity)?.[1]}</span><button onClick={()=>setTreeOpen(v=>!v)}>{treeOpen?'−':'+'}</button></div>
    {activity==='explorer'&&<><div className="explorer-section"><span>AI SECOND BRAIN</span><button onClick={()=>setActive('Projects')}>⋯</button></div>{treeOpen&&<DocumentTree onOpen={openNode} onCreate={node=>setOpened(node)}/>}<div className="explorer-section"><span>WORKSPACE</span></div>{nav.map(item=><button key={item} className={active===item?'explorer-item selected':'explorer-item'} onClick={()=>{setActive(item);setOpened(null)}}><span>▸</span>{item}</button>)}</>}
    {activity!=='explorer'&&<div className="activity-placeholder"><strong>{activities.find(x=>x[0]===activity)?.[1]}</strong><p>Tooling panel ready. Select a workspace action from the command palette or Explorer.</p></div>}
   </aside>
   <main className="editor-area">
    <div className="editor-tabs"><button className="editor-tab active"><span className="file-dot">●</span>{title}<b>×</b></button>{opened&&<button className="editor-tab"><span className="file-dot">◇</span>{opened.path.split('/').pop()}<b>×</b></button>}<button className="editor-tab-add">+</button></div>
    <div className="breadcrumb"><span>AI SECOND BRAIN</span><b>›</b><span>{active}</span>{opened&&<><b>›</b><span>{opened.name}</span></>}</div>
    <div className="editor-content">
      <div className="editor-gutter">{Array.from({length:24},(_,i)=><span key={i}>{i+1}</span>)}</div>
      <div className="editor-main">
       <div className="code-heading"><span className="syntax-key">const</span> workspace = <span className="syntax-string">"{title}"</span>;</div>
       <h1>{title}</h1><p className="editor-subtitle">{opened?`${opened.kind} · ${opened.path}`:section[active]?.[1]}</p>
       {active==='Projects'&&!opened&&<WorkspaceManager/>}
       {active==='Projects'&&opened&&<section className="editor-document"><h2>{opened.name}</h2><p>This workspace document is ready for source, Markdown, BrainScript, UML, design, test, and artifact work.</p><div className="code-block"><span>workspace.open</span>(<span className="syntax-string">"{opened.path}"</span>)</div></section>}
       {active!=='Projects'&&<FeaturePanels activeSection={active}/>} 
       <section className="release-card"><div><b>Release</b><span className={`release-state ${update.status}`}>{update.status.toUpperCase()}</span></div><div className="release-row"><select value={channel} onChange={e=>setChannel(e.target.value)}>{channels.map(c=><option key={c}>{c}</option>)}</select><span>{update.message}</span><strong>{update.version}</strong><button onClick={checkUpdates}>Check</button></div></section>
      </div>
    </div>
    {terminalOpen&&<section className="terminal-panel"><div className="terminal-tabs"><button className="active">TERMINAL</button><button>PROBLEMS <small>0</small></button><button>OUTPUT</button><button>DEBUG CONSOLE</button><button className="terminal-close" onClick={()=>setTerminalOpen(false)}>×</button></div><div className="terminal-body">{terminalLines.map((line,i)=><div key={i}>{line}</div>)}</div><div className="terminal-input"><span>›</span><input value={terminalInput} onChange={e=>setTerminalInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&runTerminal()} placeholder="Enter command..."/></div></section>}
   </main>
   <aside className="secondary-panel"><div className="panel-heading"><span>OUTLINE</span><span>⋯</span></div><div className="outline-item">⌁ {title}</div><div className="outline-item">◇ Tools</div><div className="outline-item">◇ Agents</div><div className="outline-item">◇ API</div><div className="outline-item">◇ Memory</div><div className="inspector-divider"/><div className="panel-heading"><span>NEUROBRAIN</span><span className={online?'live-dot':''}>●</span></div><div className="mini-status">{online?'Model connection active':'Connect local Brain LLM'}<br/><small>{model||'No model selected'}</small></div><button className="side-action" onClick={()=>setActive('Agents')}>Open Agents</button><button className="side-action" onClick={()=>setActive('Memory')}>Open Memory</button></aside>
  </div>
  <section className="chat-dock"><div className="chat-header"><b>✦ NeuroBrain Chat</b><span>{online?'LIVE':'OFFLINE'}</span><button onClick={()=>setTerminalOpen(v=>!v)}>{terminalOpen?'Hide Terminal':'Show Terminal'}</button></div><div className="chat-messages">{messages.slice(-6).map((m,i)=><div key={i} className={`chat-message ${m.role}`}><b>{m.role}</b><span>{m.content}</span></div>)}</div><div className="chat-composer"><input value={prompt} onChange={e=>setPrompt(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask NeuroBrain, run a tool, or describe a change…" disabled={busy}/><button onClick={send} disabled={busy||!prompt.trim()}>{busy?'…':'Send'}</button></div></section>
  <footer className="status-bar"><span>⎇ main*</span><span>✓ 0 errors</span><span>0 warnings</span><span className="status-spacer"/><span>{online?'NeuroBrain: Connected':'NeuroBrain: Offline'}</span><span>UTF-8</span><span>TypeScript React</span><span>Ln 1, Col 1</span></footer>
  {commandOpen&&<div className="command-overlay" onClick={()=>setCommandOpen(false)}><div className="command-palette" onClick={e=>e.stopPropagation()}><input autoFocus placeholder="Search commands, files, tools..." onKeyDown={e=>{if(e.key==='Escape')setCommandOpen(false)}}/><div className="command-list">{['Open Project','Search Workspace','Run Task','Open AI Agents','Open API Explorer','Open Terminal','Git: Status','Git: Diff','NeuroBrain: Chat','Settings'].map(item=><button key={item} onClick={()=>{setCommandOpen(false);if(item.includes('Agent'))setActive('Agents');if(item.includes('Terminal'))setTerminalOpen(true);if(item.includes('Project'))setActive('Projects')}}><span>›</span>{item}<kbd>↵</kbd></button>)}</div></div></div>}
 </div>
}
