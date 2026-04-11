/**
 * Central registry for localStorage keys — no ad-hoc strings elsewhere.
 */
export const STORAGE_KEYS = {
  SESSION: 'nexir.session.v1',
  USER_REGISTRY: 'nexir.users.v1',
  PREFERENCES: 'nexir.preferences.v1',
  /** Mock entity rows — survives reload in the same browser profile. */
  ENTITIES: 'nexir.entities.v2',
  /** Recently opened entity ids (most recent first). */
  RECENT_ENTITIES: 'nexir.recent-entities.v1',
  /** Entity ids starred from the catalog (favorites). */
  FAVORITE_ENTITY_IDS: 'nexir.favorite-entity-ids.v1',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
