import type{BrainLLM,BrainLLMRequest,BrainLLMResponse,BrainLLMToolDefinition}from'./BrainLLM';
import{NEURO_ENGINE_MAP,type NeuroEngineId}from'./NeuroEngine';
export interface NeuroBrainConfig{maxToolRounds?:number;parallelEngines?:boolean;model:string;provider:string}
export interface NeuroBrainRunResult{response:BrainLLMResponse;engines:NeuroEngineId[];toolRounds:number}
/** Agent orchestration layer: route -> plan -> act -> verify -> remember. */
export class NeuroBrainAgent{constructor(private readonly brain:BrainLLM,private readonly config:NeuroBrainConfig){}
 async run(input:string,tools:BrainLLMToolDefinition[]=[]):Promise<NeuroBrainRunResult>{const system=`You are NeuroBrain, the executive AI engine. Route work through these software engines: ${Object.entries(NEURO_ENGINE_MAP).map(([id,s])=>`${id}=${s.purpose}`).join('; ')}. Plan before risky actions, use tools when useful, verify important outputs, and be concise.`;const request:BrainLLMRequest={model:this.config.model,messages:[{role:'system',content:system},{role:'user',content:input}],tools,toolChoice:tools.length?'auto':'none',temperature:.2,maxTokens:4096,keepAlive:'10m'};const response=await this.brain.chat(this.config.provider,request);return{response,engines:['prefrontal','thalamus','basal-ganglia','cortex','cerebellum','hippocampus'],toolRounds:response.toolCalls?.length?1:0};}}
