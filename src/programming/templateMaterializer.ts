export interface GeneratedFile{path:string;content:string;language:string;}
export interface ProgramTemplate{id:string;name:string;description:string;files:GeneratedFile[];}
export const CORE_PROGRAM_TEMPLATES:ProgramTemplate[]=[
{id:'typescript-app',name:'TypeScript Application',description:'Typed application with source, tests, and configuration.',files:[{path:'src/index.ts',language:'typescript',content:'export function main(){ return "Hello AI Second Brain"; }\n'},{path:'src/index.test.ts',language:'typescript',content:'import {describe,it,expect} from "vitest";\nimport {main} from "./index";\ndescribe("main",()=>it("returns a value",()=>expect(main()).toBeTruthy()));\n'}]},
{id:'brainscript-agent',name:'BrainScript Agent',description:'Agent definition with task and tool declarations.',files:[{path:'main.brain',language:'brainscript',content:'agent MainAgent {\n  task build { }\n  tool search { }\n}\n'}]},
{id:'library',name:'TypeScript Library',description:'Reusable library with tests.',files:[{path:'src/index.ts',language:'typescript',content:'export {};\n'},{path:'src/index.test.ts',language:'typescript',content:'import {describe,it} from "vitest";\ndescribe("library",()=>it("loads",()=>{}));\n'}]}
];
export function materializeTemplate(id:string){return CORE_PROGRAM_TEMPLATES.find(t=>t.id===id);}
