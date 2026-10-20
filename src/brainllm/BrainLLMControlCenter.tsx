import React, {useEffect, useMemo, useState} from 'react';
import {defaultBrainLLM} from './index';

export function BrainLLMControlCenter(){
 const providers=useMemo(()=>defaultBrainLLM.providersList(),[]);
 const [selected,setSelected]=useState(providers[0]?.id ?? '');
 const [models,setModels]=useState<string[]>([]);
 const [model,setModel]=useState('');
 const [status,setStatus]=useState('Ready');
 const [baseUrl,setBaseUrl]=useState(localStorage.getItem('ai-second-brain.brain-llm-url') || 'http://127.0.0.1:11434');
 useEffect(()=>{let active=true; const load=async()=>{if(!selected)return;setStatus('Loading models…');try{const found=await defaultBrainLLM.models(selected);if(active){setModels(found.map(item=>item.id));setModel(found[0]?.id ?? '');setStatus(`${selected} connected`);}}catch(error){if(active)setStatus(error instanceof Error?error.message:'Provider unavailable');}};void load();return()=>{active=false;};},[selected]);
 function saveUrl(value:string){setBaseUrl(value);localStorage.setItem('ai-second-brain.brain-llm-url',value);setStatus('Backend URL saved for this device');}
 return <section className="panel brainLLMControl"><div className="panelTitle"><span>Brain LLM Control Center</span><span className="brainBadge">PRIMARY AI ENGINE</span></div><div className="brainGrid"><label>Provider<select value={selected} onChange={e=>setSelected(e.target.value)}>{providers.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></label><label>Model<select value={model} onChange={e=>setModel(e.target.value)} disabled={!models.length}><option value="">{models.length?'Select model':'No models detected'}</option>{models.map(m=><option key={m} value={m}>{m}</option>)}</select></label><label>Backend URL<input value={baseUrl} onChange={e=>saveUrl(e.target.value)} /></label></div><div className="brainStatus"><span>{status}</span><span>Selected: {model || 'none'}</span></div><div className="brainCapabilities">{['Chat','Reasoning','Agent orchestration','Tool use','Memory','Coding','Research','Math','Search'].map(x=><span key={x}>{x}</span>)}</div><p className="panelFooter">Ollama is treated as the local Brain LLM backend/provider; application features target the Brain LLM interface.</p></section>;
}
