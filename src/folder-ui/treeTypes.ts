export type TreeNodeKind = 'folder' | 'document' | 'component' | 'subcomponent' | 'design' | 'markdown' | 'code' | 'asset' | 'uml' | 'test' | 'config' | 'sticky';

export interface TreeNode {
  id: string;
  number: number;
  name: string;
  key: string;
  kind: TreeNodeKind;
  icon: string;
  parentId?: string;
  folderId?: string;
  path: string;
  children: string[];
  documentStyle?: string;
  extension?: string;
  selectable: boolean;
  expanded: boolean;
}

export interface TreeBranch {
  nodeId: string;
  depth: number;
  hasChildren: boolean;
  isLast: boolean;
  ancestorHasNext: boolean[];
}
