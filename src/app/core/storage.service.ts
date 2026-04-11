import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

import { STORAGE_KEYS, type StorageKey } from './storage-keys';

/**
 * Thin abstraction over localStorage with browser safety for potential SSR.
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly platformId = inject(PLATFORM_ID);

  get(key: StorageKey): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return window.localStorage.getItem(key);
  }

  set(key: StorageKey, value: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    window.localStorage.setItem(key, value);
  }

  remove(key: StorageKey): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    window.localStorage.removeItem(key);
  }

  /** Typed helpers for known payloads (extend as needed). */
  getJson<T>(key: StorageKey): T | null {
    const raw = this.get(key);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  setJson(key: StorageKey, value: unknown): void {
    this.set(key, JSON.stringify(value));
  }
}

/** Re-export keys for consumers that need enumeration without importing storage-keys twice. */
export { STORAGE_KEYS };
