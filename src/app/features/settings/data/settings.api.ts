import { inject, Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { STORAGE_KEYS, StorageService } from '@core/storage.service';

import type { UserPreferences } from '../models/preferences.model';
import { DEFAULT_PREFERENCES } from '../models/preferences.model';

const NETWORK_DELAY_MS = 200;

@Injectable()
export class SettingsApi {
  private readonly storage = inject(StorageService);

  getPreferences(): Observable<UserPreferences> {
    return timer(NETWORK_DELAY_MS).pipe(
      map(() => {
        const raw = this.storage.getJson<UserPreferences>(STORAGE_KEYS.PREFERENCES);
        if (!raw) {
          return DEFAULT_PREFERENCES;
        }
        return {
          themeHint: raw.themeHint ?? DEFAULT_PREFERENCES.themeHint,
          density: raw.density ?? DEFAULT_PREFERENCES.density,
        };
      }),
    );
  }

  updatePreferences(partial: Partial<UserPreferences>): Observable<UserPreferences> {
    return timer(NETWORK_DELAY_MS).pipe(
      switchMap(() => {
        const current =
          this.storage.getJson<UserPreferences>(STORAGE_KEYS.PREFERENCES) ?? DEFAULT_PREFERENCES;
        const next: UserPreferences = {
          themeHint: partial.themeHint ?? current.themeHint,
          density: partial.density ?? current.density,
        };
        this.storage.setJson(STORAGE_KEYS.PREFERENCES, next);
        return of(next);
      }),
    );
  }
}
