import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';

import { STORAGE_KEYS, StorageService } from '@core/storage.service';

import type {
  EntityRecord,
  EntityUpdatePayload,
  EntityWritePayload,
} from '../models/entity.model';

import { MOCK_ENTITIES_SEED } from './mock-entities';

const NETWORK_DELAY_MS = 180;

function cloneRecord(r: EntityRecord): EntityRecord {
  return {
    ...r,
    metadata: [...r.metadata],
    activity: [...r.activity],
  };
}

function nextId(existing: readonly EntityRecord[]): string {
  const max = existing.reduce((acc, e) => {
    const n = Number.parseInt(e.id.replace('ent-', ''), 10);
    return Number.isFinite(n) ? Math.max(acc, n) : acc;
  }, 0);
  return `ent-${String(max + 1).padStart(3, '0')}`;
}

@Injectable({ providedIn: 'root' })
export class EntitiesApi {
  private readonly storage = inject(StorageService);

  private readAll(): EntityRecord[] {
    const raw = this.storage.getJson<EntityRecord[]>(STORAGE_KEYS.ENTITIES);
    if (raw?.length) {
      return raw.map(cloneRecord);
    }
    return MOCK_ENTITIES_SEED.map(cloneRecord);
  }

  private writeAll(rows: EntityRecord[]): void {
    this.storage.setJson(STORAGE_KEYS.ENTITIES, rows);
  }

  list(): Observable<EntityRecord[]> {
    return of(this.readAll()).pipe(
      map((rows) => rows.map(cloneRecord)),
      delay(NETWORK_DELAY_MS),
    );
  }

  getById(id: string): Observable<EntityRecord> {
    return timer(NETWORK_DELAY_MS).pipe(
      switchMap(() => {
        const found = this.readAll().find((e) => e.id === id);
        if (!found) {
          return throwError(() => new Error('Record not found.'));
        }
        return of(cloneRecord(found));
      }),
    );
  }

  create(payload: EntityWritePayload): Observable<EntityRecord> {
    return timer(NETWORK_DELAY_MS).pipe(
      switchMap(() => {
        const rows = this.readAll();
        const id = nextId(rows);
        const ts = new Date().toISOString();
        const created: EntityRecord = {
          id,
          name: payload.name.trim(),
          description: payload.description.trim(),
          status: payload.status,
          category: payload.category,
          owner: payload.owner.trim(),
          priority: payload.priority,
          createdAt: ts,
          updatedAt: ts,
          metadata: [
            { key: 'Source', value: 'Workspace' },
            { key: 'Owner', value: payload.owner.trim() },
          ],
          activity: [
            {
              id: `act-${id}-0`,
              at: ts,
              message: 'Record created.',
              actor: 'System',
            },
          ],
        };
        const next = [...rows, created];
        this.writeAll(next);
        return of(cloneRecord(created));
      }),
    );
  }

  update(id: string, partial: EntityUpdatePayload): Observable<EntityRecord> {
    return timer(NETWORK_DELAY_MS).pipe(
      switchMap(() => {
        const rows = this.readAll();
        const idx = rows.findIndex((e) => e.id === id);
        if (idx < 0) {
          return throwError(() => new Error('Record not found.'));
        }
        const prev = rows[idx];
        const ts = new Date().toISOString();
        const merged: EntityRecord = {
          ...prev,
          name: partial.name?.trim() ?? prev.name,
          description: partial.description?.trim() ?? prev.description,
          status: partial.status ?? prev.status,
          category: partial.category ?? prev.category,
          owner: partial.owner?.trim() ?? prev.owner,
          priority: partial.priority ?? prev.priority,
          updatedAt: ts,
          activity: [
            {
              id: `act-${id}-${ts}`,
              at: ts,
              message: 'Record updated.',
              actor: 'System',
            },
            ...prev.activity,
          ],
        };
        const next = [...rows];
        next[idx] = merged;
        this.writeAll(next);
        return of(cloneRecord(merged));
      }),
    );
  }
}
