export type ModuleState = 'registered'|'enabled'|'disabled'|'error';
export type ModulePermission = 'read'|'write'|'network'|'execute'|'secret';
export type ModuleDomain = 'core'|'ai'|'brainllm'|'agents'|'workforce'|'binder'|'workspace'|'tools'|'plugins'|'memory'|'scripting'|'development'|'verification'|'security'|'integrations'|'ui'|'database'|'runtime'|'packaging';
export interface ModuleContext { moduleId:string; domain:ModuleDomain; version:string; metadata:Record<string,unknown>; emit:(event:string,payload?:unknown)=>void; }
export interface ModuleHealth { ok:boolean; state:ModuleState; checks:string[]; errors:string[]; timestamp:number; }
export interface ModuleDefinition { id:string; name:string; domain:ModuleDomain; version:string; description:string; dependencies?:string[]; submodules?:string[]; permissions?:ModulePermission[]; configurable?:boolean; editable?:boolean; verify?: (ctx:ModuleContext)=>ModuleHealth|Promise<ModuleHealth>; start?: (ctx:ModuleContext)=>void|Promise<void>; stop?: (ctx:ModuleContext)=>void|Promise<void>; configure?: (ctx:ModuleContext,config:Record<string,unknown>)=>void|Promise<void>; }
export interface ModuleRecord { definition:ModuleDefinition; state:ModuleState; config:Record<string,unknown>; health?:ModuleHealth; }
export interface ModuleEvent { moduleId:string; event:'register'|'start'|'stop'|'configure'|'verify'|'error'; timestamp:number; payload?:unknown; }
