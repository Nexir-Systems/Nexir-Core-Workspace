import { inject, Injectable } from '@angular/core';

import { STORAGE_KEYS, StorageService } from './storage.service';

const MAX_RECENT = 6;

/**
 * Tracks recently opened entity ids for dashboard and quick navigation.
 */
@Injectable({ providedIn: 'root' })
export class RecentEntitiesService {
  private readonly storage = inject(StorageService);

  recordOpened(id: string): void {
    const raw = this.storage.getJson<string[]>(STORAGE_KEYS.RECENT_ENTITIES) ?? [];
    const next = [id, ...raw.filter((x) => x !== id)].slice(0, MAX_RECENT);
    this.storage.setJson(STORAGE_KEYS.RECENT_ENTITIES, next);
  }

  ids(): string[] {
    return this.storage.getJson<string[]>(STORAGE_KEYS.RECENT_ENTITIES) ?? [];
  }
}
