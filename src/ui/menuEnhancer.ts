import {menus} from './VSCodeMenuBar';
import './menuEnhancer.css';

type Item={label:string;shortcut?:string;divider?:boolean;submenu?:Item[]};

function build(items:Item[],rootName:string,close:()=>void,level=0){
 const box=document.createElement('div');box.className=`vscode-dom-menu level-${level}`;
 items.forEach(item=>{
  if(item.divider){const d=document.createElement('div');d.className='vscode-dom-divider';box.appendChild(d);return;}
  const row=document.createElement('button');row.className='vscode-dom-item';
  const label=document.createElement('span');label.textContent=item.label;row.appendChild(label);
  const meta=document.createElement('span');meta.className='vscode-dom-meta';meta.textContent=item.shortcut||'';row.appendChild(meta);
  if(item.submenu){row.classList.add('has-submenu');const arrow=document.createElement('span');arrow.className='vscode-dom-arrow';arrow.textContent='›';row.appendChild(arrow);const sub=build(item.submenu,rootName,close,level+1);row.appendChild(sub);row.addEventListener('mouseenter',()=>{box.querySelectorAll(':scope > .vscode-dom-item.submenu-open').forEach(x=>x.classList.remove('submenu-open'));row.classList.add('submenu-open')})}
  else row.addEventListener('click',()=>{close();document.dispatchEvent(new CustomEvent('ai-second-brain:menu-action',{detail:{menu:rootName,action:item.label}}))});
  box.appendChild(row);
 });return box;
}

function install(){
 const original=document.querySelector<HTMLElement>('.ide-menu');if(!original||document.getElementById('ai-second-brain-vscode-menu'))return;
 original.style.visibility='hidden';original.style.pointerEvents='none';
 const bar=document.createElement('div');bar.id='ai-second-brain-vscode-menu';bar.className='vscode-dom-bar';document.body.appendChild(bar);
 const names=['File','Edit','Selection','View','Go','Run','Terminal','Help'];let active:HTMLElement|null=null;
 const close=()=>{bar.querySelectorAll('.vscode-dom-menu').forEach(x=>x.remove());bar.querySelectorAll('.vscode-dom-root.open').forEach(x=>x.classList.remove('open'));active=null};
 names.forEach(name=>{const root=document.createElement('div');root.className='vscode-dom-root';const button=document.createElement('button');button.className='vscode-dom-root-button';button.textContent=name;root.appendChild(button);bar.appendChild(root);button.addEventListener('click',e=>{e.stopPropagation();if(active===root){close();return}close();root.classList.add('open');active=root;root.appendChild(build(menus[name],name,close));});button.addEventListener('mouseenter',()=>{if(active&&active!==root){close();root.classList.add('open');active=root;root.appendChild(build(menus[name],name,close))}})});
 document.addEventListener('click',e=>{if(!bar.contains(e.target as Node))close()});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
