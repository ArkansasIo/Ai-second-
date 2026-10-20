export type ArtifactKind = 'binary'|'apk'|'aab'|'installer'|'archive'|'test-report'|'coverage'|'log'|'generated-source'|'unknown';
export interface BuildArtifact { id: string; name: string; path: string; kind: ArtifactKind; platform?: string; buildId: string; sizeBytes?: number; sha256?: string; createdAt: string; metadata?: Record<string, unknown>; }

export class BuildArtifactRegistry {
  private artifacts = new Map<string, BuildArtifact>();
  register(artifact: Omit<BuildArtifact, 'id' | 'createdAt'>): BuildArtifact {
    const value: BuildArtifact = {...artifact, id: `artifact-${crypto.randomUUID()}`, createdAt: new Date().toISOString()};
    this.artifacts.set(value.id, value); return value;
  }
  get(id: string): BuildArtifact | undefined { return this.artifacts.get(id); }
  list(buildId?: string): BuildArtifact[] { return [...this.artifacts.values()].filter(a => !buildId || a.buildId === buildId); }
  remove(id: string): boolean { return this.artifacts.delete(id); }
  clearBuild(buildId: string): void { for (const [id, artifact] of this.artifacts) if (artifact.buildId === buildId) this.artifacts.delete(id); }
}

export const buildArtifactRegistry = new BuildArtifactRegistry();
