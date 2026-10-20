import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

type Workshop = { id: string; name: string; environment: string; agents: number };
type UpdateInfo = { channel: string; version: string; status: 'current' | 'available' | 'error'; message: string };

const APP_VERSION = '0.1.1';
const workshops: Workshop[] = [
  { id: 'WORKSHOP-00001', name: 'C++ Core', environment: 'C++', agents: 4 },
  { id: 'WORKSHOP-00002', name: 'Android App', environment: 'Android', agents: 6 },
  { id: 'WORKSHOP-00003', name: 'Game Studio', environment: 'Unreal', agents: 8 },
  { id: 'WORKSHOP-00004', name: 'Blender Assets', environment: 'Blender', agents: 5 }
];
const nav = ['Projects', 'Issues', 'Code', 'Pull Requests', 'Agents', 'Actions', 'Roadmaps', 'Security', 'Insights', 'Releases', 'Environments', 'Blueprints', 'Extensions', 'Terminal', 'Memory', 'GitHub'];
const releaseChannels = ['pre-alpha', 'alpha', 'pre-beta', 'beta', 'gold'];

function apiBase(): string {
  return (window.localStorage.getItem('ai-second-brain.apiBase') || 'http://127.0.0.1:8787').replace(/\/$/, '');
}

async function postChat(model: string, message: string): Promise<string> {
  const response = await fetch(`${apiBase()}/api/ollama/chat`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ model, message })
  });
  if (!response.ok) throw new Error(`Local API returned ${response.status}`);
  const data = await response.json() as { response?: string; message?: { content?: string } };
  return data.response || data.message?.content || 'The local model returned no text.';
}

async function loadModels(): Promise<string[]> {
  const response = await fetch(`${apiBase()}/api/ollama/models`);
  if (!response.ok) throw new Error(`Local API returned ${response.status}`);
  const data = await response.json() as { models?: Array<{ name: string }> };
  return (data.models || []).map(model => model.name).filter(Boolean);
}

