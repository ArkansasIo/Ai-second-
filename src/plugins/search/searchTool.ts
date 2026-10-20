import type {SearchRequest,SearchResponse} from './searchProviderTypes';
import {searchEngine} from './SearchEngine';
import {provenanceLog} from '../../ai/provenance';
export interface SearchToolInput{query:string;providerId?:string;kind?:SearchRequest['kind'];maxResults?:number;projectId?:string;}
export async function searchTool(input:SearchToolInput):Promise<SearchResponse>{const response=await searchEngine.run({query:input.query,kind:input.kind,maxResults:input.maxResults??10,projectId:input.projectId},input.providerId);for(const result of response.results)provenanceLog.add({source:result.url,provider:response.providerId,query:input.query,metadata:{title:result.title,projectId:input.projectId}});return response;}
