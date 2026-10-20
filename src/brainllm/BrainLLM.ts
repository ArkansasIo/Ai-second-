export type BrainLLMRole='system'|'user'|'assistant'|'tool';
export interface BrainLLMToolCall{id:string;name:string;arguments:Record<string,unknown>}
export interface BrainLLMToolDefinition{name:string;description:string;parameters:Record<string,unknown>}
export interface BrainLLMMessage{role:BrainLLMRole;content:string;name?:string;toolCallId?:string;toolCalls?:BrainLLMToolCall[]}
export interface BrainLLMModel{id:string;provider:string;displayName?:string;contextWindow?:number;capabilities?:string[];parameterSize?:string;quantization?:string}
export interface BrainLLMRequest{model:string;messages:BrainLLMMessage[];temperature?:number;maxTokens?:number;stream?:boolean;tools?:BrainLLMToolDefinition[];toolChoice?:'auto'|'none';format?:'json'|Record<string,unknown>;keepAlive?:string|number;options?:Record<string,unknown>}
export interface BrainLLMResponse{model:string;content:string;provider:string;createdAt:string;done?:boolean;toolCalls?:BrainLLMToolCall[];usage?:{promptTokens?:number;completionTokens?:number;totalTokens?:number}}
export interface BrainLLMProvider{id:string;name:string;listModels():Promise<BrainLLMModel[]>;chat(request:BrainLLMRequest):Promise<BrainLLMResponse>}
export class BrainLLM{private providers=new Map<string,BrainLLMProvider>();register(provider:BrainLLMProvider){this.providers.set(provider.id,provider);return provider}provider(id:string){return this.providers.get(id)}providersList(){return[...this.providers.values()]}async chat(providerId:string,request:BrainLLMRequest){const provider=this.providers.get(providerId);if(!provider)throw new Error(`Brain LLM provider not registered: ${providerId}`);return provider.chat(request)}async models(providerId?:string){if(providerId){const p=this.providers.get(providerId);if(!p)throw new Error(`Brain LLM provider not registered: ${providerId}`);return p.listModels()}return(await Promise.all([...this.providers.values()].map(p=>p.listModels()))).flat()}}
export const brainLLM=new BrainLLM();
