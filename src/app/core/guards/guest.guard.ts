import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

import { SessionService } from '../session.service';

/** Redirect authenticated users away from guest-only auth routes (`/login`, `/register`) to the app shell. */
export const guestGuard: CanActivateFn = (): boolean | UrlTree => {
  const session = inject(SessionService);
  const router = inject(Router);
  if (!session.isAuthenticated()) {
    return true;
  }
  return router.createUrlTree(['/app/dashboard']);
};
