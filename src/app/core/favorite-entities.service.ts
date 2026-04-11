import { inject, Injectable, signal } from '@angular/core';

import { STORAGE_KEYS, StorageService } from './storage.service';

/**
 * Starred entity ids persisted in localStorage (same browser profile as other mocks).
 */
@Injectable({ providedIn: 'root' })
export class FavoriteEntitiesService {
  private readonly storage = inject(StorageService);

  /** Distinct entity ids marked as favorites (order not guaranteed). */
  readonly ids = signal<readonly string[]>([]);

  constructor() {
    this.reloadFromStorage();
  }

  reloadFromStorage(): void {
    const raw = this.storage.getJson<string[]>(STORAGE_KEYS.FAVORITE_ENTITY_IDS);
    const next = raw?.length ? [...new Set(raw)] : [];
    this.ids.set(next);
  }

  isFavorite(id: string): boolean {
    return this.ids().includes(id);
  }

  toggle(id: string): void {
    const cur = new Set(this.ids());
    if (cur.has(id)) {
      cur.delete(id);
    } else {
      cur.add(id);
    }
    const next = [...cur];
    this.storage.setJson(STORAGE_KEYS.FAVORITE_ENTITY_IDS, next);
    this.ids.set(next);
  }
}
