import React,{useState} from 'react';
import {AIBinderControlCenter} from '../binder-ui/AIBinderControlCenter';
import {BrainLLMControlCenter} from '../brainllm/BrainLLMControlCenter';
import {AgentPermissionsPanel} from '../agents/AgentPermissionsPanel';
import {PluginControlCenter} from '../plugins/PluginControlCenter';
import {WorkforceControlCenter} from '../workforce/WorkforceControlCenter';
import {MemoryControlCenter} from '../memory/MemoryControlCenter';
import {NavigationDecisionTree} from '../navigation/NavigationDecisionTree';
import type {NavigationDecisionNode} from '../navigation/navigationDecisionTree';
import './control-center.css';

interface Props{activeSection:string}
export function FeaturePanels({activeSection}:Props){
 const [selected,setSelected]=useState<NavigationDecisionNode>();
 const navigate=(node:NavigationDecisionNode)=>setSelected(node);
 return <>
  <NavigationDecisionTree activeSection={activeSection} onNavigate={navigate}/>
  {selected&&<section className="panel decisionContextPanel"><div className="panelTitle"><span>{selected.icon} {selected.label}</span><span>{selected.kind.toUpperCase()}</span></div><div className="documentCanvas"><p><b>Decision node:</b> {selected.id}</p><p>{selected.description||`This ${selected.kind} is the routed context for the ${activeSection} navigation branch.`}</p><div className="decisionContextActions"><button onClick={()=>setSelected(undefined)}>Back to Tree</button><button>Open Module</button><button>Open Page</button><button>Verify</button></div></div></section>}
  <AIBinderControlCenter/><BrainLLMControlCenter/><AgentPermissionsPanel/><PluginControlCenter/><WorkforceControlCenter/><MemoryControlCenter/>
 </>;
}
