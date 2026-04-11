import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import type { EntityCategory, EntitySortKey, EntityStatus } from '../../models/entity.model';
import { EntitiesStore } from '../../store/entities.store';

/**
 * Shared filter / sort strip for catalog and favorites — state lives on {@link EntitiesStore}.
 * No `@Input`s: keeps a single source of truth and avoids prop-drilling.
 */
@Component({
  selector: 'nx-entity-catalog-toolbar',
  imports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './entity-catalog-toolbar.component.html',
  styleUrl: './entity-catalog-toolbar.component.scss',
})
export class EntityCatalogToolbarComponent {
  protected readonly store = inject(EntitiesStore);

  protected setSearch(ev: Event): void {
    const v = (ev.target as HTMLInputElement).value;
    this.store.setSearchQuery(v);
  }

  protected setStatus(v: 'all' | EntityStatus): void {
    this.store.setStatusFilter(v);
  }

  protected setCategory(v: 'all' | EntityCategory): void {
    this.store.setCategoryFilter(v);
  }

  protected setSortKey(v: EntitySortKey): void {
    this.store.setSort(v, this.store.sortDir());
  }

  protected toggleSortDir(): void {
    const next = this.store.sortDir() === 'asc' ? 'desc' : 'asc';
    this.store.setSort(this.store.sortKey(), next);
  }
}
