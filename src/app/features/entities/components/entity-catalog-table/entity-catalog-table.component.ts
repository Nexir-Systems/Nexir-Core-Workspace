import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { FavoriteEntitiesService } from '@core/favorite-entities.service';

import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';

import { ENTITY_CATALOG_TABLE_COLUMNS } from '../../catalog/entity-catalog.constants';
import {
  entityStatusBadgeTone,
  formatCatalogLabel,
} from '../../catalog/entity-catalog-display';
import type { EntityRecord } from '../../models/entity.model';

export interface FavoriteTogglePayload {
  readonly id: string;
  readonly event: Event;
}

/**
 * Shared mat-table for catalog + favorites — stars and row navigation are delegated to the parent.
 */
@Component({
  selector: 'nx-entity-catalog-table',
  imports: [DatePipe, MatButtonModule, MatIconModule, MatTableModule, StatusBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './entity-catalog-table.component.html',
  styleUrl: './entity-catalog-table.component.scss',
})
export class EntityCatalogTableComponent {
  protected readonly favorites = inject(FavoriteEntitiesService);

  /** Current page slice (already paginated). */
  readonly rows = input.required<EntityRecord[]>();

  /** When `true`, star is always filled (favorites-only view). */
  readonly favoriteStarFilled = input(false);

  readonly editRow = output<string>();
  readonly favoriteToggle = output<FavoriteTogglePayload>();

  /** Exposed for `mat-header-row` / `mat-row` column lists. */
  protected readonly columns: readonly string[] = ENTITY_CATALOG_TABLE_COLUMNS;

  protected readonly formatLabel = formatCatalogLabel;
  protected readonly statusBadgeTone = entityStatusBadgeTone;

  protected onRowClick(id: string): void {
    this.editRow.emit(id);
  }

  protected onFavoriteClick(id: string, event: Event): void {
    event.stopPropagation();
    this.favoriteToggle.emit({ id, event });
  }
}
