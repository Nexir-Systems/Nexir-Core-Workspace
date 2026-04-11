import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { RecentEntitiesService } from '@core/recent-entities.service';

import { SectionCardComponent } from '@shared/ui/section-card/section-card.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';

import {
  entityStatusBadgeTone,
  formatCatalogLabel,
} from '../catalog/entity-catalog-display';
import { EntitiesStore } from '../store/entities.store';

@Component({
  selector: 'nx-entity-detail-page',
  imports: [
    DatePipe,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    SectionCardComponent,
    StatusBadgeComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './entity-detail-page.component.html',
  styleUrl: './entity-detail-page.component.scss',
})
export class EntityDetailPageComponent implements OnInit {
  protected readonly store = inject(EntitiesStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly recent = inject(RecentEntitiesService);

  protected readonly formatCatalogLabel = formatCatalogLabel;
  protected readonly entityStatusBadgeTone = entityStatusBadgeTone;

  ngOnInit(): void {
    const id = this.route.parent?.snapshot.paramMap.get('id');
    if (!id) {
      void this.router.navigate(['/app/entities']);
      return;
    }
    void this.hydrate(id);
  }

  private async hydrate(id: string): Promise<void> {
    const row = await this.store.loadOne(id);
    if (row) {
      this.recent.recordOpened(id);
    }
  }

  protected back(): void {
    void this.router.navigate(['/app/entities']);
  }
}
