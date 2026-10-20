export type FileCategory = 'document' | 'source' | 'image' | 'audio' | 'video' | 'archive' | 'spreadsheet' | 'executable' | 'other';
export interface FileTypeDefinition { id: string; name: string; extensions: string[]; category: FileCategory; mimeTypes: string[]; previewable: boolean; editable: boolean; executable: boolean; }
export const FILE_TYPES: FileTypeDefinition[] = [
  { id: 'FILE-001', name: 'Source Code', extensions: ['.ts','.tsx','.js','.jsx','.py','.cpp','.h','.hpp','.rs','.go','.java','.cs','.html','.css','.json','.yaml','.yml','.xml','.sql','.sh','.ps1'], category: 'source', mimeTypes: ['text/plain','text/javascript','application/json','text/html','text/css'], previewable: true, editable: true, executable: false },
  { id: 'FILE-002', name: 'PDF', extensions: ['.pdf'], category: 'document', mimeTypes: ['application/pdf'], previewable: true, editable: false, executable: false },
  { id: 'FILE-003', name: 'Images', extensions: ['.png','.jpg','.jpeg','.gif','.webp','.bmp','.svg'], category: 'image', mimeTypes: ['image/*'], previewable: true, editable: false, executable: false },
  { id: 'FILE-004', name: 'Audio', extensions: ['.mp3','.wav','.ogg','.flac','.m4a','.aac'], category: 'audio', mimeTypes: ['audio/*'], previewable: true, editable: false, executable: false },
  { id: 'FILE-005', name: 'Video', extensions: ['.mp4','.webm','.mov','.avi','.mkv'], category: 'video', mimeTypes: ['video/*'], previewable: true, editable: false, executable: false },
  { id: 'FILE-006', name: 'Archives', extensions: ['.zip','.7z','.tar','.gz','.rar'], category: 'archive', mimeTypes: ['application/zip','application/x-7z-compressed'], previewable: false, editable: false, executable: false },
  { id: 'FILE-007', name: 'Executables', extensions: ['.exe','.msi','.bat','.cmd'], category: 'executable', mimeTypes: ['application/octet-stream'], previewable: false, editable: false, executable: true },
  { id: 'FILE-008', name: 'Spreadsheets', extensions: ['.csv','.xlsx','.xls','.ods'], category: 'spreadsheet', mimeTypes: ['text/csv','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'], previewable: true, editable: false, executable: false },
];
export function getFileType(name: string): FileTypeDefinition { const ext = name.includes('.') ? `.${name.split('.').pop()!.toLowerCase()}` : ''; return FILE_TYPES.find(type => type.extensions.includes(ext)) ?? { id: 'FILE-999', name: 'Other', extensions: [], category: 'other', mimeTypes: [], previewable: false, editable: false, executable: false }; }
