import type { Routes } from '@angular/router';

import { SettingsApi } from '../data/settings.api';
import { SettingsPageComponent } from '../pages/settings-page.component';
import { SettingsStore } from '../store/settings.store';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    providers: [SettingsStore, SettingsApi],
    component: SettingsPageComponent,
  },
];
