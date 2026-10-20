import type{BrainLLM,BrainLLMRequest,BrainLLMResponse,BrainLLMToolDefinition,BrainLLMMessage}from'./BrainLLM';
import{neuroBrainEngineRouter,type NeuroRoute}from'./NeuroBrainEngineRouter';
import{NEURO_ENGINE_MAP,type NeuroEngineId}from'./NeuroEngine';
export interface NeuroBrainToolExecutor{execute(name:string,args:Record<string,unknown>):Promise<unknown>}
export interface NeuroBrainConfig{maxToolRounds?:number;parallelEngines?:boolean;model:string;provider:string;toolExecutor?:NeuroBrainToolExecutor}
export interface NeuroBrainRunResult{response:BrainLLMResponse;engines:NeuroEngineId[];route:NeuroRoute;toolRounds:number;toolResults:number;errors:string[]}
export class NeuroBrainAgent{
constructor(private readonly brain:BrainLLM,private readonly config:NeuroBrainConfig){}
private system(route:NeuroRoute){return`You are NeuroBrain, the executive AI engine. Route work through these software engines: ${route.engines.map(id=>`${id}=${NEURO_ENGINE_MAP[id].purpose}`).join('; ')}. Priority=${route.priority}. Plan before risky actions, use tools when useful, verify important outputs, and preserve concise, actionable results.`}
async run(input:string,tools:BrainLLMToolDefinition[]=[]):Promise<NeuroBrainRunResult>{
const route=neuroBrainEngineRouter.route(input);const messages:BrainLLMMessage[]=[{role:'system',content:this.system(route)},{role:'user',content:input}];const maxRounds=Math.max(0,this.config.maxToolRounds??8);let toolRounds=0;let toolResults=0;const errors:string[]=[];let response:BrainLLMResponse;
while(true){const request:BrainLLMRequest={model:this.config.model,messages,tools,toolChoice:tools.length?'auto':'none',temperature:route.priority==='deep'?.15:.2,maxTokens:4096,keepAlive:'10m'};response=await this.brain.chat(this.config.provider,request);if(!response.toolCalls?.length||!this.config.toolExecutor||toolRounds>=maxRounds)break;
messages.push({role:'assistant',content:response.content,toolCalls:response.toolCalls});toolRounds++;
const calls=response.toolCalls;const results=await Promise.all(calls.map(async call=>{try{const value=await this.config.toolExecutor!.execute(call.name,call.arguments);toolResults++;return{role:'tool' as const,content:JSON.stringify(value),toolCallId:call.id}}catch(error){const message=error instanceof Error?error.message:String(error);errors.push(`${call.name}: ${message}`);return{role:'tool' as const,content:JSON.stringify({error:message}),toolCallId:call.id}}}));messages.push(...results);
if(toolRounds>=maxRounds)break;
}
return{response,engines:route.engines,route,toolRounds,toolResults,errors};}
}
