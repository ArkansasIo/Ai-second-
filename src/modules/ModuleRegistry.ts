import type {ModuleContext,ModuleDefinition,ModuleEvent,ModuleRecord} from './moduleContracts';
export class ModuleRegistry {
 private records=new Map<string,ModuleRecord>(); private events:ModuleEvent[]=[];
 register(definition:ModuleDefinition){if(this.records.has(definition.id)) throw new Error(`Module already registered: ${definition.id}`); this.records.set(definition.id,{definition,state:'registered',config:{}}); this.record(definition.id,'register'); return definition;}
 get(id:string){return this.records.get(id);}
 list(){return [...this.records.values()];}
 configure(id:string,config:Record<string,unknown>){const r=this.require(id); if(r.state==='enabled'&&!r.definition.editable) throw new Error(`Module is not editable while enabled: ${id}`); r.config={...r.config,...config}; this.record(id,'configure',config); return r;}
 async start(id:string){const r=this.require(id); for(const dep of r.definition.dependencies??[]) await this.start(dep); const ctx=this.context(r); await r.definition.start?.(ctx); r.state='enabled'; this.record(id,'start'); return r;}
 async stop(id:string){const r=this.require(id); await r.definition.stop?.(this.context(r)); r.state='disabled'; this.record(id,'stop'); return r;}
 async verify(id:string){const r=this.require(id); const health=await r.definition.verify?.(this.context(r)) ?? {ok:true,state:r.state,checks:['no custom verifier'],errors:[],timestamp:Date.now()}; r.health=health; if(!health.ok) r.state='error'; this.record(id,'verify',health); return health;}
 async verifyAll(){const out:Record<string,Awaited<ReturnType<ModuleRegistry['verify']>>>={}; for(const r of this.records.values()) out[r.definition.id]=await this.verify(r.definition.id); return out;}
 eventsList(){return [...this.events];}
 private require(id:string){const r=this.records.get(id); if(!r) throw new Error(`Unknown module: ${id}`); return r;}
 private context(r:ModuleRecord):ModuleContext{return{moduleId:r.definition.id,domain:r.definition.domain,version:r.definition.version,metadata:{config:r.config},emit:(event,payload)=>this.record(r.definition.id,event as ModuleEvent['event'],payload)}}
 private record(moduleId:string,event:ModuleEvent['event'],payload?:unknown){this.events.push({moduleId,event,timestamp:Date.now(),payload}); if(this.events.length>500)this.events.shift();}
}
export const moduleRegistry=new ModuleRegistry();
