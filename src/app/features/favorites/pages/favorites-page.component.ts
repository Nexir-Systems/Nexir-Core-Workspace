import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FavoriteEntitiesService } from '@core/favorite-entities.service';
import { NotifyService } from '@core/notify.service';

import { EmptyStateComponent } from '@shared/ui/empty-state/empty-state.component';

import { EntityCatalogToolbarComponent } from '@features/entities/components/entity-catalog-toolbar/entity-catalog-toolbar.component';
import { EntityCatalogTableComponent } from '@features/entities/components/entity-catalog-table/entity-catalog-table.component';
import { ENTITY_CATALOG_PAGE_SIZE_OPTIONS } from '@features/entities/catalog/entity-catalog.constants';

import { EntitiesStore } from '@features/entities/store/entities.store';

@Component({
  selector: 'nx-favorites-page',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    EmptyStateComponent,
    EntityCatalogToolbarComponent,
    EntityCatalogTableComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.scss',
})
export class FavoritesPageComponent implements OnInit {
  protected readonly store = inject(EntitiesStore);
  protected readonly favorites = inject(FavoriteEntitiesService);
  private readonly router = inject(Router);
  private readonly notify = inject(NotifyService);

  protected readonly pageSize = signal(8);
  protected readonly pageIndex = signal(0);

  protected readonly pageSizeOptions = ENTITY_CATALOG_PAGE_SIZE_OPTIONS;

  /**
   * Starred ids ∩ `EntitiesStore.filteredItems()` — reuses catalog filters/sort without duplicating
   * filter logic (see `filterAndSortEntityRecords`).
   */
  protected readonly filteredFavoriteRows = computed(() => {
    const fav = new Set(this.favorites.ids());
    return this.store.filteredItems().filter((e) => fav.has(e.id));
  });

  protected readonly pagedRows = computed(() => {
    const all = this.filteredFavoriteRows();
    const start = this.pageIndex() * this.pageSize();
    return all.slice(start, start + this.pageSize());
  });

  protected readonly totalFilteredFavorites = computed(() => this.filteredFavoriteRows().length);

  constructor() {
    // Mirrors entities list: new filter result → back to first page.
    effect(() => {
      this.filteredFavoriteRows();
      this.pageIndex.set(0);
    });
  }

  ngOnInit(): void {
    void this.store.loadList();
  }

  protected retryLoad(): void {
    void this.store.loadList();
  }

  protected onPage(ev: PageEvent): void {
    this.pageIndex.set(ev.pageIndex);
    this.pageSize.set(ev.pageSize);
  }

  protected openEdit(id: string): void {
    void this.router.navigate(['/app/entities', id, 'edit']);
  }

  protected goToEntities(): void {
    void this.router.navigateByUrl('/app/entities');
  }

  protected clearCatalogFilters(): void {
    this.store.resetCatalogFilters();
  }

  protected toggleFavorite(id: string, ev: Event): void {
    ev.stopPropagation();
    this.favorites.toggle(id);
    this.notify.info('Removed from Favorites.');
    const total = this.totalFilteredFavorites();
    const last = Math.max(0, Math.ceil(total / this.pageSize()) - 1);
    if (this.pageIndex() > last) {
      this.pageIndex.set(Math.max(0, last));
    }
  }
}
