import type {SearchRequest,SearchResponse} from './searchProviderTypes';
import {searchEngine} from './SearchEngine';
export interface SearchToolInput{query:string;providerId?:string;kind?:SearchRequest['kind'];maxResults?:number;projectId?:string;}
export async function searchTool(input:SearchToolInput):Promise<SearchResponse>{return searchEngine.run({query:input.query,kind:input.kind,maxResults:input.maxResults??10,projectId:input.projectId},input.providerId);}
