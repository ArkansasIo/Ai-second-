export interface ProvenanceRecord{id:string;source:string;provider?:string;query?:string;retrievedAt:string;agentId?:string;metadata?:Record<string,unknown>;}
export class ProvenanceLog{private records:ProvenanceRecord[]=[];add(record:Omit<ProvenanceRecord,'id'|'retrievedAt'>){const r={...record,id:crypto.randomUUID?.()??Math.random().toString(36).slice(2),retrievedAt:new Date().toISOString()};this.records.push(r);return r;}list(){return [...this.records];}clear(){this.records=[];}}
export const provenanceLog=new ProvenanceLog();
