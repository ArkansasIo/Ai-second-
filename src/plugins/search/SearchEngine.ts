import {SEARCH_PROVIDERS,type SearchRequest,type SearchResponse} from './searchProviderTypes';
export interface SearchProvider{manifest:(typeof SEARCH_PROVIDERS)[number];search(request:SearchRequest):Promise<SearchResponse>;}
export class SearchEngine{
 private providers=new Map<string,SearchProvider>();
 register(provider:SearchProvider){this.providers.set(provider.manifest.id,provider);}
 async run(request:SearchRequest,preferredProviderId?:string):Promise<SearchResponse>{const ids=preferredProviderId?[preferredProviderId,...SEARCH_PROVIDERS.filter(p=>p.id!==preferredProviderId&&p.enabled).map(p=>p.id)]:SEARCH_PROVIDERS.filter(p=>p.enabled).map(p=>p.id);for(const id of ids){const provider=this.providers.get(id);if(provider){try{return await provider.search(request);}catch(error){return{providerId:id,query:request.query,results:[],error:error instanceof Error?error.message:String(error)};}}}return{providerId:'none',query:request.query,results:[],error:'No enabled search provider is registered.'};}
}
export const searchEngine=new SearchEngine();
