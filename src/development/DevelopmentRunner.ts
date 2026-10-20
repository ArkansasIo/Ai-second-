export type BuildStatus='idle'|'running'|'success'|'failed';
export interface BuildRequest{projectId?:string;target:'web'|'desktop'|'test'|'brainscript';source?:string;}
export interface BuildResult{status:Exclude<BuildStatus,'idle'|'running'>;startedAt:string;finishedAt:string;diagnostics:string[];artifact?:string;}
export class DevelopmentRunner{async build(request:BuildRequest):Promise<BuildResult>{const started=new Date().toISOString();try{if(request.target==='brainscript'&&!request.source)throw new Error('BrainScript source is required');return{status:'success',startedAt:started,finishedAt:new Date().toISOString(),diagnostics:[],artifact:request.target};}catch(error){return{status:'failed',startedAt:started,finishedAt:new Date().toISOString(),diagnostics:[error instanceof Error?error.message:String(error)]};}}}
export const developmentRunner=new DevelopmentRunner();
