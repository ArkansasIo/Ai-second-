export interface BinderDefinition { id:string; number:number; name:string; tag:string; icon:string; color:string; pages:string[]; position:'top'|'right'; }
export const BINDERS: BinderDefinition[] = [
 {id:'BINDER-001',number:1,name:'Dashboard',tag:'DASH',icon:'▦',color:'#3b82f6',pages:['Overview','Analytics','Activity','Status','Notifications'],position:'top'},
 {id:'BINDER-002',number:2,name:'Projects',tag:'PROJECTS',icon:'▣',color:'#22c55e',pages:['All Projects','Active','Archived','Templates','Tasks','Builds','Releases'],position:'top'},
 {id:'BINDER-003',number:3,name:'GitHub',tag:'GITHUB',icon:'⌘',color:'#a855f7',pages:['Repositories','Code','Branches','Issues','Pull Requests','Actions','Releases'],position:'top'},
 {id:'BINDER-004',number:4,name:'Agents',tag:'AGENTS',icon:'🧠',color:'#06b6d4',pages:['Employees','Teams','Skills','Memory','Jobs','Performance'],position:'top'},
 {id:'BINDER-005',number:5,name:'Teams',tag:'TEAMS',icon:'♟',color:'#ec4899',pages:['Members','Team Chat','Assignments','Status'],position:'top'},
 {id:'BINDER-006',number:6,name:'Tasks',tag:'TASKS',icon:'✓',color:'#eab308',pages:['My Tasks','Kanban','Calendar','Dependencies','Completed'],position:'top'},
 {id:'BINDER-007',number:7,name:'AI & Models',tag:'AI',icon:'⚙',color:'#8b5cf6',pages:['Chat','Models','Ollama','Providers','Testing'],position:'top'},
 {id:'BINDER-008',number:8,name:'Memory',tag:'MEMORY',icon:'◈',color:'#14b8a6',pages:['Conversations','Long-Term','Project Memory','Knowledge Base','Search'],position:'right'},
 {id:'BINDER-009',number:9,name:'Files',tag:'FILES',icon:'▤',color:'#f97316',pages:['Workspace','Imported','Artifacts','Downloads'],position:'right'},
 {id:'BINDER-010',number:10,name:'Development',tag:'DEV',icon:'⌘',color:'#0ea5e9',pages:['IDE','Source','Program','Terminal','Build','Test','Debug','Logs'],position:'right'},
 {id:'BINDER-011',number:11,name:'Plugins',tag:'PLUGINS',icon:'⚒',color:'#6366f1',pages:['Marketplace','Installed','Create Plugin','Dependencies','Permissions','Updates'],position:'right'},
 {id:'BINDER-012',number:12,name:'Browser',tag:'BROWSER',icon:'◎',color:'#64748b',pages:['Tabs','Bookmarks','Sessions','Search'],position:'right'},
 {id:'BINDER-013',number:13,name:'CTO Center',tag:'CTO',icon:'◆',color:'#ef4444',pages:['Command Center','Workforce','Resources','Security','Operations'],position:'right'},
 {id:'BINDER-014',number:14,name:'Settings',tag:'SETTINGS',icon:'⚙',color:'#94a3b8',pages:['Account','Appearance','AI','Security','Network','Voice','Updates'],position:'right'},
];
