import {describe, expect, it} from 'vitest';
import {BinderDocumentRepository, BinderRevisionStore} from '../src/binder/core';
import {DiagramDocumentStore} from '../src/diagrams/DiagramDocumentStore';
import {AgentClusterOrchestrator} from '../src/agents/AgentClusterOrchestrator';
import {AgentHandoffStore} from '../src/agents/AgentHandoffStore';
import {MemoryIndex} from '../src/memory/MemoryIndex';
import {conversationMemory} from '../src/memory/ConversationMemoryStore';
import {BuildProfileRegistry} from '../src/development/BuildProfileRegistry';
import {BuildArtifactRegistry} from '../src/development/BuildArtifactRegistry';
import {createReleaseManifest, addReleaseArtifact, validateReleaseManifest} from '../src/release/ReleaseManifest';
import {brainScriptTypeChecker} from '../src/scripting/language/BrainScriptTypeChecker';
import {createBrainScriptProgram} from '../src/scripting/language/brainscript';

describe('yellow feature foundations', () => {
  it('stores binder documents and revisions', () => {
    const docs = new BinderDocumentRepository(() => '2026-01-01T00:00:00.000Z');
    const doc = docs.upsert('page-1', {title: 'Test', content: 'hello'});
    expect(doc.revision).toBe(1);
    const revisions = new BinderRevisionStore(() => '2026-01-01T00:00:00.000Z');
    revisions.commit(doc.id, doc.content);
    expect(revisions.latest(doc.id)?.content).toBe('hello');
  });

  it('creates and exports diagrams', () => {
    const store = new DiagramDocumentStore(() => '2026-01-01T00:00:00.000Z');
    const diagram = store.create('Flow', 'flowchart');
    store.update(diagram.id, {nodes: [{id:'n1', type:'start', label:'Start', x:0, y:0}]});
    expect(store.exportJson(diagram.id)).toContain('Start');
  });

  it('tracks agent dependencies and handoffs', () => {
    const cluster = new AgentClusterOrchestrator().create('Build', [{id:'programmer', name:'Programmer', role:'programmer', systemPrompt:'', tools:[], enabled:true}]);
    const orchestrator = new AgentClusterOrchestrator();
    const other = orchestrator.create('Build', [{id:'programmer', name:'Programmer', role:'programmer', systemPrompt:'', tools:[], enabled:true}]);
    orchestrator.addTask(other.id, {id:'compile', title:'Compile', agentId:'programmer', input:'build'});
    expect(orchestrator.readyTasks(other.id)[0]?.id).toBe('compile');
    expect(cluster.agents).toEqual(['programmer']);
    const handoffs = new AgentHandoffStore();
    const handoff = handoffs.create({fromAgent:'programmer', toAgent:'tester', taskId:'compile', summary:'Build complete', artifacts:['dist/app.js']});
    expect(handoffs.pending('tester')).toHaveLength(1);
    handoffs.acknowledge(handoff.id);
    expect(handoffs.pending('tester')).toHaveLength(0);
  });

  it('indexes local conversation memory', () => {
    conversationMemory.clear();
    conversationMemory.append({role:'user', content:'NeuroBrain architecture verification'});
    expect(new MemoryIndex().search('NeuroBrain verification')).toHaveLength(1);
    conversationMemory.clear();
  });

  it('registers build artifacts and validates release manifests', () => {
    const profiles = new BuildProfileRegistry();
    profiles.register({id:'test', name:'Test', platform:'web', command:'npm', args:['test'], artifactPatterns:['reports/**']});
    expect(profiles.get('test')?.platform).toBe('web');
    const artifacts = new BuildArtifactRegistry();
    const artifact = artifacts.register({name:'report', path:'reports/test.xml', kind:'test-report', buildId:'b1'});
    expect(artifacts.list('b1')).toHaveLength(1);
    const manifest = addReleaseArtifact(createReleaseManifest('0.1.16', 'abc123'), {name:artifact.name, platform:'web', path:artifact.path, signed:false});
    expect(validateReleaseManifest(manifest)).toEqual([]);
  });

  it('performs BrainScript symbol checks', () => {
    const program = createBrainScriptProgram('Test');
    program.variables.push({name:'answer', type:'number'});
    program.statements.push({kind:'expression', expression:'answer + missing'});
    const diagnostics = brainScriptTypeChecker.check(program);
    expect(diagnostics.some(item => item.symbol === 'missing')).toBe(true);
  });
});
