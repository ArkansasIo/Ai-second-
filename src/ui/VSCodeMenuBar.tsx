import React,{useEffect,useRef,useState} from 'react';

type MenuItem={label:string;shortcut?:string;divider?:boolean;submenu?:MenuItem[];action?:()=>void;disabled?:boolean};

type Props={onAction?:(action:string)=>void};

const menus:Record<string,MenuItem[]>={
 File:[
  {label:'New Text File',shortcut:'Ctrl+N',action:()=>{}},{label:'New Window',shortcut:'Ctrl+Shift+N',action:()=>{}},{divider:true,label:''},
  {label:'Open File...',shortcut:'Ctrl+O',action:()=>{}},{label:'Open Folder...',shortcut:'Ctrl+K Ctrl+O',action:()=>{}},{label:'Open Workspace from File...',action:()=>{}},{divider:true,label:''},
  {label:'Open Recent',submenu:[{label:'AI Second Brain'},{label:'Workspace History'},{label:'Clear Recently Opened'}]},
  {label:'Add Folder to Workspace...',action:()=>{}},{label:'Save Workspace As...',action:()=>{}},{divider:true,label:''},
  {label:'Preferences',submenu:[{label:'Settings',shortcut:'Ctrl+,'},{label:'Keyboard Shortcuts',shortcut:'Ctrl+K Ctrl+S'},{label:'User Snippets',submenu:[{label:'Configure User Snippets...'},{label:'New Global Snippets File...'}]},{label:'Color Theme',submenu:[{label:'Dark (Default)'},{label:'Dark Modern'},{label:'Light Modern'}]}]},
  {divider:true,label:''},{label:'Close Editor',shortcut:'Ctrl+W'},{label:'Exit',shortcut:'Alt+F4'}
 ],
 Edit:[
  {label:'Undo',shortcut:'Ctrl+Z'},{label:'Redo',shortcut:'Ctrl+Y'},{divider:true,label:''},{label:'Cut',shortcut:'Ctrl+X'},{label:'Copy',shortcut:'Ctrl+C'},{label:'Paste',shortcut:'Ctrl+V'},{divider:true,label:''},
  {label:'Find',shortcut:'Ctrl+F'},{label:'Replace',shortcut:'Ctrl+H'},{label:'Find in Files',shortcut:'Ctrl+Shift+F'},{divider:true,label:''},
  {label:'Toggle Line Comment',shortcut:'Ctrl+/'},{label:'Toggle Block Comment',shortcut:'Shift+Alt+A'},{label:'Format Document',shortcut:'Shift+Alt+F'}
 ],
 Selection:[
  {label:'Select All',shortcut:'Ctrl+A'},{label:'Expand Selection',shortcut:'Shift+Alt+Right'},{label:'Shrink Selection',shortcut:'Shift+Alt+Left'},{divider:true,label:''},
  {label:'Copy Line Up',shortcut:'Shift+Alt+Up'},{label:'Copy Line Down',shortcut:'Shift+Alt+Down'},{label:'Move Line Up',shortcut:'Alt+Up'},{label:'Move Line Down',shortcut:'Alt+Down'},{label:'Duplicate Selection'},{divider:true,label:''},
  {label:'Add Cursor Above',shortcut:'Ctrl+Alt+Up'},{label:'Add Cursor Below',shortcut:'Ctrl+Alt+Down'},{label:'Column Selection Mode',shortcut:'Shift+Alt+O'}
 ],
 View:[
  {label:'Command Palette...',shortcut:'Ctrl+Shift+P',action:()=>{}},{label:'Open View...',submenu:[{label:'Explorer'},{label:'Search'},{label:'Source Control'},{label:'Run and Debug'},{label:'Extensions'},{label:'AI Agents'},{divider:true,label:''},{label:'Problems'},{label:'Output'},{label:'Debug Console'},{label:'Terminal'}]},
  {divider:true,label:''},{label:'Appearance',submenu:[{label:'Full Screen',shortcut:'F11'},{label:'Zen Mode',shortcut:'Ctrl+K Z'},{label:'Centered Layout'},{label:'Activity Bar Position',submenu:[{label:'Default'},{label:'Top'},{label:'Bottom'},{label:'Hidden'}]},{label:'Panel Position',submenu:[{label:'Bottom'},{label:'Right'},{label:'Left'}]}]},
  {label:'Editor Layout',submenu:[{label:'Split Up'},{label:'Split Down'},{label:'Split Left'},{label:'Split Right'},{label:'Single'},{label:'Two Columns'},{label:'Grid Layout'}]},
  {divider:true,label:''},{label:'Explorer',shortcut:'Ctrl+Shift+E'},{label:'Search',shortcut:'Ctrl+Shift+F'},{label:'Source Control',shortcut:'Ctrl+Shift+G'},{label:'Run',shortcut:'Ctrl+Shift+D'},{label:'Extensions',shortcut:'Ctrl+Shift+X'},{label:'Terminal',shortcut:'Ctrl+`'}
 ],
 Go:[
  {label:'Back',shortcut:'Alt+Left'},{label:'Forward',shortcut:'Alt+Right'},{label:'Last Edit Location',shortcut:'Ctrl+K Ctrl+Q'},{divider:true,label:''},{label:'Go to File...',shortcut:'Ctrl+P'},{label:'Go to Symbol...',shortcut:'Ctrl+Shift+O'},{label:'Go to Line/Column...',shortcut:'Ctrl+G'},{label:'Go to Definition',shortcut:'F12'},{label:'Go to References',shortcut:'Shift+F12'},{divider:true,label:''},
  {label:'Next Problem',shortcut:'F8'},{label:'Previous Problem',shortcut:'Shift+F8'},{label:'Next Change',shortcut:'Alt+F3'},{divider:true,label:''},{label:'Navigate to Projects',submenu:[{label:'Projects'},{label:'Issues'},{label:'Code'},{label:'Pull Requests'},{label:'Roadmaps'}]}
 ],
 Run:[
  {label:'Start Debugging',shortcut:'F5'},{label:'Run Without Debugging',shortcut:'Ctrl+F5'},{label:'Stop',shortcut:'Shift+F5'},{label:'Restart',shortcut:'Ctrl+Shift+F5'},{divider:true,label:''},
  {label:'Run Task...',shortcut:'Ctrl+Shift+B'},{label:'Run Build Task',submenu:[{label:'Build TypeScript'},{label:'Build Web App'},{label:'Build Electron'},{label:'Build Native'}]},{label:'Test',submenu:[{label:'Run All Tests'},{label:'Run Current Test'},{label:'Debug Current Test'},{label:'Test Coverage'}]},{divider:true,label:''},
  {label:'Debug Configurations',submenu:[{label:'Web App'},{label:'Brain LLM'},{label:'Electron Desktop'},{label:'CMake Native'}]}
 ],
 Terminal:[
  {label:'New Terminal',shortcut:'Ctrl+Shift+`'},{label:'Split Terminal',shortcut:'Ctrl+Shift+5'},{label:'Run Task...',shortcut:'Ctrl+Shift+B'},{divider:true,label:''},{label:'Run Active File',shortcut:'Ctrl+F6'},{label:'Run Selected Text',shortcut:'Shift+Enter'},{divider:true,label:''},{label:'Configure Terminal',submenu:[{label:'Default Profile'},{label:'Profiles'},{label:'Settings'},{label:'Environment Variables'}]},{label:'Shell Integration',submenu:[{label:'Enable'},{label:'Disable'}]}
 ],
 Help:[
  {label:'Welcome'},{label:'Documentation',submenu:[{label:'AI Second Brain Guide'},{label:'Architecture'},{label:'API Reference'},{label:'Agent Tools'},{label:'Plugin Development'}]},{label:'Keyboard Shortcuts Reference',shortcut:'Ctrl+K Ctrl+R'},{divider:true,label:''},{label:'Check for Updates...',action:()=>{}},{label:'Release Notes'},{label:'About AI Second Brain'}
 ]
};

