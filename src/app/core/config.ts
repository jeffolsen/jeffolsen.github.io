import { Service, signal } from '@angular/core';

export interface AppConfig {
  apiBaseUrl: string;
  apiKey: string;
}

const FALLBACK_CONFIG: AppConfig = {
  apiBaseUrl: '',
  apiKey: '',
};

@Service()
export class Config {
  private readonly _value = signal<AppConfig>(FALLBACK_CONFIG);
  readonly value = this._value.asReadonly();

  /** Fetched once at bootstrap via provideAppInitializer in app.config.ts. */
  async load(): Promise<void> {
    try {
      const response = await fetch('config.json');
      if (response.ok) {
        this._value.set(await response.json());
      }
    } catch {
      // public/config.json is gitignored and may not exist locally yet — fall back silently.
    }
  }
}
