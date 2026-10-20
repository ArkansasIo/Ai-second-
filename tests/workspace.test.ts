import {describe,it,expect} from 'vitest';
import {createWorkspace} from '../src/core/model';
import {MemoryWorkspaceStorage} from '../src/core/persistence';
describe('workspace persistence',()=>{it('round trips state',async()=>{const s=new MemoryWorkspaceStorage();const state=createWorkspace('Test');await s.save(state);expect((await s.load())?.workspace.name).toBe('Test');});});
