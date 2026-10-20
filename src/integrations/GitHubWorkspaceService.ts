export interface GitHubRepository { id: number; full_name: string; default_branch?: string; private?: boolean; html_url?: string; }
export interface GitHubIssue { number: number; title: string; state: string; body?: string; html_url?: string; }

export class GitHubWorkspaceService {
  constructor(private readonly token?: string, private readonly apiBase = 'https://api.github.com') {}

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.apiBase}${path}`, {
      ...init,
      headers: {
        accept: 'application/vnd.github+json',
        ...(this.token ? {authorization: `Bearer ${this.token}`} : {}),
        ...(init.headers ?? {}),
      },
    });
    if (!response.ok) throw new Error(`GitHub API ${response.status}: ${await response.text()}`);
    return response.json() as Promise<T>;
  }

  repositories(owner: string): Promise<GitHubRepository[]> {
    return this.request(`/users/${encodeURIComponent(owner)}/repos?per_page=100`);
  }

  repository(owner: string, repo: string): Promise<GitHubRepository> {
    return this.request(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`);
  }

  issues(owner: string, repo: string, state: 'open'|'closed'|'all' = 'open'): Promise<GitHubIssue[]> {
    return this.request(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues?state=${state}&per_page=100`);
  }

  async createIssue(owner: string, repo: string, title: string, body = ''): Promise<GitHubIssue> {
    return this.request(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues`, {
      method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify({title, body}),
    });
  }
}
