import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { AppThemeService } from '@core/app-theme.service';

import type { UserPreferences } from '../models/preferences.model';

import { SettingsApi } from '../data/settings.api';

@Injectable()
export class SettingsStore {
  private readonly api = inject(SettingsApi);
  private readonly theme = inject(AppThemeService);

  readonly preferences = signal<UserPreferences | null>(null);
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly saving = signal(false);
  readonly saveSucceeded = signal(false);

  async load(): Promise<void> {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.saveSucceeded.set(false);
    try {
      const prefs = await firstValueFrom(this.api.getPreferences());
      this.preferences.set(prefs);
    } catch (e) {
      this.errorMessage.set(e instanceof Error ? e.message : 'Failed to load preferences.');
    } finally {
      this.loading.set(false);
    }
  }

  clearSaveSuccess(): void {
    this.saveSucceeded.set(false);
  }

  async save(partial: Partial<UserPreferences>): Promise<void> {
    this.saving.set(true);
    this.errorMessage.set(null);
    this.saveSucceeded.set(false);
    try {
      const next = await firstValueFrom(this.api.updatePreferences(partial));
      this.preferences.set(next);
      this.theme.apply(next);
      this.saveSucceeded.set(true);
    } catch (e) {
      this.errorMessage.set(e instanceof Error ? e.message : 'Failed to save preferences.');
    } finally {
      this.saving.set(false);
    }
  }
}
