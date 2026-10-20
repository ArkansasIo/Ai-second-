import React, {useEffect, useMemo, useState} from 'react';
import {workspaceStore} from '../core/store';
import type {DocumentModel, FolderModel, WorkspaceState} from '../core/model';

export function WorkspaceManager(){
 const [state,setState]=useState<WorkspaceState|null>(null);
 const [selectedFolder,setSelectedFolder]=useState<string>('');
 const [selectedDocument,setSelectedDocument]=useState<string>('');
 const [ready,setReady]=useState(false);
 useEffect(()=>{workspaceStore.init().then(s=>{setState(s);setSelectedFolder(s.workspace.rootFolderId);setReady(true);});},[]);
 const refresh=()=>setState(workspaceStore.snapshot());
 const folders=useMemo(()=>state?.folders ?? [],[state]);
 const documents=useMemo(()=>state?.documents ?? [],[state]);
 const children=(parent?:string)=>folders.filter(f=>f.parentId===parent).sort((a,b)=>a.order-b.order);
 const addFolder=()=>{if(!selectedFolder)return; workspaceStore.addFolder(`New Folder ${children(selectedFolder).length+1}`,selectedFolder);refresh();};
 const addDocument=()=>{if(!selectedFolder)return; const d=workspaceStore.addDocument(selectedFolder,'new.brain','// BrainScript document\n','brainscript'); setSelectedDocument(d.id);refresh();};
 const undo=()=>{if(workspaceStore.undo())refresh();}; const redo=()=>{if(workspaceStore.redo())refresh();};
 if(!ready||!state)return <section className="panel"><div className="panelTitle">Workspace</div><p>Loading persistent workspace…</p></section>;
 const doc=documents.find(d=>d.id===selectedDocument);
 return <section className="workspaceManager panel">
  <div className="panelTitle"><span>Workspace Manager</span><span>{state.workspace.name}</span></div>
  <div className="workspaceToolbar"><button onClick={addFolder}>+ Folder</button><button onClick={addDocument}>+ Document</button><button onClick={undo}>Undo</button><button onClick={redo}>Redo</button></div>
  <div className="workspaceColumns">
   <div className="workspaceTree"><Tree folders={folders} documents={documents} parentId={state.workspace.rootFolderId} selectedFolder={selectedFolder} selectedDocument={selectedDocument} setSelectedFolder={setSelectedFolder} setSelectedDocument={setSelectedDocument}/></div>
   <div className="workspaceEditor">{doc?<DocumentEditor doc={doc} onChange={(patch)=>{workspaceStore.updateDocument(doc.id,patch);refresh();}}/>:<div className="emptyState">Select a document from the workspace tree.</div>}</div>
  </div>
 </section>;
}

function Tree({folders,documents,parentId,selectedFolder,selectedDocument,setSelectedFolder,setSelectedDocument}:{folders:FolderModel[];documents:DocumentModel[];parentId?:string;selectedFolder:string;selectedDocument:string;setSelectedFolder:(id:string)=>void;setSelectedDocument:(id:string)=>void}){
 const fs=folders.filter(f=>f.parentId===parentId).sort((a,b)=>a.order-b.order);
 return <>{fs.map(f=><div key={f.id} className="treeBranch"><button className={selectedFolder===f.id?'treeItem selected':'treeItem'} onClick={()=>setSelectedFolder(f.id)}>📁 {f.name}</button><div className="treeChildren"><Tree folders={folders} documents={documents} parentId={f.id} selectedFolder={selectedFolder} selectedDocument={selectedDocument} setSelectedFolder={setSelectedFolder} setSelectedDocument={setSelectedDocument}/>{documents.filter(d=>d.folderId===f.id).map(d=><button key={d.id} className={selectedDocument===d.id?'treeItem document selected':'treeItem document'} onClick={()=>setSelectedDocument(d.id)}>📄 {d.name}</button>)}</div></div>)}</>;
}
function DocumentEditor({doc,onChange}:{doc:DocumentModel;onChange:(p:Partial<DocumentModel>)=>void}){
 return <div className="documentEditor"><div className="documentEditorHeader"><input value={doc.name} disabled={doc.frozen} onChange={e=>onChange({name:e.target.value})}/><button onClick={()=>onChange({frozen:!doc.frozen})}>{doc.frozen?'Unfreeze':'Freeze'}</button></div><textarea value={doc.content} disabled={doc.frozen} onChange={e=>onChange({content:e.target.value})} spellCheck={false}/><div className="editorStatus">{doc.frozen?'PAGE FROZEN':'EDITING'} · {doc.language} · updated {new Date(doc.updatedAt).toLocaleString()}</div></div>;
}
