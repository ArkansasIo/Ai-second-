import { DEFAULT_ACCOUNT, type AccountSettings, type AccountState, type AccountProfile } from './types';
const KEY='ai-second-brain.account';
export function loadAccount():AccountState{try{const raw=localStorage.getItem(KEY);return raw?{...DEFAULT_ACCOUNT,...JSON.parse(raw),profile:{...DEFAULT_ACCOUNT.profile,...JSON.parse(raw).profile},settings:{...DEFAULT_ACCOUNT.settings,...JSON.parse(raw).settings}}:DEFAULT_ACCOUNT;}catch{return DEFAULT_ACCOUNT;}}
export function saveAccount(state:AccountState):void{localStorage.setItem(KEY,JSON.stringify(state));}
export function updateProfile(patch:Partial<AccountProfile>):AccountState{const next=loadAccount();next.profile={...next.profile,...patch,updatedAt:new Date().toISOString()};next.authenticated=true;saveAccount(next);return next;}
export function updateSettings(patch:Partial<AccountSettings>):AccountState{const next=loadAccount();next.settings={...next.settings,...patch};saveAccount(next);return next;}
export function signOut():AccountState{const next=loadAccount();next.authenticated=false;saveAccount(next);return next;}
export function resetSettings():AccountState{const next=loadAccount();next.settings=DEFAULT_ACCOUNT.settings;saveAccount(next);return next;}
