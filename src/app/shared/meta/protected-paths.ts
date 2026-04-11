/**
 * Key project locations for orientation — illustrative, not enforced by tooling.
 */
export const EXAMPLE_SENSITIVE_PATHS: readonly { readonly label: string; readonly path: string; readonly hint: string }[] =
  [
    {
      label: 'Application routes',
      path: 'src/app/app.routes.ts',
      hint: 'Top-level routes, lazy shell, and default redirects.',
    },
    {
      label: 'Auth guards',
      path: 'src/app/core/guards/auth.guard.ts',
      hint: 'Session gate for `/app/*`; pair with guest guard on `/login` and `/register`.',
    },
    {
      label: 'Session & storage',
      path: 'src/app/core/session.service.ts',
      hint: 'Current user context; works with StorageService keys.',
    },
    {
      label: 'Entities feature',
      path: 'src/app/features/entities/',
      hint: 'Routes, list/detail/create, store, and mock API with local persistence.',
    },
    {
      label: 'Settings & preferences',
      path: 'src/app/features/settings/data/settings.api.ts',
      hint: 'Mock preferences persisted under STORAGE_KEYS.PREFERENCES.',
    },
    {
      label: 'App shell',
      path: 'src/app/shared/layout/app-shell.component.ts',
      hint: 'Sidenav, toolbar, and router-outlet for authenticated area.',
    },
  ];
