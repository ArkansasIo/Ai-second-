export interface ReleaseArtifact { name: string; platform: string; architecture?: string; path: string; sha256?: string; signed: boolean; }
export interface ReleaseManifest { version: string; channel: 'alpha'|'beta'|'stable'|'nightly'; commit: string; createdAt: string; artifacts: ReleaseArtifact[]; notes: string[]; }

export function createReleaseManifest(version: string, commit: string, channel: ReleaseManifest['channel'] = 'alpha'): ReleaseManifest {
  return {version, channel, commit, createdAt: new Date().toISOString(), artifacts: [], notes: []};
}

export function addReleaseArtifact(manifest: ReleaseManifest, artifact: ReleaseArtifact): ReleaseManifest {
  return {...manifest, artifacts: [...manifest.artifacts, artifact]};
}

export function validateReleaseManifest(manifest: ReleaseManifest): string[] {
  const errors: string[] = [];
  if (!/^\d+\.\d+\.\d+$/.test(manifest.version)) errors.push('Invalid semantic version');
  if (!manifest.commit) errors.push('Missing source commit');
  if (!manifest.artifacts.length) errors.push('No release artifacts registered');
  for (const artifact of manifest.artifacts) if (!artifact.name || !artifact.path) errors.push(`Invalid artifact: ${artifact.name || '<unnamed>'}`);
  return errors;
}
