export type SearchProviderKind='web'|'code'|'documentation'|'academic'|'local';
export interface SearchProviderManifest{id:string;name:string;kind:SearchProviderKind;website:string;enabled:boolean;capabilities:string[];requiresApiKey:boolean;endpoint?:string;}
export interface SearchRequest{query:string;kind?:SearchProviderKind;maxResults?:number;projectId?:string;safeSearch?:boolean;}
export interface SearchResult{id:string;title:string;url:string;snippet:string;providerId:string;publishedAt?:string;score?:number;}
export interface SearchResponse{providerId:string;query:string;results:SearchResult[];error?:string;}
export const SEARCH_PROVIDERS:SearchProviderManifest[]=[
{id:'google',name:'Google Search',kind:'web',website:'https://www.google.com/',enabled:false,capabilities:['web search','news discovery','site search'],requiresApiKey:true},
{id:'bing',name:'Bing Search',kind:'web',website:'https://www.bing.com/',enabled:false,capabilities:['web search','news discovery','image discovery'],requiresApiKey:true},
{id:'brave-search',name:'Brave Search',kind:'web',website:'https://search.brave.com/',enabled:false,capabilities:['web search','independent index','news'],requiresApiKey:true},
{id:'duckduckgo',name:'DuckDuckGo',kind:'web',website:'https://duckduckgo.com/',enabled:false,capabilities:['web search','privacy-oriented discovery'],requiresApiKey:false},
{id:'github',name:'GitHub Code Search',kind:'code',website:'https://github.com/',enabled:true,capabilities:['repository search','code search','issues','documentation'],requiresApiKey:true},
{id:'arxiv',name:'arXiv',kind:'academic',website:'https://arxiv.org/',enabled:true,capabilities:['research papers','machine learning','computer science'],requiresApiKey:false},
{id:'local-index',name:'Local Workspace Search',kind:'local',website:'local://workspace-search',enabled:true,capabilities:['project files','source code','documents','memory'],requiresApiKey:false}
];
export function getSearchProvider(id:string){return SEARCH_PROVIDERS.find(provider=>provider.id===id);}
