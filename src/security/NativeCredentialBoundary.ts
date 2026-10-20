export interface CredentialRequest { provider: string; purpose: string; allowPersistent?: boolean; }
export interface CredentialHandle { provider: string; present: boolean; persistent: boolean; }

export interface CredentialAdapter {
  get(request: CredentialRequest): Promise<string | undefined>;
  set(request: CredentialRequest, value: string): Promise<void>;
  remove(provider: string): Promise<void>;
}

export class NativeCredentialBoundary {
  constructor(private readonly adapter?: CredentialAdapter) {}

  async has(request: CredentialRequest): Promise<CredentialHandle> {
    const value = this.adapter ? await this.adapter.get(request) : undefined;
    return {provider: request.provider, present: Boolean(value), persistent: Boolean(request.allowPersistent && value)};
  }

  async set(request: CredentialRequest, value: string): Promise<void> {
    if (!this.adapter) throw new Error('No native credential adapter is configured');
    if (!value.trim()) throw new Error('Credential value cannot be empty');
    await this.adapter.set(request, value);
  }

  async remove(provider: string): Promise<void> {
    if (!this.adapter) return;
    await this.adapter.remove(provider);
  }
}
