export type BrainScriptModuleState='enabled'|'disabled'|'editable'|'frozen';
export interface BrainScriptModuleSpec{name:string;domain:string;version:string;dependencies:string[];submodules:string[];state:BrainScriptModuleState;permissions:string[];}
export interface BrainScriptModuleCommand{command:'enable'|'disable'|'configure'|'verify'|'freeze'|'edit';module:string;arguments?:Record<string,string|number|boolean>;}
export interface BrainScriptModuleProgram{version:string;modules:BrainScriptModuleSpec[];commands:BrainScriptModuleCommand[];}
export function createModuleProgram(version='0.1.12'):BrainScriptModuleProgram{return{version,modules:[],commands:[]};}
