import type { NxBadgeTone } from '@shared/ui/status-badge/status-badge.component';

import type { EntityStatus } from '../models/entity.model';

/**
 * Title-style label for catalog cells (status, category, priority) — first character uppercased.
 */
export function formatCatalogLabel(value: string): string {
  if (!value?.length) {
    return value;
  }
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

/** Maps entity lifecycle to chip styles tuned for the catalog / detail header. */
export function entityStatusBadgeTone(status: EntityStatus): NxBadgeTone {
  switch (status) {
    case 'active':
      return 'entityActive';
    case 'draft':
      return 'entityDraft';
    case 'archived':
      return 'entityArchived';
    default:
      return 'neutral';
  }
}
