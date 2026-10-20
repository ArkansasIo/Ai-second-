import type { TreeNode } from './treeTypes';

export interface TreeNavigationState {
  selectedId: string;
  expandedIds: string[];
}

export function openTreeNode(node: TreeNode): { path: string; title: string; style: string } {
  return { path: node.path, title: node.name, style: node.documentStyle || (node.kind === 'folder' ? 'plain' : 'lined') };
}

export function toggleTreeNode(state: TreeNavigationState, nodeId: string): TreeNavigationState {
  const expanded = new Set(state.expandedIds);
  expanded.has(nodeId) ? expanded.delete(nodeId) : expanded.add(nodeId);
  return { ...state, selectedId: nodeId, expandedIds: [...expanded] };
}
