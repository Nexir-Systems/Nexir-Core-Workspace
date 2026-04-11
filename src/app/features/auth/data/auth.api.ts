import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import type { Session } from '@core/session.model';
import { STORAGE_KEYS, StorageService } from '@core/storage.service';

import { validatePasswordStrengthOrThrow } from '@core/password-rules';

import type { Credentials, RegisteredUser } from '../models/auth.model';

const NETWORK_DELAY_MS = 280;

@Injectable()
export class AuthApi {
  private readonly storage = inject(StorageService);

  register(credentials: Credentials): Observable<Session> {
    return timer(NETWORK_DELAY_MS).pipe(
      switchMap(() => {
        const email = credentials.email.trim().toLowerCase();
        if (!email || !credentials.password) {
          return throwError(() => new Error('Email and password are required.'));
        }
        try {
          validatePasswordStrengthOrThrow(credentials.password);
        } catch (e) {
          return throwError(() => (e instanceof Error ? e : new Error('Invalid password.')));
        }
        const users = this.readRegistry();
        if (users.some((u) => u.email === email)) {
          return throwError(() => new Error('An account with this email already exists.'));
        }
        const user: RegisteredUser = {
          userId: crypto.randomUUID(),
          email,
          passwordKey: credentials.password,
        };
        users.push(user);
        this.writeRegistry(users);
        return of(this.toSession(user));
      }),
    );
  }

  login(credentials: Credentials): Observable<Session> {
    return timer(NETWORK_DELAY_MS).pipe(
      switchMap(() => {
        const email = credentials.email.trim().toLowerCase();
        const users = this.readRegistry();
        const found = users.find((u) => u.email === email);
        if (!found || found.passwordKey !== credentials.password) {
          return throwError(() => new Error('Invalid email or password.'));
        }
        return of(this.toSession(found));
      }),
    );
  }

  logout(): Observable<void> {
    return timer(NETWORK_DELAY_MS).pipe(map(() => undefined));
  }

  changePassword(
    email: string,
    currentPassword: string,
    newPassword: string,
  ): Observable<void> {
    return timer(NETWORK_DELAY_MS).pipe(
      switchMap(() => {
        const normalized = email.trim().toLowerCase();
        try {
          validatePasswordStrengthOrThrow(newPassword);
        } catch (e) {
          return throwError(() => (e instanceof Error ? e : new Error('Invalid new password.')));
        }
        const users = this.readRegistry();
        const idx = users.findIndex((u) => u.email === normalized);
        if (idx < 0) {
          return throwError(() => new Error('No account found for this email.'));
        }
        const u = users[idx];
        if (u.passwordKey !== currentPassword) {
          return throwError(() => new Error('Current password is incorrect.'));
        }
        const next = [...users];
        next[idx] = { ...u, passwordKey: newPassword };
        this.writeRegistry(next);
        return of(undefined);
      }),
    );
  }

  restoreSession(): Observable<Session | null> {
    return timer(0).pipe(
      map(() => {
        const raw = this.storage.get(STORAGE_KEYS.SESSION);
        if (!raw) {
          return null;
        }
        try {
          return JSON.parse(raw) as Session;
        } catch {
          return null;
        }
      }),
    );
  }

  private readRegistry(): RegisteredUser[] {
    return this.storage.getJson<RegisteredUser[]>(STORAGE_KEYS.USER_REGISTRY) ?? [];
  }

  private writeRegistry(users: RegisteredUser[]): void {
    this.storage.setJson(STORAGE_KEYS.USER_REGISTRY, users);
  }

  private toSession(user: RegisteredUser): Session {
    return {
      userId: user.userId,
      email: user.email,
      issuedAt: Date.now(),
    };
  }
}
