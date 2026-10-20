import {mathEngine} from './MathEngine';
import type {MathRequest,MathResponse} from './mathProviderTypes';
import {provenanceLog} from '../../ai/provenance';
export async function mathTool(request:MathRequest,preferredProviderId?:string):Promise<MathResponse>{const response=await mathEngine.run(request,preferredProviderId);provenanceLog.add({source:`math:${response.providerId}`,provider:response.providerId,query:request.expression,metadata:{operation:request.operation,error:response.error}});return response;}
