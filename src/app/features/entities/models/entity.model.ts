export type EntityStatus = 'draft' | 'active' | 'archived';

export type EntityPriority = 'low' | 'medium' | 'high';

export type EntityCategory = 'general' | 'research' | 'operations' | 'internal';

export interface EntityActivityEntry {
  readonly id: string;
  readonly at: string;
  readonly message: string;
  readonly actor?: string;
}

export interface EntityMetadataEntry {
  readonly key: string;
  readonly value: string;
}

export interface EntityRecord {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly status: EntityStatus;
  readonly category: EntityCategory;
  readonly owner: string;
  readonly priority: EntityPriority;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly metadata: readonly EntityMetadataEntry[];
  readonly activity: readonly EntityActivityEntry[];
}

/** Payload accepted by create / update forms and API. */
export interface EntityWritePayload {
  readonly name: string;
  readonly description: string;
  readonly status: EntityStatus;
  readonly category: EntityCategory;
  readonly owner: string;
  readonly priority: EntityPriority;
}

export type EntityUpdatePayload = Partial<EntityWritePayload>;

export type EntitySortKey = 'name' | 'status' | 'updatedAt' | 'priority';

export type EntitySortDirection = 'asc' | 'desc';
