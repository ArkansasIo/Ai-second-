export interface SecretStore{get(key:string):Promise<string|undefined>;set(key:string,value:string):Promise<void>;delete(key:string):Promise<void>;}
const memory=new Map<string,string>();
export class BrowserSecretStore implements SecretStore{async get(key:string){return memory.get(key);}async set(key:string,value:string){memory.set(key,value);}async delete(key:string){memory.delete(key);}}
export const secretStore:SecretStore=new BrowserSecretStore();
