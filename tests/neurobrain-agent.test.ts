import{describe,expect,it}from'vitest';
import{BrainLLM,type BrainLLMProvider}from'../src/brainllm/BrainLLM';
import{NeuroBrainAgent}from'../src/brainllm/NeuroBrainAgent';
import{neuroBrainEngineRouter}from'../src/brainllm/NeuroBrainEngineRouter';

describe('NeuroBrain',()=>{
it('routes code work through executive/cortex/feedback engines',()=>{const route=neuroBrainEngineRouter.route('debug TypeScript code and verify the regression');expect(route.engines).toContain('prefrontal');expect(route.engines).toContain('cerebellum')});
it('executes tool calls until the model completes',async()=>{let calls=0;const provider:BrainLLMProvider={id:'test-neuro',name:'Test',async listModels(){return[]},async chat(request){calls++;if(calls===1)return{model:request.model,provider:'test-neuro',content:'',createdAt:new Date().toISOString(),toolCalls:[{id:'1',name:'search',arguments:{q:'NeuroBrain'}}]};return{model:request.model,provider:'test-neuro',content:'verified result',createdAt:new Date().toISOString(),done:true}}};const brain=new BrainLLM();brain.register(provider);const agent=new NeuroBrainAgent(brain,{provider:'test-neuro',model:'test',maxToolRounds:3,toolExecutor:{async execute(name,args){expect(name).toBe('search');expect(args.q).toBe('NeuroBrain');return{ok:true}}}});const result=await agent.run('research and verify NeuroBrain');expect(result.toolRounds).toBe(1);expect(result.toolResults).toBe(1);expect(result.response.content).toBe('verified result');expect(result.errors).toHaveLength(0)});
});
