import {workspaceStore} from '../../core/store';
import type {SearchProvider} from './SearchEngine';
import {getSearchProvider,type SearchRequest, type SearchResponse} from './searchProviderTypes';
export class LocalWorkspaceSearchProvider implements SearchProvider{manifest=getSearchProvider('local-index')!;async search(request:SearchRequest):Promise<SearchResponse>{const state=workspaceStore.snapshot();const q=request.query.toLowerCase();const results=state.documents.filter(d=>`${d.name} ${d.path} ${d.content}`.toLowerCase().includes(q)).slice(0,request.maxResults??10).map((d,i)=>({id:d.id,title:d.name,url:`workspace://${d.id}`,snippet:d.content.replace(/\s+/g,' ').slice(0,280),providerId:this.manifest.id,score:1/(i+1)}));return{providerId:this.manifest.id,query:request.query,results};}}
