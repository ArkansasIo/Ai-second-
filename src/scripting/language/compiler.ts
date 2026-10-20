import {parse,type Diagnostic} from './lexer';
import type {BrainScriptProgram} from './brainscript';
export interface CompileResult{program:BrainScriptProgram;diagnostics:Diagnostic[];success:boolean;generated:string;}
export function compileBrainScript(source:string,name='Main'):CompileResult{const parsed=parse(source,name);const generated=parsed.diagnostics.some(d=>d.severity==='error')?'':`// Generated BrainScript module: ${name}\nexport default ${JSON.stringify(parsed.program)};\n`;return{program:parsed.program,diagnostics:parsed.diagnostics,success:parsed.diagnostics.every(d=>d.severity!=='error'),generated};}
