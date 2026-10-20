import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

type Workshop = { id: string; name: string; environment: string; agents: number };

type UpdateInfo = {
  channel: string;
  version: string;
  status: 'current' | 'available' | 'error';
  message: string;
};

const workshops: Workshop[] = [
  { id: 'WORKSHOP-00001', name: 'C++ Core', environment: 'C++', agents: 4 },
  { id: 'WORKSHOP-00002', name: 'Android App', environment: 'Android', agents: 6 },
  { id: 'WORKSHOP-00003', name: 'Game Studio', environment: 'Unreal', agents: 8 },
  { id: 'WORKSHOP-00004', name: 'Blender Assets', environment: 'Blender', agents: 5 }
];

const nav = ['Projects', 'Issues', 'Code', 'Pull Requests', 'Agents', 'Actions', 'Roadmaps', 'Security', 'Insights', 'Releases', 'Environments', 'Blueprints', 'Extensions', 'Terminal', 'Memory', 'GitHub'];
const releaseChannels = ['pre-alpha', 'alpha', 'pre-beta', 'beta', 'gold'];

function App() {
  const [active, setActive] = useState('Projects');
  const [workshop, setWorkshop] = useState(workshops[0]);
  const [model, setModel] = useState('Ollama — local');
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<string[]>(['Welcome to AI Second Brain. This prototype is running locally in your browser.']);
  const [channel, setChannel] = useState(() => localStorage.getItem('ai-second-brain.channel') || 'gold');
  const [update, setUpdate] = useState<UpdateInfo>({ channel: 'gold', version: 'v0.1.0', status: 'current', message: 'You are on the Gold channel.' });
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    localStorage.setItem('ai-second-brain.channel', channel);
    setUpdate(current => ({ ...current, channel, message: `Update channel set to ${channel}.` }));
  }, [channel]);

  const graph = useMemo(() => [
    ['Event', 'OnStart'], ['Data', 'Load Project'], ['Logic', 'Validate'], ['Function', 'Build'], ['Output', 'Result']
  ], []);

  async function checkForUpdates() {
    setChecking(true);
    setUpdate(current => ({ ...current, status: 'current', message: 'Checking release metadata…' }));
    try {
      const response = await fetch('https://api.github.com/repos/ArkansasIo/Ai-second-/releases', {
        headers: { Accept: 'application/vnd.github+json' }
      });
      if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
      const releases = await response.json() as Array<{ tag_name: string; prerelease: boolean; draft: boolean; name?: string }>;
      const eligible = releases.find(release => !release.draft && (channel === 'gold' ? !release.prerelease : release.prerelease));
      if (eligible) {
        setUpdate({ channel, version: eligible.tag_name, status: 'available', message: `${eligible.name || eligible.tag_name} is available for the ${channel} channel.` });
      } else {
        setUpdate({ channel, version: 'v0.1.0', status: 'current', message: `No published ${channel} update is available yet.` });
      }
    } catch (error) {
      setUpdate({ channel, version: 'v0.1.0', status: 'error', message: error instanceof Error ? `Update check unavailable: ${error.message}` : 'Update check unavailable.' });
    } finally {
      setChecking(false);
    }
  }

  function send() {
    const value = prompt.trim();
    if (!value) return;
    setMessages(current => [...current, `You: ${value}`, 'Agent: Prototype response ready. Connect the local API and Ollama for live model execution.']);
    setPrompt('');
  }

  return <div className="app">
    <header className="topbar">
      <div className="brand">AI SECOND BRAIN <span>Professional</span></div>
      <div className="status">● {model}</div>
      <div className="version">v0.1.0</div>
      <button className="updateButton" onClick={checkForUpdates} disabled={checking}>{checking ? 'Checking…' : 'Check for Updates'}</button>
    </header>
    <div className="body">
      <aside className="sidebar">
        <button className="new">+ New Workshop</button>
        {nav.map(item => <button key={item} className={active === item ? 'nav active' : 'nav'} onClick={() => setActive(item)}>{item}</button>)}
        <div className="sidebarFoot">Account<br/>Settings</div>
      </aside>
      <main className="workspace">
        <div className="workshopTabs">
          {workshops.map(w => <button key={w.id} className={w.id === workshop.id ? 'tab selected' : 'tab'} onClick={() => setWorkshop(w)}>{w.name}<small>{w.environment}</small></button>)}
        </div>
        <section className="hero">
          <div><div className="eyebrow">{active.toUpperCase()}</div><h1>{workshop.name}</h1><p>{workshop.id} · {workshop.environment} environment · {workshop.agents} agents</p></div>
          <select value={model} onChange={e => setModel(e.target.value)}><option>Ollama — local</option><option>Ollama — qwen3</option><option>Ollama — qwen3-coder</option></select>
        </section>
        <section className="updatePanel panel">
          <div><div className="panelTitle">Release & Updates <span className={`updateState ${update.status}`}>{update.status.toUpperCase()}</span></div><div className="updateControls"><label>Channel <select value={channel} onChange={e => setChannel(e.target.value)}>{releaseChannels.map(item => <option key={item} value={item}>{item === 'gold' ? 'Gold (Stable)' : item.replace('-', ' ')}</option>)}</select></label><span className="updateMessage">{update.message}</span><span className="updateVersion">{update.version}</span></div></div>
        </section>
        <section className="cards">
          <div className="card"><b>Project</b><strong>Prototype</strong><span>42 tasks · 68% planned</span></div>
          <div className="card"><b>Agents</b><strong>{workshop.agents} active</strong><span>Parallel cluster ready</span></div>
          <div className="card"><b>Build</b><strong>Ready</strong><span>Compiler environment detected</span></div>
          <div className="card"><b>Blueprint</b><strong>5 nodes</strong><span>Language-neutral graph</span></div>
        </section>
        <section className="contentGrid">
          <div className="panel blueprint"><div className="panelTitle">Universal Blueprint <button>+ Node</button></div><div className="graph">{graph.map(([kind, label], i) => <React.Fragment key={label}><div className="node"><small>{kind}</small><b>{label}</b><i>●</i></div>{i < graph.length - 1 && <div className="wire">→</div>}</React.Fragment>)}</div><div className="panelFooter">Target: {workshop.environment} · C++ / Python / Rust / TypeScript adapters</div></div>
          <div className="panel cluster"><div className="panelTitle">Agent Cluster <span>PARALLEL</span></div>{Array.from({ length: workshop.agents }, (_, i) => <div className="agent" key={i}><span className="dot"/> AGENT-{String(i + 1).padStart(5, '0')} <small>{['Architect','Coder','Researcher','QA','Documentation'][i % 5]}</small></div>)}</div>
        </section>
        <section className="chat panel"><div className="panelTitle">AI Chat <span>{model}</span></div><div className="messages">{messages.map((m, i) => <div key={i}>{m}</div>)}</div><div className="composer"><input value={prompt} onChange={e => setPrompt(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask your agents or describe a program..."/><button onClick={send}>Send</button></div></section>
      </main>
    </div>
  </div>;
}

createRoot(document.getElementById('root')!).render(<App />);
