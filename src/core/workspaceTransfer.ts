import type { WorkspaceState } from './model';

const FORMAT = 'ai-second-brain-workspace';
const FORMAT_VERSION = 1;

export interface WorkspaceBundle {
  format: typeof FORMAT;
  formatVersion: number;
  exportedAt: string;
  workspace: WorkspaceState;
}

export function exportWorkspace(state: WorkspaceState): string {
  const bundle: WorkspaceBundle = { format: FORMAT, formatVersion: FORMAT_VERSION, exportedAt: new Date().toISOString(), workspace: state };
  return JSON.stringify(bundle, null, 2);
}

export function importWorkspace(text: string): WorkspaceState {
  const parsed: unknown = JSON.parse(text);
  if (!parsed || typeof parsed !== 'object') throw new Error('Invalid workspace bundle');
  const bundle = parsed as Partial<WorkspaceBundle>;
  if (bundle.format !== FORMAT || bundle.formatVersion !== FORMAT_VERSION || !bundle.workspace) {
    throw new Error('Unsupported AI Second Brain workspace bundle');
  }
  const state = bundle.workspace;
  if (state.version !== 1 || !state.workspace?.rootFolderId || !Array.isArray(state.folders) || !Array.isArray(state.documents) || !Array.isArray(state.projects)) {
    throw new Error('Workspace bundle failed schema validation');
  }
  return structuredClone(state);
}
