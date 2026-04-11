import { computed, inject, Injectable, signal } from '@angular/core';

import { STORAGE_KEYS, StorageService } from './storage.service';
import type { Session } from './session.model';

/**
 * Global session primitives used by guards and feature stores.
 * Canonical read/write for persisted auth state.
 */
@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly storage = inject(StorageService);

  /** Current session; null when signed out. */
  readonly session = signal<Session | null>(null);

  readonly isAuthenticated = computed(() => this.session() !== null);

  readonly userEmail = computed(() => this.session()?.email ?? null);

  constructor() {
    this.restoreFromStorage();
  }

  restoreFromStorage(): void {
    const parsed = this.storage.getJson<Session>(STORAGE_KEYS.SESSION);
    this.session.set(parsed);
  }

  setSession(session: Session): void {
    this.storage.setJson(STORAGE_KEYS.SESSION, session);
    this.session.set(session);
  }

  clearSession(): void {
    this.storage.remove(STORAGE_KEYS.SESSION);
    this.session.set(null);
  }
}
