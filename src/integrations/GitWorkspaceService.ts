export interface GitStatus { branch: string; ahead: number; behind: number; staged: string[]; unstaged: string[]; untracked: string[]; }
export interface GitDiffFile { path: string; status: 'added'|'modified'|'deleted'|'renamed'|'unknown'; additions: number; deletions: number; }

export interface GitCommandRunner { run(args: string[], cwd: string): Promise<{stdout: string; stderr: string; exitCode: number}>; }

export class GitWorkspaceService {
  constructor(private readonly runner: GitCommandRunner) {}

  async status(cwd: string): Promise<GitStatus> {
    const result = await this.runner.run(['status', '--porcelain=v1', '-b'], cwd);
    if (result.exitCode !== 0) throw new Error(result.stderr || 'git status failed');
    const lines = result.stdout.split('\n').filter(Boolean);
    const header = lines.shift() ?? '## unknown';
    const branch = header.replace(/^##\s*/, '').split('...')[0] ?? 'unknown';
    const status: GitStatus = {branch, ahead: 0, behind: 0, staged: [], unstaged: [], untracked: []};
    const tracking = header.match(/\[ahead (\d+)(?:, behind (\d+))?\]/);
    if (tracking) { status.ahead = Number(tracking[1]); status.behind = Number(tracking[2] ?? 0); }
    for (const line of lines) {
      if (line.startsWith('?? ')) { status.untracked.push(line.slice(3)); continue; }
      const index = line[0]; const worktree = line[1]; const path = line.slice(3);
      if (index !== ' ') status.staged.push(path);
      if (worktree !== ' ') status.unstaged.push(path);
    }
    return status;
  }

  async diff(cwd: string): Promise<string> {
    const result = await this.runner.run(['diff', '--no-ext-diff'], cwd);
    if (result.exitCode !== 0) throw new Error(result.stderr || 'git diff failed');
    return result.stdout;
  }

  async commit(cwd: string, message: string): Promise<string> {
    if (!message.trim()) throw new Error('Commit message is required');
    const result = await this.runner.run(['commit', '-m', message], cwd);
    if (result.exitCode !== 0) throw new Error(result.stderr || 'git commit failed');
    return result.stdout;
  }
}