function App() {
  const [active, setActive] = useState('Projects');
  const [workshop, setWorkshop] = useState(workshops[0]);
  const [model, setModel] = useState('');
  const [models, setModels] = useState<string[]>([]);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<string[]>(['Welcome to AI Second Brain. Connect your local API and Ollama to use live AI.']);
  const [channel, setChannel] = useState(() => localStorage.getItem('ai-second-brain.channel') || 'gold');
  const [apiStatus, setApiStatus] = useState<'local' | 'offline'>('offline');
  const [busy, setBusy] = useState(false);
  const [update, setUpdate] = useState<UpdateInfo>({ channel: 'gold', version: `v${APP_VERSION}`, status: 'current', message: 'You are on the Gold channel.' });
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    localStorage.setItem('ai-second-brain.channel', channel);
    setUpdate(current => ({ ...current, channel, message: `Update channel set to ${channel}.` }));
  }, [channel]);

  useEffect(() => {
    let mounted = true;
    loadModels().then(found => { if (mounted) { setModels(found); setModel(found[0] || 'qwen3'); setApiStatus('local'); } }).catch(() => { if (mounted) setApiStatus('offline'); });
    return () => { mounted = false; };
  }, []);

  const graph = useMemo(() => [['Event', 'OnStart'], ['Data', 'Load Project'], ['Logic', 'Validate'], ['Function', 'Build'], ['Output', 'Result']], []);

  async function send() {
    const value = prompt.trim();
    if (!value || busy) return;
    setPrompt(''); setMessages(current => [...current, `You: ${value}`]); setBusy(true);
    try {
      const answer = await postChat(model || 'qwen3', value);
      setMessages(current => [...current, `Agent: ${answer}`]);
      setApiStatus('local');
    } catch (error) {
      setMessages(current => [...current, `System: ${error instanceof Error ? error.message : 'Local AI connection failed.'} Start the local API and Ollama, then try again.`]);
      setApiStatus('offline');
    } finally { setBusy(false); }
  }

  async function checkForUpdates() {
    setChecking(true); setUpdate(current => ({ ...current, status: 'current', message: 'Checking release metadata…' }));
    try {
      const response = await fetch('https://api.github.com/repos/ArkansasIo/Ai-second-/releases', { headers: { Accept: 'application/vnd.github+json' } });
      if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
      const releases = await response.json() as Array<{ tag_name: string; prerelease: boolean; draft: boolean; name?: string }>;
      const eligible = releases.find(release => !release.draft && (channel === 'gold' ? !release.prerelease : release.prerelease));
      setUpdate(eligible ? { channel, version: eligible.tag_name, status: 'available', message: `${eligible.name || eligible.tag_name} is available for the ${channel} channel.` } : { channel, version: `v${APP_VERSION}`, status: 'current', message: `No published ${channel} update is available yet.` });
    } catch (error) { setUpdate({ channel, version: `v${APP_VERSION}`, status: 'error', message: error instanceof Error ? `Update check unavailable: ${error.message}` : 'Update check unavailable.' }); }
    finally { setChecking(false); }
  }

  const content = {
    Projects: ['Projects', 'Your local projects and workspaces.'],
    Issues: ['Issues', 'Track bugs, tasks, priorities, and agent assignments.'],
    Code: ['Code', 'Repository files, branches, worktrees, and source changes.'],
    'Pull Requests': ['Pull Requests', 'Review proposed changes before merging.'],
    Agents: ['Agents', 'Manage agent roles, models, permissions, and status.'],
    Actions: ['Actions', 'Build, test, package, and automation workflows.'],
    Roadmaps: ['Roadmaps', 'Plan milestones, deadlines, dependencies, and releases.'],
    Security: ['Security', 'Permissions, secrets, dependencies, and audit controls.'],
    Insights: ['Insights', 'Project health, workload, builds, tests, and resources.'],
    Releases: ['Releases', 'Versioned packages, release notes, checksums, and channels.'],
    Environments: ['Environments', 'Virtual development environments and toolchains.'],
    Blueprints: ['Blueprints', 'Visual programs and language-specific code generation.'],
    Extensions: ['Extensions', 'Installed IDE and application integrations.'],
    Terminal: ['Terminal', 'Command sessions for the active workshop environment.'],
    Memory: ['Memory', 'Project knowledge, conversations, and long-term context.'],
    GitHub: ['GitHub', 'Repository, issues, pull requests, actions, and release integration.']
  } as Record<string, [string, string]>;

  const section = content[active] || content.Projects;

  return <div className="app">
    <header className="topbar"><div className="brand">AI SECOND BRAIN <span>Professional</span></div><div className={apiStatus === 'local' ? 'status online' : 'status'}>● {apiStatus === 'local' ? `Ollama Local${model ? ` · ${model}` : ''}` : 'Local API Offline'}</div><div className="version">v{APP_VERSION}</div><button className="updateButton" onClick={checkForUpdates} disabled={checking}>{checking ? 'Checking…' : 'Check for Updates'}</button></header>
    <div className="body"><aside className="sidebar"><button className="new" onClick={() => setActive('Projects')}>+ New Workshop</button>{nav.map(item => <button key={item} className={active === item ? 'nav active' : 'nav'} onClick={() => setActive(item)}>{item}</button>)}<div className="sidebarFoot"><button className="nav" onClick={() => setActive('GitHub')}>Account</button><button className="nav" onClick={() => setActive('Security')}>Settings</button></div></aside>
      <main className="workspace"><div className="workshopTabs">{workshops.map(w => <button key={w.id} className={w.id === workshop.id ? 'tab selected' : 'tab'} onClick={() => setWorkshop(w)}>{w.name}<small>{w.environment}</small></button>)}</div>
        <section className="hero"><div><div className="eyebrow">{active.toUpperCase()}</div><h1>{active === 'Projects' ? workshop.name : section[0]}</h1><p>{active === 'Projects' ? `${workshop.id} · ${workshop.environment} environment · ${workshop.agents} agents` : section[1]}</p></div><select value={model} onChange={e => setModel(e.target.value)} disabled={!models.length}><option value="">{models.length ? 'Select Ollama model' : 'Ollama model unavailable'}</option>{models.map(item => <option key={item} value={item}>{item}</option>)}</select></section>
        {active !== 'Projects' && <section className="panel sectionPlaceholder"><div className="panelTitle">{section[0]}</div><p>{section[1]}</p><p className="panelFooter">This workspace is connected to {workshop.name} · {workshop.environment}.</p></section>}
        <section className="updatePanel panel"><div className="panelTitle">Release & Updates <span className={`updateState ${update.status}`}>{update.status.toUpperCase()}</span></div><div className="updateControls"><label>Channel <select value={channel} onChange={e => setChannel(e.target.value)}>{releaseChannels.map(item => <option key={item} value={item}>{item === 'gold' ? 'Gold (Stable)' : item.replace('-', ' ')}</option>)}</select></label><span className="updateMessage">{update.message}</span><span className="updateVersion">{update.version}</span></div></section>
        <section className="cards"><div className="card"><b>Project</b><strong>Prototype</strong><span>42 tasks · 68% planned</span></div><div className="card"><b>Agents</b><strong>{workshop.agents} active</strong><span>Parallel cluster ready</span></div><div className="card"><b>Build</b><strong>Ready</strong><span>Compiler environment detected</span></div><div className="card"><b>Browser</b><strong>Responsive</strong><span>Phone · iPad · Desktop</span></div></section>
        <section className="contentGrid"><div className="panel blueprint"><div className="panelTitle">Universal Blueprint <button onClick={() => setActive('Blueprints')}>+ Node</button></div><div className="graph">{graph.map(([kind, label], i) => <React.Fragment key={label}><div className="node"><small>{kind}</small><b>{label}</b><i>●</i></div>{i < graph.length - 1 && <div className="wire">→</div>}</React.Fragment>)}</div><div className="panelFooter">Target: {workshop.environment} · C++ / Python / Rust / TypeScript adapters</div></div><div className="panel cluster"><div className="panelTitle">Agent Cluster <span>PARALLEL</span></div>{Array.from({ length: workshop.agents }, (_, i) => <div className="agent" key={i}><span className="dot"/> AGENT-{String(i + 1).padStart(5, '0')} <small>{['Architect','Coder','Researcher','QA','Documentation'][i % 5]}</small></div>)}</div></section>
        <section className="chat panel"><div className="panelTitle">AI Chat <span>{apiStatus === 'local' ? 'LIVE LOCAL AI' : 'OFFLINE / DEMO'}</span></div><div className="messages">{messages.map((m, i) => <div key={i}>{m}</div>)}</div><div className="composer"><input value={prompt} onChange={e => setPrompt(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask your agents or describe a program..." disabled={busy}/><button onClick={send} disabled={busy || !prompt.trim()}>{busy ? 'Working…' : 'Send'}</button></div></section>
      </main></div></div>;
}

createRoot(document.getElementById('root')!).render(<App />);
