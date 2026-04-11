import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SessionService } from '@core/session.service';

import { EXAMPLE_SENSITIVE_PATHS } from '../meta/protected-paths';
import { InfoPanelComponent } from '../ui/info-panel/info-panel.component';
import { SectionCardComponent } from '../ui/section-card/section-card.component';

@Component({
  selector: 'nx-workspace-landing-page',
  imports: [MatButtonModule, MatIconModule, RouterLink, SectionCardComponent, InfoPanelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './workspace-landing-page.component.html',
  styleUrl: './workspace-landing-page.component.scss',
})
export class WorkspaceLandingPageComponent implements OnInit {
  private readonly session = inject(SessionService);
  private readonly router = inject(Router);

  readonly paths = EXAMPLE_SENSITIVE_PATHS;

  ngOnInit(): void {
    if (this.session.isAuthenticated()) {
      void this.router.navigateByUrl('/app/dashboard');
    }
  }
}
