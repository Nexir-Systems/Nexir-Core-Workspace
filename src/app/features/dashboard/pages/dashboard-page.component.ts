import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { RecentEntitiesService } from '@core/recent-entities.service';

import { EntitiesStore } from '@features/entities/store/entities.store';

import { SectionCardComponent } from '@shared/ui/section-card/section-card.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';

import { DashboardStore } from '../store/dashboard.store';

@Component({
  selector: 'nx-dashboard-page',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    SectionCardComponent,
    StatusBadgeComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent implements OnInit {
  private readonly recent = inject(RecentEntitiesService);
  protected readonly dashboard = inject(DashboardStore);
  protected readonly entities = inject(EntitiesStore);

  async ngOnInit(): Promise<void> {
    if (this.entities.items().length === 0) {
      await this.entities.loadList();
    }
  }

  protected recentEntries(): { id: string; name: string }[] {
    const ids = this.recent.ids();
    const rows = this.entities.items();
    return ids
      .map((id) => {
        const row = rows.find((e) => e.id === id);
        return row ? { id: row.id, name: row.name } : null;
      })
      .filter((x): x is { id: string; name: string } => x !== null);
  }
}
