import { computed, inject, Injectable } from '@angular/core';

import { SessionService } from '@core/session.service';

/**
 * Dashboard as onboarding start — lightweight derived state from global session.
 */
@Injectable()
export class DashboardStore {
  private readonly session = inject(SessionService);

  readonly sessionSummary = computed(() => {
    const s = this.session.session();
    if (!s) {
      return 'No active session';
    }
    return `Session active — signed in as ${s.email}`;
  });
}
