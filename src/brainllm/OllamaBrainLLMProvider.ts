import type { BrainLLMMessage, BrainLLMModel, BrainLLMProvider, BrainLLMRequest, BrainLLMResponse } from './BrainLLM';
export class OllamaBrainLLMProvider implements BrainLLMProvider {
 readonly id='ollama'; readonly name='Ollama Brain LLM Provider';
 private _baseUrl:string;
 constructor(baseUrl='http://127.0.0.1:11434'){this._baseUrl=baseUrl.replace(/\/$/,'');}
 get baseUrl(){return this._baseUrl;}
 setBaseUrl(baseUrl:string){this._baseUrl=baseUrl.replace(/\/$/,'');}
 async listModels():Promise<BrainLLMModel[]>{const response=await fetch(`${this._baseUrl}/api/tags`);if(!response.ok)throw new Error(`Brain LLM/Ollama model discovery failed: ${response.status}`);const data=await response.json() as {models?:Array<{name:string;details?:Record<string,unknown>}>};return(data.models??[]).map(model=>({id:model.name,provider:this.id,displayName:model.name,capabilities:['chat','local-inference']}));}
 async chat(request:BrainLLMRequest):Promise<BrainLLMResponse>{const messages:BrainLLMMessage[]=request.messages;const response=await fetch(`${this._baseUrl}/api/chat`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({model:request.model,messages,stream:false,options:{temperature:request.temperature,num_predict:request.maxTokens}})});if(!response.ok)throw new Error(`Brain LLM/Ollama chat failed: ${response.status}`);const data=await response.json() as {message?:{content?:string};prompt_eval_count?:number;eval_count?:number};const promptTokens=data.prompt_eval_count;const completionTokens=data.eval_count;return{model:request.model,provider:this.id,content:data.message?.content??'',createdAt:new Date().toISOString(),usage:{promptTokens,completionTokens,totalTokens:promptTokens!==undefined&&completionTokens!==undefined?promptTokens+completionTokens:undefined}};}
}
