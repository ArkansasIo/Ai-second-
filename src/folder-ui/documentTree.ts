import type { TreeNode } from './treeTypes';

export const DOCUMENT_TREE: TreeNode[] = [
  { id: 'root', number: 1, name: 'AI SECOND BRAIN', key: 'root', kind: 'folder', icon: '🧠', path: '/', children: ['dashboard', 'projects', 'github', 'agents', 'development', 'settings'], selectable: true, expanded: true },
  { id: 'dashboard', number: 2, name: 'Dashboard', key: 'dashboard', kind: 'folder', icon: '📁', parentId: 'root', path: '/dashboard', children: ['overview', 'analytics', 'activity'], selectable: true, expanded: true },
  { id: 'overview', number: 3, name: 'Overview', key: 'overview', kind: 'document', icon: '📄', parentId: 'dashboard', folderId: 'dashboard', path: '/dashboard/overview', children: [], documentStyle: 'lined', selectable: true, expanded: false },
  { id: 'analytics', number: 4, name: 'Analytics', key: 'analytics', kind: 'document', icon: '📊', parentId: 'dashboard', folderId: 'dashboard', path: '/dashboard/analytics', children: [], documentStyle: 'grid', selectable: true, expanded: false },
  { id: 'activity', number: 5, name: 'Activity', key: 'activity', kind: 'document', icon: '📋', parentId: 'dashboard', folderId: 'dashboard', path: '/dashboard/activity', children: [], documentStyle: 'report', selectable: true, expanded: false },
  { id: 'projects', number: 6, name: 'Projects', key: 'projects', kind: 'folder', icon: '📁', parentId: 'root', path: '/projects', children: ['active', 'archived', 'templates'], selectable: true, expanded: true },
  { id: 'active', number: 7, name: 'Active', key: 'active', kind: 'folder', icon: '📂', parentId: 'projects', path: '/projects/active', children: [], selectable: true, expanded: false },
  { id: 'archived', number: 8, name: 'Archived', key: 'archived', kind: 'folder', icon: '📂', parentId: 'projects', path: '/projects/archived', children: [], selectable: true, expanded: false },
  { id: 'templates', number: 9, name: 'Templates', key: 'templates', kind: 'folder', icon: '📂', parentId: 'projects', path: '/projects/templates', children: [], selectable: true, expanded: false },
  { id: 'github', number: 10, name: 'GitHub', key: 'github', kind: 'folder', icon: '📁', parentId: 'root', path: '/github', children: ['repositories', 'issues', 'pulls', 'branches', 'actions'], selectable: true, expanded: true },
  { id: 'repositories', number: 11, name: 'Repositories', key: 'repositories', kind: 'folder', icon: '📂', parentId: 'github', path: '/github/repositories', children: [], selectable: true, expanded: false },
  { id: 'issues', number: 12, name: 'Issues', key: 'issues', kind: 'document', icon: '📝', parentId: 'github', folderId: 'github', path: '/github/issues', children: [], documentStyle: 'grid', selectable: true, expanded: false },
  { id: 'pulls', number: 13, name: 'Pull Requests', key: 'pull-requests', kind: 'document', icon: '🔀', parentId: 'github', folderId: 'github', path: '/github/pull-requests', children: [], documentStyle: 'grid', selectable: true, expanded: false },
  { id: 'branches', number: 14, name: 'Branches', key: 'branches', kind: 'document', icon: '🌿', parentId: 'github', folderId: 'github', path: '/github/branches', children: [], documentStyle: 'plain', selectable: true, expanded: false },
  { id: 'actions', number: 15, name: 'Actions', key: 'actions', kind: 'document', icon: '⚙️', parentId: 'github', folderId: 'github', path: '/github/actions', children: [], documentStyle: 'terminal', selectable: true, expanded: false },
  { id: 'agents', number: 16, name: 'Agents', key: 'agents', kind: 'folder', icon: '📁', parentId: 'root', path: '/agents', children: ['employees', 'teams', 'skills', 'memory'], selectable: true, expanded: true },
  { id: 'employees', number: 17, name: 'Employees', key: 'employees', kind: 'folder', icon: '📂', parentId: 'agents', path: '/agents/employees', children: [], selectable: true, expanded: false },
  { id: 'teams', number: 18, name: 'Teams', key: 'teams', kind: 'folder', icon: '📂', parentId: 'agents', path: '/agents/teams', children: [], selectable: true, expanded: false },
  { id: 'skills', number: 19, name: 'Skills', key: 'skills', kind: 'document', icon: '🧩', parentId: 'agents', folderId: 'agents', path: '/agents/skills', children: [], documentStyle: 'grid', selectable: true, expanded: false },
  { id: 'memory', number: 20, name: 'Memory', key: 'memory', kind: 'document', icon: '🧠', parentId: 'agents', folderId: 'agents', path: '/agents/memory', children: [], documentStyle: 'lined', selectable: true, expanded: false },
  { id: 'development', number: 21, name: 'Development', key: 'development', kind: 'folder', icon: '📁', parentId: 'root', path: '/development', children: ['source', 'components', 'design-docs', 'markdown', 'uml', 'builds', 'tests', 'debug'], selectable: true, expanded: true },
  { id: 'source', number: 22, name: 'Source', key: 'source', kind: 'folder', icon: '📂', parentId: 'development', path: '/development/source', children: [], selectable: true, expanded: false },
  { id: 'components', number: 23, name: 'Components', key: 'components', kind: 'folder', icon: '🧩', parentId: 'development', path: '/development/components', children: ['subcomponents'], selectable: true, expanded: true },
  { id: 'subcomponents', number: 24, name: 'Subcomponents', key: 'subcomponents', kind: 'folder', icon: '🔹', parentId: 'components', path: '/development/components/subcomponents', children: [], selectable: true, expanded: false },
  { id: 'design-docs', number: 25, name: 'Design Documents', key: 'design-documents', kind: 'folder', icon: '📐', parentId: 'development', path: '/development/design-documents', children: [], selectable: true, expanded: false },
  { id: 'markdown', number: 26, name: 'Markdown', key: 'markdown', kind: 'folder', icon: '🗒️', parentId: 'development', path: '/development/markdown', children: [], selectable: true, expanded: false },
  { id: 'uml', number: 27, name: 'UML', key: 'uml', kind: 'folder', icon: '🗺️', parentId: 'development', path: '/development/uml', children: [], selectable: true, expanded: false },
  { id: 'builds', number: 28, name: 'Builds', key: 'builds', kind: 'folder', icon: '🏗️', parentId: 'development', path: '/development/builds', children: [], selectable: true, expanded: false },
  { id: 'tests', number: 29, name: 'Tests', key: 'tests', kind: 'folder', icon: '🧪', parentId: 'development', path: '/development/tests', children: [], selectable: true, expanded: false },
  { id: 'debug', number: 30, name: 'Debug', key: 'debug', kind: 'folder', icon: '🐞', parentId: 'development', path: '/development/debug', children: [], selectable: true, expanded: false },
  { id: 'settings', number: 31, name: 'Settings', key: 'settings', kind: 'folder', icon: '📁', parentId: 'root', path: '/settings', children: ['account', 'appearance', 'ai', 'security'], selectable: true, expanded: false },
  { id: 'account', number: 32, name: 'Account', key: 'account', kind: 'document', icon: '👤', parentId: 'settings', folderId: 'settings', path: '/settings/account', children: [], documentStyle: 'form', selectable: true, expanded: false },
  { id: 'appearance', number: 33, name: 'Appearance', key: 'appearance', kind: 'document', icon: '🎨', parentId: 'settings', folderId: 'settings', path: '/settings/appearance', children: [], documentStyle: 'form', selectable: true, expanded: false },
  { id: 'ai', number: 34, name: 'AI Providers', key: 'ai-providers', kind: 'document', icon: '🤖', parentId: 'settings', folderId: 'settings', path: '/settings/ai', children: [], documentStyle: 'form', selectable: true, expanded: false },
  { id: 'security', number: 35, name: 'Security', key: 'security', kind: 'document', icon: '🔐', parentId: 'settings', folderId: 'settings', path: '/settings/security', children: [], documentStyle: 'form', selectable: true, expanded: false },
];

export function getTreeNode(id: string): TreeNode | undefined { return DOCUMENT_TREE.find((node) => node.id === id); }
export function getTreeChildren(id: string): TreeNode[] { return DOCUMENT_TREE.filter((node) => node.parentId === id); }
export function getTreePath(id: string): TreeNode[] {
  const result: TreeNode[] = [];
  let current = getTreeNode(id);
  while (current) { result.unshift(current); current = current.parentId ? getTreeNode(current.parentId) : undefined; }
  return result;
}
