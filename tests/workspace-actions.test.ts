import { describe, expect, it } from 'vitest';
import { createWorkspace } from '../src/core/model';
import { exportWorkspace, importWorkspace } from '../src/core/workspaceTransfer';

describe('workspace transfer', () => {
  it('round trips a workspace bundle', () => {
    const state = createWorkspace('Test Workspace');
    const restored = importWorkspace(exportWorkspace(state));
    expect(restored.workspace.name).toBe('Test Workspace');
    expect(restored.folders).toHaveLength(1);
  });

  it('rejects unsupported bundles', () => {
    expect(() => importWorkspace('{"format":"wrong","formatVersion":1}')).toThrow();
  });
});
