export interface MainMenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  children?: MainMenuItem[];
}

export const MAIN_MENU: MainMenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '▦', route: 'Dashboard' },
  { id: 'projects', label: 'Projects', icon: '▣', route: 'Projects' },
  { id: 'github', label: 'GitHub', icon: '⌘', route: 'GitHub' },
  { id: 'agents', label: 'Agents', icon: '🧠', route: 'Agents' },
  { id: 'teams', label: 'Teams', icon: '♟', route: 'Teams' },
  { id: 'tasks', label: 'Tasks', icon: '✓', route: 'Tasks' },
  { id: 'ai', label: 'AI & Models', icon: '⚙', route: 'AI' },
  { id: 'memory', label: 'Memory', icon: '◈', route: 'Memory' },
  { id: 'files', label: 'Files', icon: '▤', route: 'Files' },
  { id: 'development', label: 'Development', icon: '⌘', route: 'Development' },
  { id: 'plugins', label: 'Plugins', icon: '⚒', route: 'Plugins' },
  { id: 'browser', label: 'Browser', icon: '◎', route: 'Browser' },
  { id: 'cto', label: 'CTO Center', icon: '◆', route: 'CTO' },
  { id: 'settings', label: 'Settings', icon: '⚙', route: 'Settings' },
];

export const MAIN_MENU_ROOT = {
  id: 'ai-second-brain',
  label: 'AI SECOND BRAIN',
  icon: '🧠',
  route: 'Dashboard',
  children: MAIN_MENU,
} as const;
