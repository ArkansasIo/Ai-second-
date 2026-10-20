import {toolRegistry} from './toolRegistry';
import {defaultTools} from './defaultTools';

let registered = false;

export function registerDefaultTools(): void {
  if (registered) return;
  for (const tool of defaultTools) toolRegistry.register(tool);
  registered = true;
}

export function getDefaultToolCatalog() {
  registerDefaultTools();
  return toolRegistry.list();
}
