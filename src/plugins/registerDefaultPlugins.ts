import {searchEngine} from './search/SearchEngine';
import {LocalWorkspaceSearchProvider} from './search/localWorkspaceSearchProvider';
import {ArxivSearchProvider} from './search/arxivSearchProvider';
import {mathEngine} from './math/MathEngine';
import {LocalMathProvider} from './math/LocalMathProvider';
let registered=false;
export function registerDefaultPlugins(){if(registered)return;registered=true;searchEngine.register(new LocalWorkspaceSearchProvider());searchEngine.register(new ArxivSearchProvider());mathEngine.register(new LocalMathProvider());}
