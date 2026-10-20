export type MathProviderKind='symbolic'|'numeric'|'knowledge'|'graphing'|'statistics'|'units'|'code';
export interface MathProviderManifest{id:string;name:string;kind:MathProviderKind;website:string;enabled:boolean;capabilities:string[];endpoint?:string;license?:string;}
export interface MathRequest{expression:string;operation:'evaluate'|'simplify'|'solve'|'differentiate'|'integrate'|'factor'|'matrix'|'plot'|'units'|'statistics'|'explain';variables?:Record<string,number>;}
export interface MathResponse{providerId:string;result:string;exact?:string;decimal?:string;steps?:string[];plotData?:Array<{x:number;y:number}>;error?:string;}
export const MATH_PROVIDERS:MathProviderManifest[]=[
{id:'wolfram-alpha',name:'Wolfram|Alpha',kind:'symbolic',website:'https://www.wolframalpha.com/',enabled:false,capabilities:['symbolic math','equations','calculus','algebra','units','statistics','plots','knowledge']},
{id:'sympy-local',name:'SymPy Local',kind:'symbolic',website:'https://www.sympy.org/',enabled:true,capabilities:['symbolic math','algebra','calculus','matrices','solving','simplification']},
{id:'numpy-local',name:'NumPy Local',kind:'numeric',website:'https://numpy.org/',enabled:true,capabilities:['numerical arrays','linear algebra','numerical computation']},
{id:'scipy-local',name:'SciPy Local',kind:'numeric',website:'https://scipy.org/',enabled:true,capabilities:['optimization','statistics','integration','signal processing','scientific computing']},
{id:'sage-local',name:'SageMath',kind:'symbolic',website:'https://www.sagemath.org/',enabled:false,capabilities:['computer algebra','number theory','calculus','linear algebra','geometry']},
{id:'desmos',name:'Desmos',kind:'graphing',website:'https://www.desmos.com/',enabled:false,capabilities:['graphing','functions','visualization']},
{id:'geogebra',name:'GeoGebra',kind:'graphing',website:'https://www.geogebra.org/',enabled:false,capabilities:['geometry','algebra','graphing','calculus']},
{id:'unit-converter',name:'Local Unit Engine',kind:'units',website:'local://unit-engine',enabled:true,capabilities:['unit conversion','dimensional analysis']},
{id:'statistics-local',name:'Local Statistics Engine',kind:'statistics',website:'local://statistics',enabled:true,capabilities:['descriptive statistics','probability','distributions','regression']}];
export function getMathProvider(id:string){return MATH_PROVIDERS.find(provider=>provider.id===id);}
