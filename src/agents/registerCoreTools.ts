import {toolRegistry} from './toolRegistry';
import {searchTool} from '../plugins/search/searchTool';
import {mathTool} from '../plugins/math/mathTool';
import {buildWorkspaceContext} from '../workspace/WorkspaceContextBuilder';
import {registerDefaultPlugins} from '../plugins/registerDefaultPlugins';
let registered=false;
export function registerCoreAgentTools(){if(registered)return toolRegistry;registered=true;registerDefaultPlugins();toolRegistry.register({id:'search',name:'Search',description:'Search configured providers and return provenance-ready results.',permission:'network',execute:(input)=>searchTool(input as Parameters<typeof searchTool>[0])});toolRegistry.register({id:'math',name:'Math',description:'Run a calculation through the configured MathEngine provider.',permission:'read',execute:(input)=>mathTool(input as Parameters<typeof mathTool>[0])});toolRegistry.register({id:'workspace',name:'Workspace Context',description:'Read the active workspace context and documents.',permission:'read',execute:(input)=>{const value=input as {folderId?:string;projectId?:string};return buildWorkspaceContext(value?.folderId,value?.projectId);}});return toolRegistry;}
