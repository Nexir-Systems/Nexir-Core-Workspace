import type { Routes } from '@angular/router';

import { AuthApi } from '../data/auth.api';
import { RegisterPageComponent } from '../pages/register-page.component';
import { AuthStore } from '../store/auth.store';

export const REGISTER_ROUTES: Routes = [
  { path: '', providers: [AuthStore, AuthApi], component: RegisterPageComponent },
];
