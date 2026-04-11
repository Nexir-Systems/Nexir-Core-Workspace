import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { filterAndSortEntityRecords } from '../catalog/entity-catalog-filter';
import type {
  EntityCategory,
  EntityRecord,
  EntitySortDirection,
  EntitySortKey,
  EntityStatus,
  EntityUpdatePayload,
  EntityWritePayload,
} from '../models/entity.model';

import { EntitiesApi } from '../data/entities.api';

@Injectable({ providedIn: 'root' })
export class EntitiesStore {
  private readonly api = inject(EntitiesApi);

  readonly items = signal<EntityRecord[]>([]);
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly selectedId = signal<string | null>(null);

  readonly searchQuery = signal('');
  readonly statusFilter = signal<'all' | EntityStatus>('all');
  readonly categoryFilter = signal<'all' | EntityCategory>('all');
  readonly sortKey = signal<EntitySortKey>('updatedAt');
  readonly sortDir = signal<EntitySortDirection>('desc');

  readonly selected = computed(() => {
    const id = this.selectedId();
    if (!id) {
      return null;
    }
    return this.items().find((e) => e.id === id) ?? null;
  });

  readonly filteredItems = computed(() =>
    filterAndSortEntityRecords(this.items(), {
      searchQuery: this.searchQuery(),
      statusFilter: this.statusFilter(),
      categoryFilter: this.categoryFilter(),
      sortKey: this.sortKey(),
      sortDir: this.sortDir(),
    }),
  );

  clearListError(): void {
    this.errorMessage.set(null);
  }

  setSearchQuery(value: string): void {
    this.searchQuery.set(value);
  }

  setStatusFilter(value: 'all' | EntityStatus): void {
    this.statusFilter.set(value);
  }

  setCategoryFilter(value: 'all' | EntityCategory): void {
    this.categoryFilter.set(value);
  }

  setSort(key: EntitySortKey, dir: EntitySortDirection): void {
    this.sortKey.set(key);
    this.sortDir.set(dir);
  }

  /** Reset list filters to defaults (used from empty states, e.g. Favorites “no matches”). */
  resetCatalogFilters(): void {
    this.searchQuery.set('');
    this.statusFilter.set('all');
    this.categoryFilter.set('all');
    this.sortKey.set('updatedAt');
    this.sortDir.set('desc');
  }

  async loadList(): Promise<void> {
    this.loading.set(true);
    this.errorMessage.set(null);
    try {
      const rows = await firstValueFrom(this.api.list());
      this.items.set(rows);
    } catch (e) {
      this.errorMessage.set(e instanceof Error ? e.message : 'Failed to load records.');
    } finally {
      this.loading.set(false);
    }
  }

  async loadOne(id: string): Promise<EntityRecord | null> {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.selectedId.set(null);
    try {
      const row = await firstValueFrom(this.api.getById(id));
      this.selectedId.set(id);
      this.items.update((list) => {
        const others = list.filter((x) => x.id !== id);
        return [...others, row];
      });
      return row;
    } catch (e) {
      this.errorMessage.set(e instanceof Error ? e.message : 'Failed to load record.');
      return null;
    } finally {
      this.loading.set(false);
    }
  }

  select(id: string | null): void {
    this.selectedId.set(id);
  }

  async createEntity(payload: EntityWritePayload): Promise<EntityRecord | null> {
    this.loading.set(true);
    this.errorMessage.set(null);
    try {
      const row = await firstValueFrom(this.api.create(payload));
      this.items.update((list) => [...list, row]);
      return row;
    } catch (e) {
      this.errorMessage.set(e instanceof Error ? e.message : 'Failed to create record.');
      return null;
    } finally {
      this.loading.set(false);
    }
  }

  async updateEntity(id: string, partial: EntityUpdatePayload): Promise<EntityRecord | null> {
    this.loading.set(true);
    this.errorMessage.set(null);
    try {
      const row = await firstValueFrom(this.api.update(id, partial));
      this.items.update((list) => list.map((e) => (e.id === id ? row : e)));
      if (this.selectedId() === id) {
        this.selectedId.set(id);
      }
      return row;
    } catch (e) {
      this.errorMessage.set(e instanceof Error ? e.message : 'Failed to update record.');
      return null;
    } finally {
      this.loading.set(false);
    }
  }
}
