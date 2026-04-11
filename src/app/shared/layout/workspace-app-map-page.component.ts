import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SectionCardComponent } from '../ui/section-card/section-card.component';

@Component({
  selector: 'nx-workspace-app-map-page',
  imports: [MatButtonModule, MatIconModule, RouterLink, SectionCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './workspace-app-map-page.component.html',
  styleUrl: './workspace-app-map-page.component.scss',
})
export class WorkspaceAppMapPageComponent {}
