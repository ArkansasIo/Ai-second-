export interface AuditEvent{action:string;actor:string;target?:string;details?:Record<string,unknown>;at:string;}
export class AuditLog{private events:AuditEvent[]=[];record(event:Omit<AuditEvent,'at'>){this.events.push({...event,at:new Date().toISOString()});}list(){return [...this.events];}clear(){this.events=[];}}
export const auditLog=new AuditLog();