export function VSCodeMenuBar({onAction}:Props){
 const [open,setOpen]=useState<string|null>(null);const [path,setPath]=useState<number[]>([]);const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{const close=(e:MouseEvent)=>{if(!root.current?.contains(e.target as Node))setOpen(null)};document.addEventListener('mousedown',close);return()=>document.removeEventListener('mousedown',close)},[]);
 const current=(items:MenuItem[])=>path.reduce<MenuItem[]|undefined>((acc,i)=>acc?.[i]?.submenu,items);
 const fire=(item:MenuItem)=>{if(item.submenu||item.disabled||item.divider)return;onAction?.(item.label);setOpen(null);setPath([])};
 const render=(items:MenuItem[],level=0)=><div className={`vscode-menu-popup level-${level}`}>{items.map((item,i)=>item.divider?<div className="vscode-menu-divider" key={i}/>:<button key={`${item.label}-${i}`} className="vscode-menu-item" disabled={item.disabled} onMouseEnter={()=>item.submenu&&setPath(p=>level===0?[i]:[...p.slice(0,level),i])} onClick={()=>fire(item)}><span>{item.label}</span><span className="vscode-menu-shortcut">{item.shortcut||''}{item.submenu?'›':''}</span></button>)}</div>);
 return <nav className="vscode-menubar" ref={root} aria-label="Application menu">{Object.keys(menus).map(name=><div className="vscode-menu-root" key={name}><button className={`vscode-menu-root-button ${open===name?'open':''}`} onMouseEnter={()=>open&&setOpen(name)} onClick={()=>{setOpen(open===name?null:name);setPath([])}}>{name}</button>{open===name&&<>{render(menus[name])}{current(menus[name])&&path.map((_,level)=>{const items=current(menus[name]);return items&&level===path.length-1&&items.some(x=>x.submenu)?null:null})}{path.length>0&&path.map((idx,level)=>{let items=menus[name];for(let j=0;j<level;j++)items=items[path[j]].submenu||[];const sub=items[idx]?.submenu;return sub?<div key={`sub-${level}`} className="vscode-submenu-position" style={{left:184+level*184,top:34+path.slice(0,level).reduce((sum,n)=>sum+menus[name][n] ? 32:0,0)}}>{render(sub,level+1)}</div>:null})}</>}</div>)}</nav>;
}
