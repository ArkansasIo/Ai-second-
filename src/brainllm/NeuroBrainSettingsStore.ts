import {neuroBrainBackend} from './NeuroBrainBackend';
import type {BrainDecisionState} from './BrainDecisionTree';

const STORAGE_KEY = 'neurobrain.settings.v1';

export class NeuroBrainSettingsStore {
  load(): BrainDecisionState {
    const fallback = neuroBrainBackend.getDecisionState();
    if (typeof localStorage === 'undefined') return fallback;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return fallback;
      const saved = JSON.parse(raw) as Partial<BrainDecisionState>;
      return neuroBrainBackend.updateDecision(saved);
    } catch {
      return fallback;
    }
  }

  save(): BrainDecisionState {
    const state = neuroBrainBackend.getDecisionState();
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return state;
  }

  reset(): BrainDecisionState {
    if (typeof localStorage !== 'undefined') localStorage.removeItem(STORAGE_KEY);
    return neuroBrainBackend.updateDecision({settings: {temperature: 0.2, maxTokens: 2048, allowTools: true, parallelTools: true, strictVerification: true}});
  }
}

export const neuroBrainSettingsStore = new NeuroBrainSettingsStore();
