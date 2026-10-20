export type BuildPlatform = 'web'|'windows'|'macos'|'linux'|'android'|'ios'|'raspberry-pi';
export interface BuildProfile { id: string; name: string; platform: BuildPlatform; command: string; args: string[]; artifactPatterns: string[]; environment?: Record<string, string>; }

export class BuildProfileRegistry {
  private profiles = new Map<string, BuildProfile>();
  register(profile: BuildProfile): BuildProfile { this.profiles.set(profile.id, profile); return profile; }
  get(id: string): BuildProfile | undefined { return this.profiles.get(id); }
  list(platform?: BuildPlatform): BuildProfile[] { return [...this.profiles.values()].filter(p => !platform || p.platform === platform); }
  remove(id: string): boolean { return this.profiles.delete(id); }
}

export const buildProfileRegistry = new BuildProfileRegistry();
for (const profile of [
  {id:'web-production', name:'Web Production', platform:'web' as const, command:'npm', args:['run','build'], artifactPatterns:['dist/**']},
  {id:'windows-installer', name:'Windows Installer', platform:'windows' as const, command:'npm', args:['run','desktop:win'], artifactPatterns:['dist-electron/**/*.exe']},
  {id:'android-debug', name:'Android Debug', platform:'android' as const, command:'npm', args:['run','android:debug'], artifactPatterns:['android/app/build/outputs/**/*.apk']},
]) buildProfileRegistry.register(profile);
