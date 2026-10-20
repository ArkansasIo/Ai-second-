import {mathEngine} from './MathEngine';
import type {MathRequest,MathResponse} from './mathProviderTypes';
export async function mathTool(request:MathRequest):Promise<MathResponse>{return mathEngine.run(request);}
