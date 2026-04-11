import { FormBuilder, Validators } from '@angular/forms';

import type {
  EntityCategory,
  EntityPriority,
  EntityRecord,
  EntityStatus,
  EntityWritePayload,
} from '../models/entity.model';

export type EntityFormGroup = ReturnType<typeof createEntityFormGroup>;

export function createEntityFormGroup(fb: FormBuilder) {
  return fb.nonNullable.group({
    name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(160)],
    ],
    description: ['', [Validators.required, Validators.maxLength(4000)]],
    status: fb.nonNullable.control<EntityStatus>('draft'),
    category: fb.nonNullable.control<EntityCategory>('general'),
    owner: ['', [Validators.required, Validators.maxLength(120)]],
    priority: fb.nonNullable.control<EntityPriority>('medium'),
  });
}

export function patchFormFromPayload(
  form: EntityFormGroup,
  payload: EntityWritePayload,
  opts?: { emitEvent?: boolean },
): void {
  form.patchValue(
    {
      name: payload.name,
      description: payload.description,
      status: payload.status,
      category: payload.category,
      owner: payload.owner,
      priority: payload.priority,
    },
    { emitEvent: opts?.emitEvent ?? false },
  );
}

export function payloadFromForm(form: EntityFormGroup): EntityWritePayload {
  const v = form.getRawValue();
  return {
    name: v.name.trim(),
    description: v.description.trim(),
    status: v.status,
    category: v.category,
    owner: v.owner.trim(),
    priority: v.priority,
  };
}

export function payloadFromRecord(entity: EntityRecord): EntityWritePayload {
  return {
    name: entity.name,
    description: entity.description,
    status: entity.status,
    category: entity.category,
    owner: entity.owner,
    priority: entity.priority,
  };
}
