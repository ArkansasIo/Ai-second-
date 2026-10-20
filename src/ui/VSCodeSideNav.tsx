import React,{useState} from 'react';

type Item={id:string;label:string;icon:string;children?:Item[]};

type Props={active:string;onSelect:(id:string)=>void};

const groups:Item[]=[
 {id:'explorer',label:'Explorer',icon:'▤',children:[{id:'projects',label:'Projects',icon:'◈'},{id:'workspace',label:'Workspace',icon:'□'},{id:'files',label:'Files',icon:'▱'}]},
 {id:'search',label:'Search',icon:'⌕',children:[{id:'search-files',label:'Search Files',icon:'⌕'},{id:'symbols',label:'Symbols',icon:'◇'},{id:'commands',label:'Commands',icon:'›'}]},
 {id:'source',label:'Source Control',icon:'⑂',children:[{id:'changes',label:'Changes',icon:'●'},{id:'branches',label:'Branches',icon:'⑂'},{id:'commits',label:'Commits',icon:'◉'}]},
 {id:'run',label:'Run and Debug',icon:'▷',children:[{id:'run-tasks',label:'Run Tasks',icon:'▷'},{id:'tests',label:'Tests',icon:'✓'},{id:'debug',label:'Debug Console',icon:'◇'}]},
 {id:'agents',label:'AI Agents',icon:'✦',children:[{id:'agent-registry',label:'Agent Registry',icon:'✦'},{id:'agent-tools',label:'Agent Tools',icon:'⚒'},{id:'agent-jobs',label:'Agent Jobs',icon:'▶'},{id:'brain',label:'NeuroBrain',icon:'◉'}]},
 {id:'projects',label:'Projects',icon:'▦',children:[{id:'issues',label:'Issues',icon:'□'},{id:'code',label:'Code',icon:'<> '},{id:'pulls',label:'Pull Requests',icon:'⇄'},{id:'roadmaps',label:'Roadmaps',icon:'⌁'}]},
 {id:'systems',label:'Systems',icon:'⚙',children:[{id:'actions',label:'Actions',icon:'▷'},{id:'environments',label:'Environments',icon:'▣'},{id:'security',label:'Security',icon:'◆'},{id:'insights',label:'Insights',icon:'◌'},{id:'releases',label:'Releases',icon:'◆'}]},
 {id:'design',label:'Design & Engineering',icon:'◇',children:[{id:'blueprints',label:'Blueprints',icon:'◇'},{id:'uml',label:'UML',icon:'⌘'},{id:'documentation',label:'Documentation',icon:'▤'},{id:'extensions',label:'Extensions',icon:'⊞'}]},
 {id:'tools',label:'Developer Tools',icon:'⚒',children:[{id:'terminal',label:'Terminal',icon:'>_'},{id:'api',label:'API Explorer',icon:'{}'},{id:'git',label:'Git',icon:'⑂'},{id:'memory',label:'Memory',icon:'◫'}]},
 {id:'github',label:'GitHub',icon:'◉',children:[{id:'repositories',label:'Repositories',icon:'▱'},{id:'issues-github',label:'Issues',icon:'□'},{id:'pull-requests',label:'Pull Requests',icon:'⇄'},{id:'actions-github',label:'Actions',icon:'▷'}]}
];

export function VSCodeSideNav({active,onSelect}:Props){
 const [open,setOpen]=useState<Record<string,boolean>>({explorer:true,agents:true});
 const toggle=(id:string)=>setOpen(x=>({...x,[id]:!x[id]}));
 const select=(item:Item)=>{onSelect(item.id);if(item.children&&!open[item.id])toggle(item.id)};
 return <nav className="vscode-side-nav" aria-label="Workspace navigation">
  <div className="side-nav-header"><span>WORKBENCH</span><button onClick={()=>setOpen({})}>−</button></div>
  <div className="side-nav-scroll">
   {groups.map(group=><section className={`side-nav-group ${open[group.id]?'expanded':''}`} key={group.id}>
    <button className={`side-nav-root ${active===group.id?'active':''}`} onClick={()=>select(group)}><span className="side-nav-chevron">{group.children?(open[group.id]?'⌄':'›'):''}</span><span className="side-nav-icon">{group.icon}</span><span className="side-nav-label">{group.label}</span></button>
    {group.children&&open[group.id]&&<div className="side-nav-children">{group.children.map(item=><button key={item.id} className={`side-nav-child ${active===item.id?'active':''}`} onClick={()=>select(item)}><span className="side-nav-branch">└</span><span className="side-nav-icon">{item.icon}</span><span>{item.label}</span></button>)}</div>}
   </section>)}
  </div>
  <div className="side-nav-footer"><button onClick={()=>onSelect('settings')}>⚙ <span>Settings</span></button><button onClick={()=>onSelect('accounts')}>◎ <span>Accounts</span></button></div>
 </nav>;
}
