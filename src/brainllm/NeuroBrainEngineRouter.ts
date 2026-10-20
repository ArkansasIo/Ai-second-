import type{NeuroEngineId,NeuroEngineTask,NeuroEngineResult}from'./NeuroEngine';
import{NEURO_ENGINE_MAP}from'./NeuroEngine';
export interface NeuroRoute{engines:NeuroEngineId[];reason:string;priority:'fast'|'normal'|'deep'}
const ROUTES:Array<{match:RegExp;engines:NeuroEngineId[];reason:string;priority:NeuroRoute['priority']}>= [
{match:/\b(plan|roadmap|architecture|design|decompose|strategy)\b/i,engines:['prefrontal','cortex','cerebellum'],reason:'planning and synthesis',priority:'deep'},
{match:/\b(memory|remember|recall|history|context|retrieve)\b/i,engines:['hippocampus','thalamus','cortex'],reason:'memory retrieval and context selection',priority:'normal'},
{match:/\b(tool|execute|run|call|api|file|terminal|search)\b/i,engines:['basal-ganglia','prefrontal','amygdala','cerebellum'],reason:'action selection with safety and verification',priority:'normal'},
{match:/\b(error|bug|test|verify|validate|debug|regression)\b/i,engines:['cerebellum','prefrontal','amygdala'],reason:'error correction and risk checking',priority:'normal'},
{match:/\b(write|code|program|typescript|javascript|python|brainscript)\b/i,engines:['prefrontal','cortex','cerebellum'],reason:'code planning, generation and feedback',priority:'deep'}
];
export class NeuroBrainEngineRouter{
route(task:NeuroEngineTask|string):NeuroRoute{const text=typeof task==='string'?task:task.input;const hit=ROUTES.find(r=>r.match.test(text));if(hit)return{engines:hit.engines,reason:hit.reason,priority:hit.priority};return{engines:['thalamus','prefrontal','cortex','cerebellum'],reason:'general executive processing',priority:'normal'}}
describe(route:NeuroRoute){return route.engines.map(id=>`${id}: ${NEURO_ENGINE_MAP[id].purpose}`).join('; ')}
combine(results:NeuroEngineResult[]):string{return results.map(r=>`[${r.engine}] ${r.output}`).join('\n')}
}
export const neuroBrainEngineRouter=new NeuroBrainEngineRouter();
