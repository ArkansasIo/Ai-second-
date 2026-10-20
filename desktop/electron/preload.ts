import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('secondBrainDesktop', {
  readFile: (path: string) => ipcRenderer.invoke('fs:read-file', path),
  writeFile: (path: string, content: string) => ipcRenderer.invoke('fs:write-file', path, content),
  listDirectory: (path: string) => ipcRenderer.invoke('fs:list-directory', path),
  openFile: (path: string) => ipcRenderer.invoke('fs:open-file', path),
  saveDialog: (options?: { defaultPath?: string; filters?: Array<{ name: string; extensions: string[] }> }) => ipcRenderer.invoke('dialog:save', options),
  openDialog: (options?: { multiple?: boolean; directory?: boolean; filters?: Array<{ name: string; extensions: string[] }> }) => ipcRenderer.invoke('dialog:open', options),
});

declare global { interface Window { secondBrainDesktop?: { readFile(path: string): Promise<string>; writeFile(path: string, content: string): Promise<void>; listDirectory(path: string): Promise<Array<{ name: string; path: string; directory: boolean }>>; openFile(path: string): Promise<void>; saveDialog(options?: unknown): Promise<string | null>; openDialog(options?: unknown): Promise<string[]>; }; } }
