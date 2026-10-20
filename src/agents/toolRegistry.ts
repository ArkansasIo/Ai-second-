export interface ToolDefinition{ id:string; name:string; description:string; permission:'read'|'write'|'network'|'execute'; execute:(input:unknown)=>Promise<unknown>|unknown; }
export class ToolRegistry{private tools=new Map<string,ToolDefinition>();register(tool:ToolDefinition){this.tools.set(tool.id,tool);return tool;}get(id:string){return this.tools.get(id);}list(){return [...this.tools.values()];}async call(id:string,input:unknown){const tool=this.tools.get(id);if(!tool)throw new Error(`Tool not found: ${id}`);return tool.execute(input);}}
export const toolRegistry=new ToolRegistry();
