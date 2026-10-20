import { MATH_PROVIDERS, type MathRequest, type MathResponse } from './mathProviderTypes';
export interface MathProvider { manifest:(typeof MATH_PROVIDERS)[number]; execute(request:MathRequest):Promise<MathResponse>; }
export class MathEngine {
  private providers = new Map<string,MathProvider>();
  register(provider:MathProvider){this.providers.set(provider.manifest.id,provider);}
  async run(request:MathRequest,preferredProviderId?:string):Promise<MathResponse>{
    const ids=preferredProviderId?[preferredProviderId,...MATH_PROVIDERS.filter(p=>p.id!==preferredProviderId&&p.enabled).map(p=>p.id)]:MATH_PROVIDERS.filter(p=>p.enabled).map(p=>p.id);
    for(const id of ids){const provider=this.providers.get(id);if(provider){try{return await provider.execute(request);}catch(error){return{providerId:id,result:'',error:error instanceof Error?error.message:String(error)};}}}
    return{providerId:'none',result:'',error:'No enabled math provider is registered.'};
  }
}
export const mathEngine=new MathEngine();
