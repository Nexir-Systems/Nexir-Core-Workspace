import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { NotifyService } from '@core/notify.service';
import { SessionService } from '@core/session.service';

import { AuthApi } from '../data/auth.api';
import type { Credentials } from '../models/auth.model';

/**
 * Auth feature state — signals only for UI; async via AuthApi.
 */
@Injectable()
export class AuthStore {
  private readonly api = inject(AuthApi);
  private readonly sessionService = inject(SessionService);
  private readonly router = inject(Router);
  private readonly notify = inject(NotifyService);

  readonly busy = signal(false);
  readonly errorMessage = signal<string | null>(null);

  clearError(): void {
    this.errorMessage.set(null);
  }

  async registerAndEnterApp(credentials: Credentials): Promise<void> {
    this.busy.set(true);
    this.errorMessage.set(null);
    try {
      const session = await firstValueFrom(this.api.register(credentials));
      this.sessionService.setSession(session);
      await this.router.navigateByUrl('/app/dashboard');
      this.notify.success('Account created. You are signed in.');
    } catch (e) {
      this.errorMessage.set(e instanceof Error ? e.message : 'Registration failed.');
    } finally {
      this.busy.set(false);
    }
  }

  async loginAndEnterApp(credentials: Credentials): Promise<void> {
    this.busy.set(true);
    this.errorMessage.set(null);
    try {
      const session = await firstValueFrom(this.api.login(credentials));
      this.sessionService.setSession(session);
      await this.router.navigateByUrl('/app/dashboard');
      this.notify.success('Signed in.');
    } catch (e) {
      this.errorMessage.set(e instanceof Error ? e.message : 'Sign-in failed.');
    } finally {
      this.busy.set(false);
    }
  }

  async logout(): Promise<void> {
    this.busy.set(true);
    try {
      await firstValueFrom(this.api.logout());
    } finally {
      this.sessionService.clearSession();
      this.notify.info('Signed out.');
      await this.router.navigateByUrl('/login');
      this.busy.set(false);
    }
  }
}
