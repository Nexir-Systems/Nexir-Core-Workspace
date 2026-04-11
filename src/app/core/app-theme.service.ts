import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { STORAGE_KEYS, StorageService } from './storage.service';

/** Minimal shape — matches settings `UserPreferences` theme fields (core cannot import features). */
export interface AppThemeOptions {
  readonly themeHint: 'system' | 'light' | 'dark';
  readonly density: 'comfortable' | 'compact';
}

const ROOT_CLASS = {
  theme: ['theme-light', 'theme-dark'] as const,
  density: ['density-comfortable', 'density-compact'] as const,
};

/**
 * Applies Material theme + density by toggling classes on `document.documentElement`.
 * Must stay in sync with `styles.scss` (`html.theme-*` + `html.density-*`).
 */
@Injectable({ providedIn: 'root' })
export class AppThemeService {
  private readonly storage = inject(StorageService);
  private readonly platformId = inject(PLATFORM_ID);
  private mediaListener?: (this: MediaQueryList, ev: MediaQueryListEvent) => void;

  /** Read preferences from storage (or defaults) and apply. */
  applyFromStorage(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const raw = this.storage.get(STORAGE_KEYS.PREFERENCES);
    let opts: AppThemeOptions = { themeHint: 'dark', density: 'comfortable' };
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Partial<AppThemeOptions>;
        opts = {
          themeHint: parsed.themeHint ?? opts.themeHint,
          density: parsed.density ?? opts.density,
        };
      } catch {
        /* ignore */
      }
    }
    this.apply(opts);
    this.attachSystemListenerIfNeeded(opts.themeHint);
  }

  apply(options: AppThemeOptions): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const root = document.documentElement;
    for (const c of ROOT_CLASS.theme) {
      root.classList.remove(c);
    }
    for (const c of ROOT_CLASS.density) {
      root.classList.remove(c);
    }

    const themeClass = this.resolveThemeClass(options.themeHint);
    const densityClass =
      options.density === 'compact' ? 'density-compact' : 'density-comfortable';

    root.classList.add(themeClass, densityClass);
    document.body.style.colorScheme = themeClass === 'theme-dark' ? 'dark' : 'light';
  }

  private resolveThemeClass(hint: AppThemeOptions['themeHint']): 'theme-light' | 'theme-dark' {
    if (hint === 'light') {
      return 'theme-light';
    }
    if (hint === 'dark') {
      return 'theme-dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'theme-dark' : 'theme-light';
  }

  private attachSystemListenerIfNeeded(hint: AppThemeOptions['themeHint']): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (this.mediaListener) {
      mq.removeEventListener('change', this.mediaListener);
      this.mediaListener = undefined;
    }
    if (hint !== 'system') {
      return;
    }
    this.mediaListener = () => this.applyFromStorage();
    mq.addEventListener('change', this.mediaListener);
  }
}
