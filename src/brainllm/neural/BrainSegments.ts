import type{NeuroEngineId}from'../NeuroEngine';import type{NeuralLayer}from'./NeuralNetwork';import{BRAIN_NETWORKS}from'./defaultBrainNetworks';
export type BrainSegmentId='sensory'|'attention'|'memory'|'reasoning'|'planning'|'action'|'safety'|'regulation'|'coordination'|'output';
export interface BrainSegment{ id:BrainSegmentId; name:string; purpose:string; engines:NeuroEngineId[]; layerIds:string[]; enabled:boolean; priority:number }
export const BRAIN_SEGMENTS:BrainSegment[]=[
{id:'sensory',name:'Sensory/Input Segment',purpose:'Normalize and classify incoming text, events and workspace context.',engines:['thalamus','brainstem'],layerIds:['thalamus.attention','brainstem.transport'],enabled:true,priority:100},
{id:'attention',name:'Attention Segment',purpose:'Select relevant context and suppress low-value signals.',engines:['thalamus','hypothalamus'],layerIds:['thalamus.routing','hypothalamus.resources'],enabled:true,priority:90},
{id:'memory',name:'Memory Segment',purpose:'Retrieve, encode and consolidate project and conversational memory.',engines:['hippocampus'],layerIds:['hippocampus.encode','hippocampus.context','hippocampus.retrieve'],enabled:true,priority:80},
{id:'reasoning',name:'Reasoning Segment',purpose:'Synthesize concepts, evidence, code and natural language.',engines:['cortex'],layerIds:['cortex.association','cortex.reasoning'],enabled:true,priority:85},
{id:'planning',name:'Planning Segment',purpose:'Turn goals into plans, constraints, tasks and policies.',engines:['prefrontal'],layerIds:['pfc.planning','pfc.policy'],enabled:true,priority:95},
{id:'action',name:'Action Segment',purpose:'Select tools, actions and execution candidates under policy.',engines:['basal-ganglia'],layerIds:['bg.candidate','bg.selection','bg.inhibition'],enabled:true,priority:88},
{id:'safety',name:'Safety Segment',purpose:'Score risk, anomalies, permissions and fail-closed conditions.',engines:['amygdala','brainstem'],layerIds:['amygdala.risk','brainstem.watchdog'],enabled:true,priority:110},
{id:'regulation',name:'Regulation Segment',purpose:'Manage resource budgets, scheduling and system health.',engines:['hypothalamus','cerebellum'],layerIds:['hypothalamus.regulation','cerebellum.calibration'],enabled:true,priority:70},
{id:'coordination',name:'Coordination Segment',purpose:'Fuse parallel engine results into a coherent state.',engines:['corpus-callosum'],layerIds:['callosum.align','callosum.fusion','callosum.consensus'],enabled:true,priority:100},
{id:'output',name:'Output Segment',purpose:'Calibrate and deliver the final response or action result.',engines:['cerebellum','cortex'],layerIds:['cerebellum.output','cortex.output'],enabled:true,priority:75}
];
export function getSegment(id:BrainSegmentId){return BRAIN_SEGMENTS.find(s=>s.id===id)}
export function getNetworkLayers(engine:NeuroEngineId):NeuralLayer[]{return BRAIN_NETWORKS[engine].layers}
