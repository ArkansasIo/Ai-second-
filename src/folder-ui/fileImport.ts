import { getFileType } from './fileRegistry';

export interface ImportedFileRecord {
  id: string;
  name: string;
  size: number;
  type: string;
  category: ReturnType<typeof getFileType>['category'];
  lastModified: number;
  blob: Blob;
}

export async function importBrowserFiles(files: FileList | File[]): Promise<ImportedFileRecord[]> {
  return Array.from(files).map((file, index) => ({
    id: `FILE-${Date.now()}-${index + 1}`,
    name: file.name,
    size: file.size,
    type: file.type || 'application/octet-stream',
    category: getFileType(file.name).category,
    lastModified: file.lastModified,
    blob: file,
  }));
}

export function isDropFile(dataTransfer: DataTransfer): boolean {
  return Array.from(dataTransfer.types).includes('Files');
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
}
