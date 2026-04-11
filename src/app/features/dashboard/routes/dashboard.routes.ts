import type { Routes } from '@angular/router';

import { DashboardPageComponent } from '../pages/dashboard-page.component';
import { DashboardStore } from '../store/dashboard.store';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    providers: [DashboardStore],
    component: DashboardPageComponent,
  },
];
