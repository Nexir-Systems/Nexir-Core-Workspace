export interface UserPreferences {
  readonly themeHint: 'system' | 'light' | 'dark';
  readonly density: 'comfortable' | 'compact';
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  themeHint: 'dark',
  density: 'comfortable',
};
