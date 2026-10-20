export type BrainScriptType = 'string'|'number'|'boolean'|'void'|'any'|'object'|'array'|'generic';
export type BrainScriptAccess = 'public'|'private'|'protected';
export type BrainScriptStatementKind = 'expression'|'variable'|'assignment'|'if'|'else'|'while'|'for'|'return'|'throw'|'try'|'catch'|'event'|'await'|'break'|'continue';
export interface BrainScriptParameter { name:string; type:BrainScriptType; optional?:boolean; }
export interface BrainScriptProperty { name:string; type:BrainScriptType; access:BrainScriptAccess; static?:boolean; readonly?:boolean; }
export interface BrainScriptMethod { name:string; access:BrainScriptAccess; parameters:BrainScriptParameter[]; returnType:BrainScriptType; static?:boolean; async?:boolean; body:BrainScriptStatement[]; }
export interface BrainScriptClass { name:string; access:BrainScriptAccess; extends?:string; implements?:string[]; properties:BrainScriptProperty[]; methods:BrainScriptMethod[]; }
export interface BrainScriptFunction { name:string; parameters:BrainScriptParameter[]; returnType:BrainScriptType; async?:boolean; body:BrainScriptStatement[]; }
export interface BrainScriptVariable { name:string; type?:BrainScriptType; value?:string; constant?:boolean; }
export interface BrainScriptStatement { kind:BrainScriptStatementKind; expression?:string; condition?:string; body?:BrainScriptStatement[]; elseBody?:BrainScriptStatement[]; variable?:BrainScriptVariable; }
export interface BrainScriptProgram { name:string; imports:string[]; variables:BrainScriptVariable[]; classes:BrainScriptClass[]; functions:BrainScriptFunction[]; statements:BrainScriptStatement[]; source:string; }
export const BRAINSCRIPT_KEYWORDS=['application','agent','class','interface','enum','struct','extends','implements','public','private','protected','static','async','await','function','method','property','var','let','const','if','else','while','for','return','throw','try','catch','event','workflow','task','tool','import','export','new','true','false','null'];
export function createBrainScriptProgram(name='New Program'):BrainScriptProgram{return{name,imports:[],variables:[],classes:[],functions:[],statements:[],source:''};}
