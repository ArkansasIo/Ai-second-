export type AgentRole='lead-designer'|'programmer'|'scriptwriter'|'game-designer'|'researcher'|'tester'|'reviewer'|'general';
export interface AgentDefinition{id:string;name:string;role:AgentRole;systemPrompt:string;tools:string[];enabled:boolean;model?:string;}
export class AgentRegistry{private agents=new Map<string,AgentDefinition>(); register(agent:AgentDefinition){this.agents.set(agent.id,agent);return agent;} get(id:string){return this.agents.get(id);} list(){return [...this.agents.values()];} enable(id:string,enabled=true){const a=this.agents.get(id);if(a)a.enabled=enabled;} remove(id:string){return this.agents.delete(id);}}
export const defaultAgents:AgentDefinition[]=[
{id:'lead-designer',name:'Lead Designer',role:'lead-designer',systemPrompt:'Own architecture, product design, and acceptance criteria.',tools:['search','math','workspace'],enabled:true},
{id:'programmer',name:'Programmer',role:'programmer',systemPrompt:'Implement maintainable source code and tests.',tools:['workspace','terminal','search'],enabled:true},
{id:'tester',name:'QA Engineer',role:'tester',systemPrompt:'Find defects, regressions, and missing coverage.',tools:['workspace','test'],enabled:true},
{id:'researcher',name:'Researcher',role:'researcher',systemPrompt:'Research sources and preserve provenance.',tools:['search','math'],enabled:true}
];
