import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FavoriteEntitiesService } from '@core/favorite-entities.service';
import { NotifyService } from '@core/notify.service';

import { EmptyStateComponent } from '@shared/ui/empty-state/empty-state.component';

import { EntityCatalogToolbarComponent } from '../components/entity-catalog-toolbar/entity-catalog-toolbar.component';
import { EntityCatalogTableComponent } from '../components/entity-catalog-table/entity-catalog-table.component';
import { ENTITY_CATALOG_PAGE_SIZE_OPTIONS } from '../catalog/entity-catalog.constants';

import { EntitiesStore } from '../store/entities.store';

@Component({
  selector: 'nx-entities-list-page',
  imports: [
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
  templateUrl: './entities-list-page.component.html',
  styleUrl: './entities-list-page.component.scss',
})
export class EntitiesListPageComponent implements OnInit {
  protected readonly store = inject(EntitiesStore);
  protected readonly favorites = inject(FavoriteEntitiesService);
  private readonly router = inject(Router);
  private readonly notify = inject(NotifyService);

  protected readonly pageSize = signal(8);
  protected readonly pageIndex = signal(0);

  protected readonly pageSizeOptions = ENTITY_CATALOG_PAGE_SIZE_OPTIONS;

  protected readonly pagedRows = computed(() => {
    const all = this.store.filteredItems();
    const start = this.pageIndex() * this.pageSize();
    return all.slice(start, start + this.pageSize());
  });

  protected readonly totalFiltered = computed(() => this.store.filteredItems().length);

  constructor() {
    // Any filter/sort change produces a new filtered list — reset page so paginator stays valid.
    effect(() => {
      this.store.filteredItems();
      this.pageIndex.set(0);
    });
  }

  ngOnInit(): void {
    void this.store.loadList();
  }

  protected onPage(ev: PageEvent): void {
    this.pageIndex.set(ev.pageIndex);
    this.pageSize.set(ev.pageSize);
  }

  protected openEdit(id: string): void {
    void this.router.navigate(['/app/entities', id, 'edit']);
  }

  protected toggleFavorite(id: string, ev: Event): void {
    ev.stopPropagation();
    const was = this.favorites.isFavorite(id);
    this.favorites.toggle(id);
    if (!was) {
      this.notify.info('Added to Favorites.');
    } else {
      this.notify.info('Removed from Favorites.');
    }
  }

  protected newEntity(): void {
    void this.router.navigate(['/app/entities', 'new']);
  }

  protected async retry(): Promise<void> {
    await this.store.loadList();
    if (!this.store.errorMessage()) {
      this.notify.success('Catalog refreshed.');
    }
  }
}
