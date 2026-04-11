import type { Routes } from '@angular/router';

import { AuthApi } from '../data/auth.api';
import { LoginPageComponent } from '../pages/login-page.component';
import { AuthStore } from '../store/auth.store';

export const LOGIN_ROUTES: Routes = [
  { path: '', providers: [AuthStore, AuthApi], component: LoginPageComponent },
];
