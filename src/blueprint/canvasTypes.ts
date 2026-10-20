export type CanvasNodeKind = 'event' | 'data' | 'logic' | 'function' | 'ai' | 'tool' | 'output';

export interface CanvasNode {
  id: string;
  title: string;
  kind: CanvasNodeKind;
  x: number;
  y: number;
  inputs: string[];
  outputs: string[];
  properties: Record<string, string | number | boolean>;
}

export interface CanvasConnection {
  id: string;
  fromNodeId: string;
  fromPort: string;
  toNodeId: string;
  toPort: string;
}

export interface ProgramCanvas {
  id: string;
  name: string;
  nodes: CanvasNode[];
  connections: CanvasConnection[];
  zoom: number;
  panX: number;
  panY: number;
  updatedAt: string;
}

export function createProgramCanvas(name = 'New Program'): ProgramCanvas {
  return {
    id: `CANVAS-${crypto.randomUUID()}`,
    name,
    nodes: [],
    connections: [],
    zoom: 1,
    panX: 0,
    panY: 0,
    updatedAt: new Date().toISOString(),
  };
}
