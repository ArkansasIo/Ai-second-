import {useEffect,useState} from 'react';
import {workspaceStore} from '../core/store';
import type {WorkspaceState} from '../core/model';
export function useWorkspaceStore(){const [state,setState]=useState<WorkspaceState>(workspaceStore.snapshot());useEffect(()=>{workspaceStore.init().then(setState);},[]);const refresh=()=>setState(workspaceStore.snapshot());return{state,refresh,store:workspaceStore};}
