/** Shared column order for mat-table on catalog + favorites views. */
export const ENTITY_CATALOG_TABLE_COLUMNS = [
  'favorite',
  'name',
  'status',
  'category',
  'priority',
  'owner',
  'updatedAt',
] as const;

export type EntityCatalogTableColumn = (typeof ENTITY_CATALOG_TABLE_COLUMNS)[number];

export const ENTITY_CATALOG_PAGE_SIZE_OPTIONS = [5, 8, 16] as const;
