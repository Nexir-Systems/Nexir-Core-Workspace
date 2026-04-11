import { Routes } from '@angular/router';

import { authGuard } from '@core/guards/auth.guard';
import { guestGuard } from '@core/guards/guest.guard';
import { AuthApi } from '@features/auth/data/auth.api';
import { AuthStore } from '@features/auth/store/auth.store';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/layout/workspace-landing-page.component').then(
        (m) => m.WorkspaceLandingPageComponent,
      ),
  },
  {
    path: 'workspace-map',
    loadComponent: () =>
      import('./shared/layout/workspace-app-map-page.component').then(
        (m) => m.WorkspaceAppMapPageComponent,
      ),
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadChildren: () => import('./features/auth/routes/login.routes').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadChildren: () =>
      import('./features/auth/routes/register.routes').then((m) => m.REGISTER_ROUTES),
  },
  {
    path: 'app',
    canActivate: [authGuard],
    providers: [AuthStore, AuthApi],
    loadComponent: () =>
      import('./shared/layout/app-shell.component').then((m) => m.AppShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/routes/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
      },
      {
        path: 'entities',
        loadChildren: () =>
          import('./features/entities/routes/entities.routes').then((m) => m.ENTITIES_ROUTES),
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('./features/favorites/routes/favorites.routes').then((m) => m.FAVORITES_ROUTES),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./features/account/routes/account.routes').then((m) => m.ACCOUNT_ROUTES),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/routes/settings.routes').then((m) => m.SETTINGS_ROUTES),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
