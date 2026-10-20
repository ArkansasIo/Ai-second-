import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 1440, height: 920, minWidth: 980, minHeight: 680, webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, sandbox: true } });
  const url = process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173';
  void mainWindow.loadURL(url);
}

ipcMain.handle('fs:read-file', async (_event, filePath: string) => fs.readFile(path.resolve(filePath), 'utf8'));
ipcMain.handle('fs:write-file', async (_event, filePath: string, content: string) => { await fs.writeFile(path.resolve(filePath), content, 'utf8'); });
ipcMain.handle('fs:list-directory', async (_event, directory: string) => { const root = path.resolve(directory); const entries = await fs.readdir(root, { withFileTypes: true }); return entries.map(entry => ({ name: entry.name, path: path.join(root, entry.name), directory: entry.isDirectory() })); });
ipcMain.handle('fs:open-file', async (_event, filePath: string) => { await shell.openPath(path.resolve(filePath)); });
ipcMain.handle('dialog:save', async (_event, options = {}) => { const result = await dialog.showSaveDialog(mainWindow!, options as Electron.SaveDialogOptions); return result.canceled ? null : result.filePath ?? null; });
ipcMain.handle('dialog:open', async (_event, options = {}) => { const result = await dialog.showOpenDialog(mainWindow!, options as Electron.OpenDialogOptions); return result.canceled ? [] : result.filePaths; });

app.whenReady().then(() => { createWindow(); app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); }); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
