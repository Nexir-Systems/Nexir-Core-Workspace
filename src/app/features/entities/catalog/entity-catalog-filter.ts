import type {
  EntityCategory,
  EntityPriority,
  EntityRecord,
  EntitySortDirection,
  EntitySortKey,
  EntityStatus,
} from '../models/entity.model';

/** Snapshot of list UI state — drives `filterAndSortEntityRecords` and `EntitiesStore.filteredItems`. */
export interface EntityCatalogFilterState {
  readonly searchQuery: string;
  readonly statusFilter: 'all' | EntityStatus;
  readonly categoryFilter: 'all' | EntityCategory;
  readonly sortKey: EntitySortKey;
  readonly sortDir: EntitySortDirection;
}

const PRIORITY_ORDER: Record<EntityPriority, number> = { low: 0, medium: 1, high: 2 };

/**
 * Pure catalog pipeline: search → status → category → sort.
 * Used by the store and easy to unit-test in isolation.
 */
export function filterAndSortEntityRecords(
  rows: readonly EntityRecord[],
  state: EntityCatalogFilterState,
): EntityRecord[] {
  const q = state.searchQuery.trim().toLowerCase();
  let next = [...rows];

  if (q.length > 0) {
    next = next.filter((e) => {
      const hay = [e.name, e.description, e.owner, e.id].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }

  if (state.statusFilter !== 'all') {
    next = next.filter((e) => e.status === state.statusFilter);
  }

  if (state.categoryFilter !== 'all') {
    next = next.filter((e) => e.category === state.categoryFilter);
  }

  const key = state.sortKey;
  /** Flip comparator for descending sort (multiply symmetric difference by `mul`). */
  const mul = state.sortDir === 'asc' ? 1 : -1;

  next.sort((a, b) => {
    if (key === 'updatedAt') {
      return (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()) * mul;
    }
    if (key === 'priority') {
      return (PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]) * mul;
    }
    if (key === 'status') {
      return a.status.localeCompare(b.status) * mul;
    }
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }) * mul;
  });

  return next;
}
