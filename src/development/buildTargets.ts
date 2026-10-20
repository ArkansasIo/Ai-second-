export type BuildTargetId =
  | 'web'
  | 'windows-exe'
  | 'windows-msi'
  | 'macos-app'
  | 'linux-appimage'
  | 'android-apk'
  | 'android-aab'
  | 'ios-app'
  | 'electron'
  | 'docker-image'
  | 'npm-package'
  | 'source-archive';

export interface BuildTarget {
  id: BuildTargetId;
  name: string;
  platform: string;
  artifact: string;
  requiresNativeToolchain: boolean;
  environmentTemplate: string;
  command: string;
  enabled: boolean;
}

export const BUILD_TARGETS: BuildTarget[] = [
  { id: 'web', name: 'Web / GitHub Pages', platform: 'browser', artifact: 'dist/', requiresNativeToolchain: false, environmentTemplate: 'web-typescript', command: 'npm run build', enabled: true },
  { id: 'windows-exe', name: 'Windows EXE', platform: 'windows', artifact: '.exe', requiresNativeToolchain: true, environmentTemplate: 'windows-desktop', command: 'npm run desktop:win', enabled: true },
  { id: 'windows-msi', name: 'Windows Installer', platform: 'windows', artifact: '.msi', requiresNativeToolchain: true, environmentTemplate: 'windows-desktop', command: 'electron-builder --win msi', enabled: true },
  { id: 'macos-app', name: 'macOS App', platform: 'macos', artifact: '.dmg/.app', requiresNativeToolchain: true, environmentTemplate: 'macos-desktop', command: 'npm run desktop:mac', enabled: true },
  { id: 'linux-appimage', name: 'Linux AppImage', platform: 'linux', artifact: '.AppImage', requiresNativeToolchain: true, environmentTemplate: 'linux-desktop', command: 'npm run desktop:linux', enabled: true },
  { id: 'android-apk', name: 'Android APK', platform: 'android', artifact: '.apk', requiresNativeToolchain: true, environmentTemplate: 'android', command: './gradlew assembleRelease', enabled: true },
  { id: 'android-aab', name: 'Android App Bundle', platform: 'android', artifact: '.aab', requiresNativeToolchain: true, environmentTemplate: 'android', command: './gradlew bundleRelease', enabled: true },
  { id: 'ios-app', name: 'iOS App', platform: 'ios', artifact: '.app/.ipa', requiresNativeToolchain: true, environmentTemplate: 'ios', command: 'xcodebuild archive', enabled: true },
  { id: 'electron', name: 'Electron Desktop', platform: 'desktop', artifact: 'installer', requiresNativeToolchain: true, environmentTemplate: 'desktop', command: 'npm run desktop:build', enabled: true },
  { id: 'docker-image', name: 'Container Image', platform: 'linux', artifact: 'OCI image', requiresNativeToolchain: true, environmentTemplate: 'docker', command: 'docker build .', enabled: true },
  { id: 'npm-package', name: 'NPM Package', platform: 'node', artifact: '.tgz', requiresNativeToolchain: false, environmentTemplate: 'node', command: 'npm pack', enabled: true },
  { id: 'source-archive', name: 'Source Archive', platform: 'universal', artifact: '.zip/.tar.gz', requiresNativeToolchain: false, environmentTemplate: 'node', command: 'git archive HEAD', enabled: true },
];

export function getBuildTarget(id: BuildTargetId): BuildTarget | undefined {
  return BUILD_TARGETS.find((target) => target.id === id);
}
